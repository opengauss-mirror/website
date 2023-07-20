import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

interface SortParams {
  lang: string;
  page: number;
  pageSize: number;
}
export function getBlogsData(params: SortParams) {
  const url = '/api-search/search/sort/blogs';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
