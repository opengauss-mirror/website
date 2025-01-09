<script setup lang="ts">
import { computed, ref } from 'vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import honorData from '@/data/honor';
import { windowOpen } from '@/shared/utils';
import useWindowResize from '@/components/hooks/useWindowResize';

import banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/honor.png';
import emailImg from '@/assets/category/member/toemail.svg';
import opengaussIcon from '@/assets/category/honor/opengauss-icon.png';

import IconChecked from '~icons/app/icon-checked.svg';
import IconUnchecked from '~icons/app/icon-unchecked.svg';
import IconRight from '~icons/app/icon-arrow-right.svg';

const activeYear = ref('2024');
const showNumber = ref(-1);
const useClickTab = (year: string) => {
  activeYear.value = year;
};
const clickBtn = (href: string) => {
  windowOpen(href, '_blank');
};
const clickDetail = (index: number) => {
  showNumber.value = index;
};

const showedCommentKey = ref(-1);
const showPersonCard = (key: number) => {
  showedCommentKey.value = showedCommentKey.value === key ? -1 : key;
};

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));
const getCertificateBoxGridTemplateColumns = (
  length: number,
  isMobile: boolean
) => {
  if (isMobile) {
    return 'repeat(1, 1fr)';
  }
  return `repeat(${length < 3 ? length : 3}, minmax(0, 456px))`;
};
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :title="honorData.title"
    :illustration="illustration"
  />
  <ul class="h5-time">
    <li
      v-for="item in honorData.honorList"
      :key="item.id"
      :class="activeYear === item.id ? 'active' : ''"
      @click="useClickTab(item.id)"
    >
      {{ item.id }}
    </li>
  </ul>
  <AppContent>
    <div class="honor-time">
      <ul class="o-timeline-list pc-time">
        <li
          v-for="item in honorData.honorList"
          :key="item.id"
          class="o-timeline-item"
          :class="activeYear === item.id ? 'active' : ''"
          @click="useClickTab(item.id)"
        >
          <p class="o-timeline-day">{{ item.id }}</p>
          <IconChecked v-if="activeYear === item.id" class="o-timeline-icon" />
          <IconUnchecked v-else class="o-timeline-icon" />
        </li>
      </ul>
    </div>
    <div class="content">
      <template v-for="item in honorData.honorList" :key="item.id">
        <div
          v-show="activeYear === item.id"
          class="certificate-box"
          :style="`grid-template-columns: ${getCertificateBoxGridTemplateColumns(
            item.data.length,
            isMobile
          )}`"
        >
          <OCard
            v-for="(subItem, index) in item.data"
            :key="subItem.name"
            class="certificate-item"
          >
            <p>{{ subItem.name }}</p>
            <OButton
              v-if="subItem.href"
              class="detail-btn"
              type="text"
              animation
              size="nomral"
              @click="clickBtn(subItem.href)"
            >
              {{ honorData.readNews }}
              <template #suffixIcon>
                <OIcon class="detail-icon">
                  <IconRight />
                </OIcon>
              </template>
            </OButton>
            <OButton
              v-if="subItem.img"
              class="detail-btn"
              type="text"
              animation
              size="nomral"
              @click="clickDetail(index)"
            >
              {{ honorData.viewCertificate }}
              <template #suffixIcon>
                <OIcon class="detail-icon">
                  <IconRight />
                </OIcon>
              </template>
            </OButton>
            <div
              v-if="showNumber === index"
              class="certificate"
              @click="clickDetail(-1)"
            >
              <img :class="'img' + index" :src="subItem.img" alt="" />``
            </div>
          </OCard>
        </div>
      </template>

      <div class="excellent-panel">
        <template v-for="item in honorData.honorList" :key="item.id">
          <template v-if="activeYear === item.id">
            <!-- openGauss 年度优秀开发者 -->
            <div v-if="item.developerData">
              <h1 class="honor-title">
                {{ honorData.excellentDeveloperTitle }}
              </h1>
              <div class="developer-wrap">
                <div
                  class="developer-card"
                  v-for="(devItem, idx) in item.developerData"
                  :key="idx"
                >
                  <h2 v-if="devItem.name" class="developer-title">
                    {{ devItem.name }}
                  </h2>
                  <ul class="member-list">
                    <li v-for="(user, i) in devItem.mebmers" :key="i">
                      <img class="avatar" :src="user.avatar" :alt="user.name" />
                      <p class="m-name" :title="user.name">{{ user.name }}</p>
                      <p
                        class="m-company m-company-multi-line"
                        :title="user.company"
                      >
                        {{ user.company }}
                      </p>
                      <p class="links" v-if="user.showEmail">
                        <a :href="`mailto:${user.email}`"
                          ><img class="img-email" :src="emailImg"
                        /></a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="rules">
                <div
                  v-for="(rule, i) in item.devoloperRules"
                  :key="i"
                  :class="rule.type === 'tip' ? 'tip' : ''"
                >
                  {{ rule.value }}
                </div>
              </div>
            </div>

            <!-- openGauss 年度优秀SIG -->
            <div v-if="item.sigData">
              <h1
                class="honor-title"
                :class="
                  item.id === '2022' ? 'common-title-2022' : 'common-title'
                "
              >
                {{ honorData.excellentSigTitle }}
              </h1>
              <div class="sig-wrap">
                <div
                  v-for="sig in item.sigData"
                  :key="sig.name"
                  class="sig-card"
                >
                  <h1 class="sig-title" :title="sig.name">{{ sig.name }}</h1>
                  <OButton
                    class="repo-detail-btn"
                    type="text"
                    animation
                    size="nomral"
                    @click="clickBtn(sig.href)"
                  >
                    项目地址
                    <template #suffixIcon>
                      <OIcon class="repo-detail-icon">
                        <IconRight />
                      </OIcon>
                    </template>
                  </OButton>
                </div>
              </div>

              <div class="rules">
                <div
                  v-for="(rule, i) in item.sigRules"
                  :key="i"
                  :class="rule.type === 'tip' ? 'tip' : ''"
                >
                  {{ rule.value }}
                </div>
              </div>
            </div>

            <!-- openGauss 优秀企业贡献奖 -->
            <div v-if="item.enterpriseData">
              <h1 class="honor-title common-title">
                {{ item.excellentEnterpriseTitle }}
              </h1>
              <div class="enterprise-wrap">
                <div
                  v-for="enterprise in item.enterpriseData"
                  :key="enterprise.firstName + enterprise.secondName"
                  class="enterprise-card"
                >
                  <img class="gauss-icon" :src="opengaussIcon" />
                  <p class="enterprise-title">荣誉证书</p>
                  <div
                    class="enterprise-title-wrap"
                    :title="enterprise.firstName + enterprise.secondName"
                  >
                    <template v-if="isMobile">
                      <p class="enterprise-title">
                        {{ enterprise.firstName }}{{ enterprise.secondName }}
                      </p>
                    </template>
                    <template v-else>
                      <p class="enterprise-title">
                        {{ enterprise.firstName }}
                      </p>
                      <p class="enterprise-title">
                        {{ enterprise.secondName }}
                      </p>
                    </template>
                  </div>
                  <p class="enterprise-prize-title">
                    {{ item.excellentEnterpriseTitle }}
                  </p>
                </div>
              </div>

              <div class="rules">
                <div
                  v-for="(rule, i) in item.enterpriseRules"
                  :key="i"
                  :class="rule.type === 'tip' ? 'tip' : ''"
                >
                  {{ rule.value }}
                </div>
              </div>
            </div>

            <!-- openGauss 优秀个人贡献奖 -->
            <div v-if="item.personData">
              <h1 class="honor-title common-title">
                {{ item.excellentPersonTitle }}
              </h1>
              <div class="person-wrap">
                <div
                  v-for="(person, i) in item.personData"
                  :key="i"
                  class="person-card"
                  @mouseenter="showPersonCard(i)"
                  @mouseleave="showPersonCard(-1)"
                >
                  <div>
                    <img
                      class="avatar"
                      :src="person.avatar"
                      :alt="person.name"
                    />
                  </div>
                  <p class="name">{{ person.name }}</p>
                  <p class="company">{{ person.company }}</p>
                  <Transition name="bounce">
                    <div v-if="showedCommentKey === i" class="comment">
                      <template v-for="c in person.comment">
                        <a
                          v-if="c.startsWith('link: ')"
                          :href="c.replace('link: ', '')"
                          class="link"
                          target="_blank"
                          @click.stop
                          >{{ c.replace('link: ', '') }}</a
                        >
                        <p v-else @click.stop>{{ c }}</p>
                      </template>
                    </div>
                  </Transition>
                </div>
              </div>

              <div class="rules">
                <div
                  v-for="(rule, i) in item.personRules"
                  :key="i"
                  :class="rule.type === 'tip' ? 'tip' : ''"
                >
                  {{ rule.value }}
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.honor-time {
  .o-timeline-list {
    max-width: 660px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .o-timeline-item {
      position: relative;
      z-index: 3;
      list-style: none;
      text-align: center;
      cursor: pointer;

      .o-timeline-day {
        font-size: var(--o-font-size-h6);
        color: var(--o-color-text4);
        line-height: var(--o-line-height-h6);
        margin-bottom: var(--o-spacing-h10);
        transition: all 0.2s;
      }

      .o-timeline-icon {
        cursor: pointer;
        width: var(--o-font-size-h5);
        height: var(--o-font-size-h5);
        color: var(--o-color-text4);
        display: inline-block;
        background-color: var(--o-color-bg1);
        transition: all 0.2s;
      }

      &.active .o-timeline-day,
      &.active .o-timeline-icon {
        color: var(--o-color-brand1);
      }
    }

    &::after {
      width: 89%;
      height: 2px;
      background-color: var(--o-color-neutral11);
      content: '';
      display: block;
      position: absolute;
      top: 43px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }
  }

  .pc-time {
    @media (max-width: 768px) {
      display: none;
    }
  }
}

.h5-time {
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--o-color-bg2);
    height: 34px;
  }

  li {
    font-size: var(--o-font-size-text);
    line-height: 34px;
    color: var(--o-color-text1);
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: transparent;
    }
  }

  .active {
    color: var(--o-color-brand1);

    &::after {
      background-color: var(--o-color-brand1);
    }
  }
}

.content {
  margin-top: var(--o-spacing-h3);

  @media (max-width: 768px) {
    margin-top: 0;
  }

  .certificate-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--o-spacing-h4);
    justify-content: center;

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      gap: var(--o-spacing-h5);
    }

    .certificate-item {
      background-image: url(@/assets/category/honor/bg.png);
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      padding: var(--o-spacing-h2);

      @media (max-width: 768px) {
        padding: var(--o-spacing-h5);
      }

      :deep(.el-card__body) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 0;
      }

      p {
        min-height: 64px;
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        color: var(--o-color-text1);
        font-weight: 500;
        @media (max-width: 768px) {
          max-width: 100%;
          min-height: auto;
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
        }
      }

      .detail-btn {
        margin-top: 26px;
        padding-left: 0;
        padding-bottom: 0;
        color: var(--o-color-text3);
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);

        @media (max-width: 768px) {
          margin-top: 24px;
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          padding-bottom: 0;
          padding-top: 0;
        }

        .detail-icon {
          color: var(--o-color-brand1);
          font-size: 16px;
        }
      }

      .certificate {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 72vh;
          position: relative;

          @media (max-width: 768px) {
            width: 80%;
            height: auto;
          }
        }
      }
    }
  }

  .excellent-panel {
    padding: var(--o-spacing-h1) 0 0 0;
    color: var(--o-color-text1);
    font-family: PingFangSC-Regular;

    @media (max-width: 768px) {
      padding: var(--o-spacing-h5) 0 0 0;
    }

    .honor-title {
      margin-bottom: var(--o-spacing-h2);
      line-height: var(--o-line-height-h3);
      text-align: center;
      font-size: var(--o-font-size-h3);
      font-weight: 200;
      font-family: PingFangSC-Light;

      @media (max-width: 768px) {
        margin-bottom: var(--o-spacing-h5);
        font-size: var(--o-font-size-h7);
      }
    }

    .common-title-2022 {
      margin-top: 172px;
    }

    .common-title {
      margin-top: var(--o-spacing-h1);
    }

    .rules {
      margin-top: var(--o-spacing-h4);
      line-height: 16px;
      font-size: var(--o-font-size-tip);
      color: #4d4d4d;

      .tip {
        margin-bottom: var(--o-spacing-h8);
      }
    }

    .avatar {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }

    .developer-wrap {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--o-spacing-h4);

      .developer-card:first-child {
        grid-column: 1 / span 2;

        @media (max-width: 768px) {
          grid-column: auto;
        }
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
        gap: var(--o-spacing-h5);
      }

      .developer-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--o-spacing-h2);
        background: var(--o-color-bg2);
        box-shadow: 0 1px 5px 0 rgba(45, 47, 51, 0.1);

        @media (max-width: 768px) {
          padding: var(--o-spacing-h4);
          grid-column: auto;
        }

        .developer-title {
          margin-bottom: var(--o-spacing-h4);
          text-align: center;
          font-size: var(-o-font-size-h5);
          font-weight: 500;

          @media (max-width: 768px) {
            font-size: var(--o-font-size-h7);
          }
        }

        .member-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, 100px);
          gap: 0 64px;
          width: 100%;
          justify-content: center;

          @media (max-width: 768px) {
            gap: 0 32px;
          }

          li {
            vertical-align: top;
            text-align: center;

            .m-name {
              margin-top: var(--o-spacing-h8);
              font-size: var(--o-font-size-h8);
              line-height: var(--o-line-height-h8);
            }

            .m-company {
              min-height: var(--o-line-height-h4);
              margin-top: var(--o-spacing-h10);
              color: #999999;
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              text-align: center;
            }

            .m-company-multi-line {
              max-width: 100px;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            p {
              font-size: var(-o-font-size-h8);
              line-height: var(--o-line-height-h8);
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }

            .links {
              margin-top: var(--o-spacing-h8);
              padding: 4px 2px;
              text-align: center;

              .img-email {
                width: 20px;
                height: 16px;
              }
            }
          }
        }
      }
    }

    .sig-wrap {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--o-spacing-h4);

      @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
        gap: var(--o-spacing-h5);
      }

      .sig-card {
        padding: var(--o-spacing-h4) var(--o-spacing-h3);
        background-color: var(--o-color-bg2);
        background-image: url(@/assets/category/honor/sig-item-bg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-shadow: 0 1px 5px 0 rgba(45, 47, 51, 0.1);

        @media (max-width: 768px) {
          padding: var(--o-spacing-h5) var(--o-spacing-h4);
          gap: var(--o-spacing-h5);
        }

        .sig-title {
          font-size: var(--o-font-size-h5);
          letter-spacing: 0;
          line-height: var(--o-line-height-h5);
          font-weight: 500;

          @media (max-width: 768px) {
            font-size: var(--o-font-size-h6);
            line-height: var(--o-line-height-h6);
          }
        }

        .repo-detail-btn {
          margin-top: var(--o-spacing-h6);
          padding-left: 0;
          padding-bottom: 0;
          color: var(--o-color-text3);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          font-family: PingFangSC-Regular;

          @media (max-width: 768px) {
            margin-top: 24px;
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            padding-bottom: 0;
            padding-top: 0;
          }

          .repo-detail-icon {
            color: var(--o-color-brand1);
            font-size: var(--o-font-size-h8);
          }
        }
      }
    }

    .enterprise-wrap {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--o-spacing-h4);

      @media (max-width: 1500px) {
        grid-template-columns: repeat(4, 1fr);
      }

      @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--o-spacing-h6);
      }

      .enterprise-card {
        padding: 25px 10px 16px;
        background: var(--o-color-bg2);
        box-shadow: 0 1px 5px 0 rgba(45, 47, 51, 0.1);
        background-color: var(--o-color-bg2);
        background-image: url(@/assets/category/honor/enterprise-item-bg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        text-align: center;
        color: #ffd499;

        @media (max-width: 768px) {
          padding: 16px 8px 8px;
          line-height: var(--o-line-height-text);
          font-size: var(--o-font-size-text);
        }

        .gauss-icon {
          width: 50px;
          height: 40px;
          margin-bottom: 4px;
        }

        .enterprise-title-wrap {
          min-height: 52px;
          margin: 40px 0 90px;

          @media (max-width: 768px) {
            min-height: 44px;
            margin: 12px 0 30px;
          }
        }

        .enterprise-title {
          line-height: var(--o-line-height-h7);
          font-size: var(--o-font-size-h7);
          font-weight: 500;

          @media (max-width: 900px) {
            line-height: var(--o-line-height-h8);
            font-size: var(--o-font-size-h8);
          }

          @media (max-width: 768px) {
            line-height: var(--o-line-height-text);
            font-size: var(--o-font-size-text);
          }
        }

        .enterprise-prize-title {
          line-height: var(--o-line-height-h8);
          font-size: var(--o-font-size-h8);

          @media (max-width: 900px) {
            line-height: var(--o-line-height-text);
            font-size: var(--o-font-size-text);
          }

          @media (max-width: 768px) {
            font-size: 10px;
          }
        }
      }
    }

    .person-wrap {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--o-spacing-h4);
      font-family: PingFangSC-Regular;

      @media (max-width: 1500px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
        gap: var(--o-spacing-h5);
      }

      .person-card {
        position: relative;
        padding: 102px 118px;
        background: var(--o-color-bg2);
        box-shadow: 0 1px 5px 0 rgba(45, 47, 51, 0.1);
        text-align: center;
        overflow: visible;

        .name {
          margin-top: var(--o-spacing-h8);
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
        }

        .company {
          margin-top: var(--o-spacing-h8);
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          color: #999999;
        }

        .comment {
          z-index: 1;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 16px;
          line-height: 20px;
          background: #2d0a60;
          color: var(--o-color-white);
          opacity: 0.9;
          font-size: var(--o-font-size-text);
          text-align: left;

          @media (max-width: 768px) {
            font-size: var(--o-font-size-tip);
          }

          .link {
            word-wrap: break-word;
            word-break: break-all;
            color: white;
          }
        }
      }
    }
  }
}

.bounce-enter-active {
  animation: anim-bounce-in 0.2s;
}
.bounce-leave-active {
  animation: anim-bounce-in 0.1s reverse;
}

@keyframes anim-bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
