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
import { ATOMGIT_LINK, GITHUB_LINK } from '~@/data/url-config';

import IconOutLink from '~icons/app-new/icon-out-link.svg';

const OutLink = markRaw(IconOutLink);

export default {
  MORE: 'More',
  QUICKLINK: 'Quick Links',
  CODE: 'Code',
  SEARCH: {
    BROWSEHISTORY: 'History',
    CLEAN: 'Clean up',
    TOPSEARCH: 'Top search',
    CHANGE: 'Change',
    PLACEHOLDER: 'Please enter the content',
    PLACEHOLDER_EXTEND: 'Please enter the content',
    TEXT: 'Search',
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
