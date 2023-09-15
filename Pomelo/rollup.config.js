/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：rollup.config.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import { babel } from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'

const production = process.env.NODE_ENV === 'production'

module.exports = {
  input: 'src/js/index.js',
  output: {
    file: production ? 'pomelo/assets/pomelo.js' : 'assets/pomelo.js',
    format: 'iife',
    sourcemap: !production
  },
  plugins: [
    resolve({
      browser: true
    }),
    commonjs(),
    babel({ babelHelpers: 'runtime' }),
    postcss({
      extract: true
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    production && terser(),
    production &&
      copy({
        targets: [
          { src: '*.hbs', dest: 'pomelo/' },
          { src: 'partials', dest: 'pomelo/' },
          { src: 'package.json', dest: 'pomelo/' },
          { src: 'src/assets', dest: 'pomelo/' },
          { src: 'LICENSE', dest: 'pomelo/' },
          { src: 'robots.txt', dest: 'pomelo/' },
          { src: 'ads.txt', dest: 'pomelo/' }
        ]
      })
  ]
}
