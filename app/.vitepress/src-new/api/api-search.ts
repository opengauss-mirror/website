import { AxiosResponse, request } from '@/shared/axios';

export interface SearchWordParamsT {
  keyword: string;
  lang: string;
}

export interface SearchComponentsResultT {
  count: number;
  key: string;
}

/**
 * 图片上传
 * @param image 图片文件
 */
export function imageUpload(image: File): Promise<{
  msg: string;
  obj: any;
  status: number;
}> {
  const url = '/api-search/search/sort/upload/image';
  const formData = new FormData();
  formData.append('image', image);
  return request
    .post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        source: 'mindspore',
      },
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 相关搜索
 * @name getSearchPop
 * @param {string} lang - 当前语言
 */
export function getSearchPop(lang: string): Promise<{
  status: number;
  obj: string[];
  msg: string;
}> {
  const url = `/api-search/search/pop?lang=${lang}`;
  return request.post(url).then((res: AxiosResponse) => res.data);
}

/**
 * 相关搜索
 * @name getSearchWord
 * @param {string} params.query - 搜索关键词
 * @param {string} params.lang - 当前语言
 */
export function getSearchWord(params: { query: string; lang: string }): Promise<{
  status: number;
  obj: {
    word: SearchComponentsResultT[];
  };
  msg: string;
}> {
  const url = `/api-search/search/word?query=${params.query}`;
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 图片搜索
 */
export function imageSearch(params: {
  lang: string;
  imageUrl: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
  type?: string;
  hq?: string;
  card?: string;
  filter?: { components: string; version: string }[];
  limit?: { components: string; version: string }[];
}): Promise<{
  msg: string;
  obj: any;
  status: number;
}> {
  const url = '/api-search/search/multitimodal';
  return request
    .post(url, params, {
      headers: {
        source: 'opengauss',
      },
    })
    .then((res: AxiosResponse) => res.data);
}
