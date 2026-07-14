<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useData } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import certificationContent from '#content/certification';

type CertificationItemT = typeof certData.value.certifications[0];

const { lang } = useData();
const certData = computed(() => (lang.value === 'zh' ? certificationContent.zh : certificationContent.en));

const searchContent = ref('');

const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const totalPage = computed(() => Math.ceil(total.value / pageSize.value));
const layout = ref('sizes, prev, pager, next, slot, jumper');

const tableData = ref<CertificationItemT[]>([]);

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
function searchProductOrName(data: CertificationItemT[], query: string) {
  if (!query) {
    return certData.value.certifications;
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
  tableData.value = searchProductOrName(certData.value.certifications, searchContent.value);
}
function sortByAwardDescending(certs: CertificationItemT[]): CertificationItemT[] {
  return certs.sort((a, b) => new Date(b.award).getTime() - new Date(a.award).getTime());
}

onMounted(() => {
  tableData.value = certData.value.certifications;
  sortByAwardDescending(tableData.value);
  total.value = certData.value.certifications.length;
  handleSizeChange(10);
});
</script>
<template>
  <BannerLevel2 :background-image="certData.banner.background" :title="certData.banner.title" :illustration="certData.banner.illustration" />
  <AppContent :mobile-top="16">
    <div class="o-search">
      <OSearch v-model="searchContent" clearable :placeholder="certData.search_placeholder" @change="changeSearchVal"></OSearch>
    </div>
    <OTable class="pc-list" :data="randerData" style="width: 100%">
      <OTableColumn width="300" :label="certData.table_headers.pro" prop="pro" show-overflow-tooltip></OTableColumn>
      <OTableColumn :label="certData.table_headers.name" prop="name" show-overflow-tooltip></OTableColumn>
      <OTableColumn width="300" :label="certData.table_headers.version" prop="version"></OTableColumn>
      <OTableColumn width="180" :label="certData.table_headers.award" prop="award"></OTableColumn>
      <el-table-column :label="certData.table_headers.certificate" width="200">
        <template #default="scope">
          <a :href="scope.row.certificate" download target="_blank" rel="noopener noreferrer">{{ certData.certify }}</a>
        </template>
      </el-table-column>
    </OTable>
    <ul class="mobile-list">
      <li v-for="(item, index) in tableData" :key="index" class="item">
        <ul>
          <li>
            <span>{{ certData.table_headers.pro }}:</span><span>{{ item.pro }}</span>
          </li>
          <li>
            <span>{{ certData.table_headers.name }}:</span><span>{{ item.name }}</span>
          </li>
          <li>
            <span>{{ certData.table_headers.version }}:</span><span>{{ item.version }}</span>
          </li>
          <li>
            <span>{{ certData.table_headers.award }}:</span><span>{{ item.award }}</span>
          </li>
          <li>
            <span>{{ certData.table_headers.certificate }}:</span>
            <a :href="item.certificate" rel="noopener noreferrer">{{ certData.certify }}</a>
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
      {{ certData.introduce.text
      }}<a :href="certData.introduce.link_href" target="_blank" rel="noopener noreferrer">{{ certData.introduce.link_text }}</a>
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
