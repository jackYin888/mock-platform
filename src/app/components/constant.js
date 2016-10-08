/*
 * @Author: yangfengchu
 * @Date:   2016-09-16 20:42:50
 * @Last Modified 2016-09-16
 * @Last Modified time: 2016-09-16 22:48:15
 */

'use strict';
//faker Api方法列表
//'definitions'
export const fakerApi = {
    source: [
        'random',
        'helpers',
        'name',
        'address',
        'company',
        'finance',
        'image',
        'lorem',
        'hacker',
        'internet',
        'phone',
        'date',
        'commerce',
        'system'
    ],
    translation: [
        '随机',
        '助手',
        '姓名',
        '地址',
        '公司',
        '金融',
        '图像',
        '文章',
        '黑客',
        '网络',
        '手机',
        '日期',
        '商业',
        '系统'
    ]
}

export let information = {
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
const generate = (n, f) => {
    f = f || function(i) {
        return i
    }
    let arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(f(i))
    }
    return arr;
}
export const data = {
    text: 'hello',
    number: '123',
    object: {
        key1: 'value1',
        array1: generate(5),
        object1: {
            text: 'hi'
        }
    },
    arrayOfObjects: generate(2, (i) => {
        return { x: i, y: i * i }
    }),
    arrayOfComplexObjects: generate(2, (i) => {
        return {
            x: i,
            y: generate(2, (i) => {
                return { x: 'value' + i, y: i * i * i }
            })
        }
    }),
    largeArray: generate(20, function(i) {
        //return i;
        return {
            x: i,
            y: 2 * i
        }
    })
};
