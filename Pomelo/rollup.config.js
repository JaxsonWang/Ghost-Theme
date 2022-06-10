/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 * File Name：rollup.config.js
 * Date：2022年06月11日
 * Author：Jaxson Wang
 * Email: i@iiong.com
 * Blog: https://iiong.com
 */

import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import eslint from '@rbnlffl/rollup-plugin-eslint'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'

const production = process.env.NODE_ENV === 'production'

module.exports = {
  input: 'src/js/index.js',
  output: {
    file: production ? 'pomelo/assets/app.js' : 'assets/app.js',
    format: 'esm',
    sourcemap: !production
  },
  plugins: [
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
    (production && copy({
      targets: [
        { src: '*.hbs', dest: 'pomelo/' },
        { src: 'partials', dest: 'pomelo/partials' }
      ]
    })),
    (production && terser())
  ],
  watch: {
    exclude: ['node_modules/**']
  }
}
