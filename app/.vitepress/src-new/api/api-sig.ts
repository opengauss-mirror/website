import { getUserAuth } from '@/shared/login';
import { AxiosResponse, request } from '~@/shared/axios';

export function getSigLandscape() {
  const url = `/api-magic/sig/scoreAll`;
  return request.get(url, { params: { community: 'opengauss' } }).then((res: AxiosResponse) => res.data);
}

export function getSigList() {
  const url = `/api-magic/stat/sig/info`;
  return request.get(url, { params: { community: 'opengauss' } }).then((res: AxiosResponse) => res.data);
}

export function getSigInfo(sigName: string) {
  const url = `/api-magic/stat/sig/info`;
  return request.get(url, { params: { community: 'opengauss', sig: sigName } }).then((res: AxiosResponse) => res.data);
}

export function sigSearch(data: { keyword: string; keywordType: string }) {
  const url = `/api-search/sigsearch/docs`;
  return request.post(url, { data }).then((res: AxiosResponse) => res.data);
}

export function getSigRepos(sigName: string) {
  const url = `/api-magic/sig/new/repo/committers?community=openeuler&sig=A-Tune`;
  return request.get(url, { params: { community: 'opengauss', sig: sigName } }).then((res: AxiosResponse) => res.data);
}

export function getSigContributeData(params: any) {
  const url = `/api-magic/stat_new/sig/user/contribute`;
  return request.get(url, { params: { ...params, community: 'opengauss' } }).then((res: AxiosResponse) => res.data);
}

/**
 * 获取某天的前后存在会议的日期
 * @param {string} date 该天的日期
 * @returns {Promise<string[]>} 会议日期列表
 */
export const getMeetingDateListApi = async (date: string, group_name?: string, is_record?: string): Promise<string[]> => {
  const { csrfToken: token } = getUserAuth();
  const res = await request.get(
    `/api-meeting/api/v1/meeting/meeting_date/?date=${date}${group_name ? `&group_name=${group_name}` : ''}${is_record ? `&is_record=${is_record}` : ''}`,
    { headers: { token } }
  );
  return res.data.data;
};