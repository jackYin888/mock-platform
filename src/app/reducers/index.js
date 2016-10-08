import { ADD_OBJECT, ADD_ARRAY, UPDATE, REMOVE_OBJECT, REMOVE_ARRAY, TOGGLE, INIT_STATE } from '../actions/index'
import { add, update, remove, desimplify } from 'simplifr'
import { combineReducers } from 'redux'
import { data } from '../components/constant'
import { simplify } from 'simplifr'
import { routerReducer } from 'react-router-redux'

let initApiData = {
    "name": "",
    "mean": "",
    "method": "GET",
    "note": "备注",
    "company": "beisen",
    "version": "v2",
    "group": "",
    "param": {},
    "path": ""
}

function jsonTree(state = simplify({}), action) {
    const { path, value, key } = action

    if (typeof path === 'undefined') {
        return state
    }

    switch (action.type) {
        case ADD_OBJECT:
            if (key === '') return state
            return add(Object.assign({}, state), path, {
                [key]: getValue(value)
            })
        case INIT_STATE:
            return value
        case ADD_ARRAY:
            return add(Object.assign({}, state), path, getValue(value))
        case UPDATE:
            return Object.assign({}, state, {
                [path]: !isNaN(+value) && isFinite(value) ? +value : value
            })
        case REMOVE_OBJECT:
            return remove(Object.assign({}, state), path)

        case REMOVE_ARRAY:
            const expanded = state[path].expanded
            let array = desimplify(state, path)
            array.splice(key, 1)
            let newState = update(Object.assign({}, state), path, array)
            newState[path].expanded = expanded
            return newState

        case TOGGLE:
            return Object.assign({}, state, {
                [path]: Object.assign({}, state[path], {
                    expanded: value === undefined ? !state[path].expanded : value
                })
            })
        default:
            return state
    }
}

function getValue(value) {
    let temp = value
    if (!isNaN(+value) && isFinite(value)) {
        temp = +value
    }
    /* try to parse string to json */
    else {
        try {
            temp = JSON.parse(value)
        } catch (e) {}
    }
    return temp
}
// function merge(state, name, value) {
//     state[name] = value;
//     return state;

//     return Object.assign({},state,{mean:value});

// }
//

let position = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
}

function GeneratorPosition(state = position, action) {
    switch (action.type) {
        case "CHANDE_POSITION":
            return action.value;
        default:
            return state;
    }

}
//选择器确认
function GeneratorSelected(state = { methodName: '', result: '' }, action) {
    let { value, type } = action;
    switch (type) {
        case "ON_SELECT":
            return value;
        default:
            return state;
    }

}

function PopForm(state = initApiData, action) {
    let { name, type, value } = action;
    switch (action.type) {
        //接口名称
        case "EDIT_NAME":
            return Object.assign({}, state, { name: value });
            //接口含义
        case "EDIT_MEAN":
            return Object.assign({}, state, { mean: value });;
            //请求方法
        case "EDIT_METHOD":
            return Object.assign({}, state, { method: value });;
            //备注
        case "EDIT_NOTE":
            return Object.assign({}, state, { note: value });;
            //公司名称
        case "EDIT_COMPANY":
            return Object.assign({}, state, { company: value });;
            //版本
        case "EDIT_VERSION":
            return Object.assign({}, state, { version: value });;
            //分组
        case "EDIT_GROUP":
            return Object.assign({}, state, { group: value });;
            //参数
        case "EDIT_PARAM":
            return Object.assign({}, state, { param: value });;
            //路径
        case "EDIT_PATH":
            return Object.assign({}, state, { path: value });;
            //默认值
        default:
            return state;
    }

}
export default combineReducers({
    GeneratorPosition,
    PopForm,
    jsonTree,
    GeneratorSelected,
    routing: routerReducer

})
