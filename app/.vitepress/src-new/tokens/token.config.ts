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

/* eslint-disable no-undef */
module.exports = {
  prefix: '--o-',
  output: '../assets/style/theme',
  themeMap: [
    {
      key: 'light',
      name: 'light',
    },
    {
      key: 'dark',
      name: 'dark',
    },
  ],
  defaultTheme: 'light',
  tokenFile: ['./opendesign-token.json'],
  codeSnippetsFile: '../../../../.vscode/opendesign.token.code-snippets',
};
