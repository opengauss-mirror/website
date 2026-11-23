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

import zh from './zh';
import en from './en';
import IconOutLink from '~icons/app-new/icon-out-link.svg';
import { markRaw } from 'vue';
import { ATOMGIT_LINK, GITHUB_LINK } from '../url-config';

const outLink = markRaw(IconOutLink);

export default {
  nav: { zh, en },
  sourceCode: [
    {
      href: `${ATOMGIT_LINK}/opengauss`,
      icon: outLink,
      label: 'AtomGit',
    },
    {
      href: `${GITHUB_LINK}/opengauss-mirror`,
      icon: outLink,
      label: 'GitHub',
    },
  ],
  langOptions: [
    { id: 'zh', label: '简体中文', simple: '中' },
    { id: 'en', label: 'English', simple: 'EN' },
  ],
  userOptions: {
    zh: [
      {
        id: 'center',
        label: '个人中心',
        target: '_blank',
        url: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/my/settings`
      },
      {
        id: 'message',
        label: '消息中心',
        target: '_self',
        url: '/zh/notifications/'
      },
      {
        id: 'logout',
        label: '退出登录',
        logout: true,
        target: '',
        url: ''
      },
    ],
    en: [
      {
        id: 'center',
        label: 'User Center',
        target: '_blank',
        url: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/my/settings`
      },
      {
        id: 'message',
        label: 'Notifications',
        target: '_self',
        url: '/en/notifications/'
      },
      {
        id: 'logout',
        label: 'Logout',
        logout: true,
        target: '',
        url: ''
      },
    ]
  }
};
