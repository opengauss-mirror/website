<script lang="ts" setup>
import { ref, computed, onMounted, provide, watchEffect } from 'vue';
import { useData, useRouter } from 'vitepress';
import { ORadioGroup, ORadio, OBreadcrumb, OBreadcrumbItem, OSelect, OOption, OIcon } from '@opensig/opendesign';
import DownloadConfig from '~@/data/download';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import DownloadContent from './DownloadContent.vue';
import ArchiveContent from './ArchiveContent.vue';
import { useScreen } from '~@/composables/useScreen';
import { getUrlParams } from '@/shared/utils';

import IconVersion from '~icons/app-new/icon-version.svg';
import { useI18n } from 'vue-i18n';

const { size } = useScreen();
const { lang } = useData();
const router = useRouter();

const activeTab = ref('');
const { locale } = useI18n();
watchEffect(() => (locale.value = lang.value ?? 'zh'));

const timePattern = /^\d{4}\.\d{2}\.\d{2}$/;
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const _downloadData = DownloadConfig.map((item) => {
  let isEol = false;
  if (item.plannedEOL && timePattern.test(item.plannedEOL)) {
    const [y, m] = item.plannedEOL.split('.').map((item: string) => Number(item));
    if (currentYear > y && currentMonth > m) {
      isEol = true;
    }
  }
  return {
    ...item,
    isEol,
  };
});

const getData = computed(() => {
  return activeTab.value === 'all' ? _downloadData : _downloadData.find((el) => el.name.includes(activeTab.value));
});

// 下载权限列表
const getPermissionList = computed(() => {
  return _downloadData.filter((el) => el.isLogin).map((el) => el.name);
});

onMounted(() => {
  const { href } = window.location;
  const paramsArr = getUrlParams(href);
  activeTab.value = decodeURIComponent(paramsArr?.version) || _downloadData[0].name;
});

provide('PERMISSION_LIST', getPermissionList);

const onChange = (option: string) => {
  router.go(`/${lang.value}/download/archive/?version=${option}`);
};
</script>

<template>
  <ContentWrapper :vertical-padding="['32px', '32px']">
    <OBreadcrumb class="app-breadcrumb">
      <OBreadcrumbItem>
        <a :href="`/${lang}/download/`"> {{ $t('common.COMMON_CONFIG.DOWNLOAD') }} </a>
      </OBreadcrumbItem>
      <OBreadcrumbItem>
        <a :href="`/${lang}/download/?version=all`"> {{ $t('download.VERSION_ALL') }} </a>
      </OBreadcrumbItem>
      <OBreadcrumbItem>openGauss {{ activeTab }} </OBreadcrumbItem>
    </OBreadcrumb>
    <div class="download-archive" :class="{ select: size.width <= 1600 }">
      <div class="archive-side">
        <template v-if="size.width > 1600">
          <h3>
            <OIcon><IconVersion /></OIcon>{{ $t('download.VERSIONS') }}
          </h3>
          <ORadioGroup direction="v" v-model="activeTab" @change="onChange">
            <ORadio
              v-for="option in DownloadConfig"
              :key="option.name"
              :value="option.name"
              v-analytics="{
                properties: {
                  module: 'download',
                  level1: $t('common.COMMON_CONFIG.DOWNLOAD'),
                  level2: $t('download.VERSION_ALL'),
                  level3: $t('download.VERSIONS'),
                  target: 'openGauss' + option.name,
                },
              }"
            >
              openGauss {{ option.name }}
            </ORadio>
          </ORadioGroup>
        </template>
        <OSelect v-else size="large" v-model="activeTab" @change="onChange">
          <OOption
            v-for="item in DownloadConfig"
            :key="item.name"
            :value="item.name"
            :label="item.name"
            v-analytics="{
              properties: {
                module: 'download',
                level1: $t('common.COMMON_CONFIG.DOWNLOAD'),
                level2: $t('download.VERSION_ALL'),
                level3: $t('download.VERSIONS'),
                target: 'openGauss' + option.name,
              },
            }"
          >
            openGauss {{ item.name }}
          </OOption>
        </OSelect>
      </div>
      <div class="archive-main">
        <div class="archive-content">
          <DownloadContent
            v-if="getData?.newLayout"
            :content-data="getData"
            v-analytics.catchBubble="{
              properties: {
                module: 'download',
                level1: $t('common.COMMON_CONFIG.DOWNLOAD'),
                level2: $t('download.VERSION_ALL'),
              },
            }"
          />
          <ArchiveContent v-else :content-data="getData" />
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<style lang="scss" scoped>
.archive-content {
  border-radius: 4px;
  background: var(--o-color-fill2);
  padding: 32px;
  @include respond-to('<=pad') {
    padding: 16px;
  }
}
.download-archive {
  display: flex;
  margin-top: 24px;
  &.select {
    flex-direction: column;
    margin-top: 16px;
    .archive-main {
      width: 100%;
      flex: 1;
      margin-left: 0;
    }
    .archive-side {
      margin-bottom: 16px;
    }
  }

  .archive-side {
    flex: 1;

    h3 {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      @include text2;
      @include respond-to('<=pad') {
        margin-bottom: 8px;
      }
      .o-icon {
        margin-right: 8px;
        font-size: 24px;
      }
    }
    :deep(.o-select) {
      min-width: 312px;
    }
    :deep(.o-radio-group-v) {
      align-items: flex-start;
      padding-left: 32px;
      .o-radio + .o-radio {
        margin-left: 0;
      }
    }
  }
  .archive-main {
    margin-left: 32px;
    width: 1180px;

    .app-breadcrumb {
      margin-bottom: 24px;
      @include respond-to('<=pad') {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
