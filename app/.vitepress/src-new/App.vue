<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { useData } from 'vitepress';

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

import AppHeader from '@/components/header/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import CookieNotice from '@/components/CookieNotice.vue';

import LayoutSecurity from '@/layouts/LayoutSecurity.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutEvents from '@/layouts/LayoutEvents.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';
import LayoutMigration from '@/layouts/LayoutMigration.vue';
import LayoutFaq from '@/layouts/LayoutFaq.vue';

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
  migration: LayoutMigration,
  faq: LayoutFaq,
};

const isCustomLayout = computed(() => {
  return !!frontmatter.value.category && categories.indexOf(frontmatter.value.category) !== -1;
});
const comp = computed(() => {
  return compMapping[frontmatter.value.category];
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
  <CookieNotice />
  <AppFooter />
</template>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --layout-content-max-width: 1544px;
  --layout-content-padding: 64px;
  --layout-header-height: 80px;

  --layout-new-content-max-width: 1616px;

  @include respond-to('<=laptop') {
    --layout-content-max-width: 100%;
    --layout-new-content-max-width: 100%;
    --layout-content-padding: 40px;
  }

  @include respond-to('<=pad') {
    --layout-content-padding: 32px;
  }

  @include respond-to('phone') {
    --layout-content-padding: 24px;
  }
}
</style>
<style lang="scss" scoped>
main {
  min-height: calc(100vh - 280px);
  background-color: var(--e-color-bg1);
  &::after {
    content: '';
    display: table;
  }
  @media (max-width: 1100px) {
    min-height: calc(100vh - 329px);
  }
}
</style>
