<script setup lang="ts">
import summitData from '../data';
</script>
<template>
  <div class="summit-banner">
    <div class="summit-banner-pc">
      <video
        muted
        playsinline="true"
        autoplay="true"
        height="380"
        loop
        webkit-playsinline="true"
        x5-playsinline="true"
        mtt-playsinline="true"
        :poster="summitData.banner.bannerBg"
        preload=""
      >
        <source type="video/mp4" :src="summitData.banner.bannerMp4" />
      </video>
    </div>
    <div class="summit-banner-mo">
      <img :src="summitData.banner.slogan" alt="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.summit-banner {
  height: 380px;
  width: 100%;
  position: relative;
  @media screen and (max-width: 768px) {
    height: 300px;
  }
  .summit-banner-pc {
    height: 100%;
    margin: 0 auto;
    background: no-repeat center/cover;
    video {
      width: 100%;
      @media screen and (max-width: 1920px) {
        object-fit: cover;
      }
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .summit-banner-mo {
    display: none;
    @media screen and (max-width: 768px) {
      width: 100%;
      height: 100%;
      display: block;
      background-image: url(../img/banner-mo.png);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      img {
        width: 247px;
        position: absolute;
        bottom: 8%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
@include in-dark {
  .summit-banner {
    @include img-in-dark;
  }
}
</style>
