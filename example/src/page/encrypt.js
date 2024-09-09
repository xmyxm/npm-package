import React, { Component } from "react"
import ReactDOM from 'react-dom';
import Header from "../component/header/index";
import { getUrlParam, encrypt, decrypt } from '../util/tools'
import "../style/encrypt.less";

class Encrypt extends Component {
  constructor(options) {
    super(options)
    this.count = getUrlParam('count') || 3000;
    this.valBid = 'b_dianping_nova_citycalender_reculike_mv';
    this.mvText = '{"valBid":"b_dianping_nova_citycalender_reculike_mv","valLab":{"index":0,"query_id":-1,"title":"去东京原宿逛街，看这一篇就够啦！","custom":{"module_id":4,"tag_id":0,"content_id":186886911,"show_style":"singleList","bussi_id":1}}}';
    this.state = { shortList: [], longList: [] }; 
  }

  componentDidMount() {
    const { count, valBid, mvText } = this;
    setTimeout(() => { this.setState({ shortList: this.compute(count, valBid) }) }, 30)
    setTimeout(() => { this.setState({ longList: this.compute(count, mvText)}) }, 30)
  }

  compute(count, content) {    
    let i = 0;
    let textAry = [];
    let _text = '';
    let time0 = Date.now();
    function compressText(compressType, timeA, timeB) {
      return `${compressType} 加密耗时：${timeA - timeB}ms，加密前文本长度：${content.length}，加密后文本长度：${_text.length}`
    }
    function decompressText(decompressType, timeA, timeB) { 
      return `${decompressType} 加密还原耗时：${timeA - timeB}ms`;
    }
    while (i < count)
    {
      _text = encrypt(content);
      i++;
    }
    let time1 = Date.now();
    textAry.push({ cpr: _text, msg: compressText('encrypt', time1, time0)});
    i = 0;
    while (i < count)
    {
      _text = decrypt(_text);
      i++;
    }
    let time2 = Date.now();
    textAry.push({ cpr: '', msg: decompressText('decrypt', time2, time1)});
    return textAry;
  }

  render() {
    const { count, valBid, mvText, state: { shortList, longList } } = this;
    return (
      <React.Fragment>
        <Header title={"数据混淆加密测试"} borderBottom bg ></Header>
        <div className="encrypt-box">
          <div className="text-box">
              <div className="text">短文本：</div>
              <div className="text grey">{valBid}</div>
              <div className="text">长文本：</div>
              <div className="text grey">{mvText}</div>
              <div className="text">加密与解密执行次数：{count}</div>
            </div>
            <div className="list-data">
              <div className="short-title">短文本加密测试:</div>
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
              <div className="long-title">长文本加密测试:</div>
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

ReactDOM.render(<Encrypt />, document.querySelector('#main'));
