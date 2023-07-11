<script setup lang="ts">
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { computed } from 'vue';
import portalInfo from '@/data/migration/migration-portal';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const commonStore = useCommon();

const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const { lang } = useData();
const handleGo = (path: string) => {
  window.open('/' + lang.value + path, '_blank');
};
</script>
<template>
  <div class="migration-advantage">
    <h2>{{ portalInfo.advantage.title }}</h2>
    <div class="migration-advantage-content">
      <OCard class="content-card">
        <div
          class="advantage-item"
          v-for="item in portalInfo.advantage.content"
        >
          <img :src="isDark ? item.imgDark : item.imgLight" />
          <p>{{ item.name }}</p>
        </div>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.migration-advantage {
  h2 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-top: 0;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin: 0;
    }
  }
  .migration-advantage-content {
    margin-top: var(--o-spacing-h3);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
    }
    .content-card {
      margin-top: var(--o-spacing-h4);

      @media screen and (max-width: 768px) {
        margin: var(--o-spacing-h5) 0 0 0;
      }
      :deep(.el-card__body) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 40px;
        @media screen and (max-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
          padding: 20px;
        }
        @media screen and (max-width: 410px) {
          grid-template-columns: repeat(1, 1fr);
        }
        .advantage-item {
          text-align: center;
          img {
            width: 64px;
          }
          p {
            margin-top: var(--o-spacing-h5);
            color: var(--o-color-text1);
            font-size: var(--o-font-size-h7);
            line-height: var(--o-line-height-h7);
          }
        }
      }
    }
  }
}
</style>
