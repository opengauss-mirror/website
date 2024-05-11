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
    <div class="title-img">
      <img :src="isLight ? agendaData.titleImg : agendaData.titleImgDark" alt="" />
    </div>
    <p class="title">{{ agendaData.title }}</p>
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
.title-img {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 44px;
  img {
    width: 312px;
  }
  @media screen and (max-width: 1440px) {
    img {
      width: 250px;
    }
  }
  @media (max-width: 767px) {
    height: 32px;
    img {
      width: 130px;
    }
  }
}
.title {
  font-size: 40px;
  color: var(--o-color-text1);
  line-height: 56px;
  font-weight: 500;
  text-align: center;
  margin-top: -36px;
  @media screen and (max-width: 1440px) {
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
  }
  @media (max-width: 767px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    margin-top: -18px;
  }
}
.agenda {
  position: relative;
  margin-top: 42px;
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
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        padding-bottom: 16px;
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
