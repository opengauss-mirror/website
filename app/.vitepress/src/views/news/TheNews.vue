<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';
import useWindowResize from '@/components/hooks/useWindowResize';

import NotFound from '@/NotFound.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/news.png';

import newsAllData from '@/data/news';

const i18n = useI18n();
const router = useRouter();
const { lang } = useData();
const screenWidth = useWindowResize();
const isPad = computed(() => (screenWidth.value <= 768 ? true : false));
const newsData = computed(() => {
  return lang.value === 'zh' ? newsAllData.zh : newsAllData.en;
});
// 分页器数据
const total = computed(() => {
  return newsData.value.length;
});
const pagesize = ref(9);
const currentPage = ref(1);
const pageTotal = computed(() => Math.ceil(total.value / pagesize.value));
const changePagesize = () => {
  currentPage.value = 1;
};
const changeCurrentMoblie = (val: string) => {
  if (currentPage.value > 1 && val === 'prev') {
    currentPage.value = currentPage.value - 1;
  } else if (currentPage.value < pageTotal.value && val === 'next') {
    currentPage.value = currentPage.value + 1;
  }
};

// 新闻列表数据
const newsCardData = computed(() => {
  return newsData.value.slice(
    (currentPage.value - 1) * pagesize.value,
    currentPage.value * pagesize.value
  );
});

const toNewsContent = (path: string) => {
  router.go(`/${path}`);
};
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :title="i18n.common.COMMON_CONFIG.NEWS"
    :illustration="illustration"
  />
  <AppContent :mobile-top="16">
    <template v-if="newsCardData.length">
      <div class="news-list">
        <OCard
          v-for="item in newsCardData"
          :key="item.path"
          class="news-list-item"
          shadow="hover"
          @click="toNewsContent(item.path)"
        >
          <div class="news-img">
            <img :src="item.banner" :alt="item.banner" />
          </div>
          <div class="news-info">
            <p class="news-title">{{ item.title }}</p>
            <p class="news-time">{{ item.date }}</p>
            <p class="news-content">
              {{ item.summary }}
            </p>
          </div>
        </OCard>
      </div>
      <div class="news-pagination">
        <ClientOnly>
          <OPagination
            v-if="!isPad"
            v-model:currentPage="currentPage"
            v-model:page-size="pagesize"
            :background="true"
            :page-sizes="[3, 6, 9]"
            :total="total"
            layout="sizes, prev, pager, next, slot, jumper"
            @size-change="changePagesize"
          >
            <span class="pagination-slot lable-name"
              >{{ currentPage }}/{{ pageTotal }}</span
            >
          </OPagination>
          <AppPaginationMo
            v-else
            :total-page="pageTotal"
            :current-page="currentPage"
            @turn-page="changeCurrentMoblie"
          />
        </ClientOnly>
      </div>
    </template>
    <NotFound v-else :no-data-tip="i18n.common.Not_Found" />
  </AppContent>
</template>

<style lang="scss" scoped>
@mixin showline {
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
:deep(.el-card__body) {
  padding: 0;
  @media (max-width: 980px) {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
}
::-webkit-scrollbar {
  display: none;
}
.dark img {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.news-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h4);
  @media (max-width: 1100px) {
    margin-top: var(--o-spacing-h5);
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 980px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 0;
  }
  @media (max-width: 768px) {
    grid-gap: var(--o-spacing-h5);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .news-list-item {
    justify-self: center;
    align-self: center;
    flex: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
    @media (max-width: 620px) {
      height: auto;
    }
    .news-img {
      width: 100%;
      height: 188px;
      max-height: 188px;
      object-fit: cover;
      overflow: hidden;
      @media (max-width: 980px) {
        flex: 1;
      }
      @media (max-width: 500px) {
        height: 180px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }
    .news-info {
      padding: var(--o-spacing-h4);
      color: var(--o-color-text1);
      @media (max-width: 980px) {
        flex: 1;
      }
      @media (max-width: 500px) {
        width: 100%;
        padding: var(--o-spacing-h6);
      }
      .news-title {
        font-weight: 500;
        height: 52px;
        line-height: var(--o-line-height-h7);
        font-size: var(--o-font-size-h7);
        margin-bottom: var(--o-spacing-h10);
        @include showline();
        -webkit-line-clamp: 2;
        @media (max-width: 500px) {
          height: auto;
          line-height: var(--o-line-height-text);
          font-size: var(--o-font-size-text);
          font-weight: 500;
          -webkit-line-clamp: 1;
          margin-bottom: var(--o-spacing-h8);
        }
      }
      .news-time {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        @media (max-width: 500px) {
          line-height: var(--o-line-height-tip);
          font-size: var(--o-font-size-tip);
          color: var(--o-color-text1);
        }
      }
      .news-content {
        margin-top: var(--o-spacing-h5);
        @include showline();
        -webkit-line-clamp: 2;
        color: var(--o-color-text4);
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        @media (max-width: 500px) {
          line-height: var(--o-line-height-tip);
          font-size: var(--o-font-size-tip);
          color: var(--o-color-text4);
        }
      }
    }
  }
  .news-list-item:hover {
    .news-img img {
      transform: scale(1.05);
    }
  }
}
.news-pagination {
  margin-top: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h5);
  }
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
}
</style>
