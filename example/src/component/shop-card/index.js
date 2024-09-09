import React, { Component } from "react"
import { attr } from '@dp/fish'
import "./index.less"

export default class ShopCard extends Component {

    render() {
        const { title, price, subtitle, picture, moduleId } = this.props.data

        const valLab = { poi_id: moduleId, title: title, custom: { abTest: title } };

        const clickData = { valBid: "detail_poi_mc", valLab }

        const viewData = { valBid: "detail_poi_mv", valLab }

        return (
            <div {...attr({clickData, viewData})} className="cardbox">
                <div className="content-warp">
                    <div className="imgbox">
                        <img className="picture" src={picture} />
                    </div>
                    <div className="content-info">
                        <div className="title">{title}</div>
                        <div className="price">{price}</div>
                        <div className="subtitle">{subtitle}</div>
                    </div>
                </div>
            </div>
        )
    }
}

