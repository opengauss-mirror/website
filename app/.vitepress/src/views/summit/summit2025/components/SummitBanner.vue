<script setup lang="ts">
import { OButton } from '@opensig/opendesign';

defineProps<{
  bannerData: {
    bg: string;
    bgMo: string;
    textImg?: string;
  };
}>();

const goRegister = () => {
  window.open('https://e-campaign.huawei.com/t/fe2aIr', '_blank', 'noopener');
};
</script>
<template>
  <div class="summit-banner">
    <img class="banner-img pc" :src="bannerData.bg" alt="" />
    <img class="banner-img mo" :src="bannerData.bgMo" alt="" />
    <div class="inner" data-o-theme="dark">
      <div>
        <img v-if="bannerData.textImg" class="cover" :src="bannerData.textImg" alt="" />
        <OButton size="large" round="pill" color="primary" variant="solid" @click="goRegister">立即报名</OButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summit-banner {
  height: 380px;
  position: relative;
  .banner-img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
    height: 100%;
    width: 100%;
    &.pc {
      display: block;
      @include respond-to('phone') {
        display: none;
      }
    }
    &.mo {
      display: none;
      @include respond-to('phone') {
        display: block;
      }
    }
  }
  .inner {
    width: var(--grid-content-width);
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    color: var(--o-color-info1);
    @include respond-to('phone') {
      display: none;
    }
    .o-btn {
      margin-top: 24px;
      --btn-bg-color: var(--o-color-primary2);
      --btn-bd-color: var(--o-color-primary2);
      --btn-bg-color-hover: var(--o-color-primary1);
      @include respond-to('<=pad_v') {
        display: none;
      }
    }
    .cover {
      object-fit: cover;
      height: 201px;
      display: block;
      // @media (max-width: 767px) {
      //   width: inherit;
      //   height: 92px;
      //   margin-bottom: 40px;
      // }
    }
    @media (max-width: 767px) {
      justify-content: center;
      text-align: center;
      align-items: flex-end;
    }
  }
  @media (max-width: 767px) {
    height: 320px;
  }
}
@include in-dark {
  .summit-banner {
    @include img-in-dark;
  }
}
</style>
