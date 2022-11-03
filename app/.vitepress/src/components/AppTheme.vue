<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useCommon } from '@/stores/common';

import IconMoonLight from '~icons/app/icon-sun-outline.svg';
import IconMoonDark from '~icons/app/icon-moon-outline.svg';

// 风格切换
const APPEARANCE_KEY = 'vitepress-theme-appearance';
const commonStore = useCommon();

const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
const mobileTheme = ref(false);

const changeTheme = () => {
  const theme = commonStore.theme === 'dark' ? 'light' : 'dark';
  commonStore.theme = theme;
  localStorage.setItem(APPEARANCE_KEY, theme);
  mobileTheme.value = isDark.value;
};

const switchTheme = () => {
  const theme = mobileTheme.value ? 'dark' : 'light';
  commonStore.theme = theme;
  localStorage.setItem(APPEARANCE_KEY, theme);
};

onMounted(() => {
  const theme = localStorage.getItem(APPEARANCE_KEY);
  commonStore.theme = theme === 'dark' ? 'dark' : 'light';
  mobileTheme.value = isDark.value;
});

watch(
  () => commonStore.theme,
  (val) => {
    const documentElement = document.documentElement;
    val === 'light' && documentElement.classList.remove('dark');
    val === 'dark' && documentElement.classList.add(val);
    localStorage.setItem(APPEARANCE_KEY, val);
  }
);
</script>

<template>
  <div class="theme-box">
    <div class="theme-box-pc" @click="changeTheme">
      <OIcon class="icon">
        <IconMoonLight v-if="isDark" />
        <IconMoonDark v-else />
      </OIcon>
    </div>
    <div class="theme-box-mobile">
      <OSwitch
        v-model="mobileTheme"
        active-text="Dark"
        inactive-text="Light"
        active-color="#002fa7"
        @change="switchTheme"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme-box {
  &-pc {
    cursor: pointer;
    .icon {
      font-size: var(--o-font-size-h5);
      color: var(--o-color-text1);
    }
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
  &-mobile {
    display: none;
    @media screen and (max-width: 1100px) {
      display: block;
    }
  }
}
.dark {
  .icon {
    color: var(--o-color-text1);
  }
}
:deep(.el-switch__label) {
  span {
    font-size: 12px;
  }
}
</style>
