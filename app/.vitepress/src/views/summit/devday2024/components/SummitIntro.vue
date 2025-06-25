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
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
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
  margin-top: var(--e-spacing-h2);
  margin-bottom: 44px;
  .item {
    font-size: var(--e-font-size-h7);
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h7);
    font-weight: 400;
    margin-top: var(--e-spacing-h4);
    @media (max-width: 767px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-top: var(--e-spacing-h6);
    }
  }
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h5);
    margin-bottom: 31px;
  }
}
</style>
