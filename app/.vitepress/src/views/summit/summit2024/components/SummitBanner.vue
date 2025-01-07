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
  <div class="summit-banner">
    <img class="banner-img pc" :src="bannerData.bg" alt="" />
    <img class="banner-img mo" :src="bannerData.bgMo" alt="" />
    <div class="inner">
      <img
        v-if="bannerData.textImg"
        class="cover"
        :src="bannerData.textImg"
        alt=""
      />
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
      @media (max-width: 767px) {
        display: none;
      }
    }
    &.mo {
      display: none;
      @media (max-width: 767px) {
        display: block;
      }
    }
  }
  .inner {
    max-width: 1504px;
    padding: 0 44px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .cover {
      object-fit: cover;
      height: 201px;
      display: block;
      @media (max-width: 767px) {
        width: inherit;
        height: 92px;
        margin-bottom: 40px;
      }
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
