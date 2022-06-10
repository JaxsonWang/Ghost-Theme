'use strict'
const fs = require('fs')
const config = require('../site.config')

const rootDir = './dist'

const social = (data) => {
  return data
    .replace(/#RegQQLinkReg/, config.siteSocialQQLink)
    .replace(/RegQQTipReg/, config.siteSocialQQTip)
    .replace(/https:\/\/img.alicdn.com\/imgextra\/i4\/2038135983\/O1CN011u4G8M87EOv3N6Q_!!2038135983.jpg/, config.siteSocialWeChatQRUrl)
    .replace(/#RegWeiboLinkReg/, config.siteSocialWeiboLink)
    .replace(/RegWeiboTipReg/, config.siteSocialWeiboTip)
    .replace(/#RegGithubLinkReg/, config.siteSocialGithubLink)
    .replace(/RegGithubTipReg/, config.siteSocialGithubTip)
}

/**
 * 文件操作 - 替换基本配置
 */
fs.readFile(`${rootDir}/assets/js/rebirth.js`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }
  const result = data
    .replace(/4015596533516fdf195b645a1d/, config.ghostSearchKey)
    .replace(/REGleanCloudAppIdREG/, config.leanCloudAppId)
    .replace(/REGleanCloudAppKeyREG/, config.leanCloudAppKey)
    .replace(/REGleanCloudServerURLREG/, config.leanCloudServerURL)
    .replace(/REGToastLocalStorageIdREG/g, config.siteToastsId)
    .replace(/REGToastContentREG/, config.siteToastsContent)
    .replace(/2020-02-08T14:45/, config.siteToastsTime)

  fs.writeFile(`${rootDir}/assets/js/rebirth.js`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - 捐赠收款图片
 */
fs.readFile(`${rootDir}/partials/post-tools.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }
  const result = data
    .replace(/<img src="https:\/\/img\.alicdn\.com\/imgextra\/i4\/2038135983\/O1CN011u4G8M87EOv3N6Q_!!2038135983\.jpg" alt="支付宝捐赠" title="请使用支付宝扫一扫进行捐赠">/, `<img src="${config.aliPayQRImageUrl}" alt="支付宝捐赠" title="请使用支付宝扫一扫进行捐赠">`)
    .replace(/<img src="https:\/\/img\.alicdn\.com\/imgextra\/i1\/2038135983\/O1CN012t8d2E1u4G8KbRFYp_!!2038135983\.png" alt="微信捐赠" title="请使用微信扫一扫进行赞赏">/, `<img src="${config.weChatPayQRImageUrl}" alt="微信捐赠" title="请使用微信扫一扫进行赞赏">`)

  fs.writeFile(`${rootDir}/partials/post-tools.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - CDN 预加载 / 首页关键词
 */
fs.readFile(`${rootDir}/default.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }
  const result = data
    .replace(/<link rel="dns-prefetch" href="\/\/cdn\.iiong\.com">/, config.siteCdnUrl === '' ? `` : `<link rel="dns-prefetch" href="${config.siteCdnUrl}">`)
    .replace(/<meta name="keywords" content="">/, `<meta name="keywords" content="${config.siteKeyWords}">`)
  fs.writeFile(`${rootDir}/default.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - 备案号
 */
fs.readFile(`${rootDir}/partials/site-footer-copyright.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }
  const result = data
    .replace(/<a href="http:\/\/beian\.miit\.gov\.cn" target="_blank" rel="nofollow noopener">苏ICP备15050739号-4<\/a>/, config.siteICPNumber)
    .replace(/<a href="http:\/\/www\.beian\.gov\.cn\/portal\/registerSystemInfo\?recordcode=32010402000196" target="_blank" rel="nofollow noopener">苏公网安备32010402000196号<\/a>/, config.siteGAICPNumber)
    .replace(/<a href="https:\/\/tongji\.baidu\.com\/web\/welcome\/ico\?s=075de8ed5c2bfb5f678b1a620749aee4" target="_blank" rel="nofollow noopener">百度统计<\/a>/, config.siteFooterOther)
    .replace(/<div class="d-none d-md-block main-footer-meta">只争朝夕，不负韶华。<\/div>/, `<div class="d-none d-md-block main-footer-meta">${config.siteFooterSentence}</div>`)
  fs.writeFile(`${rootDir}/partials/site-footer-copyright.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - 个人社交信息
 */
fs.readFile(`${rootDir}/author.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = social(data)

  fs.writeFile(`${rootDir}/author.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - 个人社交信息
 */
fs.readFile(`${rootDir}/partials/post-footer-author.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = social(data)

  fs.writeFile(`${rootDir}/partials/post-footer-author.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - 网站首页
 */
fs.readFile(`${rootDir}/partials/site-hero.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data
    .replace(/这是一段博客简介/, config.siteHomeTitle)

  fs.writeFile(`${rootDir}/partials/site-hero.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - robots.txt
 */
fs.readFile(`${rootDir}/robots.txt`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data.replace(/REGblog-urlREG/, config.siteUrl)

  fs.writeFile(`${rootDir}/robots.txt`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - logo
 */
fs.readFile(`${rootDir}/partials/icons/site-logo.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data.replace(/<svg[^>]*>([\s\S.]*)<\/svg>/i, config.siteHomeLogoSvg)

  fs.writeFile(`${rootDir}/partials/icons/site-logo.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - 忽略菜单栏
 */
fs.readFile(`${rootDir}/partials/site-footer-info.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data.replace(/\['菜单1', '菜单2', '菜单3']/, config.siteTagsFilterNav)

  fs.writeFile(`${rootDir}/partials/site-footer-info.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - 个人页面
 */
fs.readFile(`${rootDir}/custom-about-for-page.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data
    .replace(/Jaxson Wang/, config.siteAboutName)
    .replace(/i@iiong.com/, config.siteAboutEmail)
    .replace(/Web Front-End Developer/, config.siteAboutPosition)
    .replace(/https:\/\/iiong.com/, config.siteAboutWebsite)
    .replace(/Hello World!/, config.siteAboutHello)

  fs.writeFile(`${rootDir}/custom-about-for-page.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})
