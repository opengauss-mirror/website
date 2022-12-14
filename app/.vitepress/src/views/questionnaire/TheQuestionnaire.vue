<script lang="ts" setup>
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/category/questionnaire/banner.jpg';
// import bannerMo from '@/assets/category/questionnaire/banner-mo.png';
import code from '@/assets/category/questionnaire/code.png';
import pad from '@/assets/category/questionnaire/pad.png';
import watch from '@/assets/category/questionnaire/watch.png';
import book from '@/assets/category/questionnaire/book.png';
import cap from '@/assets/category/questionnaire/cap.png';
// import floating from '@/assets/category/questionnaire/floating.png';

const data = {
  title: '2022年度社区满意度调研',

  introduce: {
    textList: [
      '亲爱的用户，为了给您提供更好的社区体验，现诚邀您参与openGauss社区满意度问卷调研。您的每一个宝贵建议都是我们进步的方向。',
      '点击右侧“立即参与”按钮或手机扫描二维码即可填写问卷，完成后可随机抽取精美礼品。',
      '请根据您真实的体验情况填写问卷，问卷反馈越真实有效越有机会抽取大奖哦！',
      '我们将于活动结束后的5天内在社区中公布本期活动的所有获奖情况，敬请关注。',
    ],
    btn: '立即参与',
    codeImg: code,
  },
  prize: [
    {
      rank: '一等奖 2 名',
      name: 'HUAWEI MatePad SE',
      prizeImg: pad,
    },
    {
      rank: '二等奖 6 名',
      name: '华为手环7 标准版',
      prizeImg: watch,
    },
    {
      rank: '三等奖 30 名',
      name: '《openGauss数据库核心技术》 或 社区定制鸭舌帽',
      prizeImg: book,
      prizeImg1: cap,
    },
  ],
};
</script>

<template>
  <div class="questionnaire">
    <BannerLevel2 :background-image="banner" :title="data.title" />
    <AppContent>
      <div class="panel1">
        <div class="left-text">
          <p v-for="item in data.introduce.textList" :key="item">{{ item }}</p>
        </div>
        <div class="right-img">
          <img :src="data.introduce.codeImg" alt="" />
          <a
            href="https://huaweicompute.wjx.cn/vm/mnDjPR2.aspx?udsid=238148"
            target="_blank"
          >
            <OButton class="join-btn" size="mini" animation type="primary">{{
              data.introduce.btn
            }}</OButton>
          </a>
        </div>
      </div>
      <div class="panel2">
        <div class="left-rank">
          <h4>{{ data.prize[0].rank }}</h4>
          <p>{{ data.prize[0].name }}</p>
        </div>
        <div class="right-img">
          <img :src="data.prize[0].prizeImg" alt="" />
        </div>
      </div>
      <div class="panel2-mo">
        <div class="head">
          <img :src="data.prize[0].prizeImg" alt="" />
        </div>
        <div class="body">
          <h4>{{ data.prize[0].rank }}</h4>
          <p>{{ data.prize[0].name }}</p>
        </div>
      </div>
      <div class="panel3">
        <div class="prize-box">
          <div class="head">
            <img :src="data.prize[1].prizeImg" alt="" />
          </div>
          <div class="body">
            <h4>{{ data.prize[1].rank }}</h4>
            <p>{{ data.prize[1].name }}</p>
          </div>
        </div>
        <div class="prize-box">
          <div class="head">
            <img :src="data.prize[2].prizeImg" alt="" />
            <img :src="data.prize[2].prizeImg1" alt="" />
          </div>
          <div class="body">
            <h4>{{ data.prize[2].rank }}</h4>
            <p>{{ data.prize[2].name }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="asider">
        <img :src="floating" alt="" />
      </div> -->
      <div class="markdown markdown-qu">
        <slot></slot>
      </div>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
// .dark {
//   .panel1,
//   .panel2 {
//     filter: brightness(0.8) grayscale(0.2) contrast(1.2);
//   }
// }
.markdown-qu {
  background-color: var(--o-color-bg1);
  box-shadow: none;
  padding: 0;
  margin: 0;
  margin-top: var(--o-spacing-h1);
  min-height: auto;
  @media screen and (max-width: 1100px) {
    margin-top: var(--o-spacing-h2);
  }
  :deep(h2) {
    text-align: center;
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
    margin-right: 58px;
    @media screen and (max-width: 1100px) {
      margin-right: 0;
    }
    p {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      color: var(--o-color-text1);
      @media screen and (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      &:nth-of-type(2),
      &:nth-of-type(4) {
        margin-top: var(--o-spacing-h4);
        @media screen and (max-width: 1100px) {
          margin-top: var(--o-spacing-h5);
        }
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
  padding: var(--o-spacing-h5) 0;
  display: flex;
  background: var(--o-color-bg2) url(@/assets/category/questionnaire/bg2.png)
    no-repeat center/cover;
  justify-content: center;
  box-shadow: var(--o-shadow-l2);
  @media screen and (max-width: 1100px) {
    display: none;
  }
  .left-rank {
    padding-top: 52px;
    margin-right: var(--o-spacing-h1);
    h4 {
      font-size: 32px;
      line-height: 40px;
      color: var(--o-color-brand1);
      font-weight: normal;
    }
    p {
      margin-top: var(--o-spacing-h3);
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      color: var(--o-color-text4);
    }
  }
  .right-img {
    img {
      height: 176px;
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
        height: 168px;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--o-spacing-h4);
  @media screen and (max-width: 1100px) {
    margin-top: var(--o-spacing-h5);
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
