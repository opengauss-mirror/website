<script setup lang="ts">
import { computed } from 'vue';

import SummitBanner from './components/SummitBanner.vue';
import AppContent from '@/components/AppContent.vue';

import liveLight from './img/live.png';
import liveDark from './img/live-dark.png';

import summitData from './data';
import { useCommon } from '@/stores/common';
import { windowOpen } from '@/shared/utils';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);

const goCollectPage = (link: string) => {
  windowOpen(link, '_blank');
};
</script>
<template>
  <div class="summit-2023">
    <SummitBanner />

    <AppContent :mobile-top="40">
      <div class="summit-intro">
        <p v-for="item in summitData.details" :key="item">{{ item }}</p>
      </div>

      <div class="previous">
        <div class="previous-title">
          <h3>{{ summitData.previous.title }}</h3>
          <img :src="liveImg" alt="live" />
        </div>
        <div class="link-box">
          <p v-for="item in summitData.previous.content" :key="item.link">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">{{
              item.title
            }}</a>
          </p>
        </div>
      </div>
    </AppContent>
  </div>
</template>
<style lang="scss" scoped>
.summit-intro {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: var(--o-font-size-h6);
  line-height: var(--o-line-height-h5);
  color: var(--o-color-text1);
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    gap: 4px;
  }
}

@mixin floor-box {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
}
.previous {
  @include floor-box();
  .previous-title {
    display: flex;
    h3 {
      font-size: 26px;
      line-height: 30px;
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-text);
        margin-right: var(--o-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: 36px;
    width: 100%;
    @media screen and (max-width: 768px) {
      width: 100%;
      margin-top: var(--o-spacing-h4);
    }
    p {
      & ~ p {
        margin-top: var(--o-spacing-h4);
      }
      a {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
        & + a {
          margin-top: var(--o-spacing-h4);
          @media screen and (max-width: 768px) {
            margin-top: var(--o-spacing-h8);
          }
        }
      }
    }
  }
}
</style>
