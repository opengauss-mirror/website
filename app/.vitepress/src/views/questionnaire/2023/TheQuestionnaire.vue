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
      '亲爱的用户，为了给您提供更好的社区体验，现诚邀您参与openGauss社区满意度问卷调研。您的每一个宝贵建议都是我们进步的方向。',
      '点击右侧“立即参与”按钮或手机扫描二维码即可填写问卷，请根据您真实的体验情况填写问卷，问卷反馈越真实有效越有机会抽取大奖哦！',
      '我们将于活动结束后的 10 个工作日内在社区中公布本期活动的所有获奖情况，敬请关注。',
    ],
    joinLink: HUAWEI_COMPUTE + 'vm/mLFTkDm.aspx?udsid=817974',
  },
  prize: [
    {
      rank: '最佳反馈奖 1 名',
      name: 'HUAWEI WATCH GT 4',
      prizeImg: watch,
    },
    {
      rank: '优秀反馈奖 5 名',
      name: 'HUAWEI 轻尚双肩包 第二代',
      prizeImg: knapsack,
    },
    {
      rank: '积极用户奖 30 名',
      name: 'openGauss社区定制水杯',
      prizeImg: cup,
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
      <div class="questionnaire-introduce">
        <div class="left-text">
          <p v-for="item in data.introduce.textList" :key="item">{{ item }}</p>
        </div>
        <div class="right-img">
          <img class="code-img" :src="code" alt="" />
          <a
            :href="data.introduce.joinLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OButton
              class="join-btn"
              type="primary"
              :size="screenWidth > 1100 ? 'middle' : 'mini'"
            >
              立即参与
            </OButton>
          </a>
        </div>
      </div>
      <div class="questionnaire-prize1">
        <template v-if="screenWidth > 1100">
          <div class="prize-content">
            <div class="prize-text">
              <p class="prize-name">{{ data.prize[0].rank }}</p>
              <p class="award-name">{{ data.prize[0].name }}</p>
            </div>
            <div class="prize-img">
              <img :src="data.prize[0].prizeImg" alt="" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="prize-head">
            <img :src="data.prize[0].prizeImg" alt="" />
          </div>
          <div class="prize-body">
            <p class="prize-name">{{ data.prize[0].rank }}</p>
            <p class="award-name">{{ data.prize[0].name }}</p>
          </div>
        </template>
      </div>
      <div class="questionnaire-prize2">
        <div class="prize-box">
          <div class="prize-head">
            <img :src="data.prize[1].prizeImg" alt="" />
          </div>
          <div class="prize-body">
            <p class="prize-name">{{ data.prize[1].rank }}</p>
            <p class="award-name">{{ data.prize[1].name }}</p>
          </div>
        </div>
        <div class="prize-box">
          <div class="prize-head">
            <img :src="data.prize[2].prizeImg" alt="" />
          </div>
          <div class="prize-body">
            <p class="prize-name">{{ data.prize[2].rank }}</p>
            <p class="award-name">{{ data.prize[2].name }}</p>
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
  .questionnaire-introduce {
    width: 100%;
    padding: 0 64px;
    display: flex;
    background: var(--o-color-bg2)
      url(@/assets/category/questionnaire/2023/bg1.png) no-repeat center/cover;
    box-shadow: var(--o-shadow-l2);
    justify-content: space-between;
    @media screen and (max-width: 1100px) {
      padding: 24px 16px;
      display: block;
      background-image: url(@/assets/category/questionnaire/2023/bg1-mo.png);
    }
    .left-text {
      padding: 40px 0;
      max-width: 930px;
      @media screen and (max-width: 1100px) {
        padding: 0;
      }
      p {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-h7);
        color: var(--o-color-text1);
        text-align: justify;
        &:nth-of-type(2) {
          margin-top: 24px;
          @media screen and (max-width: 1100px) {
            margin-top: 16px;
          }
        }
        &:nth-last-of-type(1) {
          margin-top: 24px;
          @media screen and (max-width: 1100px) {
            margin-top: 16px;
          }
        }
        @media screen and (max-width: 1100px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
    }
    .right-img {
      width: 114px;
      padding: 28px 0;
      margin-right: 190px;
      @media screen and (max-width: 1100px) {
        width: 100%;
        margin: 0;
        padding: 0;
        margin-top: 16px;
      }
      img {
        width: 100%;
        display: block;
        @media screen and (max-width: 1100px) {
          width: 126px;
          margin: 0 auto;
        }
      }
      a {
        display: block;
        margin-top: var(--o-spacing-h8);
        @media screen and (max-width: 1100px) {
          width: 104px;
          margin: 8px auto 0;
        }
        .join-btn {
          width: 100%;
          padding: 8px 0;
          justify-content: center;
          @media screen and (max-width: 1100px) {
            font-size: var(--o-font-size-text);
          }
        }
      }
    }
  }
  .questionnaire-prize1 {
    margin-top: 64px;
    width: 100%;
    height: 200px;
    box-shadow: var(--o-shadow-l2);
    background-image: url('@/assets/category/questionnaire/2023/bg-prize1.png');
    background-size: cover;
    padding: 0 200px;
    @media screen and (max-width: 1100px) {
      margin-top: 40px;
      height: auto;
      display: block;
      padding: 0;
    }
    .prize-content {
      display: flex;
      justify-content: space-between;
      width: 736px;
      margin: 0 auto;
      .prize-text {
        padding: 48px 0;
        .prize-name {
          font-size: 32px;
          line-height: 40px;
          color: var(--o-color-brand1);
        }
        .award-name {
          margin-top: 32px;
          font-size: var(--o-font-size-h5);
          line-height: var(--o-line-height-h5);
          color: var(--o-color-text1);
        }
      }
      .prize-img {
        position: relative;
        width: 151px;
        img {
          position: absolute;
          height: 240px;
          bottom: 12px;
        }
      }
    }

    .prize-head {
      text-align: center;
      padding: 16px 0;
      background-image: url('@/assets/category/questionnaire/2023/bg-prize2.png');
      background-size: cover;
      img {
        height: 168px;
      }
    }
    .prize-body {
      text-align: center;
      padding: 18px 0 16px;
      .prize-name {
        font-size: var(--o-font-size-h6);
        line-height: 30px;
        color: var(--o-color-brand1);
      }
      .award-name {
        margin-top: 8px;
        font-size: var(--o-font-size-text);
        line-height: 30px;
        color: var(--o-color-text1);
      }
    }
  }
  .questionnaire-prize2 {
    margin-top: 64px;
    width: 100%;
    display: flex;
    gap: 20px;
    @media screen and (max-width: 1100px) {
      margin-top: 16px;
      display: block;
    }
    .prize-box {
      box-shadow: var(--o-shadow-l2);
      flex-grow: 1;
      max-width: 696px;
      @media screen and (max-width: 1100px) {
        max-width: 100%;
        & + .prize-box {
          margin-top: 16px;
        }
      }
      .prize-head {
        width: 100%;
        padding: 16px 0;
        background-image: url('@/assets/category/questionnaire/2023/bg-prize2.png');
        background-size: cover;
        display: flex;
        justify-content: center;
        img {
          height: 168px;
        }
      }
      .prize-body {
        text-align: center;
        padding: 24px 0;
        @media screen and (max-width: 1100px) {
          padding: 18px 0 16px;
        }
        .prize-name {
          font-size: var(--o-font-size-h4);
          line-height: 40px;
          color: var(--o-color-brand1);
          @media screen and (max-width: 1100px) {
            font-size: var(--o-font-size-h6);
            line-height: 30px;
          }
        }
        .award-name {
          margin-top: 16px;
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h5);
          color: var(--o-color-text1);
          @media screen and (max-width: 1100px) {
            margin-top: 8px;
            font-size: var(--o-font-size-text);
            line-height: 30px;
          }
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
