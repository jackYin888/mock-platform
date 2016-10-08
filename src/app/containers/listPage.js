/*
 * @Author: yangfengchu
 * @Date:   2016-09-09 22:49:09
 * @Last Modified 2016-10-05
 * @Last Modified time: 2016-10-05 10:52:27
 */

'use strict';


//渲染api 列表


//增 ->不带数据到indexpage
//删 ->弹窗提醒
//改 ->带data到indexpage
//查 ->到详情页面
//真实际接口是否已经存在
//接口测试入口
//设计数据结构


import React, { Component } from 'react';
import Nav from '../components/nav';
import Table from '../components/table';
export default class Mock extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
        };
    }
    render() {
        //<Prompt/>
        return (
            <div className="container">
                <Nav/>
                <Table/>
            </div>
        );
    }
}
