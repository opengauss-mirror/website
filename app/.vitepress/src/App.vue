<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

import { useData } from 'vitepress';
import type { Component } from 'vue';
import { computed, ref, onMounted } from 'vue';
import { setCustomCookie, getCustomCookie } from './shared/utils';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';

import LayoutSecurity from '@/layouts/LayoutSecurity.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutEvents from '@/layouts/LayoutEvents.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';
import AppFloat from '@/components/AppFloat.vue';

import categories from '@/shared/category';

import seoConfig from '@/data/common/seo';

const { frontmatter, lang } = useData();

const locale = computed(() => {
  return lang.value === 'zh' ? zhCn : en;
});
const compMapping: {
  [name: string]: Component;
} = {
  security: LayoutSecurity,
  blog: LayoutBlog,
  news: LayoutNews,
  events: LayoutEvents,
  showcase: LayoutShowcase,
};

const isCustomLayout = computed(() => {
  return (
    !!frontmatter.value.category &&
    categories.indexOf(frontmatter.value.category) !== -1
  );
});
const comp = computed(() => {
  return compMapping[frontmatter.value.category];
});
// cookies使用提示
const isCookieTip = ref(false);
function handleCookieClick() {
  isCookieTip.value = false;
  setCustomCookie('agreed-cookiepolicy', 'true', 180);
}

onMounted(() => {
  isCookieTip.value = getCustomCookie('agreed-cookiepolicy') ? false : true;
});
</script>

<template>
  <AppHeader />
  <el-config-provider :locale="locale">
    <main>
      <SeoBox :seo-data="seoConfig[lang]?.home" />
      <component :is="comp" v-if="isCustomLayout"></component>
      <Content v-else />
      <AppFloat />
    </main>
  </el-config-provider>
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
  &::after {
    content: '';
    display: table;
  }
  @media (max-width: 1100px) {
    min-height: calc(100vh - 329px);
  }
}
</style>
