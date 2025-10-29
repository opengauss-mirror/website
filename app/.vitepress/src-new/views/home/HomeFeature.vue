<script setup lang="ts">
import { ODivider, OIcon, OLink } from '@opensig/opendesign';
import IconDownload from '~icons/app-new/icon-download.svg';
import { useI18n } from '@/i18n';

import feature1 from '~icons/app-new/icon-feature1.svg';
import feature2 from '~icons/app-new/icon-feature2.svg';
import feature3 from '~icons/app-new/icon-feature3.svg';
import feature4 from '~icons/app-new/icon-feature4.svg';
import AppSection from '~@/components/AppSection.vue';
import { LEARN_VIDEO_LINK } from '~@/data/url-config';
import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';

const i18n = useI18n();
const { t } = useLocale();

const PPT_LINK = `${LEARN_VIDEO_LINK}/openGauss%20%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84.pptx`;

const icons = [feature1, feature2, feature3, feature4];

const { isPhone } = useScreen();
</script>

<template>
  <AppSection :title="t('home.openGaussFeatures')" :subtitle="i18n.home.CHARACTERR_INFO.TITLE">
    <div class="home-feature-content">
      <div class="home-feature-content-main">
        <template v-for="(item, index) in i18n.home.CHARACTERR_INFO.LIST">
          <div :class="{ 'home-feature-content-main-item': true, 'right-border': !isPhone }">
            <OIcon class="feature-item-icon"><component :is="icons[index]" /></OIcon>
            <p class="feature-item-title">{{ item.NAME }}</p>
            <p v-if="!isPhone" class="feature-item-desc">{{ item.TEXT }}</p>
          </div>
          <ODivider v-if="!isPhone && index < i18n.home.CHARACTERR_INFO.LIST.length - 1" direction="v" />
        </template>
      </div>
      <div class="home-feature-content-footer">
        <OLink class="download-link" target="_blank" rel="noopener noreferrer" :href="PPT_LINK">
          <template #icon>
            <OIcon><IconDownload /></OIcon>
          </template>
          {{ t('home.CHARACTERR_INFO.DOWN_NAME') }}
        </OLink>
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.home-feature-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  .home-feature-sub-title {
    margin-top: 12px;
    @include tip1;
  }
}

.home-feature-content {
  border: 2px solid var(--e-color-bg2);
  border-radius: 4px;
  box-sizing: border-box;
  backdrop-filter: blur(32px);
  background: linear-gradient(180deg, rgb(255, 255, 255, 0.45) 0%, rgb(254.74, 254.83, 255, 0.9) 100%);
  padding: 32px;
  @include respond-to('phone') {
    padding: 16px 8px 12px 8px;
  }
}

:root.dark .home-feature-content {
  background: linear-gradient(180deg, rgb(36, 36, 39, 0.45) 0%, rgb(36, 36, 39, 0.9) 100%);
}

.home-feature-content-main {
  display: flex;
  align-items: center;

  .o-divider {
    height: 100%;
    @include respond-to('phone') {
      height: 30px;
    }
  }
}

.home-feature-content-main-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  .feature-item-icon {
    font-size: 40px;
    color: inherit;
  }

  .feature-item-title {
    margin-top: 16px;
    @include respond-to('phone') {
      margin-top: 4px;
    }
    @include h4;
  }

  .feature-item-desc {
    color: var(--o-color-info3);
    margin-top: 8px;
    @include text1;
  }
}

.right-border:not(:last-child) {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.home-feature-content-footer {
  display: flex;
  justify-content: center;
  @include text1;
  margin-top: 40px;

  @include respond-to('phone') {
    margin-top: 20px;
  }
  .o-icon {
    font-size: 24px;
  }
}
</style>
