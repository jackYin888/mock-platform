/*
 * @Author: yangfengchu
 * @Date:   2016-08-25 18:55:36
 * @Last Modified 2016-09-18
 * @Last Modified time: 2016-09-18 16:36:12
 */

//按钮组

'use strict';
import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actionCreators from '../actions/index'
import { bindActionCreators } from 'redux'
import ajax from './ajax';
import fetch from 'fetch'
let { href } = window.location;
const { editUrl, editMethod } = actionCreators;
class ButtonList extends Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this)
    }
    postError(msg) {
        console.log('错误状态:', msg)
    }
    postCallback(resp) {
        //调用tips组件
        alert('保存成功')
        console.log(resp)
    }
    submitHandler() {
        const data = {
            "apiName": "getUserData",
            "name": "获取用户数据",
            "method": "GET",
            "note": "备注",
            "company": "beisen",
            "version": "v2",
            "group": "tita",

            "parem": {
                "filter": "name"
            },
            "path": "/beisen/api/v2/tita/getUserData",
            "schema": {
                "type": "object",
                "properties": {
                    "user": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "$ref": "#/definitions/positiveInt"
                            },
                            "name": {
                                "type": "string",
                                "faker": "name.findName"
                            },
                            "email": {
                                "type": "string",
                                "format": "email",
                                "faker": "internet.email"
                            }
                        },
                        "required": ["id", "name", "email"]
                    }
                },
                "required": ["user"],
                "definitions": {
                    "positiveInt": {
                        "type": "integer",
                        "minimum": 0,
                        "exclusiveMinimum": true
                    }
                }
            }
        }

        fetch('/createSchema', {
            method: 'POST',
            body: data
        }).then(function (data) {
            debugger
        })
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <h4>配置编辑器</h4>
                </div>
                <div className="col-md-6">
                    <strong>保存接口(第三步) ：</strong>
                    <button onClick={this.submitHandler} type="button" className="btn btn-xs btn-raised btn-success">保存API</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        mock: state.mock
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonList)
