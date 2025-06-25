<script setup lang="ts">
import { onMounted, Ref, ref, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import dayjs from 'dayjs';

import { useCloned } from '@vueuse/core';

import type { BlogItemT } from '@/shared/@types/type-blogs';
import type { NewsItemT } from '@/shared/@types/type-news';

import blogsAllData from '@/data/blogs';
import NewsAllData from '@/data/news';
import homeConfig from '@/data/home/';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconCalendar from '~icons/app/icon-calendar.svg';
import IconMapPin from '~icons/app/icon-map-pin.svg';
import IconTag from '~icons/app/icon-tag.svg';

const i18n = useI18n();
const { lang } = useData();

const roomName = i18n.value.home.HOME_ROOMS.ROOM_NAME;

const tabType = ref('events');
const blogList: Ref<BlogItemT[]> = ref([]);
const newsList: Ref<NewsItemT[]> = ref([]);

const blogData = computed(() => {
  return lang.value === 'zh' ? useCloned(blogsAllData.zh) : useCloned(blogsAllData.en);
});
const newsData = computed(() => {
  return lang.value === 'zh' ? useCloned(NewsAllData.zh) : useCloned(NewsAllData.en);
});
const eventsData = computed(() => {
  return lang.value === 'zh' ? homeConfig.homeEvents.zh : homeConfig.homeEvents.en;
});

const resolvePostDate = (date: any) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const filterSiteData = (datas: any[]) => {
  const newData = datas;
  const englishMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec'];
  newData.forEach((item) => {
    let date = item.date;
    date = resolvePostDate(date).split('-');
    date.forEach((arrItem: string, index: string | number) => {
      if (arrItem[0] === '0') {
        date[index] = arrItem.substring(1);
      }
    });
    date[1] = englishMonth[date[1] - 1];
    item.date = date;
  });
  return newData;
};

const initNewsData = (datas: any) => {
  newsList.value = filterSiteData(datas);
};

const initBlogData = (datas: any) => {
  blogList.value = filterSiteData(datas);
};

onMounted(async () => {
  initBlogData(Array.prototype.slice.call(blogData.value, 0, 4));
  initNewsData(Array.prototype.slice.call(newsData.value, 0, 4));
});
</script>
<template>
  <div class="home-news">
    <div class="title-list">
      <OTabs v-model="tabType">
        <OTabPane v-for="item in roomName" :key="item.ID" :label="item.NAME" :name="item.ID"></OTabPane>
      </OTabs>
    </div>
    <OContainer :level-index="1">
      <div v-if="eventsData" class="room-contain-new events" :class="{ isShow: tabType === 'events' }">
        <div class="activity-content">
          <div class="activity-content-cover" data-aos="fade-right">
            <a :href="eventsData.path" target="_blank" rel="noopener noreferrer"><img :src="eventsData.img" class="cover" alt="" /></a>
          </div>
          <div class="activity-content-box">
            <div class="box">
              <a :href="eventsData.path" class="activity-title" target="_blank" rel="noopener noreferrer">{{ eventsData.title }}</a>

              <p class="desc">{{ eventsData.summary }}</p>
              <div class="info">
                <p class="time">
                  <OIcon class="icon"><IconCalendar /></OIcon>
                  {{ eventsData.time }}
                </p>
                <p v-if="eventsData.location" class="online">
                  <OIcon class="icon"><IconMapPin /></OIcon>
                  {{ eventsData.location }}
                </p>
                <p v-if="eventsData.tags" class="tag">
                  <OIcon class="icon"><IconTag /></OIcon>
                  <OTag type="disabled">{{ eventsData.tags }}</OTag>
                </p>
              </div>
            </div>
            <a v-if="eventsData.link" :href="eventsData.link" class="o-link-icon" rel="noopener noreferrer">
              <OButton animation type="text" class="activity-btn">
                {{ i18n.common.VIEW_MORE }}
                <template #suffixIcon>
                  <IconArrowRight class="statistics-icon"></IconArrowRight>
                </template>
              </OButton>
            </a>
          </div>
        </div>
      </div>
      <div class="room-contain-new" :class="{ isShow: tabType === 'blog' }">
        <h4 class="type-title">
          {{ i18n.home.HOME_ROOMS.BLOG_NAME }}
        </h4>
        <div class="room-box">
          <div v-for="(item, index) in blogList" :key="index" class="room-item lable-name">
            <div class="room-item-pc">
              <div class="room-item-left lable-name">
                <span class="day">{{ item.date[2] }}</span>
                <div class="left-bottom">
                  <span class="month">{{ item.date[1] }}</span>
                  <span class="year">{{ item.date[0] }}</span>
                </div>
              </div>
              <div class="room-item-right lable-name">
                <div class="room-top">
                  <a :href="'/' + item.path" :title="item.title" rel="noopener noreferrer">
                    {{ item.title }}
                  </a>
                  <p class="lable-name">
                    <span v-for="(authorName, index2) in item.author" :key="authorName"
                      >{{ authorName }}
                      <span v-show="item.author.length !== index2 + 1">, </span>
                    </span>
                  </p>
                </div>
                <div class="room-bottom lable-name">
                  <a class="word-hover lable-name" :title="item.summary" :href="'/' + item.path" rel="noopener noreferrer">
                    {{ item.summary }}
                  </a>
                </div>
              </div>
            </div>
            <div class="room-item-mo">
              <p class="author lable-name">
                <span v-for="(authorName, index2) in item.author" :key="authorName"
                  >{{ authorName }}
                  <span v-show="item.author.length !== index2 + 1">、</span>
                </span>
              </p>
              <a class="word-hover lable-name" :title="item.summary" :href="'/' + item.path" rel="noopener noreferrer">
                {{ item.summary }}
              </a>
            </div>
          </div>
        </div>

        <div class="statistics">
          <a :href="`/${lang}/blogs/`" target="_blank" rel="noopener noreferrer">
            <OButton animation type="text" class="statistics-button">
              {{ i18n.common.VIEW_MORE }}
              <template #suffixIcon>
                <IconArrowRight class="statistics-icon"></IconArrowRight>
              </template>
            </OButton>
          </a>
        </div>
      </div>
      <div class="room-contain-new" :class="{ isShow: tabType === 'news' }">
        <h4 class="type-title">
          {{ i18n.home.HOME_ROOMS.NEWS_NAME }}
        </h4>
        <div class="room-box">
          <div v-for="(item, index) in newsList" :key="index" class="room-item">
            <div class="room-item-pc">
              <div class="room-item-left">
                <span class="day">{{ item.date[2] }}</span>
                <div class="left-bottom">
                  <span class="month">{{ item.date[1] }}</span>
                  <span class="year">{{ item.date[0] }}</span>
                </div>
              </div>
              <div class="room-item-right">
                <div class="room-top">
                  <a :href="'/' + item.path" :title="item.title" rel="noopener noreferrer">
                    {{ item.title }}
                  </a>
                  <p>
                    <span v-for="(authorName, index2) in item.author" :key="authorName"
                      >{{ authorName }}
                      <span v-show="item.author.length !== index2 + 1">、</span>
                    </span>
                  </p>
                </div>
                <div class="room-bottom">
                  <a class="word-hover" :title="item.summary" :href="'/' + item.path" rel="noopener noreferrer">
                    {{ item.summary }}
                  </a>
                </div>
              </div>
            </div>
            <div class="room-item-mo">
              <p class="author">
                <span v-for="(authorName, index2) in item.author" :key="authorName"
                  >{{ authorName }}
                  <span v-show="item.author.length !== index2 + 1">、</span>
                </span>
              </p>
              <a class="word-hover" :title="item.summary" :href="'/' + item.path" rel="noopener noreferrer">
                {{ item.summary }}
              </a>
            </div>
          </div>
        </div>
        <div class="statistics">
          <a :href="`/${lang}/news/`" target="_blank" rel="noopener noreferrer">
            <OButton animation type="text" class="statistics-button">
              {{ i18n.common.VIEW_MORE }}
              <template #suffixIcon>
                <IconArrowRight class="statistics-icon"></IconArrowRight>
              </template> </OButton
          ></a>
        </div>
      </div>
    </OContainer>
  </div>
</template>
<style lang="scss" scoped>
@include in-dark {
  .cover {
    @include img-in-dark;
  }
  .room-item-left {
    background-color: rgba($color: #bd72ff, $alpha: 0.11) !important;
  }
}
.word-hover {
  display: block;
  cursor: pointer;
  color: var(--e-color-text1);
  &:hover {
    color: var(--e-color-brand1);
  }
}
.statistics {
  display: flex;
  padding-top: var(--e-spacing-h2);
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1080px) {
    padding-top: var(--e-spacing-h5);
  }
  @media screen and (max-width: 768px) {
    padding: var(--e-spacing-h5) 0 var(--e-spacing-h10) 0;
    :deep(.o-button) {
      font-size: var(--e-font-size-tip) !important;
      line-height: var(--e-line-height-tip) !important;
    }
  }

  &-button:hover {
    color: var(--e-color-brand1);
    @media screen and (max-width: 1416px) {
      color: var(--e-color-text1);
    }
  }

  :deep(.o-button) {
    padding: 0;
  }

  &-icon {
    color: var(--e-color-brand1);
    width: var(--e-font-size-h8);
    height: var(--e-font-size-h8);
  }
}

.room-item-mo {
  display: none;
}
.home-news {
  margin: var(--e-spacing-h2) auto 0;
  .room-contain-new {
    display: none;
    padding: var(--e-spacing-h2);
    background-color: var(--e-color-bg2);
    &.events {
      padding: 0;
    }
    .type-title {
      font-size: var(--e-font-size-h7);
      line-height: var(--e-font-size-h7);
      color: var(--e-color-text1);
      display: block;
      @media screen and (max-width: 1080px) {
        display: none;
      }
    }
    .room-box {
      display: grid;
      margin-top: var(--e-spacing-h2);
      grid-template-columns: repeat(2, minmax(82px, 1fr));
      column-gap: var(--e-spacing-h2);
      row-gap: var(--e-spacing-h2);
      .room-item-pc {
        display: flex;
        padding-bottom: var(--e-spacing-h2);
        border-bottom: 1px solid var(--e-color-division1);
        p {
          text-align: left;
        }
        .room-item-left {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          margin-right: var(--e-spacing-h4);
          width: 100px;
          height: 110px;
          background-color: rgba($color: #7d32ea, $alpha: 0.11);
          color: var(--e-color-text1);
          .day {
            margin-bottom: var(--e-spacing-h8);
            font-size: var(--e-font-size-h4);
          }
          .year {
            padding-left: var(--e-spacing-h10);
          }
          .left-bottom {
            font-size: var(--e-font-size-tip);
          }
        }
        .room-item-right {
          display: flex;
          flex: 1;
          min-width: 0;
          font-size: var(--e-font-size-text);
          justify-content: space-between;
          flex-direction: column;
          .room-top {
            min-width: 0;
            a {
              display: block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: 500;
              font-size: var(--e-font-size-h7);
              color: var(--e-color-text1);
              &:hover {
                color: var(--e-color-brand1);
              }
            }
            p {
              line-height: var(--e-line-height-text);
              font-size: var(--e-font-size-text);
              margin-top: var(--e-spacing-h9);
              color: var(--e-color-text1);
            }
            @media screen and (max-width: 768px) {
              a {
                font-size: var(--e-font-size-text);
              }
            }
          }
          .room-bottom {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            color: var(--e-color-text1);
            a {
              text-decoration: none;
            }
            @media screen and (max-width: 768px) {
              display: none;
            }
          }
        }
      }
    }
    @media screen and (max-width: 1080px) {
      .room-box {
        margin: 0;
        grid-template-columns: repeat(1, minmax(300px, 1fr));
        row-gap: var(--e-spacing-h5);
      }
    }
    @media screen and (max-width: 768px) {
      padding: var(--e-spacing-h6);
      padding-bottom: var(--e-spacing-h5);
      .room-box {
        margin: 0;
        grid-template-columns: repeat(1, minmax(300px, 1fr));
        .room-item {
          border-bottom: 1px solid var(--e-color-division1);

          .room-item-pc {
            border-bottom: none;
            padding-bottom: var(--e-spacing-h5);
            .room-item-left {
              margin-right: var(--e-spacing-h6);
              width: var(--e-line-height-h3);
              height: var(--e-line-height-h3);
              .day {
                margin: 0;
                font-size: var(--e-font-size-text);
              }
              .left-bottom {
                display: flex;
                transform: scale(0.5);
              }
            }
            .room-item-right {
              .room-top {
                a {
                  display: -webkit-box;
                  white-space: inherit;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  line-height: var(--e-line-height-text);
                  font-size: var(--e-font-size-text);
                }
                p {
                  display: none;
                }
              }
            }
          }
          .room-item-mo {
            display: flex;
            flex-direction: column;
            font-size: var(--e-font-size-tip);
            color: var(--e-color-text4);
            .author {
              padding-bottom: var(--e-spacing-h8);
            }
            a {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              line-height: var(--e-line-height-tip);
              margin-bottom: var(--e-spacing-h5);
              color: inherit;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
  .isShow {
    display: block;
  }
}

:deep(.title-list) {
  display: flex;
  padding-bottom: var(--e-spacing-h2);
  justify-content: flex-end;
  .el-tabs__header {
    margin: 0;
  }
  @media screen and (max-width: 1080px) {
    padding-bottom: var(--e-spacing-h5);
    justify-content: center;
  }
  .el-tabs__nav-scroll {
    @media screen and (max-width: 1080px) {
      display: flex;
      justify-content: center;
    }
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .title-item {
    cursor: pointer;
    padding: var(--e-spacing-h6);
    &:hover {
      color: var(--e-color-brand1);
    }
  }
  .active {
    background-color: var(--e-color-brand1);
    color: var(--e-color-text2) !important;
  }
}

.activity-content {
  display: grid;
  grid-template-columns: 66.2% 33.8%;
  height: 546px;
  @media (max-width: 1100px) {
    display: block;
    height: auto;
  }
  .activity-content-cover {
    width: 100%;
    height: 546px;
    overflow: hidden;
    @media (min-width: 1200px) {
      &:hover {
        .cover {
          transform: scale(1.1);
        }
      }
    }
    @media (max-width: 1100px) {
      height: 184px;
    }
    .cover {
      width: 100%;
      height: 100%;
      display: block;
      transition: transform 0.6s ease;
    }
  }
  .activity-content-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--e-spacing-h2);
    position: relative;
    @media (max-width: 1100px) {
      padding: 12px;
    }
    .activity-title {
      font-size: var(--e-font-size-h4);
      font-weight: 500;
      color: var(--e-color-text1);
      line-height: var(--e-line-height-h4);
      &:hover {
        color: var(--e-color-brand1);
      }
      @media (max-width: 1100px) {
        font-size: 14px;
        line-height: 22px;
      }
    }
    .desc {
      font-size: var(--e-font-size-text);
      font-weight: 400;
      color: var(--e-color-text4);
      line-height: var(--e-line-height-text);
      margin: 24px 0 40px;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
      @media (max-width: 1100px) {
        font-size: 12px;
        line-height: 18px;
        height: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 8px 0;
        display: block;
      }
    }
    .activity-btn {
      padding: 0;
    }
    .info {
      p {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        color: var(--e-color-text4);
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        @media (max-width: 1100px) {
          margin: 0;
          display: inline-flex;
          margin-right: 16px;
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
        .o-icon {
          margin-right: 8px;
          font-size: 24px;
          @media (max-width: 1100px) {
            font-size: 16px;
            margin-right: 4px;
          }
        }
      }
    }
  }
  @media (max-width: 1100px) {
    display: block;
    height: auto;
    &-cover {
      height: 184px;
    }
    &-box {
      .link {
        display: none;
      }
      .activity-btn {
        font-size: 12px;
      }
      .box {
        margin: 0 0 8px;
      }
    }
  }
}
</style>
