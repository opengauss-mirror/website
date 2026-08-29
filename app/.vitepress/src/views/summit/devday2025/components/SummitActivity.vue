<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import floorImg from '../img/floor-img.png';
import cardBg from '../img/card-bg.png';
import { windowOpen } from '@/shared/utils';

defineProps({
  activeData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const onButtonClick = (href: string) => {
  windowOpen(href, '_blank');
};
</script>
<template>
  <div class="summit-active">
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ activeData.titleBg }}</p>
      <p class="title">{{ activeData.title }}</p>
      <img class="floor-img" :src="floorImg" alt="" />
    </div>
    <ul class="list">
      <li v-for="item in activeData.list" :key="item.title" class="item" :style="{ backgroundImage: `url(${item.img}),url(${cardBg})` }">
        <p class="card-title">{{ item.title }}</p>
        <p class="card-desc">{{ item.desc }}</p>
        <img class="card-img" :src="item.img" alt="" />
        <OButton type="outline" size="small" animation class="card-btn" @click="onButtonClick(item.href)">
          {{ item.text }}
        </OButton>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.summit-active {
  margin-top: 72px;
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h3);
  }
}

.list {
  margin-top: var(--e-spacing-h2);
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
  }
}
.item {
  width: calc(50% - 18px);
  border-radius: 4px;
  padding: 32px;
  background-size:
    auto 200px,
    auto 226px;
  background-position:
    right 28px top 32px,
    right top;
  background-repeat: no-repeat, no-repeat;
  background-color: var(--e-color-bg2);

  &:last-of-type {
    margin-left: 36px;
    @media (max-width: 1200px) {
      margin-left: 24px;
    }
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }

  @media (max-width: 1440px) {
    background-size:
      auto 160px,
      auto 182px;
    background-position:
      right 16px top 24px,
      right top;
  }

  @media (max-width: 1200px) {
    width: calc(50% - 12px);
  }

  @media (max-width: 1000px) {
    background-size:
      auto 120px,
      auto 152px;
    background-position:
      right bottom,
      right bottom;
  }

  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h5);
    width: 100%;
    background-size:
      0,
      auto 104px;
  }
}
.card-title {
  font-size: var(--o-font-size-h5);
  color: var(--e-color-text1);
  line-height: var(--o-line-height-h5);
  font-weight: 500;
  width: 427px;
  height: 64px;
  @media (max-width: 1440px) {
    width: 340px;
    height: 56px;
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h6);
  }
  @media (max-width: 1200px) {
    width: 272px;
  }
  @media (max-width: 767px) {
    width: 100%;
    height: auto;
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
  }
}
.card-desc {
  font-size: var(--o-font-size-h8);
  color: var(--e-color-text1);
  line-height: var(--o-line-height-h8);
  font-weight: 400;
  margin-top: var(--e-spacing-h5);
  width: 427px;
  opacity: 0.8;
  @media (max-width: 1440px) {
    width: 340px;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
  @media (max-width: 1200px) {
    width: 272px;
    height: 66px;
  }
  @media (max-width: 767px) {
    width: 100%;
    height: auto;
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    margin-top: var(--e-spacing-h6);
  }
}
.card-img {
  display: none;
  @media (max-width: 767px) {
    display: block;
    width: 150px;
    margin-top: var(--e-spacing-h5);
  }
}
.card-btn {
  --o-button-padding-small: 8px 27px;
  margin-top: var(--e-spacing-h5);
  border-radius: 41px;
}
</style>
