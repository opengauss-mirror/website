<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useData } from 'vitepress';

import { OArticleList } from '@opendesign-plus/components';
import type { ArticleItemT } from '@opendesign-plus/components';
import { ODateRangePicker } from '@opensig/opendesign';

import { useScreen } from '@opendesign-plus/composables';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import { storeToRefs } from 'pinia';

import NotFound from '@/NotFound.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import BannerLevel2 from '~@/components/BannerLevel2.vue';

import bannerLight from '@/assets/category/news/banner-light.png';
import bannerDark from '@/assets/category/news/banner-dark.png';

import newsAllData from '@/data/news';

const i18n = useI18n();
const { lang } = useData();
const { lePadV } = useScreen();
const { theme } = storeToRefs(useCommon());
const isDark = computed(() => theme.value === 'dark');
const banner = computed(() => (isDark.value ? bannerDark : bannerLight));
const newsData = computed(() => {
  return lang.value === 'zh' ? newsAllData.zh : newsAllData.en;
});

const dateRange = ref<[string, string] | null>(null);
const dateRangeRef = ref<HTMLElement | null>(null);
const dateStartVal = ref('');
const dateEndVal = ref('');

const articleData = computed<ArticleItemT[]>(() => {
  const filtered = newsData.value.filter((item: any) => {
    const itemTime = new Date(item.date).getTime();
    const matchTime = !dateRange.value || (itemTime >= new Date(dateRange.value[0]).getTime() && itemTime <= new Date(dateRange.value[1]).getTime());
    return matchTime;
  });
  return filtered.map((item) => ({
    title: item.title,
    description: item.summary,
    cover: item.banner,
    href: `/${item.path}`,
    date: item.date,
    author: item.author,
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
  <BannerLevel2 class="news-banner" :background-image="lePadV ? '' : banner" :title="i18n.common.COMMON_CONFIG.NEWS" />
  <ContentWrapper class="the-news-list" :vertical-padding="['40px', '72px']">
    <OArticleList class="article-list" :data="articleData" :page-size="12" :page-sizes="[12, 24, 48]" @page-change="onPageChange">
      <template #filter>
        <div class="news-filter">
          <div ref="dateRangeRef" class="news-filter-item">
            <span class="news-filter-item-title">{{ i18n.common.COMMON_CONFIG.TIME }}</span>
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
        </div>
      </template>
      <template #empty>
        <NotFound :no-data-tip="i18n.common.Not_Found" />
      </template>
    </OArticleList>
  </ContentWrapper>
</template>

<style lang="scss" scoped>
.news-banner {
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

    .banner-subtitle {
      display: none;
    }

    .banner-operation {
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

.the-news-list {
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

  .news-filter {
    display: flex;
    align-items: center;
    gap: 56px;

    :deep(.o_box-main) {
      transition: none;
    }

    @include respond('<=pad_v') {
      gap: 16px;
    }

    @include respond('phone') {
      flex-direction: column;
      align-items: stretch;
      gap: 24px;

      .news-filter-item {
        width: 100%;

        .o-date-range-picker {
          max-width: 100%;
        }
      }
    }
  }

  .news-filter-item {
    display: flex;
    align-items: center;
    position: relative;

    .news-filter-item-title {
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

  .article-list {
    :deep(.o-pagination) {
      --pagination-radius: 4px;
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
  }
}
</style>
