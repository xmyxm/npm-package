import React, { Component } from "react"
import ReactDOM from 'react-dom';
import Header from "../component/header/index";
import { getUrlParam } from '../util/tools'
import LZString from "lz-string";
import pako from "pako";
import "../style/lz.less";

class Lz extends Component {
  constructor(options) {
    super(options)
    this.count = getUrlParam('count') || 3000;
    this.pakoConfig = { to: 'string', level: 9 };
    this.valBid = 'b_dianping_nova_citycalender_reculike_mv';
    this.mvText = '{"valBid":"b_dianping_nova_citycalender_reculike_mv","valLab":{"index":0,"query_id":-1,"title":"去东京原宿逛街，看这一篇就够啦！","custom":{"module_id":4,"tag_id":0,"content_id":186886911,"show_style":"singleList","bussi_id":1}}}';
    this.state = { shortList: [], longList: [] }; 
  }

  componentDidMount() {
    const { count, valBid, mvText, pakoConfig } = this;
    setTimeout(() => { this.setState({ shortList: this.compute(count, valBid, pakoConfig) }) }, 30)
    setTimeout(() => { this.setState({ longList: this.compute(count, mvText, pakoConfig)}) }, 30)
  }

  compute(count, content, pakoConfig) {
    let i = 0;
    let textAry = [];
    let _text = '';
    let msg = '';
    let time0 = Date.now();
    function compressText(compressType, timeA, timeB) {
      return `${compressType} 压缩耗时：${timeA - timeB}ms，压缩率：${((content.length - _text.length)/content.length*100).toFixed(2)}%，压缩前文本长度：${content.length}，压缩后文本长度：${_text.length}`
    }
    function decompressText(decompressType, timeA, timeB) { 
      return `${decompressType} 解压缩耗时：${timeA - timeB}ms`;
    }
    while (i < count)
    {
      _text = LZString.compress(content);
      i++;
    }
    let time1 = Date.now();
    textAry.push({ cpr: _text, msg: compressText('LZString.compress', time1, time0)});
    i = 0;
    while (i < count)
    {
      _text = LZString.decompress(_text);
      i++;
    }
    let time2 = Date.now();
    textAry.push({ cpr: '', msg: decompressText('LZString.decompress', time2, time1)});
    i = 0;
    while (i < count)
    {
      _text = pako.deflate(content, pakoConfig);/*0表示不压缩，1表示压缩时间最快，压缩率最小；9表示压缩率最大，时间最长；默认6*/
      i++;
    }
    let time3 = Date.now();
    textAry.push({ cpr: _text, msg: compressText('pako.deflate', time3, time2)});
    i = 0;
    msg = '';
    try {
      while (i < count)
      {
        pako.inflate(_text);
        i++;
      }
    } catch (e) {
      msg = 'inflate报错：' + e;
    }
    let time4 = Date.now();
    textAry.push({ cpr: '', msg: msg ? msg : decompressText('pako.inflate', time4, time3)});
    i = 0;
    while (i < count)
    {
      _text = pako.deflateRaw(content, pakoConfig);/*0表示不压缩，1表示压缩时间最快，压缩率最小；9表示压缩率最大，时间最长；默认6*/
      i++;
    }
    let time5 = Date.now();
    textAry.push({ cpr: _text, msg: compressText('pako.deflateRaw', time5, time4)});
    i = 0;
    while (i < count)
    {
      pako.inflateRaw(_text);
      i++;
    }
    let time6 = Date.now();
    textAry.push({ cpr: '', msg: decompressText('pako.inflateRaw', time6, time5) });
    i = 0;
    while (i < count)
    {
      _text = pako.gzip(content, pakoConfig);/*0表示不压缩，1表示压缩时间最快，压缩率最小；9表示压缩率最大，时间最长；默认6*/
      i++;
    }
    let time7 = Date.now();
    textAry.push({ cpr: _text, msg: compressText('pako.gzip', time7, time6)});
    i = 0;
    msg = '';
    try {
      while (i < count)
      {
        pako.ungzip(_text);
        i++;
      }
    } catch (e) {
      msg = 'ungzip报错：' + e;
    }
    let time8 = Date.now();
    textAry.push({ cpr: '', msg: msg ? msg : decompressText('pako.ungzip', time8, time7)});
    return textAry;
  }

  render() {
    const { count, valBid, mvText, state: { shortList, longList } } = this;
    return (
      <React.Fragment>
        <Header title={"数据压缩加密测试"} borderBottom bg ></Header>
        <div className="lz-box">
          <div className="text-box">
            <div className="text">短文本：</div>
            <div className="text grey">{valBid}</div>
            <div className="text">长文本：</div>
            <div className="text grey">{mvText}</div>
            <div className="text">压缩与解压缩执行次数：{count}</div>
          </div>
          <div className="list-data">
            <div className="short-title">短文本压缩测试:</div>
            {
              !shortList.length && <div className="loading">计算中...</div>
            }
            {
              shortList.map((item) => {
                return <React.Fragment key={item.msg} >
                        {item.cpr && <div className="cpr-text grey">{item.cpr}</div>}      
                        <div className="item">{item.msg}</div>
                      </React.Fragment>
              })
            }
            <div className="long-title">长文本压缩测试:</div>
            {
              !longList.length && <div className="loading">计算中...</div>
            }
            {
              longList.map((item) => {
                return <React.Fragment key={item.msg} >
                        {item.cpr && <div className="cpr-text grey">{item.cpr}</div>}      
                        <div className="item">{item.msg}</div>
                      </React.Fragment>
              })
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Lz />, document.querySelector('#main'));