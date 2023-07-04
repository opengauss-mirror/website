import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { handleError } from '@/shared/utils';

/**
 * 获取会议数据
 * @name getMeetingData
 * @return {Array}
 */
// /calendar

export function getMeetingData(params: object) {
  const url = '/calendar/meetingsdata/';
  return request
    .get(url, { params })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      handleError('Error!')
    });
}

/**
 * 获取会议 sig组
 * @name getMeetingSig
 * @return {Array}
 */
export function getMeetingSig() {
  const url = '/calendar/groups/';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      handleError('Error!')
    });
}

/**
 * gitee登录
 * @name giteeLogin
 */
export function giteeLogin() {
  const url = '/calendar/gitee_login/';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      handleError('Error!')
    });
}

/**
 * 会议用户
 * @name meetingLogin
 */
export function meetingLogin() {
  const url = `/calendar/user/`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      handleError('Error!')
    });
}

export function meetingReserve(params: object) {
  const url = `/calendar/meetings/`;
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      handleError('Error!')
    });
}

export function meetingDelete(mid: number | null) {
  const url = `/calendar/meeting/action/delete/${mid}/`;
  return request
    .delete(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      handleError('Error!')
    });
}

export function meetingUpdate(mid: number | null, params: object) {
  const url = `/calendar/meeting/action/update/${mid}/`;
  return request
    .put(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      handleError('Error!')
    });
}

export function meetingCheck(mid: number | null) {
  const url = `/calendar/meeting/${mid}/`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      handleError('Error!')
    });
}
