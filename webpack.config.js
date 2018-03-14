var webpack = require('webpack');
var path = require('path');
var debug = process.env.NODE_ENV !== "production";

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  entry: ['whatwg-fetch', "./src/js/root.js"],
  output: {
    path: __dirname,
    filename: "./src/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs'],
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
       test: /\.less$/,
       loader: "style-loader!css-loader!less-loader"
      }
    ]
  },
  performance: { hints: false },
  plugins: debug
    ? []
    : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};
