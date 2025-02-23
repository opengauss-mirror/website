import { getCustomCookie } from '@/shared/utils';
import { defineStore } from 'pinia';

export const useCommon = defineStore('common', {
  state: () => ({
    theme: '',
    iconMenuShow: true,
  }),
});

export const useMeeting = defineStore('meeting', {
  state: () => ({
    giteeId: '',
    userSigs: [],
    platformOptions: [],
  }),
});

export const COOKIE_AGREED_STATUS = {
  NOT_SIGNED: '0', // 未签署
  ALL_AGREED: '1', // 同意所有cookie
  NECCESSARY_AGREED: '2', // 仅同意必要cookie
};

export const COOKIE_KEY = 'agreed-cookiepolicy';

// cookie状态
export const useCookieStore = defineStore('cookie', {
  state: () => ({
    status: '0',
    version: '20250223',
    isNoticeVisible: false,
  }),
  getters: {
    isAllAgreed: (state) => state.status === '1',
  },
  actions: {
    getUserCookieStatus() {
      const cookieVal = getCustomCookie(COOKIE_KEY) ?? '0';

      const cookieStatusVal = cookieVal[0];
      const cookieVersionVal = cookieVal.slice(1);

      if (cookieVersionVal !== this.version) {
        this.status = COOKIE_AGREED_STATUS.NOT_SIGNED;
        return COOKIE_AGREED_STATUS.NOT_SIGNED;
      }
      if (cookieStatusVal === COOKIE_AGREED_STATUS.ALL_AGREED) {
        this.status = COOKIE_AGREED_STATUS.ALL_AGREED;
        return COOKIE_AGREED_STATUS.ALL_AGREED;
      } else if (cookieStatusVal === COOKIE_AGREED_STATUS.NECCESSARY_AGREED) {
        this.status = COOKIE_AGREED_STATUS.NECCESSARY_AGREED;
        return COOKIE_AGREED_STATUS.NECCESSARY_AGREED;
      } else {
        this.status = COOKIE_AGREED_STATUS.NOT_SIGNED;
        return COOKIE_AGREED_STATUS.NOT_SIGNED;
      }
    },
  },
});
