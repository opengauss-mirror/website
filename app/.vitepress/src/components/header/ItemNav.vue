<script setup lang="ts">
import { ref, computed } from 'vue';
import { useData, useRoute } from 'vitepress';
import { debounce } from 'lodash';

import navData from '@/data/header';
import { NavItemT, NavChildrenItemT } from '@/shared/@types/type-nav';

const { lang } = useData();
const navActive = ref('');
const isShow = ref(true);

// nav 鼠标滑过事件
const toggleSubDebounced = debounce(
  (item: NavItemT | null) => {
    if (item === null) {
      navActive.value = '';
    } else {
      navActive.value = item.id;
      isShow.value = true;
    }
  },
  100,
  {
    trailing: true,
  }
);
// nav 默认选中
const route = useRoute();
const findIndexByPath = (
  path: string,
  lang: string,
  data: NavChildrenItemT[]
) => {
  return data.findIndex((item) => {
    const tempPath = (item.href as Record<string, string>)[lang];
    return path.includes(tempPath);
  });
};
const selectedIndex = computed(() => {
  const tempIndex = navData.findIndex((item) => {
    if (item.children?.length) {
      return findIndexByPath(route.path, lang.value, item.children) !== -1;
    } else {
      return -1;
    }
  });

  return tempIndex;
});
</script>

<template>
  <nav class="o-nav">
    <ul class="o-nav-list" :class="{ 'lang-en': lang === 'en' }">
      <li
        v-for="(item, index) in navData"
        :key="item.id"
        :class="{
          active: selectedIndex === index,
          hover: navActive === item.id,
        }"
        @mouseenter="toggleSubDebounced(item)"
        @mouseleave="toggleSubDebounced(null)"
      >
        <span class="text" v-if="item.label[lang as 'zh'|'en' ]"
          >{{ item.label[lang as 'zh' | 'en'] }}
        </span>

        <div v-if="isShow && item.children" class="sub-menu">
          <ul class="sub-menu-content">
            <li
              v-for="subItem in item.children"
              :key="subItem.id"
              class="sub-menu-item"
            >
              <template v-if="subItem.href&&subItem.href[lang as 'zh' | 'en']">
                <a
                  class="item-link"
                  :href="subItem.href[lang as 'zh' | 'en']"
                  :target="subItem.jumOut ? '_blank' : 'self'"
                  rel="noopener noreferrer"
                >
                  {{ subItem.label[lang as 'zh' | 'en'] }}
                </a>
              </template>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@media (max-width: 1366px) {
  html[lang='en'] .o-nav .o-nav-list > li {
    padding: 0 var(--o-spacing-h5);
    &::after {
      left: var(--o-spacing-h5);
      width: calc(100% - var(--o-spacing-h5) * 2);
    }
  }
}
.o-nav {
  height: 100%;
  position: relative;
  .o-nav-list {
    height: 100%;
    padding: 0;
    margin: 0;
    > li {
      position: relative;
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding: 0 var(--o-spacing-h4);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-h8);
      color: var(--o-color-text1);
      cursor: pointer;

      &.active {
        color: var(--o-color-brand1);
        &::after {
          background: var(--o-color-brand1);
        }
      }
      &.hover {
        color: var(--o-color-brand1);
        .sub-menu {
          transform: translate(-50%) scaleY(1);
        }
        &::after {
          background: var(--o-color-brand1);
        }
      }

      &::after {
        content: '';
        position: absolute;
        left: var(--o-spacing-h4);
        bottom: 0;
        width: calc(100% - var(--o-spacing-h4) * 2);
        height: 2px;
        border-radius: 1px;
        transition: all 0.1s linear;
      }

      .sub-menu {
        position: absolute;
        top: 80px;
        left: 50%;
        right: 0;
        background-color: var(--o-color-bg2);
        transform: translate(-50%) scaleY(0);
        transform-origin: top;
        transition: all 0.3s ease-in-out;
        display: table;
        z-index: 99;
        box-shadow: var(--o-shadow-l1);
        .sub-menu-content {
          margin: 0;
          padding: 0;
        }
        .sub-menu-item {
          line-height: var(--o-line-height-h3);
          text-align: center;
          font-size: var(--o-font-size-text);
          color: var(--o-color-text1);
          display: block;
          white-space: nowrap;
          padding: 0 var(--o-spacing-h8);
          min-width: 106px;
          &:hover {
            background-color: var(--o-color-brand1);
            color: var(--o-color-white);
            .item-link {
              color: var(--o-color-white);
            }
          }
          &.active {
            background-color: var(--o-color-brand1);
            color: var(--o-color-white);
            .item-link {
              color: var(--o-color-white);
            }
          }
          .item-link {
            display: inline-block;
            width: 100%;
            height: 100%;
            color: var(--o-color-text1);
          }
        }
      }
    }
  }
  .o-nav-line {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    transition: all 0.3s ease-in-out;
    display: block;
    z-index: 9;
    background: var(--o-color-brand1);
  }
}
</style>
