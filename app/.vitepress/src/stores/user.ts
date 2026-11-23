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
import { LOGIN_STATUS } from '@/shared/login';
import type { LoginStatusT } from '@/shared/login';

/**
 * 登录状态
 */
export const useLoginStore = defineStore('login2', {
  state: () => {
    return {
      loginStatus: LOGIN_STATUS.DOING,
    };
  },
  actions: {
    setLoginStatus(status: LoginStatusT) {
      this.loginStatus = status;
    },
  },
  getters: {
    // 登录失败
    isLoginFailed(): boolean {
      return this.loginStatus === LOGIN_STATUS.NOT;
    },
    // 未登录
    isLoginNot(): boolean {
      return this.loginStatus === LOGIN_STATUS.NOT;
    },
    // 登录中
    isLoggingIn(): boolean {
      return this.loginStatus === LOGIN_STATUS.DOING;
    },
    // 登录成功
    isLogined(): boolean {
      return this.loginStatus === LOGIN_STATUS.DONE;
    },
  },
});

/**
 * 用户基本信息
 */
export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      photo: '', // 头像
      username: '', // 昵称
      identities: [] as { identity: string; user_name: string; login_name: string; }[], // 授权账号
      phone: '',
      email: '',
    };
  },
});
