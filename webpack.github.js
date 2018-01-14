const CleanWebpackPlugin = require('clean-webpack-plugin');
const server = require('./webpack.server.js');
const merge = require('webpack-merge');

module.exports = merge(server, {
  plugins: [
    new CleanWebpackPlugin(['docs'])
  ]
});