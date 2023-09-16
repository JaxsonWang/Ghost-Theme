/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 * File Name：.eslintrc.js
 * Date：2022年07月13日
 * Author：Jaxson Wang
 * Email: i@iiong.com
 * Blog: https://iiong.com
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['plugin:prettier/recommended', 'eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'never']
  }
}
