<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCommon } from '@/stores/common';
import AOS from 'aos';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';

import summitData from './data';

import liveLight from '@/assets/category/summit/live.png';
import liveDark from '@/assets/category/summit/live-dark.png';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);
onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
});
</script>
<template>
  <SummitBanner :banner-data="summitData.banner" />
  <AppContext>
    <div class="detail">
      <p v-for="item in summitData.detail" :key="item">{{ item }}</p>
    </div>
    <div class="collect">
      <div
        v-for="item in summitData.collect"
        :key="item.title"
        class="collect-item"
        :style="{ 'background-image': `url(${item.bgImg}) ` }"
      >
        <a :href="item.link" target="_blank">
          <div class="text">
            <p class="item-title">{{ item.title }}</p>
            <p class="item-title">{{ item.titleEn }}</p>
          </div>
        </a>
      </div>
    </div>
    <div class="previous">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <p v-for="item in summitData.previous.content" :key="item.link">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
        </p>
      </div>
    </div>
  </AppContext>
</template>
<style scoped lang="scss">
@mixin floor-box {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
}
.banner {
  width: 100%;
  .summit-banner-pc {
    height: 380px;
    margin: 0 auto;
    background: no-repeat center/cover;
  }
  .summit-banner-mo {
    display: none;
    @media screen and (max-width: 768px) {
      width: 100%;
      display: block;
      img {
        width: 100%;
      }
    }
  }
}
.detail {
  p {
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    font-weight: 400;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}
.collect {
  @include floor-box();
  display: grid;
  grid-template-columns: auto auto;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    padding: 0 12px;
    grid-template-columns: auto;
    gap: var(--o-spacing-h4);
  }

  .collect-item {
    width: 336px;
    height: 352px;
    background-size: cover;
    box-shadow: var(--o-shadow-l2);
    &:hover {
      box-shadow: var(--o-shadow-l2_hover);
    }
    @media screen and (max-width: 768px) {
      width: 100%;
      max-width: 304px;
      height: 304px;
    }
    a {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      .text {
        width: 100%;
        padding: 0 40px;
        .item-title {
          text-align: center;
          font-size: var(--o-font-size-h3);
          color: #000;
          // @media screen and (max-width: 768px) {
          //   font-size: var(--o-font-size-text);
          // }
          & + .item-title {
            margin-top: var(--o-spacing-h4);
            font-size: var(--o-font-size-h4);
            line-height: var(--o-line-height-h4);
            // @media screen and (max-width: 768px) {
            //   font-size: var(--o-font-size-text);
            // }
          }
        }
      }
    }
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
.dark .collect-item {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
</style>
