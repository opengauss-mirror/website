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

export interface NavChildrenItemT {
  id: string; // id
  label: {
    zh: string;
    en?: string;
  }; // 显示文字
  href: {
    zh: string;
    en?: string;
  }; // 跳转链接
  jumpOut?: boolean; // 是否新窗口打开，tags包含outlink时，默认为true
  tag?: string; // 标签
}

export interface NavItemT {
  id: string; // id
  label: {
    zh: string;
    en?: string;
  }; // 显示文字
  href?: {
    zh: string;
    en?: string;
  }; // 跳转链接
  children?: NavChildrenItemT[];
}

export type LocaleT = 'zh' | 'en';
