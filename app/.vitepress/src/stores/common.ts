import { defineStore } from 'pinia';

export const useCommon = defineStore('common', {
  state: () => ({
    theme: '',
    iconMenuShow: true,
  }),
});

export const useMeeting = defineStore('meeting', {
  state: () => ({
    userSigs: [''],
    giteeId: '',
    userId: '',
    meetingToken: '',
  }),
});

// cookie状态
export const useCookieStore = defineStore('cookie', {
  state: () => ({
    status: '0',
    version: '20241205',
    isNoticeVisible: false,
  }),
  getters: {
    isAllAgreed: (state) => state.status === '1',
  },
});
