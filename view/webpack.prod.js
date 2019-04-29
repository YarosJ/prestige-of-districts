const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, './');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'client.min.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i, // to support eg. background-image property
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]',
          outputPath: '../',
        },
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // to support @font-face rule
        loader: 'url-loader',
        query: {
          limit: '10000',
          name: '[path][name].[ext]',
          outputPath: '../',
        },
      }, {
        test: /\.jsx?$/,
        include: APP_DIR,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            ['react-html-attrs'],
            ['@babel/proposal-class-properties'],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-transform-runtime'],
          ],
        },
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: true,
            },
          },
          { loader: 'less-loader' },
        ],
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './public',
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};

module.exports = config;
