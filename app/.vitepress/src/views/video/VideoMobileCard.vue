<script lang="ts" setup>
defineProps({
  // 封面图
  cover: {
    type: String,
    default: '',
  },
  // 封面标题
  coverTitle: {
    type: String,
    default: '',
  },
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 跳转链接
  href: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <OCard class="video-item">
    <a :href="href" target="_blank" rel="noopener noreferrer">
      <div class="video-item-link">
        <div class="cover" :style="`background:url(${cover}) no-repeat center/cover`">
          <p class="title">{{ coverTitle }}</p>
        </div>
        <p class="caption">{{ title }}</p>
      </div>
    </a>
  </OCard>
</template>

<style lang="scss" scoped>
.video-item {
  :deep(.el-card__body) {
    padding: 0;
  }

  &-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;

    .cover {
      height: 98px;
      display: flex;
      align-items: center;
      padding: var(--e-spacing-h5) var(--e-spacing-h5) var(--e-spacing-h5) var(--e-spacing-h6);

      .title {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
        color: #fff;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }

    .caption {
      padding: var(--e-spacing-h5) var(--e-spacing-h6);
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      color: var(--e-color-text1);
      box-sizing: content-box;
    }
  }
}

.video-item:not(:last-child) {
  margin-bottom: var(--e-spacing-h5);
}
</style>
