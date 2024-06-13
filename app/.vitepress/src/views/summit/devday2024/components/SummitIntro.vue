<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

defineProps({
  introData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>
<template>
  <div class="summit-intro">
    <div class="title-box">
      <p class="title-bg">{{ introData.titleBg }}</p>
      <p class="title">{{ introData.title }}</p>
    </div>
    <ul class="list">
      <li v-for="(item, i) in introData.desc" :key="i" class="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.list {
  margin-top: var(--o-spacing-h2);
  .item {
    font-size: var(--o-font-size-h7);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h7);
    font-weight: 400;
    margin-top: var(--o-spacing-h4);
    @media (max-width: 767px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h6);
    }
  }
  @media (max-width: 767px) {
    margin-top: var(--o-spacing-h5);
  }
}
</style>
