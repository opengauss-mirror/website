<script setup lang="ts">
import { computed, nextTick, onMounted, provide, ref, useTemplateRef, watch, watchEffect } from 'vue';
import type { Component } from 'vue';
import { useData, useRoute } from 'vitepress';

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

import AppHeader from '~@/components/header/AppHeader.vue';
import AppFooter from '~@/components/AppFooter.vue';
import { OCookieNotice, OPlusConfigProvider } from '@opendesign-plus/components';

import LayoutSecurity from '@/layouts/LayoutSecurity.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutEvents from '~@/layouts/LayoutEvents.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';
import LayoutMigration from '@/layouts/LayoutMigration.vue';
import LayoutFaq from '@/layouts/LayoutFaq.vue';

import AppFloat from '@/components/AppFloat.vue';
import AppTour from '~@/components/AppTour.vue';

import categories from '@/shared/category';

import { useCommon, useCookieStore } from '@/stores/common';
import EventDetail from '~@/layouts/LayoutEventDetail.vue';
import LayoutWithBanner from './layouts/LayoutWithBanner.vue';
import LayoutCharter from '~@/layouts/LayoutCharter.vue';
import LayoutSigApply from '~@/layouts/LayoutSigApply.vue';
import { getCustomCookie } from './shared/utils.js';

import { useLocale } from '~@/composables/useLocale.js';

const { frontmatter, lang } = useData();
const { changeLocale } = useLocale();
watchEffect(() => changeLocale(lang.value as 'zh' | 'en'));

const scrollContainerRef = useTemplateRef('scrollContainerRef');

provide('scrollContainerRef', scrollContainerRef);

const elementPlusLocale = computed(() => {
  return lang.value === 'zh' ? zhCn : en;
});
const compMapping: {
  [name: string]: Component;
} = {
  security: LayoutSecurity,
  blog: LayoutBlog,
  news: LayoutNews,
  events: EventDetail,
  'events-overview': LayoutEvents,
  showcase: LayoutShowcase,
  migration: LayoutMigration,
  faq: LayoutFaq,
  'banner-layout': LayoutWithBanner,
  charter: LayoutCharter,
  'sig-apply': LayoutSigApply,
};

const isCustomLayout = computed(() => {
  return !!frontmatter.value.category && categories.indexOf(frontmatter.value.category) !== -1;
});
const comp = computed(() => {
  return compMapping[frontmatter.value.category];
});

const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN;
const route = useRoute();
const cookieNoticeRef = ref();
const cookieStore = useCookieStore();

watch(
  () => cookieStore.isNoticeVisible,
  async (visible) => {
    if (visible && typeof document !== 'undefined') {
      await nextTick();
      const pathElement = document.querySelector('.cookie-notice path');
      pathElement?.setAttribute('fill', 'var(--o-color-primary1)');
    }
  }
);

watch(
  () => route.path,
  async () => {
    await nextTick();
    cookieNoticeRef.value?.check();
  }
);

// 风格切换
const APPEARANCE_KEY = 'openGauss-theme-appearance';
const commonStore = useCommon();

onMounted(() => {
  let theme;
  if (!getCustomCookie(APPEARANCE_KEY)) {
    const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefereDark ? 'dark' : 'light';
  } else {
    theme = getCustomCookie(APPEARANCE_KEY);
  }
  commonStore.setTheme(theme === 'dark' ? 'dark' : 'light');
});


// ================ header ================
const appHeaderRef = useTemplateRef('appHeaderRef');
const headerHeight = computed(() => appHeaderRef.value?.height.toString() ?? '72');
</script>

<template>
  <OPlusConfigProvider :locale="lang">
    <AppHeader ref="appHeaderRef"></AppHeader>
    <OCookieNotice
      ref="cookieNoticeRef"
      :enable-grid="true"
      v-model:visible="cookieStore.isNoticeVisible"
      community="openGauss"
      :detail-url="`/${lang}/cookies/`"
      :cookie-domain="COOKIE_DOMAIN"
    />
  </OPlusConfigProvider>
  <el-config-provider :locale="elementPlusLocale">
    <main :style="{ marginTop: `${headerHeight ?? '72'}px` }">
      <component :is="comp" v-if="isCustomLayout"></component>
      <Content v-else />
      <AppFloat />
    </main>
  </el-config-provider>
  <AppFooter />
  <ClientOnly>
    <AppTour />
  </ClientOnly>
</template>

<style lang="scss">
// .o-link-normal {
//   --link-color: var(--o-color-info2) !important;
// }

// :root {
//   --o-color-control5-light: var(--o-color-control-light);
// }

@include in-dark {
  .o-dropdown-list {
    --dropdown-list-bg-color: rgb(var(--o-grey-4)) !important;
  }
}

.o-dropdown-item {
  --dropdown-item-justify: center !important;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // --layout-content-max-width: 1544px;
  --layout-content-max-width: 1488px;
  --layout-content-padding: 64px;
  --layout-header-height: 80px;

  --layout-new-content-max-width: 1616px;

  --app-header-height: 72px;

  @include respond-to('laptop') {
    --app-header-height: 64px;
  }

  @include respond-to('pad_h') {
    --app-header-height: 56px;
  }

  @include respond-to('<=pad_v') {
    --app-header-height: 48px;
  }

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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
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
