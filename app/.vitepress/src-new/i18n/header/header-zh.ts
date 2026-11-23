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

import { markRaw } from 'vue';

import IconOutLink from '~icons/app-new/icon-out-link.svg';
import { ATOMGIT_LINK, GITHUB_LINK } from '~@/data/url-config';

const OutLink = markRaw(IconOutLink);

export default {
  MORE: '更多',
  QUICKLINK: '快捷链接',
  CODE: '源码',
  SEARCH: {
    BROWSEHISTORY: '历史记录',
    CLEAN: '清除',
    TOPSEARCH: '热门搜索',
    CHANGE: '换一批',
    PLACEHOLDER: '搜索',
    PLACEHOLDER_EXTEND: '请输入搜索内容',
    TEXT: '搜索',
  },
  SOURCE_CODE: [
    {
      NAME: 'AtomGit',
      PATH: `${ATOMGIT_LINK}/opengauss`,
      ICON: OutLink,
    },

    {
      NAME: 'Github',
      PATH: `${GITHUB_LINK}/opengauss-mirror`,
      ICON: OutLink,
    },
  ],
};
