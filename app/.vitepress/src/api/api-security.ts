import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import {
  CveQuery,
  DetailQuery,
  SelectParams,
} from '@/shared/@types/type-security';

/**
 * 调用接口获取安全公告列表
 * @name getSecurityList
 */
export function getSecurityList(params: any) {
  const url = `/advisoryCVE/v1/gauss/sa?pageNum=${params.pageNum}&pageSize=${params.pageSize}&searchName=${params.searchName}&years=${params.years}&cveLevel=${params.cveLevel}&releaseFlag=${params.releaseFlag}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
/**
 * 调用接口获取安全公告详情
 * @name getSecurityDetail
 */
export function getSecurityDetail(params: any) {
  const url = `/advisoryCVE/v1/gauss/sa/detail?gaussSaNum=${params}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取Cve列表
 * @name getCveList
 */
export function getCveList(params: any) {
  const url = `/advisoryCVE/v1/gauss/cve?pageNum=${params.pageNum}&pageSize=${params.pageSize}&searchName=${params.searchName}&releaseFlag=${params.releaseFlag}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取Cve详情信息
 * @name getCveDetail
 */
export function getCveDetail(name: string) {
  const url = `/advisoryCVE/v1/gauss/cve/detail?cveNum=${name}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
