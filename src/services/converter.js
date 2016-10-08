/*
 * @Author: yangfengchu
 * @Date:   2016-08-31 17:39:19
 * @Last Modified 2016-09-06
 * @Last Modified time: 2016-09-06 18:42:08
 */

/*
usage:
console.log(Converter.iIterator(AAA))
*/

'use strict';
//json schema to mock data

const faker = require('faker');
const jsf = require('json-schema-faker');

//faker Data generator
class Converter {
    constructor(schema) {} * iIterator(schema) {
        let theInstance = jsf(schema);
        return theInstance
    }
}
module.exports = new Converter();
//格式验证
// class SchemaVerify{
//     constructor(schema) {
//     }
//     static verify(schema){
//         let validate = ajv.compile(schema);
//         let valid = validate(data);
//         if(!valid){
//             return validate.errors
//         }
//     }
// }

// const Ajv = require('ajv');
// const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
//SchemaVerify.verify(AAA)
