module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 8
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-undef': 'off',
    'no-unexpected-multiline': 'off',
    'no-async-promise-executor': 'off'
  }
}
