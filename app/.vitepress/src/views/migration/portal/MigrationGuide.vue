<script setup lang="ts">
// import { useData } from 'vitepress';
import portalInfo from '@/data/migration/migration-portal';

// import IconArrowRight from '~icons/app/icon-arrow-right.svg';

// const { lang } = useData();
// const handleGo = (path: string) => {
//   window.open('/' + lang.value + path, '_blank');
// };
</script>

<template>
  <div class="migration-guide">
    <h3>{{ portalInfo.guide.title }}</h3>
    <div class="migration-guide-content">
      <OCard>
        <ul class="content-box">
          <li v-for="item in portalInfo.guide.content" :key="item.title">
            <h5>{{ item.title }}</h5>
            <div class="list-content">
              <p v-for="itemList in item.content" :key="itemList">
                {{ itemList }}
              </p>
            </div>
          </li>
        </ul>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5) var(--o-spacing-h6);
  }
}
.migration-guide {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
  h3 {
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
  .migration-guide-content {
    margin-top: var(--o-spacing-h3);
    .content-box {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      list-style-type: none;
      @media (max-width: 1600px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
      }
      @media (max-width: 1480px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 678px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 468px) {
        grid-template-columns: repeat(1, 1fr);
      }
      li {
        background-image: url(@/assets/category/migration/portal/guide-bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        height: 216px;
        padding-top: var(--o-spacing-h4);
        @media (max-width: 468px) {
          height: auto;
          padding: var(--o-spacing-h5) 0;
        }
        h5 {
          font-size: var(--o-font-size-h5);
          line-height: var(--o-line-height-h5);
          color: black;
          text-align: center;
          margin-top: 0;
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }
        .list-content {
          padding-left: 32px;
          margin-top: var(--o-spacing-h5);
          p {
            max-width: 160px;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            margin: 0 auto;
            @media (max-width: 768px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
          }
        }
      }
    }
  }
}
.dark li {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
</style>
