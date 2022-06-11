/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 * File Name：.eslintrc.js
 * Date：2022年06月11日
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
  extends: ['plugin:prettier/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'never']
  }
}
