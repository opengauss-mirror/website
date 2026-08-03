<script lang="ts" setup>
import { ref, computed, watch, toRefs, onMounted, inject, nextTick, PropType, Ref } from 'vue';
import { ORadioGroup, ORadio, OToggle, OIcon, OTab, OTabPane, OSelect, OOption, OLayer, OLink } from '@opensig/opendesign';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import { useScreen } from '~@/composables/useScreen';
import { downloadName } from '~@/data/download/content-bridge';
import { useCommon } from '@/stores/common';

import { DownloadItemT } from '@/shared/@types/type-download';

import { getCustomCookie } from '@/shared/utils';
import { useLocale } from '~@/composables/useLocale';

import TagFilter from '~@/components/TagFilter.vue';
import DownloadContentItem from './DownloadContentItem.vue';
import DownloadTable from './DownloadTable.vue';

import { oaReport } from '@opendesign-plus/plugins/analytics';
import IconRight from '~icons/app/icon-chevron-right.svg';
import IconLeft from '~icons/app-new/icon-arrow-left.svg';

const props = defineProps({
  tableData: {
    required: true,
    type: Object as PropType<{ name: string; content: any[] }>,
    default: () => ({}),
  },
  versionShown: {
    required: true,
    type: String,
    default: '',
  },
  versionCapability: {
    required: true,
    type: String,
    default: '',
  },
  hideTitle: {
    type: Boolean,
    required: false,
    default: false,
  },
  isOgrac: {
    type: Boolean,
    required: false,
  },
  releaseNotes: {
    type: Object as PropType<{ openGauss: string; openGaussEn?: string; ograc?: string; ogracEn?: string }>,
    required: false,
  },
});
const { tableData, versionShown } = toRefs(props);

const { lang } = useData();
const { t } = useLocale();
const i18n = useI18n();
const { gtPadV } = useScreen();
const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');

const currentVersionServersAndConnectors = inject<Ref<{ name: string; content: any }[]>>('DOWNLOAD_VERSION_DATA', ref([]));
// 获取筛选数据
const getFilterData = (name: string) => {
  let res = [];
  const serverItem = currentVersionServersAndConnectors.value.find((item) => item.name === name);
  if (serverItem) {
    res = serverItem.content.filter((contentItem: any) => contentItem.architecture === activeArchitecture.value && contentItem.os === activeOs.value);
  }
  return res;
};

const isCn = computed(() => lang.value === 'zh');

// tag筛选
const architectureList = computed(() => {
  return [...new Set(tableData.value.content.map((item) => item.architecture))];
});

const osList = computed(() => {
  return [...new Set(tableData.value.content.map((item) => item.os))];
});

const activeArchitecture = ref('');
const activeOs = ref('');
const initActiveTag = function () {
  if (tableData.value.content && tableData.value.content.length > 0) {
    activeArchitecture.value = tableData.value.content[0].architecture;
    activeOs.value = tableData.value.content[0].os;
  }
};

const isLoading = ref(false); //强制刷新tabs页签
const setRenderData = () => {
  isLoading.value = true;

  nextTick(() => {
    updateSymbolData();
  });
};

const updateSymbolData = () => {
  symbolData.value = getFilterData(`${props.isOgrac ? 'oGRAC' : 'openGauss'} Symbol`);
  isLoading.value = false;
};

// 替换空格
const replaceSpace = (v: string) => {
  return v.replace(/ /g, '-');
};

onMounted(() => {
  // 迁移专区跳转锚点显示
  if (window.location.hash) {
    setTimeout(() => {
      const toolId = window.location.hash?.split('#')[1] as string;
      const top = document.getElementById(toolId)?.offsetTop;
      (document.getElementById('anchor-sticky-demo') ?? window).scrollTo({
        top,
        behavior: 'smooth',
      });
    }, 300);
  }
});

// 控制不能组合的tag的禁用
const tempTag = ref('');
const setTempTag = () => {
  const matchedItem = tableData.value.content.find((item: DownloadItemT) => item.architecture === activeArchitecture.value);
  if (matchedItem) {
    tempTag.value = matchedItem.os;
  }
};

const isDisable = (tag: string) => {
  const isAvailable = tableData.value.content.some((item: DownloadItemT) => item.architecture === activeArchitecture.value && item.os === tag);

  if (!isAvailable && activeOs.value === tag) {
    activeOs.value = tempTag.value;
  }

  return !isAvailable;
};

watch(
  () => [activeOs.value, activeArchitecture.value],
  () => {
    if (activeArchitecture.value) {
      setTempTag();
    }
    setRenderData();
  }
);

watch(
  () => tableData.value.content,
  () => {
    initActiveTag();
    setTempTag();
    setRenderData();
  },
  {
    immediate: true,
  }
);

// 下载埋点
const collectDownloadData = (name: string) => {
  const { href } = window.location;
  const downloadTime = new Date();
  const _U_T_ = getCustomCookie('_U_T_') || 'notLog';
  oaReport('download', {
    profileType: 'download',
    origin: href,
    softwareName: name,
    softwareArchitecture: activeArchitecture.value,
    softwareOs: activeOs.value,
    downloadTime,
    _U_T_,
  });
};

// 类型转换
const mappingType: Record<string, string> = {
  enterprise: '企业版',
  simple: '极简版',
  lite: '轻量版',
  distributed: '分布式镜像',
  'enterprise-noLSE': '企业版(noLSE)',
};

const serverTab = ref();
const symbolData = ref<any[]>([]);

const filteredData = computed(() => {
  return props.tableData.content.filter((item: any) => item.architecture === activeArchitecture.value && item.os === activeOs.value);
});

watch(filteredData, () => {
  if (filteredData.value && filteredData.value.length > 0) {
    serverTab.value = filteredData.value[0].edition;
  }
});

const layerShow = ref(false);
const layerData = ref();
const changeLayer = (item: any) => {
  layerData.value = item;
  serverTab.value = item.edition;
  layerShow.value = !layerShow.value;
};

const tabLists = {
  lts: t('download.VERSION_LTS'),
  rc: t('download.VERSION_RCX'),
  all: t('download.VERSION_ALL'),
} as Record<string, string>;

const reportTabChange = (val: string) => {
  const tabLabel = mappingType[val] || val;
  const versionMatch = location.search.match(/version=(.+)/);
  const versionKey = versionMatch ? versionMatch[1] : 'lts';
  oaReport('click', {
    module: 'download',
    level1: t('download.PAGE_TITLE'),
    level2: tabLists[versionKey] || tabLists.lts,
    level3: 'openGauss ' + props.versionShown,
    level4: isCn.value ? downloadName[props.tableData.name] : props.tableData.name,
    target: tabLabel,
    type: 'tab',
  });
};
</script>
<template>
  <div
    :id="replaceSpace(tableData.name) + '-' + replaceSpace(versionShown)"
    class="content-item"
    v-analytics.bubble.noTrigger="{
      level3: 'openGauss ' + props.versionShown,
      level4: isCn ? downloadName[tableData.name] : tableData.name,
      architecture: activeArchitecture,
      os: activeOs,
    }"
  >
    <h3 v-if="!hideTitle">{{ isCn ? downloadName[tableData.name] : tableData.name }}</h3>

    <template v-if="releaseNotes">
      <p class="release-notes-url" v-if="lang === 'zh'">
        请前往文档中心，直接查看<OLink color="primary" :href="isOgrac ? releaseNotes.ograc : releaseNotes.openGauss" hover-underline
          >{{ isOgrac ? 'oGRAC' : 'openGauss' }}数据库发行说明</OLink
        >。
      </p>
      <p class="release-notes-url" v-else>
        View the
        <OLink color="primary" :href="isOgrac ? releaseNotes.ogracEn || releaseNotes.ograc : releaseNotes.openGaussEn || releaseNotes.openGauss" hover-underline
          >{{ isOgrac ? 'oGRAC' : 'openGauss' }} release notes</OLink
        >
        in the Document Center.
      </p>
    </template>

    <div class="filter-card">
      <TagFilter class="architecture-box" :label="i18n.download.ARCHITECTURE">
        <ORadioGroup v-model="activeArchitecture">
          <template v-for="item in architectureList">
            <ORadio v-if="item" :value="item" :key="item" class="radio">
              <template #radio="{ checked }">
                <OToggle
                  :checked="checked"
                  v-analytics.bubble="{
                    level4: isCn ? downloadName[tableData.name] : tableData.name,
                    level5: i18n.download.ARCHITECTURE,
                    target: item,
                    type: 'architecture',
                  }"
                  >{{ item }}</OToggle
                >
              </template>
            </ORadio>
          </template>
        </ORadioGroup>
      </TagFilter>
      <TagFilter class="os-box" :label="i18n.download.OS">
        <ORadioGroup v-if="gtPadV" v-model="activeOs">
          <ORadio v-for="item in osList" :key="item" :value="item" :disabled="isDisable(item)" class="radio">
            <template #radio="{ checked, disabled }">
              <OToggle
                :checked="checked"
                :disabled="disabled"
                v-analytics.bubble="{
                  level4: isCn ? downloadName[tableData.name] : tableData.name,
                  level5: i18n.download.OS,
                  target: item,
                  type: 'os',
                }"
                >{{ item }}</OToggle
              >
            </template>
          </ORadio>
        </ORadioGroup>
        <OSelect v-else v-model="activeOs" size="large">
          <OOption v-for="item in osList" :disabled="isDisable(item)" :key="item" :label="item" :value="item" />
        </OSelect>
      </TagFilter>
    </div>

    <div class="download-pc">
      <template v-if="tableData.name?.endsWith('Server')">
        <!-- openGauss Server -->
        <OTab
          class="software-type-tab"
          v-if="gtPadV && !isLoading"
          v-model="serverTab"
          variant="text"
          :line="false"
          :class="{ en: !isCn, dark: isDark }"
          @change="reportTabChange"
        >
          <OTabPane v-for="item in filteredData" :key="item.edition" :label="isCn ? mappingType[item.edition] : item.edition" :value="item.edition">
            <div class="download-panel">
              <p v-if="!isOgrac" class="edition-text">
                {{ t('download.' + item.edition) }}
                <template v-if="versionCapability">
                  {{ t('download.versionCapability') }}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="versionCapability"
                    v-analytics.bubble.addUrl="
                      (ev: MouseEvent) => ({
                        to: ev.target.href,
                        level3: 'openGauss ' + props.versionShown,
                        level4: isCn ? downloadName[tableData.name] : tableData.name,
                        level5: mappingType[item.edition],
                        target: $t('download.capabilityMatrix'),
                      })
                    "
                    >&ensp;{{ $t('download.capabilityMatrix') }}
                  </a></template
                >
              </p>
              <p class="caption">{{ $t('download.TABLE_HEAD[2]') }}</p>
              <DownloadContentItem
                :data="item"
                :version-shown="versionShown"
                @report="collectDownloadData"
                v-analytics.bubble.noTrigger="{ level5: mappingType[item.edition], level6: $t('download.TABLE_HEAD[2]') }"
              />

              <!-- openGauss Symbol -->
              <div v-if="symbolData.length && serverTab === 'enterprise'" class="symbol-enterprise">
                <p class="caption">{{ isCn ? downloadName['openGauss Symbol'] : 'openGauss Symbol' }}</p>
                <DownloadContentItem
                  v-for="subitem in symbolData"
                  :key="subitem.sha_code"
                  :data="subitem"
                  :version-shown="versionShown"
                  type="symbol"
                  @download="collectDownloadData"
                  v-analytics.bubble.noTrigger="{ level5: mappingType[item.edition], level6: isCn ? downloadName['openGauss Symbol'] : 'openGauss Symbol' }"
                />
              </div>
            </div>
          </OTabPane>
        </OTab>
        <ul v-else class="server-list">
          <li v-for="item in filteredData" :key="item.sha_code">
            <div @click="changeLayer(item)" class="server-item">
              <p class="title">{{ mappingType[item.edition] }}</p>
              <OIcon><IconRight /></OIcon>
            </div>
          </li>
        </ul>
        <OLayer v-if="layerShow && !gtPadV" v-model:visible="layerShow" :unmount-on-hide="false">
          <div class="edition-wrap">
            <div class="edition-head">
              <OIcon @click="layerShow = false"><IconLeft /></OIcon>
              {{ mappingType[layerData.edition] }}
            </div>
            <div class="edition-main">
              <div class="edition-panel">
                <p class="text">
                  {{ t('download.' + layerData.edition) }}
                  <template v-if="versionCapability"
                    >{{ t('download.versionCapability') }}<a target="_blank" rel="noopener noreferrer" :href="versionCapability">版本能力矩阵图</a></template
                  >
                </p>
                <p class="caption">软件包下载</p>
                <DownloadContentItem :data="layerData" :version-shown="versionShown" @report="collectDownloadData" />

                <!-- openGauss Symbol -->
                <div v-if="symbolData && serverTab === 'enterprise'" class="symbol-enterprise">
                  <p class="caption">{{ isCn ? downloadName['openGauss Symbol'] : 'openGauss Symbol' }}</p>
                  <DownloadContentItem
                    v-for="subitem in symbolData"
                    :key="subitem.sha_code"
                    :data="subitem"
                    :version-shown="versionShown"
                    type="symbol"
                    @download="collectDownloadData"
                  />
                </div>
              </div>
            </div>
          </div>
        </OLayer>
      </template>
    </div>
    <!-- openGauss Connectors -->
    <DownloadTable v-if="tableData.name.endsWith(' Connectors')" :options="filteredData" :versionShown="versionShown" @report="collectDownloadData" />
  </div>
</template>
<style lang="scss" scoped>
.o-table {
  --table-radius: 4px;
}
.release-notes-url {
  @include text1;
}
:deep(.markdown) {
  margin: 0;
  width: 100%;
  min-height: auto;
  background: none;
  box-shadow: none;
  padding: 0;
  pre {
    padding: 0;
    margin: 0;
    box-shadow: none;
  }
}
.o-tab.software-type-tab {
  --tab-radius: 8px;
  --height: 64px;

  --sectopn-color: #e7ecff;
  --tab-color: #f0f4ff;
  --border-color: #d3dcff;
  &.dark {
    --sectopn-color: #2b2b2f;
    --tab-color: #353539;
    --border-color: rgba(255, 255, 255, 0.1);
  }

  border-radius: var(--tab-radius);
  background: var(--sectopn-color);

  &.en {
    :deep(.o-tab-nav) {
      text-transform: capitalize;
    }
  }
  @include respond-to('<=pad') {
    --height: 48px;
    --tab-radius: 4px;
  }
  :deep(.o-tab-head) {
    background: var(--tab-color);
    border-radius: var(--tab-radius) var(--tab-radius) 0 0;
    .o-tab-navs-container {
      overflow-x: visible;
      width: 100%;
    }
    .o-tab-navs-wrap {
      overflow: inherit;
    }
    .o-tab-nav-anchor {
      top: 0;
      height: calc(var(--height) + 2px);
      background: var(--sectopn-color);
      border-radius: var(--tab-radius) var(--tab-radius) 0 0;
      border: 2px solid var(--border-color);
      border-bottom: 2px solid var(--sectopn-color);
      transition: none;
      .o-tab-nav-anchor-line {
        position: absolute;
        bottom: -2px;
        left: 0;
        background-color: var(--sectopn-color);
        width: 100%;
      }
    }
    .o-tab-nav-list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: relative;
      z-index: 9;
      .o-tab-nav {
        flex: 1;
        margin-right: 0;
        justify-content: center;
        line-height: var(--height);
        padding: 0;
        &.o-tab-nav-active {
          color: var(--o-color-primary1);
          position: relative;
          z-index: 3;
        }
      }
    }
  }
  :deep(.o-tab-body) {
    border: 2px solid var(--border-color);
    border-radius: 0 0 var(--tab-radius) var(--tab-radius);
    .o-tab-pane {
      padding: 24px;
      @include respond-to('<=pad') {
        padding: 12px;
      }
    }
    .download-panel {
      background: var(--o-color-fill2);
      border-radius: var(--tab-radius);
      padding: 24px;
      @include respond-to('<=pad') {
        padding: 12px;
      }
      .edition-text {
        @include tip1;
        color: var(--o-color-info2);
        margin-bottom: 16px;
        // display: flex;
        // align-items: center;
      }
      .command-box {
        margin-bottom: 16px;
      }
      .command-title,
      .caption {
        @include text1;
        color: var(--o-color-info1);
        font-weight: 500;
        margin-bottom: 16px;
      }
    }
  }
}
.server-list {
  li {
    + li {
      margin-top: 12px;
    }
    .server-item {
      padding: 12px 8px;
      border-radius: 4px;
      position: relative;
      background: var(--o-color-fill1);
      position: relative;
    }
    .title {
      @include text2;
      color: var(--o-color-info1);
      font-weight: 500;
    }
    .o-icon {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
    }
  }
}
.edition-wrap {
  background: var(--o-color-fill1);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .edition-head {
    height: 48px;
    background: var(--o-color-fill2);
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    .o-icon {
      font-size: 24px;
    }
  }
  .edition-main {
    flex: 1;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    .edition-panel {
      flex: 1;
      background: var(--o-color-fill2);
      padding: 12px;
      border-radius: 8px;
      .symbol-enterprise {
        margin-top: 24px;
      }
      .text {
        @include text2;
        color: var(--o-color-info2);
        font-weight: 500;
        margin-bottom: 16px;
      }
      .caption {
        @include text2;
        color: var(--o-color-info1);
        font-weight: 500;
        margin-bottom: 16px;
      }
    }
  }
}

.o-toggle:not(.o-toggle-disabled):not(.o-toggle-checked) {
  --toggle-size: 32px;
  --toggle-padding: 3px 15px;
  --toggle-radius: 4px;
  max-height: 32px;
  color: var(--o-color-info1);
  --toggle-bg-color: var(--o-color-fill1);
  --toggle-bg-color-hover: var(--o-color-control2-light);
  @include text1;

  &.active {
    background-color: transparent;
    border: 1px solid var(--o-color-primary1);
  }
}

:deep(.o-toggle-checked) {
  color: var(--o-color-primary1);
}

.o-radio-group {
  --radio-group-gap: 8px;
}

.content-item {
  margin-top: 24px;
  + .content-item {
    margin-top: 48px;
    @include respond-to('<=pad_v') {
      margin-top: 16px;
    }
  }

  h3 {
    @include h2;
    font-weight: 500;
    color: var(--o-color-info1);
  }
  .filter-card {
    margin-top: 24px;
    @include respond-to('<=pad_v') {
      margin-top: 12px;
    }
    :deep(.o-radio-group-h) {
      @include respond-to('<=pad_v') {
        --radio-group-gap: 8px;
      }
    }
    :deep(.tag-filter) {
      padding: 0;
      display: flex;
      justify-content: start;

      @include respond-to('<=pad_v') {
        flex-direction: column;
        gap: 8px;
      }

      &.architecture-box {
        @media (max-width: 1100px) {
          padding-left: 0;
        }
      }
      &.os-box {
        margin-top: var(--e-spacing-h5);
        @media (max-width: 1100px) {
          margin-top: 12px;
        }
        .disable {
          color: var(--e-color-text5);
          cursor: not-allowed;
        }
      }
      .o-select {
        width: 100%;
      }
      .label {
        white-space: nowrap;
      }
      .tag-filter-box {
        @include respond-to('<=pad_v') {
          width: 100%;
        }
        .o-tag {
          @media (max-width: 1100px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
            padding: 3px 8px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }

  .download-pc {
    margin-top: 24px;
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h5);
    }
    .symbol-enterprise {
      margin: 16px 0 0;
    }
  }
}
</style>
