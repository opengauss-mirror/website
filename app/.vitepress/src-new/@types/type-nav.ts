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
  NAME: string;
  DESCRIPTION: string;
  TAG?: string;
  ICON?: string;
  URL: string;
}

export interface NavSubItemT {
  NAME: string;
  CHILDREN: NavChildrenItemT[];
}

export interface ShortCutItemT {
  NAME: string;
  URL: string;
}

export interface NavItemT {
  NAME: string;
  ID: string;
  WITH_PICTURE?: boolean;
  CHILDREN?: NavSubItemT[];
  SHORTCUT?: ShortCutItemT[];
}

export interface SourceCodeItemT {
  NAME: string;
  PATH: string;
  ICON: string;
}
