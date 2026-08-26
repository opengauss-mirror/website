<script setup lang="ts">
import { OIcon, OCard, OIconChevronRight, OLink, OScroller, OTab, OTabPane } from '@opensig/opendesign';
import { computed, ref } from 'vue';
import AppSection from '~@/components/AppSection.vue';
import blogsAllData from '@/data/blogs';
import newsAllData from '@/data/news';
import { useScreen } from '~@/composables/useScreen';

import blogCover1 from '~@/assets/category/home/dynamic/cover1.png';
import blogCover2 from '~@/assets/category/home/dynamic/cover2.png';
import blogCover3 from '~@/assets/category/home/dynamic/cover3.png';
import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';

const { t, isZh, locale } = useLocale();
const coverList = [blogCover1, blogCover2, blogCover3];

const { theme } = storeToRefs(useCommon());
const { lePadV } = useScreen();
const blogsData = computed(() => {
  const res = new Array(6);
  let i = 0;
  const data = isZh.value ? blogsAllData.zh : blogsAllData.en;
  for (const item of data) {
    if (i >= 6) {
      break;
    }
    if (item.summary) {
      res[i] = item;
      i++;
    }
  }
  return res;
});

const newsData = computed(() => {
  return isZh.value ? newsAllData.zh.slice(0, 6) : newsAllData.en.slice(0, 6);
});

const activeTab = ref('blogs');
</script>

<template>
  <AppSection :title="t('home.COMMUNITY_ACTIVITY.TITLE')">
    <template #footer>
      <OLink :href="`/${locale}/${activeTab}`" target="_blank" style="display: flex; align-items: center;">
        {{ t('common.VIEW_MORE') }}
        <template #suffix>
          <OIcon style="font-size: 1.5rem;"><OIconChevronRight /> </OIcon>
        </template>
      </OLink>
    </template>
    <OTab v-model="activeTab" variant="text" :line="false">
      <OTabPane value="blogs" :label="t('home.blog')">
        <OScroller size="small" disabled-y :show-type="lePadV ? 'never' : 'always'">
          <OCard v-for="(item, index) in blogsData" :key="item.path" class="news-list-item" :href="`/${item.path}`">
            <div class="news-img">
              <div class="cover" v-if="theme === 'dark'"></div>
              <img :src="coverList[index % 3]" alt="" />
            </div>
            <div class="news-info">
              <p class="news-title">{{ item.title }}</p>
              <p v-if="!lePadV" class="news-content">{{ item.summary }}</p>
            </div>
          </OCard>
        </OScroller>
      </OTabPane>
      <OTabPane value="news" :label="t('home.news')">
        <OScroller size="small" disabled-y :show-type="lePadV ? 'never' : 'always'">
          <OCard v-for="item in newsData" :key="item.path" class="news-list-item" :href="`/${item.path}`">
            <div class="news-img">
              <img :src="item.banner" :alt="item.banner" />
            </div>
            <div class="news-info">
              <p class="news-title">{{ item.title }}</p>
              <p v-if="!lePadV" class="news-content">{{ item.summary }}</p>
            </div>
          </OCard>
        </OScroller>
      </OTabPane>
    </OTab>
  </AppSection>
</template>

<style lang="scss" scoped>
:deep(.section-footer) {
  margin-top: 32px;
  @include respond-to('laptop') {
    margin-top: 24px !important;
  }
  @include respond-to('pad_h') {
    margin-top: 16px !important;
  }
  @include respond-to('<=pad_v') {
    margin-top: 12px !important;
  }
}
:deep(.o-scrollbar-wrapper) {
  padding-top: 32px !important;
  padding-bottom: 16px !important;
  @include respond-to('laptop') {
    padding-top: 24px !important;
  }
  @include respond-to('pad_h') {
    padding-top: 16px !important;
  }
  @include respond-to('<=pad_v') {
    padding-bottom: 12px !important;
    padding-top: 12px !important;
  }
}
:deep(.section-body) {
  @include respond-to('phone') {
    width: 100% !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
}

:deep(.o-tab-navs) {
  @include respond-to('phone') {
    transform: translateX(calc(-1 * var(--layout-content-padding) / 2));
  }
}

:deep(.o-scroller-container) {
  padding-bottom: 24px;
  @include respond-to('<=pad_v') {
    padding-bottom: 0;
  }
}

@mixin showline {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

:deep(.el-card__body) {
  width: 100%;
}

.o-scroller {
  :deep(.o-scrollbar) {
    --scrollbar-height: 100%;
  }

  :deep(.o-scroller-container) {
    @include respond-to('phone') {
      padding: 0 var(--layout-content-padding);
    }
  }

  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
  padding: 32px 0 36px;
  @include respond-to('phone') {
    padding: 12px 0;
  }
}

@mixin item-card {
  height: 100%;
  display: inline-flex;
  white-space: normal;
  --card-gap: 32px;
  width: calc((100% + var(--card-gap)) / 3 - var(--card-gap));

  &:not(:first-child) {
    margin-left: var(--card-gap);
  }
  @include respond-to('laptop') {
    --card-gap: 24px;
  }
  @include respond-to('pad') {
    --card-gap: 16px;
  }
  @include respond-to('phone') {
    --card-gap: 12px;
    --ltpad-content-width: calc(100vw - var(--layout-content-padding) * 2);
    width: calc((var(--ltpad-content-width) + var(--card-gap)) / 2 - var(--card-gap));
  }
}

.news-list-item {
  @include item-card();
  border-radius: 4px;
  --card-main-padding: 0;
  --title-color: var(--e-color-text1);
  @include hover {
    --title-color: var(--o-color-primary1);
    box-shadow: var(--o-shadow-2);
  }
  cursor: pointer;
  .news-img {
    position: relative;
    width: 100%;
    overflow: hidden;
    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.2;
    }
    img {
      aspect-ratio: 16 / 9;
      width: 100%;
      height: auto;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }
  .news-info {
    padding: 32px;
    @include respond-to('laptop') {
      padding: 24px;
    }
    @include respond-to('pad_h') {
      padding: 16px;
    }
    @include respond-to('pad_v') {
      padding: 12px;
    }
    @include respond-to('phone') {
      padding: 8px;
    }
    color: var(--e-color-text1);
    .news-title {
      color: var(--title-color);
      font-weight: 500;
      @include h4;
      margin-bottom: var(--e-spacing-h10);
      @include showline();
      -webkit-line-clamp: 2;
      line-clamp: 2;
    }
    .news-content {
      font-size: 16px;
      line-height: 24px;
      @media (min-width: 1201px) and (max-width: 1440px) {
        font-size: 14px;
        line-height: 22px;
      }
      @media (max-width: 1200px) {
        font-size: 12px;
        line-height: 18px;
      }
      @include showline();
      margin-top: var(--e-spacing-h5);
      -webkit-line-clamp: 2;
      line-clamp: 2;
      color: var(--o-color-info2);
    }
  }
}
.news-list-item:hover {
  .news-img img {
    transform: scale(1.05);
  }
}
</style>
