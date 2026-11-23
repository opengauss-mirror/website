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

import type { AxiosResponse } from 'axios';
// 处理响应错误码
export default (response: AxiosResponse) => {
  const { status } = response;
  // 如果http响应状态码response.status正常，则直接返回数据
  if ((status >= 200 && status <= 300) || status === 304) {
    return response;
  } else {
    const code = parseInt(response.data && response.data.code);
    const message = (response.data || {}).msg;

    return {
      code,
      message,
    };
  }
};
