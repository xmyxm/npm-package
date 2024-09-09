/* eslint-disable react/prefer-stateless-function */

import React, { Component } from "react"
import { attr } from '@dp/fish'
import "./index.less"

export default class ContentCard extends Component {

    render() {
        const { data, contentHader } = this.props;
        if (!data) return null;
        if (!data.backColor || data.backColor.length != 7) {
            data.backColor = "#e1e1e1";
        }
        let shopStr = data.shopDescribe;
        let shopText = shopStr;
        let shopMoreText = "";
        if (/家店$/.test(shopStr)) {
            shopMoreText = shopStr.substr(shopStr.lastIndexOf("等"));
            shopText = shopStr.substr(0, shopStr.length - shopMoreText.length);
        }

        const valLab = {
            title: data.title,
            custom: {
                tag_id: data.tagId,
                content_id: data.contentId
            }
        };

        const clickData = { valBid: "list_content_item_mc", valLab }

        const viewData = { valBid: "list_content_item_mv", valLab }

        return (
            <div
                {...attr({clickData, viewData})}
                className="guidecard"
                onClick={contentHader}
                style={{ background: data.backColor }}
            >
                <div
                    className={
                        data.shopDescribe ? "contentcenter" : "contentaround"
                    }
                >
                    <div className="title">{data.title}</div>
                    {!!data.shopDescribe && (
                        <div className="moreshop">
                            <i className="shopicon" />
                            <span
                                className={
                                    shopMoreText ? "shoptext stj" : "shoptext"
                                }
                            >
                                {shopText}
                            </span>
                            <span
                                className={
                                    shopMoreText
                                        ? "shopmoretext smtj"
                                        : "shopmoretext"
                                }
                            >
                                {shopMoreText}
                            </span>
                        </div>
                    )}
                    <div className="baseinfo">
                        <div className="icon">
                            <img className="user" src={ data.guideUserDTO.authorIconUrl}/>
                            {data.guideUserDTO.vipLogo.length > 0 && (
                                <img
                                    className="level"
                                    src={data.guideUserDTO.vipLogo}
                                />
                            )}
                        </div>
                        <div className="name">
                            {data.guideUserDTO.authorNickName}
                        </div>
                        <div className="viewcount">
                            浏览 {data.viewNum}
                        </div>
                        <div className="likecount">
                            赞 {data.likeNum}
                        </div>
                    </div>
                </div>
                <div className="imgbox">
                    <img className="imgfile" src={data.picture} />
                </div>
            </div>
        );
    }
}
