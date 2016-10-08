import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import classNames from 'classnames/bind'
import '../styles/main.css';
import css from '../styles/all.scss';
import FakerGenerator from "./faker"



const cn = classNames.bind(css)
    //代码重构示例脚本
class Add extends Component {
    constructor(props) {
        super(props)
        this.cancelClick = this.cancelClick.bind(this)
        this.showGenerator = this.showGenerator.bind(this)
            //激活
        this.fieldActivate = this.fieldActivate.bind(this)
        this.objectActivate = this.objectActivate.bind(this)
        this.arrayActivate = this.arrayActivate.bind(this)
            //更改
        this.valueOnChange = this.valueOnChange.bind(this)
        this.addFieldClick = this.addFieldClick.bind(this)
        this.addArrayClick = this.addArrayClick.bind(this)
        this.addObjectClick = this.addObjectClick.bind(this)
            //添加
        this.state = {
            isObject: false,
            isArray: false,
            isField: false
        }
    }
    showGenerator(e) {
        this.props.showGenerator(e)
    }
    valueOnChange() {

    }
    fieldActivate() {
        this.setState({
            isObject: false,
            isArray: false,
            isField: true
        })
        this.refs.fieldKey.value = ''
        this.refs.fieldValue.value = ''
    }
    arrayActivate() {
        this.setState({
            isObject: false,
            isArray: true,
            isField: false
        })
        this.refs.arrayKey.value = ''
        this.refs.arrayValue.value = ''
    }
    objectActivate() {
        this.setState({
            isObject: true,
            isArray: false,
            isField: false
        })
        this.refs.objectKey.value = ''
        this.refs.objectValue.value = ''
    }
    clearValueState() {
        let { clearState } = this.props
        clearState({ methodName: "", result: "" })
    }
    addFieldClick(e) {
        const { submit, onSelect } = this.props
        const { fieldKey, fieldValue } = this.refs
        let self = this;

        clearTimeout(this.timer)

        this.timer = setTimeout(function() {
            submit(fieldValue.value, fieldKey.value)
                // self.clearValueState()
        }, 0)

        this.cancelClick()
    }
    addArrayClick(e) {
        const { submit } = this.props
        const { arrayKey, arrayValue, arrayLength } = this.refs
        const newArray = [];
        if (+arrayLength.value > 0) {
            for (let i = 0; i < arrayLength.value; i++) {
                newArray.push(arrayValue.value)
            }
            let self = this;
            clearTimeout(this.timer)
            this.timer = setTimeout(function() {
                submit(newArray, arrayKey.value)
                self.clearValueState()
            }, 0)
        }

        this.cancelClick()
    }
    addObjectClick(e) {
        const { submit, path } = this.props
        const { objectKey, objectValue } = this.refs
        let self = this;
        clearTimeout(this.timer)
        this.timer = setTimeout(function() {
            let fieldWrap = new Object()
                //单个直接填入 多个 map填入
            fieldWrap[objectValue.value] = ""

            submit(fieldWrap, objectKey.value, path)
            self.clearValueState()

        }, 0)
        this.cancelClick()

    }
    cancelClick(e) {
        this.setState({
            isObject: false,
            isArray: false,
            isField: false
        })
    }
    render() {
        const {
            isObject,
            isArray,
            isField
        } = this.state
        const { type } = this.props
        const buttonClass = cn({ btn: true }, { "btn-raised": true }, { "btn-sm": true })
            // console.log(this.props, this.state)
        return <div className={cn({add: true})}>
                <div className="form-group label-floating is-empty">

        <button className={cn({ hidden: isField }, { iconfont: true }, { btn: true }, { "btn-raised": true }, { "btn-sm": true })} onClick={this.fieldActivate}>字段</button>
        <button className={cn({ hidden: isObject }, { iconfont: true }, { btn: true }, { "btn-raised": true }, { "btn-sm": true })} onClick={this.objectActivate}>对象</button>
        <button className={cn({ hidden: isArray || type==='array' }, { iconfont: true }, { btn: true }, { "btn-raised": true }, { "btn-sm": true })} onClick={this.arrayActivate}>数组</button>
        {/* 新建字段 */}
        <form className={cn({hidden: !isField})}>
            <div className="row">
                <div className="col-md-3">
                    <input ref='fieldKey' className={cn({hidden: type==='array'},{"form-control":true})} placeholder="字段名"></input>
                </div>
                <div className="col-md-4">
                    <input className={cn({"form-control":true})} value={this.props.data.methodName
} onClick={this.showGenerator}  ref='fieldValue' readOnly placeholder="字段类型"></input>
                </div>
                <div className="col-md-2">
                    <button className={buttonClass} type="button" onClick={this.addFieldClick}>确定</button>
                </div>
                <div className="col-md-2">
                    <button className={buttonClass} type="button" onClick={this.cancelClick}>取消</button>
                </div>
            </div>
        </form>
        {/* 新建数组 */}
        <form className={cn({hidden: !isArray})}>
            <div className="row">
                <div className="col-md-3">
                    <input ref='arrayKey' className={cn({hidden: type==='array'},{"form-control":true})} placeholder="对象名称"></input>
                </div>
                <div className="col-md-2">
                    <input ref='arrayLength' className={cn({"form-control":true})} placeholder="数组长度"></input>
                </div>
                <div className="col-md-3">
                    <input className={cn({"form-control":true})} readOnly  value={this.props.data.methodName} onClick={this.showGenerator}  ref='arrayValue' placeholder="随机值类型"></input>
                </div>
                <div className="col-md-2">
                    <button className={buttonClass} type="button" onClick={this.addArrayClick}>确定</button>
                </div>
                <div className="col-md-2">
                    <button className={buttonClass} type="button" onClick={this.cancelClick}>取消</button>
                </div>
            </div>
        </form>
        {/* 新建对象 */}
        <form className={cn({hidden: !isObject})}>
            <div className="row">
                <div className="col-md-3">
                    <input ref='objectKey' className={cn({hidden: type==='array'},{"form-control":true})} placeholder="对象名"></input>
                </div>
                <div className="col-md-4">
                    <input className={cn({"form-control":true})}    ref='objectValue'  placeholder="字段列表"></input>
                </div>
                <div className="col-md-2">
                    <button className={buttonClass} type="button" onClick={this.addObjectClick}>确定</button>
                </div>
                <div className="col-md-2">
                    <button className={buttonClass} type="button" onClick={this.cancelClick}>取消</button>
                </div>
            </div>
        </form>
        </div>

    </div>
    }
}
class Remove extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <span className={cn({remove: true},{iconfont:true})} onClick={this.props.submit}>&#xe6aa;</span>
    }
}
class JsonTree extends Component {
    constructor(props) {
        super(props)
        this.click = this.click.bind(this)
        this.onChange = this.onChange.bind(this)
        this.addObject = this.addObject.bind(this)
        this.addArray = this.addArray.bind(this)
        this.remove = this.remove.bind(this)
        this.closeGenerator = this.closeGenerator.bind(this)
        this.showGenerator = this.showGenerator.bind(this)
        this.generatorOnChange = this.generatorOnChange.bind(this)
        this.fieldChange = this.fieldChange.bind(this)
        this.state = {
            generatorState: false,
            methodName: '',
            result: '',
            editField: ''
        };


    }
    click(e) {
        const { toggle, path } = this.props
        toggle(path)
    }
    onChange(e) {
        const { update, path } = this.props
        update(path, e.target.value)
    }
    addObject(value, key, newPath) {
        const { add_object, path } = this.props
        console.log(value, key)
        add_object(path, value, key)
        this.forceUpdate()
    }
    addArray(value) {
        const { add_array, path } = this.props
        add_array(path, value)
        this.forceUpdate()
    }
    remove() {
        const { remove_object, remove_array, path, isInArray } = this.props
        if (isInArray) {
            let keyPath = path.split('.')
            let key = keyPath.pop()
            remove_array(keyPath.join('.'), key)
        } else {
            remove_object(path)
        }

    }
    componentWillMount() {
        const { level, initExpandedLevel, data, toggle, path } = this.props
        if (level < initExpandedLevel && data.type && data.expanded === undefined) {
            toggle(path, true)
        }
    }
    renderNode() {
        const { data, path, level } = this.props
        const list = data.childs.map((key, id) => {
            return <li className="tree-li" key = {id}>
        <ConnectedJsonTree
          {...this.props}
          path={path + '.' + key}
          level={level + 1}
          isInArray={data.type === 'array'}
        />
      </li>
        });
        return <ul className="child-ul">{ list }</ul>;
    }
    closeGenerator() {
        this.setState({ generatorState: false })
    }
    showGenerator(e) {
        let positon = e.target.getBoundingClientRect()
        const { changeGeneratorPositon } = this.props;
        changeGeneratorPositon(positon)
        this.setState({
            generatorState: true
        })
    }
    handleFakerSelect() {
            this.setState({ generatorState: false })
        }
        //添加  和  更改都会影响这个
    fieldChange(e) {
        let { methodName, result } = e;
        this.setState({
            methodName: methodName,
            result: result
        })
    }
    generatorOnChange(e) {
        let { update, path } = this.props;
        let { methodName, result } = e;
        clearTimeout(this.timer)
        this.timer = setTimeout(function() {
            update(path, methodName)
        }, 0)

    }
    render() {

        let isRoot = null;
        if (this.props.path == 'root') isRoot = true;
        const { data, k, level } = this.props
        if (data === undefined) return false
        const t = data.type;
        const nodeClass = cn({
            'json-tree-view': !this.props.level
        })
        const iconClass = cn({
            'iconfont': true,
            'json-tree-icon': true,
            open: isRoot || data.expanded
        })

        if (t === 'object') {
            let generator = this.state.generatorState ? <FakerGenerator  handleConfirm={this.handleFakerSelect} onChange = {this.fieldChange}  visible={this.state.generatorState} onClose={this.closeGenerator}/> : '';

            let remove = this.props.path == 'root' ? '' : <Remove submit={this.remove}/>;
            return (
                <div className={nodeClass}>
                 {generator}

          <div className={iconClass} onClick={this.click}>&#xe611;</div>
          <span className={cn({object: true})} onClick={this.click}>{ k }: </span>
          <span className={cn({bracket: true})}>{'{'}</span>
            { data.expanded ? this.renderNode() : <span className={cn({count: true})}>{data.childs.length}</span>  }
          <span className={cn({bracket: true})}>{'}'}</span>
          <Add onSelect = {this.fieldChange} clearState = {this.props.onGeneratorSelected} data = {this.state} showGenerator={this.showGenerator} type="object" submit={this.addObject} path ={this.props.path}/>
        {remove}
        </div>
            )
        } else if (t === 'array') {
            let generator = this.state.generatorState ? <FakerGenerator  handleConfirm={this.handleFakerSelect} onChange = {this.fieldChange}  visible={this.state.generatorState} onClose={this.closeGenerator}/> : '';

            return (
                <div className={nodeClass}>
                                 {generator}

          <div className={iconClass} onClick={this.click}></div>
          <span className={cn({array: true})} onClick={this.click}>{ k }: </span>
          <span className={cn({bracket: true})}>{'['}</span>
            { data.expanded ? this.renderNode() : <span className={cn({count: true})}>{data.childs.length}</span>  }
          <span className={cn({bracket: true})}>{']'}</span>
          <Add  clearState = {this.props.onGeneratorSelected} onSelect = {this.fieldChange}  data = {this.state} showGenerator={this.showGenerator
} type="array" submit={this.addArray}/>
          <Remove submit={this.remove}/>
        </div>
            )
        } else {
            let generator = this.state.generatorState ? <FakerGenerator  handleConfirm={this.handleFakerSelect} onChange = {this.generatorOnChange}  visible={this.state.generatorState} onClose={this.closeGenerator}/> : '';
            return (
                <div className="form-group label-floating is-empty">
                 {generator}
                    <span className={cn({leaf: true})}>
                        <div className="row">
                            <div className="col-md-1">
                                <div className={cn({'json-tree-icon': true, 'not-visible': true })}></div>
                            </div>
                            <div className="col-md-3">
                                <input readOnly value={k} className={cn({"form-control":true})}/>
                            </div>
                            <div className="col-md-5">
                                <input readOnly onClick={this.showGenerator}  value={this.props.data} className={cn({"form-control":true})}/>
                            </div>
                            <div className="col-md-3">
                                <Remove submit={this.remove}/>
                            </div>
                        </div>
                    </span>
                </div>
            )
        }
    }
}
JsonTree.propTypes = {
    path: React.PropTypes.string,
    level: React.PropTypes.number,
    initExpandedLevel: React.PropTypes.number
}
JsonTree.defaultProps = {
    path: 'root',
    level: 0,
    initExpandedLevel: 0
}

function mapStateToProps(state, props) {
    let initState = state.jsonTree || state
    const { path = 'root' } = props
    return {
        generator: state.GeneratorSelected,
        data: initState[path],
        k: path.split('.').pop(),
    }
}
const ConnectedJsonTree = connect(mapStateToProps, actions)(JsonTree, Add)
export default ConnectedJsonTree
