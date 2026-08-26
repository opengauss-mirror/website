<script setup lang="ts">
import { onMounted, ref, watch, reactive, computed, shallowRef } from 'vue';
import { ORadioGroup, ORadio, OToggle, OInput, OIcon, ORow, OCol, OCard, OPagination, OFigure, OTag, OButton, ODivider, ODialog } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';
import { useDebounceFn } from '@vueuse/core';
import { changeTimeStamp } from '~@/utils/common';

import IconSearch from '~icons/app-new/icon-header-search.svg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { EventState, listData } from '~@/data/events/content-bridge';
import AppEmpty from '~@/components/AppEmpty.vue';

interface LabelT {
  zh: string;
  en: string;
}
interface OptionT {
  value: string | number;
  label: LabelT;
}

const { lePadV } = useScreen();
const { t, isZh, locale } = useLocale();

// -------------------- 活动状态 --------------------
const stateOptions = ref<OptionT[]>([]);
EventState.forEach((item) => {
  stateOptions.value.push({
    value: item.value,
    label: {
      zh: item.label.zh,
      en: item.label.en,
    },
  });
});

const clearCheckedState = (checked: boolean) => {
  if (checked) {
    setTimeout(() => {
      params.state = 0;
    });
  }
};

// -------------------- 搜索 input字段做防抖处理 -------------------
const debounceTextFn = useDebounceFn((val: string) => {
  params.keyword = val;
}, 300);
const debounceSearch = computed({
  get() {
    return params.keyword;
  },
  set(val) {
    debounceTextFn(val as string);
  },
});

// -------------------- 列表数据 -------------------
const params = reactive({
  keyword: '',
  state: 0,
});
const currentPage = ref(1);
const pageSize = ref(12);
const total = ref(0);

const COUNT_PER_PAGE = [12, 24, 36, 48];

// 本月及以后最新活动列表
const currentList = ref<(typeof listData)['zh']>([]);
const pagedList = computed(() => {
  return currentList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
});
const today = shallowRef<Date>();

const getExpirationType = (dateStr: string) => {
  if (!today.value) return 0;
  try {
    const _today = new Date(today.value.getFullYear(), today.value.getMonth(), today.value.getDate()).getTime();
    const date = new Date(dateStr);
    const _date = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    if (_today > _date) {
      return 1;
    }
    if (_today <= _date) {
      return 2;
    }
    return 0;
  } catch {
    return 0;
  }
};

const pipe =
  (...fns: ((...args: any[]) => any)[]) =>
  (x0: any) =>
    fns.reduce((x, f) => f(x), x0);

const updateList = () => {
  const latestList = listData[locale.value];
  currentPage.value = 1;
  pageSize.value = 12;
  const fnList = [];
  // 活动状态
  if (params.state) {
    let now: Date | number = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    fnList.push((list: any) =>
      params.state === 1
        ? list.filter((item) => now > new Date(item.date.replace(/\//g, '-')).getTime())
        : list.filter((item) => now <= new Date(item.date.replace(/\//g, '-')).getTime())
    );
  }
  // 搜索
  if (params.keyword) {
    fnList.push((list: any) => list.filter((item: any) => item.title.includes(params.keyword) || item.city.includes(params.keyword)));
  }
  if (fnList.length) {
    currentList.value = pipe(...fnList)(latestList);
  } else {
    currentList.value = latestList;
  }
  total.value = currentList.value?.length;
};

onMounted(() => {
  today.value = new Date();
  updateList();
});
watch(
  () => params,
  () => {
    updateList();
  },
  {
    deep: true,
  }
);

// -------------------- 分页 --------------------
const onPaginationChange = (val: { page: number; pageSize: number }) => {
  // 当 pageSize 变化时将page_num 置为1
  if (val.pageSize !== pageSize.value) {
    currentPage.value = 1;
  } else {
    currentPage.value = val.page;
  }
  pageSize.value = val.pageSize;
};

// -------------------- 移动端 --------------------
const filterVisible = ref(false);
const stateValue = ref(0);

const handleReset = () => {
  params.state = 0;
  filterVisible.value = false;
};
const handleConfirm = () => {
  params.state = stateValue.value;
  filterVisible.value = false;
};
</script>

<template>
  <AppSection :title="t('events.list.list')" class="event-latest">
    <div v-if="!lePadV" class="filter-card">
      <div class="filter">
        <p class="filter-title">{{ t('events.list.state') }}</p>
        <ORadioGroup v-model="params.state" :style="{ gap: lePadV ? '4px 4px' : '16px 8px' }">
          <ORadio v-for="option in stateOptions" :key="option.value" :value="option.value">
            <template #radio="{ checked }">
              <OToggle @click="clearCheckedState(checked)" :checked="checked">
                {{ isZh ? option.label.zh : option.label.en }}
              </OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </div>
      <div class="search-box">
        <OInput v-model="debounceSearch" :placeholder="t('events.list.search')" size="large" clearable class="input-search">
          <template #prefix>
            <OIcon><IconSearch /></OIcon>
          </template>
        </OInput>
      </div>
    </div>
    <div v-else class="filter-card-mb">
      <div class="filter">
        <p class="filter-title">{{ t('events.list.state') }}</p>
        <ORadioGroup v-model="params.state" :style="{ gap: lePadV ? '4px 4px' : '16px 8px' }">
          <ORadio v-for="option in stateOptions" :key="option.value" :value="option.value">
            <template #radio="{ checked }">
              <OToggle @click="clearCheckedState(checked)" :checked="checked">
                {{ isZh ? option.label.zh : option.label.en }}
              </OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </div>
      <OInput v-model="debounceSearch" :placeholder="t('events.list.search')" size="large" class="input-search">
        <template #prefix>
          <OIcon><IconSearch /></OIcon>
        </template>
      </OInput>
    </div>
    <ORow v-if="pagedList.length" :gap="lePadV ? '0 12px' : '32px 32px'" wrap="wrap">
      <OCol :flex="lePadV ? ' 0 0 100%' : '0 0 25%'" v-for="(item, i) in pagedList" :key="i">
        <OCard class="event-item" :href="item.path">
          <template #cover>
            <OFigure class="item-cover" hoverable :src="item.pic">
              <div class="tags">
                <ClientOnly>
                  <OTag :class="{ 'tag-ongoing': getExpirationType(item.date) === 2 }">
                    <span class="tag-text">
                      {{ EventState.get(getExpirationType(item.date))?.label[locale] }}
                    </span>
                  </OTag>
                </ClientOnly>
              </div>
              <div class="card-content">
                <p v-dompurify-html="item.title" class="title"></p>
                <div class="card-bottom">
                  <p class="date">
                    {{ changeTimeStamp(new Date(item.date.substring(0, 10))) }}
                  </p>
                  <ODivider v-if="lePadV" direction="v" class="divider-mb" />
                  <p class="city">{{ item.location }}</p>
                </div>
              </div>
            </OFigure>
          </template>
        </OCard>
      </OCol>
    </ORow>
    <AppEmpty v-else class="nofound">
      <p style="color: var(--o-color-info4);">未找到相关活动</p>
    </AppEmpty>

    <!-- 分页 -->
    <div v-if="total > COUNT_PER_PAGE[0]" class="pagination">
      <OPagination
        style="--pagination-radius: 4px"
        :simple="lePadV"
        :total="currentList.length"
        :page="currentPage"
        :page-size="pageSize"
        :page-sizes="COUNT_PER_PAGE"
        :show-more="false"
        @change="onPaginationChange"
      ></OPagination>
    </div>
    <ODialog v-model:visible="filterVisible" size="medium" class="filter-body">
      <template #header>
        <span class="del-title">{{ t('events.list.filter') }}</span>
      </template>
      <div class="dlg-body">
        <ODivider class="divider-filter" />
        <div class="filter">
          <p class="filter-title">{{ t('events.list.state') }}</p>
          <ORadioGroup v-model="stateValue" :style="{ gap: lePadV ? '8px 8px' : '16px 8px' }">
            <ORadio v-for="option in stateOptions" :key="option.value" :value="option.value">
              <template #radio="{ checked }">
                <OToggle @click="clearCheckedState(checked)" :checked="checked">
                  {{ isZh ? option.label.zh : option.label.en }}
                </OToggle>
              </template>
            </ORadio>
          </ORadioGroup>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <OButton variant="text" @click="handleReset">{{ t('events.list.reset') }}</OButton>
          <ODivider direction="v" class="divider-btn" />
          <OButton variant="text" @click="handleConfirm">{{ t('events.list.confirm') }}</OButton>
        </div>
      </template>
    </ODialog>
  </AppSection>
</template>

<style lang="scss" scoped>
.app-section {
  --o-gap-section: 40px;

  @include respond-to('<=laptop') {
    --o-gap-section: 32px;
  }
  @include respond-to('phone') {
    --o-gap-section: 16px;
  }
}
.filter-card {
  display: flex;
  justify-content: space-between;
  background-color: var(--o-color-fill2);
  padding: 24px 32px;
  border-radius: var(--o-radius-xs);
}
.filter {
  display: flex;
  align-items: flex-start;
}
.filter + .filter {
  margin-top: 16px;
}

.filter-title {
  min-width: 64px;
  color: var(--o-color-info1);
  font-weight: 500;
  margin-right: 32px;
  margin-top: 4px;
  @include text1;
}

.o-toggle {
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

.o-radio + .o-radio {
  margin-left: 0;
}

.search-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .input-search {
    :deep(.o_box) {
      width: 320px;
    }
    :deep(.o_input) {
      width: 100%;
    }
  }
}

.o-row {
  margin-top: 32px;
}

.tags {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
  width: calc(100% - 8px);

  .o-tag {
    --tag-bg-color: var(--o-color-info4);
    --tag-bd-color: var(--o-color-info4);
    backdrop-filter: blur(6px);
    border: none;
    --tag-color: var(--o-color-white);

    :deep(.o-tag-label) {
      display: flex;
      align-items: center;
      width: 100%;
      white-space: normal;

      .o-icon {
        margin-right: 4px;
        @include text1;
      }
    }
  }
  .tag-ongoing {
    --tag-bg-color: rgba(var(--o-blue-6));
    --tag-bd-color: rgba(var(--o-blue-6));
  }
}

.card-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: var(--o-color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  padding: 32px;
  .title {
    font-weight: 500;
    height: auto;
    white-space: pre-wrap;
    @include h2;
    @include text-truncate(3);
  }
  .date {
    margin-top: 24px;
    @include text1;
  }
  .city {
    @include text1;
  }
}

.o-figure {
  width: 100%;
}

.pagination {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.nofound {
  margin-top: 40px;
  --result-desc-color: var(--o-color-info1);
}

@include respond-to('laptop') {
  .card-content {
    padding: 24px;
  }
}

@include respond-to('<=pad') {
  .card-content {
    .title {
      white-space: normal;
    }
  }
}

@include respond-to('pad_h') {
  .tags {
    .o-tag {
      :deep(.o-tag-label) {
        font-size: 10px;
        white-space: nowrap;
      }
    }
    .series-tag {
      --tag-padding: 0;
      width: 104px;
      :deep(.o-tag-label) {
        margin-right: 11px;
      }
    }
  }
  .card-content {
    padding: 40px 16px 24px;
    .title {
      @include text1;
    }
    .date {
      margin-top: 8px;
      @include tip1;
    }
    .city {
      @include tip1;
    }
  }
}

@include respond-to('<=pad_v') {
  .item-cover {
    aspect-ratio: 1/0.4;
  }
  .event-latest {
    min-height: calc(100vh - 250px);
  }
  .o-row {
    margin-top: 12px;
  }
  .card-content {
    .title {
      height: auto;
      padding: 0 32px;
      @include h2;
    }
    .card-bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 12px;
    }
    .date {
      margin-top: 0;
      @include tip1;
    }
    .city {
      @include tip1;
    }
    .divider-mb {
      --o-divider-color: var(--o-color-info1-inverse);
      --o-divider-bd-color: var(--o-color-info1-inverse);
    }
  }
  .filter-card-mb {
    background-color: var(--o-color-fill2);
    padding: var(--o-gap-3) var(--o-gap-4);
    border-radius: 4px;
  }
  .filter {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .filter-title {
    margin: 0;
  }
  .o-input {
    margin-top: 8px;
  }
  :deep(.o-input.o_box-large) {
    --_box-padding: 0 15px;
    --_box-height: var(--o-control_size-l);
  }
  .o-toggle {
    --toggle-size: auto;
    --toggle-padding: 4px 11px;
    max-height: auto;
  }
  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    .o-btn {
      flex: 1;
    }
  }
  .divider-btn {
    --o-divider-label-gap: 0 8px;
  }
}

@include respond-to('phone') {
  .filter-card-mb {
    --o-control_size-m: 24px;
    --o-control_size-l: 32px;
    --o-control_size-xl: 32px;
  }
  .card-content {
    padding: 16px 16px 0;
  }
}
</style>
<style lang="scss">
@include respond-to('<=pad_v') {
  .filter-body {
    --layer-align: flex-end;
    --dlg-margin: 16px;
    --dlg-radius: 8px;
    --dlg-width: calc(100vw - 32px);
  }
}
</style>
