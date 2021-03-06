const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './');

const config = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
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
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    contentBase: ['./public/dev', './public'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
