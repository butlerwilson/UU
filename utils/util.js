//util.js
const patternNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
* 时间戳转化为年 月 日 
*/
function formatTime(date, format) {
  var pattern = ['Y', 'M', 'D'];
  var returns = [];
  returns.push(date.getFullYear());
  returns.push(patternNumber(date.getMonth() + 1));
  returns.push(patternNumber(date.getDate()));

  for (var i in returns) {
      format = format.replace(pattern[i], returns[i]);
  }
  return format;
}

module.exports = {
  formatTime: formatTime,
}