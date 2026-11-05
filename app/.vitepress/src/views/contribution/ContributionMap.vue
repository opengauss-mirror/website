<script lang="ts" setup>
import { computed } from 'vue';
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

import contributionMap_light_zh from '@/assets/category/contribution/contribution-map_light_zh.png';
import contributionMap_light_en from '@/assets/category/contribution/contribution-map_light_en.png';
import contributionMap_dark_zh from '@/assets/category/contribution/contribution-map_dark_zh.png';
import contributionMap_dark_en from '@/assets/category/contribution/contribution-map_dark_en.png';
import contributionMap_light_zh_mb from '@/assets/category/contribution/contribution-map_light_zh_mobile.png';
import contributionMap_light_en_mb from '@/assets/category/contribution/contribution-map_light_en_mobile.png';
import contributionMap_dark_zh_mb from '@/assets/category/contribution/contribution-map_dark_zh_mobile.png';
import contributionMap_dark_en_mb from '@/assets/category/contribution/contribution-map_dark_en_mobile.png';
import { useScreen } from '@opensig/opendesign';

const i18n = useI18n();
const { lang } = useData();
const commonStore = useCommon();

const { gtPhone } = useScreen();

const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
const isZh = computed(() => (lang.value === 'zh' ? true : false));
</script>
<template>
  <div class="contribution-map">
    <div class="contribution-map-img-wrapper" v-if="gtPhone">
      <img v-show="!isDark" :src="isZh ? contributionMap_light_zh : contributionMap_light_en" alt="contribution map" />
      <img v-show="isDark" :src="isZh ? contributionMap_dark_zh : contributionMap_dark_en" alt="contribution map" />
      <!-- 定位的空标签 -->
      <a
        v-for="(item, index) in i18n.contribution.LINK_LIST"
        :key="index"
        :class="isZh ? 'link' : 'link en'"
        :title="item.ALT"
        :href="item.URL"
        :target="item.BLANK ? '_blank' : undefined"
        :rel="item.BLANK ? 'noopener noreferrer' : undefined"
      ></a>
    </div>
    <div v-else class="contribution-map-mobile-img-wrapper">
      <img v-show="!isDark" :src="isZh ? contributionMap_light_zh_mb : contributionMap_light_en_mb" alt="contribution map" />
      <img v-show="isDark" :src="isZh ? contributionMap_dark_zh_mb : contributionMap_dark_en_mb" alt="contribution map" />
      <a
        v-for="item in i18n.contribution.LINK_LIST"
        :key="item.URL"
        :class="isZh ? 'mobile-link' : 'mobile-link en'"
        :title="item.ALT"
        :href="item.URL"
        :target="item.BLANK ? '_blank' : undefined"
        :rel="item.BLANK ? 'noopener noreferrer' : undefined"
      ></a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// 链接定位全部使用百分比，相对容器（即图片渲染尺寸）等比缩放，
// 因此在 1416 / 1000 / 755 三种桌面宽度及任意移动端宽度下都与图片对齐，无需按断点单独调整。
// clip-path 用于链接文字跨行折行的场景，只保留两段文字区域可点击。
.contribution-map {
  width: var(--o-r-grid-section-width);
  margin: var(--o-r-gap-7) auto;
  padding: var(--o-r-gap-6);
  background-color: var(--o-color-fill2);
  img {
    width: 100%;
    height: auto;
  }
  .contribution-map-img-wrapper {
    width: 100%;
    position: relative;
  }
  .link {
    position: absolute;
    display: block;
    cursor: pointer;
    text-decoration: none;
    &:nth-of-type(1) {
      left: 10.4%;
      top: 14.62%;
      width: 11.47%;
      height: 1.35%;
      &.en {
        left: 14.42%;
        top: 16.55%;
        width: 18.63%;
        height: 1.16%;
      }
    }
    &:nth-of-type(2) {
      left: 10.97%;
      top: 27.42%;
      width: 25.76%;
      height: 2.82%;
      &.en {
        left: 15.83%;
        top: 30.81%;
        width: 14.5%;
        height: 1.16%;
      }
    }
    &:nth-of-type(3) {
      left: 14.32%;
      top: 30.55%;
      width: 19.39%;
      height: 1.25%;
      &.en {
        left: 17.88%;
        top: 32.27%;
        width: 19.39%;
        height: 1.16%;
      }
    }
    &:nth-of-type(4) {
      left: 21.15%;
      top: 32.12%;
      width: 14.96%;
      height: 1.25%;
      &.en {
        left: 15.47%;
        top: 35.17%;
        width: 14.5%;
        height: 1.16%;
      }
    }
    &:nth-of-type(5) {
      left: 10.36%;
      top: 46.99%;
      width: 26.73%;
      height: 2.25%;
      &.en {
        left: 10.36%;
        top: 47.49%;
        width: 26.73%;
        height: 2.08%;
      }
    }
    &:nth-of-type(6) {
      left: 13.35%;
      top: 52.76%;
      width: 3.88%;
      height: 4.35%;
      &.en {
        left: 11.3%;
        top: 54.29%;
        width: 6.47%;
        height: 3.9%;
      }
    }
    &:nth-of-type(7) {
      left: 21.98%;
      top: 52.76%;
      width: 3.88%;
      height: 4.35%;
      &.en {
        left: 20.04%;
        top: 54.29%;
        width: 7.84%;
        height: 3.9%;
      }
    }
    &:nth-of-type(8) {
      left: 30.65%;
      top: 52.76%;
      width: 3.85%;
      height: 4.35%;
      &.en {
        left: 30.32%;
        top: 54.29%;
        width: 6.44%;
        height: 3.93%;
      }
    }
    &:nth-of-type(9) {
      left: 7.19%;
      top: 90.12%;
      width: 4.68%;
      height: 7.17%;
      &.en {
        left: 7.19%;
        top: 91.91%;
        width: 4.68%;
        height: 6.34%;
      }
    }
    &:nth-of-type(10) {
      left: 16.55%;
      top: 90.52%;
      width: 7.37%;
      height: 6.77%;
      &.en {
        left: 16.91%;
        top: 92.3%;
        width: 9.35%;
        height: 5.94%;
      }
    }
    &:nth-of-type(11) {
      left: 61.76%;
      top: 20.57%;
      width: 26.87%;
      height: 2.64%;
      clip-path: polygon(81.5% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 81.5% 50%);
      &.en {
        left: 61.76%;
        top: 22.09%;
        width: 17.55%;
        height: 1.16%;
        clip-path: none;
      }
    }
    &:nth-of-type(12) {
      left: 66.69%;
      top: 45.35%;
      width: 4%;
      height: 1.18%;
      &.en {
        left: 62.01%;
        top: 42.31%;
        width: 3.81%;
        height: 1.16%;
      }
    }
    &:nth-of-type(13) {
      left: 54.06%;
      top: 58.25%;
      width: 7.19%;
      height: 1.35%;
      &.en {
        left: 67.16%;
        top: 57.11%;
        width: 5.18%;
        height: 1.16%;
      }
    }
    &:nth-of-type(14) {
      left: 69.99%;
      top: 59.82%;
      width: 5.97%;
      height: 1.18%;
      &.en {
        left: 75.9%;
        top: 60.01%;
        width: 8.45%;
        height: 1.16%;
      }
    }
    &:nth-of-type(15) {
      left: 65.43%;
      top: 75.79%;
      width: 8.92%;
      height: 1.18%;
      &.en {
        left: 70.07%;
        top: 80.61%;
        width: 15.68%;
        height: 1.16%;
      }
    }
  }

  // 窄屏
  .contribution-map-mobile-img-wrapper {
    width: 100%;
    position: relative;
    /* img {
      width: 100%;
      height: auto;
    } */
  }
  .mobile-link {
    position: absolute;
    display: block;
    cursor: pointer;
    text-decoration: none;
    &:nth-of-type(1) {
      left: 52.36%;
      top: 6.92%;
      width: 37.92%;
      height: 0.82%;
      &.en {
        left: 22.36%;
        top: 7.51%;
        width: 66.81%;
        height: 1.17%;
        clip-path: polygon(47.8% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 47.8% 50%);
      }
    }
    &:nth-of-type(2) {
      left: 24.58%;
      top: 12.92%;
      width: 64.72%;
      height: 1.61%;
      clip-path: polygon(83.3% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 83.3% 50%);
      &.en {
        left: 24.58%;
        top: 13.51%;
        width: 66.67%;
        height: 1.26%;
        clip-path: polygon(52.9% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 52.9% 50%);
      }
    }
    &:nth-of-type(3) {
      left: 24.58%;
      top: 14.65%;
      width: 66.94%;
      height: 1.61%;
      clip-path: polygon(16.4% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 16.4% 50%);
      &.en {
        left: 24.58%;
        top: 14.87%;
        width: 62.08%;
        height: 1.26%;
        clip-path: polygon(38% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 38% 50%);
      }
    }
    &:nth-of-type(4) {
      left: 24.58%;
      top: 15.52%;
      width: 62.08%;
      height: 1.61%;
      clip-path: polygon(84.8% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 84.8% 50%);
      &.en {
        left: 24.72%;
        top: 16.91%;
        width: 47.92%;
        height: 0.85%;
        clip-path: none;
      }
    }
    &:nth-of-type(5) {
      left: 22.22%;
      top: 23.23%;
      width: 71%;
      height: 1.33%;
      &.en {
        left: 22.22%;
        top: 22.94%;
        width: 71%;
        height: 1.04%;
      }
    }
    &:nth-of-type(6) {
      left: 25.69%;
      top: 26.02%;
      width: 12.78%;
      height: 2.6%;
      &.en {
        left: 26.11%;
        top: 25.81%;
        width: 13.06%;
        height: 2.68%;
      }
    }
    &:nth-of-type(7) {
      left: 50.14%;
      top: 26.17%;
      width: 12.78%;
      height: 2.43%;
      &.en {
        left: 48.47%;
        top: 25.93%;
        width: 12.36%;
        height: 2.56%;
      }
    }
    &:nth-of-type(8) {
      left: 74.58%;
      top: 26.17%;
      width: 12.78%;
      height: 2.46%;
      &.en {
        left: 75.69%;
        top: 25.93%;
        width: 14.72%;
        height: 2.56%;
      }
    }
    &:nth-of-type(9) {
      left: 29.17%;
      top: 44.24%;
      width: 20.83%;
      height: 3.71%;
      &.en {
        left: 32.64%;
        top: 43.47%;
        width: 20.83%;
        height: 2.91%;
      }
    }
    &:nth-of-type(10) {
      left: 63.89%;
      top: 44.36%;
      width: 26.39%;
      height: 3.59%;
      &.en {
        left: 63.89%;
        top: 43.64%;
        width: 26.39%;
        height: 2.74%;
      }
    }
    &:nth-of-type(11) {
      left: 25.69%;
      top: 92.51%;
      width: 37.92%;
      height: 0.82%;
      &.en {
        left: 22.36%;
        top: 94.23%;
        width: 58.06%;
        height: 0.85%;
      }
    }
    &:nth-of-type(12) {
      left: 65.28%;
      top: 57.88%;
      width: 13.33%;
      height: 0.7%;
      &.en {
        left: 48.33%;
        top: 54.3%;
        width: 12.64%;
        height: 0.75%;
      }
    }
    &:nth-of-type(13) {
      left: 46.25%;
      top: 67.88%;
      width: 23.89%;
      height: 0.82%;
      &.en {
        left: 75.14%;
        top: 65.13%;
        width: 17.08%;
        height: 0.85%;
      }
    }
    &:nth-of-type(14) {
      left: 22.36%;
      top: 69.64%;
      width: 70.56%;
      height: 1.54%;
      clip-path: polygon(76.6% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 76.6% 50%);
      &.en {
        left: 55.28%;
        top: 67.85%;
        width: 27.92%;
        height: 0.75%;
        clip-path: none;
      }
    }
    &:nth-of-type(15) {
      left: 32.36%;
      top: 83.11%;
      width: 29.58%;
      height: 0.72%;
      &.en {
        left: 22.5%;
        top: 82.11%;
        width: 69.58%;
        height: 1.17%;
        clip-path: polygon(40.9% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 40.9% 50%);
      }
    }
  }

  @include respond('phone') {
    padding: 0;
  }
}
</style>
