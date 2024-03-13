import { request } from '@/shared/axios';
import { clearUserAuth, getUserAuth } from '@/shared/login';
interface ResponseT {
  code: string;
  msg: string;
  data: any;
}

const APP_ID = import.meta.env.VITE_APP_ID;
/**
 * 获取用户信息
 * @param {Object} params 用户信息查询参数
 * @param {string} params.xCsrf csrf token
 * @param {string} params.account 用户名
 * @returns {Promise<ResponseT | void> | undefined} 用户信息
 */
export function getUserInfo(): Promise<ResponseT | void> | undefined {
  const { csrfToken } = getUserAuth();
  if (csrfToken) {
    const url = `/api-oneid/oneid/user/refresh?community=opengauss&client_id=${APP_ID}`;
    return request
      .get(url, {
        global: true,
        headers: {
          token: csrfToken,
        },
      })
      .then((res) => res.data)
      .catch(() => {
        clearUserAuth();
      });
  }
}

/**
 * 获取全量用户信息
 * @returns {Promise<ResponseT | void> | undefined} 用户信息
 */
export function getUserAllInfo(): Promise<ResponseT | void> | undefined {
  const { csrfToken } = getUserAuth();
  if (csrfToken) {
    const url = `/api-oneid/oneid/personal/center/user?community=opengauss&client_id=${APP_ID}`;
    return request
      .get(url, {
        global: true,
        headers: {
          token: csrfToken,
        },
      })
      .then((res) => res.data)
      .catch(() => {
        clearUserAuth();
      });
  }
}

/**
 * 获取id token，构造登出URL
 * @returns {Promise<ResponseT>} id token
 */
export function getUserIdToken() {
  const url = `/api-oneid/oneid/logout?community=opengauss&client_id=${APP_ID}`;
  const { csrfToken } = getUserAuth();
  if (csrfToken) {
    return request
      .get(url, {
        headers: {
          token: csrfToken,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        clearUserAuth();
      });
  }
}
