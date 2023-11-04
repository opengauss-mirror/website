import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { handleError } from '@/shared/utils';

interface SortParams {
  category: string;
  lang: string;
  page: number;
  pageSize: number;
}
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

export function getSortData(params: SortParams | object, doException = false) {
  const url = '/api-search/search/sort';
  return request
    .post(url, params, {
      $doException: doException,
    })
    .then((res: AxiosResponse) => res.data);
}

export function getTagsData(params: TagsParams) {
  const url = '/api-search/search/tags';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

export function getSearchData(params: search) {
  const url = '/api-search/search/docs';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}
export function getSearchCount(params: any) {
  const url = '/api-search/search/count';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}
