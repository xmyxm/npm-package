import React, { Component } from "react"
import "./index.less"

export default class Header extends Component {
    back = () => {
        history.back()
    }

    next = () => {
        const { nextPage } = this.props
        if (nextPage) location.href = nextPage
    }

    render() {
        const { nextPage, hideHeight, bg, shadow, borderBottom, title = '' } = this.props
        return (
            <React.Fragment>
                <header className={`header${ borderBottom ? ' bbt' : ''}${ shadow ? ' shadow' : ''}${ bg ? ' bg' : ''}`}>
                    <div onClick ={this.back} className="back"></div>
                    <div className="title">{title}</div>
                    <div onClick={this.next} className={ nextPage ? "next-page" : "next"}></div>
                </header>
                {
                    !hideHeight && <div className="headerbox"></div>
                }
            </React.Fragment>
        )
    }
}


