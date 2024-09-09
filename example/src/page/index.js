import React, { Component } from "react"
import Header from "../component/header/index"
import "../style/index.less"

export default class Index extends Component {
    constructor(options) {
        super(options)
        this.state = {
            pageAry: [
                { name: "List", url: "./list" },
                { name: "Detail", url: "./detail" },
                { name: "Home", url: "./home" },
                { name: "Laboratory", url: "./lab" }
            ]
        }
    }

    clickPage(pageInfo) {
        this.props.history.push(pageInfo.url);
    }

    render() {
        const { pageAry } = this.state
        return (
            <React.Fragment>
                <Header></Header>
                <div className="indexbox">
                    <div className="icon"></div>
                    <div className="describe">一个提供无侵入的自动化上报打点数据的工具@dp/fish</div>
                    <div className="cs">测试案例 :</div>
                    <div className="pagelist">
                        {
                            pageAry.map(pageInfo => {
                                return <div key={pageInfo.name} onClick={this.clickPage.bind(this, pageInfo)} className="item">{pageInfo.name}<div className="arrow"></div> </div>   
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
