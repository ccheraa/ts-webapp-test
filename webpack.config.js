var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/server/app.ts',
  target: 'node',
  output: {
    path: path.join(__dirname, 'output/dev/server'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }, {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      }, {
        // enforce: 'pre',
        test: /\.tsx?$/,
        use: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".webpack.js", ".web.js", ".js", "."],
  },
  externals: nodeModules,
  plugins: []
}