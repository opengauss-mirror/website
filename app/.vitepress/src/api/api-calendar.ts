import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { handleError, getCustomCookie } from '@/shared/utils';

/**
 * 获取会议数据
 * @name getMeetingData
 * @return {Array}
 */
// /calendar

export function getMeetingData(params: object) {
  const url = '/api-meeting/calendar/meetingsdata/';
  return request
    .get(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}

/**
 * 获取会议 sig组
 * @name getMeetingSig
 * @return {Array}
 */
export function getMeetingSig() {
  const url = '/api-meeting/calendar/groups/';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}

/**
 * gitee登录
 * @name giteeLogin
 */
export function giteeLogin() {
  const url = '/api-meeting/calendar/gitee_login/';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}
export function giteeLogout() {
  const url = '/api-meeting/calendar/logout/';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}
/**
 * 会议用户
 * @name meetingLogin
 */
export function meetingLogin() {
  const url = `/api-meeting/calendar/user/`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}

export function meetingReserve(params: object) {
  const url = `/api-meeting/calendar/meetings/`;
  return request
    .post(url, params, {
      headers: {
        'X-Csrftoken': getCustomCookie('meeting-csrftoken'),
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}

export function meetingDelete(mid: number | null) {
  const url = `/api-meeting/calendar/meeting/action/delete/${mid}/`;
  return request
    .delete(url, {
      headers: {
        'X-Csrftoken': getCustomCookie('meeting-csrftoken'),
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}

export function meetingUpdate(mid: number | null, params: object) {
  const url = `/api-meeting/calendar/meeting/action/update/${mid}/`;
  return request
    .put(url, params, {
      headers: {
        'X-Csrftoken': getCustomCookie('meeting-csrftoken'),
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch(() => {
      handleError('Error!');
    });
}
