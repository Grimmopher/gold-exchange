const path = require('path');

module.exports = {
  entry: './src/gold-exchange.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gold-exchange.js',
    library: 'gold-exchange',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }
    ]
},
};