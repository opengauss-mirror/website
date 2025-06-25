<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import { GITCODE_LINK } from '@/data/url-config';
import { windowOpen } from '@/shared/utils';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import TrainingNav from './TrainingNav.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/training.png';

import IconArrow from '~icons/train/icon-arrow.svg';
import IconChevronRight from '~icons/app/icon-chevron-right.svg';
import OIcon from 'opendesign/icon/OIcon.vue';
import IconChevronDown from '~icons/app/icon-chevron-down.svg';
import IconChevronUp from '~icons/app/icon-chevron-up.svg';
import IconRight from '~icons/app/icon-arrow-right.svg';

const i18n = useI18n();
const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');
// 右侧导航
const isShowNav = ref(false);
const activeIndex = ref(0);
// 滚动激活导航
const onScrollTop = () => {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  if (scrollTop < 270 || scrollTop > 7200) {
    isShowNav.value = false;
  } else {
    isShowNav.value = true;
  }
  const activeList: Array<number> = [];
  navRef.value.forEach((item: any, index: number) => {
    if (scrollTop + 100 > item.offsetTop) {
      activeList.push(index);
    }
  });
  activeIndex.value = activeList[activeList.length - 1];
};
const navRef: any = ref([]);
const navTitle = (el: any) => {
  navRef.value.push(el);
};
// 控制认证体系点击显示
const isIndex = ref(-1);
function onSystemItemClick(index: number) {
  isIndex.value = index;
  isMoreShow.value = -1;
}
// 控制认证体系介绍中课程大纲中的更多课程内容显示
const isMoreShow = ref(-1);
const isMoreShowMo = ref([false, false, false]);
function onCourseMoreClick(index: number) {
  isMoreShow.value = isMoreShow.value === index ? -1 : index;
}
function onRegistrationClick(url: string) {
  if (url) {
    windowOpen(url);
  }
}
// 控制移动端更多课程内容显示的切换
function onToggleClick(index: number) {
  isMoreShowMo.value[index] = !isMoreShowMo.value[index];
}
onMounted(() => {
  window.addEventListener('scroll', onScrollTop);
});
onUnmounted(() => {
  window.removeEventListener('scroll', onScrollTop);
});
// 控制人才优选显示更多
const talentSelectedIndex = ref(-1);
function onTalentItemClick(index: number) {
  talentSelectedIndex.value = talentSelectedIndex.value === index ? -1 : index;
}
</script>

<template>
  <BannerLevel2 :background-image="Banner" :title="i18n.authentication.title" :illustration="illustration">
    <template #default>
      <a :href="i18n.authentication.signupUrl" target="_self" rel="noopener noreferrer">
        <OButton class="signup-btn" type="outline" animation size="nomral">
          {{ i18n.authentication.signupTitle }}
          <template #suffixIcon>
            <OIcon class="banner-icon"><IconRight /></OIcon>
          </template>
        </OButton>
      </a>
    </template>
  </BannerLevel2>
  <AppContent>
    <div class="training-pc">
      <TrainingNav v-show="isShowNav" class="titlenav" :current-index="activeIndex" :data-list="i18n.authentication.navList" />
      <div id="introduction" :ref="navTitle" class="train-introduction">
        <h2>{{ i18n.authentication.introtitle }}</h2>
        <p class="intro-info">{{ i18n.authentication.intro1 }}<br />{{ i18n.authentication.intro2 }}</p>
      </div>
      <div id="advantage" :ref="navTitle" class="train-advantage">
        <h2>{{ i18n.authentication.advantage }}</h2>
        <div class="adv-box">
          <div v-for="item in i18n.authentication.adv" :key="item.advTitle" class="adv-item" :class="item.dark">
            <h3>{{ item.advTitle }}</h3>
            <p>{{ item.advDes1 }}</p>
            <p>{{ item.advDes2 }}</p>
          </div>
        </div>
      </div>
      <div id="system" :ref="navTitle" class="train-system">
        <h2>{{ i18n.authentication.systemtitle }}</h2>
        <div class="system-box lable-name">
          <div v-show="isIndex === -1" class="system-short">
            <div v-for="(item, index) in i18n.authentication.system" :key="item.level" class="system-item lable-name" @click="onSystemItemClick(index)">
              <div class="item-head" :class="item.name">
                <div class="head-left lable-name">{{ item.level }}</div>
                <div class="head-right">
                  <h3>{{ item.name.toUpperCase() }}</h3>
                  <p>{{ item.des }}</p>
                </div>
              </div>
              <div class="item-body">
                <div>
                  <p class="course-title">{{ item.contenttitle }}</p>
                  <p class="course-detail">{{ item.content }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in i18n.authentication.system" :key="item.name" class="system-active lable-name" :class="'system-' + item.name">
            <div v-show="isIndex === index">
              <div class="item-head" @click="onSystemItemClick(-1)">
                <div class="leavel">{{ item.level }}</div>
                <div class="name lable-name">
                  <h3>{{ item.name.toUpperCase() }}</h3>
                  <p>{{ item.des }}</p>
                </div>
                <div class="detail">{{ item.description }}</div>
                <div class="close lable-name">
                  <OIcon>
                    <IconArrow />
                  </OIcon>
                </div>
              </div>
              <div class="item-body">
                <p class="title">{{ item.outline }}</p>
                <ul v-if="Array.isArray(item.courseOutline)">
                  <li
                    v-for="(itemCourse, indexCourse) in item.courseOutline"
                    :key="itemCourse.cardtitle"
                    :class="isMoreShow === indexCourse ? 'checked' : 'no-checked'"
                    @click="onCourseMoreClick(indexCourse)"
                  >
                    <div class="list-left">
                      <div class="order">{{ itemCourse.num }}</div>
                      <div class="course">
                        <p>{{ itemCourse.cardtitle }}</p>
                      </div>
                    </div>
                    <div class="list-right lable-name">
                      <span class="more">{{ i18n.authentication.more }}</span>
                      <OIcon>
                        <IconChevronRight />
                      </OIcon>
                    </div>
                    <transition name="fade lable-name">
                      <div v-show="isMoreShow === indexCourse" class="more-list">
                        <p v-for="itemDes in itemCourse.desList" :key="itemDes">
                          {{ itemDes }}
                        </p>
                      </div>
                    </transition>
                  </li>
                </ul>
                <div v-else class="no-data lable-name">
                  <img src="@/assets/category/authentication/training/img/empty.png" alt="" />
                  <p class="tip">{{ i18n.authentication.emptyTip }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="step" :ref="navTitle" class="train-step lable-name">
        <h2>{{ i18n.authentication.steptitle }}</h2>
        <div class="step-box">
          <div
            v-for="(item, index) in i18n.authentication.stepList"
            :key="item.name"
            class="step-item lable-name"
            :class="'step' + (index + 1)"
            @click="onRegistrationClick(item.link)"
          >
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div id="talent" class="train-talent">
        <h2>{{ i18n.authentication.talentTitle }}</h2>
        <p class="talent-desc">{{ i18n.authentication.talentDesc }}</p>
        <div class="talent-card-container">
          <div
            v-for="(item, index) in i18n.authentication.talentList"
            :key="item.url"
            class="talent-card"
            :class="talentSelectedIndex === index ? 'talent-card-checked' : 'talent-card-unchecked'"
            @mouseenter="onTalentItemClick(index)"
            @mouseleave="onTalentItemClick(-1)"
          >
            <img class="talent-icon" :src="isDark ? item.iconDark : item.icon" />
            <div v-show="talentSelectedIndex === index" class="talent-expended">
              <div>{{ item.desc }}</div>
              <a :href="item.url" target="_blank" rel="noopener noreferrer">
                <OButton animation type="text">
                  {{ i18n.authentication.talentDetail }}
                  <template #suffixIcon>
                    <OIcon class="right-icon"><IconRight /></OIcon>
                  </template>
                </OButton>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="qa" :ref="navTitle" class="train-qa">
        <h2>{{ i18n.authentication.qatitle }}</h2>
        <div class="qa-box">
          <div v-for="(item, index) in i18n.authentication.qa" :key="index" class="qa-item lable-name">
            <el-collapse>
              <el-collapse-item>
                <template #title>
                  <span>{{ item.question }}</span>
                </template>
                <p class="qa-answer lable-name">
                  <template v-if="Array.isArray(item.answer)">
                    <p v-for="sub in item.answer" :key="sub">{{ sub }}</p>
                  </template>
                  <template v-else> {{ item.answer }} </template>
                </p>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <div class="train-contact lable-name">
        <p>
          关于openGauss培训伙伴认证，openGauss提供了完整的评估标准和流程，详见
          <a :href="`${GITCODE_LINK}opengauss/training-partner-certification`" target="_blank" rel="noopener noreferrer"> openGauss培训伙伴认证整体介绍</a>。
        </p>
        <p>
          <span>{{ i18n.authentication.contact }}</span>
          <a :href="'mailto:' + i18n.authentication.contactemail">{{ i18n.authentication.contactemail }}</a>
        </p>
      </div>
    </div>
    <div class="training-mobile lable-name">
      <div id="introduction" class="train-introduction">
        <h2>{{ i18n.authentication.introtitle }}</h2>
        <p class="intro-info lable-name">{{ i18n.authentication.intro1 }}<br />{{ i18n.authentication.intro2 }}</p>
      </div>
      <div id="advantage" class="train-advantage lable-name">
        <h2>{{ i18n.authentication.advantage }}</h2>
        <div class="adv-box">
          <div v-for="item in i18n.authentication.adv" :key="item.advTitle" class="adv-item" :class="item.dark">
            <h3>{{ item.advTitle }}</h3>
            <p>{{ item.advDes1 }}</p>
            <p>{{ item.advDes2 }}</p>
          </div>
        </div>
      </div>
      <div id="system" class="train-system">
        <h2>{{ i18n.authentication.systemtitle }}</h2>
        <div class="system-box">
          <div class="system-short">
            <div v-for="(item, index) in i18n.authentication.system" :key="item.level" class="system-item">
              <div class="item-head" :class="item.name">
                <div class="head-content">
                  <div class="head-left">{{ item.level }}</div>
                  <div class="head-right">
                    {{ item.name.toUpperCase() }}
                  </div>
                </div>

                <p>{{ item.des }}</p>
              </div>
              <div class="item-body">
                <div class="body-head">
                  <p class="course">
                    <span>{{ item.contenttitle }}</span
                    ><span>{{ item.content }}</span>
                  </p>
                </div>
              </div>
              <transition name="course">
                <div v-show="isMoreShowMo[index]" class="course-list">
                  <p class="title">{{ item.outline }}</p>
                  <ul v-if="Array.isArray(item.courseOutline)">
                    <li
                      v-for="(itemCourse, indexCourse) in item.courseOutline"
                      :key="itemCourse.cardtitle"
                      :class="isMoreShow === indexCourse ? 'checked' : 'no-checked'"
                      @click="onCourseMoreClick(indexCourse)"
                    >
                      <div class="course-head">
                        <div class="list-left">
                          <div class="order">{{ itemCourse.num }}</div>
                          <div class="course">
                            <p>{{ itemCourse.cardtitle }}</p>
                          </div>
                        </div>
                        <div class="list-right" :class="isMoreShow === indexCourse ? 'more-show' : ''">
                          <OIcon>
                            <IconChevronRight />
                          </OIcon>
                        </div>
                      </div>
                      <transition name="fade">
                        <div v-show="isMoreShow === indexCourse" class="more-list">
                          <p v-for="itemDes in itemCourse.desList" :key="itemDes">
                            {{ itemDes }}
                          </p>
                        </div>
                      </transition>
                    </li>
                  </ul>
                  <div v-else class="no-data">
                    <img src="@/assets/category/authentication/training/img/empty.png" alt="" />
                    <p class="tip">{{ i18n.authentication.emptyTip }}</p>
                  </div>
                </div>
              </transition>

              <div class="more-button">
                <OButton type="text" size="small" animation @click="onToggleClick(index)">
                  {{ isMoreShowMo[index] ? i18n.authentication.collapse : i18n.authentication.viewMore }}
                  <template #suffixIcon> <IconChevronUp v-if="isMoreShowMo[index]" /><IconChevronDown v-else /> </template>
                </OButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="step" class="train-step">
        <h2>{{ i18n.authentication.steptitle }}</h2>
        <div class="step-box">
          <div
            v-for="(item, index) in i18n.authentication.stepList"
            :key="item.name"
            class="step-item"
            :class="'step' + (index + 1)"
            @click="onRegistrationClick(item.link)"
          >
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div id="talent" class="train-talent">
        <h2>{{ i18n.authentication.talentTitle }}</h2>
        <p class="talent-desc">{{ i18n.authentication.talentDesc }}</p>
        <div class="talent-box">
          <div v-for="(item, index) in i18n.authentication.talentList" :key="index" class="talent-item">
            <el-collapse>
              <el-collapse-item>
                <template #title>
                  <div class="talent-icon-wrap">
                    <img class="talent-icon" :src="isDark ? item.iconDark : item.icon" />
                  </div>
                </template>
                <p class="talent-info">
                  {{ item.desc }}
                </p>
                <a :href="item.url" target="_blank" rel="noopener noreferrer">
                  <OButton animation type="text">
                    {{ i18n.authentication.talentDetail }}
                    <template #suffixIcon>
                      <OIcon class="right-icon"><IconRight /></OIcon>
                    </template>
                  </OButton>
                </a>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <div id="qa" class="train-qa">
        <h2>{{ i18n.authentication.qatitle }}</h2>
        <div class="qa-box">
          <div v-for="(item, index) in i18n.authentication.qa" :key="index" class="qa-item">
            <el-collapse>
              <el-collapse-item>
                <template #title>
                  <span>{{ item.question }}</span>
                </template>
                <p class="qa-answer">
                  <template v-if="Array.isArray(item.answer)">
                    <p v-for="sub in item.answer" :key="sub">{{ sub }}</p>
                  </template>
                  <template v-else> {{ item.answer }} </template>
                </p>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <div class="train-contact">
        <p>
          关于openGauss培训伙伴认证，openGauss提供了完整的评估标准和流程，详见
          <a :href="`${GITCODE_LINK}opengauss/training-partner-certification`" target="_blank" rel="noopener noreferrer"> openGauss培训伙伴认证整体介绍</a>。
        </p>
        <p>
          <span>{{ i18n.authentication.contact }}</span>
          <a :href="'mailto:' + i18n.authentication.contactemail">{{ i18n.authentication.contactemail }}</a>
        </p>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
@include in-dark {
  .item-head img {
    @include img-in-dark;
  }
  .training-mobile .train-step .step-box,
  .training-pc .train-step .step-box {
    .step1 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/01-dark.png);
    }
    .step2 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/02-dark.png);
    }
    .step3 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/03-dark.png);
    }
    .step4 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/04-dark.png);
    }
    .step5 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/05-dark.png);
    }
    .step6 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/06-dark.png);
    }
    .step7 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/07-dark.png);
    }
  }
  .training-pc,
  .training-mobile {
    --empty-tip: #fff;
  }
}

.training-pc,
.training-mobile {
  --empty-tip: rgba(0, 0, 0, 0.6);
}

.app-content {
  :deep(.el-collapse-item__header) {
    height: auto;
    padding: var(--e-spacing-h5);
    font-size: var(--e-font-size-text);
  }
  :deep(.el-collapse-item__wrap) {
    padding: 0 var(--e-spacing-h5);
    background-color: var(--e-color-bg1);
  }
  :deep(.el-collapse-item__content) {
    padding: var(--e-spacing-h5) 0;
  }
}
.signup-btn {
  color: var(--e-color-white);
  border-color: var(--e-color-white);
  @media (max-width: 767px) {
    padding: 3px 12px;
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
  .banner-icon {
    @media (max-width: 767px) {
      font-size: var(--e-font-size-text);
    }
  }
}
.training-pc {
  --o-discount-bg: #fdfaff;
  @media screen and (max-width: 1100px) {
    display: none;
  }
  .train-introduction {
    h2 {
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
      color: var(--e-color-text1);
      text-align: center;
      font-weight: 300;
    }
    .intro-info {
      margin-top: var(--e-spacing-h2);
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      color: var(--e-color-text1);
    }
  }
  .train-advantage {
    margin-top: 58px;
    h2 {
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
      color: var(--e-color-text1);
      text-align: center;
      font-weight: 300;
    }
    .adv-box {
      margin-top: var(--e-spacing-h2);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 160px 160px;
      .adv-item {
        padding: 25px 0 30px 0;
        background-color: var(--e-color-bg2);
        h3 {
          font-size: var(--e-font-size-h7);
          line-height: var(--e-line-height-h8);
          font-weight: 300;
          color: var(--e-color-text1);
          text-align: center;
        }
        p {
          margin-top: 13px;
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-h5);
          color: var(--e-color-text3);
          text-align: center;
        }
      }
      .true,
      .true-mobile {
        background-color: #7d32ea;
        h3 {
          color: var(--e-color-white);
        }
        p {
          color: var(--e-color-neutral11);
        }
      }
    }
  }
  .train-system {
    margin-top: var(--e-spacing-h1);
    h2 {
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
      color: var(--e-color-text1);
      text-align: center;
      font-weight: 300;
    }
    .system-box {
      margin-top: var(--e-spacing-h2);
      .system-short {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: var(--e-spacing-h4);
        .system-item {
          .item-head {
            padding: var(--e-spacing-h2) 10px var(--e-spacing-h2) var(--e-spacing-h2);
            display: flex;
            width: 100%;
            max-height: 160px;
            justify-content: start;
            cursor: pointer;
            .head-left {
              width: 104px;
              height: 80px;
              padding: 0 var(--e-spacing-h4);
              font-size: var(--e-font-size-h5);
              text-align: center;
              line-height: 80px;
              white-space: nowrap;
              color: #d68bff;
              background-color: #fff;
              margin-right: var(--e-spacing-h4);
            }
            .head-right {
              max-width: 272px;
              h3 {
                font-size: var(--e-font-size-h5);
                line-height: var(--e-line-height-h5);
                font-weight: 300;
                color: var(--e-color-white);
              }
              p {
                font-size: var(--e-font-size-text);
                line-height: var(--e-line-height-text);
                color: var(--e-color-neutral11);
              }
            }
          }
          .ogca {
            background-color: #bd72ff;
          }
          .ogcp {
            background-color: #7d32ea;
            .head-left {
              color: #7d32ea;
            }
          }
          .ogce {
            background-color: #420f8e;
            .head-left {
              color: #420f8e;
            }
          }
          .item-body {
            height: 172px;
            padding: var(--e-spacing-h4) var(--e-spacing-h2) var(--e-spacing-h2);
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            background-color: var(--e-color-bg2);
            p {
              width: 100%;
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              color: var(--e-color-text1);
              text-align: justify;
            }
            .course-title {
              margin-top: var(--e-spacing-h6);
            }
            .course-cost {
              margin-top: var(--e-spacing-h6);
            }
            .exam-cost {
              margin-top: var(--e-spacing-h6);
            }
          }
        }
      }
      .system-active {
        width: 100%;
        box-shadow: var(--e-shadow-l2);
        .item-head {
          background-color: #bd72ff;
          padding: var(--e-spacing-h2) var(--e-spacing-h4) var(--e-spacing-h2) var(--e-spacing-h2);
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          .leavel {
            width: 104px;
            height: 80px;
            padding: 0 var(--e-spacing-h4);
            font-size: var(--e-font-size-h5);
            text-align: center;
            line-height: 80px;
            white-space: nowrap;
            color: #d68bff;
            background-color: #fff;
            margin-right: var(--e-spacing-h4);
          }
          .name {
            max-width: 272px;
            margin-right: var(--e-spacing-h2);
            h3 {
              font-size: var(--e-font-size-h5);
              line-height: var(--e-line-height-h5);
              color: var(--e-color-white);
              font-weight: 300;
            }
            p {
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              color: var(--e-color-neutral11);
            }
          }
          .detail {
            max-width: 856px;
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            color: var(--e-color-neutral11);
            margin-right: 46px;
          }
          .close {
            cursor: pointer;
            position: absolute;
            right: 45px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .item-body {
          background-color: var(--e-color-bg2);
          padding: var(--e-spacing-h4) var(--e-spacing-h2) var(--e-spacing-h2);
          .title {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            color: var(--e-color-text1);
          }
          ul {
            margin-top: 13px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: var(--e-spacing-h4);
            li {
              border: 1px solid var(--e-color-border2);
              padding: var(--e-spacing-h4);
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: relative;
              box-sizing: border-box;
              cursor: pointer;
              .list-left {
                display: flex;
                align-items: center;
                .order {
                  width: 48px;
                  height: 48px;
                  line-height: 48px;
                  text-align: center;
                  font-size: var(--e-font-size-h5);
                  border: 1px solid var(--e-color-brand1);
                  margin-right: var(--e-spacing-h4);
                  color: var(--e-color-brand1);
                }
                .course {
                  p {
                    font-size: var(--e-font-size-h6);
                    color: var(--e-color-text1);
                    line-height: var(--e-line-height-h6);
                    &::after {
                      content: '';
                      display: block;
                      width: 20px;
                      height: 2px;
                      margin-top: 4px;
                      background-color: var(--e-color-brand1);
                    }
                  }
                  .time {
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    .o-icon {
                      margin-right: 12px;
                      color: var(--e-color-text1);
                    }
                    .time-text {
                      font-size: var(--e-font-size-text);
                      line-height: var(--e-line-height-text);
                      color: var(--e-color-text4);
                    }
                  }
                }
              }
              .list-right {
                .more {
                  margin-right: 8px;
                  font-size: var(--e-font-size-text);
                  line-height: var(--e-line-height-text);
                  color: var(--e-color-text1);
                }
                .o-icon {
                  position: relative;
                  top: 2px;
                  color: var(--e-color-brand1);
                }
              }
              .more-list {
                width: calc(100% + 2px);
                position: absolute;
                padding: var(--e-spacing-h4) var(--e-spacing-h2);
                background-color: var(--e-color-bg4);
                left: -1px;
                bottom: 0;
                transform: translateY(100%);
                z-index: 2;
                overflow: hidden;
                border: 1px solid var(--e-color-brand1);
                border-top: none;
                box-shadow: var(--e-shadow-l2_hover);
                p {
                  font-size: var(--e-font-size-text);
                  line-height: var(--e-line-height-text);
                  color: var(--e-color-text1);
                }
              }
            }
            .no-checked {
              &:hover {
                border: 1px solid var(--e-color-brand1);
                box-shadow: var(--e-shadow-l2_hover);
              }
            }
            .checked {
              border: 1px solid var(--e-color-brand1);
              border-bottom: none;
              box-shadow: var(--e-shadow-l2_hover);
            }
          }
          .no-data {
            text-align: center;
            img {
              width: 200px;
            }
            .tip {
              color: var(--empty-tip);
              margin-top: var(--e-spacing-h5);
              font-size: var(--e-font-size-h8);
              line-height: var(--e-line-height-h6);
              font-weight: 500;
            }
          }
        }
      }
      .system-ogcp {
        .item-head {
          background-color: #7d32ea;
          .leavel {
            color: #7d32ea;
          }
        }
      }
      .system-ogce {
        .item-head {
          background-color: #420f8e;
          .leavel {
            color: #420f8e;
          }
        }
      }
    }
  }
  .train-step {
    margin-top: var(--e-spacing-h1);
    h2 {
      font-size: var(--e-font-size-h3);
      font-weight: 300;
      line-height: var(--e-line-height-h3);
      text-align: center;
      color: var(--e-color-text1);
    }
    .step-box {
      margin: var(--e-spacing-h2) auto 0 auto;
      display: grid;
      padding: 0 86px;
      grid-gap: var(--e-spacing-h1);
      grid-template-columns: repeat(7, 116px);
      @media screen and (max-width: 1330px) {
        grid-template-columns: repeat(6, 116px);
      }
      @media screen and (max-width: 1190px) {
        grid-template-columns: repeat(5, 116px);
      }
      .step-item {
        width: 116px;
        height: 144px;
        position: relative;
        background-size: 100% 100%;
        & ~ .step-item::before {
          content: '';
          display: inline-block;
          border-top: 16px solid transparent;
          border-right: 16px solid transparent;
          border-bottom: 16px solid transparent;
          border-left: 16px solid var(--e-color-bg1);
          position: absolute;
          top: 40%;
          left: -48px;
          transform: translateY(-50%);
          z-index: 2;
        }
        & ~ .step-item::after {
          content: '';
          display: inline-block;
          border-top: 16px solid transparent;
          border-right: 16px solid transparent;
          border-bottom: 16px solid transparent;
          border-left: 16px solid #d2d2d3;
          position: absolute;
          top: 40%;
          left: -40px;
          transform: translateY(-50%);
        }
        p {
          position: absolute;
          width: 100%;
          bottom: 8px;
          text-align: center;
          color: var(--e-color-text1);
          font-size: var(--e-font-size-text);
          @media screen and (max-width: 1100px) {
            font-size: var(--e-font-size-tip);
          }
        }
      }
      .step1 {
        cursor: pointer;
        background-image: url(@/assets/category/authentication/training/img/step/01.png);
        &:hover {
          background-image: url(@/assets/category/authentication/training/img/step/01-hover.png);
          p {
            color: var(--e-color-white);
          }
        }
      }
      .step2 {
        background-image: url(@/assets/category/authentication/training/img/step/02.png);
      }
      .step3 {
        background-image: url(@/assets/category/authentication/training/img/step/03.png);
      }
      .step4 {
        background-image: url(@/assets/category/authentication/training/img/step/04.png);
      }
      .step5 {
        background-image: url(@/assets/category/authentication/training/img/step/05.png);
      }
      .step6 {
        background-image: url(@/assets/category/authentication/training/img/step/06.png);
      }
      .step7 {
        margin-right: 0;
        background-image: url(@/assets/category/authentication/training/img/step/07.png);
      }
    }
  }
  .train-talent {
    margin-top: var(--e-spacing-h1);
    h2 {
      font-size: var(--e-font-size-h3);
      font-weight: 300;
      line-height: var(--e-line-height-h3);
      text-align: center;
      color: var(--e-color-text1);
    }
    .talent-desc {
      margin-top: var(--e-spacing-h2);
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      color: var(--e-color-text1);
    }
    .talent-card-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: var(--e-spacing-h4);
      margin-top: var(--e-spacing-h2);
      .talent-card {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        box-shadow: var(--e-shadow-l2);
        background-color: var(--e-color-bg2);
        cursor: pointer;
        .talent-icon {
          width: 150px;
          image-rendering: -webkit-optimize-contrast;
        }
        .talent-expended {
          z-index: 1;
          position: absolute;
          left: -1px;
          right: -1px;
          top: 99px;
          padding: var(--e-spacing-h4);
          background-color: var(--e-color-bg4);
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
          border: 1px solid var(--e-color-brand1);
          border-top: none;
          box-shadow: var(--e-shadow-l2_hover);
          .o-button {
            padding: var(--e-spacing-h4) 0 0 0;
            font-size: var(--e-font-size-h8);
            line-height: var(--e-line-height-h8);
            .right-icon {
              color: var(--e-color-brand1);
            }
          }
        }
      }
      .talent-card-unchecked:hover {
        border: 1px solid var(--e-color-brand1);
        box-shadow: var(--e-shadow-l2_hover);
      }
      .talent-card-checked {
        border: 1px solid var(--e-color-brand1);
        border-bottom: 1px solid rgba(var(--e-color-bg2), 0);
        box-shadow: var(--e-shadow-l2_hover);
      }
    }
  }
  .certificate-query {
    margin-top: var(--e-spacing-h1);
  }
  .train-qa {
    margin-top: var(--e-spacing-h1);
    h2 {
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
      color: var(--e-color-text1);
      text-align: center;
      font-weight: 300;
    }
    .qa-box {
      margin-top: var(--e-spacing-h2);
      background-color: var(--e-color-bg2);
      .qa-item {
        padding: var(--e-spacing-h4) var(--e-spacing-h2);
        & ~ .qa-item {
          border-top: 1px solid var(--e-color-border2);
        }
        .el-collapse {
          border: none;
          :deep(.el-collapse-item__header) {
            height: var(--e-spacing-h4);
            line-height: var(--e-spacing-h4);
            border: none;
            background-color: var(--e-color-bg2);
            color: var(--e-color-text1);
          }
          :deep(.el-collapse-item__wrap) {
            border: none;
            background-color: var(--e-color-bg2);
          }
          :deep(.el-collapse-item__content) {
            padding-bottom: 0;
          }
        }
        .qa-question {
          width: 100%;
          font-size: var(--e-font-size-h7);
          line-height: var(--e-line-height-h8);
          color: var(--e-color-text1);
        }
        .qa-answer {
          margin-top: var(--e-spacing-h6);
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
          color: var(--e-color-text3);
          text-align: justify;
        }
      }
    }
  }
  .train-contact {
    margin-top: var(--e-spacing-h4);
    p {
      font-size: var(--e-font-size-text);
      line-height: var(--e-font-size-text);
      color: var(--e-color-text3);
      margin-top: 8px;

      @media screen and (max-width: 1100px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-font-size-tip);
      }

      a {
        color: var(--e-color-brand1);
      }
    }
  }
}
@include in-dark {
  .training-pc {
    --o-discount-bg: var(--e-color-greyblack4);
  }
}
.training-mobile {
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
  }
  h2 {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
    color: var(--e-color-text1);
    text-align: center;
    font-weight: 300;
  }
  .train-introduction {
    .intro-info {
      margin-top: 8px;
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      color: var(--e-color-text1);
    }
  }
  .train-advantage {
    margin-top: var(--e-spacing-h2);
    .adv-box {
      margin-top: var(--e-spacing-h4);
      display: grid;
      grid-template-columns: 1fr 1fr;
      .adv-item {
        padding: var(--e-spacing-h5) 0;
        background-color: var(--e-color-bg2);
        h3 {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
          font-weight: 300;
          color: var(--e-color-text1);
          text-align: center;
        }
        p {
          margin-top: 8px;
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
          color: var(--e-color-text3);
          text-align: center;
          transform: scale(0.8);
          &:nth-of-type(2) {
            margin-top: 0;
          }
        }
      }
      .true,
      .true-mobile2 {
        background-color: #7d32ea;
        h3 {
          color: var(--e-color-white);
        }
        p {
          color: var(--e-color-neutral11);
        }
      }
      .true-mobile {
        background-color: var(--e-color-bg2);
      }
    }
  }
  .train-system {
    margin-top: var(--e-spacing-h2);
    .system-box {
      margin-top: var(--e-spacing-h5);
      .system-short {
        .system-item {
          .item-head {
            max-height: 160px;
            background-color: #bd72ff;
            padding: var(--e-spacing-h5);
            .head-content {
              width: 100%;
              display: flex;
              justify-content: start;
              .head-left {
                width: 52px;
                height: 28px;
                font-size: var(--e-font-size-text);
                text-align: center;
                line-height: 28px;
                white-space: nowrap;
                color: #bd72ff;
                background-color: var(--e-color-white);
                margin-right: var(--e-spacing-h5);
              }
              .head-right {
                max-width: 272px;
                font-size: var(--e-font-size-text);
                line-height: 28px;
                color: var(--e-color-white);
                font-weight: 300;
              }
            }
            p {
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
              color: var(--e-color-white);
              margin-top: var(--e-spacing-h8);
            }
          }
          .ogcp {
            background-color: #7d32ea;
            .head-content {
              .head-left {
                color: #7d32ea;
              }
            }
          }
          .ogce {
            background-color: #420f8e;
            .head-content {
              .head-left {
                color: #420f8e;
              }
            }
          }
          .item-body {
            margin-top: 8px;
            p {
              width: 100%;
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
              color: var(--e-color-text1);
            }
            .body-head {
              margin-top: var(--e-spacing-h5);
              .course {
                margin-top: var(--e-spacing-h8);
              }
            }
            .body-inner {
              margin-top: var(--e-spacing-h5);
              .course-cost {
                margin-top: var(--e-spacing-h8);
              }
              .exam-cost {
                margin-top: var(--e-spacing-h8);
              }
            }
          }
          .course-list {
            margin-top: var(--e-spacing-h5);
            overflow: hidden;
            .title {
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
              color: var(--e-color-text1);
            }
            ul {
              margin-top: var(--e-spacing-h5);
              li {
                border: 1px solid var(--e-color-brand1);
                box-sizing: border-box;
                cursor: pointer;
                & ~ li {
                  margin-top: 8px;
                }
                .course-head {
                  padding: var(--e-spacing-h5);
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  position: relative;
                  .list-left {
                    display: flex;
                    align-items: center;
                    .order {
                      width: 48px;
                      height: 48px;
                      line-height: 48px;
                      text-align: center;
                      font-size: var(--e-font-size-h6);
                      border: 1px solid var(--e-color-brand1);
                      margin-right: var(--e-spacing-h8);
                      color: var(--e-color-brand1);
                    }
                    .course {
                      p {
                        font-size: var(--e-font-size-text);
                        color: var(--e-color-text1);
                        line-height: var(--e-line-height-text);
                        &::after {
                          content: '';
                          display: block;
                          width: 20px;
                          height: 2px;
                          margin-top: 4px;
                          background-color: var(--e-color-brand1);
                        }
                      }
                      .time {
                        margin-top: 12px;
                        display: flex;
                        align-items: center;
                        .o-icon {
                          margin-right: 6px;
                          color: var(--e-color-text1);
                          font-size: 16px;
                        }
                        .time-text {
                          color: var(--e-color-text4);
                          font-size: var(--e-font-size-tip);
                          line-height: var(--e-line-height-tip);
                        }
                      }
                    }
                  }
                  .list-right {
                    cursor: pointer;
                    transition: all 0.2s;
                    .o-icon {
                      position: relative;
                      top: 3px;
                      font-size: 16px;
                      color: var(--e-color-brand1);
                    }
                  }
                  .more-show {
                    transform: rotateZ(90deg);
                  }
                }

                .more-list {
                  padding: var(--e-spacing-h5);
                  background-color: var(--e-color-bg4);
                  overflow: hidden;
                  p {
                    font-size: var(--e-font-size-tip);
                    line-height: var(--e-line-height-tip);
                    color: var(--e-color-text1);
                  }
                }
              }
            }
            .down-box {
              margin-top: var(--e-spacing-h5);
              a {
                display: block;
                font-size: var(--e-font-size-tip);
                line-height: var(--e-line-height-tip);
                & ~ a {
                  margin-top: var(--e-spacing-h8);
                }
              }
            }
          }

          & ~ .system-item {
            margin-top: var(--e-spacing-h5);
          }
          .no-data {
            text-align: center;
            img {
              width: 150px;
            }
            .tip {
              color: var(--empty-tip);
              margin-top: var(--e-spacing-h7);
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
              font-weight: 500;
            }
          }
          .more-button {
            width: 100%;
            text-align: center;
            .o-button {
              font-size: var(--e-font-size-tip);
            }
            :deep(.suffix-icon) {
              color: var(--e-color-brand1);
            }
          }
        }
      }
    }
  }
  .train-step {
    margin-top: var(--e-spacing-h2);
    .step-box {
      display: grid;
      grid-gap: 8px;
      max-width: 798px;
      margin: var(--e-spacing-h5) auto 0 auto;
      grid-template-columns: repeat(7, 1fr);
      @media screen and (max-width: 789px) {
        grid-template-columns: repeat(6, 1fr);
      }
      @media screen and (max-width: 695px) {
        grid-template-columns: repeat(5, 1fr);
      }
      @media screen and (max-width: 580px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media screen and (max-width: 460px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media screen and (max-width: 340px) {
        grid-template-columns: repeat(2, 1fr);
      }
      .step-item {
        width: 80px;
        height: 94px;
        position: relative;
        background-size: 100% 100%;
        margin: 0 auto;
        & ~ .step-item {
          margin-left: 24px;
        }
        & ~ .step-item::before {
          content: '';
          display: inline-block;
          border-top: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid var(--e-color-bg1);
          position: absolute;
          top: 40%;
          left: -20px;
          transform: translateY(-50%);
          z-index: 2;
        }
        & ~ .step-item::after {
          content: '';
          display: inline-block;
          border-top: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid #d2d2d3;
          position: absolute;
          top: 40%;
          left: -16px;
          transform: translateY(-50%);
        }
        p {
          position: absolute;
          width: 100%;
          bottom: 0px;
          text-align: center;
          color: var(--e-color-text1);
          font-size: var(--e-font-size-text);
          @media screen and (max-width: 1100px) {
            font-size: var(--e-font-size-tip);
          }
        }
      }
      .step1 {
        background-image: url(@/assets/category/authentication/training/img/step/01.png);
        cursor: pointer;
        &:active {
          background-image: url(@/assets/category/authentication/training/img/step/01-hover.png) !important;
        }
      }
      .step2 {
        background-image: url(@/assets/category/authentication/training/img/step/02.png);
      }
      .step3 {
        background-image: url(@/assets/category/authentication/training/img/step/03.png);
      }
      .step4 {
        background-image: url(@/assets/category/authentication/training/img/step/04.png);
      }
      .step5 {
        background-image: url(@/assets/category/authentication/training/img/step/05.png);
      }
      .step6 {
        background-image: url(@/assets/category/authentication/training/img/step/06.png);
      }
      .step7 {
        background-image: url(@/assets/category/authentication/training/img/step/07.png);
        &:active {
          background-image: url(@/assets/category/authentication/training/img/step/07-hover.png) !important;
        }
      }
    }
  }
  .train-talent {
    margin-top: var(--e-spacing-h2);
    .talent-desc {
      margin-top: 8px;
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      color: var(--e-color-text1);
    }
    .talent-box {
      margin-top: var(--e-spacing-h5);
      .talent-item {
        .talent-icon-wrap {
          display: flex;
          align-items: center;
          min-height: 28px;
        }
        .talent-icon {
          width: 80px;
        }
        .talent-info {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
          color: var(--e-color-text1);
          text-align: justify;
        }
        :deep(.el-collapse) {
          border-top: none;
          border-bottom: none;
        }
        :deep(.el-collapse-item__header) {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
        :deep(.el-collapse-item__wrap) {
          background-color: var(--e-color-bg4);
        }
        .o-button {
          padding: var(--e-spacing-h5) 0 0 0;
          font-size: var(--e-font-size-tip);
          line-height: var(--e-font-size-tip);
          .right-icon {
            font-size: var(--e-font-size-tip);
            color: var(--e-color-brand1);
          }
        }
      }
    }
  }
  .train-qa {
    margin-top: var(--e-spacing-h2);
    .qa-box {
      margin-top: var(--e-spacing-h5);
      .qa-item {
        .qa-text {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
          color: var(--e-color-text1);
        }
        .qa-answer {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
          color: var(--e-color-text1);
          text-align: justify;
        }
        :deep(.el-collapse) {
          border-top: none;
          border-bottom: none;
        }
        :deep(.el-collapse-item__header) {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
        :deep(.el-collapse-item__wrap) {
          background-color: var(--e-color-bg4);
        }
      }
    }
  }
  .train-contact {
    margin-top: var(--e-spacing-h5);
    p {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      color: var(--e-color-text1);
      @media screen and (max-width: 1100px) {
        font-size: var(--e-font-size-tip);
      }
    }
  }

  :deep(.el-collapse-item__wrap) {
    border-bottom: none;
  }
  :deep(.el-collapse-item__header) {
    background-color: var(--e-color-bg2);
    color: var(--e-color-text1);
    border-bottom: 1px solid var(--e-color-border2);
    box-shadow: var(--e-shadow-l2);
  }
}
.fade-enter-from,
.fade-leave-to {
  max-height: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: max-height 0.2s linear;
}
.fade-enter-to,
.fade-leave-from {
  max-height: 224px;
}
.course-enter-from,
.course-leave-to {
  max-height: 0;
}
.course-enter-active,
.course-leave-active {
  transition: max-height 0.2s linear;
}
.course-enter-to,
.course-leave-from {
  max-height: 224px;
}
</style>
