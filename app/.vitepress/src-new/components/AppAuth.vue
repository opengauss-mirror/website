<script setup lang="ts">
import { watch } from 'vue';
import { doLogin, LOGIN_STATUS } from '@/shared/login';
import { useLoginStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const loginStore = useLoginStore();

const { loginStatus, isLogined } = storeToRefs(loginStore);

watch(
  () => loginStatus.value,
  (val) => {
    if ([LOGIN_STATUS.NOT, LOGIN_STATUS.FAILED].includes(val)) {
      doLogin();
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div v-if="isLogined">
    <slot></slot>
  </div>
</template>
