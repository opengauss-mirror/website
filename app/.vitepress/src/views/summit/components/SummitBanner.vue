<script lang="ts" setup>
import { ref, computed } from 'vue';
// import { useRouter } from 'vitepress';
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

// const router = useRouter();
const bannerInfo = computed(() => {
  return {
    banner:
      screenWidth.value > 768 ? props.banner.pc_banner : props.banner.mo_banner,
    text: screenWidth.value > 768 ? props.banner.pc_text : props.banner.mo_text,
    text2:
      screenWidth.value > 768 ? props.banner.pc_text2 : props.banner.mo_text2,
    ill: screenWidth.value > 768 ? props.banner.pc_ill : props.banner.mo_ill,
  };
});
function clickButton(link: string) {
  (document.getElementById(link) as HTMLElement).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
</script>

<template>
  <div
    class="summit-banner"
    :style="`background-image:url(${bannerInfo.banner}) ;`"
  >
    <div class="inner">
      <div>
        <img
          v-if="bannerInfo.text"
          class="cover"
          :src="bannerInfo.text"
          alt=""
        />
        <img
          v-if="bannerInfo.text2"
          class="cover2"
          :src="bannerInfo.text2"
          alt=""
        />
        <img v-if="bannerInfo.ill" class="ill" :src="bannerInfo.ill" alt="" />
        <template v-if="banner.link !== ''">
          <OButton
            type="primary"
            size="small"
            animation
            class="banner-btn"
            @click="clickButton(banner.link)"
          >
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
