import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import fish, { attr, dataToJson } from '@dp/fish'
import { initClick } from '@dp/fish';
import './index.less';

let destroy
let confirmEle

export class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = Object.assign({visible: true}, this.props)
    }

    updateConfig(config) {
        this.setState(Object.assign({}, this.state, {visible: true}, config))
    }

    componentDidMount() {
        this.maskTouchmove()
        initClick({
            clickAttr: 'data-click',
            sendClickData: function (res) { 
                console.log('自定义initClick捕获到数据：', res)
            }
        })
        fish.initView({
            viewAttr: 'data-view',
            sendViewData: function (res) { 
                console.log('自定义initView捕获到数据：', res)
            }
        })
    }

    componentDidUpdate() {
        this.maskTouchmove()
    }

    /**
     * 处理遮罩, 禁止滚动
     */
    maskTouchmove() {
        if (this.state.visible) {
            window.addEventListener('touchmove', this.preventEvent, { passive: false});
        } else {
            window.removeEventListener('touchmove', this.preventEvent);
        }
    }

    preventEvent(e) {
        e.preventDefault();
    }

    btnHandle(options) {
        let { success } = this.state
        this.setState({ visible: false })
        success && success(options)
    }

    render() {
        let { visible, title, message, leftText, rightText} = this.state

        return (
            <div {...attr({ viewData: 'confirm_mv' })} className={ visible ? "confirm-mask-show" : "confirm-mask"}>
                <div
                    className={"confirm-main"}
                    data-click={dataToJson({ content: '测试我们的 data-click' })}
                    data-view={dataToJson({content: '测试我们的 data-view'})} 
                >
                    <div className={"confirm-title"}>{title}</div>
                    {message && <div className={"confirm-body"}>{message}</div>}
                    <div className={"confirm-actions"}>
                        {!!leftText &&
                            <div
                            {...attr({clickData: 'confirm_left_mc'})}
                            className={"confirm-btn-weight"}
                            onClick={this.btnHandle.bind(this, {area: "left"})}
                            >{leftText}</div>}
                        {!!rightText &&
                            <div
                            {...attr({clickData: 'confirm_right_mc'})}
                            className={"confirm-btn-text"}
                            onClick={this.btnHandle.bind(this, {area: "left"})}
                            >{rightText}</div>}
                    </div>
                </div>
            </div>
        )
    }
}

function instance(config) {
    const div = document.createElement('div')
    div.id = 'seed-confirm'
    document.body.appendChild(div)
    ReactDOM.render(<Confirm {...config} ref={(el) => { confirmEle = el }} />, div)
    return function () {
        ReactDOM.unmountComponentAtNode(div)
        document.body.removeChild(div)
        destroy = confirmEle = null
    }
}

export default function (config) {
    if (destroy) {
        confirmEle.updateConfig(config)
    } else {
        destroy = instance(config)
    }
    return destroy
}
