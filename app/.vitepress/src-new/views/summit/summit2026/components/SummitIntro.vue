<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';
import floorImg from '../img/floor-img.png';

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
    <h2 class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ introData.titleBg }}</p>
      <p class="title">{{ introData.title }}</p>
      <img class="floor-img" :src="floorImg" alt="" />
    </h2>
    <ul class="list">
      <li v-for="(item, i) in introData.desc" :key="i" class="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.list {
  margin-top: var(--o-r-gap-7);
  font-size: var(--o-r-font_size-text2);
  line-height: var(--o-r-line_height-text2);
  .item {
    margin-top: var(--e-spacing-h4);
    @media (max-width: 767px) {
      margin-top: var(--e-spacing-h6);
    }
  }
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h5);
  }
}
</style>
