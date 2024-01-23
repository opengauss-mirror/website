<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useData } from 'vitepress';

import navData from '@/data/header';
import { NavItemT } from '@/shared/@types/type-nav';

import ItemTheme from './ItemTheme.vue';
import ItemLang from './ItemLang.vue';

import IconCancel from '~icons/app/icon-cancel.svg';
import IconMenu from '~icons/app/icon-menu.svg';

const router = useRouter();
const { lang } = useData();

const roterPath = ref<string>(router.route.path);

// 移动端菜单切换事件
const menuVisible = ref(false);
const childMenuMb = ref<NavItemT | any>([]);
const toggleMenuVisible = () => {
  childMenuMb.value = [];
  menuVisible.value = !menuVisible.value;
  document.documentElement.classList.toggle('overflow');
  changeChildMenuMb();
};

// 移动端一级导航事件
const clickMenuNav = (item: NavItemT, index: number) => {
  childMenuMb.value = [];
  if (item.children) {
    childMenuMb.value = item.children;
  } else {
    menuVisible.value = false;
    if (item.href) {
      router.go((item.href as Record<string, string>)[lang.value]);
    }

    document.documentElement.classList.remove('overflow');
  }
  selectedIndex.value = index;
};
// nav 默认选中
const selectedIndex = ref(-1);
const changeChildMenuMb = () => {
  let foundMatch = false;
  navData.forEach((parent, index) => {
    if (foundMatch || !parent.children) {
      return;
    }
    const matchingChild = parent.children.find((child) =>
      roterPath.value.includes(
        (child.href as Record<string, string>)[lang.value]
      )
    );
    if (matchingChild) {
      childMenuMb.value = parent.children;
      selectedIndex.value = index;
      foundMatch = true;
    }
  });
};

// 关闭移动端菜单
const closeMenu = () => {
  menuVisible.value = false;
  selectedIndex.value = -1;
  document.documentElement.classList.remove('overflow');
};
watch(
  () => router.route.path,
  () => {
    closeMenu();
  }
);
</script>

<template>
  <div class="header-menu">
    <div class="header-menu-body">
      <div class="menu-icon" @click="toggleMenuVisible">
        <OIcon v-if="!menuVisible" class="icon">
          <IconMenu />
        </OIcon>
        <OIcon v-else class="icon"><IconCancel /></OIcon>
      </div>
      <Transition name="menu-mask-fade">
        <div v-if="menuVisible" class="menu-mask" @click="closeMenu"></div>
      </Transition>
      <transition name="menu-slide">
        <div v-show="menuVisible" class="menu-content">
          <div class="menu-content-left">
            <div class="menu-nav-list">
              <div
                v-for="(item, index) in navData"
                :key="item.id"
                class="link"
                :class="{ active: selectedIndex === index }"
                @click.stop="clickMenuNav(item, index)"
              >
                {{ item.label[lang as 'zh' | 'en'] }}
              </div>
            </div>
            <div class="mobile-tools">
              <ItemTheme />
              <ClientOnly>
                <ItemLang />
              </ClientOnly>
            </div>
          </div>
          <transition name="menu-slide">
            <div v-if="childMenuMb.length > 0" class="menu-content-right">
              <div class="menu-sub-list">
                <a
                  v-for="item in childMenuMb"
                  :key="item.id"
                  class="link"
                  :href="item.href[lang]"
                  @click="closeMenu"
                  :target="item.jumOut ? '_blank' : '_self'"
                >
                  {{ item.label[lang] }}
                </a>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-menu {
  background-color: var(--o-color-bg2);
  .header-menu-body {
    height: 48px;
    display: flex;
    align-items: center;
    position: relative;
    .menu-icon {
      display: none;
      margin-right: var(--o-spacing-h5);
      @media (max-width: 1100px) {
        flex: 1;
        display: block;
      }
      .icon {
        font-size: var(--o-font-size-h6);
        color: var(--o-color-text1);
        cursor: pointer;
      }
    }
    .menu-mask {
      width: 100vw;
      height: calc(100vh - 48px);
      left: 0;
      position: fixed;
      top: 48px;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: -2;
    }
    .menu-content {
      position: fixed;
      left: 0;
      overflow: hidden;
      display: flex;
      border-top: 1px solid var(--o-color-division);
      top: 48px;
      height: calc(100% - 48px);
      z-index: 999;
      .menu-content-left {
        background: var(--o-color-bg1);
        display: inline-flex;
        height: 100%;
        flex-direction: column;
        color: var(--o-color-text1);
        width: 45.5556vw;
        position: relative;
        overflow-y: auto;
        justify-content: space-between;
        z-index: 1;
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

        .menu-nav-list {
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
      .menu-content-right {
        flex: 1;
        background: var(--o-color-bg2);
        position: relative;
        left: 0;
        opacity: 1;
        width: 54.4444vw;
        .menu-sub-list {
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
  }
}

// 遮罩动画
.menu-mask-fade-enter-from,
.menu-mask-fade-leave-to {
  opacity: 0;
}

.menu-mask-fade-enter-to,
.menu-mask-fade-leave-from {
  opacity: 1;
}

.menu-mask-fade-enter-active {
  transition: opacity 0.3s linear;
}

// 菜单滑出动画
.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateX(-100%);
}

.menu-slide-enter-to,
.menu-slide-leave-from {
  transform: translateX(0);
}

.menu-slide-enter-active,
.menu-slide-enter-active {
  transition: transform 0.3s linear;
}
</style>
