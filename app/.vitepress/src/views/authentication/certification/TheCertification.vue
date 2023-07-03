<script lang="ts" setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/certification.png';

interface CertificationData {
  pro: string;
  name: string;
  version: string;
  award: string;
  expiration: string;
  certificate: string;
}

const searchContent = ref('');

const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const totalPage = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');

const i18n = useI18n();
const tableData = ref<CertificationData[]>([]);

// 前端分页
const randerData = computed(() => {
  return tableData.value.slice(
    pageSize.value * (currentPage.value - 1),
    pageSize.value * currentPage.value
  );
});
const queryData = reactive({
  page: 1,
  per_page: 10,
});
// 分页size修改
const handleSizeChange = (val: number) => {
  queryData.per_page = val;
  totalPage.value = Math.ceil(total.value / val);
};

const handleCurrentChange = (val: number) => {
  queryData.page = val;
  currentPage.value = val;
};

// 前端搜索
function searchProductOrName(data: CertificationData[], query: string) {
  console.log(query);

  if (!query) {
    return i18n.value.certification.tableData;
  }
  const lowercaseQuery = query.toLowerCase();
  return data.filter((item) => {
    const lowercasePro = item.pro.toLowerCase();
    const lowercaseName = item.name.toLowerCase();
    return (
      lowercasePro.includes(lowercaseQuery) ||
      lowercaseName.includes(lowercaseQuery)
    );
  });
}
// 搜索框change事件
function searchValchange() {
  tableData.value = searchProductOrName(
    i18n.value.certification.tableData,
    searchContent.value
  );
}
function sortByAwardDescending(
  certs: CertificationData[]
): CertificationData[] {
  return certs.sort(
    (a, b) => new Date(b.award).getTime() - new Date(a.award).getTime()
  );
}

onMounted(() => {
  tableData.value = i18n.value.certification.tableData;
  sortByAwardDescending(tableData.value);
  total.value = i18n.value.certification.tableData.length;
  handleSizeChange(10);
});
</script>
<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.certification.title"
    :illustration="illustration"
  />
  <AppContent :mobile-top="16">
    <div class="o-search">
      <OSearch
        v-model="searchContent"
        clearable
        :placeholder="i18n.certification.search_placeholder"
        @change="searchValchange"
      ></OSearch>
    </div>
    <OTable class="pc-list" :data="randerData" style="width: 100%">
      <OTableColumn
        width="250"
        :label="i18n.certification.pro"
        prop="pro"
        show-overflow-tooltip
      ></OTableColumn>
      <OTableColumn
        :label="i18n.certification.name"
        prop="name"
        show-overflow-tooltip
      ></OTableColumn>
      <OTableColumn
        width="200"
        :label="i18n.certification.version"
        prop="version"
      ></OTableColumn>
      <OTableColumn
        width="180"
        :label="i18n.certification.award"
        prop="award"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.certification.expiration"
        prop="expiration"
        width="180"
      ></OTableColumn>
      <el-table-column :label="i18n.certification.certificate" width="200">
        <template #default="scope">
          <a
            :href="scope.row.certificate"
            download
            target="_blank"
            rel="noopener noreferrer"
            >{{ i18n.certification.certify }}</a
          >
        </template>
      </el-table-column>
    </OTable>
    <ul class="mobile-list">
      <li v-for="(item, index) in tableData" :key="index" class="item">
        <ul>
          <li>
            <span>{{ i18n.certification.pro }}:</span
            ><span>{{ item.pro }}</span>
          </li>
          <li>
            <span>{{ i18n.certification.name }}:</span
            ><span>{{ item.name }}</span>
          </li>
          <li>
            <span>{{ i18n.certification.version }}:</span
            ><span>{{ item.version }}</span>
          </li>
          <li>
            <span>{{ i18n.certification.award }}:</span
            ><span>{{ item.award }}</span>
          </li>
          <li>
            <span>{{ i18n.certification.expiration }}:</span
            ><span>{{ item.expiration }}</span>
          </li>
          <li>
            <span>{{ i18n.certification.certificate }}:</span>
            <a :href="item.certificate">{{ i18n.certification.certify }}</a>
          </li>
          <li></li>
        </ul>
      </li>
    </ul>
    <ClientOnly>
      <OPagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        class="pagination"
        :page-sizes="[5, 10, 20, 40, 80]"
        :layout="layout"
        :total="tableData.length"
        :background="true"
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
      </OPagination>
      <AppPaginationMo
        :current-page="currentPage"
        :total-page="tableData.length"
        @turn-page="handleSizeChange"
      />
    </ClientOnly>
    <p class="introduce">
      {{ i18n.certification.introduce1
      }}<a
        href="https://gitee.com/opengauss/distribution-certification"
        target="_blank"
        rel="noopener noreferrer"
        >{{ i18n.certification.introduce2 }}</a
      >
    </p>
  </AppContent>
</template>
<style lang="scss" scoped>
.o-search {
  height: 48px;
  @media screen and (max-width: 1100px) {
    height: 36px;
  }
}
.pc-list {
  margin-top: var(--o-spacing-h2);
  @media screen and (max-width: 1100px) {
    display: none;
  }
  :deep(.is-leaf) {
    background-color: var(--o-color-bg4);
  }
  :deep(.el-tooltip) {
    white-space: normal !important;
  }
  :deep(.cell) {
    // white-space: nowrap;
    word-break: break-word;
  }
}
.mobile-list {
  display: none;
  margin-top: var(--o-spacing-h5);
  box-shadow: var(--o-shadow1);
  @media screen and (max-width: 1100px) {
    display: block;
  }
  .item {
    padding: var(--o-spacing-h5) var(--o-spacing-h5) var(--o-spacing-h8);
    font-size: var(--o-font-size-tip);
    font-weight: 300;
    color: var(--o-color-neutral8);
    line-height: var(--o-line-height-tip);
    background-color: var(--o-color-bg2);
    &:nth-child(odd) {
      background: var(--o-color-bg4);
    }
    & li {
      margin-bottom: var(--o-spacing-h8);
    }
    li:nth-child(4) {
      display: flex;
      span {
        min-width: 52px;
      }
    }
    span {
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h8);
      text-align: justify;
      &:nth-of-type(2) {
        color: var(--o-color-neutral8);
      }
    }
  }
}
.o-pagination {
  margin-top: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.pagination-mobile {
  margin-top: 24px;
}
.introduce {
  margin-top: 40px;
  font-size: var(--o-font-siez-text);
  color: var(--o-color-text-secondary);
  line-height: var(--o-line-height-text);
}
</style>
