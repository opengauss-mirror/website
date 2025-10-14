<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useData } from 'vitepress';

import ContentWrapper from '~@/components/ContentWrapper.vue';
import ItemNav from './ItemNav.vue';
import ItemNavMobile from './ItemNavMobile.vue';

import logo_light from '~@/assets/logo.svg';
import logo_dark from '~@/assets/logo_dark.svg';
import IconClose from '~icons/app-new/icon-close.svg';
import IconMenu from '~icons/app-new/icon-header-menu.svg';

import { useCommon } from '@/stores/common';
import { useScreen } from '~@/composables/useScreen';

const { lang } = useData();
const { lePadV, lePad } = useScreen();
const commonStore = useCommon();
const langShow = ref(['zh', 'en']);

// Logo主题判断
const logo = computed(() => (commonStore.theme === 'light' ? logo_light : logo_dark));

const menuShow = ref(false);
const menuPanel = () => {
  setTimeout(() => {
    menuShow.value = !menuShow.value;
    document.body.style.overflow = menuShow.value ? 'hidden' : '';
  }, 200);
};

const mobileClick = () => {
  menuPanel();
};
</script>

<template>
  <header class="app-header" :class="[{ dark: commonStore.theme === 'dark' }]">
    <ContentWrapper class="app-header-wrap">
      <div v-if="lePad" class="menu-icon">
        <div class="icon" @click="menuPanel">
          <OIcon>
            <IconMenu v-if="!menuShow" />
            <IconClose v-else />
          </OIcon>
        </div>
      </div>

      <a class="logo" :href="`/${lang}/`">
        <img alt="openGauss logo" :src="logo" />
      </a>

      <ClientOnly>
        <ItemNavMobile v-if="lePad" :lang-options="langShow" :menuShow="menuShow" @link-click="mobileClick" />

        <ItemNav v-else />
      </ClientOnly>
    </ContentWrapper>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: var(--o-color-fill2);
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  z-index: 98;
  box-shadow: var(--o-shadow-1);
  backdrop-filter: blur(5px);

  @include respond-to('>pad_v') {
    &.dark {
      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background-color: var(--o-color-control4);
      }
    }

    &:before {
      bottom: 0;
      box-shadow: var(--o-shadow-1);
      content: '';
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 100;
    }
  }

  .app-header-wrap {
    display: flex;
    align-items: center;

    @include respond-to('>laptop') {
      height: 72px;
    }

    @include respond-to('laptop') {
      height: 64px;
    }

    @include respond-to('pad_h') {
      height: 56px;
    }

    @include respond-to('<=pad_v') {
      height: 48px;
      justify-content: space-between;
      position: relative;
    }
  }

  .logo {
    display: inline-block;
    margin-right: var(--e-spacing-h4);
    cursor: pointer;

    @include respond-to('<=pad_v') {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 12px;
      margin-right: 0;
    }

    img {
      height: 32px;

      @include respond-to('<=pad_v') {
        height: 24px;
      }
    }
  }
}

.menu-icon {
  flex: 1;
  display: block;
  .icon {
    font-size: var(--o-icon_size-m);
    color: var(--o-color-info1);
    height: 24px;
    cursor: pointer;
  }
}
</style>
