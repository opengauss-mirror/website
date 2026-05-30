<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData, useRouter } from 'vitepress';

import { useScreen } from '~@/composables/useScreen';

import { OHeaderSearch } from '@opendesign-plus/components';
import { imageUpload } from '~@/api/api-search';
import { useI18n } from 'vue-i18n';
import { useMessage } from '@opensig/opendesign';

const { t } = useI18n();
const { lang } = useData();
const { lePadV } = useScreen();

// 暂时固定数据 等接口出来在换
const hotList = {
  zh: ['数据类型', '逻辑复制', '索引', '迁移', '远程连接', '表空间', '日志', '闪回'],
  en: ['check_point', 'dcf', 'copy', 'create_schema'],
} as Record<string, string[]>;

const searchValue = ref('');
const hotItems = computed(() => hotList[lang.value]);
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
    danger(t('search.imageUploadFailed'));
    throw error;
  }
};

const isShowDrawer = ref(false);
const searchInput = ref('');

const router = useRouter();

// 搜索事件
function handleSearchEvent(query: { q: string; imageUrl?: string } = { q: searchInput.value }) {
  isShowDrawer.value = false;
  const queryString = Object.entries(query)
    .filter(([_, v]) => !!v)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  router.go(`/${lang.value}/search/?${queryString}`);
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
    class="header-search"
    v-model="searchValue"
    :mobile="lePadV"
    :placeholder="'search'"
    :hot-items="hotItems"
    store-history
    storage-key="search-history"
    expand-direction="left"
    @search="onSearch"
    @hot-click="onTopSearchItemClick"
    @history-click="onHistoryClick"
    enable-image-search
    :upload-image="uploadImage"
  />
</template>
<style lang="scss" scoped>
.header-search :deep(.o-header-search-mobile-icon) {
  font-size: var(--o-icon_size-s);
  line-height: 28px;
}

.header-search :deep(.o-header-search-back-icon) {
  font-size: 16px;
}

.header-search :deep(.o-header-search-text) {
  height: auto;
}
</style>
