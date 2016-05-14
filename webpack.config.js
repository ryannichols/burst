var fs = require("fs");
var path = require("path");
var webpack = require("webpack");

var srcDir = path.join(__dirname, "src/js");
var distDir = path.join(__dirname, "static/js");
var nodeDir = path.join(__dirname, "node_modules");

module.exports = {
  entry: {
    app: path.join(srcDir, 'Root.jsx'),
    commons: [
      'lodash',
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-logger',
      'reselect',
      'classnames',
    ],
  },
  output: {
    path: distDir,
    publicPath: '/js/',
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    sourceMapFilename: "[file].map"
  },
  module: {
    loaders: [
      { test: /.jsx?$/,
        exclude: /node_modules/, 
        loader: 'babel-loader?cacheDirectory',
      }
    ],
  },
  resolve: {
    root: [
      path.resolve(srcDir),
      path.resolve(path.join(srcDir, 'components'))],
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons", 
      filename: "commons.js",
      minChunks: Infinity,
    })
  ]
};
