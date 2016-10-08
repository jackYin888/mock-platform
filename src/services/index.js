/*
 * @Author: yangfengchu
 * @Date:   2016-08-31 11:25:30
 * @Last Modified 2016-10-05
 * @Last Modified time: 2016-10-05 09:31:50
 */

'use strict';
//依赖
const koa = require('koa'),
    app = koa(),
    router = require('koa-router')(),
    koaBody = require('koa-body')(),
    fs = require('fs'),
    faker = require('faker'),
    scaner = require('./scaner'),
    converter = require('./converter'),
    creator = require('./creator'),
    rootPath = __dirname,
    co = require('co'),
    domain = 'http://beisen.me';


//var json = yield fs.readFile('package.json', 'utf8')
//var files = yield fs.readdir('/tmp')

// var fs = require('co-fs');

// app.use(function *(){
//   var paths = yield fs.readdir('docs');

//   var files = yield paths.map(function(path){
//     return fs.readFile('docs/' + path, 'utf8');
//   });

//   this.type = 'markdown';
//   this.body = files.join('');
// });


//Routing rules
router
    .param('company', function*(company, next) {
        // this.user = users[id];
        // if (!this.user) return this.status = 404;
        this.company = company
        yield next;
    })
    .param('group', function*(group, next) {
        this.group = group
        yield next;
    })
    .param('version', function*(version, next) {
        this.version = version
        yield next;
    })

.param('interfaceName', function*(interfaceName, next) {
    this.interfaceName = interfaceName
    yield next;
})

//responce api request
.get('/:company/api/:version/:group/:interfaceName', function*(next) {
    //param,rootPath,path
    let path = this.company + '/api/' + this.version + '/' + this.group + '/' + this.interfaceName;
    let findResult = yield scaner.findFile(null, rootPath, path);
    if (!findResult) return this.status = 404
    let context = JSON.parse(fs.readFileSync(path, 'utf8'));
    let result = yield converter.iIterator(context.schema)
    this.body = result
})

//create schema file
//check schema info ??????
//扫描文件 ->创建文件夹 -> 创建文件 ->写入schema数据- >写入成功信息 ->返回mock数据
.post('/createSchema', koaBody, function*(next) {
    //request body
    let context = this.request.body;
    let { path, apiName } = this.request.body;
    let filePath = rootPath + path;
    //save request body
    yield creator.ensureDirectoryExistence(filePath)
    let saveState = yield creator.ensureFileExistence(context, filePath)
    let result = yield converter.iIterator(context.schema)
    console.log(saveState, result)
    if (!saveState) return this.body = {
            'createState': false
        }
        //responce
    this.body = {
        'mockData': result,
        'createState': true,
        'api': {
            'path': 'http://beisen.me' + context.path,
            'parem': context.parem
        }
    }
})

//init the koa-router
app
    .use(router.routes())
    .use(router.allowedMethods());

//listen
app.listen(3003);
