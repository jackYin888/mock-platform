var path = require("path");
var webpack = require("webpack");
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

// var path = require('path');
// var HtmlwebpackPlugin = require('html-webpack-plugin');
// //定义了一些文件夹的路径
// var ROOT_PATH = path.resolve(__dirname);
// var APP_PATH = path.resolve(ROOT_PATH, 'app');
// var BUILD_PATH = path.resolve(ROOT_PATH, 'dis');

// module.exports = {
//   //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
//   entry: APP_PATH,
//   //输出的文件名 合并以后的js会命名为bundle.js
//   output: {
//     path: BUILD_PATH,
//     filename: 'bundle.js'
//   },
//   //添加我们的插件 会自动生成一个html文件
//   plugins: [
//     new HtmlwebpackPlugin({
//       title: 'Hello World app'
//     })
//   ]
// };
module.exports = {
    entry: './src/app/entry.js',
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader?root=." },

            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                loader: "style!css!sass"
            }, {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file-loader'
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[^('|")]*)?$/,
                loader: "file-loader?name=images/[hash:8].[name].[ext]"
            }
        ]
    },
    output: {
        filename: 'dist/main.bundle.js'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-dom/server': 'ReactDOMServer',
        'react-router': 'ReactRouter',
        'lodash': 'loadsh',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'react-router-redux': 'ReactRouterRedux',
        'faker': 'faker',
        'fetch': 'fetch'
    },
    devServer: {
        filename: 'dist/main.bundle.js',
        host: '0.0.0.0',
        port: 8086,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
        new CaseSensitivePathsPlugin() //检查引用文件名字的大小写
    ]
}
