/*
 * @Author: KikyoMiao
 * @Date:   2016-09-16 23:08:41
 * @Last Modified 2016-10-08
 * @Last Modified time: 2016-10-08 15:27:19
 */
// usage
// jsonCover(json, schema, []);
// console.log(JSON.stringify(schema, null, 4));
function isType(value) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

function isEmpty(value) {
    return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
}

export default function jsonCover(json, obj, array) {
    if (!isEmpty(json)) {
        for (var i in json) {
            (function(name) {
                var cnt = isType(json[name]);
                obj[name] = {};
                obj[name].type = cnt;

                if (cnt === 'object') {
                    obj[name].properties = {};
                    obj[name].require = [];
                    if (!isEmpty(json[name])) {
                        jsonCover(json[name], obj[name].properties, obj[name].require);
                    }
                } else if (cnt === 'array') {
                    obj[name].items = {};
                    if (!isEmpty(json[name])) {
                        obj[name].items.properties = {};
                        obj[name].items.require = [];
                        jsonCover(json[name][0], obj[name].items.properties, obj[name].items.require);
                    }
                } else {
                    array.push(name);
                }
            }(i))
        }
    } else {
        return json.length === +json.length ? [] : {};
    }
}
