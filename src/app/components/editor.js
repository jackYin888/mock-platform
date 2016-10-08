/*
 * @Author: yangfengchu
 * @Date:   2016-08-29 15:10:20
 * @Last Modified 2016-09-27
 * @Last Modified time: 2016-09-27 12:42:22
 */

'use strict';
import React, { Component } from "react"
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/index'
import { connect } from 'react-redux'
import JsonTree from './JsonTree';
import Menu, { SubMenu, MenuItem } from 'rc-menu'
import PopForm from './commonPop'
import Leadin from './leadin'


class Editor extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            popFormState: false,
            jsonTreeState: false,
            leadinState: false
        };
        this.closepopForm = this.closepopForm.bind(this)
        this.showpopForm = this.showpopForm.bind(this)
        this.handlePopFormConfirm = this.handlePopFormConfirm.bind(this)
        this.showJsonTree = this.showJsonTree.bind(this)
        this.showLeadin = this.showLeadin.bind(this)
        this.closeLeadin = this.closeLeadin.bind(this)
        this.initJsonTree = this.initJsonTree.bind(this)
    }
    initJsonTree(isTree) {
        this.setState({ jsonTreeState: isTree, leadinState: !isTree })
    }
    showJsonTree() {
        this.setState({ jsonTreeState: true })
    }
    showLeadin() {
        this.setState({ leadinState: true })
    }
    closeLeadin() {
        this.setState({ leadinState: false })
    }
    handlePopFormConfirm() {
        this.setState({ popFormState: false })
            // console.log('保存接口信息')
    }
    closepopForm(e) {
        this.setState({ popFormState: false })
    }
    showpopForm(e) {
        this.setState({ popFormState: true })
    }
    render() {
        let {
            popFormState,
            leadinState,
            jsonTreeState
        } = this.state
        let popForm = popFormState ? <PopForm handleConfirm={this.handlePopFormConfirm}  visible={popFormState} onClose={this.closepopForm}/> : '';
        let leadin = leadinState ? <Leadin  initJsonTree = {this.initJsonTree} visible={jsonTreeState} onClose={this.closeLeadin}/> : '';
        let jsonTree = jsonTreeState ? <JsonTree path="root" initExpandedLevel={2}/> : '';
        const { dispatch, mock, addParam, delParam, editParam } = this.props;
        return (
            <div className="col-md-6">
                    {popForm}
                <div className="editor">
                    <h4>接口信息(第一步)</h4>
                    <form className="bs-component">
                        <div className="form-group label-floating is-empty">
                            <label className="control-label " htmlFor="focusedInput2">点击配置接口信息</label>
                            <input onClick ={this.showpopForm} className="form-control" id="focusedInput2" type="text"/>
                        </div>
                    </form>
                    <h4>数据配置(第二步)</h4>
                    <button onClick={()=>{this.initJsonTree(true)}} type="button" className="btn btn-xs btn-raised btn-info">新建</button>
                    <button onClick={()=>{this.initJsonTree(false)}} type="button" className="btn btn-xs btn-raised btn-info">导入json</button>
                    <div>
                        {leadin}
                        {jsonTree}
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
