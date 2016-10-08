//默认对象
function defaults() {
    return {
        root: 'root',
        dilimiter: '.'
    }
}
//精简
export function simplify(obj, dilimiter, root) {
    //容错
    //定界符 点
    dilimiter = dilimiter || defaults().dilimiter;
    //默认节点
    root = root || defaults().root;
    //精简节点
    return simplifyNode({}, root, obj, dilimiter);
}

//新增
export function add(data, path, obj, dilimiter) {
    //点
    dilimiter = dilimiter || defaults().dilimiter;
    //节点
    var node = data[path];
    //如果数据不正常直接return
    if (typeof node === 'undefined' || typeof node === 'null')
        return data;
    //数组
    if (node.type === 'array') {
        //挂载方法
        var max = !node.childs.length ? -1 : Math.max.apply(null, node.childs);
        // 转换成数组形式
        if (!isArray(obj)) obj = [obj];
        //遍历对象
        obj.forEach(function(d) {
            //重新装载
            node.childs.push(++max);
            //执行简单节点函数
            simplifyNode(data, path + dilimiter + max, d, dilimiter);
        });
        //对象
    } else if (node.type === 'object') {
        //
        var keys = Object.keys(obj);
        //遍历对象
        keys.forEach(function(key) {
            //如果为空
            if (node.childs.indexOf(key) > -1) return;
            //重新组装
            node.childs.push(key);
            //执行简单节点函数
            simplifyNode(data, path + dilimiter + key, obj[key], dilimiter);
        });
    }

    return data;
}

//更新
export function update(data, path, obj, dilimiter) {
    reset(data, path, dilimiter);
    simplifyNode(data, path, obj, dilimiter);
    return data;
}

//删除
export function remove(data, path, dilimiter) {
    dilimiter = dilimiter || defaults().dilimiter;
    var pathSeq = path.split(dilimiter);
    var key = pathSeq.pop();
    //
    var parentNode = pathSeq.length ? data[pathSeq.join(dilimiter)] : data;

    if (parentNode.type === 'array') key = +key;

    var idx = parentNode.childs.indexOf(key);
    if (idx > -1) parentNode.childs.splice(idx, 1);

    removeChildNode(data, path, dilimiter);

    return data;
}
//重置
export function reset(data, path, dilimiter) {
    dilimiter = dilimiter || defaults().dilimiter;
    //删除子节点
    removeChildNode(data, path, dilimiter);
    //置空路径
    data[path] = null;

    return data;
}

//
export function desimplify(data, path, dilimiter) {
    //点
    dilimiter = dilimiter || defaults().dilimiter;
    //路径
    path = path || defaults().root;
    //
    return dive(path);
    //函数
    function dive(path) {
        var obj;
        var node = data[path];
        //数据有问题
        if (typeof node === 'undefined' || typeof node === 'null')
            return node;
        //数组
        if (node.type === 'array') {
            obj = [];
            node.childs.forEach(function(key) {
                //递归调用
                obj.push(dive(path + dilimiter + key));
            });
            //对象
        } else if (node.type === 'object') {
            obj = {};
            node.childs.forEach(function(key) {
                //递归调用
                obj[key] = dive(path + dilimiter + key);
            });
        } else obj = node;

        return obj;
    }
}

//加入
export function join() {
    if (!arguments.length) return;
    var fargs = Array.prototype.filter.call(arguments, function(v) {
        return v != undefined && v != ''
    });
    return Array.prototype.join.call(fargs, '.');
}

//简单节点

function simplifyNode(data, path, obj, dilimiter) {
    //点
    dilimiter = dilimiter || defaults().dilimiter;
    //执行dive函数
    dive(obj, path);

    return data;
    //
    function dive(obj, path) {
        data[path] = {
            type: 'object',
            childs: []
        };
        //
        if (isArray(obj)) {
            //添加type 类型
            data[path].type = 'array';
            for (var i = -1, l = obj.length; ++i < l;) {
                //添加子节点
                data[path].childs.push(i);
                //递归调用
                dive(obj[i], path + dilimiter + i);
            }
        } else if (isObject(obj)) {
            for (var key in obj) {
                //如果有这个key
                if (obj.hasOwnProperty(key)) {
                    //添加
                    data[path].childs.push(key);
                    //递归
                    dive(obj[key], path + dilimiter + key);
                }
            }
        } else data[path] = obj;

        return data;
    }
}

//删除子节点
function removeChildNode(data, path, dilimiter) {
    dilimiter = dilimiter || defaults().dilimiter;
    var node = data[path];

    if (typeof node === 'undefined' || typeof node === 'null')
        return data;

    if (node.type === 'array' || node.type === 'object') {
        node.childs.forEach(function(key) {
            //删除节点
            removeChildNode(data, path + dilimiter + key);
        });
    }

    delete data[path];

    return data;
}

//工具函数
export function isArray(_) {
    return Object.prototype.toString.call(_) === '[object Array]';
}

export function isObject(_) {
    return Object.prototype.toString.call(_) === '[object Object]';
}
