<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import { getSearchData, getSearchCount } from '@/api/api-search';

import NotFound from '@/NotFound.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import IconCancel from '~icons/app/icon-cancel.svg';

import useWindowResize from '@/components/hooks/useWindowResize';
import { addSearchBuriedData } from '@/shared/utils';

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const { lang, site } = useData();
const router = useRouter();
const i18n = useI18n();
// 接收搜索到的类型用于埋点传输数据
let typeList: any = [];
// 当前选择类型
const currentIndex = ref(0);
// 当前显示的页码
const currentPage = ref(1);
// 每页数据
const pageSize = ref(12);
// 控制分页器显示的时机
const pageShow = ref(false);
// 搜索内容
const searchInput = ref<string>('');
const searchValue = computed(() => {
  return i18n.value.common.SEARCH;
});
// 接收搜索数量的数据
const searchNumber: any = ref([]);
// 显示的数据类型
const searchType = ref('');
const searchData = computed(() => {
  return {
    keyword: searchInput.value,
    page: currentPage.value,
    pageSize: pageSize.value,
    lang: lang.value,
    type: searchType.value,
  };
});
const searchCount = computed(() => {
  return {
    keyword: searchInput.value,
    lang: lang.value,
  };
});
// 接收获取的搜索数据
const searchResultList: any = ref([]);
// 总数据数量
const total = computed(() => {
  return searchNumber.value[currentIndex.value]
    ? searchNumber.value[currentIndex.value].doc_count
    : 0;
});
// 分页器总页数
const totalPage = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});

// 点击搜索框的删除图标
function clearSearchInput() {
  searchResultList.value = '';
  searchInput.value = '';
  searchNumber.value.map((item: any) => {
    item.doc_count = 0;
  });
}
// 点击数据的类型导航
function setCurrentType(index: number, type: string) {
  currentIndex.value = index;
  if (type === 'all') {
    searchType.value = '';
  } else {
    searchType.value = type;
  }
  currentPage.value = 1;
  searchDataAll();
}

// 获取搜索结果各类型的数量
function searchCountAll() {
  try {
    getSearchCount(searchCount.value).then((res) => {
      if (res.status === 200 && res.obj.total[0]) {
        searchNumber.value = res.obj.total;
        // 埋点数据
        typeList = [];
        Object.keys(searchNumber.value).forEach((item) => {
          typeList.push(searchNumber.value[item].key);
        });
      } else {
        typeList = [];
        searchNumber.value = [];
      }
    });
  } catch (error: any) {
    throw Error(error);
  }
}
// 获取搜索结果的数据
function searchDataAll() {
  try {
    getSearchData(searchData.value).then((res) => {
      if (res.status === 200 && res.obj.records[0]) {
        searchResultList.value = res.obj.records;
        pageShow.value = true;
      } else {
        searchResultList.value = [];
        pageShow.value = false;
      }
      // 搜索埋点数据添加
      (function () {
        const search_event_id = `${
          searchData.value.keyword
        }${new Date().getTime()}${
          (window as any)['sensorsCustomBuriedData']?.ip || ''
        }`;
        const obj = {
          search_key: searchData.value.keyword,
          search_event_id,
        };
        (window as any)['addSearchBuriedData'] = obj;
        const sensors = (window as any)['sensorsDataAnalytic201505'];
        const searchKeyObj = {
          search_tag: typeList,
          search_result_total_num: total.value,
        };
        sensors?.setProfile({
          profileType: 'searchValue',
          ...((window as any)['sensorsCustomBuriedData'] || {}),
          ...((window as any)['addSearchBuriedData'] || {}),
          ...searchKeyObj,
        });
      })();
    });
  } catch (error: any) {
    throw Error(error);
  }
}
// 获取搜索结果的所有内容
function searchAll() {
  if (searchInput.value) {
    addSearchBuriedData(searchInput.value);
    currentIndex.value = 0;
    searchType.value = '';
    currentPage.value = 1;
    searchCountAll();
    searchDataAll();
  }
}
// 设置搜索结果的跳转路径
function goLink(data: any, index: number) {
  const { type, path } = data;
  const search_result_url = '/' + path;
  // 埋点数据
  const searchKeyObj = {
    search_tag: type,
    search_rank_num: pageSize.value * (currentPage.value - 1) + (index + 1),
    search_result_total_num: total.value,
    search_result_url: location.origin + search_result_url,
  };
  const sensors = (window as any)['sensorsDataAnalytic201505'];
  const sensorObj = {
    profileType: 'selectSearchResult',
    ...(data || {}),
    ...((window as any)['sensorsCustomBuriedData'] || {}),
    ...((window as any)['addSearchBuriedData'] || {}),
    ...searchKeyObj,
  };

  if (type === 'docs') {
    let goPath = path;
    if (/^docs\/master/g.test(path)) {
      goPath = path.replace(/^docs\/master/g, 'docs/latest');
    }
    const url = site.value.themeConfig.docsUrl + '/' + goPath + '.html';
    sensorObj.search_result_url = url;
    sensors.setProfile(sensorObj);
    window.open(url, '_blank');
  } else {
    sensors.setProfile(sensorObj);
    router.go(search_result_url);
  }
}
// 移动端上下翻页事件
function turnPage(option: string) {
  if (option === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
    searchDataAll();
  } else if (option === 'next' && currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
    searchDataAll();
  }
}
// 移动端跳转翻页事件
function jumpPage(page: number) {
  currentPage.value = page;
  searchDataAll();
}
onMounted(() => {
  if (decodeURI(location.href.split('=')[1]) !== 'undefined') {
    searchInput.value = decodeURI(window.location.href.split('=')[1]) + '';
  }
  searchAll();
});
</script>
<template>
  <div class="search">
    <OSearch
      v-model="searchInput"
      :placeholder="searchValue.PLEACHOLDER"
      @change="searchAll"
    >
      <template #suffix>
        <OIcon class="close" @click="clearSearchInput"><IconCancel /></OIcon>
      </template>
    </OSearch>
    <div class="search-content">
      <ul class="type">
        <li
          v-for="(item, index) in searchNumber"
          :key="item"
          :title="item.key"
          :class="currentIndex === index ? 'active' : ''"
          @click="setCurrentType(index, item.key)"
        >
          {{ i18n.search.tagList[item.key] }}
          <span>({{ item.doc_count }})</span>
        </li>
      </ul>
      <div class="content-box">
        <ul v-if="searchResultList.length" class="content-list">
          <li v-for="(item, index) in searchResultList" :key="item.id">
            <!-- eslint-disable-next-line -->
            <h3 @click="goLink(item, index)" v-html="item.title"></h3>
            <!-- eslint-disable-next-line -->
            <p class="detail" v-html="item.textContent"></p>
            <p class="from">
              <span>{{ i18n.search.form }}</span>
              <span>{{ i18n.search.tagList[item.type] }}</span>
              <template v-if="item.version">
                <span class="version">{{ i18n.search.version }}</span>
                <span>{{ item.version }}</span>
              </template>
            </p>
          </li>
        </ul>
        <NotFound v-else />
      </div>
      <div v-if="totalPage > 1 && pageShow" class="page-box">
        <ClientOnly>
          <OPagination
            v-if="!isMobile"
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            class="pagination-pc"
            :hide-on-single-page="true"
            :page-sizes="[pageSize]"
            :background="true"
            layout="sizes, prev, pager, next, slot, jumper"
            :total="total"
            @current-change="searchDataAll"
          >
            <span class="pagination-slot"
              >{{ currentPage }}/{{ totalPage }}</span
            >
          </OPagination>
        </ClientOnly>
        <AppPaginationMo
          :current-page="currentPage"
          :total-page="totalPage"
          @turn-page="turnPage"
          @jump-page="jumpPage"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search {
  max-width: 1504px;
  padding: var(--o-spacing-h2) 44px var(--o-spacing-h1);
  margin: 0 auto;

  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
  @media (max-width: 1439px) {
    padding-left: 24px;
  }
  @media (max-width: 1160px) {
    grid-gap: 12px;
  }
  @media (max-width: 1100px) {
    padding: 0 16px var(--o-spacing-h2);
    padding-top: var(--o-spacing-h2);
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    padding: 0 0 var(--o-spacing-h2) 0;
    padding-top: var(--o-spacing-h5);
  }

  @media (max-width: 768px) {
    :deep(.o-search) {
      height: 28px;
      font-size: 14px;
      width: 100vw;
      padding: 0 16px;
    }

    :deep(.el-input__inner) {
      font-size: 14px;
      height: 100%;
    }
    :deep(.el-input__prefix-inner) {
      font-size: 16px;
    }
  }
  .close {
    cursor: pointer;
  }
  .search-content {
    width: 100%;
    margin-top: var(--o-spacing-h2);

    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
    }
    .type {
      width: 100%;
      display: flex;
      padding-left: var(--o-spacing-h2);
      background-color: var(--o-color-bg2);
      border-bottom: 1px solid var(--o-color-division1);
      @media (max-width: 768px) {
        padding-left: var(--o-spacing-h4);
        padding-right: var(--o-spacing-h5);
      }
      li {
        height: 55px;
        min-width: 56px;
        margin-right: var(--o-spacing-h2);
        color: var(--o-color-text1);
        font-size: var(--o-font-size-h8);
        line-height: 55px;
        cursor: pointer;
        @media (max-width: 768px) {
          height: 34px;
          line-height: 34px;
          min-width: auto;
          font-size: var(--o-font-size-text);
          margin-right: 0;
          text-align: center;
          & + li {
            margin-left: 16px;
          }
          span {
            display: none;
          }
        }
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background-color: transparent;
          @media (max-width: 768px) {
            position: relative;
            width: 100%;
            top: -1px;
          }
        }
      }
      .active {
        color: var(--o-color-brand1);
        &::after {
          background-color: var(--o-color-brand1);
        }
      }
    }
    .content-box {
      min-height: 1948px;
      box-shadow: var(--o-shadow-l1);
      background-color: var(--o-color-bg2);
      @media (max-width: 768px) {
        width: 100vw;
        padding: var(--o-spacing-h5) var(--o-spacing-h5) 0 var(--o-spacing-h5);
        min-height: 0;
        background-color: var(--o-color-bg1);
        box-shadow: none;
      }
      .content-list {
        padding: 0 var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2);
        @media (max-width: 768px) {
          padding: 0;
          background-color: var(--o-color-bg2);
        }
        li {
          padding-top: var(--o-spacing-h2);
          @media (max-width: 768px) {
            padding-top: var(--o-spacing-h5);
            margin: 0 var(--o-spacing-h5);
            &::after {
              display: block;
              content: '';
              width: 100%;
              height: 1px;
              background-color: var(--o-color-division1);
              margin-top: 16px;
            }
            &:nth-last-of-type(1)::after {
              background-color: transparent;
            }
          }
          h3 {
            font-size: var(--o-font-size-h5);
            color: var(--o-color-text1);
            line-height: var(--o-line-height-h5);
            cursor: pointer;
            :deep(span) {
              color: var(--o-color-brand1);
            }
            @media (max-width: 768px) {
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
            }
          }
          .detail {
            margin-top: 17px;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--o-color-text1);
            :deep(span) {
              color: var(--o-color-brand1);
            }
            @media (max-width: 768px) {
              margin-top: 4px;
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              color: var(--o-color-text4);
            }
          }
          .from {
            margin-top: 15px;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--o-color-text4);
            @media (max-width: 768px) {
              margin-top: 8px;
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              color: var(--o-color-text4);
            }
          }
          .version {
            margin-left: var(--o-spacing-h4);
          }
        }
      }
    }

    .page-box {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: var(--o-spacing-h4);
      @media (max-width: 768px) {
        width: 100vw;
      }

      .pagination-pc {
        @media (max-width: 768px) {
          display: none;
        }
      }
    }
  }
}
</style>
