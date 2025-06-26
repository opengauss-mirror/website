<script lang="ts" setup>
import { OIcon, OIconArrowRight, OLink, OOption, ORadio, ORadioGroup, OScroller, OSelect, OTag, OToggle } from '@opensig/opendesign';
import { useData, useRouter } from 'vitepress';
import { computed } from 'vue';
import { ref } from 'vue';
import TheTable from '~@/components/TheTable.vue';
import { useScreen } from '~@/composables/useScreen';
import downloadData from '~@/data/download';

const timePattern = /^\d{4}\.\d{2}\.\d{2}$/;
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const _downloadData = downloadData.map((item) => {
  let isEol = false;
  if (item.plannedEOL && timePattern.test(item.plannedEOL)) {
    const [y, m] = item.plannedEOL.split('.').map((item) => Number(item));
    if (currentYear > y && currentMonth > m) {
      isEol = true;
    }
  }
  return {
    ...item,
    isEol,
  };
});

const { gtPadV } = useScreen();
const filterOptions = [
  { label: '全部', value: 'all' },
  { label: '长期支持版本', value: 'lts' },
  { label: '创新版本', value: 'rc' },
];

const selectedFilter = ref('all');

const dataMap = {
  all: _downloadData,
  lts: [],
  rc: [],
} as Record<string, (typeof downloadData)[number][]>;

const LTS = '(LTS)';
_downloadData.forEach((item) => {
  if (item.name.endsWith(LTS)) {
    dataMap.lts.push(item);
  } else {
    dataMap.rc.push(item);
  }
});

const displayData = computed(() => {
  return dataMap[selectedFilter.value];
});

const router = useRouter();
const { lang } = useData();
const goToDownload = (name: string) => {
  router.go(`/${lang.value}/download/archive/?version=${encodeURIComponent(name)}`);
};

const tableColumns = [
  { key: 'name', label: '软件包类型' },
  { key: 'releaseDate', label: '发行时间' },
  { key: 'plannedEOL', label: '维护截止时间' },
  { key: 'action', label: '下载地址' },
];
</script>

<template>
  <div class="all-versions">
    <div class="tag-filter">
      <p class="label">版本类型</p>
      <ORadioGroup v-if="gtPadV" v-model="selectedFilter" style="--radio-group-gap: 8px">
        <ORadio v-for="item in filterOptions" :key="item.value" :value="item.value">
          <template #radio="{ checked }">
            <OToggle :checked="checked">{{ item.label }}</OToggle>
          </template>
        </ORadio>
      </ORadioGroup>
      <OSelect v-else v-model="selectedFilter">
        <OOption v-for="item in filterOptions" :key="item.value" :value="item.value" :label="item.label"></OOption>
      </OSelect>
    </div>
    <TheTable v-if="gtPadV" :data="displayData" :columns="tableColumns" style="width: 100%" height="550">
      <template #td_name="{ row }">
        <span>
          openGauss {{ row.name }}
          <OTag v-if="row.plannedEOL === 'End-of-Life' || row.isEol" size="small"> 停止维护 </OTag>
        </span>
      </template>
      <template #td_releaseDate="{ row }">
        <span>
          {{ timePattern.test(row.releaseDate ?? '') ? row.releaseDate.slice(0, 7).replace('.', '/') : '--' }}
        </span>
      </template>
      <template #td_plannedEOL="{ row }">
        <span>
          {{ timePattern.test(row.plannedEOL ?? '') ? row.plannedEOL.slice(0, 7).replace('.', '/') : '--' }}
        </span>
      </template>
      <template #td_action="{ row }">
        <OLink tag="button" color="primary" @click="goToDownload(row.name)">
          前往下载
          <template #suffix>
            <OIcon><OIconArrowRight /></OIcon>
          </template>
        </OLink>
      </template>
    </TheTable>
    <OScroller v-else style="margin-top: 12px; max-height: 400px; align-self: stretch">
      <div class="mobile-download-item-card" v-for="item in displayData">
        <p class="item-name">
          openGauss {{ item.name }}
          <OTag v-if="item.plannedEOL === 'End-of-Life'" size="small"> 停止维护 </OTag>
        </p>
        <div class="info">
          <p>发行时间</p>
          <p>--</p>
          <p>维护截止时间</p>
          <p>{{ timePattern.test(item.plannedEOL ?? '') ? item.plannedEOL?.slice(0, 7).replace('.', '/') : '--' }}</p>
          <p>下载地址</p>
          <OLink tag="button" color="primary" @click="goToDownload(item.name)">
            前往下载
            <template #suffix>
              <OIcon><OIconArrowRight /></OIcon>
            </template>
          </OLink>
        </div>
      </div>
    </OScroller>
  </div>
</template>

<style lang="scss" scoped>
.mobile-download-item-card {
  border-radius: 4px;
  background-color: var(--o-color-fill1);
  padding: 16px;
  margin-top: 12px;
  @include text2;
  .item-name {
    margin-bottom: 12px;
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

.all-versions {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .tag-filter {
    width: 100%;
    margin-bottom: 24px;
    display: flex;
    align-items: center;

    @include respond-to('<=pad_v') {
      margin-bottom: 0;
      display: block;
    }

    .label {
      margin-right: 32px;
      @include respond-to('<=pad_v') {
        margin-bottom: 8px;
      }
    }
  }

  .o-link {
    @include text1;
  }
}
</style>
