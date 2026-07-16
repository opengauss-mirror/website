<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useData } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import ogspContent from '#content/ogsp';

type OgspItemT = typeof ogspData.value.certifications[0];

const { lang } = useData();
const ogspData = computed(() => (lang.value === 'zh' ? ogspContent.zh : ogspContent.en));

const total = ref(0);
const pageSize = ref(10);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const currentPage = ref(1);
const totalPage = ref(0);
const tableData = ref<OgspItemT[]>([]);
const searchContent = ref('');
// 前端分页
const randerTableData = computed(() => {
  return tableData.value.slice(pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
});

// 分页size修改
const handlePageSizeChange = (val: number) => {
  totalPage.value = Math.ceil(total.value / val);
};
const setCurrentPage = (val: number) => {
  currentPage.value = val;
};

// 移动端分页器
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
function searchProductOrName(data: OgspItemT[], query: string) {
  if (!query) {
    return ogspData.value.certifications;
  }
  const lowercaseQuery = query.toLowerCase();
  return data.filter((item) => {
    const lowercaseName = item.name.toLowerCase();
    return lowercaseName.includes(lowercaseQuery);
  });
}
// 搜索框change事件
function sortByAwardDescending(certs: OgspItemT[]): OgspItemT[] {
  return certs.sort((a, b) => new Date(b.award).getTime() - new Date(a.award).getTime());
}
function queryTableData() {
  tableData.value = searchProductOrName(ogspData.value.certifications, searchContent.value);
}

onMounted(() => {
  tableData.value = ogspData.value.certifications;
  sortByAwardDescending(tableData.value);
  total.value = ogspData.value.certifications.length;
  handlePageSizeChange(10);
});
</script>
<template>
  <BannerLevel2 :background-image="ogspData.banner.background" :title="ogspData.banner.title" :illustration="ogspData.banner.illustration" />
  <AppContent :mobile-top="16">
    <div class="o-search">
      <OSearch v-model="searchContent" clearable :placeholder="ogspData.search_placeholder" @change="queryTableData"></OSearch>
    </div>
    <OTable class="list-pc" :data="randerTableData" style="width: 100%">
      <OTableColumn :label="ogspData.table_headers.name" show-overflow-tooltip prop="name" min-width="200"></OTableColumn>
      <OTableColumn :label="ogspData.table_headers.version" show-overflow-tooltip prop="version" min-width="115"></OTableColumn>
      <OTableColumn :label="ogspData.table_headers.award" show-overflow-tooltip prop="award" min-width="115"></OTableColumn>
      <OTableColumn :label="ogspData.table_headers.expiration" show-overflow-tooltip prop="expiration" min-width="115"></OTableColumn>
      <OTableColumn :label="ogspData.table_headers.patch" show-overflow-tooltip prop="patch" align="center"></OTableColumn>
      <OTableColumn :label="ogspData.table_headers.content" prop="content" align="center"></OTableColumn>
      <OTableColumn :label="ogspData.table_headers.system" prop="system" align="center"></OTableColumn>
      <OTableColumn :label="ogspData.table_headers.commitment" prop="commitment" align="center"></OTableColumn>
      <OTableColumn :label="ogspData.table_headers.experience" prop="experience" align="center"></OTableColumn>
      <el-table-column :label="ogspData.table_headers.certificate" align="center">
        <template #default="scope">
          <a :href="scope.row.certificate" download target="_blank" rel="noopener noreferrer">{{ ogspData.certify }}</a>
        </template>
      </el-table-column>
    </OTable>
    <ul class="list-mb">
      <li v-for="(item, index) in tableData" :key="index" class="item">
        <ul>
          <li>
            <span>{{ ogspData.table_headers.name }}:</span><span>{{ item.name }}</span>
          </li>
          <li>
            <span>{{ ogspData.table_headers.version }}:</span><span>{{ item.version }}</span>
          </li>
          <li>
            <span>{{ ogspData.table_headers.award }}:</span><span>{{ item.award }}</span>
          </li>
          <li>
            <span>{{ ogspData.table_headers.expiration }}:</span><span>{{ item.expiration }}</span>
          </li>
          <li>
            <span>{{ ogspData.table_headers.patch }}:</span><span>{{ item.patch }}</span>
          </li>
          <li>
            <span>{{ ogspData.table_headers.content }}:</span><span>{{ item.content }}</span>
          </li>
          <li>
            <span>{{ ogspData.table_headers.system }}:</span><span>{{ item.system }}</span>
          </li>
          <li>
            <span>{{ ogspData.table_headers.commitment }}:</span><span>{{ item.commitment }}</span>
          </li>
          <li>
            <span>{{ ogspData.table_headers.experience }}:</span><span>{{ item.experience }}</span>
          </li>
          <li>
            <span>{{ ogspData.table_headers.certificate }}:</span>
            <a :href="item.certificate" rel="noopener noreferrer">{{ ogspData.certify }}</a>
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
      <AppPaginationMo :total-page="totalPage" :current-page="currentPage" @turn-page="changeCurrentMb" @jump-page="jumpPageMb" />
    </ClientOnly>
    <p class="tips">
      {{ ogspData.tips.text }}<a
        :href="ogspData.tips.link_href"
        target="_blank"
        rel="noopener noreferrer"
        >{{ ogspData.tips.link_text }}</a
      >。
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
.tips {
  font-size: var(--e-font-size-text);
  line-height: var(--e-line-height-text);
  color: var(--e-color-text3);
  margin-top: 24px;
  @media screen and (max-width: 1100px) {
    margin-top: 16px;
  }
}
:deep(.is-center) {
  text-align: center !important;
}
.list-pc {
  margin-top: var(--e-spacing-h2);
  @media screen and (max-width: 1100px) {
    display: none;
  }
  :deep(.is-leaf) {
    background-color: var(--e-color-bg4);
  }

  :deep(.cell) {
    word-break: break-word;
    padding: 0 var(--e-spacing-h6);
  }
}
.list-mb {
  display: none;
  margin-top: var(--e-spacing-h5);
  box-shadow: var(--e-shadow1);
  @media screen and (max-width: 1100px) {
    display: block;
  }
  .item {
    padding: var(--e-spacing-h5) var(--e-spacing-h5) var(--e-spacing-h8);
    font-size: var(--e-font-size-tip);
    font-weight: 300;
    color: var(--e-color-neutral8);
    line-height: var(--e-line-height-tip);
    background-color: var(--e-color-bg2);
    &:nth-child(odd) {
      background: var(--e-color-bg4);
    }
    & li {
      margin-bottom: var(--e-spacing-h8);
    }
    li:nth-child(4) {
      display: flex;
      span {
        min-width: 52px;
      }
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
  font-size: var(--e-font-siez-text);
  color: var(--e-color-text-secondary);
  line-height: var(--e-line-height-text);
}
</style>
