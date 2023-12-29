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
  left: 80px;
  bottom: 190px;
  z-index: 99;
  @media (max-width: 1700px) {
    left: 20px;
  }
  @media (max-width: 1560px) {
    left: 2px;
  }
  @media (max-width: 1526px) {
    left: 44px;
  }
  @media (max-width: 1439px) {
    left: 24px;
  }
  @media (max-width: 1100px) {
    left: 16px;
  }
  .year-link {
    position: absolute;
    width: 100%;
    height: calc(100% - 22px);
    bottom: 0;
    @media (max-width: 1100px) {
        height: calc(100% - 16px);
    }
  }
  .close-year {
    cursor: pointer;
    position: absolute;
    right: 4px;
    top: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    @media (max-width: 1100px) {
      width: 8px;
      height: 8px;
      right: 3px;
      top: 1px;
    }
  }
  img {
    width: 180px;
    @media (max-width: 1100px) {
      width: 80px;
    }
  }
}
</style>
