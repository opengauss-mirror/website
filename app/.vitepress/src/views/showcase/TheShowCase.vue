<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import useWindowScroll from '@/components/hooks/useWindowScroll';
import { getUserCaseData } from '@/api/api-showcase';

import ShowCaseData from '@/data/showcase';
import useWindowResize from '@/components/hooks/useWindowResize';

import TagFilter from '@/components/TagFilter.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import NotFound from '@/NotFound.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import CardBg from '@/assets/category/showcase/bg.png';
import illustration from '@/assets/illustrations/userPractice.png';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import financeIcon from '@/assets/category/showcase/finance-icon.svg';
import industrialIcon from '@/assets/category/showcase/industrial-icon.svg';
import isvIcon from '@/assets/category/showcase/isv-icon.svg';
import energyIcon from '@/assets/category/showcase/energy-icon.svg';
import internetIcon from '@/assets/category/showcase/developer-icon.svg';
import otherIcon from '@/assets/category/showcase/other-icon.svg';
import dbvIcon from '@/assets/category/showcase/dbv-icon.svg';
import IconChevronRight from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const userCaseData = computed(() => i18n.value.showcase);
const { lang } = useData();
const activeIndex = ref(0);
const screenWidth = useWindowResize();

const isZh = computed(() => (lang.value === 'zh' ? true : false));

// 接收所有案例
const caseListAll: any = ref([]);
// 接收当前分类的所有案例
const currentCaseListAll: any = ref([]);
// 当前显示的案例
const currentCaseList = computed(() => {
  if (currentCaseListAll.value.length > pageSize.value) {
    return currentCaseListAll.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return currentCaseListAll.value;
  }
});
const currentTag = ref('');
const selectTag = (i: number, tag: string) => {
  activeIndex.value = i;
  currentTag.value = tag;
  currentPage.value = 1;
  filterCase();
};
// 设置当前tag的所有案例
const data = ref({
  page: 1,
  pageSize: 10000,
  lang: lang.value,
  type: 'showcase',
});
function setCurrentCaseListAll() {
  try {
    getUserCaseData(data.value).then((res: any) => {
      currentCaseListAll.value = [];
      if (res.status === 200 && res.obj.records[0]) {
        caseListAll.value = res.obj.records.filter((item: any) => {
          return item.path !== 'userPractice/index';
        });
        if (activeIndex.value === 0) {
          currentCaseListAll.value = caseListAll.value;
        } else {
          caseListAll.value.forEach((item: any) => {
            if (item.industry === currentTag.value) {
              currentCaseListAll.value.push(item);
            }
          });
        }
      }
    });
  } catch (error: any) {
    throw Error(error);
  }
}
function filterCase() {
  currentCaseListAll.value = [];
  if (activeIndex.value === 0) {
    currentCaseListAll.value = caseListAll.value;
  } else {
    caseListAll.value.forEach((item: any) => {
      if (item.industry === currentTag.value) {
        currentCaseListAll.value.push(item);
      }
    });
  }
}

// 控制更多icon的显示
const showLength = computed(() => (screenWidth.value <= 1280 ? 68 : 48));
const showList = computed(() => {
  const detailList: any = [];
  currentCaseList.value.forEach((item: any) => {
    if ((item.summary + '').length > showLength.value) {
      detailList.push(true);
    } else {
      detailList.push(false);
    }
  });
  return detailList;
});
// 当前显示的页码
const currentPage = ref(1);
const pageSize = ref(12);
// 数据总条数
const total = computed(() => {
  return currentCaseListAll.value.length;
});
// 分页器总页数
const totalPage = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});
// 控制分页器显示
const isShow = computed(() => {
  return totalPage.value > 1 ? true : false;
});

// 移动端翻页事件
function turnPage(option: string) {
  if (option === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
  } else if (option === 'next' && currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
  }
}
// 移动端跳转翻页
function jumpPage(page: number) {
  currentPage.value = page;
}

// 图标
const imgUrl = computed(() => (id: string) => {
  switch (id) {
    case 'Energy':
      return energyIcon;
      break;
    case 'Internet':
      return internetIcon;
      break;
    case 'ISV':
      return isvIcon;
      break;
    case 'DBV':
      return dbvIcon;
      break;
    case 'Others':
      return otherIcon;
      break;
    case 'Industrial':
      return industrialIcon;
      break;
    case 'Finance':
      return financeIcon;
      break;
  }
});
// 跳案例官网或者详情（type:1跳官网，2跳详情）
const jump = (url: string, type: number) => {
  type === 1
    ? window.open(url, '_blank')
    : window.open(`/${url.replace('index', '')}`, '_blank');
};
// 搜索功能
// 搜索关键词
const keyWord = ref('');
// 搜索接口传递参数
const searchData = computed(() => {
  return {
    keyword: keyWord.value,
    page: 1,
    pageSize: 10000,
    lang: lang.value,
    type: 'showcase',
  };
});
function searchCase() {
  activeIndex.value = 0;
  currentTag.value = i18n.value.common.ALL;
  if (keyWord.value) {
    getUserCaseData(searchData.value).then((res) => {
      if (res.status === 200 && res.obj.records) {
        caseListAll.value = res.obj.records;
      }
      currentCaseListAll.value = caseListAll.value;
    });
  } else {
    setCurrentCaseListAll();
  }
}
// 根据滚动位置移动端tag吸顶
const scrollTop = useWindowScroll();
const isTopNavMo = computed(() => (scrollTop.value > 156 ? true : false));
const showIndex = ref(NaN);
function toggleAll(index: number) {
  showIndex.value = showIndex.value === index ? NaN : index;
}
// 根据跳转时url携带的参数显示筛选内容
function getUrlParam() {
  const industry: any = decodeURI(window.location.href.split('=')[1]);
  if (industry === 'undefined') {
    activeIndex.value = 0;
    currentTag.value = i18n.value.common.ALL;
  } else {
    activeIndex.value = industry * 1;
    currentTag.value = isZh.value
      ? ShowCaseData.CASE_LIST[activeIndex.value - 1].TYPE
      : ShowCaseData.CASE_LIST[activeIndex.value - 1].TYPE_EN;
  }
}
onMounted(() => {
  getUrlParam();
  setCurrentCaseListAll();
});
</script>

<template>
  <BannerLevel2
    :background-image="Banner"
    :title="userCaseData.bannerTitle"
    :illustration="illustration"
  />
  <div class="user-case">
    <OSearch
      v-model="keyWord"
      class="search"
      :placeholder="userCaseData.placeHolder"
      @change="searchCase"
    ></OSearch>
    <div class="tag-box" :class="isTopNavMo ? 'tag-top' : ''">
      <TagFilter :label="userCaseData.type" class="tag-pc">
        <OTag
          :type="activeIndex === 0 ? 'primary' : 'text'"
          checkable
          @click="selectTag(0, i18n.common.ALL)"
        >
          {{ i18n.common.ALL }}
        </OTag>
        <OTag
          v-for="item in ShowCaseData.CASE_LIST"
          :key="item.ID"
          checkable
          :type="activeIndex === item.ID ? 'primary' : 'text'"
          @click="selectTag(item.ID, isZh ? item.TYPE : item.TYPE_EN)"
        >
          {{ isZh ? item.TYPE : item.TYPE_EN }}
        </OTag>
      </TagFilter>
      <TagFilter class="tag-h5">
        <OTag
          :type="activeIndex === 0 ? 'primary' : 'text'"
          @click="selectTag(0, i18n.common.ALL)"
        >
          {{ i18n.common.ALL }}
        </OTag>
        <OTag
          v-for="item in ShowCaseData.CASE_LIST"
          :key="item.ID"
          checkable
          :type="activeIndex === item.ID ? 'primary' : 'text'"
          @click="selectTag(item.ID, isZh ? item.TYPE : item.TYPE_EN)"
        >
          {{ isZh ? item.TYPE : item.TYPE_EN }}
        </OTag>
      </TagFilter>
    </div>
    <p class="case-number">
      {{ userCaseData.find1 }}{{ currentCaseListAll.length
      }}{{ userCaseData.find2 }}
    </p>
    <div class="case-list">
      <OCard
        v-for="(item, index) in currentCaseList"
        :key="item.officialpath"
        shadow="hover"
        class="case-card"
        :style="`background:url(${CardBg}) no-repeat center/cover`"
      >
        <div class="case-card-box">
          <h4>{{ item.company }}</h4>
          <p class="detail" :class="showIndex === index ? 'all' : ''">
            {{ item.summary }}
            <OIcon
              v-if="showList[index]"
              :class="showIndex === index ? 'show' : ''"
              @click="toggleAll(index)"
            >
              <IconChevronRight />
            </OIcon>
          </p>
          <OButton
            v-if="item.detail"
            animation
            size="mini"
            class="more-btn"
            type="primary"
            @click="jump(item.path, 2)"
          >
            {{ userCaseData.buttonMore }}
            <template #suffixIcon>
              <IconArrowRight class="icon-arror" />
            </template>
          </OButton>
          <OButton
            animation
            size="mini"
            class="website-btn"
            @click="jump(item.officialpath, 1)"
          >
            {{ userCaseData.button }}
            <template #suffixIcon>
              <IconArrowRight class="icon-arror" />
            </template>
          </OButton>
        </div>
        <div class="card-type-img">
          <img :src="imgUrl(item.id)" :alt="`${item.id}Icon`" />
          <p class="type">{{ item.industry }}</p>
        </div>
      </OCard>
    </div>
    <NotFound v-if="total === 0" />
    <div v-if="isShow" class="page-box">
      <ClientOnly>
        <OPagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          class="pagination-pc"
          :hide-on-single-page="true"
          :page-sizes="[pageSize]"
          :background="true"
          layout="sizes, prev, pager, next, slot, jumper"
          :total="total"
        >
          <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
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
</template>
<style lang="scss">
.popover-showcase-desc {
  word-break: break-word;
}
</style>
<style lang="scss" scoped>
$color: #fff;
.user-case {
  max-width: 1504px;
  padding: 40px 44px 64px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 0 0 40px 0;
    background-color: var(--o-color-bg1);
  }
  :deep(.search) {
    height: 48px;
    margin-bottom: 0;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .tag-top {
    @media (max-width: 768px) {
      width: 100%;
      position: fixed;
      top: 47px;
      left: 0;
      z-index: 9;
    }
  }
}
.tag-box {
  margin: var(--o-spacing-h4) 0 0;
  :deep(.el-card__body) {
    padding-top: 0;
    padding-bottom: 0;
  }
  @media (max-width: 768px) {
    background-color: #ffffff;
    position: sticky;
    top: 48px;
    margin: 0;
  }
  .tag-pc {
    width: 100%;
    padding: var(--o-spacing-h5) var(--o-spacing-h2);
    box-shadow: var(--o-shadow-l1);
    @media (max-width: 768px) {
      display: none;
    }
  }
  .tag-h5 {
    display: none;
    width: 100%;
    box-shadow: var(--o-shadow-l1);
    padding: 0 16px;
    @media (max-width: 768px) {
      display: block;
    }
    .tag-filter-box {
      span {
        padding: 6px 0;
        margin-right: 28px;
        &:nth-of-type(1) {
          margin-right: 22px;
        }
      }
      .o-tag-type-primary {
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
        border-top: 1px solid transparent;
      }
    }
  }
}
.dark .el-card {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
.page-box {
  margin: var(--o-spacing-h2) 0 0;
}
.case-number {
  margin: var(--o-spacing-h4) 0 0;
  font-size: var(--o-font-size-tip);
  line-height: var(--o-line-height-tip);
  color: var(--o-color-text1);
  @media (max-width: 768px) {
    display: none;
  }
}
.case-list {
  display: grid;
  width: 100%;
  margin-top: var(--o-spacing-h2);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h4);
  :deep(.el-card__body) {
    padding: var(--o-spacing-h2) var(--o-spacing-h4) var(--o-spacing-h2)
      var(--o-spacing-h2);
    height: 198px;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      padding: var(--o-spacing-h5);
      height: auto;
    }
  }
  .case-card-box {
    flex: 1;
  }
  .type {
    text-align: center;
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: #ad9cd3;
  }
  h4 {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: $color;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
  .detail {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: $color;
    margin: var(--o-spacing-h10) 0 var(--o-spacing-h6);
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-align: start;
    position: relative;
    max-height: 44px;
    transition: all 0.3s;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    &::-webkit-scrollbar-thumb {
      width: 0;
    }
    &::-webkit-scrollbar-track {
      width: 0;
    }
    &::-webkit-scrollbar-button {
      width: 0;
    }
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      -webkit-line-clamp: inherit;
      max-height: inherit;
      text-align: justify;
    }
    .o-icon {
      position: absolute;
      right: 0px;
      bottom: 4px;
      z-index: 9;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
      @media (max-width: 768px) {
        display: none;
      }
    }
    .show {
      transform: rotateZ(-90deg);
    }
  }
  .all {
    -webkit-line-clamp: initial;
    max-height: 144px;
  }
  .more-btn {
    margin-right: var(--o-spacing-h8);
    margin-bottom: var(--o-spacing-h8);
    color: #fff;
  }
  .website-btn {
    border-color: #fff;
    color: #fff;
  }
  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: var(--o-spacing-h2);
  }
  @media screen and (max-width: 760px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 16px;
  }
}
</style>
