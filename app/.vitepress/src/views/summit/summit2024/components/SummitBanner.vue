<script setup lang="ts">
import { computed } from 'vue';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import useWindowResize from '@/components/hooks/useWindowResize';
import { windowOpen } from '@/shared/utils';

const props = defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const screenWidth = useWindowResize();
const isPc = computed(() => (screenWidth.value > 768 ? true : false));

const banner = computed(() =>
  isPc.value ? props.bannerData.bg : props.bannerData.bgMo
);
const bannerText = computed(() =>
  isPc.value ? props.bannerData.textImg : props.bannerData.textImgMo
);

const onButtonClick = (link: string) => {
  windowOpen(link, '_blank');
};
</script>
<template>
  <div class="summit-banner" :style="`background-image:url(${banner}) ;`">
    <div class="inner">
      <div>
        <img v-if="bannerText" class="cover" :src="bannerText" alt="" />
        <template v-if="bannerData.link">
          <OButton
            type="outline"
            animation
            class="banner-btn"
            @click="onButtonClick(bannerData.link)"
          >
            {{ bannerData.linkTitle }}
            <template #suffixIcon
              ><OIcon><IconArrowRight /></OIcon
            ></template>
          </OButton>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summit-banner {
  height: 380px;
  background: no-repeat center/cover;
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
      }
    }
    .banner-btn {
      margin: 24px 0 0;
      color: #fff;
      --o-color-brand1: #fff;
      --o-color-brand2: #fff;
      --o-color-brand3: #fff;
    }
    @media (max-width: 767px) {
      justify-content: center;
      text-align: center;
      align-items: flex-end;
    }
  }
  @media (max-width: 767px) {
    height: 320px;
    .inner {
      .banner-btn {
        margin: 10px 0 16px;
        --o-button-padding: 7px 10px;
        --o-button-font-size: var(--o-font-size-tip);
        --o-button-line-height: var(--o-line-height-tip);
        :deep(.suffix-icon) {
          --o-button-icon-font-size: var(--o-font-size-h8);
        }
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
