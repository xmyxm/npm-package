import React, { Component } from "react"
import Header from "../component/header/index";
import "../style/intersection.less";

export default class Index extends Component {
    constructor(options) {
      super(options)
      this.threshold = 0.8;
      this.attrName = 'data-int-mc';
      this.state = {
          isTop: true,
          addOrDelList : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
      }
    }

    componentDidMount() {
        const options = {
            threshold: [this.threshold, 1], // 设置触发回调的临界值， 用来指定交叉比例，决定什么时候触发回调函数，是一个数组，默认是[0]
            root: null // 用于观察的根元素，默认是浏览器的视口，也可以指定具体元素，指定元素的时候用于观察的元素必须是指定元素的子元素
        }
        // 实例化
        this.observer = new window.IntersectionObserver(this.viewHandle, options);
        const viewEleList = document.querySelectorAll(`[${this.attrName}]`);
        // 添加监听
        this.addViewElementObserver(viewEleList);
    }

    viewHandle = (entries) => {
        entries.forEach(entry => {
          const currentNode = entry.target;
          const mv_data = currentNode.dataset.intMc;
          // 判断视口出现占比是否大于threshold
          if (entry.isIntersecting) {
              // 达标
              console.log(`%c元素${mv_data}在可视区域占比已达标, 可视区域占比: `, 'color:green;', entry.intersectionRatio)
          } else { // 不达标
              console.log(`%c元素${mv_data}可视区占比不达标, 可视区域占比: `, 'color:#FF9800', entry.intersectionRatio)
          }
        })
    }

    // 监听
    addViewElementObserver = (viewList) => {
        viewList.forEach((currentNode) => { this.observer.observe(currentNode) })
    }

    operationAdd() {
        const { addOrDelList } = this.state;
        addOrDelList.push(addOrDelList.length);
        this.setState({ addOrDelList });
        // this.toBottom();
    }

    operationDel() {
        const { addOrDelList } = this.state;
        if (addOrDelList.length) {
            addOrDelList.pop();
            this.setState({ addOrDelList });
            // this.toBottom();
        }
    }

    toBottom() {
        setTimeout(function () { window.scrollTo(0, document.body.offsetHeight); }, 0);
        if (this.state.isTop) {
            this.setState({ isTop: false });
        }
    }

    slidePage() {
        if (this.state.isTop) { 
            window.scrollTo(0, document.body.offsetHeight);
            this.setState({ isTop: false });
        } else {
            window.scrollTo(0, 0);
            this.setState({ isTop: true });
        }
    }

  render() {
    const { attrName, state: { addOrDelList, isTop } } = this;
    const attrData = {};
        return (
            <React.Fragment>
                <Header title={"IntersectionObserver API测试"} borderBottom bg ></Header>
                <div className="lab-box">
                    <div className="btn-list">
                        <div className="btn-item" onClick={this.operationAdd.bind(this)} >添加</div>
                        <div className="btn-item" onClick={this.operationDel.bind(this)} >删除</div>
                    </div>
                    <div className="opt-list">
                        {
                          addOrDelList.map((num) => { 
                            attrData[attrName] = `mc-id:${num}`;
                            return <div key={num} {...attrData} className="opt-item">{num}</div>
                          })
                        }
                    </div>
                    <div className={`suspension ${isTop ? 'bottom-icon' : 'top-icon'}`} onClick={this.slidePage.bind(this)}></div>
                </div>
            </React.Fragment>
        )
    }
}
