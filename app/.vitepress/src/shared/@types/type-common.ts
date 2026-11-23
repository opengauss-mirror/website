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

export interface ResponseT<T> {
  code: string;
  msg: string;
  data: T;
}
export interface ResponseSearchT<T> {
  msg: string;
  status: number;
  obj: T;
}

export interface LimitArrItemT {
  type: string;
  version: string;
}

// 关联搜索参数
export interface RelevantQueryT {
  keyword: string;
  page: number;
  pageSize: number;
  lang: string;
  type: string;
  limit: LimitArrItemT[];
  correctEnable?: boolean;
}
