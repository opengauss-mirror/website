import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 获取用户案例
 * @name getUserCaseData
 *
 */
export function getUserCaseData(params: object) {
  const url = '/api-search/search/sort';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
