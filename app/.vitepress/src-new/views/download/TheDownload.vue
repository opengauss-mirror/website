<script lang="ts" setup>
import { ref, computed, onMounted, watchEffect, nextTick, onUnmounted } from 'vue';
import { useData } from 'vitepress';
import { OTab, OTabPane } from '@opensig/opendesign';
import DownloadConfig from '~@/data/download/content-bridge';
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import AppSection from '~@/components/AppSection.vue';
import DownloadContent from './DownloadContent.vue';

import { useLocale } from '~@/composables/useLocale';
import { getUrlParam } from '~@/utils/common';
import { useI18n } from '~@/i18n';

import BannerImg from '~@/assets/category/download/banner.jpg';
import DownloadAll from './DownloadAll.vue';
import RelativeTools from './support-tools/RelativeTools.vue';
import SupportServices from './support-tools/SupportServices.vue';
import { oaReport } from '@opendesign-plus/plugins/analytics';

const { t, $t, locale } = useLocale();
const { lang } = useData();
const i18n = useI18n();

watchEffect(() => (locale.value = lang.value ?? 'zh'));

const tabLists = [
  {
    id: 'lts',
    label: t('download.VERSION_LTS'),
  },
  {
    id: 'rc',
    label: t('download.VERSION_RCX'),
  },
  {
    id: 'all',
    label: t('download.VERSION_ALL'),
  },
];

const tabsIds = tabLists.map((item) => item.id);

const reportTabChange = (val: string) => {
  const tab = tabLists.find((item) => item.id === val);
  if (tab) {
    oaReport('click', {
      module: 'download',
      level1: $t('download.PAGE_TITLE'),
      target: tab.label,
      type: 'tab',
    });
  }
};

// tab切换
const handleTabChange = (val: string) => {
  reportTabChange(val);
  const { pathname } = window.location;
  if (val && tabsIds.includes(val)) {
    activeTab.value = val;
    history.replaceState(null, '', `${pathname}?version=${val}`);
  }
};
// 当前选中tab
const activeTab = ref(tabLists[0].id);

// banner描述
const bannerDes = computed(() => i18n.value.download.DESCRIPTION);

let pushState: typeof History.prototype.pushState;
onMounted(() => {
  pushState = History.prototype.pushState;
  History.prototype.pushState = function (...args) {
    pushState.apply(this, args);
    nextTick(() => {
      if (location.pathname.startsWith('/zh/download') || location.pathname.startsWith('/en/download')) {
        const version = new URLSearchParams(location.search).get('version');
        if (version && activeTab.value !== version) {
          activeTab.value = version;
        }
      }
    });
  }
  const version = getUrlParam('version');
  if (decodeURIComponent(version) && tabsIds.includes(version)) {
    activeTab.value = version;
  }
});

onUnmounted(() => {
  if (pushState) {
    History.prototype.pushState = pushState;
  }
});

// 获取版版本数据
const getData = computed(() => {
  if (activeTab.value === 'all') {
    return DownloadConfig;
  }
  const found = DownloadConfig.find((el) => el.name?.includes(activeTab.value.toLocaleUpperCase()));
  return found || DownloadConfig[0];
});

</script>

<template>
  <BannerLevel2 :title="$t('download.PAGE_TITLE')" :background-image="BannerImg" class="download-banner">
    <p v-for="item in bannerDes" :key="item">
      {{ item }}
    </p>
  </BannerLevel2>

  <ContentWrapper :vertical-padding="['32px', '32px']">
    <OTab v-model="activeTab" variant="text" :line="false" @change="handleTabChange" :lazy="true">
      <OTabPane v-for="item in tabLists" :key="item.id" :label="item.label" :value="item.id" >
        <div
          class="download-panel"
          v-analytics.catchBubble="{
            properties: {
              module: 'download',
              level1: $t('download.PAGE_TITLE'),
              level2: item.label,
            },
          }"
        >
          <template v-if="activeTab === 'all'">
            <DownloadAll />
          </template>
          <template v-else>
            <DownloadContent :content-data="getData" />
          </template>
        </div>
      </OTabPane>
    </OTab>
  </ContentWrapper>
  <AppSection
    :title="$t('download.RELATED_TOOLS')"
    v-analytics.catchBubble="{
      properties: {
        module: 'download',
        level1: $t('download.PAGE_TITLE'),
        level2: $t('download.RELATED_TOOLS'),
      },
    }"
  >
    <RelativeTools />
  </AppSection>
  <AppSection :title="$t('tools.SUPPORT_SERVICES')">
    <SupportServices
      v-analytics.catchBubble="{
        properties: {
          module: 'download',
          level1: $t('download.PAGE_TITLE'),
          level2: $t('tools.SUPPORT_SERVICES'),
        },
      }"
    />
  </AppSection>
</template>

<style lang="scss" scoped>
:deep(.o-table thead::after) {
  display: none;
}
.banner-level2 {
  @include respond-to('<=pad_v') {
    background: none;
    :deep(.banner-bg) {
      display: none;
    }
    :deep(.wrap) {
      height: auto;
      .banner-text {
        max-width: 100%;
        padding: 16px 0 0;
        color: var(--o-color-info2);
      }
      .banner-title {
        text-align: center;
      }
    }
  }
}
.download-panel {
  border-radius: 4px;
  background: var(--o-color-fill2);
  padding: 32px;
  margin-top: 24px;
  @include respond-to('<=pad') {
    padding: 16px;
  }
}
</style>
