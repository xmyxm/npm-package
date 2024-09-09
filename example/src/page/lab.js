import React, { Component } from "react"
import Header from "../component/header/index";
import "../style/lab.less";

export default class Index extends Component {
    constructor(options) {
        super(options)
        this.threshold = 0.8;
        this.state = {
            pageList: [
                { name: "IntersectionObserver API测试", url: "./intersection" },
                { name: "MutationObserver API测试", url: "./mutation.html", noSpa: true },
                { name: "数据混淆加密测试", url: "./encrypt.html", noSpa: true },
                { name: "数据压缩加密测试", url: "./lz.html", noSpa: true },
                { name: "Performance 性能测试", url: "./performance.html", noSpa: true },
                { name: "onscroll 手动计算曝光测试", url: "./view-onscroll.html", noSpa: true },
                { name: "isomorphism 同构文本数据上报性能测试", url: "./isomorphism-text.html?report=true", noSpa: true },
             ],
        }
    }

    clickPage(pageInfo) {
        if (pageInfo.noSpa) {
            location.href = pageInfo.url
        } else {
            this.props.history.push(pageInfo.url);
        }
    }

    render() {
        const { pageList } = this.state;
        return (
            <React.Fragment>
                <Header title={"实验室"} borderBottom bg ></Header>
                <div className="lab-box">
                    <div className="title">页面地址：</div>
                    <div className="link-list">
                        {
                            pageList.map((item) => { 
                                return <div className="link-item" onClick={this.clickPage.bind(this, item)} key={item.name}>{item.name}<div className="arrow"></div></div>
                            })
                        }
                    </div>
                    <div className="content"> 不同场景下API回调结果验证与性能数据测算分析 </div>
                </div>
            </React.Fragment>
        )
    }
}
