<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/compatibility.png';

import { getCompatibilityData } from '@/api/api-compatibility';

interface CompatibilityData {
  name: string;
  type: string;
  company: string;
  database: string;
  os: string;
  server: string;
  version: string;
}

const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const totalPage = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');

const queryData = reactive({
  page: 1,
  per_page: 10,
  name: '',
  community: 'opengauss',
});

const i18n = useI18n();
const tableData = ref<CompatibilityData[]>([]);

const randerData = computed(() => {
  return tableData.value.slice(
    pageSize.value * (currentPage.value - 1),
    pageSize.value * currentPage.value
  );
});

const searchValchange = () => {
  handleGetCompatibilityData();
};

// 分页size修改
const handleSizeChange = (val: number) => {
  queryData.per_page = val;
  totalPage.value = Math.ceil(total.value / val);
};

const handleCurrentChange = (val: number) => {
  queryData.page = val;
  currentPage.value = val;
};

const handleGetCompatibilityData = () => {
  getCompatibilityData(queryData).then((res) => {
    tableData.value = res?.data;
    total.value = res?.data?.length;
    handleSizeChange(10);
  });
};

onMounted(() => {
  handleGetCompatibilityData();
});
</script>
<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.compatibility.title"
    :illustration="illustration"
  />
  <AppContent :mobile-top="16">
    <div class="o-search">
      <OSearch
        v-model="queryData.name"
        clearable
        :placeholder="i18n.compatibility.search_placeholder"
        @change="searchValchange"
      ></OSearch>
    </div>
    <OTable class="pc-list" :data="randerData" style="width: 100%">
      <!-- <OTableColumn
        :label="i18n.compatibility.name"
        prop="name"
        show-overflow-tooltip
      ></OTableColumn> -->
      <el-table-column :label="i18n.compatibility.name">
        <template #default="scope">
          <span>{{ scope.row.name }} V{{ scope.row.version }}</span>
        </template>
      </el-table-column>
      <OTableColumn
        width="200"
        :label="i18n.compatibility.type"
        prop="type"
        show-overflow-tooltip
      ></OTableColumn>
      <OTableColumn
        width="400"
        :label="i18n.compatibility.company"
        prop="company"
      ></OTableColumn>
      <OTableColumn
        width="400"
        :label="i18n.compatibility.database"
        prop="database"
      ></OTableColumn>
    </OTable>

    <ul class="mobile-list">
      <li v-for="item in tableData" :key="item.name" class="item">
        <ul>
          <li>
            <span>{{ i18n.compatibility.name }}:</span
            ><span>{{ item.name }} V{{ item.version }}</span>
          </li>
          <li>
            <span>{{ i18n.compatibility.type }}:</span
            ><span>{{ item.type }}</span>
          </li>
          <li>
            <span>{{ i18n.compatibility.company }}:</span
            ><span>{{ item.company }}</span>
          </li>
          <li>
            <span>{{ i18n.compatibility.database }}:</span
            ><span>{{ item.database }}</span>
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
        :total="tableData.length"
        :background="true"
        :layout="layout"
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
      关于商业软件兼容性技术测评，openGauss提供了完整的测试流程和工具，详见<a
        href="https://gitee.com/opengauss/compatible-certification"
        target="_blank" rel="noopener noreferrer"
        >openGauss兼容性技术测评整体介绍</a
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
