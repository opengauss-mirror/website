<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';
import useWindowResize from '@/components/hooks/useWindowResize';

import NotFound from '@/NotFound.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner/banner-secondary.png';
import illustration from '@/assets/illustrations/news.png';

import { getSortData } from '@/api/api-search';

interface NewsData {
  articleName: string;
  author: any;
  banner: string;
  category: string;
  date: string;
  deleteType: string;
  lang: string;
  path: string;
  summary: string;
  tags: string[];
  textContent: string;
  title: string;
  type: string;
}

interface ParamsType {
  page: number;
  pageSize: number;
  lang: string;
  category: string;
}

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
  const path1 = router.route.path.substring(0, 3);
  router.go(`${path1}/${path}`);
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
    .catch((error: any) => {
      isShowData.value = false;
      throw new Error(error);
    });
};

onMounted(() => {
  getListData(sortParams);
});

const currentChange = (val: number) => {
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
const moblieCurrentChange = (val: string) => {
  if (val === 'prev' && paginationData.value.currentpage > 1) {
    paginationData.value.currentpage = paginationData.value.currentpage - 1;
    currentChange(paginationData.value.currentpage);
  } else if (
    val === 'next' &&
    paginationData.value.currentpage < pageTotal.value
  ) {
    paginationData.value.currentpage = paginationData.value.currentpage + 1;
    currentChange(paginationData.value.currentpage);
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
          @click="toNewsContent(item.path)"
        >
          <div class="news-img">
            <img :src="item.banner" :alt="item.banner" />
          </div>
          <div class="news-info">
            <div class="news-title">
              <p>{{ item.title }}</p>
            </div>
            <div class="news-time">
              <p>{{ item.date }}</p>
            </div>
            <div class="news-content">
              <p>
                {{ item.summary }}
              </p>
            </div>
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
            layout="sizes, prev, pager, next, slot, jumper"
            :total="paginationData.total"
            :page-sizes="[3, 6, 9]"
            @current-change="currentChange"
            @size-change="currentChange(1)"
          >
            <span class="pagination-slot"
              >{{ paginationData.currentpage }}/{{ pageTotal }}</span
            >
          </OPagination>
        </ClientOnly>
        <AppPaginationMo
          :current-page="paginationData.currentpage"
          :total-page="pageTotal"
          @turn-page="moblieCurrentChange"
        >
        </AppPaginationMo>
      </div>
      <AppPaginationMo
        :current-page="paginationData.currentpage"
        :total-page="Math.ceil(paginationData.total / 10)"
        @turn-page="moblieCurrentChange"
      />
    </template>
    <NotFound v-else />
  </AppContent>
</template>

<style lang="scss" scoped>
@mixin showline {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
:deep(.el-card__body) {
  padding: 0;
}
::-webkit-scrollbar {
  display: none;
}
.dark img {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.news-pagination {
  margin-top: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    display: none;
  }
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
}
.news {
  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h4);
    &-item {
      justify-self: center;
      align-self: center;
      flex: 1;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    &-item:hover {
      box-shadow: var(--o-shadow-l2_hover);
      .news-img img {
        transform: scale(1.05);
      }
    }
  }
  &-img {
    width: 100%;
    height: 188px;
    max-height: 188px;
    object-fit: cover;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }
  &-info {
    padding: var(--o-spacing-h4);
    color: var(--o-color-text1);
  }
  &-title {
    font-weight: 500;
    height: 52px;
    line-height: var(--o-line-height-h7);
    font-size: var(--o-font-size-h7);
    margin-bottom: var(--o-spacing-h10);
    @include showline();
    -webkit-line-clamp: 2;
  }
  &-time {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
  &-content {
    margin-top: var(--o-spacing-h5);
    @include showline();
    -webkit-line-clamp: 2;
    color: var(--o-color-text4);
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
}

@media (max-width: 1450px) {
  .news-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 1100px) {
  .news-list {
    margin-top: var(--o-spacing-h5);
  }
}
@media (max-width: 980px) {
  .news-list {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 0;
  }

  :deep(.el-card__body) {
    display: flex;
    flex-direction: row;
  }
  .news-img,
  .news-info {
    flex: 1;
  }
}
@media (max-width: 768px) {
  .news-list {
    margin-bottom: var(--o-spacing-h5);
    grid-gap: var(--o-spacing-h5);
  }
  .pcpagination {
    display: none;
  }
}
@media (max-width: 620px) {
  .news-list-item {
    height: auto;
  }

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 500px) {
  .news-list {
    grid-template-columns: repeat(1, 1fr);
  }
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
  }

  .news-img {
    height: 180px;
  }
  .news-info {
    width: 100%;
    padding: var(--o-spacing-h6);
  }
  .news-title {
    height: auto;
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
    font-weight: 500;
    @include showline();
    -webkit-line-clamp: 1;
    margin-bottom: var(--o-spacing-h8);
  }
  .news-time {
    line-height: var(--o-line-height-tip);
    font-size: var(--o-font-size-tip);
    color: var(--o-color-neutral5);
  }
  .news-content {
    line-height: var(--o-line-height-tip);
    font-size: var(--o-font-size-tip);
    color: var(--o-color-neutral5);
  }
}
</style>
