import smoothScroll from 'smoothscroll-polyfill'

import tooltips from './bootstrap/tooltips'
import prism from './bootstrap/prism'
import toTop from './bootstrap/to-top'
import progress from './bootstrap/post-progress'
import toc from './bootstrap/post-toc'
import search from './bootstrap/search'
// import pjax from './bootstrap/pjax'
import prefersColorScheme from './bootstrap/prefersColorScheme'
import pagination from './bootstrap/pagination'
import postShare from './bootstrap/post-share'
import templateLinks from './bootstrap/template-links'
import comments from './bootstrap/comments'
import musicPlayer from './bootstrap/musicplayer'
import global from './bootstrap/global'
import zoomImage from './bootstrap/post-image'

// ele.scrollIntoView 兼容
// Safari 无效需要引入 polyfill
smoothScroll.polyfill()

prefersColorScheme()
musicPlayer()

global()
zoomImage()
comments()
pagination()
postShare()
prism()
toTop()
progress()
toc()
search()
tooltips()
templateLinks()
// pjax()
