<script lang="ts" setup>
import { ref, computed, toRefs, watch } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

import IconChevronDown from '~icons/app/icon-chevron-down.svg';
import IconChevronUp from '~icons/app/icon-chevron-up.svg';

const props = defineProps({
  navItems: {
    type: Object,
    default() {
      return {};
    },
  },
  isToggle: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const i18n = useI18n();
const { navItems, isToggle } = toRefs(props);
const { lang } = useData();
const isZh = computed(() => (lang.value === 'zh' ? true : false));

const len = ref(4);
const isAll = ref(false);
const clickToggle = () => {
  isAll.value = !isAll.value;
};
const videoLen = computed(() => {
  return isAll.value ? 10000 : 4;
});

const dataList = computed(() => {
  return isZh.value ? navItems.value.data.zh : navItems.value.data.en;
});

watch(
  () => isToggle.value,
  () => {
    isAll.value = isToggle.value;
  },
  { immediate: true }
);
const emits = defineEmits(['video-click']);
const handlerVideo = (id: number, index: number) => {
  emits('video-click', id, index);
};
</script>

<template>
  <div class="video-list">
    <h2 class="video-title">{{ isZh ? navItems.name : navItems.nameEn }}</h2>
    <div class="news-panel-content">
      <template v-for="(list, index) in dataList" :key="list.id">
        <OCard
          v-if="Number(index) < videoLen"
          class="video-item shadow"
          data-aos="fade-up"
          shadow="hover"
        >
          <div
            class="video-item-link"
            @click="handlerVideo(navItems.id, index)"
          >
            <div
              class="cover"
              :style="`background:url(${navItems.poster}) no-repeat center/cover`"
            >
              <p class="title">{{ list.title }}</p>
            </div>
            <p class="caption">{{ list.title }}</p>
          </div>
        </OCard>
      </template>
    </div>
    <p v-if="dataList.length > len" class="tc">
      <OButton type="text" size="small" animation @click="clickToggle">
        {{ isAll ? i18n.connect.COLLAPSE : i18n.connect.VIEW_MORE }}
        <template #suffixIcon>
          <IconChevronUp v-if="isAll" /><IconChevronDown v-else />
        </template>
      </OButton>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.dark .cover {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.el-card {
  border: 0 none;
  border-radius: 0;
}
.news-panel-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.video-list {
  margin-top: var(--o-spacing-h1);
}
.tc {
  text-align: center;
  margin-top: 20px;
}

.video-title {
  text-align: center;
  font-size: var(--o-font-size-h3);
  line-height: var(--o-line-height-h3);
  margin-bottom: var(--o-spacing-h2);
  color: var(--o-color-text1);
  font-weight: 300;
}
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
      height: 136px;
      display: flex;
      align-items: center;
      padding: var(--o-spacing-h5);
      .title {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        color: #fff;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }

    .caption {
      padding: var(--o-spacing-h4);
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      font-weight: 300;
      color: var(--o-color-text1);
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
