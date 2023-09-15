/**
 * Copyright (c) 2020. Jaxson All Rights Reserved.
 * 七牛存储对象测试用例
 */

const dayjs = require('dayjs')
const QiNiuStore = require('../src')

require('dotenv').config() // 导入配置环境

const config = {
  accessKey: process.env.APP_ACCESSKEY,
  secretKey: process.env.APP_SECRETKEY,
  bucket: process.env.APP_BUCKET,
  domain: process.env.APP_DOMAIN,
  format: '${year}/${month}/${name}${ext}'
}

test('基本测试环境用例', () => {
  document.body.innerHTML = `<div class="site-wrapper container">Hello World</div>`
  expect(document.querySelector('.site-wrapper').classList.contains('container')).toBe(true)
})

test('环境变量测试用例', () => {
  expect(config.accessKey !== '').toBe(true)
  expect(config.secretKey !== '').toBe(true)
  expect(config.bucket !== '').toBe(true)
  expect(config.domain !== '').toBe(true)
})

test('匹配配置和环境变量是否相等', () => {
  const storage = new QiNiuStore(config)
  expect(storage.accessKey).toBe(process.env.APP_ACCESSKEY)
  expect(storage.secretKey).toBe(process.env.APP_SECRETKEY)
  expect(storage.bucket).toBe(process.env.APP_BUCKET)
  expect(storage.domain).toBe(process.env.APP_DOMAIN)
})

test('上传文件', () => {
  const storage = new QiNiuStore(config)
  const file = {
    name: 'test.jpg',
    path: __dirname + '/test.jpg'
  }
  storage.save(file).then(result => {
    expect(result).not.toBe('')
  })
})
