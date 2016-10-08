/*
 * @Author: yangfengchu
 * @Date:   2016-09-18 16:38:25
 * @Last Modified 2016-09-29
 * @Last Modified time: 2016-09-29 19:24:31
 */

'use strict';
//json lead in 组件
import React, { Component } from 'react';
import classNames from 'classnames/bind'
import { desimplify, simplify, add } from 'simplifr'
import * as actions from '../actions/index'
import { connect } from 'react-redux'
//utils
function isArray(_) {
    return Object.prototype.toString.call(_) === '[object Array]';
}

function isObject(_) {
    return Object.prototype.toString.call(_) === '[object Object]';
}



class Leadin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            visible: false
        };
        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.saveHandle = this.saveHandle.bind(this)
    }
    componentDidMount() {
        if (this.props.visible) {
            this.changeVisible();
        }
    }
    changeVisible() {
        this.setState({
            visible: true,
        });
    }
    saveHandle() {
        let initData = this.refs.leadin.value;
        let { init_state } = this.props;
        try {
            //验证json数据
            let jsonData = JSON.parse(initData);
            // console.log("数据", this.dataConversion(jsonData))
            // let newData = ;
            let newData = this.dataConversion(jsonData)
                // let newData = simplify(jsonData);
            console.log(JSON.stringify(newData))


            //调用编辑器
            this.props.initJsonTree(true);
            //初始化编辑器数据
            init_state('root', newData)
        } catch (e) {
            //后期调用popup提醒
            console.error('错误信息:', e);
            this.props.initJsonTree(true);
        }

    }
    dataConversion(jsonData) {
        // "[object Object]": "Object",
        // "[object Array]": "Array",
        // "[object Null]": "Null",
        // "[object Undefined]": "Undefined"
        let typeList = {
            "[object String]": "random.word",
            "[object Number]": "random.number",
            "[object Boolean]": "random.boolean",
        }
        let data = simplify(jsonData)
        let newData = Object.keys(data).map((key, index) => {
            if (key === 'root') return;
            let targetType = Object.prototype.toString.call(data[key])
            if (typeList[targetType]) data[key] = typeList[targetType];
            // if (targetType === "[object Object]") {
            // let childData = data[key].childs;
            // childData.map((key, index) => {
            //     let targetType = Object.prototype.toString.call(key)
            //     childData[index] = typeList[targetType]
            //     return childData
            // })
            // }
            return data
        })
        let len = newData.length;
        let result = newData[len - 1];
        return result
            //引用问题
            // Object.assign({}, obj)浅拷贝
            // let cc = dataConversion(bbb)
            // let len = cc.length - 1;
            // console.log(cc[len], '2')

        //数组中存在  数组和对象的情况
        //对象中存在  对象和数组的情况
        //三大基本类型
        //空默认填充string

        //json数据转换成简单schema数据

    }
    onFocus() {
        this.setState({ isFocus: true })
    }
    onBlur() {
        this.setState({ isFocus: false })
    }
    render() {
        let { visible, isFocus } = this.state
        return (
            <div className={classNames({hide:visible},{row:true},{"form-group":true},{"is-focused":isFocus})}>
                <div className="col-md-10">
                    <textarea ref="leadin" onBlur= { this.onBlur} onFocus = {this.onFocus} className="form-control" rows="3" id="textArea"></textarea>
                    <span className="help-block">把json接口粘贴到这里点击保存会自动解析、填充到可视化编辑器.</span>
                </div>
                <div className="col-md-2">
                    <button onClick = {this.saveHandle}type="button" className="btn btn-xs btn-raised btn-success">保存</button>
                </div>
            </div>

        )
    }
}


function mapStateToProps(state, props) {
    return { data: state.jsonTree }
}
export default connect(mapStateToProps, actions)(Leadin)
