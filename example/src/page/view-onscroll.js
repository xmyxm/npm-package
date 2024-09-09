import React, { Component } from "react"
import ReactDOM from 'react-dom';
import Header from "../component/header/index";
import "../style/performance.less";
import { getUrlParam } from '../util/tools'

class ViewOnscroll extends Component {
  constructor(options) {
    super(options)
    this.count = getUrlParam('count') || 500;
    this.openraf = getUrlParam('openraf') === "true" || false;
    this.scheduledAnimationFrame = false;
    this.rAFId = 0; 
    this.state = { count: this.count, openraf : this.openraf };
  }

  readAndUpdatePage = () => {
    this.compute();
    this.scheduledAnimationFrame = false;
    this.rAFId && window.cancelAnimationFrame(this.rAFId);
  }

  rafCallback = () => {
    if (this.scheduledAnimationFrame) return;
    this.scheduledAnimationFrame = true;
    this.rAFId = window.requestAnimationFrame(this.readAndUpdatePage);
  }

  compute() {
    const eleList = document.querySelectorAll('.pf-list>div')
    eleList.forEach(item => { 
      const { top, bottom, left, right } = item.getBoundingClientRect();
      if (top > 0 && bottom > 0, left > 0, right > 0) {
        const mvtext = item.getAttribute('data-mv');
        if (mvtext.slice(0, 1) === '{' && mvtext.slice(-1) === '}') {
          console.log(JSON.parse(mvtext))
        } else {
          console.log(mvtext)
        }
      }
    })
  }

  componentDidMount() {
    document.addEventListener('scroll', this.openraf ? this.rafCallback : this.compute);
  }

  doubleEle() {
    this.count = this.count * 2;
    this.setState({ count: this.count });
    const url = `${location.pathname}?count=${this.count}`
    history.replaceState({}, '', url);
  }

  reload() {
    location.href = location.pathname
  }

  openRequestAnimationFrame() {
    location.href = `${location.pathname}?count=${this.count}&openraf=${!this.openraf}`
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
      eleAry.push(<div data-mc={JSON.stringify(mcData)} data-mv={JSON.stringify(mvData)} key={i} className="pf-item">{i}</div>)
    }
    return eleAry;
  }

  render() {
    const { state: { count, openraf } } = this;
    return (
      <React.Fragment>
        <Header title={"scroll getBoundingClientRect 性能测试"} borderBottom bg ></Header>
        <div className="pf-box">
          <div className="btn-list">
            <div className="btn-item" onClick={this.doubleEle.bind(this)} >
              DOM加倍
            </div>
            <div className="btn-item" onClick={this.openRequestAnimationFrame.bind(this)} >
              {(openraf ? '已开启rAF' : '开启rAF')}
            </div>
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

ReactDOM.render(<ViewOnscroll />, document.querySelector('#main'));