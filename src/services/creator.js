/*
 * @Author: yangfengchu
 * @Date:   2016-08-31 17:41:09
 * @Last Modified 2016-09-06
 * @Last Modified time: 2016-09-06 18:42:00
 */

/*
Usage:

console.log(FileManager.ensureDirectoryExistence('data/dada/data/data/a.json'))
console.log(FileManager.ensureFileExistence('{aaa:2222}','data/dada/data/data/a.json'))
*/
'use strict';
//根据创建请求的schema 去创建目录层级以及json文件
const fs = require('fs')
const path = require('path')

class fileManager {
    constructor(filePath, name, schema) {} * directoryExists(path) {
            try {
                return fs.statSync(path).isDirectory();
            } catch (err) {
                return false;
            }
        }
        //mkdir
        * ensureDirectoryExistence(filePath) {
            let dirname = path.dirname(filePath);

            if (yield this.directoryExists(dirname)) {
                return true;
            }
            console.log(dirname)
            yield this.ensureDirectoryExistence(dirname);
            fs.mkdirSync(dirname);
        }
        //has dir
        * fileExists(filePath) {
            try {
                return fs.statSync(filePath).isFile();
            } catch (err) {
                return false;
            }
        }
        //写入文件
        * ensureFileExistence(context, filePath) {
            let schemaBuffer = new Buffer(JSON.stringify(context));
            let basename = path.basename(filePath)
            let state = yield this.fileExists(filePath)
            if (!state) {
                fs.writeFileSync(filePath, '', { 'flags': 'w+' }, function(err) {
                    console.log(err)
                })
            }
            let writerStream = fs.createWriteStream(filePath);
            writerStream.write(schemaBuffer, 'UTF8');
            writerStream.end();
            writerStream.on('finish', function() {
                console.log("write finish");
            });
            writerStream.on('error', function(err) {
                return err;
            });
            return true;
        }
}
module.exports = new fileManager();
