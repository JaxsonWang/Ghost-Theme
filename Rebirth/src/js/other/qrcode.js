import { loadScripts } from '../untils'

const qrcode = () => {
  return new Promise((resolve, reject) => {
    loadScripts([{
      id: 'qrcode-js',
      url: 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js'
    }])
      .then(name => resolve(name))
      .catch(err => reject(err))
  })
}

export default qrcode()
