<script lang="ts" setup>
import { onMounted } from 'vue';
import { getUrlParams } from '@/shared/utils';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/category/questionnaire/banner.jpg';
import padImg from '@/assets/category/questionnaire/pad.png';
import watchImg from '@/assets/category/questionnaire/watch.png';
import bookImg from '@/assets/category/questionnaire/book.png';
import capImg from '@/assets/category/questionnaire/cap.png';

const data = {
  title: '2022年度社区满意度调研',

  introduce: {
    textList: [
      '本次openGauss社区满意度调研活动现已结束 ',
      '感谢您的每一个宝贵建议，中奖名单已公示如下',
      '敬请关注我们社区之后的活动、期待您的参与哦~',
    ],
  },
  prize: [
    {
      rank: '一等奖 2 名',
      name: 'HUAWEI MatePad SE',
      prizeImg: padImg,
      list: [
        {
          name: 'HUAWEI MatePad SE',
          phone: '185****6085',
        },
        {
          name: 'HUAWEI MatePad SE',
          phone: '135****8522',
        },
      ],
    },
    {
      rank: '二等奖 6 名',
      name: '华为手环7 标准版',
      prizeImg: watchImg,
      list: [
        {
          name: '华为手环7 标准版',
          phone: '176****6255',
        },
        {
          name: '华为手环7 标准版',
          phone: '150****8032',
        },
        {
          name: '华为手环7 标准版',
          phone: '188****0369',
        },
        {
          name: '华为手环7 标准版',
          phone: '173****2117',
        },
        {
          name: '华为手环7 标准版',
          phone: '186****0553',
        },
        {
          name: '华为手环7 标准版',
          phone: '131****0440',
        },
      ],
    },
    {
      rank: '三等奖 23 名',
      name: '《openGauss数据库核心技术》 或 社区定制鸭舌帽',
      prizeImg: bookImg,
      prizeImg1: capImg,
      list: [
        {
          name: 'openGauss定制鸭舌帽',
          phone: '167****1491',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '188****9231',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '185****1032',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '158****5889',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '189****2242',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '158****0708',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '133****1465',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '151****9509',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '131****7781',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '185****8059',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '185****9522',
        },
        {
          name: 'openGauss定制鸭舌帽',
          phone: '185****0951',
        },

        {
          name: '《openGauss数据库核心技术》',
          phone: '134****7962',
        },
        {
          name: '《openGauss数据库核心技术》',
          phone: '185****1708',
        },
        {
          name: '《openGauss数据库核心技术》',
          phone: '186****8838',
        },
        {
          name: '《openGauss数据库核心技术》',
          phone: '187****7009',
        },
        {
          name: '《openGauss数据库核心技术》',
          phone: '156****0730',
        },
        {
          name: '《openGauss数据库核心技术》',
          phone: '180****5516',
        },

        {
          name: '《openGauss数据库核心技术》',
          phone: '135****8522',
        },
        {
          name: '《openGauss数据库核心技术》',
          phone: '150****3960',
        },
        {
          name: '《openGauss数据库核心技术》',
          phone: '136****4916',
        },
        {
          name: '《openGauss数据库核心技术》',
          phone: '183****6032',
        },
        {
          name: '《openGauss数据库核心技术》',
          phone: '133****0665',
        },
      ],
    },
  ],
  winnersInfo: {
    title: '中奖名单',
    text: '因节日物流停运，奖品将于节后进行寄送，感谢您对openGauss社区的关注与支持，祝您新年快乐，阖家幸福！',
  },

  rule: {
    title: '活动规则',
    ruleList: [
      {
        clause: '1、活动时间：',
        time: '2022年12月15日 - 2023年1月15日。',
      },
      {
        clause:
          '2、活动结束后，我们将公布本期活动的所有获奖情况，并陆续联系获奖用户发放奖品。',
      },
      {
        clause: '3、获奖规则：',
        children: [
          '（1）本次活动的二等奖、三等奖将在完成问卷填写后即时随机抽取。请您根据真实的体验情况填写问卷，未参与过社区体验的无效问卷不参与抽奖。',
          '（2）本次活动的一等奖将在活动结束后，从专家评选为有效反馈建议的问卷中抽取。专家将从用户体验等多个纬度进行评议，如符合条件的问卷不足时，该奖项可空缺。',
          '（3）奖项不可兼得，即每名用户仅能获得一等奖、二等奖、三等奖其中一项奖项；出现用户兼得奖项的情况时，只有最高奖项有效，其余获得奖项不生效。',
        ],
      },
      {
        clause:
          '4、如用户在活动中存在隐瞒、虚构、作弊、欺诈或通过其他非正常手段规避活动规则、获取不当利益的行为，例如：作弊领取、网络攻击等，openGauss社区有权收回相关权益、取消用户的活动参与资格，撤销违规交易，必要时追究违规用户的法律责任。',
      },
      {
        clause:
          '5、活动名称仅为方便用户理解参考使用，不具有效力，实际活动内容以具体活动规则为准。',
      },
      {
        clause:
          '6、openGauss社区可以根据活动的实际情况对活动规则进行变动或调整，相关变动或调整将公布在活动页面上，并于公布时即时生效；但不影响用户在活动规则调整前已经获得的权益。',
      },
      {
        clause: '7、所有参加本活动的用户，均视为同意openGauss社区的',
        clause1: '法律声明',
        clause2: '及',
        clause3: '隐私政策',
        link1: '/zh/legal/',
        link2: '/zh/privacyPolicy/',
      },
    ],
  },
};
// 埋点
function setDownData() {
  const sensors = (window as any)['sensorsDataAnalytic201505'];
  const { href } = window.location;
  if (href.includes('?utm_source')) {
    const paramsArr = getUrlParams(href);
    sensors?.setProfile({
      ...(window as any)['sensorsCustomBuriedData'],
      profileType: 'fromAdvertised',
      origin: href,
      ...paramsArr,
    });
  }
}

onMounted(() => {
  setTimeout(() => {
    setDownData();
  }, 300);
});
</script>

<template>
  <div class="questionnaire">
    <BannerLevel2 :background-image="banner" :title="data.title" />
    <AppContent>
      <div class="panel1">
        <div class="left-text">
          <p v-for="item in data.introduce.textList" :key="item">{{ item }}</p>
        </div>
      </div>
      <div class="winners-info">
        <h2 class="questionnaire-title">{{ data.winnersInfo.title }}</h2>
        <p class="text">{{ data.winnersInfo.text }}</p>
      </div>
      <div v-for="(item, index) in data.prize" :key="item.rank" class="panel2">
        <div class="left-rank">
          <h4>{{ item.rank }}</h4>
        </div>
        <div class="right-img">
          <img :src="item.prizeImg" alt="" />
          <template v-if="index === 2">
            <img :src="item.prizeImg1" alt="" />
          </template>
        </div>
        <table class="questionnaire-table">
          <tr>
            <th>奖品</th>
            <th>中奖号码</th>
          </tr>
          <tr
            v-for="subitem in item.list"
            :key="subitem.phone"
            class="lable-name1"
          >
            <td>{{ subitem.name }}</td>
            <td>{{ subitem.phone }}</td>
          </tr>
        </table>
      </div>
      <div
        v-for="(item, index) in data.prize"
        :key="item.rank"
        class="panel2-mo lable-name1"
      >
        <div class="head">
          <img :src="item.prizeImg" alt="" />
          <template v-if="index === 2">
            <img :src="item.prizeImg1" alt="" />
          </template>
        </div>
        <div class="body">
          <h4>{{ item.rank }}</h4>
          <table class="questionnaire-table">
            <tr>
              <th>奖品</th>
              <th>中奖号码</th>
            </tr>
            <tr v-for="subitem in item.list" :key="subitem.phone">
              <td>{{ subitem.name }}</td>
              <td>{{ subitem.phone }}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="rule">
        <h2 class="questionnaire-title">{{ data.rule.title }}</h2>
        <ol>
          <li v-for="item in data.rule.ruleList" :key="item.clause">
            <p>
              {{ item.clause }}
              <strong v-if="item.time">{{ item.time }}</strong>
              <a v-if="item.clause1" :href="item.link1">{{ item.clause1 }}</a
              ><span v-if="item.clause2">{{ item.clause2 }}</span
              ><a v-if="item.clause3" :href="item.link2">{{ item.clause3 }}</a>
            </p>
            <div v-if="item.children" class="rule-child">
              <p v-for="itemChild in item.children" :key="itemChild">
                {{ itemChild }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
.questionnaire-table {
  width: 100%;
  margin: 40px 0 0;
  td,
  th {
    text-align: center;
    border-bottom: 1px solid var(--o-color-border2);
    line-height: 64px;
    color: var(--o-color-text1);
    width: 50%;
    @media screen and (max-width: 1100px) {
      line-height: 48px;
      text-align: left;
      padding: 0 16px;
      font-size: var(--o-font-size-text);
    }
  }
  td {
    color: var(--o-color-text4);
  }
  @media screen and (max-width: 1100px) {
    margin-top: var(--o-spacing-h4);
  }
}
.winners-info {
  margin: var(--o-spacing-h1) 0 var(--o-spacing-h2);
  text-align: center;
  .text {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h2);
    color: var(--o-color-text1);
    @media screen and (max-width: 1100px) {
      margin-top: var(--o-spacing-h4);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  @media screen and (max-width: 1100px) {
    margin: var(--o-spacing-h2) 0 var(--o-spacing-h4);
  }
}
.questionnaire-title {
  text-align: center;
  font-size: var(--o-font-size-h4);
  line-height: var(--o-line-height-h4);
  color: var(--o-color-text1);
  @media screen and (max-width: 1100px) {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
  }
}
.rule {
  background-color: var(--o-color-bg1);
  box-shadow: none;
  padding: 0;
  margin: 0;
  margin-top: var(--o-spacing-h1);
  min-height: auto;
  @media screen and (max-width: 1100px) {
    margin-top: var(--o-spacing-h2);
  }

  ol {
    margin-top: var(--o-spacing-h3);
    @media screen and (max-width: 1100px) {
      margin-top: var(--o-spacing-h5);
    }
    li {
      p {
        margin-top: var(--o-spacing-h8);
        margin-bottom: var(--o-spacing-h8);
        font-size: var(--o-font-size-text);
        font-weight: 400;
        color: var(--o-color-text4);
        line-height: var(--o-line-height-text);
        @media screen and (max-width: 1100px) {
          margin-top: var(--o-spacing-h8);
          margin-bottom: var(--o-spacing-h8);
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          text-align: justify;
        }
      }
    }
  }
}
.banner-level2 {
  :deep(.wrap) {
    .banner-text .banner-title {
      color: #000;
    }
  }
}
.panel1 {
  width: 100%;
  padding: 44px 68px;
  display: flex;
  background: var(--o-color-bg2) url(@/assets/category/questionnaire/bg1.png)
    no-repeat center/cover;
  box-shadow: var(--o-shadow-l2);
  @media screen and (max-width: 1100px) {
    padding: 24px 16px;
    display: block;
    background-image: url(@/assets/category/questionnaire/bg1-mo.png);
  }
  .left-text {
    width: 400px;
    margin: 0 auto;
    p {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
      color: var(--o-color-text1);
      text-align: justify;
      @media screen and (max-width: 1100px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
  }
  .right-img {
    width: 113px;
    @media screen and (max-width: 1100px) {
      width: 126px;
      margin: 16px auto 0;
    }
    img {
      width: 100%;
      display: block;
    }
    .join-btn {
      width: 100%;
      margin-top: var(--o-spacing-h8);
      padding: 8px 0;
      justify-content: center;
    }
  }
}
.panel2 {
  margin-top: 54px;
  width: 100%;
  padding: var(--o-spacing-h1) 120px;
  position: relative;
  background: var(--o-color-bg2) url(@/assets/category/questionnaire/bg2.png)
    no-repeat top center;
  box-shadow: var(--o-shadow-l2);
  @media screen and (max-width: 1100px) {
    display: none;
  }
  .left-rank {
    text-align: center;
    h4 {
      font-size: 32px;
      line-height: 40px;
      color: var(--o-color-brand1);
      font-weight: normal;
    }
  }
  .right-img {
    position: absolute;
    top: 40px;
    right: 120px;
    img {
      height: 100px;
      &:nth-of-type(2) {
        margin-left: 12px;
      }
    }
  }
}
.panel2-mo {
  display: none;
  @media screen and (max-width: 1100px) {
    margin-top: var(--o-spacing-h2);
    display: block;
    .head {
      width: 100%;
      text-align: center;
      padding: var(--o-spacing-h5) 0;
      background: url(@/assets/category/questionnaire/bg-mo.png) no-repeat;
      background-size: cover;
      img {
        height: 128px;
        &:nth-of-type(2) {
          margin-left: 12px;
        }
      }
    }
    .body {
      width: 100%;
      padding: var(--o-spacing-h5) 0;
      background-color: var(--o-color-bg2);
      h4 {
        text-align: center;
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        color: var(--o-color-brand1);
        font-weight: normal;
      }
      p {
        text-align: center;
        margin-top: var(--o-spacing-h8);
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text4);
      }
    }
  }
}
.panel3 {
  margin-top: 54px;
  width: 100%;
  display: block;
  margin-bottom: var(--o-spacing-h4);
  @media screen and (max-width: 1100px) {
    display: block;
  }
  .prize-box {
    width: 100%;
    box-shadow: var(--o-shadow-l2);
    background: var(--o-color-bg2);
    .head {
      width: 100%;
      text-align: center;
      padding: var(--o-spacing-h5) 0;
      background: url(@/assets/category/questionnaire/bg3.png) no-repeat;
      background-size: cover;
      @media screen and (max-width: 1100px) {
        background: url(@/assets/category/questionnaire/bg-mo.png) no-repeat;
        background-size: cover;
      }
      img {
        height: 168px;
      }
    }
    .body {
      width: 100%;
      padding: var(--o-spacing-h4) 0;
      background-color: var(--o-color-bg2);
      @media screen and (max-width: 1100px) {
        padding: var(--o-spacing-h5) 0;
      }
      h4 {
        text-align: center;
        font-size: var(--o-font-size-h4);
        line-height: var(--o-line-height-h4);
        color: var(--o-color-brand1);
        font-weight: normal;
        @media screen and (max-width: 1100px) {
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
        }
      }
      p {
        text-align: center;
        margin-top: var(--o-spacing-h5);
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        color: var(--o-color-text4);
        @media screen and (max-width: 1100px) {
          margin-top: var(--o-spacing-h8);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
    }
    &:nth-of-type(2) {
      @media screen and (max-width: 1100px) {
        margin-top: var(--o-spacing-h5);
      }
      .head {
        img {
          &:nth-of-type(1) {
            margin-right: var(--o-spacing-h1);
            @media screen and (max-width: 1100px) {
              margin-right: var(--o-spacing-h2);
            }
            @media screen and (max-width: 400px) {
              margin-right: var(--o-spacing-h6);
            }
          }
        }
      }
    }
  }
}
.asider {
  position: fixed;
  left: 1vw;
  top: 50vh;
  @media screen and (max-width: 1100px) {
    display: none;
  }
  img {
    height: 239px;
  }
}
</style>
