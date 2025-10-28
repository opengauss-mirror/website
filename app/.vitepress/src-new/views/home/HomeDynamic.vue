<script setup lang="ts">
import { OIcon, OCard, OIconChevronRight, OLink, OScroller, OTab, OTabPane } from '@opensig/opendesign';
import { useRouter } from 'vitepress';
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
const { isPhone } = useScreen();
const blogsData = computed(() => {
  return isZh.value ? blogsAllData.zh.slice(0, 6) : blogsAllData.en.slice(0, 6);
});

const newsData = computed(() => {
  return isZh.value ? newsAllData.zh.slice(0, 6) : newsAllData.en.slice(0, 6);
});

const router = useRouter();

const toNewsContent = (path: string) => {
  router.go(`/${path}`);
};

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
        <OScroller :show-type="isPhone ? 'never' : 'always'">
          <OCard v-for="(item, index) in blogsData" :key="item.path" class="news-list-item" @click="toNewsContent(item.path)">
            <div class="news-img">
              <div class="cover" v-if="theme === 'dark'"></div>
              <img :src="coverList[index % 3]" alt="" />
            </div>
            <div class="news-info">
              <p class="news-title">{{ item.title }}</p>
              <p v-if="!isPhone" class="news-content">{{ item.summary }}</p>
            </div>
          </OCard>
        </OScroller>
      </OTabPane>
      <OTabPane value="news" :label="t('home.news')">
        <OScroller :show-type="isPhone ? 'never' : 'always'">
          <OCard v-for="item in newsData" :key="item.path" class="news-list-item" @click="toNewsContent(item.path)">
            <div class="news-img">
              <img :src="item.banner" :alt="item.banner" />
            </div>
            <div class="news-info">
              <p class="news-title">{{ item.title }}</p>
              <p v-if="!isPhone" class="news-content">{{ item.summary }}</p>
            </div>
          </OCard>
        </OScroller>
      </OTabPane>
    </OTab>
  </AppSection>
</template>

<style lang="scss" scoped>
:deep(.section-body) {
  @include respond-to('phone') {
    padding-right: 0 !important;
  }
}

:deep(.o-tab-navs) {
  @include respond-to('phone') {
    transform: translateX(calc(-1 * var(--layout-content-padding) / 2));
  }
}

.news-content {
  display: flex;
  overflow: auto;
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

@mixin trend-card {
  height: 100%;
  display: inline-flex;
  white-space: normal;
  --trend-card-gap: 32px;
  width: calc((100% - var(--trend-card-gap) * 2) / 3);

  &:not(:first-child) {
    margin-left: var(--trend-card-gap);
  }
  @include respond-to('<=laptop') {
    --trend-card-gap: 24px;
  }
  @include respond-to('<=pad') {
    --trend-card-gap: 18px;
  }
  @include respond-to('phone') {
    --trend-card-gap: 12px;
  }
}

.o-scroller {
  :deep(.o-scrollbar) {
    --scrollbar-height: 100%;
  }

  :deep(.o-scroller-container) {
    @include respond-to('phone') {
      padding-right: var(--layout-content-padding);
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

.news-list-item {
  @include trend-card();
  --card-main-padding: 0;
  @include hover {
    box-shadow: var(--o-shadow-2);
  }
  cursor: pointer;
  @include respond-to('>laptop') {
    min-height: 450px;
    max-height: 450px;
  }
  @include respond-to('laptop') {
    min-height: 347px;
    max-height: 347px;
  }
  @include respond-to('<=pad') {
    min-height: 272px;
    max-height: 272px;
  }
  @media (max-width: 620px) {
    height: auto;
  }

  @include respond-to('phone') {
    --size: calc((100vw - 48px - 12px) / 2);
    width: var(--size);
    height: var(--size);

    border-radius: 4px;
  }
  .news-img {
    position: relative;
    width: 100%;
    @include respond-to('phone') {
      height: 60%;
    }
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
      width: 100%;
      @include respond-to('>laptop') {
        min-height: 254px;
        max-height: 254px;
      }
      @include respond-to('laptop') {
        min-height: 207px;
        max-height: 207px;
      }
      @include respond-to('<=pad') {
        min-height: 140px;
        max-height: 140px;
      }
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }
  .news-info {
    padding: 24px;
    @include respond-to('laptop') {
      padding: 16px;
    }
    @include respond-to('<=pad') {
      padding: 12px;
    }
    color: var(--e-color-text1);
    .news-title {
      font-weight: 500;
      @include h4;
      margin-bottom: var(--e-spacing-h10);
      @include showline();
      -webkit-line-clamp: 2;
      line-clamp: 2;
    }
    .news-content {
      margin-top: var(--e-spacing-h5);
      @include showline();
      -webkit-line-clamp: 2;
      color: var(--e-color-text4);
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      @media (max-width: 500px) {
        line-height: var(--e-line-height-tip);
        font-size: var(--e-font-size-tip);
        color: var(--e-color-text4);
      }
    }
  }
}
.news-list-item:hover {
  .news-img img {
    transform: scale(1.05);
  }
}
</style>
