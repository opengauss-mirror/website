<script lang="ts" setup>
import { computed, ref, Ref, onMounted, reactive } from 'vue';
import { useI18n } from '@/i18n';
import AppContent from '@/components/AppContent.vue';
import SummitLive from './summitLive.vue';
import SummitConfig from '@/data/summit/';

import banner from '@/assets/category/summit/banner.jpg';
import illustration from '@/assets/category/summit/caption.png';

const i18n = useI18n();
</script>

<template>
  <div
    class="summit-banner"
    :style="`background:url(${banner}) no-repeat top center/cover;`"
  >
    <div class="inner">
      <img class="cover" :src="illustration" alt="" />
    </div>
  </div>
  <AppContent>
    <div class="summit-info">
      <p class="text">{{ SummitConfig.desc[0] }}</p>
      <p class="text">{{ SummitConfig.desc[1] }}</p>
    </div>
    <h3 class="titleBar">{{ SummitConfig.titleBar[0] }}</h3>
    <SummitLive :live-data="SummitConfig.LIVEDATA" class-name="odd2022" />
    <!-- <h3 class="titleBar">{{ SummitConfig.titleBar[1] }}</h3>
    <div class="offline-panel">
      <h4 class="meetingtitle">{{ SummitConfig.offline.daytime }}</h4>
      <div class="agendaList">
        <div
          v-for="item in SummitConfig.offline.list"
          :key="item.time"
          class="agendaItem"
        >
          <span class="time">{{ item.time }}</span>
          <div class="info">
            <span class="inline" v-for="sub in item.option">{{ sub }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="online-panel">
      <h4 class="meetingtitle">{{ SummitConfig.online.daytime }}</h4>
    </div> -->
  </AppContent>
</template>

<style lang="scss" scoped>
.summit-banner {
  height: 380px;
  .inner {
    max-width: 1416px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;

    .cover {
      width: 424px;
      height: 160px;
    }
  }
}
.summit-info {
  .text {
    font-size: 18px;
    color: #000000;
    line-height: 40px;
    text-indent: 2em;
    text-align: justify;
  }
}
.titleBar {
  text-align: center;
  font-size: 36px;
  font-weight: 300;
  color: #000000;
  line-height: 84px;
  margin: 64px 0 40px;
}
.meetingtitle {
  font-size: 24px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.85);
  line-height: 32px;
  margin-bottom: 24px;
  text-align: center;
}
.agendaList {
  margin-bottom: 40px;
}
.agendaItem {
  display: flex;
  line-height: 32px;
  margin-bottom: 16px;
  align-items: center;
  .time {
    font-size: 18px;
    color: #000;
    line-height: 24px;
    width: 192px;
    color: rgba(0, 0, 0, 0.5);
  }
  .info {
    flex: 1;
    display: flex;
    align-items: center;
    height: 64px;
    justify-content: center;
    gap: 24px;
    span {
      color: #000;
      line-height: 64px;
      background: #ffffff;
      box-shadow: 0px 12px 32px 0px rgb(190 196 204 / 20%);
      border-radius: 2px;
      border: 1px solid #7d32ea;
      flex: 1;
      font-size: 18px;
      text-align: center;
    }
  }
}
</style>
