import React, { Component } from "react";
import Confirm from "../component/confirm/index";
import Header from "../component/header/index";
import { fishClick, fishView, fishPV } from '@dp/fish'
import "../style/home.less";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    del() {
        Confirm({
            title: "确定删除这条评论吗",
            message: "",
            leftText: "取消",
            rightText: "确认",
            success: function (res) { console.log(`打印结果：${JSON.stringify(res)}`) }
        })
    }

    cancel() {
        Confirm({
            title: "提示",
            message: "确认不再关注TA吗？",
            leftText: "否",
            rightText: "是",
            success: function (res) { console.log(`打印结果：${JSON.stringify(res)}`) }
        })
    }

    ok() {
        Confirm({
            title: "您的反馈已提交",
            message: "",
            leftText: "",
            rightText: "知道了",
            success: function (res) { console.log(`打印结果：${JSON.stringify(res)}`) }
        })
    }

    btnClick() {
        fishClick('home_btn_mc')
        fishClick({valBid: 'home_btn_mc'})
    }

    btnView() {
        fishView({valBid: 'home_btn_mv'})
    }

    btnPV() {
        fishPV({ cid: 'home_btn_pv' })
    }

    render() {
        return (
            <React.Fragment>
                <Header title={"弹层打点测试"}></Header>
                <div className="seed-confirm-box">
                    <div className="seed-confirm-btn" onClick={this.del}>删除</div>
                    <div className="seed-confirm-btn" onClick={this.cancel}>取消关注</div>
                    <div className="seed-confirm-btn" onClick={this.ok} >提交反馈</div>

                    <div className="seed-confirm-btn" onClick={this.btnClick}>手动上报点击点</div>
                    <div className="seed-confirm-btn" onClick={this.btnView}>手动上报曝光点</div>
                    <div className="seed-confirm-btn" onClick={this.btnPV}>手动上报PV点</div>

                </div>
            </React.Fragment>
        );
    }
}
