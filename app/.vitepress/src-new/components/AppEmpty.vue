<script setup lang="ts">
import { OResult } from '@opensig/opendesign';
import { computed } from 'vue';

import emptyImage from '~@/assets/category/common/404.png';
import emptyImageDark from '~@/assets/category/common/404-dark.png';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');
</script>

<template>
  <OResult  class="app-empty">
    <template #image>
      <slot name="image">
        <img alt="empty" :src="isDark ? emptyImageDark : emptyImage" />
      </slot>
    </template>
    <template #description>
      <slot></slot>
    </template>
  </OResult>
</template>

<style scoped lang="scss">
.app-empty {
  width: 100%;
  height: calc(100% - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  --result-image-width: 312px;
  --result-image-height: 200px;
  --result-image-gap: 8px;
}
</style>
