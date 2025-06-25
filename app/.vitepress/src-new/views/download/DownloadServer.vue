<script lang="ts" setup>
import { ref, computed, watch, toRefs, onMounted, inject } from 'vue';
import { OTab, OTabPane, ODivider, OTable, OButton } from '@opensig/opendesign';
import { useData } from 'vitepress';

import { ContentItemT } from '@/shared/@types/type-download';

const props = defineProps({
  server: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
});

const { lang } = useData();
const serverTab = ref('');
const tabLists = ref([]);
const handleTabChange = () => {};

watch(
  () => props.server,
  (v) => {
    getTabsData();
  }
);

const versionData = inject('VERSION_DATA');

const mappingType = {
  enterprise: '企业版',
  simple: '极简版',
  lite: '轻量版',
  distributed: '分布式镜像',
  'enterprise-noLSE': '企业版(noLSE)',
};

const serverData = ref([]);
const symbolData = ref([]);
const getTabsData = () => {
  const { arch, os } = props.server;
  versionData.value.data[lang.value].forEach((item: ContentItemT) => {
    if (item.name === 'openGauss Server') {
      item.content.forEach((contentItem) => {
        if (contentItem.architecture === arch && contentItem.os === os) {
          serverData.value = contentItem.content;
        }
      });
    }
    if (item.name === 'openGauss Symbol') {
      symbolData.value = item.content;
    }
  });
  if (serverData.value.length > 0) {
    serverTab.value = serverData.value[0].edition;
  }
};
</script>

<template>
  <OTab v-model="serverTab" variant="text" :line="false" @change="handleTabChange">
    <OTabPane v-for="(item, index) in serverData" :key="item.edition" :label="mappingType[item.edition]" :value="item.edition">
      <template #nav>
        <div v-if="index !== 0" class="nav-label-prefix"></div>
        <div class="nav-label">
          {{ mappingType[item.edition] }}
        </div>
        <div v-if="serverData.length - 1 !== index" class="nav-label-suffix"></div>
      </template>
      <div class="download-panel">
        {{ item.name }}
        <p>软件包下载</p>
        <div class="software-box">
          <div class="software-size">
            <p>软件包大小 {{ item.size }}</p>
          </div>
          <div class="software-info">
            <p>
              完整性校验
              <OLink class="sha-link" variant="text" @click="handleUrlCopy(row.shaCode, $event)">
                {{ shaText }}
                <template #suffix>
                  <IconCopy />
                </template>
              </OLink>
            </p>
          </div>
        </div>
      </div>
    </OTabPane>
  </OTab>
</template>

<style lang="scss" scoped>
.o-tab {
  background: var(--o-color-control4-light);
  --tab-radius: 8px;
  border-radius: var(--tab-radius);
  --height: 64px;
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
  }
}
.download-panel {
  padding: 32px;
}
</style>
