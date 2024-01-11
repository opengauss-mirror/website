import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import type {
  SecurityListsT,
  SecurityQueryT,
  SecurityDetailT,
  CveQueryT,
  CveListsT,
  CveDetailT,
} from '@/shared/@types/type-security';

/**
 * 调用接口获取安全公告列表
 * @param {Object} params
 * @param {number} params.pageNum - 当前页码
 * @param {number} params.pageSize - 每页数据条数
 * @param {string} params.searchName - 搜索名称
 * @param {string} params.years - 年份
 * @param {string} params.cveLevel - 严重级别
 * @param {string} params.releaseFlag - 发布标志(可去除)
 * @returns {Promise<{
 *   body: SecurityListsT[];  // 安全公告列表
 *   code: string;            // 响应码
 *   errmsg: string;          // 响应提示信息
 *   totalCount: number;       // 总条数
 *   totalPage: number;        // 总页数
 * }>} - 一个 Promise，解析为包含安全公告列表的响应对象。
 */
export function getSecurityList(params: SecurityQueryT): Promise<{
  body: SecurityListsT[];
  code: string;
  errmsg: string;
  totalCount: number;
  totalPage: number;
}> {
  const url = `/api-cve/v1/gauss/sa?pageNum=${params.pageNum}&pageSize=${params.pageSize}&searchName=${params.searchName}&years=${params.years}&cveLevel=${params.cveLevel}&releaseFlag=${params.releaseFlag}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取安全公告详情
 * @param {string} params - 安全公告名字
 * @returns {Promise<{
 *   body: SecurityDetailT[];  // 安全公告详情数据
 *   errno: string;            // 响应码
 *   errmsg: string;          // 响应提示信息
 * }>} - 一个 Promise，解析为包含安全公告详情的响应对象。
 */
export function getSecurityDetail(params: string): Promise<{
  body: SecurityDetailT;
  errno: string;
  errmsg: string;
}> {
  const url = `/api-cve/v1/gauss/sa/detail?gaussSaNum=${params}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取 CVE 列表
 * @param {Object} params
 * @param {number} params.pageNum - 当前页码
 * @param {number} params.pageSize - 每页数据条数
 * @param {string} params.searchName - 搜索名称
 * @param {string} params.releaseFlag - 发布标志(可去除)
 * @returns {Promise<{
 *   body: CveListsT[];       // cve列表
 *   code: string;            // 响应码
 *   errmsg: string;          // 响应提示信息
 *   totalCount: number;      // 总条数
 *   totalPage: number;       // 总页数
 * }>} - 一个 Promise，解析为包含cve列表的响应对象。
 */
export function getCveList(params: CveQueryT): Promise<{
  body: CveListsT[];
  code: string;
  errmsg: string;
  totalCount: number;
  totalPage: number;
}> {
  const url = `/api-cve/v1/gauss/cve?pageNum=${params.pageNum}&pageSize=${params.pageSize}&searchName=${params.searchName}&releaseFlag=${params.releaseFlag}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取Cve详情信息
 * @param {string} name - cve名字
 * @returns {Promise<{
 *   body: CveDetailT[];       // cve列表
 *   errno: string;            // 响应码
 *   errmsg: string;          // 响应提示信息
 * }>} - 一个 Promise，解析为包含cve详情的响应对象。
 */
export function getCveDetail(name: string): Promise<{
  body: CveDetailT[];
  errno: string;
  errmsg: string;
}> {
  const url = `/api-cve/v1/gauss/cve/detail?cveNum=${name}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
