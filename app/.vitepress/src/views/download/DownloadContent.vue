<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';

import DownloadTable from './DownloadTable.vue';
import { GITCODE_LINK, DOCS_LINK } from '@/data/url-config';
const props = defineProps({
  contentData: {
    required: true,
    type: Array,
    default: () => {
      return [];
    },
  },
  versionShown: {
    required: true,
    type: String,
    default: '',
  },
  downloadVersionAuth: {
    required: true,
    type: Array,
    default: () => {
      return [];
    },
  },
});
const i18n = useI18n();
const { lang } = useData();
const { contentData, versionShown, downloadVersionAuth } = toRefs(props);
const explainLink = computed(() => {
  return (contentData.value[0] as any).docs_list[0][lang.value === 'zh' ? 'path' : 'pathEn'];
});
</script>

<template>
  <div class="download-content">
    <h2 class="title">{{ 'openGauss ' + (contentData[0] as any).name }}</h2>
    <h4 class="subtitle">{{ (contentData[0] as any).plannedEOL }}</h4>
    <div class="other-link">
      <a :href="explainLink.startsWith('/docs/') ? DOCS_LINK + lang + explainLink : explainLink" target="_blank" rel="noopener noreferrer"
        >{{ lang === 'zh' ? (contentData[0] as any).docs_list[0].name : (contentData[0] as any).docs_list[0].nameEn }}
      </a>
      <a :href="GITCODE_LINK + 'opengauss/community/issues'" target="_blank" rel="noopener noreferrer">{{ i18n.download.FEEDBACK_QUESTION }} </a>
    </div>
    <DownloadTable
      v-for="item in (contentData[0] as any).data[lang]"
      :key="item.name"
      :table-data="item"
      :version-shown="versionShown"
      :download-version-auth="downloadVersionAuth"
    />
  </div>
</template>

<style lang="scss" scoped>
.download-content {
  margin-top: var(--e-spacing-h4);
  background-color: var(--e-color-bg2);
  padding: var(--e-spacing-h2) var(--e-spacing-h1);
  box-shadow: var(--e-shadow-l2);
  @media (max-width: 1100px) {
    margin-top: var(--e-spacing-h5);
    padding: var(--e-spacing-h4) var(--e-spacing-h8);
  }
  .title {
    text-align: center;
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    color: var(--e-color-text1);
    @media (max-width: 1100px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }
  .subtitle {
    margin-top: var(--e-spacing-h5);
    text-align: center;
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
    color: var(--e-color-text3);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h8);
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
  .other-link {
    margin-top: var(--e-spacing-h5);
    text-align: center;
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h8);
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
    a {
      display: inline-block;
      padding: 0 var(--e-spacing-h5);
      @media (max-width: 1100px) {
        padding: 0 var(--e-spacing-h8);
      }
      &:nth-of-type(1) {
        border-right: 1px solid var(--e-color-border2);
      }
    }
  }
}
</style>
