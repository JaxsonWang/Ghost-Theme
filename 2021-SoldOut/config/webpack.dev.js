const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].css'
})

// const copyWebpackPlugin = new CopyWebpackPlugin({
//   patterns:[
//     {
//       from: resolve('../src/assets/loading.gif'),
//       to: resolve('../assets')
//     }
//   ]
// })

const esLintPlugin = new ESLintPlugin({
  emitWarning: true,
  emitError: true,
  failOnWarning: false,
  failOnError: false
})

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    'sold-out': [
      './src/js/index.js',
      './src/scss/index.scss'
    ]
  },
  output: {
    filename: '[name].js',
    path: resolve('../assets/')
  },
  devtool: 'source-map',
  plugins: [
    // copyWebpackPlugin,
    miniCssExtractPlugin,
    esLintPlugin
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve('../src')
    }
  }
}
