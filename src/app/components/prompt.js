/*
 * @Author: yangfengchu
 * @Date:   2016-09-18 15:44:02
 * @Last Modified 2016-09-18
 * @Last Modified time: 2016-09-18 16:40:43
 */

'use strict';


import React, { Component } from 'react';
// ["warning", "info", "warning", "danger"]
// <Prompt onClose={this.promptOnClose} msg ={"消息信息"} type ={1}/>
// 通过action creator触发
export default class Prompt extends Component {
    constructor(props) {
        super(props);
        let title = {
            "warning": "警告!",
            "info:": "提示:",
            "success": "成功信息",
            "danger": "危险!!!"

        }
        this.state = {
            type: this.props.type || "info",
            message: this.props.message || "啊偶,可能粗线了什么错误。",
            title: title[this.props.message] || "温馨提示"
        };
    }
    componentDidMount() {
        this.autoClose();
        if (this.props.visible) {
            this.changeVisible();

        }
    }
    changeVisible() {
        this.setState({
            visible: true,
        });
    }

    //生命周期  调用 autoClose
    autoClose() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            // this.props.onClose()
        }, 2700);
    }
    render() {
        return (
            <div className="alert alert-dismissible alert-success">
                <button type="button" className="close" data-dismiss="alert">×</button>
                <h4>{this.state.title}</h4>
                <p>{this.state.message}</p>
            </div>

        )
    }
}
