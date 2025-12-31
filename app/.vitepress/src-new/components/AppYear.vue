<script setup lang="ts">
import { ref } from 'vue';

import gaussYear from '~@/assets/category/year/gauss-PC-zh.png';
import gaussYearMb from '~@/assets/category/year/gauss-MB-zh.png';
import gaussYearEN from '~@/assets/category/year/gauss-PC-en.png';
import gaussYearMbEN from '~@/assets/category/year/gauss-MB-en.png';
import { YEAR_2025 } from '@/data/url-config';

import useWindowResize from '@/components/hooks/useWindowResize';
import { inBrowser, useData } from 'vitepress';

const screenWidth = useWindowResize();
const CLOSED_FLAG = 'summary_close';

const isShow = ref(inBrowser ? sessionStorage.getItem(CLOSED_FLAG) !== '1' : true);
function closeYear() {
  isShow.value = false;
  sessionStorage.setItem(CLOSED_FLAG, '1');
}

const { lang } = useData();
</script>
<template>
  <Teleport to="body">
    <div v-show="isShow" class="gauss-year">
      <div class="close-year" @click="closeYear"></div>
      <a class="year-link" :href="`${YEAR_2025}/${lang ?? 'zh'}`" rel="noopener noreferrer" target="_blank"></a>
      <img :src="screenWidth > 840 ? (lang === 'en' ? gaussYearEN : gaussYear) : (lang === 'en' ? gaussYearMbEN : gaussYearMb)" alt="" />
    </div>
  </Teleport>
</template>
<style lang="scss" scoped>
.gauss-year {
  position: fixed;
  left: 64px;
  bottom: 160px;
  z-index: 12;
  @include respond-to('laptop') {
    bottom: 120px;
  }
  @media (max-width: 1200px) {
    left: 16px;
  }
  @include respond-to('phone') {
    left: 12px;
  }

  .year-link {
    position: absolute;
    width: 100%;
    height: calc(100% - 20px);
    bottom: 0;
    @media screen and (max-width: 1200px) {
      height: calc(100% - 16px);
    }
  }
  .close-year {
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    @media screen and (max-width: 1200px) {
      width: 16px;
      height: 16px;
      right: 0px;
    }
  }
  img {
    width: 125px;
    @include respond-to('pad-laptop') {
      width: 94px;
    }
    @include respond-to('<=pad_v') {
      width: 83px;
    }
  }
}
</style>
