/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 *  File Name：rollup.config.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
import { defineConfig } from 'rollup'
// A Rollup plugin which locates modules using the Node resolution algorithm
import { nodeResolve } from '@rollup/plugin-node-resolve'
// A Rollup plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle
import commonjs from '@rollup/plugin-commonjs'
// Use the latest JS features in your Rollup bundle
import babel from '@rollup/plugin-babel'
// Minifies the bundle
import terser from '@rollup/plugin-terser'
// Enable the PostCSS preprocessor
import postcss from 'rollup-plugin-postcss'
// Use @import to include other CSS files
import atImport from 'postcss-import'
// Use the latest CSS features in your Rollup bundle
import postcssPresetEnv from 'postcss-preset-env'
// Use the eslint
import eslint from '@rollup/plugin-eslint'
// Use the copy
import copy from 'rollup-plugin-copy'

const production = process.env.NODE_ENV === 'production'

export default defineConfig({
  input: 'src/js/index.js',
  output: {
    file: production ? 'brave/assets/brave.js' : 'assets/brave.js',
    format: 'iife',
    sourcemap: false
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    postcss({
      extract: true,
      sourceMap: true,
      plugins: [
        atImport(),
        postcssPresetEnv({})
      ],
      minimize: true,
    }),


    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    production && terser(),
    production && copy({
      targets: [
        { src: '*.hbs', dest: 'brave/' },
        { src: 'partials', dest: 'brave/' },
        { src: 'package.json', dest: 'brave/' },
        { src: 'src/assets', dest: 'brave/' },
        { src: 'LICENSE', dest: 'brave/' },
        { src: 'robots.txt', dest: 'brave/' },
        { src: 'ads.txt', dest: 'brave/' }
      ]
    }),
  ],
  watch: {
    // exclude: ['node_modules/**', 'brave/**', 'assets/**'],
    include: 'src/**'
  }
})
