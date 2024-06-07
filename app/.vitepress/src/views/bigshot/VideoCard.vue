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
  pid: {
    type: Number,
    default() {
      return 1;
    },
  },
});

const i18n = useI18n();
const { navItems, isToggle, pid } = toRefs(props);
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

const nameStr = (v: string) => {
  if (v.includes('\n')) {
    return v.replace('\n', '<br />');
  } else {
    return v;
  }
};

watch(
  () => isToggle.value,
  () => {
    isAll.value = isToggle.value;
  },
  { immediate: true }
);
const emits = defineEmits(['click']);
const handleClick = (id: number, index: number) => {
  emits('click', pid.value, id, index);
};
</script>

<template>
  <div v-for="(item, idx) in navItems" :key="item.title" class="video-list">
    <h2 class="video-title">{{ item.title }}</h2>
    <div
      class="news-panel-content"
      :class="item.list.length > 2 ? 'max' : 'min'"
    >
      <template v-for="(list, index) in item.list" :key="list.name">
        <OCard
          v-if="Number(index) < videoLen"
          class="video-item shadow"
          shadow="hover"
        >
          <div class="video-item-link" @click="handleClick(Number(idx), index)">
            <div
              class="cover"
              :style="`background:url(${item.poster}) no-repeat center/cover`"
            >
              <p class="title">{{ list.desc }}</p>
            </div>
            <p v-dompurify-html="nameStr(list.name)" class="caption"></p>
          </div>
        </OCard>
      </template>
    </div>
    <p v-if="item.list.length > len" class="tc">
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
  gap: 24px;
  &.min {
    display: flex;
    justify-content: center;
    .el-card {
      width: 280px;
    }
  }
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
  .video-item-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    .cover {
      height: 136px;
      align-items: center;
      padding: var(--o-spacing-h5);
      display: flex;
      .title {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        color: #fff;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
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
