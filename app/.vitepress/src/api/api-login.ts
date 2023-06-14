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
  client_id: '6486e93d32fd99f306f639e3',
};
export function queryPermission() {
  const url = '/omapi/oneid/user/refresh';
  const { token } = getUserAuth();
  return request
    .get(url, {
      params,
      global: true,
      $doException: true,
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
  const url = '/omapi/oneid/logout';
  const { token } = getUserAuth();
  return request
    .get(url, {
      params,
      $doException: true,
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
