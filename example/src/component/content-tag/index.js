

/* eslint-disable react/prefer-stateless-function */

import React, { Component } from "react"
import { attr } from '@dp/fish'
import "./index.less"

export default class ContentTag extends Component {
    render() {
        const { data, index, tid, clickHandle } = this.props;

        const valLab = {
            index,
            custom: {
                tag_id: data.id,
                model_title: data.name,
            }
        };

        const clickData = { valBid: "list_tag_item_mc", valLab }

        const viewData = { valBid: "list_tag_item_mv", valLab }

        return (
            <li {...attr({clickData, viewData})} onClick={clickHandle.bind(this, data.id)} className={data.id == tid ? "item select" : "item"}>
                <div className="maxtitle">{data.name}</div>
            </li>
        );
    }
}
