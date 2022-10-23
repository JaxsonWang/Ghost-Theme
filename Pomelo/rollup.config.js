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
import { babel } from '@rollup/plugin-babel'
import eslint from '@rbnlffl/rollup-plugin-eslint'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'

const production = process.env.NODE_ENV === 'production'

module.exports = {
  input: 'src/js/index.js',
  output: {
    file: production ? 'pomelo/assets/pomelo.js' : 'assets/pomelo.js',
    format: 'esm',
    sourcemap: !production
  },
  plugins: [
    commonjs(),
    resolve({
      browser: true
    }),
    postcss({
      extract: true
    }),
    babel({ babelHelpers: 'bundled' }),
    eslint({
      filterExclude: ['src/css/*'],
      filterInclude: ['src/**']
    }),
    production &&
      copy({
        targets: [
          { src: '*.hbs', dest: 'pomelo/' },
          { src: 'partials', dest: 'pomelo/' },
          { src: 'package.json', dest: 'pomelo/' }
        ]
      }),
    production && terser()
  ],
  watch: {
    exclude: ['node_modules/**']
  }
}
