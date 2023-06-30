<script lang="ts" setup>
import { reactive, ref, watch, onMounted, h } from 'vue';
import { useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import { ElMessage } from 'element-plus';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import TagFilter from '@/components/TagFilter.vue';
import AppContent from '@/components/AppContent.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/adv.png';
import IconCalendar from '~icons/security/icon-calendar.svg';
import IconCancel from '~icons/app/icon-cancel.svg';

import { getSecurityList } from '@/api/api-security';
import { SecurityLists, CveQuery } from '@/shared/@types/type-security';
// import OSearch from 'opendesign/search/OSearch.vue';

const i18n = useI18n();
const router = useRouter();

const inputName = ref('');
const total = ref(0);
const currentPage = ref(1);
const totalPage = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const years = ['', '2022', '2021'];
const selectedYear = ref('2022');
const activeIndex = ref(0);
const activeIndex1 = ref(0);

const tableData = ref<SecurityLists[]>([
  {
    affectProduct: '',
    cveLevel: '',
    cveLevelValue: '',
    gaussSaNum: '',
    influenceComponent: '',
    releaseDate: '',
    saId: NaN,
    summary: '',
  },
]);

const queryData: CveQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  searchName: '',
  years: '0',
  cveLevel: '0',
  releaseFlag: 2,
});

function getSecurityLists(data: CveQuery) {
  getSecurityList(data)
    .then((res: any) => {
      if (res.code === '200' && res.body[0]) {
        tableData.value = res.body;
        total.value = res.totalCount;
        totalPage.value = Math.ceil(total.value / queryData.pageSize);
      } else {
        total.value = 0;
        tableData.value = [];
      }
    })
    .catch(() => {
      ElMessage({
        message: h(
          'p',
          { style: 'width: 5vw;display:flex;justify-content: center;' },
          [h('span', { style: 'color: red;display:flex;' }, 'Error!')]
        ),
      });
    });
}

const onTagClick = (i: number, leval: string) => {
  activeIndex.value = i;
  queryData.cveLevel = leval;
};

const onYearTagClick = (i: number, type: string) => {
  queryData.years = type;
  activeIndex1.value = i;
  selectedYear.value = type === '' ? '全部' : type;
};

const handleSizeChange = (val: number) => {
  queryData.pageSize = val;
  totalPage.value = Math.ceil(total.value / val);
};

const handleCurrentChange = (val: number) => {
  queryData.pageNum = val;
  currentPage.value = val;
};

function changeSearchVal() {
  queryData.searchName = inputName.value;
}

function jumpAdvisoriesDetail(val: any) {
  router.go(`${router.route.path}detail/?id=${val}`);
}

const selectYear = (i: number, val: string) => {
  selectedYear.value = val;
  activeIndex1.value = i;
  queryData.years = val;
};
const optionYear = ref('');
// 页面跳转
function turnPage(option: string) {
  if (option === 'prev' && queryData.pageNum > 1) {
    queryData.pageNum = queryData.pageNum - 1;
  } else if (option === 'next' && queryData.pageNum < total.value) {
    queryData.pageNum = queryData.pageNum + 1;
  }
}
// 点击搜索框的删除图标
function donShowSearchBox() {
  inputName.value = '';
}
onMounted(() => {
  optionYear.value = i18n.value.security.ALL;
  getSecurityLists(queryData);
});

watch(queryData, () => getSecurityLists(queryData));
</script>

<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.security.SECURITY_ADVISORIES"
    :illustration="illustration"
  />
  <AppContent :mobile-top="16">
    <div class="bulletin-main">
      <OSearch
        v-model="inputName"
        :placeholder="i18n.security.SEARCH"
        @change="changeSearchVal"
      >
        <template #suffix>
          <OIcon class="close" @click="donShowSearchBox"><IconCancel /></OIcon>
        </template>
      </OSearch>
      <OCard class="filter-card">
        <template #header>
          <div class="card-header">
            <TagFilter :label="i18n.security.SEVERITY" :show="false">
              <OTag
                v-for="(item, index) in i18n.security.SEVERITY_LIST"
                :key="'tag' + index"
                checkable
                :type="activeIndex === index ? 'primary' : 'text'"
                @click="onTagClick(index, item.LEVAL)"
              >
                {{ item.NAME }}
              </OTag>
            </TagFilter>
          </div>
        </template>
        <div class="card-body">
          <TagFilter :show="false" :label="i18n.security.YEAR">
            <OTag
              v-for="(item, index) in years"
              :key="'tag' + index"
              checkable
              :type="activeIndex1 === index ? 'primary' : 'text'"
              @click="onYearTagClick(index, item)"
            >
              {{ item === '' ? i18n.security.ALL : item }}
            </OTag>
          </TagFilter>
        </div>
      </OCard>

      <div class="filter-mobile">
        <div class="filter">
          <div
            v-for="(item, index) in i18n.security.SEVERITY_LIST"
            :key="item"
            :class="activeIndex === index ? 'selected' : ''"
            class="filter-item"
            @click="onTagClick(index, item.LEVAL)"
          >
            {{ item.NAME }}
          </div>
        </div>
      </div>

      <div class="calendar-mobile">
        <el-collapse>
          <el-collapse-item>
            <template #title>
              <o-icon><icon-calendar></icon-calendar></o-icon>
              <span class="selected-year">{{
                selectedYear === '' ? i18n.security.ALL : selectedYear
              }}</span>
            </template>
            <div class="years">
              <p
                v-for="(item, index) in years"
                :key="item"
                class="years-item"
                :class="selectedYear === item ? 'selected' : ''"
                @click="selectYear(index, item)"
              >
                {{ item === '' ? i18n.security.ALL : item }}
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <OTable class="pc-list" :data="tableData" style="width: 100%">
        <el-table-column>
          <template #header>
            <span>{{ i18n.security.ADVISORY }}</span>
          </template>
          <template #default="scope">
            <span
              class="detail-page"
              @click="jumpAdvisoriesDetail(scope.row.gaussSaNum)"
            >
              {{ scope.row.gaussSaNum }}
            </span>
          </template>
        </el-table-column>
        <OTableColumn
          :label="i18n.security.SYNOPSIS"
          prop="summary"
        ></OTableColumn>
        <OTableColumn
          width="200"
          :label="i18n.security.SEVERITY"
          prop="cveLevel"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.security.AFFECTED_PRODUCTS"
          prop="affectProduct"
          width="200"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.security.AFFECTED_COMPONENTS"
          width="260"
          prop="influenceComponent"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.security.RELEASE_DATE"
          width="200"
          prop="releaseDate"
        ></OTableColumn>
      </OTable>

      <ul class="mobile-list">
        <li v-for="item in tableData" :key="item.saId" class="item">
          <ul>
            <li @click="jumpAdvisoriesDetail(item.gaussSaNum)">
              <span>{{ i18n.security.ADVISORY }}:</span
              ><span class="notice">{{ item.gaussSaNum }}</span>
            </li>
            <li>
              <span>{{ i18n.security.OVERVIEW }}:</span>{{ item.summary }}
            </li>
            <li>
              <span>{{ i18n.security.SEVERITY }}:</span>{{ item.cveLevel }}
            </li>
            <li>
              <span>{{ i18n.security.AFFECTED_PRODUCTS }}:</span
              >{{ item.affectProduct }}
            </li>
            <li>
              <span>{{ i18n.security.AFFECTED_COMPONENTS }}:</span
              >{{ item.influenceComponent }}
            </li>
            <li>
              <span>{{ i18n.security.RELEASE_DATE }}:</span
              >{{ item.releaseDate }}
            </li>
            <li></li>
          </ul>
        </li>
      </ul>

      <div v-if="total === 0" class="empty-tip">未搜索到数据</div>
      <ClientOnly>
        <OPagination
          v-model:page-size="queryData.pageSize"
          v-model:currentPage="queryData.pageNum"
          class="pagination"
          :page-sizes="[1, 2, 4, 8]"
          :layout="layout"
          :total="total"
          :background="true"
          :hide-on-single-page="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <span class="slot-content">{{ currentPage }}/{{ totalPage }}</span>
        </OPagination>
      </ClientOnly>

      <AppPaginationMo
        v-if="Math.ceil(total / queryData.pageSize) > 1"
        :current-page="queryData.pageNum"
        :total-page="Math.ceil(total / queryData.pageSize)"
        @turn-page="turnPage"
      />
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.bulletin-main {
  max-width: 1504px;
  margin: 0 auto;
  :deep(.o-search) {
    height: 56px;
    @media screen and (max-width: 1100px) {
      height: 36px;
    }
    .el-input__wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 1px 16px;
      // border: 1px solid var(--o-color-border1);
      .el-input__prefix {
        margin-right: 8px;
      }
      .el-input__inner {
        width: 100%;
        height: 100%;
        border: none;
      }
    }
    .close {
      cursor: pointer;
    }
  }
  .calendar-mobile {
    display: none;
    margin: var(--o-spacing-h5) 0;
    width: 100%;
    background-color: var(--o-color-bg2);
    .o-icon {
      color: var(--o-color-text1);
    }
    .selected-year {
      color: var(--o-color-text1);
    }
    :deep(.el-collapse) {
      border: none;
      .el-collapse-item__header {
        background-color: var(--o-color-bg2);
        padding: 0 8px;
        border: none;
        height: 36px;
      }
      .el-collapse-item__wrap {
        border: none;
      }
      .el-collapse-item__content {
        padding-bottom: 0;
      }
    }

    .selected-year {
      margin-left: 8px;
    }
    .years {
      padding: 0 8px 8px;
      background-color: var(--o-color-bg2);
      color: var(--o-color-text1);
      &-item {
        margin-top: var(--o-spacing-h8);
        &:first-child {
          margin-top: 0;
        }
      }
      .selected {
        background-color: var(--o-color-bg4);
      }
    }
    @media screen and (max-width: 1100px) {
      display: block;
    }
  }
  .filter-card {
    margin-top: var(--o-spacing-h2);
    @media screen and (max-width: 1100px) {
      display: none;
    }
    :deep(.el-card__body) {
      padding: var(--o-spacing-h8) var(--o-spacing-h2);
    }
    .category {
      display: inline-block;
      width: 56px;
      font-size: var(--o-font-size-text);
      font-weight: 300;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-text);
      margin-right: var(--o-spacing-h4);
    }
    .category-item {
      display: inline-block;
      height: 28px;
      border: none;
      margin-right: var(--o-spacing-h3);
      font-size: var(--o-font-size-text);
      font-weight: 300;
      color: var(--o-color-text4);
      line-height: var(--o-line-height-text);

      cursor: pointer;
    }
    .active {
      display: inline-block;
      border: 1px solid var(--o-color-link1);
      color: var(--o-color-link1);
      padding: 0px var(--o-spacing-h6);
    }
    .card-header {
      padding-bottom: var(--o-spacing-h8);
      border-bottom: 1px solid var(--o-color-division1);
    }
    .card-body {
      padding-top: var(--o-spacing-h8);
      border-top: 1px solid var(--o-color-division1);
    }
  }
  .filter-mobile {
    display: none;
    @media screen and (max-width: 1100px) {
      display: block;
      margin-top: var(--o-spacing-h5);
    }
    .filter {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: var(--o-spacing-h8);
      .selected {
        background-color: var(--o-color-brand1);
        color: var(--o-color-text2);
      }
      &-item {
        cursor: pointer;
        flex: 1;
        text-align: center;
        padding: var(--o-spacing-h9);
        font-size: var(--o-font-size-text);
        font-weight: 300;
        color: var(--o-color-brand1);
        line-height: var(--o-line-height-text);
        border: 1px solid var(--o-color-brand1);
        border-right: 0;
        &:last-child {
          border: 1px solid var(--o-color-brand1);
        }
      }
    }
  }
  .pc-list {
    margin-top: var(--o-spacing-h2);
    .detail-page {
      color: var(--o-color-link1);
      cursor: pointer;
    }
    :deep(thead) {
      tr th .cell {
        font-weight: 700;
      }
    }
    :deep(.cell) {
      text-align: left;
      white-space: nowrap;
    }
    :deep(.is-leaf) {
      background-color: var(--o-color-bg4);
    }
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
  .empty-tip {
    text-align: center;
    font-size: var(--o-font-size-tip);
    color: var(--o-color-text4);
    padding: var(--o-spacing-h2) 0;
    display: none;
    @media screen and (max-width: 1100px) {
      display: block;
    }
  }
  .mobile-list {
    margin-bottom: var(--o-spacing-h5);
    box-shadow: var(--e-shadow1);
    display: none;
    @media screen and (max-width: 1100px) {
      display: block;
    }
    .item {
      padding: var(--o-spacing-h5) var(--o-spacing-h5) var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      font-weight: 300;
      line-height: var(--o-line-height-tip);
      color: var(--o-color-neutral8);
      background-color: var(--o-color-bg2);
      &:nth-child(odd) {
        background: var(--o-color-bg4);
      }
      & li {
        margin-bottom: var(--o-spacing-h8);
      }
      li {
        &:first-child {
          margin-bottom: 0;
          .notice {
            color: var(--o-color-link1);
          }
        }
        &:nth-child(4) {
          display: flex;
          span {
            min-width: 52px;
          }
        }
      }
      span {
        margin-right: var(--o-spacing-h8);
        color: var(--o-color-text1);
      }
    }
  }
  .pagination {
    margin-top: var(--o-spacing-h2);
    .slot-content {
      font-size: var(--o-font-size-text);
      font-weight: 300;
      color: var(--o-color-text1);
      line-height: var(--o-spacing-h4);
    }
  }
  .pagination-mobile {
    display: none;
    @media screen and (max-width: 1100px) {
      display: flex;
    }
  }
}
</style>
