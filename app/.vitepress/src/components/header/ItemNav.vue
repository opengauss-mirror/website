<script setup lang="ts">
import { ref, computed } from 'vue';
import { useData, useRoute, useRouter } from 'vitepress';

import navData from '@/data/header';
import { NavChildrenItemT, LocaleT } from '@/shared/@types/type-nav';

const { lang } = useData();
const activeIndex = ref(-1);
const route = useRoute();
const router = useRouter();

// hover事件
const onMouseEnter = (idx: number) => {
  activeIndex.value = idx;
};

const onMouseLeave = () => {
  activeIndex.value = -1;
};

// 点击事件
const jumpOut = (href: LocaleT, outside: boolean) => {
  activeIndex.value = -1;
  const path = href[lang.value as LocaleT];
  if (outside) {
    window.open(path, '_blank');
  } else {
    router.go(path);
  }
};

// nav 默认选中
const findIndexByPath = (path: string, lang: string, data: NavChildrenItemT[]) => {
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

// 过渡动画
const onBeforeEnter = (el: Element) => {
  (el as HTMLUListElement).style.height = '0px';
  (el as HTMLUListElement).style.opacity = '0';
};
const onEnter = (el: Element) => {
  (el as HTMLUListElement).style.height = `${el.scrollHeight}px`;
  (el as HTMLUListElement).style.opacity = '1';
};
const onBeforeLeave = (el: Element) => {
  (el as HTMLUListElement).style.height = `${(el as HTMLUListElement).offsetHeight}px`;
  (el as HTMLUListElement).style.opacity = '1';
};
const onLeave = (el: Element) => {
  (el as HTMLUListElement).style.height = '0px';
  (el as HTMLUListElement).style.opacity = '0';
};
</script>

<template>
  <nav class="o-nav">
    <ul class="o-nav-list" :class="{ 'lang-en': lang === 'en' }">
      <li
        v-for="(item, idx) in navData"
        :key="item.id"
        :class="{
          active: selectedIndex === idx,
          'is-active': activeIndex === idx,
        }"
        @mouseenter="onMouseEnter(idx)"
        @mouseleave="onMouseLeave()"
      >
        <span class="text" v-if="item.label[lang as LocaleT]">{{ item.label[lang as LocaleT] }} </span>
        <Transition @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave" @leave="onLeave">
          <ul v-show="item.children && item.children.length && activeIndex === idx" class="sub-menu">
            <li v-for="subItem in item.children" :key="subItem.id" class="sub-menu-item">
              <template v-if="subItem.href && subItem.href[lang as LocaleT]">
                <a
                  class="item-link"
                  :href="subItem.href[lang as LocaleT]"
                  :target="subItem.jumpOut ? '_blank' : 'self'"
                  @click.prevent="jumpOut(subItem.href, subItem.jumpOut)"
                  rel="noopener noreferrer"
                >
                  {{ subItem.label[lang as LocaleT] }}
                </a>
              </template>
            </li>
          </ul>
        </Transition>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@media (max-width: 1366px) {
  html[lang='en'] .o-nav .o-nav-list > li {
    padding: 0 var(--e-spacing-h5);
    &::after {
      left: var(--e-spacing-h5);
      width: calc(100% - var(--e-spacing-h5) * 2);
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
      padding: 0 var(--e-spacing-h4);
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-h8);
      color: var(--e-color-text1);
      cursor: pointer;

      &.active {
        color: var(--e-color-brand1);
        &::after {
          background: var(--e-color-brand1);
        }
      }
      &.hover {
        color: var(--e-color-brand1);
        .sub-menu {
          transform: translate(-50%) scaleY(1);
        }
        &::after {
          background: var(--e-color-brand1);
        }
      }

      &::after {
        content: '';
        position: absolute;
        left: var(--e-spacing-h4);
        bottom: 0;
        width: calc(100% - var(--e-spacing-h4) * 2);
        height: 2px;
        border-radius: 1px;
        transition: all 0.1s linear;
      }

      .sub-menu {
        position: absolute;
        top: 100%;
        left: 50%;
        background-color: var(--e-color-bg2);
        transform: translate(-50%);
        transition: all 0.3s ease-in-out;
        z-index: 99;
        height: 0;
        opacity: 0;
        box-shadow: var(--e-shadow-l1);
        overflow: hidden;

        .sub-menu-item {
          &:hover {
            background-color: var(--e-color-brand1);
            color: var(--e-color-white);
            .item-link {
              color: var(--e-color-white);
            }
          }
          &.active {
            background-color: var(--e-color-brand1);
            color: var(--e-color-white);
            .item-link {
              color: var(--e-color-white);
            }
          }
          .item-link {
            line-height: var(--e-line-height-h3);
            text-align: center;
            font-size: var(--e-font-size-text);
            color: var(--e-color-text1);
            display: block;
            padding: 0 var(--e-spacing-h8);
            min-width: 106px;
            white-space: nowrap;
            width: 100%;
            display: block;
            color: var(--e-color-text1);
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
    background: var(--e-color-brand1);
  }
}
</style>
