<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCommon } from '@/stores/common';
import SummitSchedule from './SummitSchedule.vue';

defineProps({
  agendaData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const tabType = ref('main');

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>
<template>
  <div class="summit-agenda">
    <div class="title-box">
      <p class="title-bg">{{ agendaData.titleBg }}</p>
      <p class="title">{{ agendaData.title }}</p>
    </div>
    <div class="agenda">
      <OTabs v-model="tabType" class="agenda-tabs">
        <OTabPane
          v-for="item in agendaData.list"
          :key="item.id"
          :name="item.id"
          :label="item.time"
        >
          <SummitSchedule :options="item.list" />
        </OTabPane>
      </OTabs>
      <span class="agenda-date">{{ agendaData.date }}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.summit-agenda {
  margin-bottom: 44px;
  @media (max-width: 767px) {
    margin-bottom: 31px;
  }
}
.agenda {
  position: relative;
  margin-top: 42px;
  @media (max-width: 767px) {
    margin-top: var(--o-spacing-h5);
  }
}
.agenda-tabs {
  :deep(.el-tabs__header) {
    border-bottom: 1px solid rgba(#7d32ea, 0.1);
    .el-tabs__item {
      padding-top: 0;
      padding-bottom: 18px;
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      @media (max-width: 767px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        padding-bottom: 2px;
      }
    }
    @media (max-width: 767px) {
      .el-tabs__active-bar {
        width: 24px !important;
        margin-left: 16px;
      }
    }
  }
}
.agenda-date {
  opacity: 0.1;
  font-size: 32px;
  color: var(--o-color-brand1);
  font-weight: 900;
  position: absolute;
  top: 0;
  right: 0;
  @media (max-width: 767px) {
    font-size: var(--o-font-size-text);
  }
}
</style>
