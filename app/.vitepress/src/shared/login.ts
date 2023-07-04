import { queryPermission, queryIDToken } from '../api/api-login';
import { useLogin } from '../stores/login';
import { storeToRefs } from 'pinia';
import Cookies from 'js-cookie';

const LOGIN_KEYS = {
  USER_TOKEN: '_U_T_',
};

function setCookie(cname: string, cvalue: string, isDelete?: boolean) {
  const deleteStr = isDelete ? 'max-age=0; ' : '';
  try {
    const domain = import.meta.env.VITE_COOKIE_DOMAIN;
    const expires = `${deleteStr}path=/; domain=${domain}`;
    Cookies.set(cname, cvalue, { expires });
  } catch {}
}
function getCookie(cname: string) {
  try {
    return Cookies.get(cname);
  } catch {
    return '';
  }
}
function deleteCookie(cname: string) {
  setCookie(cname, 'null', true);
}

// 存储用户id及token，用于下次登录
export function saveUserAuth(code = '') {
  if (!code) {
    deleteCookie(LOGIN_KEYS.USER_TOKEN);
  } else {
    setCookie(LOGIN_KEYS.USER_TOKEN, code);
  }
}

// 获取用户id及token
export function getUserAuth() {
  const token = getCookie(LOGIN_KEYS.USER_TOKEN) || '';
  if (!token) {
    saveUserAuth();
  }
  return {
    token,
  };
}

// 退出登录
export function logout() {
  queryIDToken().then(() => {
    saveUserAuth();
    window!.location!.href = location.href;
  });
}

// 跳转首页
export function goToHome() {
  window?.location?.reload();
}

export function showGuard() {
  const origin = import.meta.env.VITE_LOGIN_ORIGIN;
  const { lang } = getLanguage();
  location.href = `${origin}/login?redirect_uri=${location.href}&lang=${lang}`;
}

// token失效跳转首页
export function tokenFailIndicateLogin() {
  saveUserAuth();
  const { guardAuthClient } = useStoreData();
  guardAuthClient.value = {};
  goToHome();
}

/**
 * @callback store 将store返回，使用解构赋值接受
 */
export function useStoreData() {
  const login = useLogin();
  const stores = storeToRefs(login);
  return stores;
}

// 刷新后重新请求登录用户信息
export function refreshInfo() {
  const { token } = getUserAuth();
  if (token) {
    const { guardAuthClient } = useStoreData();
    queryPermission().then((res) => {
      const { data } = res;
      if (Object.prototype.toString.call(data) === '[object Object]') {
        guardAuthClient.value = data;
      }
    });
  }
}

export function getLanguage() {
  if (location.pathname.includes('/zh/')) {
    return {
      lang: 'zh',
      language: 'zh-CN',
    };
  }
  return {
    lang: 'en',
    language: 'en-US',
  };
}
