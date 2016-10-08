/*
 * @Author: yangfengchu
 * @Date:   2016-08-25 18:55:05
 * @Last Modified 2016-09-27
 * @Last Modified time: 2016-09-27 14:46:40
 */

'use strict';
//数据模拟控件
import React, { Component } from 'react';
// import Select from 'react-select';
import Faker from 'faker';
import classNames from 'classnames/bind'
import { fakerApi } from './constant'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
class FakerGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            fakerApi: fakerApi,
            top: '',
            left: '',
            childData: [],
            childSelectValue: '',
            showMethod: false,
            apiMethod: '',
            childMethod: '',
        };
        this.handleApiMouseover = this.handleApiMouseover.bind(this);
        this.handleMethodMouseover = this.handleMethodMouseover.bind(this);
        this.handleApiMouseleave = this.handleApiMouseleave.bind(this);
        this.handleMethodMouseleave = this.handleMethodMouseleave.bind(this);
        this.handleMethodClick = this.handleMethodClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);


    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleCancelClick);
    }
    componentDidMount() {
            // console.log('componentDidMount')
            // console.log('渲染完成后调用一次，这个时候DOM结构已经渲染了。这个时候就可以初始化其他框架的设置了，如果利用jQuery绑定事件等等')
            document.body.addEventListener('click', this.handleCancelClick);
            if (this.props.visible) {
                this.changeVisible();
            }
        }
        //阻止冒泡失效,临时方案
    handleCancelClick() {
        let close = () => { this.props.onClose() }
        this.timer = setTimeout(() => close(), 200)
    }
    changeVisible() {
        this.setState({
            visible: true,
        });
    }
    fillingData(target) {
        let result = [];
        let { source, translation } = target
        if (target.source) {
            source.forEach((value, i) => {
                result.push({
                    value: value,
                    label: translation[i]
                })
            })
        } else {
            for (let i in target) {
                result.push(i)
            }
        }
        return result
    }
    dataGenerator(apiMethod, childMethod) {
            let method = Faker[apiMethod][childMethod]
            let result = method()
            let methodName = apiMethod + "." + childMethod;
            // let { onGeneratorSelected } = this.props
            this.props.onChange({ methodName, result })

            // onGeneratorSelected({ methodName, result })
        }
        //渲染节点
    renderNode(source, translation, method) {
        const list = source.map((key, id) => {
            let chidKey = translation ? translation[id] : key;
            return <li key = {id}>
           <a data = {key} href="javascript:void(0)">{chidKey}</a>
      </li>
        });
        return <ul className="dropdown-menu">{ list }</ul>;
    }
    handleApiMouseleave(e) {
        // let list = document.querySelector('.faker-api-list');
        if (e.target && e.target.nodeName.toLowerCase() == 'a') {
            let { value } = e.target.attributes[0]
            this.setState({
                apiMethod: value
            })
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({
                    showMethod: false
                })
            }, 3000)
        }
    }
    handleApiMouseover(e) {
        if (e.target && e.target.nodeName.toLowerCase() == 'a') {
            let positon = e.target.getBoundingClientRect()
            let { value } = e.target.attributes[0]
            let childData = this.fillingData(Faker[value])
            this.setState({
                showMethod: true,
                left: positon.right - 417,
                top: 0,
                childData: childData
            });
        }
    }
    handleMethodMouseleave(e) {
        if (e.target && e.target.nodeName.toLowerCase() == 'a') {}
    }
    handleMethodMouseover(e) {
        if (e.target && e.target.nodeName.toLowerCase() == 'a') {
            clearTimeout(this.timer);
        }
    }
    handleCancel() {

    }
    handleMethodClick(e) {
        e.preventDefault();
        if (e.target && e.target.nodeName.toLowerCase() == 'a') {
            let { value } = e.target.attributes[0]
            this.setState({
                showMethod: false
            })
            this.dataGenerator(this.state.apiMethod, value)
            this.props.onClose();
        }
    }
    render() {
        const generatorState = classNames({
            'generator-wrap': true,
            'hide': !this.state.visible
        })


        let positon = {
            left: this.state.left,
            top: this.state.top
        }

        let {
            bottom,
            height,
            left,
            right,
            top,
            width
        } = this.props.data;
        let initPosition = {
            left: left,
            top: 0
        }
        let { source, translation } = fakerApi
        return (
            <div style={initPosition} className={generatorState}>
                <div className="data-selector">
                    <div onMouseLeave={this.handleApiMouseleave} onMouseOver={this.handleApiMouseover}   className="dropdown open faker-api-list">
                        {this.renderNode(source,translation)}
                    </div>
                    <div onClick={this.handleMethodClick} style={positon} onMouseLeave={this.handleMethodMouseleave} onMouseOver={this.handleMethodMouseover} className="dropdown open method-list">
                        {this.state.showMethod? this.renderNode(this.state.childData):''}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        data: state.GeneratorPosition,
        update: state.GeneratorSelected
    }
}
export default connect(mapStateToProps, actions)(FakerGenerator)
