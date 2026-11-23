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

function getCookie(key) {
  const name = `${encodeURIComponent(key)}=`;
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookies = decodedCookies.split('; ');
  for (let cookie of cookies) {
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }

  return null;
}

const e = getCookie('openGauss-theme-appearance') || 'auto';
const a = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (!e || e === 'auto' ? a : e === 'dark') {
  document.documentElement.setAttribute('data-o-theme', 'g.dark');
  document.documentElement.classList.remove('light');
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.setAttribute('data-o-theme', 'g.light');
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
}
