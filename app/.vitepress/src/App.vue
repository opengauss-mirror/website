<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

import { useData, useRoute, useRouter } from 'vitepress';
import type { Component } from 'vue';
import { computed, watch, ref, onMounted } from 'vue';
import { useCommon } from '@/stores/common';
import { refreshInfo } from './shared/login';

import LayoutSecurity from '@/layouts/LayoutSecurity.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutEvents from '@/layouts/LayoutEvents.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';

import categories from '@/shared/category';

import safetyImgLight from '@/assets/category/security/img/safety-img-light.png';
import safetyImgDark from '@/assets/category/security/img/safety-img-dark.png';
import floating from '@/assets/category/questionnaire/floating.png';
import summaryTips from '@/assets/category/home/summary-tips.png';
import summaryTipsClosed from '@/assets/category/home/closed.png';

const { frontmatter, lang } = useData();

const compMapping: {
  [name: string]: Component;
} = {
  security: LayoutSecurity,
  blog: LayoutBlog,
  news: LayoutNews,
  events: LayoutEvents,
  showcase: LayoutShowcase,
};
const commonStore = useCommon();
const safetyImg = computed(() =>
  commonStore.theme === 'dark' ? safetyImgDark : safetyImgLight
);
const isCustomLayout = computed(() => {
  return (
    !!frontmatter.value.category &&
    categories.indexOf(frontmatter.value.category) !== -1
  );
});
const comp = computed(() => {
  return compMapping[frontmatter.value.category];
});
const router = useRouter();
const route = useRoute();
const isTipShow = ref(false);
const isQuesShow = ref(true);
const isSummaryShow = ref(false);
watch(
  route,
  (newValue) => {
    const pathList = ['security-advisories', 'security', 'cve'];
    isTipShow.value = false;
    pathList.forEach((item) => {
      if (item === newValue.path.split('/')[2]) {
        isTipShow.value = true;
      }
    });
    // 控制调查页面的浮窗入口显示
    const pathList2 = [
      'download',
      'training',
      'security',
      'security-advisories',
      'cve',
      'questionnaire',
    ];
    isQuesShow.value = true;
    pathList2.forEach((item) => {
      if (item === newValue.path.split('/')[2]) {
        isQuesShow.value = false;
      }
    });

    // 年度报告
    const summaryShow = sessionStorage.getItem('summary-tips');
    isSummaryShow.value =
      lang.value === 'en' ? false : summaryShow ? false : true;
  },
  { immediate: true }
);

// cookies使用提示
const isCookieTip = ref(false);
function handleCookieClick() {
  isCookieTip.value = false;
  localStorage.setItem('gauss-cookie', 'false');
}
onMounted(() => {
  const show = localStorage.getItem('gauss-cookie');
  isCookieTip.value = show ? false : true;

  // 年度报告
  const summaryShow = sessionStorage.getItem('summary-tips');
  isSummaryShow.value =
    lang.value === 'en' ? false : summaryShow ? false : true;

  refreshInfo();
});
function clickDeatilImg() {
  router.go('/zh/questionnaire/');
}
function closeDeatilImg() {
  isQuesShow.value = false;
}
// 年度报告

const summaryTipsClick = () => {
  isSummaryShow.value = false;
  sessionStorage.setItem('summary-tips', 'false');
};
</script>

<template>
  <AppHeader />
  <main>
    <component :is="comp" v-if="isCustomLayout"></component>
    <Content v-else />
    <!-- 漏洞奖励计划图标 -->
    <div v-if="isTipShow" class="safety-tips">
      <a href="https://opengausssrc.vulbox.com/" target="_blank">
        <img :src="safetyImg" alt="" />
      </a>
    </div>
    <div v-if="isQuesShow" class="code-datail">
      <img :src="floating" alt="扫描二维码" @click="clickDeatilImg" />
      <div class="close" @click="closeDeatilImg"></div>
    </div>
    <div v-if="isSummaryShow" class="smmary-code">
      <a href="https://summary.opengauss.org/zh/2022/" target="_blank">
        <img class="code" :src="summaryTips" alt="扫描二维码" />
      </a>
      <img
        :src="summaryTipsClosed"
        class="close"
        @click="summaryTipsClick"
        alt="扫描二维码"
      />
    </div>
  </main>
  <AppFooter :is-cookie-tip="isCookieTip" @cookie-click="handleCookieClick" />
</template>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  min-height: calc(100vh - 280px);
  background-color: var(--o-color-bg1);
  margin-top: 80px;
  overflow: hidden;
  @media (max-width: 1100px) {
    margin-top: 48px;
    min-height: calc(100vh - 329px);
  }
}
.safety-tips {
  position: fixed;
  right: 4%;
  bottom: 350px;
  z-index: 10;
  @media (max-width: 1100px) {
    bottom: 200px;
  }
  a {
    display: inline-block;
    img {
      height: 120px;
      @media (max-width: 1100px) {
        height: 60px;
      }
    }
  }
}
.code-datail {
  position: fixed;
  right: 1vw;
  top: 65vh;
  z-index: 99;
  @media screen and (max-width: 1100px) {
    display: none;
  }
  img {
    height: 135px;
    cursor: pointer;
  }
  .close {
    position: absolute;
    right: 1px;
    top: 4px;
    width: 22px;
    height: 20px;
    cursor: pointer;
  }
}
.smmary-code {
  position: fixed;
  left: 1vw;
  top: 65vh;
  z-index: 99;

  .code {
    width: 141px;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
      width: 85px;
    }
  }
  .close {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
