'use strict'
const fs = require('fs')
const config = require('../site.config')

const rootDir = './sold-out'

/**
 * 文件操作 - sold-out.js
 */
fs.readFile(`${rootDir}/assets/sold-out.js`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data
    .replace(/twikoo-8gis88nx761b6095/, config.云开发环境id)
    .replace(/99efee9603c92e5cd04501f069/, config.博客搜索密钥)
    .replace(/本博客最近大升级，如遇到莫名其妙可以在任何文章之下留言反馈！/, config.弹窗提醒内容)
    .replace(/2020-12-23T23:00:00/, config.弹窗提醒时间)
    .replace(/helloToastKey/g, config.弹窗提醒键值)

  fs.writeFile(`${rootDir}/assets/sold-out.js`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - site-footer.hbs
 */
fs.readFile(`${rootDir}/default.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data
    .replace(/<%keywords%>/, config.网站关键词)

  fs.writeFile(`${rootDir}/default.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - site-footer.hbs
 */
fs.readFile(`${rootDir}/partials/site-footer.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data
    .replace(/https:\/\/qm.qq.com\/cgi-bin\/qm\/qr\?k=OSLqAxpvinqlSfrmkr_WpCF1q_OWov1x&jump_from=webapi/, config.页脚扣扣链接)
    .replace(/https:\/\/cdn.jsdelivr.net\/gh\/JaxsonWang\/jaxsonwang.github.io\/images\/wechat.jpg/, config.页脚微信二维码)
    .replace(/https:\/\/weibo.com\/JaxsonWang/, config.页面微博链接)
    .replace(/<a href="http:\/\/beian.miit.gov.cn" target="_blank" rel="nofollow noopener">苏ICP备15050739号<\/a>/, config.页脚自定义链接1)
    .replace(/<a href="http:\/\/www.beian.gov.cn\/portal\/registerSystemInfo?recordcode=32010402000196" target="_blank" rel="nofollow noopener">苏公网安备32010402000196号<\/a>/, config.页脚自定义链接2)
    .replace(/<a href="https:\/\/tongji.baidu.com\/web\/welcome\/ico?s=075de8ed5c2bfb5f678b1a620749aee4" target="_blank" rel="nofollow noopener">百度统计<\/a>/, config.页脚自定义链接3)

  fs.writeFile(`${rootDir}/partials/site-footer.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - site-footer.hbs
 */
fs.readFile(`${rootDir}/index.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data
    .replace(/永远年轻，永远热泪盈眶！/, config.博客欢迎语)

  fs.writeFile(`${rootDir}/index.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})

/**
 * 文件操作 - custom-about-for-page.hbs
 */
fs.readFile(`${rootDir}/custom-about-for-page.hbs`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data
    .replace(/Hello World!/, config.关于模板提示语)
    .replace(/Jaxson Wang/, config.关于模板名称)
    .replace(/i@iiong.com/, config.关于模板邮箱)
    .replace(/Web Front-End Developer/, config.关于模板职业)
    .replace(/https:\/\/iiong.com/, config.关于模板网站)

  fs.writeFile(`${rootDir}/custom-about-for-page.hbs`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})
