var path = require("path");
module.exports = {
  entry : './src/entry.js',
  module : {
    loaders : [
      {
        loader : 'babel-loader',
        test : /\.js$/,
        exclude : /node_modules/
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[^('|")]*)?$/, 
        loader: "file-loader?name=images/[hash:8].[name].[ext]"
      }
    ]
  },
  output: {
      library: 'index',
      libraryTarget: 'umd'
  },
  resolve: {
      modulesDirectories: [
        'src',
        'node_modules'
      ],
      extensions: ['', '.json', '.js', '.jsx']
    }
}