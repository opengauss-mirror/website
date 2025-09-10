<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue';
import { useCommon } from '@/stores/common';

import IconSun from '~icons/app-new/icon-sun-outline.svg';
import IconMoon from '~icons/app-new/icon-moon-outline.svg';
import { getCustomCookie, isBrowser, setCustomCookie } from '@/shared/utils';

// 风格切换
const APPEARANCE_KEY = 'openGauss-theme-appearance';

const commonStore = useCommon();

const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const changeTheme = () => {
  const theme = commonStore.theme === 'dark' ? 'light' : 'dark';
  commonStore.theme = theme;
  setCustomCookie(APPEARANCE_KEY, theme, 180, import.meta.env.VITE_COOKIE_DOMAIN);
};

const changeThemeMobile = () => {
  setCustomCookie(APPEARANCE_KEY, commonStore.theme, 180, import.meta.env.VITE_COOKIE_DOMAIN);
};

onMounted(() => {
  let theme;
  if (!getCustomCookie(APPEARANCE_KEY)) {
    const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefereDark ? 'dark' : 'light';
  } else {
    theme = getCustomCookie(APPEARANCE_KEY);
  }
  commonStore.theme = theme === 'dark' ? 'dark' : 'light';
});

watch(
  () => {
    return commonStore.theme;
  },
  (val) => {
    if (isBrowser()) {
      const documentElement = document.documentElement;
      val === 'light' && documentElement.removeAttribute('data-o-theme');
      val === 'dark' && documentElement.setAttribute('data-o-theme', 'dark');
      val === 'light' && documentElement.classList.remove('dark');
      val === 'dark' && documentElement.classList.add('dark');
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="theme-box">
    <div class="theme-box-pc" @click="changeTheme">
      <OIcon class="icon">
        <IconMoon v-if="isLight" />
        <IconSun v-else />
      </OIcon>
    </div>
    <div class="theme-box-mobile">
      <OSwitch
        v-model="commonStore.theme"
        active-value="dark"
        inactive-value="light"
        inline-prompt
        active-color="#7d32ea"
        :active-icon="IconSun"
        :inactive-icon="IconMoon"
        @click="changeThemeMobile"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme-box {
  .theme-box-pc {
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    .icon {
      font-size: 24px;
      color: var(--e-color-text1);
    }
    @media screen and (max-width: 840px) {
      display: none;
    }
  }
  .theme-box-mobile {
    display: none;
    @media screen and (max-width: 840px) {
      display: flex;
      :deep(.o-switch) {
        background: none;
        display: flex;
        align-items: center;
      }
    }
  }
}
@include in-dark {
  .icon {
    color: var(--e-color-text1);
  }
}

:deep(.el-switch__label) {
  span {
    font-size: 12px;
  }
}
</style>
