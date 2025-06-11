<script lang="ts" setup>
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import floorImg from '../img/floor-img.png';

defineProps({
  reviewData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>

<template>
  <div class="summit-review">
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ reviewData.titleBg }}</p>
      <p class="title">{{ reviewData.title }}</p>
      <img class="floor-img" :src="floorImg" alt="" />
    </div>
    <div class="link-box">
      <p v-for="item in reviewData.list" :key="item.link">
        <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summit-review {
  margin-top: 72px;
  @media (max-width: 767px) {
    margin-top: var(--o-spacing-h2);
  }
}
.link-box {
  margin-top: var(--o-spacing-h2);
  width: 100%;
  text-align: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: var(--o-spacing-h6);
  }
  p {
    font-weight: 500;
    & ~ p {
      margin-top: var(--o-spacing-h6);
    }
    a {
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      & + a {
        margin-top: var(--o-spacing-h6);
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h8);
        }
      }
    }
  }
}
</style>
