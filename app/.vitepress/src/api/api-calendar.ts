import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { handleError, getCustomCookie } from '@/shared/utils';

/**
 * 获取会议数据
 * @name getMeetingData
 * @return {Array}
 */
// /calendar

export function getMeetingData(group: string) {
  const url = `/api-meeting/calendar/meetingsdata/?group=${group}`;
  return request
    .get(url, {
      $doException: false,
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 获取会议 sig组
 * @name getMeetingSig
 * @return {Array}
 */
export function getMeetingSig() {
  const url = '/api-meeting/calendar/groups/';
  return request
    .get(url, {
      $doException: false,
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * gitee登录
 * @name giteeLogin
 */
export function giteeLogin() {
  const url = '/api-meeting/calendar/gitee_login/';
  return request
    .get(url, {
      $doException: false,
    })
    .then((res: AxiosResponse) => res.data);
}
export function giteeLogout() {
  const url = '/api-meeting/calendar/logout/';
  return request
    .get(url, {
      $doException: false,
    })
    .then((res: AxiosResponse) => res.data);
}
/**
 * 会议用户
 * @name meetingLogin
 */
export function meetingLogin() {
  const url = `/api-meeting/calendar/user/`;
  return request
    .get(url, {
      $doException: false,
    })
    .then((res: AxiosResponse) => res.data);
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
