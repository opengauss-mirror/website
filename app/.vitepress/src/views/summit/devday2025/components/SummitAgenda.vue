<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCommon } from '@/stores/common';
import SummitSchedule from './SummitSchedule.vue';

import floorImg from '../img/floor-img.png';

defineProps({
  agendaData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>
<template>
  <div class="summit-agenda">
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ agendaData.titleBg }}</p>
      <p class="title">{{ agendaData.title }}</p>
      <img class="floor-img" :src="floorImg" alt="" />
    </div>
    <div class="agenda">
      <div class="tab">
        <span class="tab-title">{{ agendaData.date }}</span>
      </div>
      <span class="date-en">{{ agendaData.dateEn }}</span>
    </div>
    <SummitSchedule :agenda-data="agendaData.amList" />
    <SummitSchedule :agenda-data="agendaData.pmList" />
  </div>
</template>
<style scoped lang="scss">
.summit-agenda {
  margin-top: 72px;
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h3);
  }
}

.agenda {
  position: relative;
}
.tab {
  padding: 13px 0 16px;
  border-bottom: 1px solid rgba(125, 50, 234, 0.25);
  margin-top: var(--e-spacing-h2);
  @media (max-width: 767px) {
    padding: 0 0 3px;
    margin-top: var(--e-spacing-h4);
  }
}
.tab-title {
  font-size: 22px;
  line-height: 30px;
  font-weight: 500;
  color: var(--e-color-brand1);
  padding: 13px 0 17px;
  border-bottom: 2px solid var(--e-color-brand1);
  @media (max-width: 767px) {
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    padding: 0 0 4px;
  }
}
.date-en {
  opacity: 0.25;
  font-size: 32px;
  color: var(--e-color-brand1);
  font-weight: 900;
  position: absolute;
  top: 0;
  right: 0;
  @media (max-width: 767px) {
    font-size: var(--e-font-size-h8);
  }
}
</style>
