<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { useData } from 'vitepress';
import { storeToRefs } from 'pinia';

import { OArticleList } from '@opendesign-plus/components';
import type { ArticleItemT } from '@opendesign-plus/components';
import { useScreen } from '@opendesign-plus/composables';
import { OButton, OIcon, OInput, OOption, OSelect, ODateRangePicker, OIconSearch } from '@opensig/opendesign';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

import NotFound from '@/NotFound.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import BannerLevel2 from '~@/components/BannerLevel2.vue';

import bannerLight from '@/assets/category/blogs/banner-light.png';
import bannerDark from '@/assets/category/blogs/banner-dark.png';

import blogsAllData from '@/data/blogs';

const i18n = useI18n();
const { lang } = useData();
const { lePadV } = useScreen();
const userCaseData = computed(() => i18n.value.common.COMMON_CONFIG);

const { theme } = storeToRefs(useCommon());
const isDark = computed(() => theme.value === 'dark');
const banner = computed(() => (isDark.value ? bannerDark : bannerLight));

const blogsData = computed(() => {
  return lang.value === 'zh' ? blogsAllData.zh : blogsAllData.en;
});

// 筛选选项：时间范围 + 组合搜索（类型 + 关键词）
const dateRange = ref<[string, string] | null>(null);
const dateStartVal = ref('');
const dateEndVal = ref('');
const searchTypeVal = ref('all');
const searchKeywordVal = ref('');

const searchTypeOptions = computed(() => [
  { label: userCaseData.value.ALL, value: 'all' },
  { label: userCaseData.value.TITLE, value: 'title' },
  { label: userCaseData.value.AUTHOR, value: 'author' },
  { label: userCaseData.value.TAGS, value: 'tags' },
]);

const searchPlaceholder = computed(() => {
  if (searchTypeVal.value === 'author') return userCaseData.value.SEARCH_BLOG_AUTHOR;
  if (searchTypeVal.value === 'tags') return userCaseData.value.SEARCH_BLOG_TAGS;
  if (searchTypeVal.value === 'title') return userCaseData.value.SEARCH_BLOG_TITLE;
  return userCaseData.value.SEARCH_BLOG_ALL;
});

// 搜索候选项面板
interface SearchCandidateT {
  name: string;
  parts: { text: string; hit: boolean }[];
}
interface SearchGroupT {
  id: 'title' | 'author' | 'tags';
  label: string;
  list: SearchCandidateT[];
}

const panelRef = ref<HTMLElement | null>(null);
const dateRangeRef = ref<HTMLElement | null>(null);
const showPanel = ref(false);
const searchData = ref<SearchGroupT[]>([]);
const popoverVisible = computed(() => showPanel.value && !!searchKeywordVal.value.trim());

const splitHighlight = (text: string, kw: string): { text: string; hit: boolean }[] => {
  const idx = text.toLowerCase().indexOf(kw);
  if (!kw || idx === -1) return [{ text, hit: false }];
  return [
    { text: text.slice(0, idx), hit: false },
    { text: text.slice(idx, idx + kw.length), hit: true },
    { text: text.slice(idx + kw.length), hit: false },
  ];
};

const collectCandidates = (kw: string): SearchGroupT[] => {
  const collect = (getValues: (item: any) => string[]): SearchCandidateT[] => {
    const seen = new Set<string>();
    const result: SearchCandidateT[] = [];
    blogsData.value.forEach((item: any) => {
      (getValues(item) ?? []).forEach((v: string) => {
        const t = v?.trim();
        if (t && !seen.has(t) && t.toLowerCase().includes(kw)) {
          seen.add(t);
          result.push({ name: t, parts: splitHighlight(t, kw) });
        }
      });
    });
    return result.slice(0, 3);
  };
  const groups: SearchGroupT[] = [
    { id: 'title', label: userCaseData.value.TITLE, list: collect((item) => [item.title]) },
    { id: 'author', label: userCaseData.value.AUTHOR, list: collect((item) => item.author) },
    { id: 'tags', label: userCaseData.value.TAGS, list: collect((item) => item.tags) },
  ];
  return searchTypeVal.value === 'all' ? groups : groups.filter((g) => g.id === searchTypeVal.value);
};

watch([searchKeywordVal, searchTypeVal], () => {
  const kw = searchKeywordVal.value.trim().toLowerCase();
  searchData.value = kw ? collectCandidates(kw) : [];
});

const onDocumentClick = (e: MouseEvent) => {
  const target = e.target as Node;
  if (panelRef.value?.contains(target)) return;
  if (document.querySelector('.blogs-search-panel')?.contains(target)) return;
  showPanel.value = false;
};
onMounted(() => document.addEventListener('click', onDocumentClick));
onUnmounted(() => document.removeEventListener('click', onDocumentClick));

const clickCandidate = (name: string) => {
  searchKeywordVal.value = name;
  showPanel.value = false;
};

const articleData = computed<ArticleItemT[]>(() => {
  const filtered = blogsData.value.filter((item: any) => {
    const itemTime = new Date(item.date).getTime();
    const matchTime = !dateRange.value || (itemTime >= new Date(dateRange.value[0]).getTime() && itemTime <= new Date(dateRange.value[1]).getTime());
    const kw = searchKeywordVal.value.trim().toLowerCase();
    let matchSearch = true;
    if (kw) {
      const matchTitle = item.title?.toLowerCase().includes(kw);
      const matchAuthor = item.author?.some((author: string) => author.toLowerCase().includes(kw));
      const matchTags = item.tags?.some((tag: string) => tag.toLowerCase().includes(kw));
      if (searchTypeVal.value === 'title') matchSearch = matchTitle;
      else if (searchTypeVal.value === 'author') matchSearch = matchAuthor;
      else if (searchTypeVal.value === 'tags') matchSearch = matchTags;
      else matchSearch = matchTitle || matchAuthor || matchTags;
    }
    return matchTime && matchSearch;
  });
  return filtered.map((item) => ({
    title: item.title,
    description: item.summary,
    href: `/${item.path}`,
    date: item.date,
    author: item.author,
    tags: item.tags?.map((tag: string) => ({ label: tag })),
  }));
});

const onDateChange = () => {
  dateRange.value = dateStartVal.value && dateEndVal.value ? [dateStartVal.value, dateEndVal.value] : null;
};
watch([dateStartVal, dateEndVal], onDateChange);
const onPageChange = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<template>
  <BannerLevel2 class="blogs-banner" :background-image="lePadV ? '' : banner" :title="userCaseData.BLOG">
    <template #default>
      <OButton v-if="!lePadV" class="post-btn" variant="solid" color="primary" round="pill" animation size="large" :href="`/${lang}/blogs/guidance/`">
        {{ userCaseData.STRATEGY }}
      </OButton>
    </template>
  </BannerLevel2>
  <ContentWrapper class="the-blogs-list" :class="{ 'is-dark': isDark }" :vertical-padding="['40px', '72px']">
    <OArticleList class="article-list" :data="articleData" :page-size="12" :page-sizes="[12, 24, 48]" @page-change="onPageChange">
      <template #filter>
        <div class="blogs-filter">
          <div ref="dateRangeRef" class="blogs-filter-item">
            <span class="blogs-filter-item-title">{{ userCaseData.TIME }}</span>
            <ODateRangePicker
              :popup-wrapper="dateRangeRef"
              v-model:start="dateStartVal"
              v-model:end="dateEndVal"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              clearable
              size="large"
            />
          </div>
          <div class="blogs-filter-select-box">
            <div ref="panelRef" class="blogs-filter-select" :class="{ 'blogs-filter-select-focus': showPanel }">
              <OSelect v-model="searchTypeVal" size="large" trigger="click" variant="outline">
                <OOption v-for="item in searchTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </OSelect>
              <OInput
                v-model="searchKeywordVal"
                class="blogs-filter-search"
                clearable
                :placeholder="searchPlaceholder"
                size="large"
                @focus.capture="showPanel = true"
                @press-enter="showPanel = false"
                @clear="showPanel = false"
              >
                <template #prefix>
                  <OIcon><OIconSearch /></OIcon>
                </template>
              </OInput>
            </div>
            <div v-if="popoverVisible" class="blogs-search-panel">
              <div class="blogs-search-data">
                <template v-if="searchData.length">
                  <div v-for="group in searchData" :key="group.id" class="blogs-search-group">
                    <p v-if="searchTypeVal === 'all'" class="blogs-search-label">{{ group.label }}</p>
                    <template v-if="group.list.length">
                      <div v-for="it in group.list" :key="it.name" class="blogs-search-item" @click.stop="clickCandidate(it.name)">
                        <span class="blogs-search-title">
                          <template v-for="(p, i) in it.parts" :key="i">
                            <span :class="{ 'blogs-search-highlight': p.hit }">{{ p.text }}</span>
                          </template>
                        </span>
                      </div>
                    </template>
                    <p v-else class="blogs-search-no-result">{{ i18n.common.Not_Found }}</p>
                  </div>
                </template>
                <p v-else class="blogs-search-no-result">{{ i18n.common.Not_Found }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <NotFound :no-data-tip="i18n.common.Not_Found" />
      </template>
    </OArticleList>
  </ContentWrapper>
</template>

<style lang="scss" scoped>
.blogs-banner {
  :deep(.wrap) {
    height: 280px;

    @include respond('<=laptop') {
      height: 220px;
    }

    @include respond('<=pad') {
      height: 180px;
    }

    @include respond('<=pad_v') {
      padding-top: 16px;
      height: auto;
    }

    .banner-text .banner-title {
      font-size: 48px;
      line-height: 64px;

      @include respond('<=laptop') {
        font-size: 40px;
        line-height: 56px;
      }

      @include respond('<=pad') {
        font-size: 32px;
        line-height: 44px;
      }

      @include respond('<=pad_v') {
        font-size: 22px;
        line-height: 30px;
      }
    }

    .banner-operation {
      margin-top: var(--o-r-gap-5) !important;

      @include respond('<=pad_v') {
        display: none;
      }
    }

    .banner-illustration img {
      @include respond('<=laptop') {
        max-height: 170px;
      }

      @include respond('<=pad') {
        max-height: 150px;
      }

      @include respond('<=pad_v') {
        display: none;
      }
    }
  }
}

.the-blogs-list {
  @include respond('<=laptop') {
    --content-wrapper-vertical-paddingTop: 24px !important;
    --content-wrapper-vertical-paddingBottom: 56px !important;
  }

  @include respond('<=pad') {
    --content-wrapper-vertical-paddingTop: 16px !important;
    --content-wrapper-vertical-paddingBottom: 40px !important;
  }

  @include respond('<=pad_v') {
    --content-wrapper-vertical-paddingTop: 16px !important;
    --content-wrapper-vertical-paddingBottom: 32px !important;
  }

  .blogs-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;

    :deep(.o_box-main) {
      transition: none;
    }

    @include respond('phone') {
      flex-direction: column;
      align-items: stretch;
      gap: 24px;

      .blogs-filter-select-box {
        width: 100%;
      }

      .blogs-filter-item {
        .o-date-range-picker {
          max-width: 100%;
        }
      }
    }
  }

  .blogs-filter-item {
    display: flex;
    align-items: center;
    position: relative;

    .blogs-filter-item-title {
      flex-shrink: 0;
      margin-right: var(--o-gap-6);
      color: var(--o-color-text1);
      @include text1;

      @include respond('<=laptop') {
        margin-right: 24px;
      }

      @include respond('<=pad_v') {
        margin-right: 16px;
      }
    }

    .o-date-range-picker {
      max-width: 320px;
      width: 100%;

      @include respond('<=laptop') {
        max-width: 268px;
      }
    }

    :deep(.o-date-range-panel-body) {
      --o-radius-xs: 4px;
      --o-radius-s: 4px;
      --o-radius-m: 4px;
      --o-radius-l: 4px;
      --o-radius-xl: 4px;
      --o-radius_control-xs: 4px;
      --o-radius_control-s: 4px;
      --o-radius_control-m: 4px;
      --o-radius_control-l: 4px;

      @include respond('phone') {
        flex-direction: column;
      }
    }
  }

  .blogs-filter-select-box {
    display: flex;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;

    @include respond('<=pad_v') {
      width: 50%;
    }

    .blogs-filter-select {
      display: inline-flex;
      align-items: center;
      position: relative;
      z-index: 9;
      width: 455px;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid var(--o-color-control1);
      border-radius: var(--o-radius-xs);
      background-color: var(--o-color-fill2);
      overflow: hidden;

      &:hover {
        border-color: var(--o-color-primary2);
      }

      &.blogs-filter-select-focus {
        border-color: var(--o-color-primary3);
      }

      @include respond('<=laptop') {
        width: 400px;
        height: 36px;
      }

      @include respond('<=pad_v') {
        width: 100%;
        height: 40px;
      }

      :deep(.o-select) {
        --select-icon-size: 24px;
        --select-bg-color: var(--o-color-fill2);
        --select-bg-color-hover: var(--o-color-fill2);
        --select-bg-color-focus: var(--o-color-fill2);
        height: 100%;
        min-height: 0;
        width: 148px;
        border: none;
        border-radius: 0;
        border-right: 1px solid var(--o-color-control1);

        @include respond('<=laptop') {
          width: 120px;
        }

        @include respond('<=pad') {
          width: 140px;
        }

        @include respond('<=pad_v') {
          width: 40%;
          max-width: 100%;
        }
      }

      :deep(.blogs-filter-search) {
        flex: 1;
        height: 100%;
        width: 280px;
        --_box-bg-color: var(--o-color-fill2);
        --_box-bg-color-hover: var(--o-color-fill2);
        --_box-bg-color-focus: var(--o-color-fill2);

        .o_box-main {
          border: none;
        }

        .o_input-prefix .o-icon,
        .o-icon {
          font-size: 24px;
        }

        @include respond('<=laptop') {
          width: 240px;
        }

        @include respond('<=pad') {
          width: auto;
        }
      }
    }
  }

  .blogs-search-panel {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 100;
    border-radius: var(--o-radius-xs);
    background-color: var(--o-color-fill2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    padding: 8px;

    @include respond('phone') {
      width: 100%;

      .blogs-search-data {
        width: 100%;
      }
    }
  }

  .blogs-search-data {
    width: 320px;

    .blogs-search-group + .blogs-search-group {
      margin-top: 4px;
    }

    .blogs-search-label {
      color: var(--o-color-info3);
      padding: 4px 8px;
      @include tip2;
    }

    .blogs-search-item {
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      border-radius: var(--o-radius-xs);

      &:hover {
        background-color: var(--o-color-control2-light);
      }
    }

    .blogs-search-title {
      color: var(--o-color-info1);
      @include text1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .blogs-search-highlight {
      color: var(--o-color-link1);
    }

    .blogs-search-no-result {
      padding: 8px 12px;
      color: var(--o-color-info3);
      @include tip1;
    }
  }

  .article-list {
    :deep(.o-col) {
      min-width: 0;
    }

    :deep(.o-card) {
      --card-content-gap: 8px;
      background-image: url(@/assets/category/blogs/light.png);
      background-position: right bottom;
      background-repeat: no-repeat;
      background-size: cover;
    }

    :deep(.o-card-main) {
      --card-main-padding: 24px 32px;

      @include respond('<=laptop') {
        --card-main-padding: 16px 24px;
      }

      @include respond('<=pad') {
        --card-main-padding: 12px 16px;
      }

      @include respond('<=pad_v') {
        --card-main-padding: 12px;
      }
    }

    :deep(.o-card-detail) {
      display: block;
    }

    :deep(.o-card-detail .item-desc) {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 12px;

      &::after {
        display: none;
      }
    }

    :deep(.o-pagination) {
      --pagination-radius: 4px;
    }

    :deep(.o-tag) {
      --tag-bg-color: var(--o-color-control2-light);
      --tag-bd-color: transparent;
      --tag-bd-color-hover: transparent;
      padding: 3px 12px !important;
      max-width: 100%;

      .o-tag-label {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  &.is-dark {
    .article-list {
      :deep(.o-card) {
        background-image: url(@/assets/category/blogs/dark.png);
      }
    }
  }
}
</style>
