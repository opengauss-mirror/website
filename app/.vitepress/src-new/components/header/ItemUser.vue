<script setup lang="ts">
import { onMounted } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import { doLogin, doLogout, getUserAuth, requestUserInfo } from '@/shared/login';
import { useUserInfoStore } from '@/stores/user';

import IconLogin from '~icons/app-new/icon-header-person.svg';
const { lang } = useData();
const i18n = useI18n();

// 账号登录
const { csrfToken } = getUserAuth();
const userInfoStore = useUserInfoStore();
const jumpToUserZone = () => {
  const language = lang.value === 'zh' ? 'zh' : 'en';
  const origin = import.meta.env.VITE_LOGIN_URL;
  window.open(`${origin}/${language}/profile`, '_blank');
};
onMounted(() => {
  requestUserInfo();
});
</script>

<template>
  <ClientOnly>
    <div class="header-user">
      <div v-if="csrfToken">
        <div class="user-info">
          <img v-if="userInfoStore.photo" :src="userInfoStore.photo" class="user-img" />
          <div v-else class="user-img"></div>
          <p class="user-name">{{ userInfoStore.username }}</p>
        </div>
        <ul class="menu-list">
          <li @click="jumpToUserZone()">{{ i18n.common.USER_CENTER }}</li>
          <li @click="doLogout()">{{ i18n.common.LOGOUT }}</li>
        </ul>
      </div>
      <div v-else class="login" @click="doLogin()">
        <OIcon class="icon">
          <IconLogin />
        </OIcon>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.header-user {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  @media (max-width: 1100px) {
    margin-left: var(--o-gap-2);
  }

  .user-info {
    display: flex;
    align-items: center;
    .user-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      vertical-align: middle;
      @media (max-width: 1100px) {
        width: 28px;
        height: 28px;
      }
    }
    .user-name {
      color: var(--e-color-text1);
      margin-left: 8px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 72px;
      line-height: var(--e-line-height-h8);
      @media (max-width: 1100px) {
        display: none;
      }
    }
  }
  &:hover {
    .menu-list {
      display: block;
    }
  }
  .menu-list {
    display: none;
    position: absolute;
    top: 80px;
    left: 0;
    @media (max-width: 1100px) {
      top: 48px;
      left: -60px;
    }
    background: var(--e-color-bg2);
    cursor: pointer;
    z-index: 999;
    box-shadow: var(--e-shadow-l1);
    min-width: 78px;
    li {
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
  .login {
    cursor: pointer;
    font-size: 24px;
    color: var(--e-color-text1);
    width: 1em;
    height: 1em;

    // @media (max-width: 1100px) {
    //   font-size: 20px;
    // }
  }
}
</style>
