import { nextTick, ref } from 'vue';
import { defineStore } from 'pinia';
import { geAllCount } from '~@/api/api-notification';
import { NotificationCountT } from '~@/@types/type-notifications';

export const useNoticeData = defineStore('notice-data',() => {
  const noticeTotal= ref(0)
  const systemTotal= ref(0)
  const meetingTotal= ref(0)
  const feedbackTotal= ref(0)
  const loopholeTotal= ref(0)

  const updateNoticeTotal = () => {
    nextTick(() => {
      geAllCount().then(res => {
        res?.count?.forEach((item: NotificationCountT) => {
          if (item.source === 'openUBMC-meeting') {
            meetingTotal.value = item.count;
          }
          if (item.source === 'openUBMC-publish') {
            systemTotal.value = item.count;
          }
        });
        if (!res?.count) {
          meetingTotal.value = 0;
          systemTotal.value = 0;
        }
        noticeTotal.value = meetingTotal.value + systemTotal.value;
      });
    })
  }
  return {
    noticeTotal,
    systemTotal,
    meetingTotal,
    feedbackTotal,
    loopholeTotal,
    updateNoticeTotal,
  }
})