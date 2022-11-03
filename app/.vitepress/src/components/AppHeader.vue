<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';
import { getPop } from '@/api/api-search';
import HeaderNav from './HeaderNav.vue';
import AppTheme from './AppTheme.vue';
import AppLanguage from './AppLanguage.vue';
import NavLangFilter from '@/i18n/common/navLangFilter';

import logo_light from '@/assets/logo.svg';
import logo_dark from '@/assets/logo_dark.svg';

import IconSearch from '~icons/app/icon-search.svg';
import IconCancel from '~icons/app/icon-cancel.svg';
import IconMenu from '~icons/app/icon-menu.svg';

interface NavItem {
  NAME: string;
  PATH: string;
  ID: string;
  CHILDREN: NavItem;
  IS_OPEN_WINDOW?: number;
  IS_OPEN_MINISITE_WINDOW?: string;
}

const router = useRouter();
const { lang, theme } = useData();
const i18n = useI18n();
const commonStore = useCommon();

// 导航数据
const navRouter = computed(() => i18n.value.common.NAV_ROUTER_CONFIG);

const activeNav = ref('');
const logo = computed(() =>
  commonStore.theme === 'light' ? logo_light : logo_dark
);
const roterPath = ref<string>(router.route.path);

// 移动菜单事件
const mobileMenuIcon = ref(false);
const mobileChildMenu = ref<NavItem | any>([]);

const mobileMenuPanel = () => {
  mobileChildMenu.value = [];
  setTimeout(() => {
    mobileMenuIcon.value = !mobileMenuIcon.value;
    document.documentElement.classList.toggle('overflow');
    activeNav.value = '';
    moudleItem();
  }, 200);
};

const handleMenuLayer = (e: any) => {
  if (e.target.className !== 'mobile-menu-side') {
    if (mobileChildMenu.value.length === 0) {
      mobileMenuIcon.value = false;
      document.documentElement.classList.remove('overflow');
    }
  }
};

// 移动端一级导航事件
const goMobile = (item: NavItem) => {
  mobileChildMenu.value = [];
  if (Object.prototype.hasOwnProperty.call(item, 'CHILDREN')) {
    mobileChildMenu.value = item.CHILDREN;
  } else {
    mobileMenuIcon.value = false;
    router.go('/' + lang.value + item.PATH);
    document.documentElement.classList.remove('overflow');
  }
  activeNav.value = item.ID;
};

// 移动端二级导航事件
const goMobileSubList = (item: NavItem) => {
  if (item.IS_OPEN_WINDOW) {
    window.open(theme.value.docsUrl + '/' + lang.value + '/' + item.PATH);
    return;
  }
  if (item.IS_OPEN_MINISITE_WINDOW) {
    window.open(item.PATH);
    return;
  }

  if (item.PATH) {
    setTimeout(() => {
      mobileMenuIcon.value = false;
      document.documentElement.classList.remove('overflow');
    }, 200);
    nextTick(() => {
      router.go('/' + lang.value + item.PATH);
    });
  }
};

const langShow = ref([] as any);
watch(
  () => router.route.path,
  (val: string) => {
    roterPath.value = val;
    // 语言过滤
    NavLangFilter.forEach((item) => {
      if (val.includes(item.name)) {
        langShow.value = item.lang;
      }
      if (val === `/${lang.value}/`) {
        langShow.value = ['zh', 'en'];
      }
    });
  },
  { immediate: true }
);
// 移动端默认选中、二级菜单
const moudleItem = () => {
  navRouter.value.forEach((item: any) => {
    item.CLASS.forEach((el: any) => {
      if (roterPath.value.includes(el)) {
        mobileChildMenu.value = item.CHILDREN;
        activeNav.value = item.ID;
      }
    });
  });
};

// 返回首页
const goHome = () => {
  mobileMenuIcon.value = false;
  document.documentElement.classList.remove('overflow');
  router.go(`/${lang.value}/`);
};

const searchValue = computed(() => i18n.value.common.SEARCH);
// 显示/移除搜索框
const isShowBox = ref(false);
const showSearchBox = () => {
  commonStore.iconMenuShow = false;
  isShowBox.value = true;
};

// 搜索抽屉
const popList = ref<string[]>([]);
const isShowDrawer = ref(false);
const showDrawer = () => {
  isShowDrawer.value = true;
  //热搜
  const params = `lang=${lang.value}`;
  getPop(params).then((res) => {
    if (popList.value.length === 0) {
      res.obj.forEach((item: string) => {
        popList.value.push(item);
      });
    }
  });
};
const topSearchClick = (val: string) => {
  searchInput.value = val;
  search();
};
const donShowSearchBox = () => {
  isShowBox.value = false;
  isShowDrawer.value = false;
  searchInput.value = '';
  popList.value = [];
  commonStore.iconMenuShow = true;
};
// 搜索内容
const searchInput = ref<string>('');
// 搜索事件
function search() {
  window.open(`/${lang.value}/search/?search=${searchInput.value}`, '_self');
  // router.go(`/${lang.value}/search/?search=${searchInput.value}`);
  donShowSearchBox();
}
</script>

<template>
  <header class="app-header">
    <div class="app-header-body">
      <!-- 移动端菜单图标 -->
      <div class="mobile-menu-icon" @click="mobileMenuPanel">
        <OIcon v-if="!mobileMenuIcon" class="icon">
          <IconMenu />
        </OIcon>
        <OIcon v-else class="icon"><IconCancel /></OIcon>
      </div>
      <img class="logo" alt="openGauss logo" :src="logo" @click="goHome" />

      <ClientOnly>
        <div v-if="isShowBox" class="header-search">
          <div class="header-search-box">
            <OSearch
              v-model="searchInput"
              :placeholder="searchValue.PLEACHOLDER"
              @change="search"
              @focus="showDrawer"
            >
              <template #suffix>
                <OIcon class="close" @click="donShowSearchBox"
                  ><IconCancel
                /></OIcon>
              </template>
            </OSearch>
          </div>
          <div v-show="isShowDrawer" class="drawer">
            <div class="hots">
              <div class="hots-title">
                <p class="hots-text">{{ searchValue.TOPSEARCH }}</p>
              </div>
              <div class="hots-list">
                <OTag
                  v-for="item in popList"
                  :key="item"
                  type="text"
                  class="hots-list-item"
                  @click="topSearchClick(item)"
                  >{{ item }}</OTag
                >
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
      <!-- 移动端搜索按钮 -->
      <div v-if="!isShowBox" class="mobile-search">
        <OIcon class="icon" @click="showSearchBox"><IconSearch /></OIcon>
      </div>

      <div v-show="!isShowBox" class="header-content">
        <div class="header-nav">
          <HeaderNav :nav-items="navRouter" />
        </div>
        <div class="header-tool">
          <div class="header-tool-search">
            <OIcon class="icon" @click="showSearchBox"><IconSearch /></OIcon>
          </div>
          <!-- 中英文切换 -->
          <ClientOnly>
            <AppLanguage :show="langShow" />
          </ClientOnly>
          <AppTheme />
        </div>
      </div>
      <!-- 移动端菜单    -->

      <div
        class="mobile-menu"
        :class="{ active: mobileMenuIcon }"
        @click="handleMenuLayer($event)"
      >
        <div class="mobile-menu-side">
          <div class="mobile-nav">
            <a
              v-for="item in navRouter"
              :key="item.ID"
              class="link"
              :class="{
                active: activeNav === item.ID,
              }"
              @click.stop="goMobile(item)"
              >{{ item.NAME }}</a
            >
          </div>
          <div class="mobile-tools">
            <AppTheme />
            <ClientOnly>
              <AppLanguage
                :show="langShow"
                @language-click="mobileMenuIcon = false"
              />
            </ClientOnly>
          </div>
        </div>
        <transition name="menu-sub">
          <div v-if="mobileChildMenu.length > 0" class="mobile-menu-content">
            <div class="mobile-menu-list">
              <a
                v-for="item in mobileChildMenu"
                :key="item.ID"
                class="link"
                @click="goMobileSubList(item)"
                >{{ item.NAME }}</a
              >
            </div>
          </div>
        </transition>
      </div>
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
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
  box-shadow: var(--o-shadow-l1);
  &-body {
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
  height: 32px;
  cursor: pointer;
  margin-right: var(--o-spacing-h4);
  @media (max-width: 1100px) {
    height: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 12px;
    margin-right: 0;
  }
}
.mobile-menu-icon {
  display: none;
  margin-right: var(--o-spacing-h5);
  @media (max-width: 1100px) {
    display: block;
  }
  .icon {
    font-size: var(--o-font-size-h6);
    color: var(--o-color-text1);
    cursor: pointer;
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
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  @media screen and (max-width: 1100px) {
    display: none;
  }
  .header-nav {
    height: 100%;
    display: flex;
    flex: 1;
  }

  .header-tool {
    display: grid;
    gap: 20px;
    grid-template-columns: auto auto auto;
    align-items: center;
    height: 100%;
    .lang {
      color: var(--o-color-text1);
      letter-spacing: 0.08em;
      font-size: 16px;
    }
    &-search {
      cursor: pointer;
    }
    &-theme {
      cursor: pointer;
    }
  }
  .icon {
    font-size: 22px;
    color: var(--o-color-text1);
  }
}
.header-search {
  position: relative;
  width: 900px;
  margin-left: var(--o-spacing-h2);
  @media (max-width: 1100px) {
    :deep(.o-search) {
      --o-search-height: 28px;
    }
    margin-left: 0;
    z-index: 2;
    position: fixed;
    width: calc(100vw - 32px);
    left: 16px;
    right: 16px;
  }

  &-box {
    .close {
      cursor: pointer;
      color: var(--o-color-text1);
    }
  }
  .drawer {
    position: absolute;
    height: auto;
    width: 100%;
    margin-top: 21px;
    box-shadow: var(--o-shadow-l4);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    padding: var(--o-spacing-h3);

    @media (max-width: 1100px) {
      background: rgba(255, 255, 255, 1);
      backdrop-filter: blur(0px);
      margin-top: 8px;
      left: -16px;
      right: 0;
      width: 100vw;
      padding: var(--o-spacing-h5);
    }
    .hots {
      &-title {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        color: var(--o-color-text1);
      }
      &-list {
        &-item {
          margin-top: var(--o-spacing-h5);
          margin-right: var(--o-spacing-h5);
          background-color: var(--o-color-bg4);
          color: var(--o-color-text-secondary);
          cursor: pointer;
          @media (max-width: 1100px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }
      }
    }
    @media (max-width: 768px) {
      .hots-list-item {
        margin-right: var(--o-spacing-h8);
      }
    }
  }
}

.dark {
  .drawer {
    background: rgba($color: #2e2e2e, $alpha: 0.9);
    @media screen and (max-width: 1439px) {
      background: rgba($color: #2e2e2e, $alpha: 1);
    }
  }
}

.mobile-menu {
  width: 100%;
  position: fixed;
  left: 0;
  // transition: all 0.3s linear;
  overflow: hidden;
  display: flex;
  opacity: 0;
  visibility: hidden;
  border-top: 1px solid var(--o-color-division);
  background: rgba(0, 0, 0, 0.4);
  top: 48px;
  height: calc(100% - 48px);
  z-index: 999;
  @media screen and (min-width: 1100px) {
    display: none;
  }

  &.active {
    opacity: 1;
    z-index: 1101;
    display: flex;
    visibility: visible;
    @media screen and (min-width: 1100px) {
      opacity: 0;
    }

    .mobile-menu-side {
      left: 0;
      opacity: 1;
      z-index: 9;
    }
  }
  &.cookie {
    height: calc(100% - 108px);
    top: 108px;
  }
  &-side {
    left: -100%;
    background: var(--o-color-bg1);
    display: inline-flex;
    height: 100%;
    flex-direction: column;
    color: var(--o-color-text1);
    min-width: 164px;
    opacity: 0;
    position: relative;
    transition: all 0.3s linear;
    overflow-y: auto;
    justify-content: space-between;
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f1f1f1;
    }
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #afbfe8;
    }

    .mobile-nav {
      .link {
        display: block;
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-h3);
        color: var(--o-color-text1);
        padding: 0 var(--o-spacing-h5);
        position: relative;
        cursor: pointer;
        &::after {
          width: 0;
          height: 2px;
          background: transparent;
          content: '';
          position: absolute;
          left: 16px;
          display: block;
          transition: all 0.3s;
          bottom: 0;
        }
        &.active {
          background: var(--o-color-bg2);
          color: var(--o-color-brand1);
          &::after {
            width: 24px;
            background: var(--o-color-brand1);
          }
        }
      }
    }
    .mobile-tools {
      padding: 0 var(--o-spacing-h5);
      margin-bottom: 24px;
    }
  }
  &-content {
    flex: 1;
    background: var(--o-color-bg2);
    position: relative;

    left: 0;
    opacity: 1;
    z-index: 8;
    .mobile-menu-list {
      display: grid;
      padding: 0 16px;

      .link {
        line-height: var(--o-line-height-h3);
        font-size: var(--o-font-size-tip);
        font-weight: 300;
        color: var(--o-color-text1);
        cursor: pointer;
        &:last-child {
          border-bottom: 1px solid var(--o-color-division1);
        }
      }
    }
    &.active {
      left: 0;
      opacity: 1;
      z-index: 8;
    }
  }
}

// transition 动画
.menu-sub-enter-active,
.menu-sub-leave-active {
  transition: 0.5s linear;
  left: -100%;
}
.menu-sub-leave-active {
  transition: 0.3s linear;
}
.menu-sub-enter,
.menu-sub-leave-to {
  opacity: 0;
}
.menu-sub-enter-to {
  opacity: 1;
  left: 0%;
}
.menu-sub-leave {
  opacity: 1;
  left: -100%;
}
</style>
