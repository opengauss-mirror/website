
// 获取用户认证凭据
import Cookies from 'js-cookie';
import { useLoginStore } from '@/stores/user';

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;
const DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN;
// 登录状态
// -1: 登录失败；0：未登录；1：登录中；2：登录成功
export enum LOGIN_STATUS {
  FAILED = -1,
  NOT = 0,
  DOING = 1,
  DONE = 2,
}
export type LoginStatusT = typeof LOGIN_STATUS.FAILED | LOGIN_STATUS.NOT | LOGIN_STATUS.DOING | LOGIN_STATUS.DONE;

// 登录存储字段
export const LOGIN_KEYS = {
  CSRF_TOKEN: '_U_T_',
};


export function getUserAuth() {
  return {
    csrfToken: Cookies.get(LOGIN_KEYS.CSRF_TOKEN) || '',
  };
}

// 修改pinia登录状态
const setStatus = (status: LoginStatusT) => {
  const loginStore = useLoginStore();
  loginStore.setLoginStatus(status);
};
// authing认证登录
export async function doLogin() {
  const { lang } = getLanguage();
  try {
    window.location.href = `${LOGIN_URL}/login?redirect_uri=${encodeURIComponent(location.href)}&lang=${lang}`;
  } catch (error) {
    setStatus(LOGIN_STATUS.FAILED);
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
