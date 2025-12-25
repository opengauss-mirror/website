import { computed, nextTick, onMounted, ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { getPersonalCount, syncInfo } from '~@/api/api-notification';
import { NotificationCountT } from '~@/@types/type-notifications';
import { NOTIFICATION_SOURCE_MAP } from '~@/data/notifications';
import { useUserInfoStore } from '@/stores/user';

export const useCountStore = defineStore('notification-count',() => {
  const meeting = ref(0)
  const system = ref(0)
  const issue = ref(0)
  const pr = ref(0)
  const cve = ref(0)

  const TODO_MESSAGE = 'todo_message'

  const userInfoStore = useUserInfoStore();

  const { username, identities, phone } = storeToRefs(userInfoStore);

  const updateNoticeTotal = async () => {
    try {
      // 先找gitcode，再找gitee
      let userData = identities.value?.find((e) => e.provider === 'gitcode');
      if (userData === undefined) {
        userData = identities.value?.find((e) => e.provider === 'gitee');
      }
      await syncInfo({
        country_code: '+86',
        gitee_user_name: userData?.username,
        mail: userData?.email,
        phone: phone.value,
        user_name: username.value
      })
      const res = await getPersonalCount()
      meeting.value = res.count?.meeting_count || 0;
      issue.value = 0;
      cve.value = 0;
      pr.value = 0;
      res?.count?.specific_count?.forEach((item: NotificationCountT) => {
        if (item.message_type === TODO_MESSAGE) {
          if (item.type === NOTIFICATION_SOURCE_MAP.ISSUE) {
            if (item.source === NOTIFICATION_SOURCE_MAP.CVE) {
              cve.value = item.count;
            } else {
              issue.value = item.count;
            }
          }
          if (item.type === NOTIFICATION_SOURCE_MAP.PR) {
            pr.value = item.count;
          }
        }

      });
      if (!res?.count) {
        meeting.value = 0;
        system.value = 0;
      }
    } finally {
      // meeting.value = 0;
      system.value = 0;
    }
  }
  const todo = computed(() => issue.value + pr.value + cve.value)
  const notice = computed(() => system.value + meeting.value + todo.value)


  return {
    notice,
    todo,
    system,
    meeting,
    updateNoticeTotal,
    issue,
    pr,
    cve
  }
})