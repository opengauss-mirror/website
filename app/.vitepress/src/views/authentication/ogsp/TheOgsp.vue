<script lang="ts" setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/ogsp.png';

interface CertificationData {
  pro: string;
  name: string;
  version: string;
  award: string;
  expiration: string;
  patch: string;
  content: string;
  system: string;
  certificate: string;
  experience: string;
  commitment: string;
}

const i18n = useI18n();
const total = ref(0);
const pageSize = ref(10);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const currentPage = ref(1);
const totalPage = ref(0);
const tableData = ref<CertificationData[]>([]);
const searchContent = ref('');
// 前端分页
const queryData = reactive({
  page: 1,
  per_page: 10,
});
const randerTableData = computed(() => {
  return tableData.value.slice(
    pageSize.value * (currentPage.value - 1),
    pageSize.value * currentPage.value
  );
});

// 分页size修改
const handlePageSizeChange = (val: number) => {
  queryData.per_page = val;
  totalPage.value = Math.ceil(total.value / val);
};
const setCurrentPage = (val: number) => {
  queryData.page = val;
  currentPage.value = val;
};

// 前端搜索
function searchProductOrName(data: CertificationData[], query: string) {
  if (!query) {
    return i18n.value.ogsp.tableData;
  }
  const lowercaseQuery = query.toLowerCase();
  return data.filter((item) => {
    const lowercaseName = item.name.toLowerCase();
    return lowercaseName.includes(lowercaseQuery);
  });
}
// 搜索框change事件
function sortByAwardDescending(
  certs: CertificationData[]
): CertificationData[] {
  return certs.sort(
    (a, b) => new Date(b.award).getTime() - new Date(a.award).getTime()
  );
}
function searchValchange() {
  tableData.value = searchProductOrName(
    i18n.value.ogsp.tableData,
    searchContent.value
  );
}

onMounted(() => {
  tableData.value = i18n.value.ogsp.tableData;
  sortByAwardDescending(tableData.value);
  total.value = i18n.value.ogsp.tableData.length;
  handlePageSizeChange(10);
});
</script>
<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.ogsp.title"
    :illustration="illustration"
  />
  <AppContent :mobile-top="16">
    <div class="o-search">
      <OSearch
        v-model="searchContent"
        clearable
        :placeholder="i18n.ogsp.search_placeholder"
        @change="searchValchange"
      ></OSearch>
    </div>
    <OTable class="pc-list" :data="randerTableData" style="width: 100%">
      <OTableColumn
        :label="i18n.ogsp.name"
        show-overflow-tooltip
        prop="name"
        min-width="200"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.ogsp.version"
        show-overflow-tooltip
        prop="version"
        min-width="115"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.ogsp.award"
        show-overflow-tooltip
        prop="award"
        min-width="115"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.ogsp.expiration"
        show-overflow-tooltip
        prop="expiration"
        min-width="115"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.ogsp.patch"
        show-overflow-tooltip
        prop="patch"
        align="center"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.ogsp.content"
        prop="content"
        align="center"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.ogsp.system"
        prop="system"
        align="center"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.ogsp.commitment"
        prop="commitment"
        align="center"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.ogsp.experience"
        prop="experience"
        align="center"
      ></OTableColumn>
      <el-table-column :label="i18n.ogsp.certificate" align="center">
        <template #default="scope">
          <a
            :href="scope.row.certificate"
            download
            target="_blank"
            rel="noopener noreferrer"
            >{{ i18n.ogsp.certify }}</a
          >
        </template>
      </el-table-column>
    </OTable>
    <ul class="mobile-list">
      <li v-for="(item, index) in tableData" :key="index" class="item">
        <ul>
          <li>
            <span>{{ i18n.ogsp.name }}:</span><span>{{ item.name }}</span>
          </li>
          <li>
            <span>{{ i18n.ogsp.version }}:</span><span>{{ item.version }}</span>
          </li>
          <li>
            <span>{{ i18n.ogsp.award }}:</span><span>{{ item.award }}</span>
          </li>
          <li>
            <span>{{ i18n.ogsp.expiration }}:</span
            ><span>{{ item.expiration }}</span>
          </li>
          <li>
            <span>{{ i18n.ogsp.patch }}:</span><span>{{ item.patch }}</span>
          </li>
          <li>
            <span>{{ i18n.ogsp.content }}:</span><span>{{ item.content }}</span>
          </li>
          <li>
            <span>{{ i18n.ogsp.system }}:</span><span>{{ item.system }}</span>
          </li>
          <li>
            <span>{{ i18n.ogsp.commitment }}:</span
            ><span>{{ item.commitment }}</span>
          </li>
          <li>
            <spans>{{ i18n.ogsp.experience }}:</spans
            ><span>{{ item.experience }}</span>
          </li>
          <li>
            <span>{{ i18n.ogsp.certificate }}:</span>
            <a :href="item.certificate">{{ i18n.ogsp.certify }}</a>
          </li>
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
        @size-change="handlePageSizeChange"
        @current-change="setCurrentPage"
      >
        <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
      </OPagination>
      <AppPaginationMo
        :total-page="tableData.length"
        :current-page="currentPage"
        @turn-page="handlePageSizeChange"
      />
    </ClientOnly>
  </AppContent>
</template>
<style lang="scss" scoped>
.o-search {
  height: 48px;
  @media screen and (max-width: 1100px) {
    height: 36px;
  }
}

:deep(.is-center) {
  text-align: center !important;
}
.pc-list {
  margin-top: var(--o-spacing-h2);
  @media screen and (max-width: 1100px) {
    display: none;
  }
  :deep(.is-leaf) {
    background-color: var(--o-color-bg4);
  }

  :deep(.cell) {
    word-break: break-word;
    padding: 0 var(--o-spacing-h6);
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
      margin-right: var(--o-spacing-h8);
      color: var(--o-color-text1);
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
