<script lang="ts" setup>
defineProps({
  partnerData: {
    type: Object,
    required: true,
    default: () => {
      return {
        title: '',
        content: [],
      };
    },
  },
});
</script>

<template>
  <div class="summit-partner">
    <div class="title-box">
      <p class="title">{{ partnerData.title }}</p>
    </div>
    <div class="partner">
      <div v-for="item in partnerData.content" :key="item.title" class="content-item">
        <h4 class="item-title">{{ item.title }}</h4>
        <div class="item-name">
          <p class="item-name-text" v-for="itemName in item.name.split('\n')" :key="itemName">
            {{ itemName }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summit-partner {
  margin-top: 44px;
  @media (max-width: 767px) {
    margin-top: 31px;
  }
}
.partner {
  background-color: var(--e-color-bg2);
  margin-top: var(--e-spacing-h2);
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h4);
  }
  .content-item {
    padding: 24px;
    @media screen and (max-width: 1100px) {
      padding: 6px 16px;
    }
    & + .content-item {
      border-top: 1px solid var(--e-color-border2);
    }
    .item-title {
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height-h7);
      color: var(--e-color-text1);
      font-weight: 500;
      @media screen and (max-width: 1100px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
    }
    .item-name {
      margin-top: var(--e-spacing-h8);
      @media screen and (max-width: 1100px) {
        margin-top: var(--e-spacing-h10);
      }
      .item-name-text {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        color: var(--e-color-text1);
        font-weight: 400;
        @media screen and (max-width: 1100px) {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
      }
    }
  }
}
</style>
