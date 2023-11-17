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

      <div class="collects">
        <div
          v-for="item in summitData.collects"
          :key="item.link"
          class="collects-item"
          @click="goCollectPage(item.link)"
        >
          <div class="item-top">
            <p v-for="title in item.title" :key="title">{{ title }}</p>
          </div>

          <div class="item-bottom">
            <p v-for="titleEn in item.titleEN" :key="titleEn">
              {{ titleEn }}
            </p>
          </div>
        </div>
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

.collects {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .collects-item {
    padding: 64px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-image: url('./img/card-bg.png');
    background-size: cover;
    background-position: center;
    text-align: center;
    cursor: pointer;
    height: 432px;
    @media screen and (max-width: 820px) {
      height: 388px;
    }
    @media screen and (max-width: 767px) {
      padding: 40px 0;
      width: 100%;
      max-height: 312px;
    }
    .item-top {
      font-size: 48px;
      line-height: 64px;
      color: #ffffff;
      @media screen and (max-width: 768px) {
        font-size: 40px;
        line-height: 56px;
      }
    }
    .item-bottom {
      font-size: 32px;
      line-height: 48px;
      color: #ffffff;
    }
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
