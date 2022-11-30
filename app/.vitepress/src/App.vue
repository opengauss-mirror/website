<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

import { useData, useRoute } from 'vitepress';
import type { Component } from 'vue';
import { computed, watch, ref, onMounted } from 'vue';
import { useCommon } from '@/stores/common';

import LayoutSecurity from '@/layouts/LayoutSecurity.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutEvents from '@/layouts/LayoutEvents.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';

import categories from '@/shared/category';

import safetyImgLight from '@/assets/category/security/img/safety-img-light.png';
import safetyImgDark from '@/assets/category/security/img/safety-img-dark.png';

const { frontmatter } = useData();

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

const route = useRoute();
const isTipShow = ref(false);
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
  },
  { immediate: true }
);

// cookies使用提示
const isCookieTip = ref(true);
function clickCookieClose() {
  isCookieTip.value = false;
  localStorage.setItem('gauss-cookie', 'false');
}
onMounted(() => {
  const show = localStorage.getItem('gauss-cookie');
  isCookieTip.value = show ? false : true;
});
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
  </main>
  <AppFooter :is-cookie-tip="isCookieTip" @click-close="clickCookieClose" />
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
</style>
