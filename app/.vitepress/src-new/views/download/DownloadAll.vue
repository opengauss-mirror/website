<script lang="ts" setup>
import { OIcon, OIconArrowRight, OLink, OOption, ORadio, ORadioGroup, OScroller, OSelect, OTag, OToggle } from '@opensig/opendesign';
import { useData, useRouter } from 'vitepress';
import { computed } from 'vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import TheTable from '~@/components/TheTable.vue';
import { useScreen } from '~@/composables/useScreen';
import downloadData from '~@/data/download/content-bridge';

const { t } = useI18n();

const timePattern = /^\d{4}\.\d{2}(\.\d{2})?$/;
const now = new Date();
const _downloadData = downloadData.map((item) => {
  let isEol = false;
  if (item.plannedEOL && timePattern.test(item.plannedEOL)) {
    const [y, m, d] = item.plannedEOL.split('.').map((item) => Number(item));
    if (!d) {
      isEol = now > new Date(y, m, 0);
    } else {
      isEol = now > new Date(y, m - 1, d);
    }
  }
  return {
    ...item,
    isEol,
  };
});

const { gtPadV } = useScreen();
const filterOptions = [
  { label: t('download.downloadAll.ALL'), value: 'all' },
  { label: t('download.downloadAll.LTS'), value: 'lts' },
  { label: t('download.downloadAll.RCX'), value: 'rc' },
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
  { key: 'name', label: t('download.PKG_TYPE') },
  { key: 'releaseDate', label: t('download.RELEASE_DATE') },
  { key: 'plannedEOL', label: t('download.EOM_DATE') },
  { key: 'action', label: t('download.DOWNLOAD_URL') },
];
</script>

<template>
  <div class="all-versions">
    <div class="tag-filter">
      <p class="label">{{ $t('download.VERSION_TYPE') }}</p>
      <ORadioGroup v-if="gtPadV" v-model="selectedFilter" style="--radio-group-gap: 8px">
        <ORadio
          v-for="item in filterOptions"
          :key="item.value"
          :value="item.value"
          v-analytics.bubble="{
            level3: $t('download.VERSION_TYPE'),
            target: item.label,
          }"
        >
          <template #radio="{ checked }">
            <OToggle :checked="checked">{{ item.label }}</OToggle>
          </template>
        </ORadio>
      </ORadioGroup>
      <OSelect v-else v-model="selectedFilter">
        <OOption v-for="item in filterOptions" :key="item.value" :value="item.value" :label="item.label"></OOption>
      </OSelect>
    </div>
    <TheTable
      v-if="gtPadV"
      :data="displayData"
      :columns="tableColumns"
      :header-cell-style="{ backgroundColor: 'var(--o-color-control3-light)' }"
      style="width: 100%"
      height="550"
    >
      <template #td_name="{ row }">
        <span>
          openGauss {{ row.name }}
          <OTag v-if="row.plannedEOL === 'End-of-Life' || row.isEol" size="small"> {{ $t('download.EOM') }} </OTag>
        </span>
      </template>
      <template #td_releaseDate="{ row }">
        <span v-if="timePattern.test(row.releaseDate ?? '')">
          {{ row.releaseDate.slice(0, 7).replace('.', '/') }}
        </span>
        <span v-else class="no-data">--</span>
      </template>
      <template #td_plannedEOL="{ row }">
        <span v-if="timePattern.test(row.plannedEOL ?? '')">
          {{ row.plannedEOL.slice(0, 7).replace('.', '/') }}
        </span>
        <span v-else class="no-data">--</span>
      </template>
      <template #td_action="{ row }">
        <OLink
          tag="button"
          color="primary"
          @click="goToDownload(row.name)"
          v-analytics.bubble="{
            level3: row.name,
            target: $t('download.GOTO_DOWNLOAD'),
          }"
        >
          {{ $t('download.GOTO_DOWNLOAD') }}
          <template #suffix>
            <OIcon><OIconArrowRight /></OIcon>
          </template>
        </OLink>
      </template>
    </TheTable>
    <OScroller v-else style="margin-top: 12px; max-height: 400px; align-self: stretch">
      <div class="mobile-download-item-card" v-for="item in displayData" :key="item.name">
        <p class="item-name">
          openGauss {{ item.name }}
          <OTag v-if="item.plannedEOL === 'End-of-Life'" size="small"> {{ $t('download.EOM') }} </OTag>
        </p>
        <div class="info">
          <p>{{ $t('download.RELEASE_DATE') }}</p>
          <p>
            <span v-if="item.releaseDate">{{ item.releaseDate.slice(0, 7).replace('.', '/') }}</span>
            <span v-else class="no-data">--</span>
          </p>
          <p>{{ $t('download.EOM_DATE') }}</p>
          <p>
            <span v-if="item.plannedEOL && timePattern.test(item.plannedEOL ?? '')">
              {{ item.plannedEOL.slice(0, 7).replace('.', '/') }}
            </span>
            <span v-else class="no-data">--</span>
          </p>
          <p>{{ $t('download.DOWNLOAD_URL') }}</p>
          <OLink tag="button" color="primary" @click="goToDownload(item.name)">
            {{ $t('download.GOTO_DOWNLOAD') }}
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
.el-table {
  --el-table-row-hover-bg-color: var(--o-color-control2-light);
}
.no-data {
  color: var(--o-color-info4);
}

.o-tag {
  --tag-bg-color: var(--o-color-control2-light);
  --tag-bd-color: var(--o-color-control2-light);
}

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
