<script lang="ts" setup>
import { ref, Ref, watch } from 'vue';
import { useRouter, useData } from 'vitepress';

import navLangFilter from '@/data/header/nav-lang-filter';

import IconLocale from '~icons/app/icon-locale.svg';

import { useScreen } from '~@/composables/useScreen';

const { gtPadV } = useScreen();
const router = useRouter();
const { lang } = useData();

// 语言过滤
const langShow = ref(['zh']);
const detailFilterList = ['events', 'news', 'blogs'];
const langOptions = [
  { id: 'zh', label: '简体中文' },
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
      if (val.includes('summit') && (val.includes('privacy') || val.includes('legal'))) {
        langShow.value = ['zh'];
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
  (el as HTMLUListElement).style.height = `${(el as HTMLUListElement).offsetHeight}px`;
  (el as HTMLUListElement).style.opacity = '1';
};
const onLeave = (el: Element) => {
  (el as HTMLUListElement).style.height = '0px';
  (el as HTMLUListElement).style.opacity = '0';
};
</script>

<template>
  <div v-if="gtPadV" class="lang-menu" @mouseenter="onMouseEnter()" @mouseleave="onMouseLeave()">
    <OIcon class="lang-menu-link" :class="{ 'no-state': langList.length < 2 }">
      <IconLocale />
      <div class="lang-tag">{{ lang === 'zh' ? '中' : 'EN' }}</div>
    </OIcon>

    <Transition @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave" @leave="onLeave">
      <ul v-show="isMenu && langList.length > 1" class="lang-menu-list">
        <li v-for="item in langList" :key="item.id" class="lang-item" :class="{ active: lang === item.id }" @click="changeLanguage(item.id)">
          {{ item.label }}
        </li>
      </ul>
    </Transition>
  </div>

  <div v-else class="mobile-change-language">
    <span v-for="item in langList" :key="item.id" :class="{ active: lang === item.id }" @click.stop="changeLanguage(item.id)">{{
      item.id === 'zh' ? '中文' : 'EN'
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
.lang-menu {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  .lang-menu-link {
    position: relative;
    font-size: var(--o-icon_size-m);
    color: var(--e-color-text1);
    cursor: pointer;
    &.no-state {
      cursor: default;
    }

    .lang-tag {
      position: absolute;
      right: 0%;
      bottom: 0%;
      font-size: 10px;
      width: 12px;
      height: 12px;
      background-color: var(--e-color-bg2);
    }
  }
  .lang-menu-list {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--e-color-bg2);
    cursor: pointer;
    z-index: 999;
    box-shadow: var(--e-shadow-l1);
    min-width: 78px;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    .lang-item {
      line-height: var(--e-line-height-h3);
      text-align: center;
      font-size: var(--e-font-size-text);
      color: var(--e-color-text1);
      border-bottom: 1px solid var(--e-color-division1);
      padding: 0 var(--e-spacing-h5);
      white-space: nowrap;
      &:last-child {
        border-bottom: 0 none;
      }
      &:hover {
        background: var(--e-color-brand1);
        color: var(--e-color-text2);
      }
      &.active {
        color: var(--e-color-brand1);
        background: none;
        cursor: default;
      }
    }
  }
}
.mobile-change-language {
  line-height: var(--e-line-height-h3);
  display: flex;
  span {
    font-size: var(--e-font-size-tip);
    color: var(--e-color-text4);
    margin-right: 12px;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
      display: flex;
    }
    &.active {
      color: var(--e-color-brand1);
      font-weight: 600;
    }
    &:not(:last-child) {
      &:after {
        content: '|';
        margin-left: 12px;
        color: var(--e-color-text4);
      }
    }
  }
}
</style>
