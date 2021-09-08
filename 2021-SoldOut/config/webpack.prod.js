const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'assets/[name].css'
})

const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns:[
    {
      from: resolve('../partials/'),
      to: resolve('../sold-out/partials')
    },
    {
      from: resolve('../*.hbs'),
      to: resolve('../sold-out')
    },
    {
      from: resolve('../package.json'),
      to: resolve('../sold-out')
    },
    {
      from: resolve('../LICENSE'),
      to: resolve('../sold-out')
    },
    {
      from: resolve('../robots.txt'),
      to: resolve('../sold-out')
    },
    {
      from: resolve('../site.config.js'),
      to: resolve('../sold-out')
    }
  ]
})

module.exports = {
  mode: 'production',
  entry: {
    'sold-out': [
      './src/js/index.js',
      './src/scss/index.scss'
    ]
  },
  output: {
    filename: 'assets/[name].js',
    path: resolve('../sold-out/')
  },
  plugins: [
    new CleanWebpackPlugin(),
    miniCssExtractPlugin,
    copyWebpackPlugin
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
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
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
