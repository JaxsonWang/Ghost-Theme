import { loadScripts, loadStyles } from '../utils'
import baseToast from '../toasts'
import fetch from '../fetch'

/**
 * 根据歌单信息获取详细信息
 */
// eslint-disable-next-line no-unused-vars
function getPlayerList(playerId) {
  return new Promise(async function(resolve, reject) {
    const infoList = await fetch({
      url: `https://api.imjad.cn/cloudmusic/?type=playlist&id=${playerId}`
    })
    if (infoList.code !== 100) {
      reject('网易云音乐接口服务器崩啦！')
      return false
    }
    const newList = await Promise.all(infoList.playlist.tracks.map(async function(item) {
      const songUrl = await fetch({
        url: `https://api.imjad.cn/cloudmusic/?type=song&id=${item.id}&br=128000`
      })
      const songLrc = await fetch({
        url: `https://api.imjad.cn/cloudmusic/?type=lyric&id=${item.id}`
      })
      const playList = {
        id: item.id,
        name: item.name,
        cover: item.al.picUrl,
        artist: item.ar.map(i => i.name).join(' & ')
      }
      if (songUrl.code !== 200 || songLrc.code !== 200) {
        reject('网易云音乐接口服务器崩啦！')
        return false
      }
      if (songUrl.code === 200) playList.url = songUrl.data[0].url
      if (songLrc.code === 200) playList.lrc = songLrc.lrc.lyric
      return playList
    }))
    resolve(newList.filter(i => i.url))
  })
}

export default () => {
  const playerEle = document.getElementById('player')
  if (playerEle !== null) return

  loadStyles([{
    name: 'player-css',
    path: 'https://lib.baomitu.com/aplayer/1.10.1/APlayer.min.css'
  }]).then()

  loadScripts([{
    name: 'player-js',
    path: 'https://lib.baomitu.com/aplayer/1.10.1/APlayer.min.js'
  }]).then(async function() {
    try {
      // const musicPlayerList = window.SoldOutConfigMusicPlayerList || '5392087441'
      // const playerList = await getPlayerList(musicPlayerList)
      const musicPlayerList = window.SoldOutConfigMusicPlayerList || [
        {
          name: 'Sold Out',
          artist: 'Hawk Nelson',
          url: 'https://cdn.jsdelivr.net/gh/JaxsonWang/jaxsonwang.github.io/music/Sold%20Out.mp3',
          cover: 'https://cdn.jsdelivr.net/gh/JaxsonWang/jaxsonwang.github.io/music/Sold%20Out.jpeg'
        },
        {
          name: 'Take Me Higher',
          artist: 'Atmosphere Music Ltd',
          url: 'https://cdn.jsdelivr.net/gh/JaxsonWang/jaxsonwang.github.io/music/Take%20Me%20Higher.mp3',
          cover: 'https://cdn.jsdelivr.net/gh/JaxsonWang/jaxsonwang.github.io/music/Take%20Me%20Higher.jpg'
        },
        {
          name: 'More',
          artist: 'K/DA',
          url: 'https://cdn.jsdelivr.net/gh/JaxsonWang/jaxsonwang.github.io/music/MORE.mp3',
          cover: 'https://cdn.jsdelivr.net/gh/JaxsonWang/jaxsonwang.github.io/music/MORE.jpg'
        },
        {
          name: '起风了',
          artist: '买辣椒也用券',
          url: 'https://cdn.jsdelivr.net/gh/JaxsonWang/jaxsonwang.github.io/music/%E8%B5%B7%E9%A3%8E%E4%BA%86.mp3',
          cover: 'https://cdn.jsdelivr.net/gh/JaxsonWang/jaxsonwang.github.io/music/%E8%B5%B7%E9%A3%8E%E4%BA%86.jpg'
        }
      ]
      const playerWrapper = document.createElement('div')
      playerWrapper.id = 'player'
      playerWrapper.className = 'player-wrapper'
      document.querySelector('body').appendChild(playerWrapper)

      window.aplayer = new APlayer({
        container: document.getElementById('player'),
        fixed: true,
        lrcType: 0,
        theme: '#ad7a86',
        order: 'list',
        autoplay: false,
        audio: musicPlayerList
      })
    } catch (error) {
      // 通知
      baseToast({
        content: error,
        time: new Date(),
        key: 'musicPlayerToastKey'
      })
    }
  })
}
