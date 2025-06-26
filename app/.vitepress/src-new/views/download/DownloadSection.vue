<script lang="ts" setup>
import { ref, computed, watch, toRefs, onMounted, inject, nextTick } from 'vue';
import {
  OLink,
  ODivider,
  OTag,
  OButton,
  ORadioGroup,
  ORadio,
  OToggle,
  OTable,
  OPopover,
  OIcon,
  OTab,
  OTabPane,
  OSelect,
  OOption,
  OLayer,
} from '@opensig/opendesign';
import { useData } from 'vitepress';
import { useCommon, useCookieStore } from '@/stores/common';
import { useI18n } from '@/i18n';
import { useClipboard } from '@/components/hooks/useClipboard';
import { useScreen } from '~@/composables/useScreen';

import useWindowResize from '@/components/hooks/useWindowResize';
import { DownloadItemT } from '@/shared/@types/type-download';

import { getCustomCookie } from '@/shared/utils';
import { useUserInfoStore } from '@/stores/user';
import { useLocale } from '~@/composables/useLocale';

import TagFilter from '~@/components/TagFilter.vue';
import DownloadContentItem from './DownloadContentItem.vue';
import DownloadTable from './DownloadTable.vue';

import { oaReport } from '@/shared/analytics';
import IconRight from '~icons/app/icon-chevron-right.svg';
import IconLeft from '~icons/app-new/icon-arrow-left.svg';

const props = defineProps({
  tableData: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
  versionShown: {
    required: true,
    type: String,
    default: '',
  },
});
const { tableData, versionShown } = toRefs(props);

const { lang } = useData();
const commonStore = useCommon();
const { t, isZh, $t } = useLocale();
const i18n = useI18n();
const cookieStore = useCookieStore();
const { gtPadV } = useScreen();

const versionData = inject('VERSION_DATA');
const downloadVersionAuth = inject('PERMISSION_LIST');

// tag筛选
const architectureList = computed(() => {
  return [...new Set(props.tableData.content.map((item) => item.architecture))];
});

const osList = computed(() => {
  return [...new Set(props.tableData.content.map((item) => item.os))];
});

const activeArchitecture = ref('');
const activeOs = ref('');
const initActiveTag = function () {
  activeArchitecture.value = props.tableData.content[0].architecture;
  activeOs.value = props.tableData.content[0].os;
};

const renderData = ref<DownloadItemT>({
  architecture: '',
  content: [],
  os: '',
  system: '',
});
const setRenderData = () => {
  const matchedItem = props.tableData.content.find((item: DownloadItemT) => item.architecture === activeArchitecture.value && item.os === activeOs.value);

  if (matchedItem) {
    renderData.value = matchedItem;
  }
  getTabsData();
};

// 替换空格
const replaceSpace = (v: string) => {
  return v.replace(/ /g, '-');
};

onMounted(() => {
  initActiveTag();

  // 迁移专区跳转锚点显示
  if (window.location.hash) {
    setTimeout(() => {
      const toolId = window.location.hash?.split('#')[1] as string;
      const top = document.getElementById(toolId)?.offsetTop;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }, 300);
  }

  watch(
    () => props.tableData.content,
    () => {
      initActiveTag();
      setTempTag();
      setRenderData();
    }
  ),
    {
      immediate: true,
    };
});
// 控制不能组合的tag的禁用
const tempTag = ref('');
const setTempTag = () => {
  const matchedItem = props.tableData.content.find((item: DownloadItemT) => item.architecture === activeArchitecture.value);
  if (matchedItem) {
    tempTag.value = matchedItem.os;
  }
};

const isDisable = (tag: string) => {
  const isAvailable = props.tableData.content.some((item: DownloadItemT) => item.architecture === activeArchitecture.value && item.os === tag);

  if (!isAvailable && activeOs.value === tag) {
    activeOs.value = tempTag.value;
  }

  return !isAvailable;
};

watch(
  () => activeArchitecture.value,
  () => {
    setTempTag();
    setRenderData();
  }
);
watch(
  () => activeOs.value,
  () => {
    setRenderData();
  }
);
// 下载权限
const userInfoStore = useUserInfoStore();

// 下载埋点  新版本判断
const collectDownloadData = (name: string) => {
  if (cookieStore.isAllAgreed || userInfoStore.username) {
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
  }
};

// 类型转换
const mappingType = {
  enterprise: '企业版',
  simple: '极简版',
  lite: '轻量版',
  distributed: '分布式镜像',
  'enterprise-noLSE': '企业版(noLSE)',
};

const serverTab = ref();
const serverData = ref([]);
const symbolData = ref([]);
const getTabsData = () => {
  const data = versionData.value?.data?.[lang.value];
  if (!data) return;

  const serverItem = data.find((item: ContentItemT) => item.name === 'openGauss Server');
  if (serverItem) {
    const matchedServer = serverItem.content.find((contentItem) => contentItem.architecture === activeArchitecture.value && contentItem.os === activeOs.value);
    serverData.value = matchedServer?.content || [];
  }
  // openGauss Symbol
  const symbolItem = data.find((item: ContentItemT) => item.name === 'openGauss Symbol');
  if (symbolItem) {
    const matchedSymbol = symbolItem.content.find((contentItem) => contentItem.architecture === activeArchitecture.value && contentItem.os === activeOs.value);
    symbolData.value = matchedSymbol?.content || [];
  }

  if (serverData.value.length > 0) {
    serverTab.value = serverData.value[0].edition;
  }
};

const isLayer = ref(false);
const layerShow = ref(false);
const layerData = ref();
const changeLayer = (item) => {
  layerData.value = item;
  serverTab.value = item.edition;
  layerShow.value = !layerShow.value;
};
</script>
<template>
  <div :id="replaceSpace(tableData.name) + '-' + replaceSpace(versionShown)" class="content-item">
    <h3>{{ tableData.name }}</h3>
    <div class="filter-card">
      <TagFilter class="architecture-box" :label="i18n.download.ARCHITECTURE">
        <ORadioGroup v-model="activeArchitecture">
          <template v-for="item in architectureList">
            <ORadio v-if="item" :value="item" :key="item" class="radio">
              <template #radio="{ checked }">
                <OToggle :checked="checked">{{ item }}</OToggle>
              </template>
            </ORadio>
          </template>
        </ORadioGroup>
      </TagFilter>
      <TagFilter class="os-box" :label="i18n.download.OS">
        <ORadioGroup v-if="gtPadV" v-model="activeOs">
          <ORadio v-for="item in osList" :key="item" :value="item" :disabled="isDisable(item)" class="radio">
            <template #radio="{ checked, disabled }">
              <OToggle :checked="checked" :disabled="disabled">{{ item }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
        <OSelect v-else v-model="activeOs" size="large">
          <OOption v-for="item in osList" :disabled="isDisable(item)" :key="item" :label="item" :value="item" />
        </OSelect>
      </TagFilter>
    </div>

    <div class="download-pc">
      <template v-if="tableData.name === 'openGauss Server'">
        <!-- openGauss Server -->
        <OTab v-if="gtPadV" v-model="serverTab" variant="text" :line="false">
          <OTabPane v-for="item in serverData" :key="item.edition" :label="mappingType[item.edition]" :value="item.edition">
            <div class="download-panel">
              <p class="edition-text">{{ t('download.' + item.edition) }}<OLink color="primary">版本能力矩阵图</OLink></p>

              <p class="caption">软件包下载</p>
              <DownloadContentItem :data="item" :version-shown="versionShown" @report="collectDownloadData" />

              <!-- openGauss Symbol -->
              <div v-if="symbolData && serverTab === 'enterprise'" class="symbol-enterprise">
                <p class="caption">openGauss Symbol</p>
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
          </OTabPane>
        </OTab>
        <ul v-else class="server-list">
          <li v-for="item in serverData" :key="item.sha_code">
            <div @click="changeLayer(item)" class="server-item">
              <p class="title">{{ mappingType[item.edition] }}</p>
              <OIcon><IconRight /></OIcon>
            </div>
          </li>
        </ul>
        <OLayer v-if="layerShow && !gtPadV" v-model="layerShow" :unmount-on-hide="false">
          <div class="edition-wrap">
            <div class="edition-head">
              <OIcon @click="layerShow = false"><IconLeft /></OIcon>
              {{ mappingType[layerData.edition] }}
            </div>
            <div class="edition-main">
              <div class="edition-panel">
                <p class="text">{{ t('download.' + layerData.edition) }}</p>
                <p class="caption">软件包下载</p>
                <DownloadContentItem :data="layerData" :version-shown="versionShown" @report="collectDownloadData" />

                <!-- openGauss Symbol -->
                <div v-if="symbolData && serverTab === 'enterprise'" class="symbol-enterprise">
                  <p class="caption">openGauss Symbol</p>
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
      <!-- openGauss Connectors -->
      <template v-if="tableData.name === 'openGauss Connectors'">
        <DownloadTable :options="renderData" :versionShown="versionShown" @report="collectDownloadData" />
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
.o-tab {
  background: var(--o-color-control4-light);
  --tab-radius: 8px;
  border-radius: var(--tab-radius);
  --height: 64px;
  @include respond-to('<=pad') {
    --height: 48px;
    --tab-radius: 4px;
  }
  :deep(.o-tab-head) {
    background: var(--o-color-fill1);
    border-radius: var(--tab-radius);
    .o-tab-navs-container {
      width: 100%;
    }
    .o-tab-navs-wrap {
      overflow: inherit;
    }
    .o-tab-nav-anchor {
      top: 0;
      height: calc(var(--height) + 2px);
      background: var(--o-color-control4-light);
      border-radius: var(--tab-radius) var(--tab-radius) 0 0;
      border: 2px solid var(--o-color-control1-light);
      .o-tab-nav-anchor-line {
        position: absolute;
        bottom: -2px;
        left: 0;
        background-color: var(--o-color-control4-light);
        width: 100%;
      }
    }
    .o-tab-nav-list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .o-tab-nav {
        flex: 1;
        margin-right: 0;
        justify-content: center;
        line-height: var(--height);
        padding: 0;
        --width: 24px;
        .nav-label-prefix,
        .nav-label-suffix {
          position: absolute;
          bottom: 0;
          width: var(--width);
          height: var(--width);
          background: var(--o-color-control1-light);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s;
          &:after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background-color: var(--o-color-fill1);
          }
        }
        .nav-label-prefix {
          left: calc(var(--width) * -1);
          &:after {
            border-bottom-right-radius: 24px;
          }
        }
        .nav-label-suffix {
          right: calc(var(--width) * -1);
          &:after {
            border-bottom-left-radius: 24px;
          }
        }
        &.o-tab-nav-active {
          color: var(--o-color-primary1);
          position: relative;
          z-index: 3;
          .nav-label-prefix,
          .nav-label-suffix {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }
  }
  :deep(.o-tab-body) {
    border: 2px solid var(--o-color-control1-light);
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
        font-weight: 500;
        margin-bottom: 16px;
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
