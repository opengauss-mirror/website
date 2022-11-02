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
  const url = `/api-gauss/advisoryCVE/v1/gauss/sa?pageNum=${params.pageNum}&pageSize=${params.pageSize}&searchName=${params.searchName}&years=${params.years}&cveLevel=${params.cveLevel}&releaseFlag=${params.releaseFlag}`;
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
  const url = `/api-gauss/advisoryCVE/v1/gauss/sa/detail?gaussSaNum=${params}`;
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
  const url = `/api-gauss/advisoryCVE/v1/gauss/cve?pageNum=${params.pageNum}&pageSize=${params.pageSize}&searchName=${params.searchName}&releaseFlag=${params.releaseFlag}`;
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
  const url = `/api-gauss/advisoryCVE/v1/gauss/cve/detail?cveNum=${name}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取兼容性列表-整机
 * @name getCompatibilityList
 */
export function getCompatibilityList(params: any) {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/hardwarecomp/findAll';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取驱动--架构的下拉列表
 * @name getCompatibilityList
 */
// export function driverArchitectureOptions(params: SelectParams) {
//   const url =
//     '/api-euler/api-cve/cve-security-notice-server/hardwarecomp/getArchitecture';
//   return request
//     .get(url, params)
//     .then((res: AxiosResponse) => res.data)
//     .catch((e: any) => {
//       throw new Error(e);
//     });
// }

/**
 * 调用接口获取驱动--操作系统的下拉列表
 * @name getCompatibilityList
 */
// export function driverOSOptions(params: SelectParams) {
//   const url =
//     '/api-euler/api-cve/cve-security-notice-server/hardwarecomp/getOS';
//   return request
//     .get(url, params)
//     .then((res: AxiosResponse) => res.data)
//     .catch((e: any) => {
//       throw new Error(e);
//     });
// }

/**
 * 调用接口获取兼容性配置信息
 * @name getConfigurationInfo
 */
export function getConfigurationInfo(id: string) {
  const url = ` /api-euler/api-cve/cve-security-notice-server/hardwarecomp/getOne?id=${id}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取列表信息
 * @name getdetailAapterList
 */
export function getdetailAapterList(id: string) {
  const url = ` /api-euler/api-cve/cve-security-notice-server/hardwarecomp/getAdapterList?hardwareId=${id}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取兼容性列表-板卡
 * @name getCompatibilityList
 */
export function getDriverList(params: any) {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/drivercomp/findAll';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取兼容性列表-开源软件
 * @name getSoftwareList
 */
export function getSoftwareList(params: any) {
  const os = params.os ? `&os=${params.os}` : '';
  const architecture = params.architecture
    ? `&arch=${params.architecture}`
    : '';
  const type = params.type ? `&type=${params.type}` : '';
  const keyword = params.keyword ? `&keyword=${params.keyword}` : '';
  const url = ` /compatibility/web_backend/compat_software_info?page_size=${params.pages.size}&page_num=${params.pages.page}${keyword}${architecture}${os}${type}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取兼容性列表-商业软件
 * @name businessSoftwareList
 */
export function getBusinessSoftwareList(params: any) {
  const osName = params.os ? `&osName=${params.os}` : '';
  const testOrganization = params.testOrganization
    ? `&testOrganization=${params.testOrganization}`
    : '';
  const keyword = params.keyword ? `&keyword=${params.keyword}` : '';
  const url = ` /certification/software/communityChecklist?pageSize=${params.pages.size}&pageNo=${params.pages.page}${testOrganization}${osName}${keyword}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取兼容性列表-开源软件筛选条件
 * @name getSoftFilter
 */
export function getSoftFilter() {
  const url = '/compatibility/web_backend/query_compat_software';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取兼容性列表-测试机构
 * @name getTestOrganizations
 */
export function getTestOrganizations() {
  const url = '/certification/software/filterCriteria';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取兼容性列表-CPU
 * @name getCpu
 */
export function getCpu(params: SelectParams) {
  const url = `/api-euler/api-cve/cve-security-notice-server/hardwarecomp/getCpu?lang=${params.lang}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取OSV技术评测列表-os厂商
 * @name getOsName
 */
export function getOsName() {
  const url = '/api-approve/cve-security-notice-server/osv/getOsName';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取OSV技术评测列表-分类
 * @name getOsType
 */
export function getOsType() {
  const url = '/api-approve/cve-security-notice-server/osv/getType';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取OSV技术评测表格数据
 * @name getOsTableData
 */
export function getOsTableData(params: CveQuery) {
  const url = '/api-approve/cve-security-notice-server/osv/findAll';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 调用接口获取OSV技术评测详细信息
 * @name getOsvOne
 */
export function getOsvOne(params: DetailQuery) {
  const url = `/api-approve/cve-security-notice-server/osv/getOne?id=${params.id}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
