const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
       loaders: [{
           test: /\.js$/,
           loaders: ['react-hot-loader/webpack', 'babel'],
           include: path.join(__dirname, 'src')
       }]
   },
   devServer: {
       proxy: {
          "**": "http://localhost:9090"
      }
   }
});
