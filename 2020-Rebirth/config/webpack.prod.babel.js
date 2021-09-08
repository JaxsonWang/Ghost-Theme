'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

const getEntries = () => {
  return [
    './src/js/app.js',
    './src/scss/app.scss'
  ]
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

const getPlugins = () => {
  return [
    require('autoprefixer'),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('../src/assets/'),
          to: resolve('../dist/assets/')
        },
        {
          from: resolve('../partials/'),
          to: resolve('../dist/partials/')
        },
        {
          from: resolve('../author.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../custom-about-for-page.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../custom-archive-for-page.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../custom-full-width-for-post.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../custom-links-for-page.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../default.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../error-404.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../index.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../page.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../post.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../tag.hbs'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../package.json'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../robots.txt'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../LICENSE'),
          to: resolve('../dist/')
        },
        {
          from: resolve('../site.config.json'),
          to: resolve('../dist/')
        }
      ],
      options: {
        concurrency: 100
      }
    }),
    new ExtractTextPlugin({
      filename: './assets/css/styles.css',
      allChunks: true
    })
  ]
}

module.exports = {
  entry: getEntries(),
  output: {
    filename: './assets/js/rebirth.js'
  },
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
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
                url: false
              }
            }, {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('cssnano'),
                  require('autoprefixer')
                ]
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jpg', '.scss']
  }
}
