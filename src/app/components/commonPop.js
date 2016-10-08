/*
 * @Author: yangfengchu
 * @Date:   2016-08-25 18:50:42
 * @Last Modified 2016-09-17
 * @Last Modified time: 2016-09-17 09:04:18
 */

'use strict';
//公用弹窗控件
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { desimplify } from 'simplifr'
import * as actions from '../actions/index'
import classNames from 'classnames/bind'

class PopForm extends Component {
    constructor(props) {
        super(props);
        this.mappingTable = {
                "name": ["接口名称", "getUserData"],
                "mean": ["含义", "获取用户数据"],
                "method": ["请求方式", "GET"],
                "note": ["备注", "备注"],
                "company": ["公司名称", "beisen"],
                "version": ["版本", "v2"],
                "group": ["分组", "beisenFED"],
                "param": ["参数", "{filter:name}"],
                "path": ["路径", ""]
            }
            //防止reducer 影响自身state引发重新渲染
        this.state = {
            data: this.props.data,
            visible: false
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleConfirm = this.handleConfirm.bind(this)
        // this.handleCancel = this.handleCancel.bind(this)

    }

    // componentWillMount() {
    //     console.log('componentWillMount')
    //     console.log('渲染前调用一次，这个时候DOM结构还没有渲染')

    // }


    // shouldComponentUpdate() {
    //     console.log('shouldComponentUpdate')
    //     console.log('初始化渲染不会调用，接收到新的props或state时调用')
    //     return true
    // }

    // componentWillUpdate() {
    //     console.log('componentWillUpdate')
    //     console.log('初始化渲染不会调用，更新前调用')

    // }

    // componentDidUpdate() {
    //     console.log('componentDidUpdate')
    //     console.log('初始化渲染不会调用，更新后调用')

    // }

    // componentWillUnmount() {
    //     console.log('componentWillUnmount')
    //     console.log('组件移除前调用')

    // }

    componentDidMount() {
        // console.log('componentDidMount')
        // console.log('渲染完成后调用一次，这个时候DOM结构已经渲染了。这个时候就可以初始化其他框架的设置了，如果利用jQuery绑定事件等等')

        if (this.props.visible) {
            this.changeVisible();
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props.visible, nextProps.visible, '------------')
        // console.log('componentWillReceiveProps')
        // console.log('初始化渲染不会调用，在接收到新的props时，会调用这个方法')
        if (!this.props.visible && nextProps.visible) {
            this.changeVisible();
        }
        // else if (this.props.visible && !nextProps.visible) {
        //     // this.leave();
        // }
    }

    changeVisible() {
        this.setState({
            visible: true,
        });
    }



    // handleConfirm(e) {
    //     this.setState({
    //         visible: this.props.show
    //     })
    // }
    // handleCancel(e) {
    //     this.setState({
    //         visible: !this.props.show
    //     })
    // }
    handleChange(e) {
            if (e.target && e.target.nodeName.toLowerCase() == 'input') {
                const { pop_form_field_change } = this.props
                let id = e.target.id
                let value = e.target.value;
                let type = 'EDIT_' + id.toUpperCase()
                pop_form_field_change(type, value, id)
            }

        }
        // componentWillReceiveProps(obj, next) {
        //     console.log(obj, next)

    // }
    render() {
        const modal = classNames({
            'modal': true,
            'show': this.state.visible
        })
        let fields = Object.keys(this.state.data).map((key, id) => {
            return <div className="form-group" key ={id} >
                        <label  className="col-md-2 control-label">{this.mappingTable[key][0]}</label>
                        <div className="col-md-10">
                            <input type="text" id={key} defaultValue={this.props.data[key]} className="form-control"  placeholder={this.mappingTable[key][1]}/>
                        </div>
                    </div>
        })
        return (
            <div className="bs-component">
                <div className={modal}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <button onClick={this.props.onClose} type="button" className="close" data-dismiss="modal" aria-hidden="false">×</button>
                            <h4 className="modal-title">接口信息</h4>
                            </div>
                            <div className="modal-body">
                                <form className='PopForm' onChange={this.handleChange}>
                                {fields||''}
                                </form>
                            </div>
                            <div className="modal-footer">
                            <button onClick = {this.props.handleConfirm} type="button" className="btn btn-primary">保存</button>
                            <button onClick = {this.props.onClose} type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return { data: state.PopForm }
}
export default connect(mapStateToProps, actions)(PopForm)
