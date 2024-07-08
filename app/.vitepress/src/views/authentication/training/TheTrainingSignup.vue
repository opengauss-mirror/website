<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppContent from '@/components/AppContent.vue';


const i18n = useI18n();
const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');
</script>

<template>
  <div class="bread">
    <BreadCrumbs
      :bread1="i18n.authentication.title"
      :bread2="i18n.authentication.signupTitle"
      :link1="i18n.authentication.signupParentUrl"
    />
  </div>
  <AppContent :pc-top="40" :mobile-top="16">
    <div class="signup-page">
      <div class="signup-title">{{ i18n.authentication.signupTitle }}</div>
      <div class="signup-subtitle">
        {{ i18n.authentication.signupDetail.entrustTitle }}
      </div>
      <div class="signup-desc">
        {{ i18n.authentication.signupDetail.entrustDesc }}
      </div>
      <div class="signup-subtitle">
        {{ i18n.authentication.signupDetail.entranceTitle }}
      </div>
      <div class="signup-desc">
        {{ i18n.authentication.signupDetail.entranceDesc }}
      </div>
      <div class="signup-entrance">
        <a
          v-for="item in i18n.authentication.talentList"
          :href="item.signupUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="signup-card"
        >
          <img class="talent-icon" :src="isDark ? item.iconSignupDark : item.iconSignup" />
        </a>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
@include in-dark {
  .signup-page {
    .signup-title {
      border-bottom: 1px solid rgba(180, 180, 180, 0.1);
    }
  }
}

.bread {
  max-width: 1504px;
  margin: 0 auto;
  padding-top: 40px;
  padding-left: 44px;
  padding-right: 44px;
  @media (max-width: 1439px) {
    padding-right: 24px;
    padding-left: 24px;
  }
  @media (max-width: 1100px) {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media (max-width: 768px) {
    padding-top: 16px;
  }
}

.signup-page {
  padding: var(--o-spacing-h2) var(--o-spacing-h3) 94px var(--o-spacing-h3);
  background-color: var(--o-color-bg2);
  @media screen and (max-width: 1439px) {
    padding: var(--o-spacing-h4) var(--o-spacing-h5) 74px var(--o-spacing-h3);
  }
  @media (max-width: 768px) {
    padding: var(--o-spacing-h5) var(--o-spacing-h5);
  }
  .signup-title {
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    font-weight: 300;
    padding-bottom: var(--o-spacing-h2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    @media screen and (max-width: 1439px) {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      padding-bottom: var(--o-spacing-h4);
    }
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
      padding-bottom: var(--o-spacing-h6);
    }
  }
  .signup-subtitle {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    padding: var(--o-spacing-h2) 0 20px 0;
    font-weight: 500;
    @media screen and (max-width: 1439px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      padding: var(--o-spacing-h4) 0 var(--o-spacing-h5) 0;
    }
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      padding: var(--o-spacing-h6) 0 var(--o-spacing-h7) 0;
    }
  }
  .signup-desc {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    @media screen and (max-width: 1439px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .signup-entrance {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--o-spacing-h8);
    margin-top: 35px;
    @media screen and (max-width: 1439px) {
      margin-top: var(--o-spacing-h4);
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
      grid-template-columns: 1fr;
    }
  }
  .signup-card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 124px;
    border: 1px solid #e5e5e5;
    @media (max-width: 768px) {
      height: 80px;
    }
    .talent-icon {
      width: 240px;
      @media screen and (max-width: 1439px) {
        width: 180px;
      }
      @media (max-width: 768px) {
        width: 120px;
      }
    }
  }
}
</style>
