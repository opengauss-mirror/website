<script setup lang="ts">
import { computed, ref, onMounted, watch, reactive, onUnmounted } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import { getSearchData, getSearchCount, getTagsData, getRelevant } from '@/api/api-search';

import { OSearchInput } from '@opendesign-plus/components';

import NotFound from '@/NotFound.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import IconSearch from '~icons/app/icon-search.svg';

import useWindowResize from '@/components/hooks/useWindowResize';
import { windowOpen, handleError } from '@/shared/utils';

import { DOCS_LINK } from '@/data/url-config';
import { v4 as uniqueId } from 'uuid';
import { oaReport } from '@opendesign-plus/plugins/analytics';

import { SearchCountItemT } from '@/shared/@types/type-search';
import { getUrlParam } from '~@/utils/common';
import { useDebounceFn, useUrlSearchParams } from '@vueuse/core';
import { getSearchWord, imageSearch, imageUpload } from '~@/api/api-search';
import TheSearchCorrection from './components/TheSearchCorrection.vue';
import { useScreen } from '~@/composables/useScreen';
import { ODivider } from '@opensig/opendesign';
import TheSearchRelated from './components/TheSearchRelated.vue';

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const { lang } = useData();
const { lePadV } = useScreen();
const router = useRouter();
const i18n = useI18n();
const activeVersion = ref('');
// 当前选择类型
const currentIndex = ref(0);
// 当前显示的页码
const currentPage = ref(1);
// 每页数据
const pageSize = ref(12);
// 控制分页器显示的时机
const pageShow = ref(false);
// 控制无数据状态显示
const isNotFound = ref(false);
// 搜索内容
const searchInput = ref<string>('');
// 接收搜索数量的数据
const searchNumber = ref<SearchCountItemT[]>([]);
// 显示的数据类型
const searchType = ref('');

const sanitizeSearchInput = (val: string) => val.replace(/[,.;'"<>?!/\\，。、；’”——《》【】（）？！]/g, '').trim();

const urlParams = useUrlSearchParams('history');

const searchDataParams = computed(() => {
  return {
    keyword: searchInput.value || decodeURIComponent(location.href.split('=')[1]),
    page: currentPage.value,
    pageSize: pageSize.value,
    lang: lang.value,
    hq: 'opengauss',
    type: searchType.value,
    limit: [
      {
        type: 'docs',
        version: activeVersion.value === i18n.value.search.tagList.all ? '' : activeVersion.value,
      },
    ],
  };
});

const imageUrl = computed(() => urlParams.imageUrl as string ?? '');
const suggestItems = ref<{ key: string; count?: number }[]>([]);
const hasImage = computed(() => !!imageUrl.value);

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

const onInput = (val: string) => {
  debouncedLoadSuggest(val);
};

const uploadImage = async (file: File) => {
  try {
    const res = await imageUpload(file);
    if (!res.obj) throw new Error('Upload returned empty URL');
    return res.obj as string;
  } catch (error) {
    console.log('upload failed');
    throw error;
  }
};

const onSearch = (payload: { keyword: string; imageUrl?: string }) => {
  const { keyword, imageUrl } = payload;
  if (keyword) {
    searchInput.value = sanitizeSearchInput(keyword);
  }
  if (imageUrl) {
    urlParams.imageUrl = imageUrl;
  } else {
    delete urlParams.imageUrl;
  }
  // 清空旧数据
  correctedList.value = [];
  relatedList.value = [];
  // 同步搜索词到 URL ?q=（useUrlSearchParams 通过 History API 写入，dev/生产均生效）
  urlParams.q = searchInput.value;
  // 直接触发搜索；router.go 在生产构建中不会重新挂载组件，故不再依赖路由跳转
  searchAll();
};

// URL 变化（浏览器前进/后退、popstate）时反向联动搜索词
watch(
  () => urlParams.q,
  (newQ) => {
    if (!newQ) return;
    const kw = sanitizeSearchInput(decodeURIComponent(newQ as string));
    if (kw === searchInput.value) return;
    searchInput.value = kw;
    correctedList.value = [];
    relatedList.value = [];
    searchAll();
  }
);

const searchCountParams = computed(() => {
  return {
    keyword: searchInput.value.trim(),
    lang: lang.value,
    docsVersion: activeVersion.value === i18n.value.search.tagList.all ? '' : activeVersion.value,
    limit: [
      {
        type: 'docs',
        version: activeVersion.value === i18n.value.search.tagList.all ? '' : activeVersion.value,
      },
    ],
  };
});

// 接收获取的搜索数据
const searchResultList = ref<any[]>([]);
// 总数据数量
const total = ref(0);

watch(
  [searchNumber, currentIndex],
  ([searchNumber, currentIndex]) => {
    if (searchNumber?.length) {
      total.value = searchNumber[currentIndex] ? searchNumber[currentIndex].doc_count : 0;
    }
  }
);

// 分页器总页数
const totalPage = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});

// 点击数据的类型导航
function setCurrentType(index: number, type: string) {
  currentIndex.value = index;
  if (type === 'all') {
    searchType.value = '';
  } else {
    searchType.value = type;
  }
  currentPage.value = 1;
  if (imageUrl.value) {
    doImageSearch();
  } else {
    searchDataAll();
  }
}

// 获取搜索结果各类型的数量
async function searchCountAll(keyword?: string) {
  // 全部时 limit 不传
  if (activeVersion.value === i18n.value.search.tagList.all) {
    searchCountParams.value.limit = [];
  }

  try {
    const res = await getSearchCount({ ...searchCountParams.value, ...(keyword && { keyword }) });
    if (res.status === 200 && Array.isArray(res.obj?.total)) {
      getRelatedData();
      searchNumber.value = res.obj.total;
      const index = searchNumber.value.findIndex((item: SearchCountItemT) => item.key === searchType.value);
      if (index > -1) {
        currentIndex.value = index;
      }
    } else {
      searchNumber.value = [];
    }
  } catch {
    handleError();
  }
}

// 获取搜索结果的数据
async function searchDataAll(disableCorrect?: boolean) {
  searchResultList.value = [];
  pageShow.value = false;
  isNotFound.value = false;
  // 全部时 limit 不传
  if (activeVersion.value === i18n.value.search.tagList.all) {
    searchDataParams.value.limit = [];
  }

  try {
    const res = await getSearchData(disableCorrect === false ? { ...searchDataParams.value, correctEnable: disableCorrect } : searchDataParams.value);
    if (res.status === 200 && Array.isArray(res.obj?.records)) {
      // 搜索纠错
      const correctedRaw = res.obj.correction?.corrected;
      correctedList.value = correctedRaw ? (Array.isArray(correctedRaw) ? correctedRaw : [correctedRaw]) : [];

      searchResultList.value = res.obj.records;
      pageShow.value = true;
      isNotFound.value = false;
    } else {
      searchResultList.value = [];
      isNotFound.value = true;
      pageShow.value = false;
      if (searchType.value === 'docs') {
        return 'no-docs-data';
      }
    }
  } catch (err) {
    console.log(err);
    handleError();
    isNotFound.value = true;
  }
}

const doImageSearch = async () => {
  searchResultList.value = [];
  pageShow.value = false;
  isNotFound.value = false;
  const imageSearchParams: Parameters<typeof imageSearch>[0] = {
    lang: lang.value,
    imageUrl: imageUrl.value,
    keyword: searchInput.value || undefined,
    page: currentPage.value,
    pageSize: pageSize.value,
    hq: 'opengauss',
    type: searchType.value,
  };

  try {
    const res = await imageSearch(imageSearchParams)
    if (res.status === 201) {
      isNotFound.value = true;
      pageShow.value = false;
      return;
    }
    const obj = res.obj;
    const records = Array.isArray(obj) ? obj : (obj.records ?? []);
    searchResultList.value = records;
    total.value = obj.total ?? records.length;
    isNotFound.value = false;
    pageShow.value = true;
  
    // 用后端综合后的关键词调辅助接口，不影响用户输入的 searchInput
    const imageKeyword = obj.keyword;
    if (imageKeyword) {
      searchCountAll(imageKeyword);
    }
  } catch {
    searchResultList.value = [];
    isNotFound.value = true;
    pageShow.value = false;
  }
};

// 获取搜索结果的所有内容
async function searchAll(current?: string, disableCorrect?: boolean) {
  if (!searchInput.value && !imageUrl.value) {
    return;
  }

  if (!current) {
    currentIndex.value = 0;
  }
  reportSearch(searchInput.value);
  currentPage.value = 1;
  searchType.value = current || '';

  if (imageUrl.value) {
    await doImageSearch();
  } else {
    searchCountAll();
    const result = await searchDataAll(disableCorrect)
    if (result === 'no-docs-data') {
      searchType.value = '';
      searchAll();
    }
  }
}

let SEARCH_EVENT_ID = uniqueId();
const reportSearch = (keyword: string) => {
  SEARCH_EVENT_ID = uniqueId();
  oaReport(
    'searchValue',
    {
      search_event_id: SEARCH_EVENT_ID,
      search_key: keyword,
    },
    'search_portal'
  );
};

// 设置搜索结果的跳转路径
function goLink(data: any, index: number) {
  const { type, path } = data;
  const search_result_url = '/' + path;
  if (type === 'docs') {
    let goPath = path;
    if (/^docs\/master/g.test(path)) {
      goPath = path.replace(/^docs\/master/g, 'docs/latest');
    }
    const url = `${DOCS_LINK}/${goPath}.html`;
    reportSelectSearchResult(data, index, url, searchDataParams.value.keyword);
    windowOpen(url, '_blank');
  } else if (path.startsWith('https')) {
    reportSelectSearchResult(data, index, path, searchDataParams.value.keyword);
    windowOpen(path, '_blank');
  } else {
    reportSelectSearchResult(data, index, search_result_url, searchDataParams.value.keyword);
    router.go(search_result_url);
  }
}

const reportSelectSearchResult = (data: any, index: number, path: string, keyword: string) => {
  oaReport(
    'selectSearchResult',
    {
      search_event_id: SEARCH_EVENT_ID,
      search_key: keyword,
      search_result_detail: data,
      search_tag: data.type,
      search_rank_num: pageSize.value * (currentPage.value - 1) + (index + 1),
      search_result_total_num: searchNumber.value.find((item) => item.key === (searchType.value || 'all'))?.doc_count ?? 0,
      search_result_url: path,
    },
    'search_portal'
  );
};

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

const tagsParams = reactive({
  lang: lang.value,
  category: 'docs',
  want: 'version',
});
const versionList = ref([
  {
    count: 0,
    key: i18n.value.search.tagList.all,
  },
]);

async function getVersionTag() {
  try {
    const res = await getTagsData(tagsParams);
    // 确保 res.obj 和 res.obj.totalNum 都存在
    if (res.obj && res.obj.totalNum && res.obj.totalNum.length) {
      // 默认选中 latest
      activeVersion.value = res.obj.totalNum[1]?.key; // 这里仍然可以使用可选链
      versionList.value.push(...res.obj.totalNum);
    }
  } catch {
    handleError();
  }
}

let unwatchActiveVersion: ReturnType<typeof watch>;

// ================ 搜索纠错 ================
const correctedList = ref([] as string[]);
const correctedTerm = computed(() => correctedList.value[0] || '');

const handleCorrectionSearch = () => searchAll('', false);

// ================ 联想搜索 ================
const relatedList = ref<string[]>([]);
const getRelatedData = async () => {
  const res = await getRelevant(searchDataParams.value);
  relatedList.value = res?.obj?.suggestList || [];
};
const relatedSearch = (val: string) => {
  onSearch({ keyword: val });
};

onMounted(async () => {
  if (urlParams.q) {
    searchInput.value = sanitizeSearchInput(decodeURIComponent(urlParams.q as string));
  }
  await getVersionTag();

  const type = getUrlParam('type');
  if (type === 'docs') {
    searchType.value = 'docs';
  }

  searchAll(searchType.value);

  unwatchActiveVersion = watch(
    () => activeVersion.value,
    () => {
      searchAll(searchType.value);
    }
  );

});

onUnmounted(() => unwatchActiveVersion?.());
</script>
<template>
  <div class="search">
    <OSearchInput
      v-model="searchInput"
      v-model:image-url="imageUrl"
      :placeholder="'search'"
      size="large"
      :suggest-items="hasImage ? [] : suggestItems"
      :enable-history="!hasImage"
      :show-suggest-empty="!hasImage"
      :open-on-focus="!hasImage"
      store-history
      storage-key="search-history"
      enable-image-search
      :upload-image="uploadImage"
      @search="onSearch"
      @input="onInput"
      @image-upload-start="hasImage = true"
      @image-clear="hasImage = false"
    />

    <!-- 搜索纠错 -->
    <i18n-t
      v-show="correctedTerm && correctedTerm !== searchInput"
      keypath="search.correctionTip"
      tag="div"
      class="correct-list-box"
    >
      <template #corrected>
        <span>{{ correctedTerm }}</span>
      </template>
      <template #original>
        <span class="correction-link" @click="handleCorrectionSearch">{{ searchInput }}</span>
      </template>
    </i18n-t>

    <div class="search-content">
      <div class="select-options">
        <ul class="type">
          <li
            v-for="(item, index) in searchNumber"
            :key="item.key"
            :title="item.key"
            :class="currentIndex === index ? 'active' : ''"
            @click="setCurrentType(index, item.key)"
          >
            {{ i18n.search.tagList[item.key] }}
            <span>({{ item.doc_count }})</span>
          </li>
        </ul>
        <ClientOnly>
          <template v-if="versionList.length > 1">
            <OSelect v-model="activeVersion" :placeholder="i18n.search.tagList.all">
              <template #prefix>
                <OIcon>
                  <IconSearch />
                </OIcon>
              </template>
              <OOption v-for="item in versionList" :key="item.key" :label="item.key" :value="item.key" />
            </OSelect>
          </template>
        </ClientOnly>
      </div>
      <div class="content-box">
        <template v-if="searchResultList.length">
          <!-- 搜索结果列表 -->
          <ul class="content-list">
            <template v-for="(item, index) in searchResultList" :key="item.id">
              <!-- 手机端搜索纠错 & 相关搜索 -->
              <template v-if="index === 11 && lePadV">
                <li>
                  <TheSearchRelated
                    :related-list="relatedList"
                    :keyword="searchInput"
                    @search="relatedSearch"
                  />
                </li>
                <li v-if="correctedTerm && correctedTerm !== searchInput">
                  <TheSearchCorrection :original="searchInput" :corrected="correctedTerm" />
                </li>
              </template>
              <li v-else>
                <!-- eslint-disable-next-line -->
                <h3 @click="goLink(item, index)" v-dompurify-html="item.title"></h3>
                <!-- eslint-disable-next-line -->
                <p class="detail" v-dompurify-html="item.textContent"></p>
                <p class="from">
                  <span>{{ i18n.search.form }}</span>
                  <span>{{ i18n.search.tagList[item.type] }}</span>
                  <template v-if="item.version">
                    <span class="version">{{ i18n.search.version }}</span>
                    <span>{{ item.version }}</span>
                  </template>
                </p>
              </li>
            </template>
          </ul>
            <!-- 桌面端相关搜索 -->
          <template v-if="relatedList.length && !lePadV">
            <ODivider direction="v" />
            <TheSearchRelated
              :related-list="relatedList"
              :keyword="searchInput"
              size="small"
              @search="relatedSearch"
            />
          </template>
        </template>
        <NotFound v-if="isNotFound" :no-data-tip="i18n.common.Not_Found" />
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
            <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
          </OPagination>
        </ClientOnly>
        <AppPaginationMo :current-page="currentPage" :total-page="totalPage" @turn-page="turnPage" @jump-page="jumpPage" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.correct-list-box {
  margin: 8px 0 0;
  @include tip1;
  @include respond-to('<=pad_v') {
    display: none;
  }
  .correction-link {
    cursor: pointer;
  }
}

.search :deep(.o-search-panel-common-header)  {
  margin-bottom: var(--o-gap-3);
}

.search :deep(.o-search-panel-history-row) {
  padding: 5px var(--o-gap-3);
  margin: 0 calc(-1 * var(--o-gap-3));
}

.search {
  max-width: 1504px;
  padding: var(--e-spacing-h2) 44px var(--e-spacing-h1);
  margin: 0 auto;
  .pagination-slot {
    font-size: var(--e-font-size-text);
    font-weight: 300;
    color: var(--e-color-text1);
    line-height: var(--e-spacing-h4);
  }
  @media (max-width: 1439px) {
    padding-left: 24px;
  }
  @media (max-width: 1160px) {
    grid-gap: 12px;
  }
  @media (max-width: 1100px) {
    padding: 0 16px var(--e-spacing-h2);
    padding-top: var(--e-spacing-h2);
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    padding: 0 0 var(--e-spacing-h2) 0;
    padding-top: var(--e-spacing-h5);
    .o-search-input {
      width: auto;
      margin: 0 16px;
    }
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
    font-size: 20px;
  }
  .search-content {
    width: 100%;
    margin-top: var(--e-spacing-h2);

    @media (max-width: 768px) {
      margin-top: var(--e-spacing-h5);
    }
    .select-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      background-color: var(--e-color-bg2);
      border-bottom: 1px solid var(--e-color-division1);
      @media screen and (max-width: 1620px) {
        padding: 0 24px;
      }
      @media screen and (max-width: 768px) {
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        padding: 0;
        margin: 0 16px;
        background-color: var(--e-color-bg1);
        border: none;
      }
      .type {
        display: flex;
        flex-shrink: 0;
        background-color: var(--e-color-bg2);
        @media (max-width: 768px) {
          width: 100%;
          padding: 0 16px;
          margin-bottom: 16px;
          box-shadow: var(--e-shadow-l1);
        }
        li {
          position: relative;
          display: flex;
          align-items: center;
          height: 63px;
          min-width: 56px;
          margin-right: var(--e-spacing-h3);
          color: var(--e-color-text1);
          font-size: var(--e-font-size-h8);
          cursor: pointer;
          @media screen and (max-width: 1620px) {
            margin-right: 24px;
          }
          @media screen and (max-width: 1100px) {
            margin-right: 16px;
          }
          @media (max-width: 768px) {
            height: 34px;
            line-height: 34px;
            min-width: auto;
            font-size: var(--e-font-size-tip);
            margin-right: 0;
            text-align: center;
            & + li {
              margin-left: 12px;
            }
            span {
              display: none;
            }
          }
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 2px;
            background-color: transparent;
            @media (max-width: 768px) {
              bottom: -1px;
            }
          }
        }
        .active {
          color: var(--e-color-brand1);
          &::after {
            background-color: var(--e-color-brand1);
          }
        }
      }
      :deep(.el-select) {
        @media screen and (max-width: 768px) {
          width: 100%;
          padding-bottom: 8px;
        }
        &:hover {
          box-shadow: none;
        }
        .el-input__wrapper {
          padding: 0 8px;
          box-shadow: 0 0 1px var(--e-color-border1);
        }
      }
    }
    .content-box {
      display: flex;
      box-shadow: var(--e-shadow-l1);
      background-color: var(--e-color-bg2);
      padding: 0 var(--e-spacing-h2) var(--e-spacing-h2) var(--e-spacing-h2);
      --feed-back-width: 25%;
      @media (max-width: 768px) {
        width: 100vw;
        padding: var(--e-spacing-h5) var(--e-spacing-h5) 0 var(--e-spacing-h5);
        min-height: 0;
        background-color: var(--e-color-bg1);
        box-shadow: none;
      }
      @include respond-to('<=pad_v') {
        --feed-back-width: 100%;
      }
      .content-list {
        width: 100%;
        // max-width: calc(100% - 2 * var(--o-r-gap-6) - 1px - var(--feed-back-width));
        @media (max-width: 768px) {
          padding: 0;
          background-color: var(--e-color-bg2);
        }
        li {
          padding-top: var(--e-spacing-h2);
          @media (max-width: 768px) {
            padding-top: var(--e-spacing-h5);
            margin: 0 var(--e-spacing-h5);
            &::after {
              display: block;
              content: '';
              width: 100%;
              height: 1px;
              background-color: var(--e-color-division1);
              margin-top: 16px;
            }
            &:nth-last-of-type(1)::after {
              background-color: transparent;
            }
          }
          h3 {
            font-size: var(--e-font-size-h5);
            color: var(--e-color-text1);
            line-height: var(--e-line-height-h5);
            cursor: pointer;
            :deep(span) {
              color: var(--e-color-brand1);
            }
            @media (max-width: 768px) {
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
            }
          }
          .detail {
            margin-top: 17px;
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            color: var(--e-color-text1);

            overflow: hidden;
            text-overflow: ellipsis;
            text-overflow: -webkit-ellipsis-lastline;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            line-clamp: 5;
            -webkit-box-orient: vertical;

            :deep(span) {
              color: var(--e-color-brand1);
            }
            @media (max-width: 768px) {
              margin-top: 4px;
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
              color: var(--e-color-text4);
            }
          }
          .from {
            margin-top: 15px;
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            color: var(--e-color-text4);
            @media (max-width: 768px) {
              margin-top: 8px;
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
              color: var(--e-color-text4);
            }
          }
          .version {
            margin-left: var(--e-spacing-h4);
          }
        }
      }
      .o-divider {
        height: auto;
        margin-top: var(--e-spacing-h2);
        --o-divider-label-gap: var(--o-r-gap-6);
      }
      .search-related {
        width: var(--feed-back-width);
      }
    }

    .page-box {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: var(--e-spacing-h4);
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
