import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 满意度评分
 * @name postFeedback
 */
export function postFeedback(params: any) {
  const url = '/api-search/search/nps?community=opengauss';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
