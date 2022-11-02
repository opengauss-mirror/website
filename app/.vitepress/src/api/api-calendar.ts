import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 获取会议数据
 * @name getMeetingData
 * @return {Array}
 */
// /calendar
const REQUEST_PREFIX = 'http://119.8.32.82:8080';

export function getMeetingData(params: object) {
  const url = REQUEST_PREFIX + '/meetingsdata/';
  return request
    .get(url, { params })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 获取会议 sig组
 * @name getMeetingSig
 * @return {Array}
 */
export function getMeetingSig() {
  const url = REQUEST_PREFIX + '/groups/';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * gitee登录
 * @name giteeLogin
 */
export function giteeLogin() {
  const url = REQUEST_PREFIX + '/gitee_login/';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 会议用户
 * @name meetingLogin
 */
export function meetingLogin() {
  const url = REQUEST_PREFIX + `/user/`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

export function meetingReserve(params: object) {
  const url = REQUEST_PREFIX + `/meetings/`;
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

export function meetingDelete(mid: number | null) {
  const url = REQUEST_PREFIX + `/meeting/action/delete/${mid}/`;
  return request
    .delete(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

export function meetingUpdate(mid: number | null, params: object) {
  const url = REQUEST_PREFIX + `/meeting/action/update/${mid}/`;
  return request
    .put(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

export function meetingCheck(mid: number | null) {
  const url = REQUEST_PREFIX + `/meeting/${mid}/`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
