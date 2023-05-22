<script setup lang="ts">
import { onMounted } from 'vue';
import AOS from 'aos';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

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
  <div class="banner">
    <div
      class="summit-banner-pc summit-banner"
      :style="{ backgroundImage: `url(${bannerData.img_pc})` }"
    ></div>
    <div
      class="summit-banner-mo summit-banner"
      :style="{ backgroundImage: `url(${bannerData.img_mo})` }"
    ></div>
    <div data-aos="fade-down" class="banner-text">
      <h2>{{ bannerData.slogan }}</h2>
      <h3>{{ bannerData.title }}</h3>
      <h4>{{ bannerData.subtitle }}</h4>
      <a :href="bannerData.btnLink" class="btn-box" target="_blank">
        <OButton animation type="outline" class="apply-btn" size="middle">
          {{ bannerData.btn }}
          <template #suffixIcon>
            <OIcon><IconArrowRight /></OIcon>
          </template>
        </OButton>
      </a>
    </div>
  </div>
</template>
<style scoped lang="scss">
.dark .banner {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
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
    .img-box {
      max-width: 1504px;
      height: 100%;
      margin: 0 auto;
      padding-top: 50px;
      img {
        max-width: 548px;
        display: block;
      }
      a {
        display: inline-block;
        margin-left: 40px;
        .banner-btn {
          color: #fff;
          border: 1px solid #fff;
          @media (max-width: 768px) {
            padding: 6px 16px;
            margin-top: 21px;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            .o-icon {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }

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
    .img-box {
      margin: 0 auto;
      max-width: 250px;
      height: 360px;
      display: flex;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        position: absolute;
        bottom: 16px;
      }
      a {
        display: inline-block;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        .banner-btn {
          color: #fff;
          border: 1px solid #fff;
          @media (max-width: 768px) {
            padding: 6px 16px;
            margin-top: 21px;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            .o-icon {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }

  .banner-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    padding: 0 44px;
    max-width: 1504px;
    @media (max-width: 767px) {
      text-align: center;
      padding: 0;
    }
    h2 {
      font-size: var(--o-font-size-h2);
      font-weight: 600;
      line-height: var(--o-line-height-h2);
      @media (max-width: 767px) {
        font-size: 32px;
        line-height: 32px;
      }
    }
    h3 {
      margin-top: var(--o-spacing-h8);
      font-size: 30px;
      line-height: 40px;
      font-weight: normal;
      @media (max-width: 767px) {
        margin-top: 8px;
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
      }
    }
    h4 {
      margin-top: var(--o-spacing-h5);
      font-size: var(--o-font-size-h5);
      line-height: 40px;
      font-weight: normal;
      @media (max-width: 767px) {
        margin-top: 6px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-h8);
      }
    }
    .btn-box {
      display: inline-block;
      margin-top: var(--o-spacing-h5);
      .apply-btn {
        color: black;
        border-color: black;
        @media (max-width: 767px) {
          padding: 6px 16px;
          font-size: 12px;
          line-height: 18px;
          :deep(.suffix-icon) {
            font-size: 12px;
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
