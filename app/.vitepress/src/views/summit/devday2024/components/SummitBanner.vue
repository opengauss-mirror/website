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
  <a :href="bannerData.signUpHref" target="_blank" rel="noopener noreferrer">
    <div class="banner">
      <div
        class="summit-banner-pc summit-banner"
        :style="{ backgroundImage: `url(${bannerData.bg})` }"
      ></div>
      <div
        class="summit-banner-mo summit-banner"
        :style="{ backgroundImage: `url(${bannerData.bgMo})` }"
      ></div>
    </div>
  </a>
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
    background-size: auto 100%;
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
}
</style>
