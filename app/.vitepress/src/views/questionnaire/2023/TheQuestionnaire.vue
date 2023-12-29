<script lang="ts" setup>
import useWindowResize from '@/components/hooks/useWindowResize';
import { HUAWEI_COMPUTE } from '@/data/url-config';

import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/category/questionnaire/2023/banner.jpg';
import bannerText from '@/assets/category/questionnaire/2023/banner-text.png';
import bannerMb from '@/assets/category/questionnaire/2023/banner-mb.png';
import code from '@/assets/category/questionnaire/2023/code.png';
import watch from '@/assets/category/questionnaire/2023/watch.png';
import knapsack from '@/assets/category/questionnaire/2023/knapsack.png';
import cup from '@/assets/category/questionnaire/2023/cup.png';

const screenWidth = useWindowResize();
const data = {
  title: '2023年度openGauss社区满意度调研',
  backgroundText: 'QUEATIONNAIRE',
  introduce: {
    textList: [
      '本次openGauss社区满意度调研活动现已结束',
      '感谢您的每一个宝贵建议，中奖名单已公示如下',
      '敬请关注我们社区之后的活动、期待您的参与哦～',
    ],
    joinLink: HUAWEI_COMPUTE + 'vm/mLFTkDm.aspx?udsid=817974',
  },
  prize: [
    {
      rank: '最佳反馈奖 1 名',
      name: 'HUAWEI WATCH GT 4',
      prizeImg: watch,
      list: [
        {
          name: 'HUAWEI WATCH GT 4',
          phone: '185****6085',
        },
      ],
    },
    {
      rank: '优秀反馈奖 5 名',
      name: 'HUAWEI 轻尚双肩包 第二代',
      prizeImg: knapsack,
      list: [
        {
          name: 'HUAWEI 轻尚双肩包 第二代',
          phone: '188****5107',
        },
        {
          name: 'HUAWEI 轻尚双肩包 第二代',
          phone: '157****9532',
        },
        {
          name: 'HUAWEI 轻尚双肩包 第二代',
          phone: '18****274@qq.com',
        },
        {
          name: 'HUAWEI 轻尚双肩包 第二代',
          phone: '185****1416',
        },
        {
          name: 'HUAWEI 轻尚双肩包 第二代',
          phone: 'ya***3@chinatelecom.cn',
        },
      ],
    },
    {
      rank: '积极用户奖 30 名',
      name: 'openGauss社区定制水杯',
      prizeImg: cup,
      list: [
        {
          name: 'openGauss社区定制水杯',
          phone: 'ziy****30@163.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '339****844@qq.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '185****9021',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '151****6815',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '159****2730@139.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '186****5257',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '183****1871',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '319****428@qq.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: 'zh****ei@qq.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '132****5860',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: 'liu****hu@tju.edu.cn',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '18****0949@qq.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: 'vo****d@163.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '36****328@qq.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '136****6712',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '194****138@qq.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '138****9751',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '131****0920',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '185****9522',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '151****9230',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '130****3601',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '137****1081@163.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: 'xue****ng08@163.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '188****5346',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '188****5733',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '193****212@qq.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '342****665@qq.com',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '173****1858',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: 'son****sh@nudt.edu.cn',
        },
        {
          name: 'openGauss社区定制水杯',
          phone: '350****205@qq.com',
        },
      ],
    },
  ],

  rule: {
    title: '活动规则',
    ruleList: [
      {
        clause: '1. 活动时间：',
        time: '2023年10月27日 - 2023年12月17日。',
      },
      {
        clause:
          '2. 本次活动的中奖名单将在活动结束后，由专家统一筛选出成功提交问卷并提供有效反馈的用户，从中评选最佳反馈奖与优秀反馈奖，并抽取积极用户奖；若经过专家评审，无满足条件的有效反馈问卷，则奖项轮空。',
      },
      {
        clause:
          '3. 我们将于活动结束后的 10 个工作日内公示获奖用户名单，并通过中奖用户在问卷中留下的联系方式提醒用户领奖，中奖用户需在名单公示后 7 日内提供收件信息，否则中奖结果无效；我们将于中奖名单公示后的 15 个工作日内陆续发放奖品。',
      },
      {
        clause: '4. 本次活动所有奖品颜色随机发放。',
      },
      {
        clause:
          '5. 如用户在活动中存在隐瞒、虚构、作弊、欺诈或通过其他非正常手段规避活动规则、获取不当利益的行为，例如：作弊领取、网络攻击等，openGauss社区有权收回相关权益、取消用户的活动参与资格、撤销违规交易，必要时追究违规用户的法律责任。',
      },
      {
        clause:
          '6. 活动名称仅为方便用户理解参考使用，不具有效力，实际活动内容以具体活动规则为准。',
      },
      {
        clause:
          '7. openGauss社区可以根据活动的实际情况对活动规则进行变动或调整，相关变动或调整将公布在活动页面上，并于公布时即时生效；但不影响用户在活动规则调整前已经获得的权益。',
      },
    ],
  },
};
</script>

<template>
  <div class="questionnaire">
    <div class="questionnaire-banner">
      <template v-if="screenWidth > 1100">
        <img class="banner-bg" :src="banner" alt="" />
        <div class="banner-text">
          <img class="text" :src="bannerText" alt="" />
        </div>
      </template>
      <template v-else>
        <img class="banner-bg-mb" :src="bannerMb" alt="" />
      </template>
    </div>
    <AppContent>
      <div class="panel1">
        <div class="left-text">
          <p v-for="item in data.introduce.textList" :key="item">{{ item }}</p>
        </div>
      </div>
      <div class="panel2" v-if="screenWidth > 1100">
        <div class="rank-head">
          <div class="head-content">
            <div class="left-rank">
              <h4>{{ data.prize[0].rank }}</h4>
              <h5>{{ data.prize[0].name }}</h5>
            </div>
            <div class="right-img">
              <img :src="data.prize[0].prizeImg" alt="" />
            </div>
          </div>
        </div>
        <div class="questionnaire-list">
          <div class="prize-item item-title">
            <div class="item-content">
              <p>奖品</p>
              <p>中奖号码/邮箱</p>
            </div>
          </div>
          <div
            class="prize-item"
            v-for="subitem in data.prize[0].list"
            :key="subitem.phone"
          >
            <div class="item-content">
              <p>{{ subitem.name }}</p>
              <p>{{ subitem.phone }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="panel3" v-else>
        <div class="rank-head">
          <div class="head-content">
            <img :src="data.prize[0].prizeImg" alt="" />
          </div>
        </div>
        <div class="rank-title">
          <h4>{{ data.prize[0].rank }}</h4>
          <h5>{{ data.prize[0].name }}</h5>
        </div>
        <div class="questionnaire-list">
          <div class="prize-item item-title">
            <div class="item-content">
              <p>奖品</p>
              <p>中奖号码/邮箱</p>
            </div>
          </div>
          <div
            class="prize-item"
            v-for="subitem in data.prize[0].list"
            :key="subitem.phone"
          >
            <div class="item-content">
              <p>{{ subitem.name }}</p>
              <p>{{ subitem.phone }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="panel3" v-for="item in data.prize.slice(1)" :key="item.name">
        <div class="rank-head">
          <div class="head-content">
            <img :src="item.prizeImg" alt="" />
          </div>
        </div>
        <div class="rank-title">
          <h4>{{ item.rank }}</h4>
          <h5>{{ item.name }}</h5>
        </div>
        <div class="questionnaire-list">
          <div class="prize-item item-title">
            <div class="item-content">
              <p>奖品</p>
              <p>中奖号码/邮箱</p>
            </div>
          </div>
          <div
            class="prize-item"
            v-for="subitem in item.list"
            :key="subitem.phone"
          >
            <div class="item-content">
              <p>{{ subitem.name }}</p>
              <p>{{ subitem.phone }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="rule">
        <h2 class="questionnaire-title">{{ data.rule.title }}</h2>
        <ol>
          <li v-for="item in data.rule.ruleList" :key="item.clause">
            <p>
              {{ item.clause }}
              <strong v-if="item.time">{{ item.time }}</strong>
            </p>
          </li>
        </ol>
      </div>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
.questionnaire-list {
  padding: 0 40px;
  @media screen and (max-width: 1100px) {
    padding: 0;
  }
  .prize-item {
    border-bottom: 1px solid var(--o-color-border2);
    .item-content {
      width: 100%;
      max-width: 800px;
      padding: 0 32px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 1100px) {
        padding: 0 16px;
      }
      p {
        font-size: 16px;
        line-height: 64px;
        color: var(--o-color-text4);
        text-align: left;
        @media screen and (max-width: 1100px) {
          font-size: 14px;
          line-height: 16px;
          padding: 12px 0;
        }
        &:nth-of-type(2){
          width: 200px;
          transform: translateX(96px);
          @media screen and (max-width: 1100px) {
            max-width: 200px;
          transform: translateX(0);
        }
        @media screen and (max-width: 500px) {
          margin-left: 12px;
        width: 50%;
          transform: translateX(0);
        }
        }
      }
    }
    &.item-title {
      .item-content {
        p {
          color: var(--o-color-text1);
          font-weight: 700;
        }
      }
    }
  }
}
.questionnaire {
  .questionnaire-banner {
    width: 100%;
    height: 280px;
    position: relative;
    @media screen and (max-width: 1439px) {
      height: auto;
    }
    .banner-bg {
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
      user-select: none;
      pointer-events: none;
    }
    .banner-text {
      position: relative;
      max-width: 1504px;
      margin: 0 auto;
      padding: 0 44px;
      display: flex;
      justify-content: space-between;
      min-height: 280px;
      padding-top: 80px;
      .text {
        width: 696px;
        height: 84px;
      }
    }
    .banner-bg-mb {
      width: 100%;
    }
  }
  .panel1 {
    width: 100%;
    padding: 40px 68px;
    display: flex;
    background: var(--o-color-bg2)
      url(@/assets/category/questionnaire/2023/bg1.png) no-repeat center/cover;
    box-shadow: var(--o-shadow-l2);
    justify-content: center;
    font-size: 14px;
    line-height: 22px;
    @media screen and (max-width: 1100px) {
      font-size: 12px;
      line-height: 18px;
      padding: 24px 16px;
      background-image: url(@/assets/category/questionnaire/2023/bg1-mo.png);
    }
  }
  .panel2 {
    margin-top: 118px;
    width: 100%;
    padding: 0 0 64px;
    position: relative;
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l2);
    @media screen and (max-width: 1100px) {
      padding: 0 0 24px;
    }
    .rank-head {
      padding: 48px 0;
      background: var(--o-color-bg2)
        url(@/assets/category/questionnaire/2023/bg2.png) no-repeat top center;
      @media screen and (max-width: 1100px) {
        background: var(--o-color-bg2)
          url(@/assets/category/questionnaire/2023/bg-mo.png) no-repeat top
          center;
      }
      .head-content {
        display: flex;
        width: 100%;
        max-width: 800px;
        padding: 0 0 0 32px;
        justify-content: space-between;
        margin: 0 auto;
        .left-rank {
          h4 {
            font-size: 32px;
            line-height: 40px;
            color: var(--o-color-brand1);
            font-weight: normal;
            @media screen and (max-width: 1100px) {
              font-size: 20px;
              line-height: 28px;
            }
          }
          h5 {
            margin-top: 32px;
            font-size: 24px;
            line-height: 32px;
            color: var(--o-color-text4);
            font-weight: normal;
            @media screen and (max-width: 1100px) {
              font-size: 20px;
              line-height: 28px;
            }
          }
        }
        .right-img {
          position: relative;
          img {
            position: absolute;
            height: 240px;
            bottom: -36px;
            right: 0;
            &:nth-of-type(2) {
              margin-left: 12px;
            }
          }
        }
      }
    }
  }
  .panel3 {
    margin-top: 64px;
    width: 100%;
    padding: 0 0 64px;
    position: relative;
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l2);
    @media screen and (max-width: 1100px) {
      margin-top: 24px;
      padding: 0 0 24px;
    }
    .rank-head {
      padding: 16px 0;
      background: var(--o-color-bg2)
        url(@/assets/category/questionnaire/2023/bg2.png) no-repeat top center;
        @media screen and (max-width: 1100px) {
          background: var(--o-color-bg2)
        url(@/assets/category/questionnaire/2023/bg-mo.png) no-repeat top center;
          }
      .head-content {
        display: flex;
        width: 100%;
        max-width: 800px;
        justify-content: center;
        margin: 0 auto;
        img {
          height: 168px;
          @media screen and (max-width: 1100px) {
            height: 128px;
          }
        }
      }
    }
    .rank-title {
      padding: 24px 0;
      h4 {
        font-size: 28px;
        line-height: 40px;
        color: var(--o-color-brand1);
        font-weight: normal;
        text-align: center;
        @media screen and (max-width: 1100px) {
          font-size: 20px;
          line-height: 28px;
        }
      }
      h5 {
        margin-top: 16px;
        font-size: 18px;
        line-height: 32px;
        color: var(--o-color-text4);
        font-weight: normal;
        text-align: center;
        @media screen and (max-width: 1100px) {
          margin-top: 8px;
          font-size: 20px;
          line-height: 28px;
        }
      }
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
    .questionnaire-title {
      font-size: 32px;
      line-height: var(--o-line-height-h5);
      text-align: center;
      color: var(--o-color-text1);
      @media screen and (max-width: 1100px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }

    ol {
      margin-top: var(--o-spacing-h3);
      @media screen and (max-width: 1100px) {
        margin-top: var(--o-spacing-h5);
      }
      li {
        & ~ li {
          margin-top: var(--o-line-height-h7);
          @media screen and (max-width: 1100px) {
            margin-top: var(--o-line-height-tip);
          }
        }
        p {
          font-size: var(--o-font-size-h7);
          font-weight: 400;
          color: var(--o-color-text4);
          line-height: var(--o-line-height-h7);
          @media screen and (max-width: 1100px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            text-align: justify;
          }
        }
      }
    }
  }
}
</style>
