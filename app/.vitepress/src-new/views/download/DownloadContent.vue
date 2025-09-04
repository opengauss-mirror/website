<script lang="ts" setup>
import { toRefs, computed, PropType, provide } from 'vue';
import { useI18n } from '~@/i18n';
import { useData } from 'vitepress';
import { OLink, ODivider, OTag } from '@opensig/opendesign';
import { DownloadItem } from '~@/@types/type-download';
import DownloadSection from './DownloadSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { GITCODE_LINK, DOCS_LINK } from '~@/data/url-config';
const props = defineProps({
  contentData: {
    required: true,
    type: Object as PropType<DownloadItem>,
    default: () => {
      return {};
    },
  },
});
const i18n = useI18n();
const { lang } = useData();
const { isZh } = useLocale();
const { contentData } = toRefs(props);
const explainLink = computed(() => {
  return contentData.value?.docs_list[0][lang.value === 'zh' ? 'path' : 'pathEn'] || '';
});

const newData = computed(() => {
  const data = contentData.value?.data?.[lang.value];
  const res = [...new Set(data.map((item) => item.category))].map((item) => {
    return {
      name: item,
      content: [],
    };
  });

  res.forEach((item) => {
    item.content = data.filter((subItem) => subItem.category === item.name);
  });

  return res || [];
});

provide('DOWNLOAD_VERSION_DATA', newData);

const getNewLink = (path: string) => {
  const link = `${DOCS_LINK}/${lang.value}${path}`;
  return path.startsWith('/docs/') ? link : path;
};
</script>

<template>
  <div class="download-content">
    <h2 class="title">{{ 'openGauss ' + contentData.name }} <OTag v-if="contentData.plannedEOL === 'End-of-Life' || contentData.isEol"> 停止维护 </OTag></h2>
    <h4 class="subtitle">{{ $t('download.EOM_DATE') }} ：{{ contentData.plannedEOL }}</h4>
    <div class="other-link">
      <template v-for="item in contentData.docs_list" :key="item.name">
        <OLink color="primary" :href="getNewLink(explainLink)" target="_blank" rel="noopener noreferrer">{{ isZh ? item.name : item.nameEn }} </OLink>
        <ODivider direction="v" />
      </template>
      <OLink color="primary" :href="`${GITCODE_LINK}/opengauss/community/issues`" target="_blank" rel="noopener noreferrer"
        >{{ i18n.download.FEEDBACK_QUESTION }}
      </OLink>
      <ODivider direction="v" />
      <OLink color="primary" :href="`/${lang}/download/life-cycle/`" target="_blank" rel="noopener noreferrer">{{ i18n.download.lifeCycle }} </OLink>
    </div>
    <p v-if="contentData.desc" class="desc">{{ lang === 'zh' ? contentData.desc : contentData.desc_en || contentData.desc }}</p>
    <ODivider class="divider-line" />

    <template v-for="item in newData" :key="item.name">
      <template v-if="item.name === 'openGauss Server' || item.name === 'openGauss Connectors'">
        <DownloadSection :table-data="item" :version-shown="contentData.name" :version-capability="contentData.versionCapabilityPath" />
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.download-content {
  color: var(--o-color-info2);
  .title {
    @include h1;
    color: var(--o-color-info1);
    display: flex;
    align-items: center;
    gap: 32px;
    font-weight: 500;

    .o-tag {
      --tag-height: 32px;
      --tag-bg-color: var(--o-color-control2-light);
      --tag-bd-color: var(--o-color-control2-light);
      :deep(.o-tag-label) {
        @include text1;
      }
    }
  }
  .subtitle {
    margin-top: 8px;
    @include text1;
  }
  .other-link {
    margin-top: 16px;
    @include text1;
    @include respond-to('<=pad_v') {
      margin-top: 8px;
    }
  }
  .divider-line {
    --o-divider-gap: 32px;
    @include respond-to('<=pad_v') {
      --o-divider-gap: 16px;
    }
  }
  .desc {
    margin-top: 8px;
    @include text1;
  }
}
</style>
