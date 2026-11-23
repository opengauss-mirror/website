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

import { stat, readFile } from 'node:fs/promises';

export async function readFileAsJson(filePath) {
  // 1. 防御：先检查文件大小，超过 5MB 拒绝执行，防止大文件攻击
  const stats = await stat(filePath);
  if (stats.size > 5 * 1024 * 1024) {
    throw new Error('File too large, potential DoS risk.');
  }

  // 2. 读取并解析
  const content = await readFile(filePath, 'utf-8');
  return JSON.parse(content);
}
