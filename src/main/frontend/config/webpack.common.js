const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    largeApp: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, '../../../../src/main/resources/static'),
    filename: 'LargeApp.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
		test: /\.jsx?$/,
		include: [ 
			path.resolve(__dirname, '../src'),
			path.resolve(__dirname, '../node_modules/redux-blueprint'),
			path.resolve(__dirname, '../node_modules/redux-mux'),
			path.resolve(__dirname, '../node_modules/localsync')
		],
		loader: "babel-loader"
	  },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
          ]
      },
      { test: /\.html$/, loader: 'raw-loader' },
      {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
         test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
         use: [{
           loader: 'file-loader',
           options: {
             name: '[name].[ext]',
             outputPath: 'assets/fonts',    // where the fonts will go
             publicPath: '../'       // override the default path
           }
         }]
       },
    ]
  },
  resolve: {
    alias: {
      'react': path.join(__dirname, '../node_modules', 'react')
    },
    extensions: ['.js']
  },
  plugins: [
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../assets/images'),
            to: 'assets/images'
        }
    ]),
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../assets/fonts'),
            to: 'assets/fonts'
        }
    ]),
    new HtmlWebpackPlugin({
        template: './index.html'
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        'window.Tether': "tether"
    })
  ]
};
