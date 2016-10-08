/*
 * @Author: yangfengchu
 * @Date:   2016-08-31 15:15:46
 * @Last Modified 2016-09-06
 * @Last Modified time: 2016-09-06 18:41:40
 */

'use strict';

//根据request请求查询相应的json schema 给 converter使用


let path = '/beisen/api/v2/group/getUserData'

const fs = require('fs')
class Scaner {
    constructor(param, rootPath, path) {}
        //根据请求组装路径
        * findFile(param, rootPath, path) {
            let filePath = rootPath + '/' + path
            let findResult = yield this.scan(filePath)
            console.log(filePath, findResult)
            return findResult
        }
        //扫描文件
        * scan(filePath) {
            try {
                return fs.statSync(filePath).isFile();
            } catch (err) {
                return false;
            }
        }
        //返回组装后的路径给转换器进一步调用
        * readApi(path) {

        }
}

module.exports = new Scaner();
