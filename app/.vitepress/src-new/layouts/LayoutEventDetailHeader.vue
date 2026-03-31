<script setup lang="ts">
import { OIcon, OIconArrowLeft } from '@opensig/opendesign';
import { useRouter } from 'vitepress';
import { useLocale } from '~@/composables/useLocale';

const router = useRouter();
const { locale } = useLocale();
const back = () => {
  router.go(`/${locale.value}/events/list/`);
};
</script>

<template>
  <OIcon style="font-size: 24px" @click="back"><OIconArrowLeft /></OIcon>
  <p style="margin-left: 16px">活动列表</p>
</template>
