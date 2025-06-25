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
  window.open(href);
};
</script>
<template>
  <div class="summit-now">
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ nowData.titleBg }}</p>
      <p class="title">{{ nowData.title }}</p>
    </div>
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
.summit-now {
  margin-bottom: 44px;
  @media (max-width: 767px) {
    margin-bottom: 31px;
  }
}
.list {
  display: flex;
  margin-top: var(--e-spacing-h2);
  .item {
    width: 50%;
    background: var(--e-color-bg2);
    padding: var(--e-spacing-h4);
    cursor: pointer;
    .item-title {
      font-size: 22px;
      color: var(--e-color-text1);
      line-height: 30px;
      font-weight: 500;
    }
    .link {
      display: inline-flex;
      align-items: center;
      margin-top: var(--e-spacing-h4);
      font-size: var(--e-font-size-text);
      color: var(--e-color-text1);
      line-height: var(--e-line-height-text);
      font-weight: 400;
      .o-icon {
        font-size: var(--e-font-size-h8);
        margin-left: var(--e-spacing-h8);
        color: var(--e-color-link1);
        transition: all 0.15s linear;
      }
    }
    &:last-of-type {
      margin-left: var(--e-spacing-h3);
    }
    &:hover {
      background-image: url(../img/now-hover.jpg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      .item-title {
        color: var(--e-color-white);
      }
      .link {
        color: var(--e-color-white);
        .o-icon {
          color: var(--e-color-white);
          transform: translateX(var(--e-spacing-h10));
        }
      }
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    margin-top: var(--e-spacing-h5);
    .item {
      width: 100%;
      padding: var(--e-spacing-h6);
      .item-title {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
      .link {
        margin-top: var(--e-spacing-h8);
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        .o-icon {
          font-size: var(--e-font-size-text);
        }
      }
      &:last-of-type {
        margin-left: 0;
        margin-top: var(--e-spacing-h6);
      }
    }
  }
}
</style>
