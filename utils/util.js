function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 时间戳转换为格式化日期
 */
function timestampToDate(timestamp){
  var newDate = new Date();
  newDate.setTime(timestamp * 1000);
  return newDate.toLocaleString()//toLocaleDateString()//只获取日期
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  timestampToDate: timestampToDate
}
