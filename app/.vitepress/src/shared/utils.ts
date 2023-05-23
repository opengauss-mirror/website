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

// 搜索对搜索词埋点
export function setSearchBuriedData(search_key: string) {
  const search_event_id = `${search_key}${new Date().getTime()}${
    (window as any)['sensorsCustomBuriedData']?.ip || ''
  }`;
  const obj = {
    search_key,
    search_event_id,
  };
  (window as any)['addSearchBuriedData'] = obj;
  const sensors = (window as any)['sensorsDataAnalytic201505'];
  sensors?.setProfile({
    profileType: 'searchValue',
    ...((window as any)['sensorsCustomBuriedData'] || {}),
    ...((window as any)['addSearchBuriedData'] || {}),
  });
}

// 等待sensor加载完成
export function addSearchBuriedData(search_key: string, num = 20) {
  if (!num) {
    // 重试最大次数
    return;
  }
  if ((window as any)['sensorsCustomBuriedData']) {
    setSearchBuriedData(search_key);
  } else {
    setTimeout(() => {
      // 若是一开始没有值，则重试
      num--;
      addSearchBuriedData(search_key, num);
    }, 500);
  }
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
export function setCustomCookie(cname: string, cvalue: string, day = 1) {
  const expires = day * 24 * 60 * 60 * 1000;
  const date = new Date(+new Date() + expires).toUTCString();
  document.cookie = `${cname}=${cvalue};expires=${date}`;
}
// 删除cookie
export function removeCustomCookie(cname: string, cvalue: string) {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    const c = cookieArr[i].trim();
    if (c.includes(cvalue)) {
      setCustomCookie(cname, '', -1);
    }
  }
}
