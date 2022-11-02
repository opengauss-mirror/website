<script lang="ts" setup>
import { computed, ref, Ref, onMounted, reactive } from 'vue';
import { useRouter, useData } from 'vitepress';
import { getSortData } from '@/api/api-search';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';
import AppContent from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner/banner-secondary.png';
import illustration from '@/assets/illustrations/events.png';
import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404-dark.png';

import IconCalendar from '~icons/app/icon-calendar.svg';
import IconMapPin from '~icons/app/icon-map-pin.svg';
import IconTag from '~icons/app/icon-tag.svg';

import eventPoster from '@/assets/category/home/events/internship.png';
import eventPosterEn from '@/assets/category/home/events/internship-en.png';

const commonStore = useCommon();
const router = useRouter();
const { lang } = useData();
const i18n = useI18n();
const screenWidth = useWindowResize();

// 所需日期
const nowDate = new Date();
const thisYear: number = nowDate.getFullYear();
const thisMonth: number | string =
  nowDate.getMonth() < 9
    ? '0' + (nowDate.getMonth() + 1)
    : nowDate.getMonth() + 1;
const thisDate =
  nowDate.getDate().toString().length === 1
    ? '0' + nowDate.getDate()
    : nowDate.getDate();
const curDate = Number('' + thisYear + thisMonth + thisDate);

const EVENTS_DATA = [
  {
    title: '多重奖励 | openGauss开源实习来啦！',
    time: '2022/02/01-2022/12/31',
    date: '2022-02-01',
    category: 'events',
    tags: '活动',
    label: '线上',
    location: '线上',
    img: lang.value === 'zh' ? eventPoster : eventPosterEn,
    link: 'https://mp.weixin.qq.com/s/vM6p6d1uPVYkwOl7tY0nyA',
    author: 'openGauss',
    summary:
      '开源实习是openEuler社区、openGauss社区、openLooKeng等单位共同发起的线上实习项目，旨在鼓励在校学生积极参与开源社区，在实际的开源环境中提升实践能力。社区提供实习任务，并提供导师辅导，学生通过实习申请后，可在社区领取任务，每完成一个任务可获得相应积分，积分累计达规定量后，可获得实习证明和实习工资。',
  },
];

// 当前导航栏
const activeName = ref('first');
// 本月及以后最新活动列表
const latestList: Ref<any> = ref([]);
// 精彩回顾中所有的数据
const allReviewList: Ref<Array<any>> = ref([]);
// 时间线所选中的日期
const timeLineDate: Ref<string> = ref(thisYear + '-' + thisMonth);
// 精彩回顾下展示列表
const newsList = computed(() => {
  if (screenWidth.value > 768) {
    const showList: Ref<Array<any>> = ref([]);
    allReviewList.value.forEach((item: any) => {
      if (item.date.slice(0, 7) === timeLineDate.value) {
        showList.value.push(item);
      }
    });
    return showList.value;
  } else {
    return allReviewList.value;
  }
});
const checkFlag = ref(false);
const newEventList = ref([]);
onMounted(async () => {
  const sortParams = reactive({
    page: 1,
    pageSize: 999,
    lang: lang.value,
    category: 'events',
  });
  try {
    const responeData = await getSortData(sortParams);

    responeData.obj.records.forEach((item: any) => {
      if (item.date) {
        const time = item.time.split('-');
        if (time[1] && time[1].length !== 7) {
          if (Number(time[1].substring(0, 10).replace(/\//g, '')) >= curDate) {
            item.isLatest = true;
          }
        }

        if (
          new Date(item.date).getTime() >= nowDate.getTime() ||
          item.isLatest
        ) {
          // latestList.value.push(item);
        } else {
          allReviewList.value.push(item);
        }
      }
    });
    latestList.value = EVENTS_DATA;
    console.log('latestList.value :>> ', latestList.value);

    // console.log('allReviewList :>> ', allReviewList.value);
    // responeData.obj.records.forEach(function (item: any, index: number) {
    //   //获取活动的起始年月
    //   const month = item.date.split('-')[0].substring(0, 7);
    //   if (index) {
    //     checkFlag.value = false;
    //     newEventList.value.forEach(function (newItem: any) {
    //       if (month.includes(newItem.month)) {
    //         checkFlag.value = true;
    //         newItem.eventList.push(item);
    //       }
    //     });
    //     if (!checkFlag.value) {
    //       newEventList.value.push({
    //         month: month,
    //         eventList: [item],
    //       });
    //     }
    //   } else {
    //     newEventList.value.push({
    //       month: month,
    //       eventList: [item],
    //     });
    //   }
    // });
  } catch (e: any) {
    throw new Error(e);
  }
});
const goDetail = (path: string) => {
  if (path.startsWith('http')) {
    window.open(path, '_blank');
  } else {
    router.go(`/${lang.value + '/' + path}.html`);
  }
};
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :title="i18n.common.COMMON_CONFIG.EVENTS"
    :illustration="illustration"
  />
  <div class="salon-tabs">
    <OTabs v-model="activeName">
      <OTabPane :label="i18n.connect.EVENTS_NEW" name="first"></OTabPane>
      <OTabPane :label="i18n.connect.EVENTS_REVIEW" name="second"></OTabPane>
    </OTabs>
  </div>
  <AppContent class="salon-content">
    <div class="latest-events">
      <h3 class="salon-title">{{ i18n.connect.EVENTS_NEW }}</h3>
      <template v-if="latestList && latestList.length != 0">
        <OContainer
          :level-index="2"
          v-for="item in latestList"
          :key="item.id"
          class="activity-content"
          :class="item.img ? 'event-cover' : 'event-infos'"
          @click="goDetail(item.link)"
        >
          <div v-if="item.img" class="activity-content-cover">
            <img :src="item.img" class="cover" alt="" />
          </div>
          <div class="activity-content-box">
            <div class="head">
              <h3 class="activity-title">{{ item.title }}</h3>
              <p class="desc">{{ item.summary }}</p>
            </div>
            <div class="info">
              <p class="time">
                <OIcon class="icon"><IconCalendar /></OIcon>{{ item.time }}
              </p>
              <p class="online" v-if="item.location">
                <OIcon class="icon"><IconMapPin /></OIcon>{{ item.location }}
              </p>
              <p class="info-tag" v-if="item.tags">
                <OIcon class="icon"><IconTag /></OIcon>
                <OTag type="disabled">{{ item.tags }}</OTag>
              </p>
            </div>
          </div>
        </OContainer>
      </template>
      <div v-else>
        <div class="nofound">
          <img
            class="empty-img"
            :src="
              commonStore.theme === 'light'
                ? notFoundImg_light
                : notFoundImg_dark
            "
            alt="404"
          />
          <p class="empty-text">
            {{ lang === 'zh' ? '暂无活动！' : 'NotFound !' }}
          </p>
        </div>
      </div>
    </div>
    <div class="review-events">
      <h3 class="salon-title review-title">
        {{ i18n.connect.EVENTS_REVIEW }}
      </h3>
      <OTimeline
        v-model="timeLineDate"
        class="salon-time"
        :right-arrow="true"
        :left-arrow="true"
      ></OTimeline>
      <div v-if="newsList && newsList.length != 0" class="salon-review">
        <OCard
          v-for="item in newsList"
          :key="item.ID"
          class="salon-review-card"
          :style="{ padding: '0px' }"
          shadow="hover"
          @click="goDetail(item.path)"
        >
          <div class="salon-review-card-title">
            {{ item.title }}
          </div>
          <div v-if="item.img" class="salon-review-card-img">
            <img :src="item.img" alt="" />
          </div>
          <div
            v-else
            class="salon-review-card-desc"
            :title="item.textContent ? item.textContent : ''"
          >
            {{ item.textContent ? item.textContent : '' }}
          </div>
          <div class="salon-review-card-bottom">
            <div class="salon-review-card-mobile">
              <div class="salon-review-card-mobile-title">
                {{ item.title }}
              </div>
              <div
                class="salon-review-card-mobile-desc"
                :title="item.MEETUPS_DES ? item.MEETUPS_DES : ''"
              >
                {{ item.MEETUPS_DES ? item.MEETUPS_DES : '' }}
              </div>
            </div>
            <div class="salon-review-card-info">
              <span class="inline">
                <IconCalendar class="salon-review-card-icon" />
                {{ item.time }}
              </span>
              <span class="inline">
                <IconMapPin class="salon-review-card-icon" />
                <span class="address" :title="item.location">
                  {{ item.location }}</span
                >
              </span>
              <span class="inline">
                <IconTag class="salon-review-card-icon" />
                <OTag type="disabled">{{ item.tags }}</OTag>
              </span>
            </div>
          </div>
        </OCard>
      </div>
      <div v-else>
        <div class="nofound">
          <img
            class="empty-img"
            :src="
              commonStore.theme === 'light'
                ? notFoundImg_light
                : notFoundImg_dark
            "
            alt="404"
          />
          <p class="empty-text">
            {{ lang === 'zh' ? '暂无数据！' : 'NotFound !' }}
          </p>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.nofound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--o-font-size-h6);
  color: var(--o-color-text1);
  padding-top: var(--o-spacing-h2);
  height: 100%;
  .empty-img {
    height: 300px;
  }
  .empty-text {
    margin-top: var(--o-spacing-h5);
  }
}
.latest-events {
  margin-bottom: var(--o-spacing-h1);
  @media (max-width: 1080px) {
    margin-bottom: var(--o-spacing-h2);
  }
}

.activity-content {
  margin-bottom: 24px;
  &.event-cover {
    display: grid;
    grid-template-columns: 66.2% 33.8%;
    cursor: pointer;
    .head {
      margin: 0;
    }
  }
  &-cover {
    width: 100%;
    .cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &.event-infos {
    .activity-content-box {
      display: grid;
      grid-template-columns: 85% 15%;
      align-items: center;
    }

    .desc {
      margin-bottom: 0;
    }
  }
  &-box {
    padding: 40px;
    position: relative;
    flex: 1;

    .head {
      margin-right: 40px;
    }
    .activity-title {
      font-weight: 500;
      color: var(--o-color-text1);
      font-size: 28px;
      line-height: 36px;
    }
    .desc {
      font-size: 14px;
      font-weight: normal;
      color: var(--theme-text);
      line-height: 22px;
      margin: 24px 0 40px;
      text-align: justify;
      word-break: break-all;
      overflow: hidden; //超出文本隐藏
      text-overflow: ellipsis; ///超出部分省略号显示
      display: -webkit-box; //弹性盒模型
      -webkit-box-orient: vertical; //上下垂直
      -webkit-line-clamp: 3; //自定义行数
    }
    .info {
      p {
        font-size: 14px;
        color: var(--theme-text);
        margin-bottom: 12px;
        line-height: 24px;
        display: flex;
        align-items: center;
      }
      .info-tag {
        margin-bottom: 0;
      }
    }
    .icon {
      margin-right: 8px;
      font-size: 24px;
    }
  }
}
.salon {
  &-review {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h2);
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h2) var(--o-spacing-h4);
    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      grid-gap: var(--o-spacing-h5);
      margin-top: 0;
    }

    &-card {
      cursor: pointer;
      width: 100%;
      :deep(.el-card__body) {
        padding: var(--o-spacing-h4);
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: flex-start;
        height: 100%;
        @media (max-width: 768px) {
          padding: 0;
        }
      }

      &-mobile {
        display: none;
        @media (max-width: 768px) {
          display: flex;
          flex-flow: column;
        }

        &-title {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--o-color-text1);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
        }
        &-desc {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          color: var(--o-color-text4);
          margin-top: var(--o-spacing-h9);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          word-break: break-all;
        }
      }

      &-icon {
        height: 24px;
        width: 24px;
        color: var(--o-color-text4);
        margin-right: var(--o-spacing-h9);
        @media (max-width: 768px) {
          height: 16px;
          width: 16px;
          color: var(--o-color-neutral8);
          margin-right: var(--o-spacing-h10);
        }
      }

      &-title {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        color: var(--o-color-text1);
        overflow: hidden;
        text-overflow: ellipsis;
        height: 52px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        @media (max-width: 768px) {
          display: none;
        }
      }

      &-desc {
        width: 100%;
        height: 172px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text1);
        overflow: hidden;
        margin-top: var(--o-spacing-h4);
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        word-break: break-all;
        @media (max-width: 768px) {
          display: none;
        }
      }

      &-img {
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        margin-top: var(--o-spacing-h4);
        @media (max-width: 768px) {
          margin-top: 0px;
        }
        img {
          object-fit: cover;
          height: 172px;
          width: 100%;
          @media (max-width: 768px) {
            height: 120px;
          }
        }
        span {
          position: absolute;
          text-align: center;
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
          color: #fff;
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }
      }

      &-info {
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: var(--o-spacing-h4);
        gap: 40px;
        @media (max-width: 768px) {
          margin-top: var(--o-spacing-h5);
          gap: 24px;
        }
        .inline {
          display: flex;
          align-items: center;
        }
      }

      &-bottom {
        padding: 0;
        width: 100%;
        @media (max-width: 768px) {
          padding: var(--o-spacing-h5) var(--o-spacing-h6);
        }

        .home {
          margin-left: var(--o-spacing-h2);
          @media (max-width: 768px) {
            margin-left: var(--o-spacing-h5);
          }
        }
        .address {
          flex: 1;
          overflow: hidden;
          /* 限制一行显示 */
          white-space: nowrap;
          /* 显示不下省略号显示 */
          text-overflow: ellipsis;
        }

        span {
          color: var(--o-color-text4);
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          white-space: nowrap;
          @media (max-width: 768px) {
            color: var(--o-color-neutral8);
          }
        }
      }
    }
  }

  &-time {
    margin-top: var(--o-spacing-h2);
    display: block;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &-title {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-bottom: var(--o-spacing-h2);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      display: none;
    }
  }
  &-tabs {
    background-color: var(--o-color-bg2);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    :deep(.el-tabs__header) {
      margin: 0px;
    }
  }
}
</style>
