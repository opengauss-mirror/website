<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

defineProps({
  nowData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const jumpPage = (href: string) => {
  window.open(href)
}
</script>
<template>
  <div class="summit-now">
    <div class="title-img">
      <img :src="isLight ? nowData.titleImg : nowData.titleImgDark" alt="" />
    </div>
    <p class="title">{{ nowData.title }}</p>
    <ul class="list">
      <li v-for="(item, i) in nowData.list" :key="i" class="item" @click="jumpPage(item.href)">
        <p class="item-title">{{ item.title }}</p>
        <a :href="item.href" target="_blank" rel="noopener noreferrer" class="link">
          {{ item.text }}
          <OIcon><IconArrowRight /></OIcon>
        </a>
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
  margin-top: 44px;
  img {
    width: 282px;
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
  display: flex;
  margin-top: var(--o-spacing-h2);
  .item {
    width: 50%;
    background: var(--o-color-bg2);
    padding: var(--o-spacing-h4);
    cursor: pointer;
    .item-title {
      font-size: 22px;
      color: var(--o-color-text1);
      line-height: 30px;
      font-weight: 500;
    }
    .link {
      display: inline-flex;
      align-items: center;
      margin-top: var(--o-spacing-h4);
      font-size: var(--o-font-size-text);
      color: var(--o-color-text1);
      line-height: var(--o-line-height-text);
      font-weight: 400;
      .o-icon {
        font-size: var(--o-font-size-h8);
        margin-left: var(--o-spacing-h8);
        color: var(--o-color-link1);
        transition: all 0.15s linear;
      }
    }
    &:last-of-type {
      margin-left: var(--o-spacing-h3);
    }
    &:hover {
      background-image: url(../img/now-hover.jpg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      .item-title {
        color: var(--o-color-white);
      }
      .link {
        color: var(--o-color-white);
        .o-icon {
          color: var(--o-color-white);
          transform: translateX(var(--o-spacing-h10));
        }
      }
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    margin-top: var(--o-spacing-h4);
    .item {
      width: 100%;
      padding: var(--o-spacing-h5);
      .item-title {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
      .link {
        margin-top: var(--o-spacing-h5);
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        .o-icon {
          font-size: var(--o-font-size-text);
        }
      }
      &:last-of-type {
        margin-left: 0;
        margin-top: var(--o-spacing-h6);
      }
    }
  }
}
</style>
