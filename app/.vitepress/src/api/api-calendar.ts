import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { handleError } from '@/shared/utils';

/**
 * 获取会议数据
 * @name getMeetingData
 */
// /calendar

export function getMeetingData(group: string) {
  const url = `/api-meeting/meetingsdata/?group=${group}`;
  return request
    .get(url, { $doException: false })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 获取会议 sig组
 * @name getMeetingSig
 * @return {Array}
 */
export function getMeetingSig() {
  const url = '/api-meeting/groups/';
  return request
    .get(url, { $doException: false })
    .then((res: AxiosResponse) => res.data);
}

/**
 * gitee登录
 * @name loginGitee
 */
export function loginGitee() {
  const url = '/api-meeting/gitee_login/';
  return request
    .get(url, { $doException: false })
    .then((res: AxiosResponse) => res.data);
}
// 会议登录
export function loginMeeting(params: object, token = '') {
  const url = '/api-meeting/login/';
  return request
    .post(url, params, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      $doException: false,
    })
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}
// 会议登出
export function logoutMeeting(token = '') {
  const url = '/api-meeting/logout/';
  return request
    .get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      $doException: false,
    })
    .then((res: AxiosResponse) => res.data);
}
/**
 * 获取用户信息
 * @name getUserInfo
 */
export function getUserInfo(token = '') {
  const url = `/api-meeting/user/`;
  return request
    .get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      $doException: false,
    })
    .then((res: AxiosResponse) => res.data);
}

//新增会议
export function addMeeting(params: object, token = '') {
  const url = `/api-meeting/meetings/`;
  return request
    .post(url, params, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}

export function deleteMeeting(mid: number | null, token = '') {
  const url = `/api-meeting/meeting/action/delete/${mid}/`;
  return request
    .delete(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}

export function updateMeeting(mid: number | null, params: object, token = '') {
  const url = `/api-meeting/meeting/action/update/${mid}/`;
  return request
    .put(url, params, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}
