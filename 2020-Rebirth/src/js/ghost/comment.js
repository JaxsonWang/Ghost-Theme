import { loadScripts } from '../untils'

export const comment = () => {
  if (document.getElementById('vcomments') !== null) {
    loadScripts([
      {
        id: 'leancloud-storage-js',
        url: `https://cdn.jsdelivr.net/npm/leancloud-storage@4.2.0/dist/av-min.js`
      },
      {
        id: 'valine-js',
        url: `https://cdn.jsdelivr.net/npm/valine@1.4.4/dist/Valine.min.js`
      }
    ]).then(() => {
      // eslint-disable-next-line no-undef
      new Valine({
        el: '#vcomments',
        appId: 'REGleanCloudAppIdREG',
        appKey: 'REGleanCloudAppKeyREG',
        serverURLs: 'REGleanCloudServerURLREG',
        avatar: 'mm',
        visitor: true,
        highlight: true,
        recordIP: true,
        placeholder: '请您理智发言，共建美好社会！',
        path: window.location.pathname,
        meta: ['nick', 'mail', 'link'],
        pageSize: 10,
        lang: 'zh-CN',
        avatarForce: false
      })
      window.onload = () => {
        // 重定向描链接
        if (window.location.hash !== '') window.location.href = window.location.hash
      }
    })
  }
}

export default comment()
