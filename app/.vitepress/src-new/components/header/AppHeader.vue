<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { useData, useRoute, useRouter } from 'vitepress';
import { useElementSize } from '@vueuse/core';
import { canonicalPagePath } from '@/shared/page-language';
import { data as pageLangMap } from '@/shared/pages-url-list-loader.data';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import headerData from '~@/data/header';

import logoLight from '~@/assets/logo.svg';
import logoDark from '~@/assets/logo_dark.svg';
import { OHeader, OHeaderLanguageSwitcher, OHeaderMobile, OHeaderTheme, NavItemT } from '@opendesign-plus/components';
import HeaderTools from './HeaderTools.vue';

const { frontmatter, lang, params } = useData();
const { lePadV } = useScreen();
const router = useRouter();
const route = useRoute();
const commonStore = useCommon();

const headerRef = useTemplateRef('headerRef');
const headerMobileRef = useTemplateRef('headerMobileRef');
const headerWrap = computed(() => {
  const activeHeader = lePadV.value ? headerMobileRef.value : headerRef.value;
  return activeHeader?.$el.querySelector('.header-wrap');
});
const logo = computed(() => (commonStore.theme === 'light' ? logoLight : logoDark));
const navData = computed(() => headerData.nav[lang.value as 'zh' | 'en']);
const activeIndex = computed(() => {
  const navData = headerData.nav[lang.value as 'zh' | 'en'] as NavItemT[];

  const normalizePath = (value: string) => {
    let path = value.split(/[?#]/)[0];
    if (!path.startsWith('/')) return '';
    path = path.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');
    if (!path.endsWith('/')) path += '/';
    return path.replace(/\/{2,}/g, '/');
  };

  const currentPath = normalizePath(route.path);
  if (currentPath === '/' || currentPath === `/${lang.value}/`) return '';

  const matchHref = (href?: string) => {
    if (!href?.startsWith('/')) return false;
    const hrefPath = normalizePath(href);
    return hrefPath !== `/${lang.value}/` && (currentPath === hrefPath || currentPath.startsWith(hrefPath));
  };

  const traverse = (items: any[]): boolean => {
    for (const item of items) {
      if (matchHref(item.href)) return true;
      if (item.children && traverse(item.children)) return true;
    }
    return false;
  };

  for (const nav of navData) {
    const n = nav as any;
    if (n.id === frontmatter.value.navId) {
      return n.id;
    }
    if (matchHref(n.href)) {
      return n.id;
    }
    if (n.children && traverse(n.children)) {
      return n.id;
    }
    if (n.shortcut && traverse(n.shortcut)) {
      return n.id;
    }
  }
  return '';
});

const { height } = useElementSize(headerWrap);

const availableLangOptions = computed(() => {
  const langs = pageLangMap[canonicalPagePath(route.path)] || [lang.value];
  return headerData.langOptions.filter((option) => langs.includes(option.id));
});

const isSimpleHeader = computed(() => params.value?.sig || frontmatter.value.category === 'events');

const headerTitle = computed(() => {
  if (params.value?.sig) {
    return params.value.sig;
  }
  if (frontmatter.value.category === 'events') {
    return '活动列表';
  }
  return '';
});

const goBack = () => {
  if (frontmatter.value?.goBackUrl) {
    router.go(frontmatter.value.goBackUrl);
    return;
  }
  if (frontmatter.value.category === 'events') {
    router.go(`/${lang.value}/events/list/`);
    return;
  }
};

const goHome = () => router.go(`/${lang.value}/`);

const changeTheme = (val: 'light' | 'dark') => commonStore.setTheme(val);

const changeLanguage = ({ id }: { id: string }) => {
  if (lang.value === id) return;
  const { pathname, search } = window.location;
  const newHref = pathname.replace(`/${lang.value}/`, `/${id}/`);
  router.go(newHref + search);
};

defineExpose({
  height
});
</script>

<template>
  <OHeaderMobile v-if="lePadV" ref="headerMobileRef" :active-index="activeIndex" :is-simple-header="isSimpleHeader" :header-title="headerTitle" :logo="logo" :nav-data="navData" @go-back="goBack">
    <template #toolbar>
      <HeaderTools />
    </template>
    <template #tool>
      <!-- 语言 -->
      <OHeaderLanguageSwitcher :disabled="availableLangOptions.length < 1" :options="availableLangOptions" type="mobile" @change="changeLanguage" />
      <!-- 皮肤 -->
      <OHeaderTheme type="mobile" :theme="commonStore.theme" @change="changeTheme" />
    </template>
  </OHeaderMobile>
  <OHeader v-else ref="headerRef" community="openGauss" :logo="logo" :nav-data="navData" :active-index="activeIndex" @go-home="goHome">
    <template #toolbar>
      <HeaderTools />
    </template>
  </OHeader>
</template>

<style lang="scss" scoped>
:deep(.header .other-tool .o-theme-switcher) {
  margin-top: 24px;
}

:deep(.header-simple .header-title) {
  font-size: 18px !important;
  line-height: 26px !important;
}

:deep(.opengauss.nav-content) {
  --sub-gap: 24px;
  @include respond-to('<=laptop') {
    --sub-gap: 16px;
  }
}

@mixin grid-header-nav-layout($container-cols: 2) {
  .item-sub {
    flex: 1;
    .content-container {
      display: grid;
      grid-template-columns: repeat($container-cols, 1fr);
      gap: var(--sub-gap);
    }
    .content-item {
      width: 100% !important;
    }
    &:not(:first-child) {
      margin-left: var(--sub-gap);
    }
  }
}

// 下载
:deep(.opengauss.nav-content.download) {
  @include grid-header-nav-layout();
}

// 开发
:deep(.opengauss.nav-content.development) {
  @include grid-header-nav-layout(4);
}

// 文档
:deep(.opengauss.nav-content.document) {
  @include grid-header-nav-layout(4);
}

// 学习
:deep(.opengauss.nav-content.learn) {
  @include grid-header-nav-layout();
}

// 支持
:deep(.opengauss.nav-content.approve) {
  @include grid-header-nav-layout(1);
}

// 社区
:deep(.opengauss.nav-content.community) {
  @include grid-header-nav-layout();
}

// 动态
:deep(.opengauss.nav-content.update) {
  @include grid-header-nav-layout();
}

:deep(.opengauss.nav-content .content-item) {
  margin: 0;
}

.header-tool {
  display: flex;
  align-items: center;
  height: 100%;
  .source-code {
    margin-left: var(--header-tool-gap);
  }
  .header-lang {
    margin-left: var(--header-tool-gap);
  }
  .o-theme-switcher {
    margin-left: var(--header-tool-gap);
  }
  .login {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: var(--header-tool-gap);
    .o-icon {
      --icon-size: 24px;
    }
    :deep(.info-wrap) {
      margin: 5px 0 !important;
    }
  }
}
</style>
