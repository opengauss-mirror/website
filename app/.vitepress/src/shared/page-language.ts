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

export function canonicalPagePath(url: string): string {
  let rest = url.replace(/^\/+/, '');
  const slash = rest.indexOf('/');
  if (slash === -1) return '';
  rest = rest.slice(slash + 1);
  return rest.replace(/\.html$/i, '').replace(/\/+$/, '');
}

export function pageLangFromUrl(url: string): string {
  const rest = url.replace(/^\/+/, '');
  const slash = rest.indexOf('/');
  return slash === -1 ? rest : rest.slice(0, slash);
}
