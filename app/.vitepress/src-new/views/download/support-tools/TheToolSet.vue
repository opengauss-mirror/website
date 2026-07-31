<script setup lang="ts">
import {
  OButton,
  OIcon,
  OLink,
  OOption,
  OPopover,
  ORadio,
  ORadioGroup,
  OSelect,
  OToggle,
  useMessage,
  OIconChevronRight,
  OCollapse,
  OCollapseItem,
} from '@opensig/opendesign';
import TagFilter from '~@/components/TagFilter.vue';
import IconCopy from '~icons/app/icon-copy2.svg';
import downloadData from '~@/data/download/content-bridge';
import { getCustomCookie } from '@/shared/utils';
import { oaReport } from '@opendesign-plus/plugins/analytics';
import { useData } from 'vitepress';
import { computed, CSSProperties, nextTick, ref, shallowRef, watch, watchEffect } from 'vue';
import { useClipboard } from '~@/composables/useClipboard';
import IconQuestion from '~icons/app/icon-question-mark.svg';
import { useScreen } from '~@/composables/useScreen';
import { useI18n } from 'vue-i18n';
import TheTable from '~@/components/TheTable.vue';

const DOWNLOAD_DATA = downloadData.filter((item) => item.newLayout) as (typeof downloadData)[1][];

interface FilterT {
  architecture: string;
  os: string;
}

const { gtPadV } = useScreen();
const { lang } = useData();
const { t } = useI18n();
const message = useMessage(null);

// 版本筛选
const versions = DOWNLOAD_DATA.map((item) => ({ label: 'openGauss ' + item.name, value: item.name }));
const currentVersion = ref(versions[0].value);
const isLatestVersion = computed(() => currentVersion.value === versions[0].value);
const tableFilter = ref<{ prop: string; value: any }>();

const onTableFilterChange = (val: any) => {
  console.log(val);
  tableFilter.value = val;
};

const currentVersionTools = computed<any[]>(() => {
  return DOWNLOAD_DATA.find((item) => item.name === currentVersion.value)?.data[lang.value].filter((item) => item.category === 'openGauss Tools') || [];
});

const displayTools = computed(() => {
  return currentVersionTools.value.filter((item: any) => {
    return item.architecture === activeArchitecture.value && item.os === activeOs.value;
  });
});

const filteredTools = computed(() => {
  const filter = tableFilter.value;
  if (filter) {
    const _value = Array.isArray(filter.value) ? new Set(filter.value) : new Set([filter.value]);
    return displayTools.value.filter((item: any) => _value.has(item[filter.prop]));
  }
  return displayTools.value;
});

const toolTypes = computed<any[]>(() => displayTools.value.map((item: any) => item.type));

const onVersionChanged = () => {
  activeArchitecture.value = architectureList.value[0] || '';
  activeOs.value = osList.value?.[0] || '';
  reportVersionSelect();
};

// 架构筛选
const architectureList = computed<string[]>(() => {
  return Array.from(new Set(currentVersionTools.value.map((item: FilterT) => item.architecture).filter(Boolean)));
});
const activeArchitecture = ref(architectureList.value[0] || '');

// OS筛选
const osList = computed<string[]>(() => {
  return Array.from(new Set(currentVersionTools.value.map((item: FilterT) => item.os).filter(Boolean)));
});
const activeOs = ref(osList.value?.[0] || '');
const matrix = computed(() => {
  const map = new Map<string, Set<string>>();
  currentVersionTools.value.forEach((item: FilterT) => {
    if (!map.has(item.architecture)) {
      map.set(item.architecture, new Set());
    }
    if (item.os) {
      map.get(item.architecture)?.add(item.os);
    }
  });
  return map;
});
const enabledOs = computed(() => matrix.value.get(activeArchitecture.value));

const tableColumns = computed(() => {
  if (isLatestVersion.value) {
    return [
      {
        key: 'type',
        label: t('download.TABLE_HEAD[0]'),
        width: 200,
        filter: { checkboxOptions: toolTypes.value.map((item) => ({ label: item, value: item })) },
      },
      { key: 'name', label: t('download.TABLE_HEAD[5]'), width: 300 },
      { key: 'description', label: t('download.TABLE_HEAD[6]'), width: 360 },
      { key: 'size', label: t('download.TABLE_HEAD[1]'), width: 150 },
      { key: 'sha_code', label: t('download.TABLE_HEAD[3]'), width: 150 },
      { key: 'download', label: t('download.TABLE_HEAD[2]'), width: 150 },
    ];
  }
  return [
    { key: 'name', label: t('download.TABLE_HEAD[0]') },
    { key: 'size', label: t('download.TABLE_HEAD[1]'), width: 280 },
    { key: 'sha_code', label: t('download.TABLE_HEAD[3]'), width: 280 },
    { key: 'download', label: t('download.TABLE_HEAD[2]'), width: 280 },
  ];
});

const cellStyle = computed(() => {
  if (isLatestVersion.value) {
    return ({ columnIndex }: { columnIndex: number }) => {
      if (columnIndex === 0) {
        return {
          borderRight: 'var(--el-table-border)',
        } as CSSProperties;
      }
      return {} as CSSProperties;
    };
  }
  return {} as CSSProperties;
});

watchEffect(() => {
  if (enabledOs.value && !enabledOs.value.has(activeOs.value)) {
    activeOs.value = osList.value?.[0] || '';
  }
});

const datakitRowExpanded = ref(false);
const tableRef = ref();
const lastExpandedRow = shallowRef();
watch(displayTools, async () => {
  if (datakitRowExpanded.value) {
    await nextTick();
    expandDatakitRow(lastExpandedRow.value);
  }
});
const expandDatakitRow = (row: any) => {
  if (!row) return;
  lastExpandedRow.value = row;
  tableRef.value.handleTableRef((elTable: any) => {
    elTable.toggleRowExpansion(row, (datakitRowExpanded.value = !datakitRowExpanded.value));
  });
};

// ----------------复制----------------
const isClipboard = ref(true);
const initClipboard = (text: string, e: MouseEvent) => {
  isClipboard.value = false;
  useClipboard({
    text,
    target: e,
    success: () => {
      message.success({
        content: t('common.COPY_SUCCESS'),
      });
      isClipboard.value = true;
    },
    error: () => {
      message.danger({
        content: t('common.COPY_FAILED'),
      });
      isClipboard.value = true;
    },
  });
};

function handleUrlCopy(value: string | undefined, e: MouseEvent) {
  if (!value) {
    return;
  }

  if (isClipboard.value) {
    initClipboard(value, e);
  }
}

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

const reportVersionSelect = () => {
  oaReport('click', {
    module: 'download',
    level1: t('tools.TOOL_CENTER'),
    level2: t('tools.TOOLSET'),
    level3: t('download.VERSION'),
    target: currentVersion.value,
  });
};
</script>

<template>
  <section>
    <h2>{{ $t('tools.TOOLSET') }}</h2>
    <div class="card">
      <!-- 版本选择 -->
      <TagFilter v-if="gtPadV" class="architecture-box" :label="$t('download.VERSION')">
        <OSelect v-model="currentVersion" @change="onVersionChanged">
          <OOption v-for="ver in versions" :label="ver.label" :value="ver.value" :key="ver.value"></OOption>
        </OSelect>
      </TagFilter>
      <template v-else>
        <p class="mobile-filter-label">{{ $t('download.VERSION') }}</p>
        <OSelect v-model="currentVersion" @change="onVersionChanged">
          <OOption v-for="ver in versions" :label="ver.label" :value="ver.value" :key="ver.value"></OOption>
        </OSelect>
      </template>
      <!-- 架构选择 -->
      <TagFilter v-if="gtPadV" :label="$t('download.ARCHITECTURE')">
        <ORadioGroup v-model="activeArchitecture" style="--radio-group-gap: 8px">
          <ORadio
            v-for="item in architectureList"
            :key="item"
            :value="item"
            v-analytics="{
              properties: { module: 'download', level1: t('tools.TOOL_CENTER'), level2: t('tools.TOOLSET'), level3: t('download.ARCHITECTURE'), target: item },
            }"
          >
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{ item }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </TagFilter>
      <template v-else>
        <p class="mobile-filter-label">{{ $t('download.ARCHITECTURE') }}</p>
        <ORadioGroup v-model="activeArchitecture" style="--radio-group-gap: 8px">
          <ORadio v-for="item in architectureList" :key="item" :value="item">
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{ item }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </template>
      <!-- os选择 -->
      <TagFilter v-if="gtPadV" class="os-box" :label="$t('download.OS')">
        <ORadioGroup v-model="activeOs" style="--radio-group-gap: 8px">
          <ORadio
            v-for="item in osList"
            :key="item"
            :value="item"
            :disabled="!enabledOs?.has(item)"
            v-analytics="{
              properties: { module: 'download', level1: t('tools.TOOL_CENTER'), level2: t('tools.TOOLSET'), level3: t('download.OS'), target: item },
            }"
          >
            <template #radio="{ checked, disabled }">
              <OToggle :checked="checked" :disabled="disabled">{{ item }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </TagFilter>
      <template v-else>
        <p class="mobile-filter-label">{{ $t('download.OS') }}</p>
        <OSelect v-model="activeOs">
          <OOption v-for="item in osList" :label="item" :value="item" :key="item"></OOption>
        </OSelect>
      </template>
      <!-- 表格 -->
      <TheTable
        :header-cell-style="{ backgroundColor: 'var(--o-color-control3-light-new)' }"
        ref="tableRef"
        :cell-style="cellStyle"
        v-if="gtPadV"
        :children-type="isLatestVersion ? 'span' : 'collapse'"
        :columns="tableColumns"
        :data="filteredTools"
        row-key="name"
        @filter-change="onTableFilterChange"
      >
        <!-- 软件包类型 -->
        <template #td_name="{ row }">
          <p style="display: inline-flex; align-items: center">
            <span>{{ row.name }}</span>
            <OPopover v-if="row.name?.includes('noLSE')" position="top" trigger="hover">
              <template #target>
                <OIcon>
                  <IconQuestion />
                </OIcon>
              </template>
              <p class="lse-content">支持ARMv8.1以下芯片，适配飞腾2000和鲲鹏916平台（LSE即大型系统扩展指令集从ARMv8.1开始引入，ARMv8.1以下芯片不支持该特性）</p>
            </OPopover>
            <OIcon
              :class="{ 'row-expand-icon': true, expanded: datakitRowExpanded }"
              v-if="row.children?.length"
              @click="expandDatakitRow(row)"
              style="font-size: 24px"
              ><OIconChevronRight
            /></OIcon>
          </p>
        </template>
        <!-- 完整性校验 -->
        <template #td_sha_code="{ row }">
          <OLink
            v-if="row.sha_code"
            tag="button"
            @click="handleUrlCopy(row.sha_code, $event)"
            v-analytics="{
              properties: {
                module: 'download',
                level1: t('tools.TOOL_CENTER'),
                level2: t('tools.TOOLSET'),
                level3: row.name,
                target: 'SHA256',
              },
            }"
          >
            SHA256
            <template #suffix>
              <OIcon><IconCopy /></OIcon>
            </template>
          </OLink>
          <div v-else></div>
        </template>
        <!-- 软件包下载 -->
        <template #td_download="{ row }">
          <div v-if="row.children?.length"></div>
          <template v-else>
            <OButton
              size="small"
              :disabled="row.children?.length"
              :href="row.down_url"
              @click="collectDownloadData(row.name)"
              variant="outline"
              color="primary"
              v-analytics="{
                properties: {
                  module: 'download',
                  level1: t('tools.TOOL_CENTER'),
                  level2: t('tools.TOOLSET'),
                  level3: row.name,
                  target: $t('download.BTN_TEXT'),
                },
              }"
            >
              {{ $t('download.BTN_TEXT') }}
            </OButton>
          </template>
        </template>
        <!-- 软件包下载 -->
        <template #td_description="{ row }">
          <p class="table-description-cell">{{ row.description }}</p>
        </template>
      </TheTable>
      <template v-else-if="!isLatestVersion">
        <!-- 移动端布局 -->
        <div class="mobile-download-item-card" v-for="item in displayTools" :key="item.name">
          <p class="item-name">{{ item.name }}</p>
          <p class="desc" v-if="item.name?.includes('noLSE')">
            支持ARMv8.1以下芯片，适配飞腾2000和鲲鹏916平台（LSE即大型系统扩展指令集从ARMv8.1开始引入，ARMv8.1以下芯片不支持该特性）
          </p>
          <div class="info">
            <p>{{ $t('download.TABLE_HEAD[1]') }}</p>
            <p>{{ item.size }}</p>
            <p>{{ $t('download.TABLE_HEAD[3]') }}</p>
            <OLink tag="button" @click="handleUrlCopy(item.sha_code, $event)">
              SHA256
              <template #suffix>
                <OIcon><IconCopy /></OIcon>
              </template>
            </OLink>
            <p>{{ $t('download.TABLE_HEAD[2]') }}</p>
            <OLink :href="item.down_url" tag="button" @click="collectDownloadData(item.name)" color="primary">
              {{ $t('download.BTN_TEXT') }}
            </OLink>
          </div>
        </div>
      </template>
    </div>

    <!-- 新版移动端布局 -->
    <template v-if="!gtPadV && isLatestVersion">
      <div v-for="tool in displayTools" :key="tool.type" class="card" style="padding: 0">
        <OCollapse>
          <OCollapseItem :title="tool.type" :value="tool.type">
            <template v-if="tool.children?.length">
              <div v-for="item in tool.children" :key="item.name" class="mobile-download-item-card">
                <p class="item-name">{{ item.name }}</p>
                <p class="tool-type-description">{{ item.description }}</p>
                <div class="info" style="padding-top: 12px">
                  <p>{{ $t('download.TABLE_HEAD[1]') }}</p>
                  <p>{{ item.size }}</p>
                  <p>{{ $t('download.TABLE_HEAD[3]') }}</p>
                  <OLink tag="button" @click="handleUrlCopy(item.sha_code, $event)">
                    SHA256
                    <template #suffix>
                      <OIcon><IconCopy /></OIcon>
                    </template>
                  </OLink>
                  <p>{{ $t('download.TABLE_HEAD[2]') }}</p>
                  <OLink :href="item.down_url" tag="button" @click="collectDownloadData(item.name)" color="primary">
                    {{ $t('download.BTN_TEXT') }}
                  </OLink>
                </div>
              </div>
            </template>
            <div v-else class="mobile-download-item-card">
              <p class="item-name">{{ tool.name }}</p>
              <p class="tool-type-description">{{ tool.description }}</p>
              <div class="info" style="margin-top: 12px">
                <p>{{ $t('download.TABLE_HEAD[1]') }}</p>
                <p>{{ tool.size }}</p>
                <p>{{ $t('download.TABLE_HEAD[3]') }}</p>
                <OLink tag="button" @click="handleUrlCopy(tool.sha_code, $event)">
                  SHA256
                  <template #suffix>
                    <OIcon><IconCopy /></OIcon>
                  </template>
                </OLink>
                <p>{{ $t('download.TABLE_HEAD[2]') }}</p>
                <OLink :href="tool.down_url" tag="button" @click="collectDownloadData(tool.name)" color="primary">
                  {{ $t('download.BTN_TEXT') }}
                </OLink>
              </div>
            </div>
          </OCollapseItem>
        </OCollapse>
      </div>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.el-table {
  --el-table-row-hover-bg-color: var(--o-color-control2-light-new);
}
.table-description-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
.row-expand-icon {
  margin-left: 8px;
  cursor: pointer;
  transform: rotate(0deg);
  transition: transform 0.2s;
  &.expanded {
    transform: rotate(90deg);
  }
}
:deep(.el-table__placeholder) {
  display: none;
}
:deep(.el-table__expand-icon) {
  visibility: hidden;
  position: absolute;
}
.mobile-filter-label {
  @include text2;
  margin-bottom: 8px;
  &:not(:first-of-type) {
    margin-top: 12px;
  }
}

.mobile-download-item-card {
  border-radius: 4px;
  background-color: var(--o-color-fill1);
  &:not(:first-child) {
    margin-top: 12px;
  }
  padding: 16px;
  @include text2;
  .item-name {
    margin-bottom: 12px;
  }
  .desc {
    @include tip1;
  }
  .info {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 16px;
    row-gap: 12px;
    .o-link {
      text-align: start;
    }
  }
}

.tool-type-description {
  @include text1;
  opacity: 0.8;
}

:deep(.o-collapse-item-header) {
  align-items: center;
}

.o-link {
  @include text1;
  .o-icon {
    @include h2;
  }
  --btn-bg-color-hover: transparent;
  --btn-bg-color-active: transparent;
}

.lse-content {
  max-width: 310px;
  padding: 3px 5px;
}

.tag-filter {
  padding: 0;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  grid-template-columns: 100px auto;
  :deep(.label) {
    width: 100px;
  }
}

.o-table {
  --table-cell-padding: 16px 0 16px 20px;
  --table-head-bg: rgb(var(--o-mixedgray-4));
  --table-row-hover: var(--o-color-fill3);
}

.o-toggle {
  --toggle-bg-color: rgb(var(--o-mixedgray-4));
}

.card {
  width: 100%;
  padding: 32px;
  border-radius: 4px;
  background: var(--o-color-fill2);
  margin-top: 40px;
  @include respond-to('<=pad_v') {
    padding: 16px 12px;
    margin-top: 12px;
  }
  .architecture-box {
    @media (max-width: 1100px) {
      padding-left: 0;
    }
  }
}
</style>
