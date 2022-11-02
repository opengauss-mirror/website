<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vitepress';

import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import AppContent from '@/components/AppContent.vue';

import Banner from '@/assets/banner/banner-secondary.png';
import illustration from '@/assets/illustrations/cve.png';
import IconCancel from '~icons/app/icon-cancel.svg';

import { getCveList } from '@/api/api-security';
import { CveLists, CveQuery } from '@/shared/@types/type-security';

const i18n = useI18n();
const router = useRouter();
const currentPage = ref(1);
const totalPage = ref(0);
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const searchContent = ref('');

const tableData = ref<CveLists[]>([
  {
    NVDScore: NaN,
    cveId: NaN,
    cveNum: '',
    description: '',
    releaseDate: '',
    updateTime: '',
  },
]);

const queryData: CveQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  years: '1',
  cveLevel: '2',
  searchName: '',
  releaseFlag: 2,
});

function getCveLists(data: CveQuery) {
  try {
    getCveList(data).then((res: any) => {
      tableData.value = res.body;
      total.value = res.totalCount;
      totalPage.value = Math.ceil(total.value / queryData.pageSize);
    });
  } catch (e: any) {
    throw new Error(e);
  }
}
const handleSizeChange = (val: number) => {
  queryData.pageSize = val;
  totalPage.value = Math.ceil(total.value / val);
};

const handleCurrentChange = (val: number) => {
  queryData.pageNum = val;
  currentPage.value = val;
};

function searchValchange() {
  queryData.searchName = searchContent.value;
}

function turnPage(option: string) {
  if (option === 'prev' && queryData.pageNum > 1) {
    queryData.pageNum = queryData.pageNum - 1;
  } else if (option === 'next' && queryData.pageNum < total.value) {
    queryData.pageNum = queryData.pageNum + 1;
  }
}

function goCveDetail(name: string) {
  router.go(`${router.route.path}detail/?cveNum=${name}`);
}
// 点击搜索框的删除图标
function donShowSearchBox() {
  searchContent.value = '';
}
onMounted(() => {
  getCveLists(queryData);
});

watch(queryData, () => getCveLists(queryData));
</script>
<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.security.CVE"
    :illustration="illustration"
  />
  <AppContent :mobile-top="16">
    <div class="o-search">
      <OSearch
        v-model="searchContent"
        :placeholder="i18n.security.INPUT_CVE_ID"
        @change="searchValchange"
      >
        <template #suffix>
          <OIcon class="close" @click="donShowSearchBox"><IconCancel /></OIcon>
        </template>
      </OSearch>
    </div>

    <OTable class="pc-list" :data="tableData" style="width: 100%">
      <el-table-column :label="i18n.security.CVE" width="186">
        <template #default="scope">
          <span class="detail-page" @click="goCveDetail(scope.row.cveNum)">{{
            scope.row.cveNum
          }}</span>
        </template>
      </el-table-column>
      <OTableColumn
        :label="i18n.security.SYNOPSIS"
        prop="description"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.security.CVSS_SCORE"
        prop="NVDScore"
        width="150"
      ></OTableColumn>
      <OTableColumn
        width="180"
        :label="i18n.security.RELEASE_DATE"
        prop="releaseDate"
      ></OTableColumn>
      <OTableColumn
        width="180"
        :label="i18n.security.MODIFIED_TIME"
        prop="updateTime"
      ></OTableColumn>
    </OTable>

    <ul class="mobile-list">
      <li v-for="item in tableData" :key="item.cveId" class="item">
        <ul>
          <li>
            <span class="label">{{ i18n.security.CVE }}:</span
            ><span id="cve-name" @click="goCveDetail(item.cveNum)">{{
              item.cveNum
            }}</span>
          </li>
          <li>
            <span class="label">{{ i18n.security.SYNOPSIS }}:</span
            ><span>{{ item.description }}</span>
          </li>
          <li>
            <span class="label">{{ i18n.security.CVSS_SCORE }}:</span
            ><span>{{ item.NVDScore }}</span>
          </li>
          <li>
            <span class="label">{{ i18n.security.RELEASE_DATE }}:</span
            ><span>{{ item.releaseDate }}</span>
          </li>
          <li>
            <span class="label">{{ i18n.security.MODIFIED_TIME }}:</span
            ><span>{{ item.updateTime }}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div v-if="totalPage === 0" class="empty-status">
      {{ i18n.security.EMPTY_SEARCH_RESULT }}
    </div>

    <ClientOnly>
      <OPagination
        v-model:page-size="queryData.pageSize"
        v-model:currentPage="queryData.pageNum"
        class="pagination"
        :page-sizes="[10, 20, 40, 80]"
        :layout="layout"
        :total="total"
        :background="true"
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <span class="pagination-slot"> {{ currentPage }}/{{ totalPage }}</span>
      </OPagination>
    </ClientOnly>

    <AppPaginationMo
      v-if="Math.ceil(total / 10) > 1"
      :current-page="queryData.pageNum"
      :total-page="Math.ceil(total / 10)"
      @turn-page="turnPage"
    />
  </AppContent>
</template>
<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  :deep(.el-input .el-input__wrapper) {
    .el-input__inner {
      font-size: var(--o-font-size-tip);
    }
    .el-input__prefix-inner {
      font-size: var(--o-font-size-h8) !important;
    }
  }
}
.o-search {
  height: 56px;
  @media screen and (max-width: 768px) {
    // display: none;
    height: 36px;
    margin-bottom: var(--o-spacing-h6);
  }
  .close {
    cursor: pointer;
  }
}
.pc-list {
  margin-top: var(--o-spacing-h2);
  .detail-page {
    cursor: pointer;
    color: var(--o-color-link1);
  }
  :deep(thead) {
    tr th .cell {
      font-weight: 700;
    }
  }
  :deep(.cell) {
    text-align: justify;
    word-break: break-word;
    padding: 0 22px !important;
  }
  :deep(.is-leaf) {
    background-color: var(--o-color-bg4);
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.mobile-list {
  display: none;
  margin-bottom: var(--o-spacing-h5);
  box-shadow: var(--o-shadow1);
  @media screen and (max-width: 768px) {
    display: block;
  }
  .item {
    padding: var(--o-spacing-h5);
    font-size: var(--o-font-size-tip);
    font-weight: 300;
    line-height: var(--o-line-height-tip);
    background-color: var(--o-color-bg2);
    &:nth-child(odd) {
      background: var(--o-color-bg4);
    }
    li {
      margin-bottom: var(--o-spacing-h8);
      span:nth-of-type(1) {
        color: var(--o-color-text1);
        text-align: justify;
      }
      span:nth-of-type(2) {
        color: var(--o-color-text3);
        margin-right: var(--o-spacing-h8);
      }
      #cve-name {
        color: var(--o-color-brand1);
      }
      .label {
        display: inline-block;
        min-width: 34px;
      }
    }
    li:last-child {
      margin-bottom: 0;
      a {
        color: var(--o-color-link1);
      }
    }
    li:nth-child(2) {
      display: flex;
    }
  }
}
.empty-status {
  text-align: center;
  font-size: var(--o-font-size-tip);
  color: var(--o-color-text4);
  line-height: var(--o-spacing-tip);
  padding: var(--o-spacing-h2) 0 var(--o-spacing-h5);
}
.pagination {
  margin: var(--o-spacing-h2) 0 0 0;
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
}
</style>
