import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { handleError } from '@/shared/utils';
/**
 * 获取兼容性列表数据
 * @name getCertification
 */
export function getCompatibilityData(params: any) {
  const url = `/api-dsapi/query/isv`;
  return request
    .get(url, { params })
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}
