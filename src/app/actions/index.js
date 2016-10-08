//编辑
export const ADD_PARAM = "ADD_PARAM";
export const EDIT_PARAM = "EDIT_PARAM";
export const DEL_PARAM = "DEL_PARAM";
export const MOCK_GET = "MOCK_GET";
export const MOCK_POST = "MOCK_POST";
export const EDIT_URL = "EDIT_URL"
export const EDIT_METHOD = "EDIT_METHOD"
    //json-tree
export const ADD_OBJECT = 'ADD_OBJECT'
export const ADD_ARRAY = 'ADD_ARRAY'
export const UPDATE = 'UPDATE'
export const REMOVE_OBJECT = 'REMOVE_OBJECT'
export const REMOVE_ARRAY = 'REMOVE_ARRAY'
export const TOGGLE = 'TOGGLE'
export const CHANDE_POSITION = 'CHANDE_POSITION'
export const ON_SELECT = 'ON_SELECT';
export const INIT_STATE = 'INIT_STATE';


export function init_state(path, value) {
    return {
        type: INIT_STATE,
        path,
        value
    }
}

//json-tree
export function add_object(path, value, key) {
    return {
        type: ADD_OBJECT,
        path,
        key,
        value
    }
}

export function add_array(path, value) {
    return {
        type: ADD_ARRAY,
        path,
        value
    }
}

export function update(path, value) {
    return {
        type: UPDATE,
        path,
        value
    }
}

export function remove_object(path) {
    return {
        type: REMOVE_OBJECT,
        path
    }
}

export function remove_array(path, key) {
    return {
        type: REMOVE_ARRAY,
        path,
        key
    }
}

export function toggle(path, value) {
    return {
        type: TOGGLE,
        path,
        value
    }
}
//ui
export function pop_form_field_change(type, value, name) {
    return {
        name: name,
        type: type,
        value: value
    }
}
export function changeGeneratorPositon(value) {
    return {
        type: CHANDE_POSITION,
        value: value
    }
}
export function onGeneratorSelected(value) {
    return {
        type: ON_SELECT,
        value: value
    }
}
