<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import floorImg from '../img/floor-img.png';

defineProps({
  topicData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const onButtonClick = (href: string) => {
  window.open(href, '_blank');
};
</script>
<template>
  <div class="summit-topic">
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ topicData.titleBg }}</p>
      <p class="title">{{ topicData.title }}</p>
      <img class="floor-img" :src="floorImg" alt="" />
    </div>
    <ul class="list">
      <li v-for="item in topicData.cardList" :key="item.title" class="card" :class="{ 'card-dark': !isLight }">
        <div class="card-bg-img" :style="{ backgroundImage: `url(${topicData.cardBg})` }">
          <p class="card-title">{{ item.title }}</p>
          <p class="card-desc">{{ item.desc }}</p>
          <OButton type="outline" size="small" animation class="card-btn" @click="onButtonClick(item.href)">
            {{ item.text }}
          </OButton>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.summit-topic {
  margin-top: 72px;
  @media (max-width: 767px) {
    margin-top: var(--o-spacing-h2);
  }
}

.list {
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
  }
}
.card {
  width: calc(50% - 18px);
  background-image: linear-gradient(0deg, #fdfaff 0%, #f0e7ff 100%);
  margin-top: var(--o-spacing-h2);

  &:last-of-type {
    margin-left: 36px;
    @media (max-width: 1200px) {
      margin-left: 24px;
    }
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }

  .card-bg-img {
    padding: 32px;
    background-size: auto 100%;
    background-position: right bottom;
    background-repeat: no-repeat;
    @media (max-width: 1200px) {
      background-size: auto 104px;
      padding: 24px;
    }
    @media (max-width: 767px) {
      padding: 16px;
    }
  }
  .card-title {
    font-size: var(--o-font-size-h5);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h5);
    font-weight: 500;

    @media (max-width: 1440px) {
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
    }

    @media (max-width: 767px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .card-desc {
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h8);
    font-weight: 400;
    margin-top: var(--o-spacing-h5);

    @media (max-width: 1440px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }

    @media (max-width: 1080px) {
      height: 66px;
    }

    @media (max-width: 767px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h6);
      height: auto;
    }
  }
  .card-btn {
    --o-button-padding-small: 8px 27px;
    margin-top: var(--o-spacing-h5);
    border-radius: 41px;
  }

  @media (max-width: 1200px) {
    width: calc(50% - 12px);
  }

  @media (max-width: 767px) {
    margin-top: var(--o-spacing-h5);
    width: 100%;
  }
}

.card-dark {
  background-image: linear-gradient(0deg, rgba(16, 0, 47, 1) 0%, rgba(36, 5, 74, 1) 100%);
}
</style>
