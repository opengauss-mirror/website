<script setup lang="ts">
import { OButton, OCol, OFigure, OIcon, OLink, OPagination, ORow, OTable } from '@opensig/opendesign';
import { useData } from 'vitepress';
import { computed, ref } from 'vue';
import AppSection from '~@/components/AppSection.vue';
import { useScreen } from '~@/composables/useScreen';
import { GUIDES } from '~@/data/maillist/data';
import { sigInfo } from '~@/data/sig';

import { useI18n } from '~@/i18n';

const { lang } = useData();
const i18n = useI18n();
const { lePadV, isPhone } = useScreen();

const page = ref(1);
const pageSize = ref(10);

const tableData = computed(() => sigInfo[lang.value as 'zh' | 'en']);
const columns = computed(() => [
  { key: 'sig_name', label: i18n.value.maillist.sigName, style: { width: lePadV.value ? '100px' : '180px' } },
  { key: 'description', label: i18n.value.maillist.desc, style: { 'max-width': '640px' } },
  { key: 'mailing_list', label: i18n.value.maillist.emailAddr, style: { width: lePadV.value ? '160px' : '320px' } },
  { key: 'archive_link', label: i18n.value.maillist.archive, style: { width: '104px' } },
  { key: 'mailweb_link', label: i18n.value.maillist.subscribe, style: { width: '104px' } },
]);

const pagedData = computed(() => {
  const offset = (page.value - 1) * pageSize.value;
  return tableData.value.slice(offset, offset + pageSize.value);
});
</script>

<template>
  <AppSection :title="i18n.maillist.title1">
    <div class="subscribe-guide">
      <ORow>
        <OCol
          v-for="(item, i) in GUIDES[lang]"
          :key="i"
          flex="0 1 25%"
          :laptop="{ flex: '0 1 25%' }"
          :pad="{ flex: '0 1 25%' }"
          :padV="{ flex: '0 1 50%' }"
          :phone="{ flex: '0 1 50%' }"
        >
          <div class="subscribe-item">
            <div>
              <OIcon><component :is="item.icon"></component></OIcon>
              <p class="title">{{ item.title }}</p>
              <p class="desc">{{ item.desc }}</p>
            </div>
            <OFigure :src="item.img" />
          </div>
        </OCol>
      </ORow>
    </div>
  </AppSection>
  <AppSection :title="i18n.maillist.maillist">
    <OTable v-if="!isPhone" :data="pagedData" :columns="columns">
      <template #td_archive_link="{ row }">
        <OLink color="primary" :href="row.archive_link" target="_blank" rel="noopener noreferrer">{{ i18n.maillist.viewArchive }}</OLink>
      </template>
      <template #td_mailweb_link="{ row }">
        <OButton round="pill" color="primary" :href="row.mailweb_link" rel="noopener noreferrer">{{ i18n.maillist.subscribe }}</OButton>
      </template>
    </OTable>
    <div class="mail-list" v-else>
      <div class="mail-item" v-for="row in pagedData" :key="row.sig_name">
        <div class="item-title">{{ row.sig_name }}</div>
        <div class="item-desc">{{ row.description }}</div>
        <div class="item-mail">{{ row.mailing_list }}</div>
        <div class="item-btns">
          <OLink hover-underline :href="row.archive_link" color="primary" target="_blank" rel="noopener noreferrer">
            {{ i18n.maillist.viewArchive }}
          </OLink>
          <OButton round="pill" color="primary" size="small" :href="row.mailweb_link" target="_blank" rel="noopener noreferrer">
            {{ i18n.maillist.subscribe }}
          </OButton>
        </div>
      </div>
    </div>

    <OPagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :total="tableData.length"
      variant="outline"
      round="4px"
      :show-page-count="5"
      :page-sizes="[10, 12, 24, 48]"
      :show-more="false"
      :simple="isPhone"
      :layout="['total', 'pagesize', 'pager', 'jumper']"
    />
  </AppSection>
</template>

<style lang="scss" scoped>
.o-row {
  --row-gap-x: var(--o-r-gap-10);
  --row-gap-y: var(--o-r-gap-10);
  @include respond-to('phone') {
    --row-gap-x: var(--o-r-gap-5);
    --row-gap-y: var(--o-r-gap-5);
  }
}

.o-table {
  --table-head-bg: var(--o-color-control3-light);
  --table-text-size: var(--o-r-font_size-tip1);
  --table-text-height: var(--o-r-line_height-tip1);
  --table-radius: 4px;
}

:deep(.o-table thead:after) {
  display: none;
}

.subscribe-guide {
  background-color: var(--o-color-fill2);
  padding: calc(var(--o-gap-section-4) + var(--o-gap-section-8));
  padding-bottom: var(--o-gap-section-4);
  border-radius: var(--o-radius-xs);
  @include respond-to('phone') {
    padding: var(--o-gap-section-5);
    :deep(.o-col) {
      flex: 0 1 100%;
    }
    .o-row {
      position: relative;
      top: var(--o-gap-section-6);
    }
    .o-figure {
      width: 160px !important;
      height: 136px;
      margin: 0 auto;
    }
  }
  .subscribe-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .o-icon {
      color: var(--o-color-primary1);
      opacity: 30%;
      font-size: 40px;
      height: 20px;
      position: absolute;
      left: 0;
      top: -24px;
    }
    .title {
      color: var(--o-color-primary1);
      font-weight: 500;
      @include text2;
    }
    .desc {
      color: var(--o-color-info2);
      margin-top: var(--o-gap-2);
      font-size: var(--o-r-font_size-tip1);
      line-height: var(--o-r-line_height-tip1);
    }
    .o-figure {
      width: calc(var(--o-gap-section) * 2 + var(--o-gap-section-4));
    }
  }
}

.o-pagination {
  @include respond-to('phone') {
    margin-top: var(--o-gap-section-5);
  }
}

.mail-list {
  .mail-item + .mail-item {
    margin-top: var(--o-gap-section-5);
  }
  .mail-item {
    padding: var(--o-gap-section-5);
    border-radius: 4px;
    background-color: var(--o-color-fill2);

    .item-title {
      font-weight: 500;
      @include h4;
    }
    .item-desc {
      color: var(--o-color-info2);
      margin-top: var(--o-gap-section-3);
      font-size: var(--o-r-font_size-tip1);
      line-height: var(--o-r-line_height-tip1);
    }
    .item-mail {
      margin-top: var(--o-gap-section-4);
      overflow: hidden; // 公共属性：超出隐藏
      white-space: nowrap; // 禁止换行
      text-overflow: ellipsis; // 省略号
      @include text1;
    }
    .item-btns {
      margin-top: var(--o-gap-section-4);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .o-link {
      @include text1;
    }
  }
}
</style>
