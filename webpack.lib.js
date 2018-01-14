const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
  entry: './src/gold-exchange.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gold-exchange.js',
    library: 'gold-exchange',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
});