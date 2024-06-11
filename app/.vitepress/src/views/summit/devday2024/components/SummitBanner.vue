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
    <img :src="bannerData.bg" />
  </div>
</template>
<style scoped lang="scss">
.summit-banner {
  width: 100%;
  max-height: 760px;

  img {
    width: 100%;
    max-height: 760px;
    object-fit: scale-down;

    @media (max-width: 768px) {
      object-fit: cover;
      height: 120px;
    }
  }
}
</style>
