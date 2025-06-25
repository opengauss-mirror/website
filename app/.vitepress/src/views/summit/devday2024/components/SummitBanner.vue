<script setup lang="ts">
defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});
</script>
<template>
  <div class="banner">
    <div class="summit-banner-pc summit-banner" :style="{ backgroundImage: `url(${bannerData.bg})` }"></div>
    <div class="summit-banner-mo summit-banner" :style="{ backgroundImage: `url(${bannerData.bgMo})` }"></div>
    <div class="banner-main">
      <div class="banner-text">
        <h2>{{ bannerData.slogan }}</h2>
        <h3>{{ bannerData.title }}</h3>
        <h4>{{ bannerData.subtitle }}</h4>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@include in-dark {
  .banner {
    filter: brightness(80%) grayscale(20%) contrast(1.2);
  }
}
.banner {
  width: 100%;
  height: 380px;
  position: relative;
  @media (max-width: 767px) {
    height: auto;
  }
  .summit-banner {
    height: 100%;
    margin: 0 auto;
    background: no-repeat center/cover;
  }
  .summit-banner-pc {
    @media (max-width: 768px) {
      display: none;
    }
  }
  .summit-banner-mo {
    display: none;
    height: 300px;
    @media (max-width: 768px) {
      width: 100%;
      display: block;
    }
  }

  .banner-main {
    position: absolute;
    width: 100%;
    max-width: 1416px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    @media (max-width: 1439px) {
      padding: 0 24px;
    }
    @media (max-width: 1100px) {
      padding: 0 16px;
    }
  }
  .banner-text {
    width: 970px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    @media (max-width: 767px) {
      width: 100%;
    }
    h2 {
      font-size: 48px;
      font-weight: 500;
      line-height: 46px;
      @media (max-width: 767px) {
        font-size: 22px;
        line-height: 32px;
      }
    }
    h3 {
      margin-top: var(--e-spacing-h8);
      font-size: var(--e-font-size-h4);
      line-height: var(--e-line-height-h4);
      font-weight: normal;
      @media (max-width: 767px) {
        margin-top: var(--e-spacing-h10);
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
    }
    h4 {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
      font-weight: normal;
      margin-top: 20px;
      @media (max-width: 767px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        margin-top: var(--e-spacing-h10);
      }
    }
  }
  a {
    margin-top: var(--e-spacing-h4);
  }
  .home-banner-btnimport {
    --o-button-padding: 11px 19px 11px 27px;
    --o-color-brand1: var(--e-color-text1);
    --o-color-brand2: var(--e-color-text1);
  }
  @media (max-width: 767px) {
    .banner-text {
      justify-content: flex-end;
      padding-bottom: var(--e-spacing-h5);
    }
    a {
      margin-top: var(--e-spacing-h6);
    }
    .home-banner-btnimport {
      --o-button-padding: 6px 10px;
      --o-button-font-size: var(--e-font-size-tip);
      --o-button-line-height: var(--e-line-height-tip);
      --o-button-icon-font-size: var(--e-font-size-h8);
    }
  }
}
</style>
