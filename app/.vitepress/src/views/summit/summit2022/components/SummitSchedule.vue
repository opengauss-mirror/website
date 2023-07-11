<script lang="ts" setup>
import IconTime from '~icons/app/icon-time.svg';
defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<template>
  <div class="date-list">
    <div v-for="subitem in options" :key="subitem.time" class="data-item">
      <span class="time"><IconTime />{{ subitem.time }}</span>
      <span v-dompurify-html="subitem.desc" class="desc"></span>
      <div v-if="subitem.post" class="box">
        <span class="name">{{ subitem.name }} </span>
        <span class="post">{{ subitem.post }} </span>
      </div>
      <div v-else class="db">
        <div v-for="option in subitem.option" :key="option.name" class="inline">
          <span v-dompurify-html="option.name" class="name"> </span>
          <div class="post-more">
            <span v-for="sub in option.post" :key="sub" class="post"
              >{{ sub }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.data-item {
  display: grid;
  grid-template-columns: 192px 580px auto;
  border-bottom: 1px solid var(--o-color-border2);
  padding: 20px 0;
  transition: all 0.25s ease;
  align-items: center;
  min-height: 64px;

  @media screen and (max-width: 1100px) {
    grid-template-columns: 80px auto;
    padding: 6px 0;
    min-height: 36px;
  }

  &:hover {
    background-color: var(--o-color-bg4);
  }
  .box {
    display: flex;
    align-items: center;
    @media screen and (max-width: 1100px) {
      grid-column-start: 2;
      grid-column-end: 3;
      display: block;
    }
  }
  .db {
    grid-column-start: 3;
    grid-column-end: 5;
    @media screen and (max-width: 1100px) {
      margin-top: 0;
      grid-column-start: 2;
      grid-column-end: 3;
    }
    .inline {
      display: flex;
      align-items: center;
      &:nth-child(2) {
        margin-top: 12px;
        @media screen and (max-width: 1100px) {
          margin-top: 4px;
        }
      }
      @media screen and (max-width: 1100px) {
        display: block;
      }
    }
  }
  .desc {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text1);
    display: inline-block;
    margin-right: 36px;
    @media (max-width: 1100px) {
      margin-right: 0;
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .name {
    width: 100px;
    display: inline-block;
    color: var(--o-color-text4);
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .post {
    width: 100%;
    display: inline-block;
    color: var(--o-color-text4);
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    flex: 1;
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .post-more {
    flex: 1;
    @media screen and (max-width: 1100px) {
      width: 100%;
    }
  }
  .time {
    width: 192px;
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text4);
    display: flex;
    align-items: center;
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      width: 80px;
    }
    svg {
      width: 18px;
      height: 18px;
      color: var(--o-color-text4);
      margin-right: 6px;
      @media screen and (max-width: 1100px) {
        display: none;
      }
    }
  }
  .info .desc {
    width: 460px;
    margin-right: 40px;
    display: inline-block;
  }
}

.date-list .sub-container .data-item {
  grid-template-columns: 192px auto 96px 410px;
}
</style>
