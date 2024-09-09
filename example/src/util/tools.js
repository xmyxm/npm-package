export function getUrlParam(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}


// 功能函数
function convert(str, sign) {
  if (typeof str === 'string') {
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
      newStr += String.fromCharCode(str.charCodeAt(i) + sign * 2);
    }
    return newStr;
  }
  return '';
}

// 加密
export function encrypt(str) {
  return convert(str, 1);
}

// 解密
export function decrypt(str) {
  return convert(str, -1);
}