<script lang="ts" setup>
import { ref, computed, onMounted, provide } from 'vue';
import { useData } from 'vitepress';
import { OTab, OTabPane, ODivider, OTable } from '@opensig/opendesign';
import DownloadConfig from '~@/data/download';
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import AppSection from '~@/components/AppSection.vue';
import DownloadContent from './DownloadContent.vue';

import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';
import { useCommon } from '@/stores/common';
import { getUrlParam } from '~@/utils/common';
import { useI18n } from '~@/i18n';

import BannerImg from '~@/assets/category/download/banner.jpg';

const { isPhone, lePad, lePadV } = useScreen();
const { t, isZh, $t } = useLocale();
const i18n = useI18n();
const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const tabLists = [
  {
    id: 'lts',
    label: t('download.VERSION_LTS'),
  },
  {
    id: 'rc1',
    label: t('download.VERSION_RCX'),
  },
  {
    id: 'all',
    label: t('download.VERSION_ALL'),
  },
];

const tabsIds = tabLists.map((item) => item.id);

// tab切换
const handleTabChange = (val: string) => {
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

onMounted(() => {
  const version = getUrlParam('version');
  if (decodeURIComponent(version) && tabsIds.includes(version)) {
    activeTab.value = version;
  }
});

// 获取版版本数据
const getData = computed(() => {
  return activeTab.value === 'all' ? DownloadConfig : DownloadConfig.find((el) => el.name.includes(activeTab.value.toLocaleUpperCase()));
});

// 下载权限列表
const getPermissionList = computed(() => {
  return DownloadConfig.filter((el) => el.isLogin).map((el) => el.name);
});

provide('VERSION_DATA', getData);
provide('PERMISSION_LIST', getPermissionList);
</script>

<template>
  <BannerLevel2 :title="$t('download.PAGE_TITLE')" :background-image="BannerImg" class="download-banner">
    <p v-for="item in bannerDes" :key="item">
      {{ item }}
    </p>
  </BannerLevel2>

  <ContentWrapper :vertical-padding="['32px', '32px']">
    <OTab v-model="activeTab" variant="text" :line="false" @change="handleTabChange">
      <OTabPane v-for="item in tabLists" :key="item.id" :label="item.label" :value="item.id">
        <div class="download-panel">
          <template v-if="activeTab === 'all'"> all </template>
          <template v-else>
            <DownloadContent :content-data="getData" />
          </template>
        </div>
      </OTabPane>
    </OTab>
  </ContentWrapper>
  <AppSection title="相关工具"> </AppSection>
  <AppSection title="支持与服务"> </AppSection>
</template>

<style lang="scss" scoped>
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
  border-radius: 8px;
  @include respond-to('<=pad') {
    padding: 16px;
  }
}
</style>
