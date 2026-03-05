import { getUserAllInfo } from '@/api/api-user';
import { useLoginStore, useUserInfoStore } from '@/stores/user';
import type { UserInfoT } from '@/shared/@types/type-user';
import Cookies from 'js-cookie';

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
  Y_G: '_Y_G_'
};

// 修改pinia登录状态
const setStatus = (status: LoginStatusT) => {
  const loginStore = useLoginStore();
  loginStore.setLoginStatus(status);
};

// 获取用户认证凭据
export function getUserAuth() {
  return {
    csrfToken: Cookies.get(LOGIN_KEYS.CSRF_TOKEN),
  };
}

// 清除用户认证凭据
export function clearUserAuth() {
  // 清除内存中用户信息
  const userInfoStore = useUserInfoStore();
  userInfoStore.$reset();
  // 清除cookie
  Cookies.remove(LOGIN_KEYS.CSRF_TOKEN, { path: '/', domain: DOMAIN });
  Cookies.remove(LOGIN_KEYS.Y_G, { path: '/', domain: DOMAIN });
}

// 登录之后的回调
const afterLogined = (userInfo: UserInfoT) => {
  const { username } = userInfo;
  if (!username) {
    setStatus(LOGIN_STATUS.FAILED);
    clearUserAuth();
  }
  const userInfoStore = useUserInfoStore();
  userInfoStore.$patch(userInfo);
  setStatus(LOGIN_STATUS.DONE);
};

// 退出
export async function doLogout() {
  location.href = `${import.meta.env.VITE_LOGIN_URL}/logout?redirect_uri=${encodeURI(location.href)}`;
}

// 获取用户信息
export async function requestUserInfo() {
  const { csrfToken } = getUserAuth();
  if (csrfToken) {
    try {
      setStatus(LOGIN_STATUS.DOING);
      const res = await getUserAllInfo();
      if (res && res.data) {
        afterLogined(res.data);
      } else {
        doLogout();
        setStatus(LOGIN_STATUS.FAILED);
      }
    } catch {
      doLogout();
      setStatus(LOGIN_STATUS.FAILED);
    }
  } else {
    setStatus(LOGIN_STATUS.NOT);
  }
}

// authing认证登录
export async function doLogin() {
  const { lang } = getLanguage();
  try {
    window.location.href = `${LOGIN_URL}/login?redirect_uri=${encodeURIComponent(location.href)}&lang=${lang}`;
  } catch {
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
