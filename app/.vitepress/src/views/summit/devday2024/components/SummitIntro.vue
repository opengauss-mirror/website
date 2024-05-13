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
    <div class="title-img">
      <img :src="isLight ? introData.titleImg : introData.titleImgDark" alt="" />
    </div>
    <p class="title">{{ introData.title }}</p>
    <ul class="list">
      <li v-for="(item, i) in introData.desc" :key="i" class="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.title-img {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 312px;
  }
  @media (max-width: 767px) {
    height: 32px;
    img {
      width: 180px;
    }
  }
}
.title {
  font-size: 40px;
  color: var(--o-color-text1);
  line-height: 56px;
  font-weight: 500;
  text-align: center;
  margin-top: -36px;
  @media screen and (max-width: 1440px) {
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
  }
  @media (max-width: 767px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    margin-top: -18px;
  }
}
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
}
</style>
