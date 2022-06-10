import qrcode from '../other/qrcode'

export const share = (window) => {
  const $ = window.jQuery
  $('.btn-share-popover').on('shown.bs.popover', () => {
    qrcode.then(response => {
      // eslint-disable-next-line no-undef,no-unused-vars
      const qrcode = new QRCode(document.getElementById('wechat-qr-code-img'), {
        text: `${window.location.origin}${window.location.pathname}`,
        width: 128,
        height: 128,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: window.QRCode.CorrectLevel.H
      })
    })
  })
}

export default share(window)
