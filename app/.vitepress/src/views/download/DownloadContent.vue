<script lang="ts" setup>
import { toRefs } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';

import DownloadTable from './DownloadTable.vue';
const props = defineProps({
  contentData: {
    required: true,
    type: Array,
    default: () => {
      return [];
    },
  },
  versionShownIndex: {
    required: true,
    type: Number,
    default: -1,
  },
  downloadVersionAuthIndex: {
    required: true,
    type: Number,
    default: NaN,
  },
});
const i18n = useI18n();
const { lang, theme } = useData();
const { contentData, versionShownIndex, downloadVersionAuthIndex } =
  toRefs(props);
</script>

<template>
  <div class="content-wrap">
    <h2 class="title">{{ 'openGauss ' + (contentData[0] as any).name }}</h2>
    <h4 class="subtitle">{{ (contentData[0] as any).plannedEOL }}</h4>
    <div class="other-link">
      <a
        :href="theme.docsUrl + '/' + lang + (contentData[0] as any).docs_list[0].path"
        target="_blank"
        >{{
          lang === 'zh'
            ? (contentData[0] as any).docs_list[0].name
            : (contentData[0] as any).docs_list[0].nameEn
        }}</a
      ><a href="https://gitee.com/opengauss/community/issues" target="_blank">{{
        i18n.download.FEEDBACK_QUESTION
      }}</a>
    </div>
    <DownloadTable
      v-for="item in (contentData[0] as any).data[lang]"
      :key="item.name"
      :table-data="item"
      :version-shown-index="versionShownIndex"
      :download-version-auth-index="downloadVersionAuthIndex"
    />
  </div>
</template>

<style lang="scss" scoped>
.content-wrap {
  margin-top: var(--o-spacing-h4);
  background-color: var(--o-color-bg2);
  padding: var(--o-spacing-h2) var(--o-spacing-h1);
  box-shadow: var(--o-shadow-l2);
  @media (max-width: 1100px) {
    margin-top: var(--o-spacing-h5);
    padding: var(--o-spacing-h4) var(--o-spacing-h8);
  }
  .title {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .subtitle {
    margin-top: var(--o-spacing-h5);
    text-align: center;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text3);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .other-link {
    margin-top: var(--o-spacing-h5);
    text-align: center;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
    a {
      display: inline-block;
      padding: 0 var(--o-spacing-h5);
      @media (max-width: 1100px) {
        padding: 0 var(--o-spacing-h8);
      }
      &:nth-of-type(1) {
        border-right: 1px solid var(--o-color-border2);
      }
    }
  }
}
</style>
