import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';

/**
 * TS 对象key合法检查
 */
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return Object.prototype.hasOwnProperty.call(object, key);
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

/**
 * URL参数转对象
 */
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

/**
 * 获取指定key的cookie值
 * @param key
 * @returns
 */
export function getCustomCookie(key: string) {
  return Cookies.get(key);
}

/**
 * 设置cookie
 * @param key cookie的key
 * @param value cookie的值
 * @param day cookie的过期时间 默认1天
 */
export function setCustomCookie(
  key: string,
  value: string,
  day = 1,
  domain: string = location.hostname
) {
  Cookies.set(key, value, { expires: day, path: '/', domain });
}

/**
 * 删除cookie
 * @param key cookie的key
 * @param value cookie的值
 */
export function removeCustomCookie(key: string) {
  Cookies.remove(key);
}

/**
 * 错误处理
 */
export function handleError(error = 'Error!') {
  ElMessage({
    message: error,
    type: 'error',
  });
}

/**
 * safe window open
 */
export const windowOpen = (
  url?: string | URL | undefined,
  target?: string | undefined,
  features?: string | undefined
) => {
  const opener = window.open(url, target, features);
  opener && (opener.opener = null);
};

const opt = Object.prototype.toString;
export function isBoolean(val: unknown): val is boolean {
  return opt.call(val) === '[object Boolean]';
}

export function isTestEmail(str: string) {
  return /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/.test(
    str
  );
}
export function isTestPhone(str: string) {
  return /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(str);
}

/**
 * 获取指定时区偏移量的年份
 * @param {number} offset - 时区偏移量（单位：小时）。例如，UTC+8 时区，传入 8。
 * @returns {number} - 指定时区偏移量对应的年份
 */
export function getYearByOffset(offset = 8) {
  // 获取当前时间的 UTC 时间
  const now = new Date();
  const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  // 设置偏移
  utcTime.setHours(utcTime.getHours() + offset);

  return utcTime.getFullYear();
}
