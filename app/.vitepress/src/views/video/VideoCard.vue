<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';

import IconChevronDown from '~icons/app/icon-chevron-down.svg';
import IconChevronUp from '~icons/app/icon-chevron-up.svg';
import { PropType } from 'vue';

interface DataSource {
  id: string;
  name: string;
  poster: string;
  displayCount: number;
  data: Array<{
    title: string;
    author: string;
    videoUrl: string;
  }>;
}

const props = defineProps({
  dataSource: {
    type: Object as PropType<DataSource>,
    default() {
      return {};
    },
  },
  isToggle: {
    type: Boolean,
    default: false,
  },
});

const i18n = useI18n();
const viewAll = ref(props.isToggle);
const displayData = computed(() => {
  return viewAll.value ? props.dataSource.data : props.dataSource.data.slice(0, props.dataSource.displayCount);
});
</script>

<template>
  <div class="video-list">
    <!-- title -->
    <h2 class="video-title" :id="dataSource.id">
      {{ dataSource.name }}
    </h2>
    <!-- card -->
    <div class="news-panel-content">
      <OCard v-for="item in displayData" :key="item.title" class="video-item shadow" shadow="hover">
        <a :href="item.videoUrl" target="_blank" rel="noopener noreferrer">
          <div class="video-item-link">
            <div class="cover" :style="`background:url(${dataSource.poster}) no-repeat center/cover`">
              <p class="title">{{ item.title }}</p>
            </div>
            <p class="caption">{{ item.title }}</p>
          </div>
        </a>
      </OCard>
    </div>
    <!-- view all -->
    <p v-if="dataSource.data.length > dataSource.displayCount" class="tc">
      <OButton type="text" size="small" animation @click="viewAll = !viewAll">
        {{ viewAll ? i18n.connect.COLLAPSE : i18n.connect.VIEW_MORE }}
        <template #suffixIcon> <IconChevronUp v-if="viewAll" /><IconChevronDown v-else /> </template>
      </OButton>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@include in-dark {
  .cover {
    @include img-in-dark;
  }
}
.el-card {
  border: 0 none;
  border-radius: 0;
}
.news-panel-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--e-spacing-h4);
}
.video-list {
  margin-top: var(--e-spacing-h1);
}
.tc {
  text-align: center;
  margin-top: 20px;
}

.video-title {
  text-align: center;
  font-size: var(--e-font-size-h3);
  line-height: var(--e-line-height-h3);
  margin-bottom: var(--e-spacing-h4);
  color: var(--e-color-text1);
  font-weight: 300;
}
.video-item {
  :deep(.el-card__body) {
    padding: 0;
  }
  .video-item-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    .cover {
      height: 136px;
      align-items: center;
      padding: var(--e-spacing-h5);
      display: flex;
      .title {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
        color: #fff;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }

    .caption {
      padding: var(--e-spacing-h4);
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
      font-weight: 300;
      color: var(--e-color-text1);
      box-sizing: content-box;
    }
  }
}
@media (max-width: 1438px) {
  .video-item-link {
    .caption {
      padding: 16px;
      font-size: 14px;
      line-height: 20px;
    }
    .cover {
      min-height: 137px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

@media (max-width: 1100px) {
  .news-panel-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    .video-item-link .caption {
      padding: 16px;
      font-size: 14px;
    }
    .video-item-link .cover {
      min-height: 137px;
    }
  }
  .video-title {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 16px;
  }
}
@media (max-width: 468px) {
  .news-panel-content {
    grid-template-columns: auto;
  }
  .video-item-link {
    .cover {
      height: 201px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
