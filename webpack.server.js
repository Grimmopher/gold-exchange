const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
  devServer: {
      contentBase: './docs'
  },
  entry: './src/example.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'gold-exchange.js',
    library: 'gold-exchange',
    libraryTarget: 'umd'
  },
  plugins: [
    new HtmlWebpackPlugin({
       title: 'Output Management',
       template: 'src/index.html'
    })
  ]
});