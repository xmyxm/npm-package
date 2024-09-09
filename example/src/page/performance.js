import React, { Component } from "react"
import ReactDOM from 'react-dom';
import Header from "../component/header/index";
import "../style/performance.less";
import Fish, { attr } from '@dp/fish';
import { getUrlParam } from '../util/tools'

class Performance extends Component {
  constructor(options) {
    super(options)
    this.count = getUrlParam('count') || 500;
    this.report = getUrlParam('report') === "true" || false;
    this.json = getUrlParam('json') === "true" || false;
    this.compress = getUrlParam('compress') === "true" || false;
    this.state = { count: this.count, report: this.report, compress: this.compress };
    if (this.report) Fish.init({ debug: true, compress: this.compress, viewData: { options: { delay: 3 } }});
  }

  doubleEle() {
    this.count = this.count * 2;
    this.setState({ count: this.count });
    const url = `${location.pathname}?count=${this.count}&report=${this.report}&compress=${this.compress}`
    history.replaceState({}, '', url);
  }

  reload() {
    location.href = location.pathname
  }

  openFish() {
    location.href = `${location.pathname}?count=${this.count}&report=true&compress=${this.compress}`
  }

  openCompress() {
    location.href = `${location.pathname}?count=${this.count}&report=${this.report}&compress=true`
  }

  numberToArray(count) {
    const eleAry = [];
    const valLab = {
      title: "JSON数据解析性能测试",
      custom: {
        tag_id: 123456,
        content_id: 123456789
      }
    }
    const mvData = { mvID: '', valBid: "performance_mv", valLab };
    const mcData = { mcID: '', valBid: "performance_mc", valLab };
    for (let i = 0; i < count; i++) {
      mvData.mvID = `mv:${i}`;
      mcData.mcID = `mc:${i}`;
      eleAry.push(<div {...attr({ clickData: mcData , viewData: mvData })} key={i} className="pf-item">{i}</div>)
    }
    return eleAry;
  }

  render() {
    const { state: { count, report, compress } } = this;
    return (
      <React.Fragment>
        <Header title={"Performance 性能测试"} borderBottom bg ></Header>
        <div className="pf-box">
          <div className="btn-list">
            <div className="btn-item" onClick={this.doubleEle.bind(this)} >DOM加倍</div>
            <div className="btn-item" onClick={this.openFish.bind(this)} >{report ? '已开启fish' : '开启fish'}</div>
            <div className="btn-item" onClick={this.openCompress.bind(this)} >{compress ? '已开启压缩' : '开启压缩'}</div>
            <div className="btn-item" onClick={this.reload.bind(this)} >页面重置</div>
          </div>
          <div className="pf-count">列表DOM数：{count}，页面DOM总数：{Number(count) + 34}</div>
          <div className="pf-content">
            <p>1.移动端DOM总数范围在：500-3000，总体分布在10000以内(例:m.dianping.com和i.meituan.com)</p>
            <p>2.PC端DOM总数平均值：2200，总体分布在3000以内(例:www.dianping.com和www.meituan.com)</p>
          </div>
          <div className="pf-list">
            {
              this.numberToArray(count)
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Performance />, document.querySelector('#main'));