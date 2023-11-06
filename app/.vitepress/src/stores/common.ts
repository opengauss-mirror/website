import { defineStore } from 'pinia';

export const useCommon = defineStore('common', {
  state: () => ({
    theme: '',
    iconMenuShow: true,
  }),
});

export const useMeeting = defineStore('meeting', {
  state: () => ({
    userSigs: [],
    giteeId: '',
    userId: null,
  }),
});

// cookie
export const useCookieStatus = defineStore('cookieStatus', {
  state: () => ({
    status: '0',
  }),
});

export const usePrivacyVersion = defineStore('privacyVersion', {
  state: () => ({
    version: '20231103',
  }),
});
