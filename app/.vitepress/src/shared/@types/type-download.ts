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

export interface ContentItemT {
  docsName: string;
  docs_url: string;
  down_url: string;
  name: string;
  sha_code: string;
  size: string;
  table?: string;
  edition?: string;
}
export interface DownloadItemT {
  architecture: string;
  content: Array<ContentItemT>;
  os: string;
  system: string;
  docs?: boolean;
}
