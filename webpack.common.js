const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
        sourceMap: true
    }),
    new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};