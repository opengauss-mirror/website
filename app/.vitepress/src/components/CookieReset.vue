<script setup lang="ts">
import { useCookieStore } from '@/stores/common';
import { useI18n } from '@/i18n';

const i18n = useI18n();
const cookieStore = useCookieStore();

const onClick = () => {
  cookieStore.isNoticeVisible = !cookieStore.isNoticeVisible;
};
</script>

<template>
  <span class="reset-cookie" @click="onClick">{{ i18n.cookie.setting }} </span>
</template>

<style lang="scss" scoped>
.reset-cookie {
  cursor: pointer;
  color: var(--o-color-link1);
  &:hover {
    color: var(--o-color-link2);
  }
  &:active {
    color: var(--o-color-link3);
  }
}
</style>
