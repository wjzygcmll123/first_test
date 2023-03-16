/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
  let rs = "";
  for (let i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

/**
 * 验证邮箱
 */
export function validateEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证密码 6至20位的字母+数字
 */
export function validatePass(value) {
  // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  let reg = /^[a-zA-Z0-9]\w{5,17}$/;

  return !reg.test(value) ? true : false;
}

/**
 * 验证用户名
 */
export function validateUser(value) {
  let reg = /^[0-9]{8}$/;
  return !reg.test(value) ? true : false;
}
