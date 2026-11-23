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

import { defineStore } from 'pinia';

export const useCommon = defineStore('common', {
  state: () => ({
    theme: '',
    iconMenuShow: true,
  }),
});

export const useMeeting = defineStore('meeting', {
  state: () => ({
    username: '',
    userSigs: [],
    platformOptions: [],
  }),
});

export const COOKIE_AGREED_STATUS = {
  NOT_SIGNED: '0', // 未签署
  ALL_AGREED: '1', // 同意所有cookie
  NECCESSARY_AGREED: '2', // 仅同意必要cookie
  NOT_SHOW_BUT_AGREED: '3', // 不再显示但已同意
};

export const COOKIE_KEY_ZH = 'agreed-cookiepolicy-zh';
export const COOKIE_KEY_EN = 'agreed-cookiepolicy-en';
export const COOKIE_KEY = 'agreed-cookiepolicy';

// cookie状态
export const useCookieStore = defineStore('cookie', {
  state: () => ({
    status: '0',
    isNoticeVisible: false,
  }),
});

// 新手指导弹窗状态
export const useGuideStore = defineStore('guide', {
  state: () => ({
    isOpen: false,
  }),
});
