<script lang="ts" setup>
import { computed } from 'vue';
import useWindowResize from '@/components/hooks/useWindowResize';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';
const props = defineProps({
  banner: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
});

const screenWidth = useWindowResize();
const isPc = computed(() => (screenWidth.value > 768 ? true : false));

const banner = computed(() =>
  isPc.value ? props.banner.banner_pc : props.banner.banner_mo
);
const bannerText = computed(() =>
  isPc.value ? props.banner.text_pc : props.banner.text_mo
);
const bannerText2 = computed(() => (isPc.value ? props.banner.text2 : null));

function clickButton(link: string) {
  (document.getElementById(link) as HTMLElement).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
</script>

<template>
  <div class="summit-banner" :style="`background-image:url(${banner}) ;`">
    <div class="inner">
      <div>
        <img v-if="bannerText" class="cover" :src="bannerText" alt="" />
        <img v-if="bannerText2" class="cover2" :src="bannerText2" alt="" />
        <img class="ill" :src="props.banner.illustration" alt="" />
        <template v-if="props.banner.link">
          <OButton
            type="primary"
            size="small"
            animation
            class="banner-btn"
            @click="clickButton(props.banner.link)"
          >
            {{ props.banner.button }}
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
      height: 140px;
      display: block;
      @media (max-width: 767px) {
        width: inherit;
        height: 106px;
      }
    }
    .cover2 {
      margin-top: 12px;
      display: block;
    }
    .ill {
      position: absolute;
      right: 44px;
      top: 50%;
      transform: translateY(-50%);
      @media (max-width: 767px) {
        display: none;
      }
    }
    .banner-btn {
      margin: 16px 0 0;
      color: #fff;
    }
    @media (max-width: 767px) {
      justify-content: center;
      text-align: center;
    }
  }
  @media (max-width: 767px) {
    height: 320px;
  }
}
</style>
