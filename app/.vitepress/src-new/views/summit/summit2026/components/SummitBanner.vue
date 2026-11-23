<script setup lang="ts">
import { OButton } from '@opensig/opendesign';
import { EVENTS01_LINK } from '~@/data/url-config';

defineProps<{
  bg: string;
  bgPad: string;
  bgMo: string;
  textAlt?: string;
  textImg?: string;
  linkTitle?: string;
}>();

// const reviewLive = () => {
//   (document.getElementById('live') as HTMLElement).scrollIntoView({
//     behavior: 'smooth',
//     block: 'start',
//   });
// };
</script>
<template>
  <div class="summit-banner">
    <img class="banner-img pc" :src="bg" alt="" />
    <img class="banner-img pad" :src="bgPad" alt="" />
    <img class="banner-img mo" :src="bgMo" alt="" />
    <div class="inner" data-o-theme="dark">
      <div>
        <img v-if="textImg" class="cover" :src="textImg" :alt="textAlt ?? ''" />
        <OButton size="large" round="pill" color="primary" variant="solid" :href="`${EVENTS01_LINK}t/bu6zim`" target="_blank">{{ linkTitle! }}</OButton>
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
    display: none;
    @include respond('>pad') {
      &.pc {
        display: block;
      }
    }
    @include respond('pad') {
      &.pad {
        display: block;
      }
    }
    @include respond('phone') {
      position: static;
      &.mo {
        display: block;
      }
    }
  }
  .inner {
    width: var(--o-r-grid-section-width);
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    color: var(--o-color-info1);
    @include respond('phone') {
      display: none;
    }
    .o-btn {
      margin-top: 24px;
      @include respond('<=pad_v') {
        display: none;
      }
    }
    .cover {
      object-fit: cover;
      height: 201px;
      display: block;
    }
  }
  @include respond('phone') {
    height: auto;
  }
}
@include in-dark {
  .summit-banner {
    @include img-in-dark;
  }
}
</style>
