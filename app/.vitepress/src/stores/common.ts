import { defineStore } from 'pinia';

export const useCommon = defineStore('common', {
  state: () => ({
    theme: '',
    iconMenuShow: true,
  }),
});
// ['Infra']
export const useMeeting = defineStore('meeting', {
  state: () => ({
    userSigs: ['Infra'],
    giteeId: 'ailoooong',
    userId: 1,
  }),
});
