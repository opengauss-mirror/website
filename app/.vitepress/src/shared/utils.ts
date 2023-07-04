// 格式化数字
export function formatNumber(num: number) {
  return num >= 1e3 && num < 1e4
    ? `${(num / 1e3).toFixed(1)}K`
    : num >= 1e4
    ? `${(num / 1e4).toFixed(1)}W`
    : num;
}

// TS 对象key合法检查
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/**
 * 首页母大写其他字母小写
 * @param str 字符串
 * @returns 首字母大写其他字母小写的字符串
 */
export function firstToUpper(str: string): string {
  return str.replace(/(w)(w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase();
  });
}

/**
 * 是否是浏览器环境
 * @returns boolean
 */
export function isBrowser(): boolean {
  return typeof global === 'undefined';
}

/**
 * 获取今日日期 2222-01-09
 * @returns string
 */
export function getNowFormatDate() {
  const date = new Date();
  const seperator1 = '/';
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = Number('0' + month);
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = Number('0' + strDate);
  }
  const currentDate = year + seperator1 + month + seperator1 + strDate;
  return currentDate;
}

// URL参数转对象
export function getUrlParams(url: string) {
  const arrObj = url.split('?');
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    const list = {} as any;
    for (let i = 0; i < arrPara.length; i++) {
      const item = arrPara[i].split('=');
      const key = item[0];
      const value = item[1];
      list[key] = value;
    }
    return list;
  }
}

/*
 * setCookie 设置cookie
 *  cname cookie的名称
 *  cvalue cookie的值
 *  day cookie的过期时间 默认1天
 */
import Cookies from 'js-cookie';
export function getCustomCookie(cname: string) {
  try {
    return Cookies.get(cname);
  } catch {
    return '';
  }
}
export function setCustomCookie(cname: string, cvalue: string, day = 1) {
  const expires = day * 24 * 60 * 60 * 1000;
  const date = new Date(+new Date() + expires).toUTCString();

  try {
    Cookies.set(cname, cvalue, { expires: date, path: '/' });
  } catch {
    console.log('cookie设置失败');
  }
}
// 删除cookie
export function removeCustomCookie(cname: string) {
  Cookies.remove(cname);
}
// 错误处理
import { ElMessage } from 'element-plus';
export function handleError(error: any) {
  ElMessage({
    message: error,
    type: 'error',
  });
}
