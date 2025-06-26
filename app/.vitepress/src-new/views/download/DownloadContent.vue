<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { useI18n } from '~@/i18n';
import { useData } from 'vitepress';
import { OLink, ODivider } from '@opensig/opendesign';

import DownloadSection from './DownloadSection.vue';
import { GITCODE_LINK, DOCS_LINK } from '~@/data/url-config';
const props = defineProps({
  contentData: {
    required: true,
    type: Array,
    default: () => {
      return [];
    },
  },
});
const i18n = useI18n();
const { lang } = useData();
const { contentData } = toRefs(props);
const explainLink = computed(() => {
  return contentData.value.docs_list[0][lang.value === 'zh' ? 'path' : 'pathEn'];
});
</script>

<template>
  <div class="download-content">
    <h2 class="title">{{ 'openGauss ' + contentData.name }}</h2>
    <h4 class="subtitle">维护截止时间：{{ contentData.plannedEOL }}</h4>
    <div class="other-link">
      <OLink color="primary" :href="explainLink.startsWith('/docs/') ? DOCS_LINK + lang + explainLink : explainLink" target="_blank" rel="noopener noreferrer"
        >{{ lang === 'zh' ? contentData.docs_list[0].name : contentData.docs_list[0].nameEn }}
      </OLink>
      <ODivider direction="v" />
      <OLink color="primary" :href="`${GITCODE_LINK}opengauss/community/issues`" target="_blank" rel="noopener noreferrer"
        >{{ i18n.download.FEEDBACK_QUESTION }}
      </OLink>
      <ODivider direction="v" />
      <OLink color="primary" :href="`/${lang}/download/life-cycle/`" target="_blank" rel="noopener noreferrer">{{ i18n.download.lifeCycle }} </OLink>
    </div>
    <p v-if="contentData.desc" class="desc">{{ contentData.desc }}</p>
    <ODivider class="divider-line" />

    <template v-for="item in contentData.data[lang]" :key="item.name">
      <template v-if="item.name === 'openGauss Server' || item.name === 'openGauss Connectors'">
        <DownloadSection :table-data="item" :version-shown="contentData.name" />
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
