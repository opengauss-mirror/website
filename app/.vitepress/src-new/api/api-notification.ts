
import { request } from '~@/shared/axios';
import { QueryMeetingT } from '~@/@types/type-notifications';
import { getUserAuth } from '~@/shared/login';

/**
 * 同步个人信息
 * @param {Object} params
 * @returns {Promise<ResponseT> }
 */
export function syncInfo() {
  const url = '/api-message/message_center/config/recipient/sync';
  const { csrfToken: token } = getUserAuth();
  return request
    .post(
      url,
      {},
      {
        headers: {
          token,
        },
      }
    )
    .then((res) => {
      return res.data;
    });
}

/**
 * 获取所有消息的未读数量
 * @returns {Promise<ResponseT> }
 */
export function geAllCount() {
  const token = getUserAuth();
  const url = '/api-message/message_center/inner/count';
  return request
    .get(url, {
      headers: {
        token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

/**
 * 获取所有消息
 * @param {Object} params
 * @returns {Promise<ResponseT> }
 */
export function geAllInfo(params: QueryMeetingT) {
  const token = getUserAuth();
  const url = '/api-message/message_center/all';
  return request
    .get(url, {
      params,
      headers: {
        token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

/**
 * 系统通知消息
 * @param {Object} params
 * @returns {Promise<ResponseT> }
 */
export function getSystemInfo(params: QueryMeetingT) {
  const token = getUserAuth();
  const url = '/api-message/message_center/inner/system';
  return request
    .get(url, {
      params,
      headers: {
        token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

/**
 * 会议通知消息
 * @param {Object} params
 * @returns {Promise<ResponseT> }
 */
export function getMeetingInfo(params: QueryMeetingT) {
  const token = getUserAuth();
  const url = '/api-message/message_center/inner/meeting/all';
  return request
    .get(url, {
      params,
      headers: {
        token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

/**
 * 设置消息为已读
 * @param {Object} params
 * @returns {Promise<ResponseT> }
 */
export function setReadInfo(params: string[]) {
  const token = getUserAuth();
  const url = '/api-message/message_center/inner';
  return request
    .put(url, params, {
      headers: {
        token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

/**
 * 删除消息
 * @param {Object} params
 * @returns {Promise<ResponseT> }
 */
export function deleteInfo(params: string[]) {
  const token = getUserAuth();
  const url = '/api-message/message_center/inner';
  return request
    .delete(url, {
      data: params,
      headers: {
        token,
      },
    })
    .then((res) => {
      return res.data;
    });
}
