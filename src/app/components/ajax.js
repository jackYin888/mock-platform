/*
 * @Author: yangfengchu
 * @Date:   2016-09-17 21:10:00
 * @Last Modified 2016-09-17
 * @Last Modified time: 2016-09-17 22:40:47
 */

'use strict';
class ajax {
    constructor(props) {}
    req(options) {
        let { method, url, callback, error } = options;
        //参数处理
        method = method.toUpperCase() || 'get'
        if (!url) return false;
        let successful = callback || function() {};
        let handleError = error || function() {};
        //处理请求
        const request = new XMLHttpRequest();
        request.open(method, url, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                let resp = request.responseText;
                successful && successful(resp)
            } else {
                return request.status
            }
        };
        //错误处理
        request.onerror = handleError(request.status)
        request.send();
    }
}
export default new ajax();
// // getJson
// var request = new XMLHttpRequest();
// request.open('GET', '/my/url', true);

// request.onload = function() {
//     if (request.status >= 200 && request.status < 400) {
//         // Success!
//         var data = JSON.parse(request.responseText);
//     } else {
//         // We reached our target server, but it returned an error

//     }
// };

// request.onerror = function() {
//     // There was a connection error of some sort
// };

// request.send();


// // request

// var request = new XMLHttpRequest();
// request.open('GET', '/my/url', true);

// request.onload = function() {
//     if (request.status >= 200 && request.status < 400) {
//         // Success!
//         var resp = request.responseText;
//     } else {
//         // We reached our target server, but it returned an error

//     }
// };

// request.onerror = function() {
//     // There was a connection error of some sort
// };

// request.send();



// //post
// var request = new XMLHttpRequest();
// request.open('POST', '/my/url', true);
// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// request.send(data);
