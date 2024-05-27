<script setup lang="ts">
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

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
    <div
      class="summit-banner-pc summit-banner-bg"
      :style="{ backgroundImage: `url(${bannerData.bg})` }"
    ></div>
    <div class="banner-text">
      <div class="content">
        <p class="title">{{ bannerData.title }}</p>
        <p class="subtitle">{{ bannerData.subtitle }}</p>
        <div class="btn-wrap">
          <a
            href="https://e-campaign.huawei.com/t/V7zuQb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OButton animation>
              立即报名
              <template #suffixIcon>
                <IconArrowRight></IconArrowRight>
              </template>
            </OButton>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.summit-banner {
  width: 100%;
  height: 380px;
  position: relative;
  .summit-banner-bg {
    height: 100%;
    margin: 0 auto;
    background: no-repeat center/cover;
  }
  .banner-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 1416px;
    color: var(--o-color-white);
    display: flex;
    justify-content: flex-start;
    .content {
      width: 710px;
      margin-right: -30px;
    }
    .title {
      font-size: 48px;
      line-height: 64px;
      font-weight: 500;
    }
    .subtitle {
      font-size: 18px;
      line-height: 26px;
      margin-top: 16px;
      font-weight: 400;
    }
    .btn-wrap {
      margin-top: var(--o-spacing-h4);
      .o-button {
        color: var(--o-color-white);
        font-size: var(--o-font-size-h8);
        border: 1px solid var(--o-color-white);
        svg {
          width: var(--o-font-size-h5);
          height: var(--o-font-size-h5);
        }
      }
    }
    @media screen and (max-width: 1480px) {
      .content {
        margin-right: 0;
      }
    }
  }
  @media (max-width: 767px) {
    height: 160px;
    .banner-text {
      max-width: 100%;
      color: var(--o-color-white);
      justify-content: center;
      .content {
        width: 100%;
        text-align: center;
        margin-right: 0;
      }
      .title {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
      }
      .subtitle {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        margin-top: var(--o-spacing-h5);
      }
      .btn-wrap {
        margin-top: var(--o-spacing-h7);
        .o-button {
          font-size: var(--o-font-size-text);
          padding: var(--o-spacing-h10) var(--o-spacing-h7);
          svg {
            width: var(--o-font-size-h8);
            height: var(--o-font-size-h8);
          }
        }
      }
    }
  }
}
</style>
