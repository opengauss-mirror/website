<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/certification.png';

import { GITCODE_LINK } from '@/data/url-config';

interface CertificationDataT {
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
const totalPage = computed(() => Math.ceil(total.value / pageSize.value));
const layout = ref('sizes, prev, pager, next, slot, jumper');

const i18n = useI18n();
const tableData = ref<CertificationDataT[]>([]);

// 前端分页
const randerData = computed(() => {
  return tableData.value.slice(pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
});
// 分页size修改
const handleSizeChange = (val: number) => {
  pageSize.value = val;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
// 移动端分页器翻页
const changeCurrentMb = (val: string) => {
  if (val === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
  } else if (val === 'next' && currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
  }
};
function jumpPageMb(page: number) {
  currentPage.value = page;
}
// 前端搜索
function searchProductOrName(data: CertificationDataT[], query: string) {
  if (!query) {
    return i18n.value.certification.tableData;
  }
  const lowercaseQuery = query.toLowerCase();
  return data.filter((item) => {
    const lowercasePro = item.pro.toLowerCase();
    const lowercaseName = item.name.toLowerCase();
    return lowercasePro.includes(lowercaseQuery) || lowercaseName.includes(lowercaseQuery);
  });
}
// 搜索框change事件
function changeSearchVal() {
  tableData.value = searchProductOrName(i18n.value.certification.tableData, searchContent.value);
}
function sortByAwardDescending(certs: CertificationDataT[]): CertificationDataT[] {
  return certs.sort((a, b) => new Date(b.award).getTime() - new Date(a.award).getTime());
}

onMounted(() => {
  tableData.value = i18n.value.certification.tableData;
  sortByAwardDescending(tableData.value);
  total.value = i18n.value.certification.tableData.length;
  handleSizeChange(10);
});
</script>
<template>
  <BannerLevel2 :background-image="Banner" :title="i18n.certification.title" :illustration="illustration" />
  <AppContent :mobile-top="16">
    <div class="o-search">
      <OSearch v-model="searchContent" clearable :placeholder="i18n.certification.search_placeholder" @change="changeSearchVal"></OSearch>
    </div>
    <OTable class="pc-list" :data="randerData" style="width: 100%">
      <OTableColumn width="300" :label="i18n.certification.pro" prop="pro" show-overflow-tooltip></OTableColumn>
      <OTableColumn :label="i18n.certification.name" prop="name" show-overflow-tooltip></OTableColumn>
      <OTableColumn width="200" :label="i18n.certification.version" prop="version"></OTableColumn>
      <OTableColumn width="180" :label="i18n.certification.award" prop="award"></OTableColumn>
      <OTableColumn :label="i18n.certification.expiration" prop="expiration" width="180"></OTableColumn>
      <el-table-column :label="i18n.certification.certificate" width="200">
        <template #default="scope">
          <a :href="scope.row.certificate" download target="_blank" rel="noopener noreferrer">{{ i18n.certification.certify }}</a>
        </template>
      </el-table-column>
    </OTable>
    <ul class="mobile-list">
      <li v-for="(item, index) in tableData" :key="index" class="item">
        <ul>
          <li>
            <span>{{ i18n.certification.pro }}:</span><span>{{ item.pro }}</span>
          </li>
          <li>
            <span>{{ i18n.certification.name }}:</span><span>{{ item.name }}</span>
          </li>
          <li>
            <span>{{ i18n.certification.version }}:</span><span>{{ item.version }}</span>
          </li>
          <li>
            <span>{{ i18n.certification.award }}:</span><span>{{ item.award }}</span>
          </li>
          <li>
            <span>{{ i18n.certification.expiration }}:</span><span>{{ item.expiration }}</span>
          </li>
          <li>
            <span>{{ i18n.certification.certificate }}:</span>
            <a :href="item.certificate" rel="noopener noreferrer">{{ i18n.certification.certify }}</a>
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
        :hide-on-single-page="true"
        :total="tableData.length"
        :background="true"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
        <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
      </OPagination>
      <AppPaginationMo :current-page="currentPage" :total-page="totalPage" @turn-page="changeCurrentMb" @jump-page="jumpPageMb" />
    </ClientOnly>
    <p class="introduce">
      {{ i18n.certification.introduce1
      }}<a :href="GITCODE_LINK + 'opengauss/distribution-certification'" target="_blank" rel="noopener noreferrer">{{ i18n.certification.introduce2 }}</a>
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
  margin-top: var(--e-spacing-h2);
  @media screen and (max-width: 1100px) {
    display: none;
  }
  :deep(.is-leaf) {
    background-color: var(--e-color-bg4);
  }
  :deep(.cell) {
    word-break: break-word;
  }
  :deep(.el-tooltip) {
    white-space: normal !important;
  }
}
.mobile-list {
  margin-top: var(--e-spacing-h5);
  display: none;
  box-shadow: var(--e-shadow1);
  @media screen and (max-width: 1100px) {
    display: block;
  }
  .item {
    padding: var(--e-spacing-h5) var(--e-spacing-h5) var(--e-spacing-h8);
    line-height: var(--e-line-height-tip);
    font-size: var(--e-font-size-tip);
    font-weight: 300;
    color: var(--e-color-neutral8);
    background-color: var(--e-color-bg2);
    li:nth-child(4) {
      display: flex;
      span {
        min-width: 52px;
      }
    }
    &:nth-child(odd) {
      background: var(--e-color-bg4);
    }
    & li {
      margin-bottom: var(--e-spacing-h8);
    }
    span {
      margin-right: var(--e-spacing-h8);
      color: var(--e-color-text1);
      text-align: justify;
      &:nth-of-type(2) {
        color: var(--e-color-neutral8);
      }
    }
  }
}
.pagination-mobile {
  margin-top: 24px;
}
.o-pagination {
  margin-top: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.introduce {
  font-size: var(--e-font-siez-text);
  color: var(--e-color-text-secondary);
  line-height: var(--e-line-height-text);
  margin-top: 40px;
}
</style>
