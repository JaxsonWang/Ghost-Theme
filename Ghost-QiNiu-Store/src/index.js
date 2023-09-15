/**
 * Qiniu storage module for Ghost blog 3.x
 * @see https://ghost.org/docs/concepts/storage-adapters/#using-a-custom-storage-adapter
 */

'use strict'

const url = require('url')
const path = require('path')
const BaseAdapter = require('ghost-storage-base')
const qiniu = require('qiniu')
const dayjs = require('dayjs')
const fetch = require('node-fetch')


const compile = source => {
  return context => {
    const props = Object.keys(context).join(', ')
    return new Function(`{ ${props} }`, `return \`${source}\``)(context)
  }
}

/**
 * 获取上传的文件基本对象
 * @param file
 * @returns file object
 */

const getPathContext = file => {
  return {
    year: dayjs().format('YYYY'),
    month: dayjs().format('MM'),
    day: dayjs().format('DD'),
    hour: dayjs().format('HH'),
    ext: path.extname(file),
    name: path.basename(file, path.extname(file))
  }
}

class GhostQiNiuStoreAdapter extends BaseAdapter {
  constructor(config) {
    super()

    let {
      accessKey, // 七牛 AK
      secretKey, // 七牛 SK
      bucket, // 存储对象空间名字
      domain, // 存储对象域名
      format = '${year}/${month}/${name}${ext}'
    } = config

    this.accessKey = accessKey
    this.secretKey = secretKey
    this.bucket = bucket
    this.domain = domain

    this.dirFormat = path.dirname(format)
    this.nameFormat = path.basename(format)
  }

  exists(fileName, targetDir) {
    return new Promise((resolve, reject) => {
      resolve(false)
    })
  }

  save(file, targetDir) {
    const context = getPathContext(file.name) // 获取上传文件基本对象

    const upload = key => new Promise((resolve, reject) => {
      const mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey)
      const putPolicy = new qiniu.rs.PutPolicy({
        scope: this.bucket,
        expires: 3600
      })
      const qnUploadToken = putPolicy.uploadToken(mac)
      // todo: 构建配置类
      const qnConfig = new qiniu.conf.Config()
      // 对象上传类
      const qnUploader = new qiniu.form_up.FormUploader(qnConfig)
      // 对象管理类
      this.qnBucketManager = new qiniu.rs.BucketManager(mac, qnConfig)
      const putExtra = new qiniu.form_up.PutExtra()
      qnUploader.putFile(qnUploadToken, key, file.path, putExtra, (responseError, responseBody, responseInfo) => {
        if (responseError) return reject(responseError)
        if (responseInfo.statusCode !== 200) return reject(new Error(responseBody.error))
        resolve(responseBody)
      })
    })

    targetDir = targetDir || compile(this.dirFormat)(context)

    file.name = compile(this.nameFormat)(context)

    return this.getUniqueFileName(file, targetDir)
      .then(filename => upload(filename.replace(/\\/g, '/'), file.path))
      .then(res => url.resolve(this.domain, res.key))
  }

  serve() {
    return (req, res, next) => next()
  }

  delete(file) {
    const pathname = url.parse(file.path).pathname
    if (!pathname) return Promise.reject(new Error(`Could not read file: ${file.path}`))
    return new Promise((resolve, reject) => {
      this.qnBucketManager.delete(this.bucket, pathname, (responseError, responseBody, responseInfo) => {
        if (responseError) reject(responseError)
        if (responseInfo.statusCode !== 200) reject(new Error(responseBody.error))
        resolve(responseBody)
      })
    })
  }

  read(file) {
    const pathname = url.parse(file.path).pathname
    if (!pathname) return Promise.reject(new Error(`Could not read file: ${file.path}`))
    return new Promise((resolve, reject) => {
      fetch(url.resolve(this.domain, pathname)).then(response => {
        resolve(response.buffer())
      }).catch(error => {
        reject(error)
      })
    })
  }
}

module.exports = GhostQiNiuStoreAdapter
