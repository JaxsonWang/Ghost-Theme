import baseToast from '../other/toasts'

const toasts = (window, $) => {
  addEventListener('DOMContentLoaded', () => {
    if (window.localStorage.getItem('REGToastLocalStorageIdREG') === null) {
      baseToast($, {
        id: 'system-toast',
        content: 'REGToastContentREG',
        time: '2020-02-08T14:45'
      })
    }
    $('.system-toast .close').click(() => {
      window.localStorage.setItem('REGToastLocalStorageIdREG', true)
    })
  })
}

export default toasts(window, window.jQuery)
