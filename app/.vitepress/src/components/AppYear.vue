<script setup lang="ts">
import { ref } from 'vue';
import gaussYear from '@/assets/category/year/gauss-year.png';
import { GAUSS_YEAR } from '@/data/url-config';
const isShow = ref(true);
function closeYear() {
  isShow.value = false;
}
</script>
<template>
  <div v-show="isShow" class="gauss-year">
    <div class="close-year" @click="closeYear"></div>
    <a
      class="year-link"
      :href="GAUSS_YEAR"
      rel="noopener noreferrer"
      target="_blank"
    ></a>
    <img :src="gaussYear" alt="" />
  </div>
</template>
<style lang="scss" scoped>
.gauss-year {
  position: fixed;
  left: 44px;
  bottom: 164px;
  z-index: 12;
  @media (max-width: 1439px) {
    left: 24px;
  }
  @media (max-width: 1100px) {
    left: 16px;
  }
  .year-link {
    position: absolute;
    width: 100%;
    height: calc(100% - 20px);
    bottom: 0;
    @media screen and (max-width: 1200px) {
      height: calc(100% - 16px);
    }
  }
  .close-year {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: -2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    @media screen and (max-width: 1200px) {
      width: 16px;
      height: 16px;
      right: 12px;
    }
  }
  img {
    width: 180px;
    @media screen and (max-width: 1200px) {
      width: 120px;
    }
  }
}
</style>
