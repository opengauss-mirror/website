<script lang="ts" setup>
import { ref, computed } from 'vue';
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

const screenWidth = ref(useWindowResize());

const bannerInfo = computed(() => {
  return {
    banner:
      screenWidth.value > 768 ? props.banner.pc_banner : props.banner.mo_banner,
    text: screenWidth.value > 768 ? props.banner.pc_text : props.banner.mo_text,
  };
});
</script>

<template>
  <div
    class="summit-banner"
    :style="`background-image:url(${bannerInfo.banner}) ;`"
  >
    <div class="inner">
      <div>
        <img class="cover" :src="bannerInfo.text" alt="" />
        <template v-if="banner.link !== ''">
          <OButton type="primary" size="small" animation class="banner-btn">
            {{ banner.button }}
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
    .cover {
      object-fit: cover;
      height: 160px;
      display: block;
      @media (max-width: 767px) {
        width: inherit;
        height: 106px;
      }
    }
    .banner-btn {
      margin: 16px 0 0;
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
