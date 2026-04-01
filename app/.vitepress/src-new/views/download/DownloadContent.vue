<script lang="ts" setup>
import { toRefs, computed, PropType, provide } from 'vue';
import { useI18n } from '~@/i18n';
import { useData } from 'vitepress';
import { OLink, ODivider, OTag, OTab, OTabPane } from '@opensig/opendesign';
import { DownloadItem } from '~@/@types/type-download';
import DownloadSection from './DownloadSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { GITCODE_LINK, DOCS_LINK } from '~@/data/url-config';
import { downloadName } from '~@/data/download/format';
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
  const data = (contentData.value?.data as { zh: any[]; en: any[] })?.[lang.value as 'zh' | 'en'];
  const res = [...new Set(data.map((item) => item.category))].map((item) => {
    return {
      name: item as string,
      content: [] as any[],
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

const hasOgracData = computed(() => newData.value.some((i) => (i.name as string)?.startsWith('oGRAC')));
</script>

<template>
  <div class="download-content">
    <h2 class="title">{{ 'openGauss ' + contentData.name }} <OTag v-if="contentData.plannedEOL === 'End-of-Life' || contentData.isEol"> 停止维护 </OTag></h2>
    <h4 class="subtitle">{{ $t('download.EOM_DATE') }} ：{{ contentData.plannedEOL }}</h4>
    <div class="other-link">
      <template v-if="!hasOgracData">
        <template v-for="item in contentData.docs_list" :key="item.name">
          <OLink
            color="primary"
            :href="getNewLink(explainLink)"
            target="_blank"
            rel="noopener noreferrer"
            v-analytics.bubble.addUrl="
              (ev: any) => ({
                to: ev.currentTarget.href,
                target: isZh ? item.name : item.nameEn,
                level3: 'openGauss ' + contentData.name,
              })
            "
            >{{ isZh ? item.name : item.nameEn }}
          </OLink>
          <ODivider direction="v" />
        </template>
      </template>
      <OLink
        color="primary"
        :href="`${GITCODE_LINK}/opengauss/community/issues`"
        target="_blank"
        rel="noopener noreferrer"
        v-analytics.bubble.addUrl="
          (ev: any) => ({
            to: ev.currentTarget.href,
            target: i18n.download.FEEDBACK_QUESTION,
            level3: 'openGauss ' + contentData.name,
          })
        "
        >{{ i18n.download.FEEDBACK_QUESTION }}
      </OLink>
      <ODivider direction="v" />
      <OLink
        color="primary"
        :href="`/${lang}/download/life-cycle/`"
        target="_blank"
        rel="noopener noreferrer"
        v-analytics.bubble.addUrl="
          (ev: any) => ({
            to: ev.currentTarget.href,
            target: i18n.download.lifeCycle,
            level3: 'openGauss ' + contentData.name,
          })
        "
        >{{ i18n.download.lifeCycle }}
      </OLink>
    </div>
    <p v-if="contentData.desc" class="desc">{{ lang === 'zh' ? contentData.desc : contentData.desc_en || contentData.desc }}</p>
    <ODivider v-if="!hasOgracData" class="divider-line" />

    <template v-if="hasOgracData">
      <!-- opengauss/ograc数据库 -->
      <OTab variant="text" size="medium" round="pill" line style="margin-top: 32px">
        <OTabPane :label="lang === 'zh' ? downloadName['openGauss Server'] : 'openGauss Server'">
          <template v-for="item in newData" :key="item.name">
            <template v-if="item.name === 'openGauss Server'">
              <DownloadSection
                :hide-title="true"
                :table-data="item"
                :version-shown="contentData.name"
                :version-capability="contentData.versionCapabilityPath"
                :release-notes="contentData.releaseNotesDocs"
              />
            </template>
          </template>
        </OTabPane>
        <OTabPane :label="lang === 'en' ? 'oGRAC Server' : 'oGRAC数据库'">
          <template v-for="item in newData" :key="item.name">
            <template v-if="item.name === 'oGRAC Server'">
              <DownloadSection
                :hide-title="true"
                :table-data="item"
                :version-shown="contentData.name"
                :version-capability="contentData.versionCapabilityPath"
                :release-notes="contentData.releaseNotesDocs"
                :is-ograc="true"
              />
            </template>
          </template>
        </OTabPane>
      </OTab>

      <!-- opengauss/ograc驱动 -->
      <OTab variant="text" size="medium" round="pill" line style="margin-top: 32px">
        <OTabPane :label="lang === 'zh' ? downloadName['openGauss Connectors'] : 'openGauss Connectors'">
          <template v-for="item in newData" :key="item.name">
            <template v-if="item.name === 'openGauss Connectors'">
              <DownloadSection
                :hide-title="true"
                :table-data="item"
                :version-shown="contentData.name"
                :version-capability="contentData.versionCapabilityPath"
              />
            </template>
          </template>
        </OTabPane>
        <OTabPane :label="lang === 'en' ? 'oGRAC Connectors' : 'oGRAC驱动'">
          <template v-for="item in newData" :key="item.name">
            <template v-if="item.name === 'oGRAC Connectors'">
              <DownloadSection
                :hide-title="true"
                :table-data="item"
                :version-shown="contentData.name"
                :version-capability="contentData.versionCapabilityPath"
                :is-ograc="true"
              />
            </template>
          </template>
        </OTabPane>
      </OTab>
    </template>

    <!-- opengauss数据库/驱动 -->
    <template v-else>
      <template v-for="item in newData" :key="item.name">
        <template v-if="item.name === 'openGauss Server' || item.name === 'openGauss Connectors'">
          <DownloadSection :table-data="item" :version-shown="contentData.name" :version-capability="contentData.versionCapabilityPath" />
        </template>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
:deep(.o-tab-navs) {
  justify-content: start;
}
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
