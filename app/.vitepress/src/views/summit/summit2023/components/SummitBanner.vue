<script setup lang="ts">
import { computed } from 'vue';
import summitData from '../data';

import useWindowResize from '@/components/hooks/useWindowResize';

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));
</script>
<template>
  <div class="summit-banner">
    <div class="banner-content">
      <img
        class="slogan"
        :src="isMobile ? summitData.banner.slogan_mo : summitData.banner.slogan"
        alt=""
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.summit-banner {
  background-image: url('../img/banner.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 380px;
  width: 100%;
  position: relative;
  @media screen and (max-width: 768px) {
    background-image: url('../img/banner-mo.png');
    height: 300px;
  }
  .banner-content {
    width: 100%;
    max-width: 1504px;
    padding: 0 44px;
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    display: flex;
    justify-content: end;
    @media screen and (max-width: 768px) {
      bottom: 28px;
      transform: translate(-50%, 0%);
      justify-content: center;
    }
  }
  .slogan {
    width: 536px;
    @media screen and (max-width: 768px) {
      width: 247px;
    }
  }
}
</style>
