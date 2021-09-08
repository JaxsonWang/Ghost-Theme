'use strict'

const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

const getEntries = () => {
  return {
    'rebirth': [
      './src/js/app.js',
      './src/scss/app.scss'
    ]
  }
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

const getPlugins = () => {
  return [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [resolve('./dist')]
    }),
    require('autoprefixer'),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('../src/assets/'),
          to: resolve('../assets/')
        }
      ]
    }),
    new ExtractTextPlugin({
      filename: '../css/styles.css',
      allChunks: true
    })
  ]
}

module.exports = {
  entry: getEntries(),
  output: {
    filename: '[name].js',
    path: resolve('../assets/js/')
  },
  plugins: getPlugins(),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('cssnano'),
                  require('autoprefixer')
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jpg', '.scss']
  }
}
