import { setCustomCookie } from '@/shared/utils';
import { defineStore } from 'pinia';

const APPEARANCE_KEY = 'openGauss-theme-appearance';

export const useCommon = defineStore('common', {
  state: () => ({
    theme: '' as 'light' | 'dark',
    iconMenuShow: true,
  }),
  getters: {
    isDark: (state) => state.theme === 'dark',
  },
  actions: {
    setTheme(theme: 'light' | 'dark') {
      if (this.theme !== theme) {
        this.theme = theme;
      }
      this.sync();
    },
    sync() {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-o-theme', `g.${this.theme}`);
        if (this.theme === 'dark') {
          document.documentElement.classList.remove('light');
        } else if (this.theme === 'light') {
          document.documentElement.classList.remove('dark');
        }
        document.documentElement.classList.add(this.theme);

        setCustomCookie(APPEARANCE_KEY, this.theme, 180, 'localhost'/* import.meta.env.VITE_COOKIE_DOMAIN */);
      }
    }
  }
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
};

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
