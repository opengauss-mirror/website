<script lang="ts" setup>
import { OIcon, OIconArrowRight, OLink, OOption, ORadio, ORadioGroup, OScroller, OSelect, OTag, OToggle } from '@opensig/opendesign';
import { useData, useRouter } from 'vitepress';
import { computed } from 'vue';
import { ref } from 'vue';
import { useScreen } from '~@/composables/useScreen';
import downloadData from '~@/data/download';

const { gtPadV } = useScreen();
const filterOptions = [
  { label: '全部', value: 'all' },
  { label: '长期支持版本', value: 'lts' },
  { label: '创新版本', value: 'rc' },
];

const selectedFilter = ref('all');

const ltsList = [] as (typeof downloadData)[number][];
const rcList = [] as (typeof downloadData)[number][];

downloadData.forEach((item) => {
  if (item.name.endsWith('(LTS)') || item.name.includes('LTS')) {
    ltsList.push(item);
  } else {
    rcList.push(item);
  }
});

const displayData = computed(() => {
  if (selectedFilter.value === 'all') {
    return downloadData;
  }
  if (selectedFilter.value === 'lts') {
    return ltsList;
  }
  if (selectedFilter.value === 'rc') {
    return rcList;
  }
});

const timePattern = /^\d{4}\.\d{2}\.\d{2}$/;

const router = useRouter();
const { lang } = useData();
const goToDownload = (name: string) => {
  router.go(`/${lang.value}/download/archive/?version=${encodeURIComponent(name)}`);
};
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
    <el-table v-if="gtPadV" :data="displayData" style="width: 100%" height="550">
      <el-table-column prop="name" label="软件包类型">
        <template #default="{ row }">
          <span>
            openGauss {{ row.name }}
            <OTag v-if="row.plannedEOL === 'End-of-Life'" size="small"> 停止维护 </OTag>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="release" label="发行时间" />
      <el-table-column prop="plannedEOL" label="维护截止时间">
        <template #default="{ row }">
          <span>
            {{ timePattern.test(row.plannedEOL ?? '') ? row.plannedEOL.slice(0, 7).replace('.', '/') : '--' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="下载地址">
        <template #default="{ row }">
          <OLink tag="button" color="primary" @click="goToDownload(row.name)">
            前往下载
            <template #suffix>
              <OIcon><OIconArrowRight /></OIcon>
            </template>
          </OLink>
        </template>
      </el-table-column>
    </el-table>
    <OScroller v-else style="margin-top: 12px; max-height: 400px; align-self: stretch;">
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

  .el-table {
    --el-table-header-bg-color: rgb(var(--o-mixedgray-4));
    --el-table-header-text-color: var(--o-color-info1);
    --el-table-text-color: var(--o-color-info1);
    :deep(.el-table__header-wrapper) {
      border-radius: 4px 4px 0 0;
    }
    :deep(th) {
      font-weight: normal;
    }

    :deep(.el-table__cell) {
      .cell {
        @include text1;
      }
      &:nth-of-type(1) {
        .cell {
          padding-left: 40px;
        }
      }
      padding: 12px 0;
    }
  }

  .o-table {
    width: 100%;
    --table-body-min-height: 0;
  }

  .o-link {
    @include text1;
  }
}
</style>
