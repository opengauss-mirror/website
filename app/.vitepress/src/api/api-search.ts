import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

interface SearchParamsT {
  keyword: string;
  page: number;
  pageSize: number;
  lang: string;
  type: string;
}

interface ConditionT {
  archives?: string;
  tags?: string;
  author?: string;
}
interface TagsParamsT {
  lang: string;
  category: string;
  want: string;
  condition?: ConditionT;
}

interface TotalNumItemT {
  count: number;
  key: string;
}
interface TagsDataT {
  msg: string;
  obj: {
    totalNum: TotalNumItemT[];
  };
  status: number;
}

interface SearchDataItemT {
  title: string;
  type: string;
  summary: string;
  textContent: string;
  author?: string[];
  [key: string]: string | string[] | undefined;
}
interface SearchDataT {
  msg: string;
  obj: {
    keyword: string;
    page: number;
    pageSize: number;
    records: SearchDataItemT[];
  };
  status: number;
}
interface SearchCountItemT {
  doc_count: number;
  key: string;
}
interface SearchCountT {
  msg: string;
  obj: {
    total: SearchCountItemT[];
  };
  status: number;
}

interface LimitItemT {
  type: string;
  version: string;
}
interface SearchCountParamsT {
  keyword: string;
  lang: string;
  docsVersion: number;
  limit: LimitItemT[];
}
interface LimitItemT {
  type: string;
  version: string;
}
interface SearchCountParamsT {
  keyword: string;
  lang: string;
  docsVersion: number;
  limit: LimitItemT[];
}
/**
 * 获取搜索关键词出现的文档版本及每个版本的数据量
 * @param {Object} params
 * @param {string} params.lang        - 语言
 * @param {string} params.category    - 分类
 * @param {string} params.want        - tag关键词
 * @param doException             - 是否使用axios配置的弹窗
 * @return {Promise<TagsDataT>}     返回一个 Promise，解析为搜索关键词在不同版本文档中的数量
 */
export function getTagsData(
  params: TagsParamsT,
  doException = false
): Promise<TagsDataT> {
  const url = '/api-search/search/tags';
  return request
    .post(url, params, {
      $doException: doException,
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 获取搜索关键词在本站点搜索的结果
 * @param {Object} params
 * @param {string} params.keyword     - 搜索关键词
 * @param {string} params.page        - 当前页码
 * @param {string} params.pageSize    - 每页数据条数
 * @param {string} params.lang        - 当前语言
 * @param {string} params.type        - 搜索分类
 * @param {Object} params.limit       - 版本限制参数
 * @param {string} params.limit.type       - 限制类型
 * @param {string} params.limit.version       - 版本号
 * @param doException             - 是否使用axios配置的弹窗
 * @return {Promise<SearchDataT>}     返回一个 Promise，解析为搜索关键词搜索出来的内容
 */
export function getSearchData(
  params: SearchParamsT,
  doException = false
): Promise<SearchDataT> {
  const url = '/api-search/search/docs';
  return request
    .post(url, params, {
      $doException: doException,
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 获取搜索关键词在本站点搜索的结果中不同分类的数量
 * @param {Object} params
 * @param {string} params.docsVersion     - 文档版本
 * @param {string} params.keyword         - 搜索关键词
 * @param {string} params.lang            - 当前语言
 * @param {Array..<{ type: string, version: string }>}  params.limit           - 版本限制参数
 * @param doException             - 是否使用axios配置的弹窗
 * @return {Promise<SearchCountT>}     返回一个 Promise，解析为搜索关键词搜索出来内容在不同分类中的数量
 */
export function getSearchCount(
  params: SearchCountParamsT,
  doException = false
): Promise<SearchCountT> {
  const url = '/api-search/search/count';
  return request
    .post(url, params, {
      $doException: doException,
    })
    .then((res: AxiosResponse) => res.data);
}
