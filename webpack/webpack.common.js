var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.scss']
  },

  module: {
    loaders: [
      {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
          test: /\.html$/,
          loader: 'html'
      },
      {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file?name=images/[name].[hash].[ext]'
      },
      {
          test: /\.scss$/,
          // exclude: /node_modules/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
    ]
  },

  plugins: [
    new CleanWebpackPlugin(
        [
            './static/dist',
            './static/fonts',
            './static/assets',
            './static/img'
        ]
    ),

    new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
        // template: 'src/index.html'
        filename: 'index.html',
        inject: 'body',
        template: 'src/index.html'
    }),

    new CopyWebpackPlugin([
        { from: 'src/img/*.*', to: "img/", flatten: true },
        { from: 'node_modules/font-awesome/fonts/*.*', to: "fonts/", flatten: true }
    ])
  ]
};
