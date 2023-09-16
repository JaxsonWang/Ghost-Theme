/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
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

export default {
  input: 'src/js/index.js',
  output: {
    file: production ? 'brave/assets/brave.js' : 'assets/brave.js',
    format: 'iife',
    sourcemap: false
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
          { src: '*.hbs', dest: 'brave/' },
          { src: 'partials', dest: 'brave/' },
          { src: 'package.json', dest: 'brave/' },
          { src: 'src/assets', dest: 'brave/' },
          { src: 'LICENSE', dest: 'brave/' },
          { src: 'robots.txt', dest: 'brave/' },
          { src: 'ads.txt', dest: 'brave/' }
        ]
      })
  ],
  watch: {
    // exclude: ['node_modules/**', 'brave/**', 'assets/**'],
    include: 'src/**'
  }
}
