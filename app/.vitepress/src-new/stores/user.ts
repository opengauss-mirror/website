import { defineStore, storeToRefs } from 'pinia';
import { getUserAuth, LOGIN_STATUS, LoginStatusT } from '@/shared/login';
import { geAllCount } from '~@/api/api-notification';
import { onMounted, ref } from 'vue';

/**
 * 登录状态
 */
export const useLoginStore = defineStore('login', {
  state: () => {
    return {
      loginStatus: LOGIN_STATUS.NOT,
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
    };
  },
});

export const useCountStore = defineStore('count', () => {
  const todoCount = ref();
  const meetingCount = ref();
  const submitCount = ref();
  const customCount = ref();
  const updateTime = ref();
  const queryAllCount = () => {
    geAllCount().then((res) => {
      const { apply_count, meeting_count, todo_count, specific_count } = res.count;
      todoCount.value = todo_count;
      submitCount.value = apply_count;
      meetingCount.value = meeting_count;
      customCount.value = specific_count;
      updateTime.value = Date.now();
    }).catch(() => {
      todoCount.value = null;
      submitCount.value = null;
      meetingCount.value = null;
      customCount.value = null;
    });
  }

  onMounted(() => {
    const { csrfToken } = getUserAuth();
    if (csrfToken) {
      queryAllCount()
    }
  })

  return {
    todoCount,
    meetingCount,
    submitCount,
    customCount,
    queryAllCount,
    updateTime,
  }
})

/**
 * @callback store 将store返回，使用解构赋值接受
 */
export function useCountData() {
  const counter = useCountStore();
  return storeToRefs(counter);
}