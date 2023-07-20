<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';
import useWindowResize from '@/components/hooks/useWindowResize';
import { handleError } from '@/shared/utils';

import NotFound from '@/NotFound.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/news.png';

import { getSortData } from '@/api/api-search';
import type { NewsData, ParamsType } from '@/shared/@types/type-news';

const router = useRouter();
const { lang } = useData();
const screenWidth = useWindowResize();

const sortParams = reactive({
  page: 1,
  pageSize: 9,
  lang: lang.value,
  category: 'news',
});
// 新闻列表数据
const newsCardData = ref<NewsData[]>([]);
const isShowData = ref(false);
const isPad = computed(() => (screenWidth.value <= 768 ? true : false));

// 分页数据
const paginationData = ref({
  total: 0,
  pagesize: 9,
  currentpage: 0,
});

const i18n = useI18n();

const toNewsContent = (path: string) => {
  router.go(`/${path}`);
};

//获取数据
const getListData = (params: ParamsType) => {
  getSortData(params)
    .then((res) => {
      if (res.obj.count === 0) {
        isShowData.value = false;
      } else {
        paginationData.value.total = res.obj.count;
        paginationData.value.currentpage = res.obj.page;
        paginationData.value.pagesize = res.obj.pageSize;
        newsCardData.value = res.obj.records;
        for (let i = 0; i < newsCardData.value.length; i++) {
          if (typeof newsCardData.value[i].author === 'string') {
            newsCardData.value[i].author = [newsCardData.value[i].author];
          }
          newsCardData.value[i].banner = newsCardData.value[i].banner;
        }
        isShowData.value = true;
      }
    })
    .catch(() => {
      isShowData.value = false;
      handleError('Error!');
    });
};

onMounted(() => {
  getListData(sortParams);
});

const changeCurrent = (val: number) => {
  const params = {
    category: 'news',
    lang: lang.value,
    page: val,
    pageSize: paginationData.value.pagesize,
  };
  getListData(params);
};

const pageTotal = computed(() =>
  Math.ceil(paginationData.value.total / paginationData.value.pagesize)
);
const changeCurrentMoblie = (val: string) => {
  if (paginationData.value.currentpage > 1 && val === 'prev') {
    paginationData.value.currentpage = paginationData.value.currentpage - 1;
    changeCurrent(paginationData.value.currentpage);
  } else if (
    paginationData.value.currentpage < pageTotal.value &&
    val === 'next'
  ) {
    paginationData.value.currentpage = paginationData.value.currentpage + 1;
    changeCurrent(paginationData.value.currentpage);
  }
};
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :title="i18n.common.COMMON_CONFIG.NEWS"
    :illustration="illustration"
  />
  <AppContent :mobile-top="16">
    <template v-if="isShowData">
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
            v-model:currentPage="paginationData.currentpage"
            v-model:page-size="paginationData.pagesize"
            :background="true"
            :page-sizes="[3, 6, 9]"
            :total="paginationData.total"
            layout="sizes, prev, pager, next, slot, jumper"
            @current-change="changeCurrent"
            @size-change="changeCurrent(1)"
          >
            <span class="pagination-slot lable-name"
              >{{ paginationData.currentpage }}/{{ pageTotal }}</span
            >
          </OPagination>
          <AppPaginationMo
            v-else
            :total-page="pageTotal"
            :current-page="paginationData.currentpage"
            @turn-page="changeCurrentMoblie"
          />
        </ClientOnly>
      </div>
    </template>
    <NotFound v-else />
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
