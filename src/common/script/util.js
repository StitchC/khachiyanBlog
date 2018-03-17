// 获取url 参数
export function getQuery(str) {
  let lib = {};
  let startPos = str.indexOf('?');
  let queryStr = str.substr(startPos + 1);
  let queryArr = queryStr.split('&');

  for(let i = 0; i < queryArr.length; i++) {
    let tempArr = queryArr[i].split('=');
    lib[tempArr[0]] = tempArr[1];
  }

  return lib;
}


// 格式化时间
export function formatDate(timestamp, format) {
  let date = new Date(timestamp); // 获取时间

  if(/(y+)/.test(format)) {
    let year = date.getFullYear() + '';
    format = format.replace(RegExp.$1, year.substr(year.length - RegExp.$1.length));
  };


  let obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for(let key in obj) {
    if(new RegExp(`(${key})`).test(format)) {
      let value = padFront(obj[key]);
      format = format.replace(RegExp.$1, value.substr(value.length - RegExp.$1.length));
    }
  };

  return format;
}


function padFront(num) {
  return ('00' + num).substr((num + '').length);
};
