import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

interface search {
  keyword: string;
  page: number;
  pageSize: number;
  lang: string;
  type: string;
}

interface Condition {
  archives?: string;
  tags?: string;
  author?: string;
}
interface TagsParams {
  lang: string;
  category: string;
  want: string;
  condition?: Condition;
}


export function getTagsData(params: TagsParams, doException = false) {
  const url = '/api-search/search/tags';
  return request
    .post(url, params, {
      $doException: doException,
    })
    .then((res: AxiosResponse) => res.data);
}

export function getSearchData(params: search, doException = false) {
  const url = '/api-search/search/docs';
  return request
    .post(url, params, {
      $doException: doException,
    })
    .then((res: AxiosResponse) => res.data);
}
export function getSearchCount(params: any, doException = false) {
  const url = '/api-search/search/count';
  return request
    .post(url, params, {
      $doException: doException,
    })
    .then((res: AxiosResponse) => res.data);
}
