const toggleSentence = (window) => {
  const $ = window.jQuery
  $.ajax({
    method: 'GET',
    url: `https://v2.jinrishici.com/one.json`,
    dataType: 'json',
    data: {
      client: 'browser-sdk/1.2',
      'X-User-Token': 'I1ZMRgevAjAacZHzIc9khTBrhLgVKxt7'
    },
    success: function(result) {
      $('.home-sentence').text(result.data.content)
    }
  })
}

export const homeSentence = (window) => {
  toggleSentence(window)
}

export default homeSentence(window)
