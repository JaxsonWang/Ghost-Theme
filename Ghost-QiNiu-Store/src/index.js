/**
 * Qiniu storage module for Ghost blog
 * @see https://ghost.org/docs/config/#storage-adapters
 */
const { URL } = require('node:url')
const { fetch } = require('node:http')
const path = require('node:path')
const BaseAdapter = require('ghost-storage-base')
const qiniu = require('qiniu')

const compile = source => {
  return (context) => {
    return source.replace(/\${(.*?)}/g, (_, key) => context[key] || '')
  }
}

const getPathContext = file => {
  const now = new Date()
  return {
    year: now.getFullYear(),
    month: String(now.getMonth() + 1).padStart(2, '0'),
    day: String(now.getDate()).padStart(2, '0'),
    hour: String(now.getHours()).padStart(2, '0'),
    ext: path.extname(file),
    name: path.basename(file, path.extname(file))
  }
}

class GhostQiNiuStoreAdapter extends BaseAdapter {
  constructor(config) {
    super()

    let { accessKey, secretKey, bucket, domain, format = '${year}/${month}/${name}${ext}' } = config

    this.accessKey = accessKey
    this.secretKey = secretKey
    this.bucket = bucket
    this.domain = domain

    this.dirFormat = path.dirname(format)
    this.nameFormat = path.basename(format)

    const mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey)
    this.config = new qiniu.conf.Config()
    this.bucketManager = new qiniu.rs.BucketManager(mac, this.config)
  }

  async exists(fileName, targetDir) {
    return false
  }

  async save(file, targetDir) {
    const context = getPathContext(file.name)
    targetDir = targetDir || compile(this.dirFormat)(context)
    file.name = compile(this.nameFormat)(context)

    const filename = this.getUniqueSecureFilePath(file, targetDir)
    const res = await this.uploadFile(filename.replace(/\\/g, '/'), file.path)
    return new URL(res.key, this.domain).toString()
  }

  async uploadFile(key, filePath) {
    return new Promise((resolve, reject) => {
      // 每次上传前重新生成Token
      const mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey)
      const putPolicy = new qiniu.rs.PutPolicy({ scope: this.bucket })
      const uploadToken = putPolicy.uploadToken(mac)

      const formUploader = new qiniu.form_up.FormUploader(this.config)
      const putExtra = new qiniu.form_up.PutExtra()

      formUploader.putFile(uploadToken, key, filePath, putExtra, (err, body, info) => {
        if (err) return reject(err)
        if (info.statusCode !== 200) return reject(new Error(body.error))
        resolve(body)
      })
    })
  }

  serve() {
    return (req, res, next) => next()
  }

  async delete(file) {
    const pathname = new URL(file.path, this.domain).pathname
    if (!pathname) throw new Error(`Could not read file: ${file.path}`)
    return new Promise((resolve, reject) => {
      this.bucketManager.delete(this.bucket, pathname, (err, body, info) => {
        if (err) return reject(err)
        if (info.statusCode !== 200) return reject(new Error(body.error))
        resolve(body)
      })
    })
  }

  async read(file) {
    const pathname = new URL(file.path, this.domain).pathname
    if (!pathname) throw new Error(`Could not read file: ${file.path}`)
    const response = await fetch(new URL(pathname, this.domain).toString())
    return response.buffer()
  }
}

module.exports = GhostQiNiuStoreAdapter
