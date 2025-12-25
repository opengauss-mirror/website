<script lang="ts" setup>
import { computed } from 'vue';
import { useCommon } from '@/stores/common';
import floorImg from '../img/floor-img.png';

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

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>

<template>
  <div class="summit-partner">
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ partnerData.titleBg }}</p>
      <p class="title">{{ partnerData.title }}</p>
      <img class="floor-img" :src="floorImg" alt="" />
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
  padding: 24px 32px;
  .content-item {
    padding: 16px 8px;
    & + .content-item {
      border-top: 1px solid var(--e-color-border2);
    }
    .item-title {
      color: var(--o-color-info1);
      font-weight: 500;
      @include h3;
    }
    .item-name {
      margin-top: var(--e-spacing-h8);
      .item-name-text {
        font-weight: 400;
        color: var(--o-color-info3);
        @include text2;
      }
    }
  }
}

@include respond-to('<=pad') {
  .partner {
    padding: 16px 24px;
    margin-top: 24px;
  }
}
@include respond-to('<=pad_v') {
  .partner {
    padding: 10px 16px;
    margin-top: 16px;
    .content-item {
      padding: 6px 0;
      .item-title {
        @include text2;
      }
      .item-name {
        margin-top: 4px;
        .item-name-text {
          @include text1;
        }
      }
    }
  }
}
</style>
