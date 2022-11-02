<script lang="ts" setup>
import { useI18n } from '@/i18n';
import AppContent from '@/components/AppContent.vue';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import ExploreBg from '@/assets/category/home/explore-bg.png';

const i18n = useI18n();

const handleGo = (path: string) => {
  window.open(path, '_blank');
};
</script>

<template>
  <div
    class="home-explore"
    :style="`background:url(${ExploreBg}) no-repeat top center/cover;`"
  >
    <AppContent>
      <h3>{{ i18n.home.HOME_EXPLORE.EXPLORE_TITLE }}</h3>
      <div class="home-explore-action">
        <OButton
          v-for="(item, index) in i18n.home.HOME_EXPLORE.LIST"
          :key="index"
          size="small"
          animation
          class="home-explore-btn"
          @click="handleGo(item.PATH)"
        >
          {{ item.NAME }}
          <template #suffixIcon>
            <IconArrowRight class="icon"></IconArrowRight>
          </template>
        </OButton>
      </div>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
$explore-color: #fff;
.home-explore {
  height: 300px;
  h3 {
    text-align: center;
    font-size: var(--o-font-size-h3);
    color: #fff;
    line-height: var(--o-line-height-h3);
    @media screen and (max-width: 760px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .home-explore-action {
    display: flex;
    justify-content: center;
    gap: var(--o-spacing-h1);
    margin-top: var(--o-spacing-h2);
    @media screen and (max-width: 760px) {
      gap: var(--o-spacing-h4);
      flex-direction: column;
      max-width: 80%;
      margin: var(--o-spacing-h4) auto 0;
    }
  }
  .home-explore-btn {
    border-color: $explore-color !important;
    color: $explore-color !important;
    .icon {
      color: $explore-color;
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
    }
    @media screen and (max-width: 760px) {
      justify-content: center;
    }
  }
}
</style>
