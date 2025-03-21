const { exec } = require('child_process')

const got = require('got')

// Server sendkey 更换你的 Token
const sendkey = 'xxxxxxx'

let title = ''
let message = ''

exec('bash /home/ubuntu/backup/backup.sh', (error, stdout, stderr) => {
  if (error) {
    title = error.toString()
  } else {
    title = `${parseTime(new Date())} 备份成功！`
    message = ``
  }

  // Server
  const url = `https://api.day.app/${sendkey}/${title}?isArchive=1&group=Ghost备份`
  got.post(url).then(response => {
    console.log('Bark 通知', response)
  }).catch(err => {
    console.log('Bark 错误通知', err)
  })
});

/**
 * 时间格式化
 * @param {*} time
 * @param {*} cFormat
 * @returns
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
