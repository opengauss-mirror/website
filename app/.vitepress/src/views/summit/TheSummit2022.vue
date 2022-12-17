<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCommon } from '@/stores/common';
import AppContent from '@/components/AppContent.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import AOS from 'aos';

import banner from '@/assets/category/summit/summit2022/banner.jpg';
import bannerMo from '@/assets/category/summit/summit2022/banner-mo.jpg';
import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';
import demoPng from '@/assets/category/summit/summit2022/demo.png';
import speakerPng from '@/assets/category/summit/summit2022/speaker.png';
import organizerPng from '@/assets/category/summit/summit2022/organizer.png';

import otherBg from '@/assets/category/summit/summit2022/cover.png';
import otherCover1 from '@/assets/category/summit/summit2022/cover1.png';
import otherCover2 from '@/assets/category/summit/summit2022/cover2.png';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);
const bannerInfo = {
  pc_banner: banner,
  mo_banner: bannerMo,
};

const tabType = ref(['main', 'main', 'main']);
const otherTabType = ref([0, 0, 0]);

const summitData = {
  detail: [
    'openGauss Summit 2022是由openGauss开源数据库社区联合行业组织，伙伴及客户共同举办的年度数据库产业界交流与分享峰会。openGauss作为面向企业核心应用场景的开源数据库，开源两年来，与产业界聚力创新，携手前行。在技术、商业、生态、社区和人才方面取得了令人瞩目的成绩。从数据出发为企业数字化转型提供了强大的动能。',
    '本次峰会将邀请学术专家、行业组织、企业客户、生态伙伴和社区贡献者齐聚openGauss峰会，探讨数据库创新发展新路径、交流数据生态建设的新思维、分享企业数字化转型的新成果，共同加速推动开源数据库产业向前发展。',
  ],
  contentList: [
    {
      name: '展示征集',
      nameEn: 'DEMO',
      img: demoPng,
      link: 'https://shimo.im/forms/Clt43Er77rkQMPUX/fill',
    },
    {
      name: 'KN演讲者征集',
      nameEn: 'KN SPEAKER',
      img: speakerPng,
      link: 'https://shimo.im/forms/PP1S4qJ3YcguslYv/fill',
    },
    {
      name: '分论坛征集',
      nameEn: 'SESSION ORGANIZER',
      img: organizerPng,
      link: 'https://shimo.im/forms/hz1hXko4jW8CeSHK/fill',
    },
  ],
  previous: {
    title: '精彩回顾',
    list: [
      {
        name: 'openGauss Developer Day 2022',
        link: '/zh/summit/devday2022/',
        target: '_blank',
      },
      {
        name: 'openGauss Summit 2021',
        link: '/zh/summit/summit2021/',
        target: '_blank',
      },
    ],
  },
  agenda: {
    title: '会议日程',
    meetingList: [
      {
        daytime: '12月29日 openGauss Summit 2022',
        list: [
          {
            type: '上午：主论坛',
            id: 'main',
            children: [
              {
                time: '09:30 - 09:35',
                desc: '院士致辞',
              },
              {
                time: '09:35 - 09:45',
                desc: 'openGauss社区进展主题演讲',
              },
              {
                time: '09:45 - 09:50',
                desc: 'openGauss社区理事会升级仪式',
              },
              {
                time: '09:50 - 10:10',
                desc: 'openGauss技术创新主题演讲',
              },
              {
                time: '10:10 - 10:25',
                desc: '中国移动创新实践及成果发布仪式',
              },
              {
                time: '10:25 - 10:45',
                desc: '产学研联合创新、openGauss创新孵化成果分享',
              },
              {
                time: '10:45 - 11:25',
                desc: '伙伴与用户应用实践联合演讲',
              },
              {
                time: '11:25 - 11:30',
                desc: 'openGauss社区活动发布仪式',
              },
            ],
          },
          {
            type: '下午：分论坛',
            id: 'other',
            duration: '14:00 - 17:00',
            children: [
              {
                id: 0,
                name: '云和恩墨',
                desc: 'openEuler Summit 2022',
                children: [
                  // {
                  //   time: '14:00 - 14:05',
                  //   desc: '领导致辞',
                  //   name: '江大勇',
                  //   post: 'openGauss社区理事会理事长',
                  // },
                  {
                    time: '14:05 - 14:10',
                    desc: '领导致辞',
                    option: [
                      {
                        name: '盖国强',
                        post: [
                          '云和恩墨创始人/总经理，中国DBA联盟理事长',
                          '墨天轮社区发起者，鲲鹏MVP',
                        ],
                      },
                    ],
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '重磅更新 -- MogDB v3.1依托开源社区的技术创新',
                    name: '张皖川',
                    post: '云和恩墨数据库产品事业部总经理',
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: '华宝基金openGauss（MogDB）实践之路',
                    name: '毛绵长',
                    post: '华宝基金管理有限公司资深架构师',
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: '国产化数据库替代对制药行业MES的影响',
                    name: '左叶锋',
                    post: '上海雷昶研发二部总监',
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: '中间件与数据库生态融合的最佳实践分享',
                    name: '曾鹏冰',
                    post: '东方通技术咨询部总监',
                  },
                  {
                    time: '15:30 - 15:50',
                    desc: 'Uqbar 超融合时序数据库 -- 面向物联网的一站式数据处理平台',
                    name: '张程伟',
                    post: '云和恩墨数据库产品CTO',
                  },
                  {
                    time: '15:50 - 16:30',
                    desc: '万象更新，中国数据库时代的机遇与挑战',
                    name: '',
                    post: '线上圆桌讨论',
                  },
                ],
              },
              {
                id: 1,
                name: '海量数据',
                desc: 'openEuler Summit 2022',
                children: [
                  // {
                  //   time: '14:00 - 14:05',
                  //   desc: '领导致辞',
                  //   option: [
                  //     {
                  //       name: '陈超',
                  //       post: ['鲲鹏计算业务副总裁', '鲲鹏生态发展部部长'],
                  //     },
                  //   ],
                  // },
                  {
                    time: '14:05 - 14:25',
                    desc: '聚沙成塔，合力创新--Vastbase携手伙伴，助力行业用户应用升级',
                    name: '肖枫',
                    post: '海量数据总裁',
                  },
                  {
                    time: '14:25 - 14:45',
                    desc: '夯实基座，体验升级-Vastbase面向关键业务场景的技术破局',
                    name: '白玥',
                    post: '海量数据解决方案总监',
                  },
                  {
                    time: '14:45 - 15:05',
                    desc: '打造数据库中坚力量，共创基础软件新篇章',
                    option: [
                      {
                        name: '高丹',
                        post: ['赛迪顾问业务总监', '软件产业研究中心总经理'],
                      },
                    ],
                  },
                  {
                    time: '15:05 - 15:25',
                    desc: '海量数据库助力粤海资本金融业务应用创新',
                    name: '邓锦波',
                    post: '广东粤海资本集团有限公司信息技术部负责人',
                  },
                  {
                    time: '15:25 - 15:45',
                    desc: '用友U8C携手openGauss，为行业客户提供更优ERP体验',
                    name: '纪录',
                    post: '用友软件助理总裁',
                  },
                  {
                    time: '15:45 - 16:00',
                    desc: '基于海量关系型数据库的信创协同办公平台解决方案',
                    name: '王谏',
                    post: '泛微解决方案中心总监',
                  },
                  {
                    time: '16:00 - 16:15',
                    desc: '强化生态合作，共赢数智未来——联合政务云解决方案分享',
                    name: '朱敏捷',
                    post: '云宏信息总裁助理',
                  },
                ],
              },
              {
                id: 2,
                name: '南大通用',
                desc: 'openEuler Summit 2022',
                children: [
                  {
                    time: '14:00 - 14:05',
                    desc: '开场致辞',
                    name: '张益',
                    post: '南大通用GBase8c产品经营部总经理',
                  },
                  {
                    time: '14:05 - 14:25',
                    desc: '与时俱进 一专多能——GBase 8c顺应分布式数据库发展趋势',
                    name: '王薇',
                    post: '南大通用GBase 8c产品部长',
                  },
                  {
                    time: '14:25 - 14:45',
                    desc: '渤海银行核心系统分布式架构转型实践',
                    option: [
                      {
                        name: '王飞鹏',
                        post: [
                          '渤海银行信息科技部生产运行中心副主任',
                          '首席数据库专家',
                        ],
                      },
                    ],
                  },
                  {
                    time: '14:45 - 15:05',
                    desc: '分布式数据库在金融行业的落地实践',
                    name: '荣玉鹏',
                    post: '同方软银平台研发部经理',
                  },
                  {
                    time: '15:05 - 15:25',
                    desc: 'GBase 8c核心技术',
                    name: '李凯',
                    post: '南大通用GBase 8c产品总监',
                  },
                  {
                    time: '15:25 - 15:45',
                    desc: 'GBase 8c助力东华软件布局金融领域自主创新',
                    name: '田占霄',
                    post: '东华软件金融软件部运营总监',
                  },
                  {
                    time: '15:45 - 16:05',
                    desc: '信雅达数字化司库平台实践分享--拥抱分布式数据库，落地数字化经营管理战略',
                    name: '王斑',
                    post: '信雅达科技有限公司产品总监',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  other: [
    {
      name: '填写社区满意度有奖问卷，丰富大礼等您来拿！',
      cover: otherCover1,
      btn_text: '立即参与',
      path: '/zh/questionnaire/',
    },
    {
      name: '考openGauss认证，领京东卡激励',
      cover: otherCover2,
      btn_text: '立即报名',
      path: '/zh/events/2022-10-28/Meetup.html',
    },
  ],
};

onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
});
</script>
<template>
  <div class="banner">
    <div
      class="summit-banner-pc"
      :style="`background-image:url(${bannerInfo.pc_banner}) ;`"
    ></div>
    <div class="summit-banner-mo">
      <img :src="bannerInfo.mo_banner" alt="" />
    </div>
  </div>

  <AppContent>
    <div class="summit-detail">
      <p>{{ summitData.detail[0] }}</p>
      <p>{{ summitData.detail[1] }}</p>
    </div>
    <div class="agenda">
      <h3>{{ summitData.agenda.title }}</h3>
      <div
        v-for="(item, index) in summitData.agenda.meetingList"
        :key="item.daytime"
        class="agenda-item"
        data-aos="fade-up"
      >
        <h4 class="meetingtitle">
          {{ item.daytime }}
        </h4>
        <OTabs v-model="tabType[index]" class="schedule-tabs">
          <el-tab-pane
            v-for="itemList in summitData.agenda.meetingList[0].list"
            :key="itemList.id"
            :name="itemList.id"
          >
            <template #label>
              <div class="timeTabs">
                {{ itemList.type }}
              </div>
            </template>
          </el-tab-pane>
        </OTabs>
        <OContainer :level-index="1">
          <div
            class="schedule-item"
            :class="{ isShow: tabType[index] === 'main' }"
          >
            <SummitSchedule
              :options="summitData.agenda.meetingList[index].list[0].children"
            />
          </div>
          <div
            class="schedule-item other"
            :class="{ isShow: tabType[index] === 'other' }"
          >
            <OTabs v-model="otherTabType[index]" class="other-tabs">
              <OTabPane
                v-for="itemList in summitData.agenda.meetingList[index].list[1]
                  .children"
                :key="itemList.id"
                :label="itemList.name"
                :name="itemList.id"
              >
                <SummitSchedule :options="itemList.children" />
              </OTabPane>
            </OTabs>
          </div>
        </OContainer>
      </div>
    </div>

    <div class="other-content">
      <div
        v-for="item in summitData.other"
        :key="item.path"
        class="other-content-item"
        :style="`background-image:url(${otherBg}) ;`"
      >
        <div class="cover">
          <img :src="item.cover" :alt="item.name" />
        </div>
        <p class="name">{{ item.name }}</p>
        <a :href="item.path" target="_blank">
          <OButton animation class="home-banner-btn" size="mini">
            {{ item.btn_text }}
            <template #suffixIcon
              ><OIcon><IconArrowRight /></OIcon
            ></template>
          </OButton>
        </a>
      </div>
    </div>
    <!-- <div class="content">
      <div
        v-for="item in summitData.contentList"
        :key="item.link"
        class="content-item"
      >
        <a :href="item.link" target="_blank">
          <div class="text">
            <p>CALL FOR</p>
            <p>{{ item.nameEn }}</p>
            <p>{{ item.name }}</p>
          </div>

          <img :src="item.img" :alt="item.name" />
        </a>
      </div>
    </div> -->
    <div class="previous">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <p v-for="item in summitData.previous.list" :key="item.link">
          <a :href="item.link" :target="item.target">{{ item.name }}</a>
        </p>
      </div>
    </div>
  </AppContent>
</template>
<style scoped lang="scss">
.dark img{
  // filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.banner {
  width: 100%;
  .summit-banner-pc {
    height: 380px;
    margin: 0 auto;
    background: no-repeat center/cover;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .summit-banner-mo {
    display: none;

    @media screen and (max-width: 768px) {
      width: 100%;
      display: block;
      img {
        width: 100%;
      }
    }
  }
}
.summit-detail {
  p {
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h6);
    color: var(--o-color-text1);
    font-weight: 300;
    text-align: justify;
    text-indent: 2em;
    &:not(:last-child) {
      margin-bottom: var(--o-spacing-h6);
    }
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
}
.content {
  margin: var(--o-spacing-h1) auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media screen and (max-width: 1470px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 948px;
  }
  @media screen and (max-width: 968px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 474px;
    gap: 16px;
    margin: var(--o-spacing-h2) auto;
  }

  .content-item {
    @media screen and (max-width: 768px) {
      text-align: center;
    }
    a {
      display: inline-block;
      width: 100%;
      position: relative;
      box-shadow: var(--o-shadow-l1);
      .text {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        p {
          color: #fff;
          text-align: center;
          font-size: var(--o-font-size-h4);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-h5);
          }
          &:nth-of-type(3) {
            margin-top: var(--o-spacing-h4);
            @media screen and (max-width: 768px) {
              margin-top: var(--o-spacing-h5);
            }
          }
        }
      }

      img {
        width: 100%;
        // @media screen and (max-width: 490px) {
        //   width: 100%;
        // }
      }
    }
  }
}
.previous {
  .previous-title {
    display: flex;
    h3 {
      font-size: 24px;
      line-height: 30px;
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        margin-right: var(--o-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: var(--o-spacing-h2);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h6);
    }
    p:not(:last-child) {
      margin-bottom: var(--o-spacing-h4);
      @media screen and (max-width: 768px) {
        margin-bottom: var(--o-spacing-h6);
      }
    }
    a {
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      display: inline-block;
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
  }
}

.agenda {
  margin: var(--o-spacing-h1) 0;
  @media (max-width: 767px) {
    margin: var(--o-spacing-h2) 0;
  }
  h3 {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    font-weight: 300;
    @media (max-width: 767px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .agenda-item {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 767px) {
      margin-top: var(--o-spacing-h4);
    }
    &:nth-of-type(1) {
      // .el-tabs__active-bar {
      //   display: none;
      // }
      // 暂时取消第一天的分会选中状态
      .other {
        :deep(.o-tabs) {
          // .el-tabs__active-bar {
          //   display: none;
          // }
          .is-active {
            color: var(--o-color-brand1);
          }
          .el-tabs__item:hover {
            color: var(--o-color-text1);
          }
        }
      }
    }
    // 暂时隐藏时间
    &:nth-of-type(2) {
      .other {
        :deep(.dataItem) {
          grid-template-columns: 600px 445px;
          padding-left: 192px;
          @media screen and (max-width: 1328px) {
            grid-template-columns: 500px 445px;
          }
          @media screen and (max-width: 1320px) {
            padding-left: 80px;
          }
          @media screen and (max-width: 1100px) {
            padding-left: 100px;
            grid-template-columns: 348px;
            .box {
              grid-column-start: 1;
              grid-column-end: 2;
            }
          }
          @media screen and (max-width: 820px) {
            padding-left: 2vw;
          }
          @media screen and (max-width: 420px) {
            grid-template-columns: auto;
          }
          .show-more {
            color: var(--o-color-brand1);
          }
          .time {
            display: none;
          }
          .desc {
            display: block;
            &:hover {
              color: var(--o-color-brand1);
            }
          }
        }
      }
    }
    // 暂时隐藏时间
    .meetingtitle {
      font-weight: 400;
      color: var(--o-color-text1);
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      text-align: center;
      margin-bottom: 24px;
      @media (max-width: 767px) {
        margin-bottom: 12px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .schedule-tabs {
      text-align: center;
      margin-top: 24px;
      :deep(.el-tabs__nav) {
        float: none;
        display: inline-block;
        .el-tabs__active-bar {
          display: none;
        }
        .el-tabs__item {
          padding: 0;
        }
      }
      .timeTabs {
        display: inline-block;
        margin: 0 0 24px;
        cursor: pointer;
        border: 1px solid var(--o-color-border2);
        color: var(--o-color-text1);
        width: 120px;
        text-align: center;
        background: var(--o-color-bg2);
        font-size: var(--o-font-size-text);
        line-height: 38px;
        padding: 0 var(--o-spacing-h5);
        @media (max-width: 1100px) {
          font-size: var(--o-font-size-tip);
          padding: 0 var(--o-spacing-h6);
        }
      }

      .is-active .timeTabs {
        color: #fff;
        background: var(--o-color-brand1);
        border-color: var(--o-color-brand2);
      }
      .other-tabs {
        margin-bottom: 24px;
        :deep(.el-tabs__nav) {
          float: none;
          display: inline-block;
          @media (max-width: 1100px) {
            line-height: 44px;
          }
        }
        :deep(.el-tabs__header) {
          text-align: center;
          .el-tabs__item {
            @media (max-width: 1100px) {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
            }
          }
        }
      }
    }
    .schedule-item {
      display: none;
      padding: 24px;
      @media (max-width: 1100px) {
        padding: 16px;
      }
      &.isShow {
        display: block;
      }
      &.other {
        :deep(.el-tabs__nav-scroll) {
          text-align: center;
        }
        :deep(.el-tabs__content) {
          overflow: visible;
        }
        :deep(.el-tabs__nav) {
          float: none;
          display: inline-block;
          @media (max-width: 1100px) {
            line-height: 44px;
          }
        }
        .other-text {
          margin: 24px auto 0 auto;
          color: var(--o-color-text1);
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          @media (max-width: 1100px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            margin: 16px 0;
          }
          svg {
            margin-right: var(--o-spacing-h8);
          }
        }
        :deep(.dateList) {
          .detail {
            display: none;
          }
          .show-detail {
            .detail {
              display: block;
            }
          }
        }
      }
      :deep(.detail) {
        display: none;
      }
    }
  }
}

.other-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: var(--o-spacing-h1);
  justify-content: center;
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
    margin-bottom: var(--o-spacing-h2);
  }
  &-item {
    flex: 1;
    position: relative;
    height: auto;
    text-align: center;
    padding: var(--o-spacing-h4);
    background: no-repeat center/cover;
    @media screen and (max-width: 1440px) {
      width: 100%;
      margin: 0 auto;
      padding: var(--o-spacing-h5);
    }
    .cover {
      height: 220px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 80%;
        object-fit: cover;
      }
      @media screen and (max-width: 767px) {
        height: 165px;
      }
    }

    .name {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      color: var(--o-color-text1);
      margin-bottom: var(--o-spacing-h5);
      @media screen and (max-width: 1100px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }
  }
}
</style>
