import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import type { MeettingTableDataT, SigGroupDataT, LoginMeetingT, LoginGiteeT, UserInfoT, UpdateMeetingInfoT } from '@/shared/@types/type-calendar';
import type { ResponseT } from '@/shared/@types/type-common';
/**
 * 获取会议数据
 * @param {string} group           - sig名字
 * @param {boolean} showLoading      - 是否使用加载动画。默认为 true。
 *                                   传入 true 表示使用加载动画，传入 false 表示不使用。
 * @return {Promise{MeettingTableDataT}} - 一个 Promise，解析为解析为会议 SIG 的对象。
 */

export function getMeetingData(group: string): Promise<{ tableData: MeettingTableDataT[] }> {
  const url = `/api-meeting/meetingsdata/?group=${group}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 获取会议 sig组
 * @return {Promise<SigGroupDataT[]>} - 一个 Promise，解析为解析为会议 SIG 的数组。
 */
export function getMeetingSig(): Promise<SigGroupDataT[]> {
  const url = '/api-meeting/groups/';
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * gitee登录
 * @return {Promise<LoginGiteeT>} - 一个 Promise，解析为登录成功返回的认证信息。
 */
export function loginGitee(): Promise<LoginGiteeT> {
  const url = '/api-meeting/gitee_login/';
  return request.get(url, { showLoading: true }).then((res: AxiosResponse) => res.data);
}

/**
 * 会议登录
 * @param {Object} params - 输入的新增会议信息
 * @param {string} params.code     - 登录验证码
 * @param {string} params.language - 目前的语言
 * @param showLoading      - 是否使用加载动画。默认为 true。
 *                         传入 true 表示使用加载动画，传入 false 表示不使用。
 * @return {Promise<LoginMeetingT>} - 一个 Promise，解析为登录成功返回的认证信息。
 */
export function loginMeeting(params: object): Promise<LoginMeetingT> {
  const url = '/api-meeting/login/';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 会议登出
 * @param {string} token          - 登录后的认证码
 * @return {Promise<LoginMeetingT>} - 一个 Promise，解析为退出登录后返回的认证信息。
 */
export function logoutMeeting(token = ''): Promise<LoginMeetingT> {
  const url = '/api-meeting/logout/';
  return request
    .get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 获取登录用户信息
 * @param {string} token             - 登录后的认证码
 * @return {Promise<ResponseT<UserInfoT>>}
 */
export function getUserInfo(token = ''): Promise<ResponseT<UserInfoT>> {
  const url = `/api-meeting/user/`;
  return request
    .get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      showLoading: true,
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 新增会议
 * @param {Object} params - 输入的新增会议信息
 * @param {string} params.platform - 会议平台
 * @param {string} params.group_name - 会议群组名称
 * @param {string} params.join_url - 会议链接
 * @param {string} params.date - 会议日期
 * @param {string} params.etherpad - Etherpad 链接
 * @param {string} params.emaillist - 邮件列表
 * @param {string} params.record - 是否录制
 * @param {string} params.topic - 会议主题
 * @param {string} params.sponsor - 会议主持人
 * @param {string} params.start - 会议开始时间
 * @param {string} params.end - 会议结束时间
 * @param {string} params.agenda - 会议议程
 * @param {string} token - 登录后的认证码
 * @return {Promise<UpdateMeetingInfoT>} 返回一个 Promise，解析为添加会议是否成功的反馈信息
 */
export function addMeeting(params: object, token = ''): Promise<UpdateMeetingInfoT> {
  const url = `/api-meeting/meetings/`;
  return request
    .post(url, params, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 删除会议
 * @param {string} mid               - 要删除会议的ID
 * @param {string} token             - 登录后的认证码
 * @return {Promise<UpdateMeetingInfoT>} 返回一个 Promise，解析为删除会议是否成功的反馈信息
 */
export function deleteMeeting(mid: number | null, token = ''): Promise<UpdateMeetingInfoT> {
  const url = `/api-meeting/meeting/action/delete/${mid}/`;
  return request
    .delete(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 更新会议
 * @param {string} mid               - 要更新会议的ID
 * @param {Object} params - 输入的新增会议信息
 * @param {string} params.platform - 会议平台
 * @param {string} params.group_name - 会议群组名称
 * @param {string} params.join_url - 会议链接
 * @param {string} params.date - 会议日期
 * @param {string} params.etherpad - Etherpad 链接
 * @param {string} params.emaillist - 邮件列表
 * @param {string} params.record - 是否录制
 * @param {string} params.topic - 会议主题
 * @param {string} params.sponsor - 会议主持人
 * @param {string} params.start - 会议开始时间
 * @param {string} params.end - 会议结束时间
 * @param {string} params.agenda - 会议议程
 * @param {string} token             - 登录后的认证码
 * @return {Promise<UpdateMeetingInfoT>} 返回一个 Promise，解析为更新会议是否成功的反馈信息
 */
export function updateMeeting(mid: number | null, params: object, token = ''): Promise<UpdateMeetingInfoT> {
  const url = `/api-meeting/meeting/action/update/${mid}/`;
  return request
    .put(url, params, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res: AxiosResponse) => res.data);
}
