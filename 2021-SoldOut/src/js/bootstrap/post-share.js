export default () => {
  const shareWechat = document.querySelector('.ha__article-share .ha__article-share-item-wechat')
  if (!shareWechat) return
  const postUrl = shareWechat.getAttribute('data-post-url')
  // 判断 logo 格式
  const logoSplit = window.soldOut.logo.split('.')
  const logoType = logoSplit[logoSplit.length - 1]
  const logo = /(png|jpg|jpeg)/.test(logoType) ? window.soldOut.logo : ''
  const qrUrl = `https://api.imjad.cn/qrcode?text=${postUrl}&logo=${logo}&size=100&level=Q&bgcolor=%23ffffff&fgcolor=%23000000`
  shareWechat.setAttribute('title',`<img src="${qrUrl}" class="post-share-wechat-qr" alt="微信分享" />`)
}
