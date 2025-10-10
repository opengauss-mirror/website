<script setup lang="ts">
import { OIcon, OLink } from '@opensig/opendesign';
import IconDownload from '~icons/app/icon-download.svg';
import AppSection from '~@/components/AppSection.vue';
import { useI18n } from '@/i18n';

import feature1 from '~icons/app-new/icon-feature1.svg';
import feature2 from '~icons/app-new/icon-feature2.svg';
import feature3 from '~icons/app-new/icon-feature3.svg';
import feature4 from '~icons/app-new/icon-feature4.svg';
import { LEARN_VIDEO_LINK } from '~@/data/url-config';

const i18n = useI18n();

const PPT_LINK = `${LEARN_VIDEO_LINK}/openGauss%20%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84.pptx`;

const icons = [feature1, feature2, feature3, feature4];
</script>

<template>
  <AppSection title="数据库特性" :subtitle="i18n.home.CHARACTERR_INFO.TITLE">
    <div class="home-feature-content">
      <div class="home-feature-content-main">
        <div class="home-feature-content-main-item" v-for="(item, index) in i18n.home.CHARACTERR_INFO.LIST">
          <OIcon class="feature-item-icon"><component :is="icons[index]" /></OIcon>
          <p class="feature-item-title">{{ item.NAME }}</p>
          <p class="feature-item-desc">{{ item.TEXT }}</p>
        </div>
      </div>
      <div class="home-feature-content-footer">
        <OLink target="_blank" rel="noopener noreferrer" :href="PPT_LINK">
          <template #icon>
            <OIcon><IconDownload /></OIcon>
          </template>
          openGauss整体概述PPT
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
  border-radius: 4px;
  padding: 32px;
  background-color: var(--e-color-bg2);
}

.home-feature-content-main {
  display: flex;
}

.home-feature-content-main-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:last-child) {
    border-right: 1px solid rgba($color: #000000, $alpha: 0.1);
  }

  .feature-item-icon {
    font-size: 40px;
    color: inherit;
  }

  .feature-item-title {
    margin-top: 16px;
    @include h4;
  }

  .feature-item-desc {
    color: var(--o-color-info3);
    margin-top: 8px;
    @include text1;
  }
}

.home-feature-content-footer {
  display: flex;
  justify-content: center;
  @include text1;
  margin-top: 40px;

  .o-icon {
    font-size: 24px;
  }
}
</style>
