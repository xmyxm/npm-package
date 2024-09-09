import React, { Component } from "react"
import Header from "../component/header/index"
import ContentCard from "../component/content-card/index"
import ContentTag from "../component/content-tag/index"
import fetch from '../util/fetch'
import { pageData } from "../util/listdata"
import "../style/list.less"

export default class List extends Component {
    constructor(options) {
        super(options)
        this.isFetch = false
        this.state = {
            pageData
        }
    }

    getData = async (tid) => {
        if (!tid) tid = this.state.pageData.tid
        const { cid, limit} = this.state.pageData
        const param = {cid, tid, limit}
        let tagContent = pageData.contentList.find(item => item.tid == param.tid);
        if (tagContent) {
            if (tagContent.end) return
            param.start = tagContent.start
        } else {
            param.start = 0
            tagContent = {
                tid,
                start: 0,
                data: [],
                end: false
            }
            pageData.contentList.push(tagContent)
        }
        pageData.tid = tid
        this.setState({pageData})
        const post_url = location.origin.replace(/(h5.dianping.com|h5.51ping.com)/, 'm.dianping.com') + "/content/api/column"
        this.isFetch = true
        const result = await fetch(post_url, param)
        if (result.code == 200) {
            const { columnListData, historyUpdates, title } = result.data;
            if (title) {
                pageData.title = title;
            }
            if (columnListData && columnListData[0] && columnListData[0].tagList) {
                pageData.tagList = columnListData[0].tagList;
            }
            if (historyUpdates && historyUpdates.length < limit) {
                tagContent.end = true
            } else {
                tagContent.start += limit
            }
            tagContent.data = tagContent.data.concat(historyUpdates)
        }
        this.isFetch = false
        this.setState({pageData})
    }

    loadData = () => {
        if (this.isFetch) return;
        let alltop = (document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight + 300;
        if (alltop > document.body.scrollHeight) {
            this.getData();
        }
    };

    changeTag = (tagId) => {
        const { pageData } = this.state
        const { contentList, tid } = pageData
        if (tid == tagId) return
        const tagContent = contentList.find(item => item.tid == tid);
        if (tagContent) {
            pageData.tid = tagId
            this.setState({pageData})
        }
        this.getData(tagId);
    }

    componentDidMount() {
        this.getData();
        window.addEventListener("scroll", this.loadData);
    }

    componentWillUnmount() {
        this.GlobalSV = null;
        this.ColumnSV = null;
        window.removeEventListener("scroll", this.loadData);
    }

    render() {
        const { tagList, contentList, tid, title } = this.state.pageData
        const tagContent = contentList.find(item => item.tid == tid);
        const isEnd = tagContent ? tagContent.end : false
        return (
            <React.Fragment>
                <Header title={title}></Header>
                {
                    (tagList && tagList.length > 0) &&
                    <div className="taglist">
                        <div className="tagbox">
                            <div id="scrollemt" className="container">
                                <ul className="scroll">
                                    {tagList.map((item, index) => {
                                        return <ContentTag key={item.id} clickHandle={this.changeTag} data={item} tid={tid} index={index} ></ContentTag>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                }
                {
                    (tagList && tagList.length > 0) &&  <div className="emptybox"></div>
                }
                {
                    (tagContent && tagContent.data.length > 0) && 
                    <div className="contentlist">
                        {
                            tagContent && tagContent.data.map((item, index) => {
                                return <ContentCard key={item.contentId} data={item} />
                            })
                        }
                    </div>
                }
                <div
                    className="load-wrap"
                    style={{ display: !isEnd ? "block" : "none" }}
                >
                    <div className="loading-img" />
                    <span className="loading-text">正在加载...</span>
                </div>
                {
                    isEnd && <div className="endinfo">没有更多攻略了</div>
                }
            </React.Fragment>
        )
    }
}
