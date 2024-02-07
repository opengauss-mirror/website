<script lang="ts" setup>
import { ref, Ref, watch } from 'vue';
import { useRouter, useData } from 'vitepress';

import useWindowResize from '@/components/hooks/useWindowResize';
import navLangFilter from '@/data/header/nav-lang-filter';

import IconDown from '~icons/app/icon-chevron-down.svg';

const screenWidth = useWindowResize();
const router = useRouter();
const { lang } = useData();

// 语言过滤
const langShow = ref(['zh']);
const detailFilterList = ['events', 'news', 'blogs'];
const langOptions = [
  { id: 'zh', label: '中文' },
  { id: 'en', label: 'English' },
];
interface LangType {
  id: string;
  label: string;
}
const langList: Ref<LangType[]> = ref([]);

const filterLang = () => {
  langList.value = [];
  langShow.value.forEach((item: string) => {
    langOptions.filter((el: LangType) => {
      if (el.id === item) {
        langList.value.push(el);
      }
    });
  });
};
watch(
  () => router.route.path,
  (val: string) => {
    navLangFilter.forEach((item) => {
      if (val.includes(item.name)) {
        langShow.value = item.lang;
      }
      if (val === `/${lang.value}/`) {
        langShow.value = ['zh', 'en'];
      }
    });
    detailFilterList.forEach((item) => {
      if (val.includes(item) && val.split('/')[3]) {
        langShow.value = [lang.value];
      }
    });
    filterLang();
  },
  { immediate: true }
);
// 选择语言

function changeLanguage(newlang: string) {
  if (lang.value === newlang) return;
  const { pathname, search } = window.location;
  const newHref = pathname.replace(`/${lang.value}/`, `/${newlang}/`);

  isMenu.value = false;
  router.go(newHref + search);
}

const isMenu = ref(false);
const onMouseEnter = () => {
  isMenu.value = true;
};
const onMouseLeave = () => {
  isMenu.value = false;
};

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
  (el as HTMLUListElement).style.height = `${
    (el as HTMLUListElement).offsetHeight
  }px`;
  (el as HTMLUListElement).style.opacity = '1';
};
const onLeave = (el: Element) => {
  (el as HTMLUListElement).style.height = '0px';
  (el as HTMLUListElement).style.opacity = '0';
};
</script>

<template>
  <div
    v-if="screenWidth > 1100"
    class="lang-menu"
    @mouseenter="onMouseEnter()"
    @mouseleave="onMouseLeave()"
  >
    <span class="lang-menu-link" :class="{ 'no-state': langList.length < 2 }">
      {{ lang === 'zh' ? '中文' : 'English' }}
      <OIcon v-if="langList.length > 1"><icon-down></icon-down></OIcon>
    </span>
    <Transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <ul v-show="isMenu && langList.length > 1" class="lang-menu-list">
        <li
          v-for="item in langList"
          :key="item.id"
          class="lang-item"
          :class="{ active: lang === item.id }"
          @click="changeLanguage(item.id)"
        >
          {{ item.label }}
        </li>
      </ul>
    </Transition>
  </div>
  <div v-else class="mobile-change-language">
    <span
      v-for="item in langList"
      :key="item.id"
      :class="{ active: lang === item.id }"
      @click.stop="changeLanguage(item.id)"
      >{{ item.label }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
.lang-menu {
  position: relative;
  height: 100%;
  .lang-menu-link {
    display: flex;
    align-items: center;
    font-size: var(--o-font-size-text);
    color: var(--o-color-text1);
    cursor: pointer;
    height: 100%;
    &.no-state {
      cursor: default;
    }
  }
  .lang-menu-list {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--o-color-bg2);
    cursor: pointer;
    z-index: 999;
    box-shadow: var(--o-shadow-l1);
    min-width: 78px;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    .lang-item {
      line-height: var(--o-line-height-h3);
      text-align: center;
      font-size: var(--o-font-size-text);
      color: var(--o-color-text1);
      border-bottom: 1px solid var(--o-color-division1);
      padding: 0 var(--o-spacing-h5);
      &:last-child {
        border-bottom: 0 none;
      }
      &:hover {
        background: var(--o-color-brand1);
        color: var(--o-color-text2);
      }
      &.active {
        color: var(--o-color-brand1);
        background: none;
        cursor: default;
      }
    }
  }
}
.mobile-change-language {
  line-height: var(--o-line-height-h3);
  display: flex;
  span {
    font-size: var(--o-font-size-tip);
    color: var(--o-color-text4);
    margin-right: 12px;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
      display: flex;
    }
    &.active {
      color: var(--o-color-brand1);
      font-weight: 600;
    }
    &:not(:last-child) {
      &:after {
        content: '|';
        margin-left: 12px;
        color: var(--o-color-text4);
      }
    }
  }
}
</style>
