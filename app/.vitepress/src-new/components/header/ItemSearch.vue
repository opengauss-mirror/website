<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import { useData } from 'vitepress';

import { useScreen } from '~@/composables/useScreen';

import { OHeaderSearch } from '@opendesign-plus/components';
import { getSearchWord, imageUpload } from '~@/api/api-search';
import { useMessage } from '@opensig/opendesign';
import { useDebounceFn } from '@vueuse/core';
import { useI18n } from '~@/i18n';

const i18n = useI18n();
const { lang } = useData();
const { lePadV } = useScreen();

// 暂时固定数据 等接口出来在换
const hotList = {
  zh: ['数据类型', '逻辑复制', '索引', '迁移', '远程连接', '表空间', '日志', '闪回'],
  en: ['check_point', 'dcf', 'copy', 'create_schema'],
} as Record<string, string[]>;

const headerSearch = useTemplateRef('headerSearch');
const searchValue = ref('');
const hotItems = computed(() => hotList[lang.value]);
const suggestItems = ref<{ key: string; count?: number }[]>([]);
const { danger } = useMessage();

const onSearch = (payload: { keyword: string; imageUrl?: string }) => {
  const { keyword, imageUrl } = payload;
  const query = { q: '', imageUrl: '' };
  if (keyword) query.q = encodeURIComponent(keyword);
  if (imageUrl) query.imageUrl = encodeURIComponent(imageUrl);
  handleSearchEvent(query);
};

const uploadImage = async (file: File) => {
  try {
    const res = await imageUpload(file);
    if (!res.obj) throw new Error('Upload returned empty URL');
    return res.obj as string;
  } catch (error) {
    danger(i18n.value.search.imageUploadFailed);
    throw error;
  }
};

const isShowDrawer = ref(false);
const searchInput = ref('');

// 搜索事件
function handleSearchEvent(query: { q: string; imageUrl?: string } = { q: searchInput.value }) {
  isShowDrawer.value = false;
  const queryString = Object.entries(query)
    .filter(([_, v]) => !!v)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  window.open(`/${lang.value}/search/?${queryString}`, '_self');
}

const debouncedLoadSuggest = useDebounceFn(async (keyword: string) => {
  if (!keyword) {
    suggestItems.value = [];
    return;
  }
  try {
    const res = await getSearchWord({ query: keyword, lang: lang.value });
    suggestItems.value = res.obj?.word ?? [];
  } catch {
    suggestItems.value = [];
  }
}, 300);

const onClear = () => {
  setTimeout(() => {
    headerSearch.value?.close();
    headerSearch.value?.blur();
  }, 50);
}

// 点击热搜标签
const onTopSearchItemClick = (val: string) => {
  searchInput.value = val;
  handleSearchEvent();
};

const onHistoryClick = (val: string) => {
  searchInput.value = val;
  handleSearchEvent();
};
</script>
<template>
  <OHeaderSearch
    ref="headerSearch"
    class="header-search"
    v-model="searchValue"
    :mobile="lePadV"
    :placeholder="i18n.search.search"
    :hot-items="hotItems"
    :suggest-items="suggestItems"
    store-history
    storage-key="search-history"
    expand-direction="left"
    @search="onSearch"
    @hot-click="onTopSearchItemClick"
    @history-click="onHistoryClick"
    @input="debouncedLoadSuggest"
    @clear="onClear"
    enable-image-search
    :upload-image="uploadImage"
  />
</template>
<style lang="scss" scoped>
.header-search :deep(.o-header-search-mobile-icon) {
  font-size: var(--o-icon_size-s);
  line-height: 28px;
}

.header-search :deep(.o-search-panel-no-data) {
  font-size: 14px;
}

.header-search :deep(.o-search-panel-section-title) {
  color: var(--o-color-info3);
}

.header-search {
  @include respond-to('<=pad_v') {
    :deep(.o-header-search-back-icon) {
      font-size: 24px;
    }
    :deep(.o-search-image-input-icon) {
      font-size: 24px;
    }
  }
}

.header-search :deep(.o-header-search-text) {
  @include respond-to('<=pad') {
    font-size: 14px;
  }
  height: auto;
  font-weight: 600;
}

.header-search :deep(.o-search-image-input-upload-btn) {
  &:is(:last-child) {
    margin-right: 0;
  }
}

.header-search :deep(.o-header-search-row) {
  align-items: center;
}

.header-search :deep(.o-input.o_box-medium) {
  @include respond-to('<=pad_v') {
    --_box-height: 40px;
  }
}

.header-search {
  --o-color-control2-light: #f6eefd;
  --o-color-control3-light: #e9d3fb;
}
:root.dark .header-search {
  --o-color-control2-light: #2b2b2f;
  --o-color-control3-light: #353539;
}

.header-search :deep(.o-search-panel-history-item) {
  background-color: var(--o-color-control2-light);
  @include hover {
    color: var(--o-color-info1);
    background-color: var(--o-color-control3-light);
  }
  @media (1680px >= width) {
    height: 20px;
    padding-left: 8px;
    padding-right: 8px;
  }
  @include respond-to('<=pad_v') {
    --_box-height: 40px;
  }
}

.header-search :deep(.o-search-panel-divider) {
  @media (max-width: 840px) {
    display: block;
  }
}

.header-search {
  :deep(.o-search-panel-history-text) {
    @include respond-to('<=pad_v') {
      font-size: 12px;
    }
  }
  :deep(.o-search-panel-hot-item) {
    @include respond-to('phone') {
      font-size: 14px;
    }
  }
}
</style>
