<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/certification.png';

// const searchContent = ref('');
const i18n = useI18n();
const tableData: any = ref([]);
onMounted(() => {
  tableData.value = i18n.value.certification.tableData;
});
</script>
<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.certification.title"
    :illustration="illustration"
  />
  <AppContent :mobile-top="16">
    <!-- <div class="o-search">
      <OSearch
        v-model="searchContent"
        clearable
        :placeholder="i18n.certification.search_placeholder"
        @change="searchValchange"
      ></OSearch>
    </div> -->
    <OTable class="pc-list" :data="tableData" style="width: 100%">
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
          <a :href="scope.row.certificate" download target="_blank">{{
            i18n.certification.certify
          }}</a>
        </template>
      </el-table-column>
    </OTable>
    <ul class="mobile-list">
      <li v-for="item in tableData" :key="item.securityNoticeNo" class="item">
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
</style>
