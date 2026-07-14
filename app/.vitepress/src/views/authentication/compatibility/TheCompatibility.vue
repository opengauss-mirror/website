<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/compatibility.png';

import { GITCODE_LINK } from '@/data/url-config';
import compatibilityData from '@/data/compatibility';
import certificationContent from '#content/certification';

const { lang } = useData();
const certifyLabel = computed(() => (lang.value === 'zh' ? certificationContent.zh.certify : certificationContent.en.certify));

const allData = ref(compatibilityData);
const total = computed(() => allData.value.length);
const pageSize = ref(10);
const currentPage = ref(1);
const totalPage = computed(() => Math.ceil(total.value / pageSize.value));
const layout = ref('sizes, prev, pager, next, slot, jumper');

const i18n = useI18n();

const randerData = computed(() => {
  return allData.value.slice(pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
});

// 获取类型下拉选项
const set = new Set<string>();
compatibilityData.forEach((item) => {
  set.add(item.type);
});

const typeOptionData = [
  {
    label: '全部产品类型',
    value: '',
  },
];

for (const el of set) {
  typeOptionData.push({
    label: el,
    value: el,
  });
}

// 分页size修改
const handleSizeChange = (val: number) => {
  pageSize.value = val;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

// 搜索功能
const searchInput = ref('');
const searchType = ref('');
const queryCompatibilityData = () => {
  const regex = new RegExp(searchInput.value.trim(), 'i');
  allData.value = [];
  compatibilityData.forEach((item) => {
    if (regex.test(item.name) || regex.test(item.type) || regex.test(item.company) || regex.test(`${item.name} V${item.version}`)) {
      if (searchType.value === '' || searchType.value === item.type) {
        allData.value.push(item);
      }
    }
  });
  currentPage.value = 1;
};

onMounted(() => {
  handleSizeChange(10);
});

// 移动端翻页事件
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
</script>
<template>
  <div class="compatibility">
    <BannerLevel2 :background-image="Banner" :title="i18n.compatibility.title" :illustration="illustration" class="compatibility-banner" />
    <AppContent :mobile-top="16" class="compatibility-content">
      <div class="o-search">
        <OSelect
          v-model="searchType"
          class="type-select"
          clearable
          filterable
          :placeholder="i18n.compatibility.type_search_placeholder"
          @change="queryCompatibilityData"
        >
          <OOption v-for="item in typeOptionData" :key="item.value" :label="item.label" :value="item.value" />
        </OSelect>
        <OSearch v-model="searchInput" clearable :placeholder="i18n.compatibility.search_placeholder" @change="queryCompatibilityData"></OSearch>
      </div>
      <OTable class="pc-list" :data="randerData" style="width: 100%">
        <el-table-column :label="i18n.compatibility.name">
          <template #default="scope">
            <span>
              {{ scope.row.name }}
              <template v-if="scope.row.version"> V{{ scope.row.version }} </template>
            </span>
          </template>
        </el-table-column>
        <OTableColumn width="150" :label="i18n.compatibility.type" prop="type" show-overflow-tooltip></OTableColumn>
        <OTableColumn width="400" :label="i18n.compatibility.company" prop="company"></OTableColumn>
        <OTableColumn :label="i18n.compatibility.database" width="200" prop="database"></OTableColumn>
        <el-table-column :label="i18n.compatibility.certificate" width="150">
          <template #default="scope">
            <a v-if="scope.row.download" :href="scope.row.download" download target="_blank" rel="noopener noreferrer">{{ certifyLabel }}</a>
          </template>
        </el-table-column>
      </OTable>

      <ul class="mobile-list">
        <li v-for="item in randerData" :key="item.name" class="item">
          <ul>
            <li>
              <span>{{ i18n.compatibility.name }}:</span>
              <span>
                {{ item.name }}
                <template v-if="item.version">V{{ item.version }}</template>
              </span>
            </li>
            <li>
              <span>{{ i18n.compatibility.type }}:</span>
              <span>{{ item.type }}</span>
            </li>
            <li>
              <span>{{ i18n.compatibility.company }}:</span>
              <span>{{ item.company }}</span>
            </li>
            <li>
              <span>{{ i18n.compatibility.database }}:</span>
              <span>{{ item.database }}</span>
            </li>
            <li v-if="item.download">
              <span>{{ i18n.compatibility.certificate }}:</span>
              <a :href="item.download" download target="_blank" rel="noopener noreferrer">{{ certifyLabel }}</a>
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
          :total="allData.length"
          :background="true"
          :layout="layout"
          :hide-on-single-page="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
        </OPagination>
        <AppPaginationMo :current-page="currentPage" :total-page="totalPage" @turn-page="changeCurrentMb" @jump-page="jumpPageMb" />
      </ClientOnly>
      <p class="introduce">
        关于商业软件兼容性技术测评，openGauss提供了完整的测试流程和工具，详见<a
          :href="GITCODE_LINK + '/opengauss/compatible-certification'"
          target="_blank"
          rel="noopener noreferrer"
          >openGauss兼容性技术测评整体介绍</a
        >。
      </p>
    </AppContent>
  </div>
</template>
<style lang="scss" scoped>
.o-search {
  display: flex;
  height: 48px;
  @media screen and (max-width: 1100px) {
    height: 36px;
  }
  :deep(.e-select) {
    width: 200px;
    .el-select__wrapper {
      height: 48px;
      min-width: auto;
      @media screen and (max-width: 1100px) {
        height: 36px;
      }
    }
  }

  .type-select {
    margin-right: 16px;

    :deep(.el-input__prefix) {
      display: none;
    }

    :deep(.el-input) {
      height: 48px;

      @media screen and (max-width: 1100px) {
        height: 36px;
      }
    }

    @media screen and (max-width: 1100px) {
      margin-right: 12px;
    }
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
  :deep(.el-tooltip) {
    white-space: normal !important;
  }
  :deep(.cell) {
    word-break: break-word;
  }
}
.mobile-list {
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
      color: var(--e-color-text1);
      margin-right: var(--e-spacing-h8);
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
