<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';
import useWindowResize from '@/components/hooks/useWindowResize';

import ItemNav from './ItemNav.vue';
import ItemTheme from './ItemTheme.vue';
import ItemLang from './ItemLang.vue';
import ItemSearch from './ItemSearch.vue';
import ItemMenu from './ItemMenu.vue';
import ItemUser from './ItemUser.vue';

import logo_light from '@/assets/logo.svg';
import logo_dark from '@/assets/logo_dark.svg';

import IconSearch from '~icons/app/icon-search.svg';

const { lang } = useData();
const i18n = useI18n();
const commonStore = useCommon();
const screenWidth = useWindowResize();

const logo = computed(() =>
  commonStore.theme === 'light' ? logo_light : logo_dark
);

const searchValue = computed(() => i18n.value.common.SEARCH);
// 显示/移除搜索框
const isShowBox = ref(false);
const showSearchBox = () => {
  commonStore.iconMenuShow = false;
  isShowBox.value = true;
};

// 搜索抽屉
const popList = ref<string[]>([]);
// 控制是否使用热门搜索功能
const isShowDrawer = ref(true);

// 暂时固定数据 等接口出来在换
const hotList = {
  zh: [
    '数据类型',
    '逻辑复制',
    '索引',
    '迁移',
    '远程连接',
    '表空间',
    '日志',
    '闪回',
  ],
  en: ['check_point', 'dcf', 'copy', 'create_schema'],
};

const showDrawer = () => {
  popList.value = lang.value === 'zh' ? hotList.zh : hotList.en;
};

// 搜索内容
const searchInput = ref<string>('');

// 关闭搜索框
const closeSearchBox = () => {
  isShowBox.value = false;
  searchInput.value = '';
  popList.value = [];
  commonStore.iconMenuShow = true;
};
// 搜索组件跳转链接
const searchLink = `/${lang.value}/search/`;
</script>

<template>
  <header class="app-header">
    <div class="app-header-body">
      <!-- 移动端菜单 -->
      <ItemMenu v-if="screenWidth < 1100"></ItemMenu>
      <a class="logo" :href="`/${lang}/`">
        <img alt="openGauss logo" :src="logo" />
      </a>
      <ClientOnly>
        <ItemSearch
          v-if="isShowBox"
          :placeholder="searchValue.PLEACHOLDER"
          :pop-list="popList"
          :link="searchLink"
          :is-show-drawer="isShowDrawer"
          @close="closeSearchBox"
          @focus-input="showDrawer"
        />
      </ClientOnly>
      <div v-if="screenWidth > 1100" class="header-content">
        <ItemNav v-show="!isShowBox" />
        <div class="content-tool">
          <div class="tool-menu" v-show="!isShowBox">
            <div class="header-tool-search">
              <OIcon class="icon" @click="showSearchBox"><IconSearch /></OIcon>
            </div>
            <!-- 中英文切换 -->
            <ClientOnly>
              <ItemLang />
            </ClientOnly>
            <ItemTheme />
          </div>
          <ItemUser></ItemUser>
        </div>
      </div>
      <!-- 移动端搜索及登录图标 -->
      <template v-else>
        <div v-show="!isShowBox" class="header-content-mobile">
          <div class="mobile-search">
            <OIcon class="icon" @click="showSearchBox"><IconSearch /></OIcon>
          </div>
          <ItemUser></ItemUser>
        </div>
      </template>
    </div>
  </header>
</template>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  background-color: var(--o-color-bg-secondary) !important;
  box-shadow: none !important;
}
:deep(.el-input__suffix) {
  font-size: var(--o-font-size-h7);
}
:deep(.el-input__clear) {
  font-size: var(--o-font-size-h7);
}
:deep(.el-icon-circle-inner) {
  font-size: var(--o-font-size-h1);
}
.app-header {
  background-color: var(--o-color-bg2);
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
  box-shadow: var(--o-shadow-l1);
  .app-header-body {
    display: flex;
    align-items: center;
    max-width: 1504px;
    padding: 0 44px;
    margin: 0 auto;
    height: 80px;
    @media (max-width: 1439px) {
      padding: 0 24px;
    }
    @media (max-width: 1100px) {
      padding: 0 16px;
      height: 48px;
      justify-content: space-between;
      position: relative;
    }
  }
}
.logo {
  display: inline-block;
  cursor: pointer;
  margin-right: var(--o-spacing-h4);
  @media (max-width: 1100px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 12px;
    margin-right: 0;
  }
  img {
    height: 32px;
    @media (max-width: 1100px) {
      height: 24px;
    }
  }
}
.mobile-search {
  font-size: var(--o-font-size-h6);
  display: none;
  color: var(--o-color-text1);
  @media (max-width: 1100px) {
    display: block;
  }
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 100%;
  @media screen and (max-width: 1100px) {
    display: none;
  }
  .content-tool {
    display: flex;
    height: 100%;

    .tool-menu {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(3, auto);
      align-items: center;
      height: 100%;
      .header-tool-search {
        cursor: pointer;
      }
    }
  }
  .icon {
    font-size: var(--o-font-size-h6);
    color: var(--o-color-text1);
  }
}
.header-content-mobile {
  display: flex;
}

@include in-dark {
  .drawer {
    background: rgba($color: #2e2e2e, $alpha: 0.9);
    @media screen and (max-width: 1439px) {
      background: rgba($color: #2e2e2e, $alpha: 1);
    }
  }
}
</style>
