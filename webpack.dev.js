const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const shared = require('./webpack.shared');
const CnameWebpackPlugin = require('cname-webpack-plugin');

const SITE_CONFIG = require(process.env.GEOTIFF_IO_CONFIG || './config.json');

const dev = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'docs'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

if (SITE_CONFIG.domain) {
  dev.plugins.push(new CnameWebpackPlugin({ domain: SITE_CONFIG.domain }));
}


module.exports = merge(shared, dev);
