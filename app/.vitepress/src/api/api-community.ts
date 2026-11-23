/*
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 * website is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import { request } from '@/shared/axios';
import { getUserAuth } from '@/shared/login';
/**
 * meetup接口  申请表
 * @param {Object} params 申请表格数据
 * @return  {Object}
 */
export function meetupApplyForm(params: any): Promise<{
  code: number;
  data: string;
  msg: string;
}> {
  const url = `/api-dsapi/query/meetupApplyForm?community=opengauss`;
  const { csrfToken } = getUserAuth();
  return request
    .post(url, params, {
      showLoading: true,
      headers: {
        token: csrfToken,
      },
    })
    .then((res) => {
      return res.data;
    });
}

/**
 * teamup接口  申请表
 * @param {Object} params 申请表格数据
 * @return  {Object}
 */
export function teamupApplyForm(params: any): Promise<{
  code: number;
  data: string;
  msg: string;
}> {
  const url = `/api-dsapi/query/teamupApplyForm?community=opengauss`;
  const { csrfToken } = getUserAuth();
  return request
    .post(url, params, {
      showLoading: true,
      headers: {
        token: csrfToken,
      },
    })
    .then((res) => {
      return res.data;
    });
}
