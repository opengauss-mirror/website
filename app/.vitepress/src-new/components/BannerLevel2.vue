<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, CSSProperties } from 'vue';

const props = defineProps<{
  backgroundImage: string,
  imageAlt?: string,
  backgroundColor?: string;
  title?: string;
  description?: string;
  /** @deprecated 替换为 description*/
  subtitle?: string;
  hideDescription?: boolean,
  /** 右边的额外图片 */
  illustration?: string;
}>();

const { description: defaultDesc, frontmatter } = useData();

const rootStyle = computed(() => {
  const result: CSSProperties = {};
  if (props.backgroundColor) {
    result.backgroundColor = props.backgroundColor;
  }
  return result;
});

const bannerDesc = computed(() => props.description || props.subtitle || defaultDesc.value);
</script>

<template>
  <div class="banner-level2" :style="rootStyle">
    <img v-if="backgroundImage" :src="backgroundImage" class="banner-bg" :alt="imageAlt ?? ''" />
    <div class="wrap">
      <div class="banner-text">
        <h1 class="banner-title">{{ title || frontmatter.title }}</h1>
        <div v-if="$slots.default" class="banner-operation">
          <slot></slot>
        </div>
        <p v-else-if="!hideDescription" class="banner-subtitle">
          {{ bannerDesc }}
        </p>
      </div>
      <div v-if="illustration" class="banner-illustration">
        <img :src="illustration" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dark {
  .banner-bg,
  .banner-illustration {
    filter: brightness(0.8) grayscale(0.2) contrast(1.2);
  }
}
.banner-level2 {
  position: relative;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;

  .banner-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    user-select: none;
  }

  .wrap {
    width: var(--o-r-grid-section-width);
    position: relative;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 280px;

    @include respond('<=pad') {
      height: 220px;
    }
    @include respond('<=pad_v') {
      padding: 16px 0;
      height: auto;
    }
    .banner-text {
      display: flex;
      flex-direction: column;
      position: relative;
      max-width: 60%;

      .banner-text-bg {
        position: absolute;
        top: 0;
        color: var(--o-color-white);
        opacity: 0.14;
        @include display1;
        font-weight: bold;
        user-select: none;
      }
      .banner-title {
        position: relative;
        z-index: 1;
        color: var(--o-color-info1);
        margin-bottom: 0;
        font-weight: 500;
        @include display2;
        @include respond('<=pad_v') {
          font-size: 22px;
        }
      }

      .banner-subtitle {
        position: relative;
        margin-top: 8px;
        @include text2;
        color: var(--o-color-info2);
        z-index: 1;
      }

      .banner-operation {
        margin-top: 8px;
        @include text2;
      }
    }
    .banner-illustration {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 44px;
      object-fit: fill;
      @include respond('laptop_s') {
        right: 16px;
      }
      img {
        user-select: none;
        max-height: 232px;
        @include respond('pad_h') {
          max-height: 160px;
        }
        @include respond('phone') {
          max-height: 94px;
        }
      }
    }
  }

  @include respond('<=pad_v') {
    background-color: transparent;
    .banner-bg {
      display: none;
    }

    .wrap .banner-text {
      max-width: 100%;
    }
  }
}
</style>
