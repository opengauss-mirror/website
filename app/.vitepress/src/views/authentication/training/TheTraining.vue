<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import TrainingNav from './TrainingNav.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/training.png';
import partnerLight from '@/assets/category/authentication/training/img/partner.png';
import partnerDark from '@/assets/category/authentication/training/img/partner-dark.png';
import gaussLogo from '@/assets/category/authentication/training/img/gauss-mo.png';
import gaussLogoDark from '@/assets/category/authentication/training/img/gauss-mo-dark.png';
import enmotechLogo from '@/assets/category/authentication/training/img/enmotech-mo.png';
import enmotechLogoDark from '@/assets/category/authentication/training/img/enmotech-mo-dark.png';
import csiaLogo from '@/assets/category/authentication/training/img/csia-mo.png';
import csiaLogoDark from '@/assets/category/authentication/training/img/csia-mo-dark.png';

import flashSale from '@/assets/category/authentication/training/img/flash-sale.png';

import IconArrow from '~icons/train/icon-arrow.svg';
import IconChevronRight from '~icons/app/icon-chevron-right.svg';
import IconPeriod from '~icons/app/icon-period.svg';
import OIcon from 'opendesign/icon/OIcon.vue';
import IconChevronDown from '~icons/app/icon-chevron-down.svg';
import IconChevronUp from '~icons/app/icon-chevron-up.svg';

const i18n = useI18n();
const commonStore = useCommon();
const partner = computed(() =>
  commonStore.theme === 'light' ? partnerLight : partnerDark
);
const partnerMo = computed(() =>
  commonStore.theme === 'light'
    ? [gaussLogo, enmotechLogo, csiaLogo]
    : [gaussLogoDark, enmotechLogoDark, csiaLogoDark]
);
// 右侧导航
const isShowNav = ref(false);
const activeIndex = ref(0);
// 滚动激活导航
const scroTop = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
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
function onRegistrationClick(index: number) {
  if (index === 0) {
    window.open('https://enmoedu.com/');
  }
}
// 控制移动端更多课程内容显示的切换
function onToggleClick(index: number) {
  isMoreShowMo.value[index] = !isMoreShowMo.value[index];
}
onMounted(() => {
  window.addEventListener('scroll', scroTop);
});
onUnmounted(() => {
  window.removeEventListener('scroll', scroTop);
});
</script>
<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.authentication.title"
    :illustration="illustration"
  />
  <AppContent>
    <div class="training-pc">
      <TrainingNav
        v-show="isShowNav"
        class="titlenav"
        :current-index="activeIndex"
        :data-list="i18n.authentication.navList"
      />
      <div class="flash-sale">
        <img :src="flashSale" alt="" />
        <div class="sale-datail">
          <h4>{{ i18n.authentication.discounttitle }}</h4>
          <div class="train">
            <p class="prime">
              <span>{{ i18n.authentication.traintitle }}</span>
              <span>{{ i18n.authentication.traincos }}</span>
            </p>
            <p class="discount">
              <span>{{ i18n.authentication.limited }}</span>
              <span>{{ i18n.authentication.trainoffset }}</span>
              <span>{{ i18n.authentication.disunit }}</span>
              <span>{{ i18n.authentication.trainprice }}</span>
              <span>{{ i18n.authentication.yuan }}</span>
            </p>
          </div>
          <div class="test">
            <p class="prime">
              <span>{{ i18n.authentication.examtitle }}</span>
              <span>{{ i18n.authentication.examcos }}</span>
            </p>
            <p class="discount">
              <span>{{ i18n.authentication.limited }}</span>
              <span>{{ i18n.authentication.examoffset }}</span>
              <span>{{ i18n.authentication.disunit }}</span>
              <span>{{ i18n.authentication.examprice }}</span>
              <span>{{ i18n.authentication.yuan }}</span>
            </p>
          </div>
          <div class="time">
            <p>{{ i18n.authentication.eventdl }}</p>
            <p>{{ i18n.authentication.dlday }}</p>
          </div>
          <div class="entry-method">
            <p>{{ i18n.authentication.signup }}</p>
            <p>{{ i18n.authentication.signwechat }}</p>
          </div>
          <div class="number">
            {{ i18n.authentication.teacher2 }}{{ i18n.authentication.phone2 }}
          </div>
        </div>
      </div>

      <div id="introduction" :ref="navTitle" class="train-introduction">
        <h2>{{ i18n.authentication.introtitle }}</h2>
        <p class="intro-info">
          {{ i18n.authentication.intro1 }}<br />{{ i18n.authentication.intro2 }}
        </p>
        <div class="intro-img">
          <img :src="partner" alt="" />
        </div>
      </div>
      <div id="advantage" :ref="navTitle" class="train-advantage">
        <h2>{{ i18n.authentication.advantage }}</h2>
        <div class="adv-box">
          <div
            v-for="item in i18n.authentication.adv"
            :key="item.advTitle"
            class="adv-item"
            :class="item.dark"
          >
            <h3>{{ item.advTitle }}</h3>
            <p>{{ item.advDes1 }}</p>
            <p>{{ item.advDes2 }}</p>
          </div>
        </div>
      </div>
      <div id="system" :ref="navTitle" class="train-system">
        <h2>{{ i18n.authentication.systemtitle }}</h2>
        <div class="system-box">
          <div v-show="isIndex === -1" class="system-short">
            <div
              v-for="(item, index) in i18n.authentication.system"
              :key="item.level"
              class="system-item"
              @click="onSystemItemClick(index)"
            >
              <div class="item-head" :class="item.name">
                <div class="head-left">{{ item.level }}</div>
                <div class="head-right">
                  <h3>{{ item.name.toUpperCase() }}</h3>
                  <p>{{ item.des }}</p>
                </div>
              </div>
              <div class="item-body">
                <div>
                  <p class="model-name">{{ item.module }}</p>
                  <p class="course-title">{{ item.contenttitle }}</p>
                  <p class="course-detail">{{ item.content }}</p>
                </div>

                <div>
                  <p class="course-day">{{ item.trainDay }}</p>
                  <p class="course-cost">
                    <span>{{ item.trainCosts }}</span>
                    <span v-if="item.originexam">{{ item.origintrain }}</span>
                    <span v-if="item.originexam">{{
                      i18n.authentication.costeach
                    }}</span>
                  </p>
                  <p class="exam-cost">
                    <span>{{ item.examCoste }}</span>
                    <span v-if="item.originexam">{{ item.originexam }}</span>
                    <span v-if="item.originexam">{{
                      i18n.authentication.costeach
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            v-for="(item, index) in i18n.authentication.system"
            :key="item.name"
            class="system-active"
            :class="'system-' + item.name"
          >
            <div v-show="isIndex === index">
              <div class="item-head" @click="onSystemItemClick(-1)">
                <div class="leavel">{{ item.level }}</div>
                <div class="name">
                  <h3>{{ item.name.toUpperCase() }}</h3>
                  <p>{{ item.des }}</p>
                </div>
                <div class="detail">{{ item.description }}</div>
                <div class="close">
                  <OIcon>
                    <IconArrow />
                  </OIcon>
                </div>
              </div>
              <div class="item-body">
                <p class="title">{{ item.outline }}</p>
                <ul v-if="index === 0">
                  <li
                    v-for="(itemCourse, indexCourse) in i18n.authentication
                      .ogcacard"
                    :key="itemCourse.cardtitle"
                    :class="
                      isMoreShow === indexCourse ? 'checked' : 'no-checked'
                    "
                    @click="onCourseMoreClick(indexCourse)"
                  >
                    <div class="list-left">
                      <div class="order">{{ itemCourse.num }}</div>
                      <div class="course">
                        <p>{{ itemCourse.cardtitle }}</p>
                        <div class="time">
                          <OIcon><IconPeriod /></OIcon>
                          <span class="time-text">{{ itemCourse.period }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="list-right">
                      <span class="more">{{ i18n.authentication.more }}</span>
                      <OIcon>
                        <IconChevronRight />
                      </OIcon>
                    </div>
                    <transition name="fade">
                      <div
                        v-show="isMoreShow === indexCourse"
                        class="more-list"
                      >
                        <p v-for="itemDes in itemCourse.desList" :key="itemDes">
                          {{ itemDes }}
                        </p>
                      </div>
                    </transition>
                  </li>
                </ul>
                <div v-if="index === 0" class="down-box">
                  <a :href="i18n.authentication.downurl1" target="_blank">{{
                    i18n.authentication.downpdf1
                  }}</a>
                  <a :href="i18n.authentication.downurl1" target="_blank">{{
                    i18n.authentication.downpdf2
                  }}</a>
                </div>
                <div v-else class="no-data">
                  <img
                    src="@/assets/category/authentication/training/img/no-data.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="step" :ref="navTitle" class="train-step">
        <h2>{{ i18n.authentication.steptitle }}</h2>
        <div class="step-box">
          <!-- :style="{ backgroundImage: 'url(' + stepImgList[index] + ')' }" -->
          <div
            v-for="(item, index) in i18n.authentication.stepList"
            :key="item.name"
            class="step-item"
            :class="'step' + (index + 1)"
            @click="onRegistrationClick(index)"
          >
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div id="qa" :ref="navTitle" class="train-qa">
        <h2>{{ i18n.authentication.qatitle }}</h2>
        <div class="qa-box">
          <div
            v-for="(item, index) in i18n.authentication.qa"
            :key="index"
            class="qa-item"
          >
            <el-collapse>
              <el-collapse-item>
                <template #title>
                  <span>{{ item.question }}</span>
                </template>
                <p class="qa-answer">
                  {{ item.answer }}
                </p>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <div class="train-contact">
        <p>
          <span>{{ i18n.authentication.contact }}</span>
          <a :href="'mailto:' + i18n.authentication.contactemail">{{
            i18n.authentication.contactemail
          }}</a>
        </p>
      </div>
    </div>
    <div class="training-mobile">
      <div id="introduction" class="train-introduction">
        <h2>{{ i18n.authentication.introtitle }}</h2>
        <p class="intro-info">
          {{ i18n.authentication.intro1 }}<br />{{ i18n.authentication.intro2 }}
        </p>
        <div class="intro-img">
          <img
            v-for="(item, index) in partnerMo"
            :key="index"
            :src="item"
            alt=""
          />
        </div>
      </div>
      <div id="advantage" class="train-advantage">
        <h2>{{ i18n.authentication.advantage }}</h2>
        <div class="adv-box">
          <div
            v-for="item in i18n.authentication.adv"
            :key="item.advTitle"
            class="adv-item"
            :class="item.dark"
          >
            <h3>{{ item.advTitle }}</h3>
            <p>{{ item.advDes1 }}</p>
            <p>{{ item.advDes2 }}</p>
          </div>
        </div>
      </div>
      <div id="system" class="train-system">
        <h2>{{ i18n.authentication.systemtitle }}</h2>
        <div class="system-box">
          <div v-show="isIndex === -1" class="system-short">
            <div
              v-for="(item, index) in i18n.authentication.system"
              :key="item.level"
              class="system-item"
            >
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
                  <p class="model-name">{{ item.module }}</p>
                  <p class="course">
                    <span>{{ item.contenttitle }}</span
                    ><span>{{ item.content }}</span>
                  </p>
                </div>
                <div class="body-inner">
                  <p class="course-day">{{ item.trainDay }}</p>
                  <p class="course-cost">
                    <span>{{ item.trainCosts }}</span>
                    <span v-if="item.originexam">{{ item.origintrain }}</span>
                    <span v-if="item.originexam">{{
                      i18n.authentication.costeach
                    }}</span>
                  </p>
                  <p class="exam-cost">
                    <span>{{ item.examCoste }}</span>
                    <span v-if="item.originexam">{{ item.originexam }}</span>
                    <span v-if="item.originexam">{{
                      i18n.authentication.costeach
                    }}</span>
                  </p>
                </div>
              </div>
              <transition name="course">
                <div v-show="isMoreShowMo[index]" class="course-list">
                  <p class="title">{{ item.outline }}</p>
                  <ul v-if="index === 0">
                    <li
                      v-for="(itemCourse, indexCourse) in i18n.authentication
                        .ogcacard"
                      :key="itemCourse.cardtitle"
                      :class="
                        isMoreShow === indexCourse ? 'checked' : 'no-checked'
                      "
                      @click="onCourseMoreClick(indexCourse)"
                    >
                      <div class="course-head">
                        <div class="list-left">
                          <div class="order">{{ itemCourse.num }}</div>
                          <div class="course">
                            <p>{{ itemCourse.cardtitle }}</p>
                            <div class="time">
                              <OIcon><IconPeriod /></OIcon>
                              <span class="time-text">{{
                                itemCourse.period
                              }}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          class="list-right"
                          :class="isMoreShow === indexCourse ? 'more-show' : ''"
                        >
                          <OIcon>
                            <IconChevronRight />
                          </OIcon>
                        </div>
                      </div>
                      <transition name="fade">
                        <div
                          v-show="isMoreShow === indexCourse"
                          class="more-list"
                        >
                          <p
                            v-for="itemDes in itemCourse.desList"
                            :key="itemDes"
                          >
                            {{ itemDes }}
                          </p>
                        </div>
                      </transition>
                    </li>
                  </ul>
                  <div v-if="index === 0" class="down-box">
                    <a :href="i18n.authentication.downurl1" target="_blank">{{
                      i18n.authentication.downpdf1
                    }}</a>
                    <a :href="i18n.authentication.downurl1" target="_blank">{{
                      i18n.authentication.downpdf2
                    }}</a>
                  </div>
                  <div v-else class="no-data">
                    <img
                      src="@/assets/category/authentication/training/img/no-data.png"
                      alt=""
                    />
                  </div>
                </div>
              </transition>

              <div class="more-button">
                <OButton
                  type="text"
                  size="small"
                  animation
                  @click="onToggleClick(index)"
                >
                  {{
                    isMoreShowMo[index]
                      ? i18n.authentication.collapse
                      : i18n.authentication.viewMore
                  }}
                  <template #suffixIcon>
                    <IconChevronUp v-if="isMoreShowMo[index]" /><IconChevronDown
                      v-else
                    />
                  </template>
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
            @click="onRegistrationClick(index)"
          >
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div id="qa" class="train-qa">
        <h2>{{ i18n.authentication.qatitle }}</h2>
        <div class="qa-box">
          <div
            v-for="(item, index) in i18n.authentication.qa"
            :key="index"
            class="qa-item"
          >
            <el-collapse>
              <el-collapse-item>
                <template #title>
                  <span>{{ item.question }}</span>
                </template>
                <p class="qa-answer">
                  {{ item.answer }}
                </p>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <div class="train-contact">
        <p>
          <span>{{ i18n.authentication.contact }}</span>
          <a :href="'mailto:' + i18n.authentication.contactemail">{{
            i18n.authentication.contactemail
          }}</a>
        </p>
      </div>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.dark {
  .item-head,
  .flash-sale img {
    filter: brightness(0.8) grayscale(0.2) contrast(1.2);
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
}

.app-content {
  :deep(.el-collapse-item__header) {
    height: auto;
    padding: var(--o-spacing-h5);
    font-size: var(--o-font-size-text);
  }
  :deep(.el-collapse-item__wrap) {
    padding: 0 var(--o-spacing-h5);
    background-color: var(--o-color-bg1);
  }
  :deep(.el-collapse-item__content) {
    padding: var(--o-spacing-h5) 0;
  }
}
.training-pc {
  --o-discount-bg: #fdfaff;
  @media screen and (max-width: 1100px) {
    display: none;
  }
  .flash-sale {
    position: relative;
    cursor: pointer;
    &:hover .sale-datail {
      display: block;
    }
    img {
      position: fixed;
      bottom: 395px;
      right: 100px;
      z-index: 1001;
    }
    .sale-datail {
      position: fixed;
      cursor: pointer;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      background-color: var(--o-color-bg2);
      padding: 27px 22px 24px;
      border-radius: 20px;
      border: 2px solid var(--o-color-brand1);
      display: none;
      h4 {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        color: var(--o-color-text1);
      }
      .train,
      .test {
        margin-top: var(--o-spacing-h8);
        border-radius: 10px;
        padding: 12px 25px;
        border: 1px solid var(--o-color-brand2);
        text-align: center;
        background-color: var(--o-discount-bg);
        .prime {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--o-color-text1);
          span:nth-of-type(1) {
            font-weight: 600;
          }
          span:nth-of-type(2) {
            text-decoration: line-through;
          }
        }
        .discount {
          margin-top: var(--o-spacing-h8);
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
          color: #feb32a;
          span:nth-of-type(2) {
            font-weight: 600;
            font-size: var(--o-font-size-h5);
          }
          span:nth-of-type(4) {
            font-weight: 600;
            font-size: var(--o-font-size-h5);
          }
        }
      }
      .time,
      .entry-method {
        text-align: center;
        margin-top: var(--o-spacing-h8);
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        color: var(--o-color-text1);
      }
      .number {
        text-align: center;
        margin-top: var(--o-spacing-h8);
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-h4);
        color: var(--o-color-text1);
        background-color: var(--o-discount-bg);
        border: 1px solid var(--o-color-trafficpurple9);
      }
    }
  }
  .train-introduction {
    h2 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text1);
      text-align: center;
      font-weight: 300;
    }
    .intro-info {
      margin-top: var(--o-spacing-h2);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      color: var(--o-color-text1);
    }
    .intro-img {
      width: 100%;
      height: 110px;
      margin-top: 36px;
      img {
        width: 100%;
      }
    }
  }
  .train-advantage {
    margin-top: 58px;
    h2 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text1);
      text-align: center;
      font-weight: 300;
    }
    .adv-box {
      margin-top: var(--o-spacing-h2);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 160px 160px;
      .adv-item {
        padding: 25px 0 30px 0;
        background-color: var(--o-color-bg2);
        h3 {
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h8);
          font-weight: 300;
          color: var(--o-color-text1);
          text-align: center;
        }
        p {
          margin-top: 13px;
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-h5);
          color: var(--o-color-text3);
          text-align: center;
        }
      }
      .true,
      .true-mobile {
        background-color: #7d32ea;
        h3 {
          color: var(--o-color-white);
        }
        p {
          color: var(--o-color-neutral11);
        }
      }
    }
  }
  .train-system {
    margin-top: var(--o-spacing-h1);
    h2 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text1);
      text-align: center;
      font-weight: 300;
    }
    .system-box {
      margin-top: var(--o-spacing-h2);
      .system-short {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: var(--o-spacing-h4);
        .system-item {
          .item-head {
            padding: var(--o-spacing-h2) 10px var(--o-spacing-h2)
              var(--o-spacing-h2);
            display: flex;
            width: 100%;
            max-height: 160px;
            justify-content: start;
            cursor: pointer;
            .head-left {
              width: 104px;
              height: 80px;
              padding: 0 var(--o-spacing-h4);
              font-size: var(--o-font-size-h5);
              text-align: center;
              line-height: 80px;
              white-space: nowrap;
              color: #d68bff;
              background-color: #fff;
              margin-right: var(--o-spacing-h4);
            }
            .head-right {
              max-width: 272px;
              h3 {
                font-size: var(--o-font-size-h5);
                line-height: var(--o-line-height-h5);
                color: var(--o-color-white);
                font-weight: 300;
              }
              p {
                font-size: var(--o-font-size-text);
                line-height: var(--o-line-height-text);
                color: var(--o-color-neutral11);
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
              color: #7d32ea;
            }
          }
          .item-body {
            display: flex;
            flex-wrap: wrap;
            height: 322px;
            align-content: space-between;
            background-color: var(--o-color-bg2);
            padding: var(--o-spacing-h4) var(--o-spacing-h2) var(--o-spacing-h2);
            p {
              width: 100%;
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
              color: var(--o-color-text1);
              text-align: justify;
            }
            .course-title {
              margin-top: var(--o-spacing-h6);
            }
            .course-cost {
              margin-top: var(--o-spacing-h6);
            }
            .exam-cost {
              margin-top: var(--o-spacing-h6);
            }
          }
        }
      }
      .system-active {
        width: 100%;
        box-shadow: var(--o-shadow-l2);
        .item-head {
          background-color: #bd72ff;
          padding: var(--o-spacing-h2) var(--o-spacing-h4) var(--o-spacing-h2)
            var(--o-spacing-h2);
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          .leavel {
            width: 104px;
            height: 80px;
            padding: 0 var(--o-spacing-h4);
            font-size: var(--o-font-size-h5);
            text-align: center;
            line-height: 80px;
            white-space: nowrap;
            color: #d68bff;
            background-color: #fff;
            margin-right: var(--o-spacing-h4);
          }
          .name {
            max-width: 272px;
            margin-right: var(--o-spacing-h2);
            h3 {
              font-size: var(--o-font-size-h5);
              line-height: var(--o-line-height-h5);
              color: var(--o-color-white);
              font-weight: 300;
            }
            p {
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
              color: var(--o-color-neutral11);
            }
          }
          .detail {
            max-width: 856px;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--o-color-neutral11);
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
          background-color: var(--o-color-bg2);
          padding: var(--o-spacing-h4) var(--o-spacing-h2) var(--o-spacing-h2);
          .title {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--o-color-text1);
          }
          ul {
            margin-top: 13px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: var(--o-spacing-h4);
            li {
              border: 1px solid var(--o-color-border2);
              padding: var(--o-spacing-h4);
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              position: relative;
              box-sizing: border-box;
              cursor: pointer;
              .list-left {
                display: flex;
                .order {
                  width: 72px;
                  height: 72px;
                  line-height: 72px;
                  text-align: center;
                  font-size: var(--o-font-size-h5);
                  border: 1px solid var(--o-color-brand1);
                  margin-right: var(--o-spacing-h4);
                  color: var(--o-color-text1);
                }
                .course {
                  p {
                    font-size: var(--o-font-size-h6);
                    color: var(--o-color-text1);
                    line-height: var(--o-line-height-h6);
                    &::after {
                      content: '';
                      display: block;
                      width: 20px;
                      height: 2px;
                      margin-top: 4px;
                      background-color: var(--o-color-brand1);
                    }
                  }
                  .time {
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    .o-icon {
                      margin-right: 12px;
                      color: var(--o-color-text1);
                    }
                    .time-text {
                      color: var(--o-color-text4);
                      font-size: var(--o-font-size-text);
                      line-height: var(--o-line-height-text);
                    }
                  }
                }
              }
              .list-right {
                .more {
                  font-size: var(--o-font-size-text);
                  line-height: var(--o-line-height-text);
                  color: var(--o-color-text1);
                  margin-right: 8px;
                }
                .o-icon {
                  position: relative;
                  top: 2px;
                  color: var(--o-color-brand1);
                }
              }
              .more-list {
                width: calc(100% + 2px);
                position: absolute;
                padding: var(--o-spacing-h4) var(--o-spacing-h2);
                background-color: var(--o-color-bg4);
                left: -1px;
                bottom: 0;
                transform: translateY(100%);
                z-index: 2;
                overflow: hidden;
                border: 1px solid var(--o-color-brand1);
                border-top: none;
                // transition: 0.3s height linear;
                p {
                  font-size: var(--o-font-size-text);
                  line-height: var(--o-line-height-text);
                  color: var(--o-color-text1);
                }
              }
            }
            .no-checked {
              &:hover {
                border: 1px solid var(--o-color-brand1);
                box-shadow: var(--o-shadow-l2_hover);
              }
            }
            .checked {
              border: 1px solid var(--o-color-brand1);
              border-bottom: none;
              box-shadow: var(--o-shadow-l2_hover);
            }
          }
          .down-box {
            margin-top: var(--o-spacing-h4);
            a {
              width: auto;
              display: block;
              & ~ a {
                margin-top: var(--o-spacing-h6);
              }
            }
          }
          .no-data {
            text-align: center;
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
    margin-top: var(--o-spacing-h1);
    h2 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text1);
      text-align: center;
      font-weight: 300;
    }
    .step-box {
      margin: var(--o-spacing-h2) auto 0 auto;
      display: grid;
      padding: 0 86px;
      grid-gap: var(--o-spacing-h1);
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
        // margin-right: var(--o-spacing-h1);
        & ~ .step-item::before {
          content: '';
          display: inline-block;
          border-top: 16px solid transparent;
          border-right: 16px solid transparent;
          border-bottom: 16px solid transparent;
          border-left: 16px solid var(--o-color-bg1);
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
          color: var(--o-color-text1);
          font-size: var(--o-font-size-text);
          @media screen and (max-width: 1100px) {
            font-size: var(--o-font-size-tip);
          }
        }
      }
      .step1 {
        cursor: pointer;
        background-image: url(@/assets/category/authentication/training/img/step/01.png);
        &:hover {
          background-image: url(@/assets/category/authentication/training/img/step/01-hover.png);
          p {
            color: var(--o-color-white);
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
        cursor: pointer;
        margin-right: 0;
        background-image: url(@/assets/category/authentication/training/img/step/07.png);
        &:hover {
          background-image: url(@/assets/category/authentication/training/img/step/07-hover.png);
          p {
            color: var(--o-color-white);
          }
        }
      }
    }
  }
  .certificate-query {
    margin-top: var(--o-spacing-h1);
  }
  .train-qa {
    margin-top: var(--o-spacing-h1);
    h2 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text1);
      text-align: center;
      font-weight: 300;
    }
    .qa-box {
      margin-top: var(--o-spacing-h2);
      background-color: var(--o-color-bg2);
      .qa-item {
        padding: var(--o-spacing-h4) var(--o-spacing-h2);
        & ~ .qa-item {
          border-top: 1px solid var(--o-color-border2);
        }
        .el-collapse {
          border: none;
          :deep(.el-collapse-item__header) {
            height: var(--o-spacing-h4);
            line-height: var(--o-spacing-h4);
            border: none;
            background-color: var(--o-color-bg2);
            color: var(--o-color-text1);
          }
          :deep(.el-collapse-item__wrap) {
            border: none;
            background-color: var(--o-color-bg2);
            // color: var(--o-color-text1);
          }
          :deep(.el-collapse-item__content) {
            padding-bottom: 0;
          }
        }
        .qa-question {
          width: 100%;
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h8);
          color: var(--o-color-text1);
        }
        .qa-answer {
          margin-top: var(--o-spacing-h6);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--o-color-text3);
          text-align: justify;
        }
      }
    }
  }
  .train-contact {
    margin-top: var(--o-spacing-h4);
    p {
      font-size: var(--o-font-size-text);
      line-height: var(--o-font-size-text);
      @media screen and (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-font-size-tip);
      }
      span {
        color: var(--o-color-text3);
      }
      a {
        color: var(--o-color-brand1);
      }
    }
  }
}
.dark .training-pc {
  --o-discount-bg: var(--o-color-greyblack4);
}
.training-mobile {
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
  }
  h2 {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text1);
    text-align: center;
    font-weight: 300;
  }
  .train-introduction {
    .intro-info {
      margin-top: 8px;
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      color: var(--o-color-text1);
    }
    .intro-img {
      width: 100%;
      margin-top: var(--o-spacing-h5);
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      img {
        max-width: 100%;
      }
    }
  }
  .train-advantage {
    margin-top: var(--o-spacing-h2);
    .adv-box {
      margin-top: var(--o-spacing-h4);
      display: grid;
      grid-template-columns: 1fr 1fr;
      .adv-item {
        padding: var(--o-spacing-h5) 0;
        background-color: var(--o-color-bg2);
        h3 {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          font-weight: 300;
          color: var(--o-color-text1);
          text-align: center;
        }
        p {
          margin-top: 8px;
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          color: var(--o-color-text3);
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
          color: var(--o-color-white);
        }
        p {
          color: var(--o-color-neutral11);
        }
      }
      .true-mobile {
        background-color: var(--o-color-bg2);
      }
    }
  }
  .train-system {
    margin-top: var(--o-spacing-h2);
    .system-box {
      margin-top: var(--o-spacing-h5);
      .system-short {
        .system-item {
          .item-head {
            max-height: 160px;
            background-color: #bd72ff;
            padding: var(--o-spacing-h5);
            .head-content {
              width: 100%;
              display: flex;
              justify-content: start;
              .head-left {
                width: 52px;
                height: 28px;
                font-size: var(--o-font-size-text);
                text-align: center;
                line-height: 28px;
                white-space: nowrap;
                color: #bd72ff;
                background-color: var(--o-color-white);
                margin-right: var(--o-spacing-h5);
              }
              .head-right {
                max-width: 272px;
                font-size: var(--o-font-size-text);
                line-height: 28px;
                color: var(--o-color-white);
                font-weight: 300;
              }
            }
            p {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              color: var(--o-color-white);
              margin-top: var(--o-spacing-h8);
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
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              color: var(--o-color-text1);
            }
            .body-head {
              margin-top: var(--o-spacing-h5);
              .course {
                margin-top: var(--o-spacing-h8);
              }
            }
            .body-inner {
              margin-top: var(--o-spacing-h5);
              .course-cost {
                margin-top: var(--o-spacing-h8);
              }
              .exam-cost {
                margin-top: var(--o-spacing-h8);
              }
            }
          }
          .course-list {
            margin-top: var(--o-spacing-h5);
            overflow: hidden;
            .title {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              color: var(--o-color-text1);
            }
            ul {
              margin-top: var(--o-spacing-h5);
              li {
                border: 1px solid var(--o-color-brand1);
                box-sizing: border-box;
                cursor: pointer;
                & ~ li {
                  margin-top: 8px;
                }
                .course-head {
                  padding: var(--o-spacing-h5);
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  position: relative;
                  .list-left {
                    display: flex;
                    .order {
                      width: 58px;
                      height: 58px;
                      line-height: 58px;
                      text-align: center;
                      font-size: var(--o-font-size-h6);
                      border: 1px solid var(--o-color-brand1);
                      margin-right: var(--o-spacing-h8);
                      color: var(--o-color-text1);
                    }
                    .course {
                      p {
                        font-size: var(--o-font-size-text);
                        color: var(--o-color-text1);
                        line-height: var(--o-line-height-text);
                        &::after {
                          content: '';
                          display: block;
                          width: 20px;
                          height: 2px;
                          margin-top: 4px;
                          background-color: var(--o-color-brand1);
                        }
                      }
                      .time {
                        margin-top: 12px;
                        display: flex;
                        align-items: center;
                        .o-icon {
                          margin-right: 6px;
                          color: var(--o-color-text1);
                          font-size: 16px;
                        }
                        .time-text {
                          color: var(--o-color-text4);
                          font-size: var(--o-font-size-tip);
                          line-height: var(--o-line-height-tip);
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
                      color: var(--o-color-brand1);
                    }
                  }
                  .more-show {
                    transform: rotateZ(90deg);
                  }
                }

                .more-list {
                  padding: var(--o-spacing-h5);
                  background-color: var(--o-color-bg4);
                  overflow: hidden;
                  p {
                    font-size: var(--o-font-size-tip);
                    line-height: var(--o-line-height-tip);
                    color: var(--o-color-text1);
                  }
                }
              }
            }
            .down-box {
              margin-top: var(--o-spacing-h5);
              a {
                display: block;
                font-size: var(--o-font-size-tip);
                line-height: var(--o-line-height-tip);
                & ~ a {
                  margin-top: var(--o-spacing-h8);
                }
              }
            }
          }

          & ~ .system-item {
            margin-top: var(--o-spacing-h5);
          }
          .no-data {
            text-align: center;
          }
          .more-button {
            width: 100%;
            text-align: center;
            .o-button {
              font-size: var(--o-font-size-tip);
            }
            :deep(.suffix-icon) {
              color: var(--o-color-brand1);
            }
          }
        }
      }
    }
  }
  .train-step {
    margin-top: var(--o-spacing-h2);
    .step-box {
      display: grid;
      grid-gap: 8px;
      max-width: 798px;
      margin: var(--o-spacing-h5) auto 0 auto;
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
          border-left: 8px solid var(--o-color-bg1);
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
          color: var(--o-color-text1);
          font-size: var(--o-font-size-text);
          @media screen and (max-width: 1100px) {
            font-size: var(--o-font-size-tip);
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
  .train-qa {
    margin-top: var(--o-spacing-h2);
    .qa-box {
      margin-top: var(--o-spacing-h5);
      .qa-item {
        .qa-text {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--o-color-text1);
        }
        .qa-answer {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          color: var(--o-color-text1);
          text-align: justify;
        }
        :deep(.el-collapse) {
          border-top: none;
          border-bottom: none;
        }
        :deep(.el-collapse-item__header) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
        :deep(.el-collapse-item__wrap) {
          background-color: var(--o-color-bg4);
        }
      }
    }
  }
  .train-contact {
    margin-top: var(--o-spacing-h5);
    p {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      color: var(--o-color-text1);
      @media screen and (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
      }
    }
  }

  :deep(.el-collapse-item__wrap) {
    border-bottom: none;
  }
  :deep(.el-collapse-item__header) {
    background-color: var(--o-color-bg2);
    color: var(--o-color-text1);
    border-bottom: 1px solid var(--o-color-border2);
    box-shadow: var(--o-shadow-l2);
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
