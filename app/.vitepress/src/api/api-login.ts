/**
 * @file  登录接口配置文件
 * */

import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { getUserAuth } from '@/shared/login';
import { ElMessage } from 'element-plus';

/**
 * 获取授权的相关回调链接
 */
const params = {
  community: 'opengauss',
  client_id: '538af6967c724b1fabd0da83109ede6e',
};
export function queryPermission() {
  const url = '/api-oneid/oneid/user/refresh';
  const { token } = getUserAuth();
  return request
    .get(url, {
      params,
      global: true,
      headers: {
        token,
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((err) => {
      const message = err?.response?.data?.message || '';
      if (message && message !== 'token expires') {
        ElMessage({
          type: 'error',
          message: err.message,
        });
      }
    });
}

/**
 * 获取idtoken用于退出
 */
export function queryIDToken() {
  const url = '/api-oneid/oneid/logout';
  const { token } = getUserAuth();
  return request
    .get(url, {
      params,
      headers: {
        token,
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((err) => {
      const message = err?.response?.data?.message || '';
      if (message && message !== 'token expires') {
        ElMessage({
          type: 'error',
          message: err.message,
        });
      }
    });
}