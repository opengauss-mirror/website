<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useData, useRouter } from 'vitepress';

import BigShotData from '@/data/bigshot';
import AppContent from '@/components/AppContent.vue';
import TagFilter from '@/components/TagFilter.vue';
import VideoCard from './VideoCard.vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/blog.png';

const i18n = useI18n();
const router = useRouter();
const { lang } = useData();

const isZh = computed(() => (lang.value === 'zh' ? true : false));

const activeIndex = ref(0);
const isToggle = ref(false);
const selectTag = (i: number) => {
  activeIndex.value = i;

  isToggle.value = i !== 0 ? true : false;
};

const getData = computed(() =>
  activeIndex.value === 0
    ? BigShotData
    : BigShotData.filter((el) => el.id === activeIndex.value)
);

const handlerVideoDetail = (pid: number, id: number, index: number) => {
  router.go(`/${lang.value}/bigshot-voice/detail/?id=${pid}-${id}-${index}`);
};

// 移动端交互
const nameStr = (v: string) => {
  if (v.includes('\n')) {
    return v.replace('\n', '<br />');
  } else {
    return v;
  }
};

const activeName = computed(() => {
  return getData.value[0].data[0].title;
});
const activeMobile = ref(activeName.value);
</script>

<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.bigshot.title"
    :illustration="illustration"
  />
  <AppContent>
    <div class="video-pc">
      <OCard class="tag-box">
        <TagFilter label="时间">
          <OTag
            :type="activeIndex === 0 ? 'primary' : 'text'"
            checkable
            @click="selectTag(0)"
            >{{ i18n.common.ALL }}</OTag
          >
          <OTag
            v-for="item in BigShotData"
            :key="item.id"
            checkable
            :type="activeIndex === item.id ? 'primary' : 'text'"
            @click="selectTag(item.id)"
          >
            {{ item.year }}
          </OTag>
        </TagFilter>
      </OCard>
      <div class="pc">
        <VideoCard
          v-for="item in getData"
          :key="item.id"
          :nav-items="item.data"
          :is-toggle="isToggle"
          :pid="item.id"
          @click="handlerVideoDetail"
        >
        </VideoCard>
      </div>
    </div>
    <!-- 移动端 -->
    <div v-for="list in getData" :key="list.id" class="video-mobile">
      <h2>{{ list.year }}</h2>
      <OCollapse v-model="activeMobile" accordion>
        <OCollapseItem
          v-for="(item, index) in list.data"
          :key="item.title"
          :name="item.title"
          class="video-mobile-card"
        >
          <template #title>
            <p class="caption">{{ item.title }}</p>
          </template>
          <div class="video-mobile-box">
            <template v-for="(subitem, sindex) in item.list" :key="subitem.id">
              <OCard class="video-item">
                <div
                  class="video-item-link"
                  @click="handlerVideoDetail(list.id, index, sindex)"
                >
                  <div
                    class="cover"
                    :style="`background:url(${item.poster}) no-repeat center/cover`"
                  >
                    <p class="title">{{ subitem.desc }}</p>
                  </div>
                  <p
                    v-dompurify-html="nameStr(subitem.name)"
                    class="caption"
                  ></p>
                </div>
              </OCard>
            </template>
          </div>
        </OCollapseItem>
      </OCollapse>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
@include in-dark {
  .cover {
    @include img-in-dark;
  }
}
.tag-box {
  :deep(.el-card__body) {
    padding-top: 0;
    padding-bottom: 0;
  }
}
.video-pc {
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.video-mobile {
  display: none;
  h2 {
    font-size: var(--o-font-size-h4);
    line-height: var(--o-line-height-h4);
    font-weight: 500;
    color: var(--o-color-text1);
    text-align: center;
    margin: var(--o-spacing-h2) 0 var(--o-spacing-h4);
  }
  .o-collapse {
    :deep(.el-collapse-item__content) {
      padding: var(--o-spacing-h5);
    }
    .caption {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
  @media screen and (max-width: 1100px) {
    display: block;
  }
}
.video-item {
  &:not(:last-child) {
    margin-bottom: var(--o-spacing-h5);
  }

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
      padding: var(--o-spacing-h5);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      font-weight: 300;
      color: var(--o-color-text1);
      box-sizing: content-box;
    }
  }
}
</style>
