<script setup lang="ts">
defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const onButtonClick = (href: string) => {
  window.open(href, '_blank');
};
</script>
<template>
  <div class="banner">
    <div class="summit-banner-pc summit-banner" :style="{ backgroundImage: `url(${bannerData.bg})` }"></div>
    <div class="summit-banner-mo summit-banner" :style="{ backgroundImage: `url(${bannerData.bgMo})` }"></div>
    <div class="banner-main">
      <img class="text-img" :src="bannerData.textImg" alt="" />
      <img class="text-img-mb" :src="bannerData.textImgMb" alt="" />
      <template v-if="bannerData.signUpHref">
        <OButton type="primary" size="small" animation class="banner-btn" @click="onButtonClick(bannerData.signUpHref)">
          {{ bannerData.signUpTitle }}
        </OButton>
      </template>
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    @media (max-width: 1439px) {
      padding: 0 24px;
    }
    @media (max-width: 1100px) {
      padding: 0 16px;
    }
    @media (max-width: 767px) {
      align-items: center;
      justify-content: flex-end;
    }
  }

  .text-img {
    height: 183px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .text-img-mb {
    display: none;
    @media (max-width: 767px) {
      height: 90px;
      display: block;
    }
  }

  .banner-btn {
    --o-button-padding-small: 8px 27px;
    border-radius: 41px;
    margin-top: var(--e-spacing-h4);
  }
  @media (max-width: 767px) {
    .banner-btn {
      --o-button-padding-small: 8px 24px;
      border-radius: 41px;
      margin-top: var(--e-spacing-h6);
      margin-bottom: 38px;
    }
  }
}
</style>
