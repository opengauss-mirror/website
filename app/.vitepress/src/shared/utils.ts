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
export function setCustomCookie(key: string, value: string, day = 1) {
  Cookies.set(key, value, { expires: day, path: '/' });
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
