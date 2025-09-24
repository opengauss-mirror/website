<script setup lang="ts">
import { computed, ref, Ref, CSSProperties, watch, onMounted } from 'vue';
import { useRouter, useData, useRoute } from 'vitepress';
import { postFeedback } from '@/api/api-feedback';
import { ElMessage } from 'element-plus';
import { windowOpen } from '@/shared/utils';
import { useGuideStore } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';
import { VULBOX_LINK, GAUSS_EMAIL, QUESTIONNAIRE_SURVEY } from '@/data/url-config';
import { useThrottleFn } from '@vueuse/core';
import { OPopup } from '@opensig/opendesign';

import IconTop from '~icons/float/icon-top.svg';
import IconSmile from '~icons/float/icon-smile.svg';
import IconCancel from '~icons/app/icon-cancel.svg';
import IconAsk from '~icons/float/icon-ask.svg';
import IconHeadsetBig from '~icons/float/icon-headset-big.svg';
import IconScore from '~icons/float/icon-score.svg';

const guideStore = useGuideStore();
const screenWidth = useWindowResize();
const { lang } = useData();
const router = useRouter();

const isPc = computed(() => screenWidth.value > 1100);

// 漏洞奖励计划浮窗
const isSafetyFloatShow = ref(false);
const FLOAT_BUG_TEXT = '漏洞奖励';
const route = useRoute();

watch(
  route,
  (newValue) => {
    const pathList = ['security-advisories', 'vulnerability-management', 'cve'];
    isSafetyFloatShow.value = false;
    pathList.forEach((item) => {
      if (item === newValue.path.split('/')[2]) {
        isSafetyFloatShow.value = true;
      }
    });
  },
  { immediate: true }
);

const TITLES1 = ['您向他人推荐 ', '您对 '];
const TITLES2 = ['openGauss社区', 'openGauss下载版块', 'openGauss学习版块', 'openGauss社区版块', 'openGauss认证版块', 'openGauss互动版块', 'openGauss安全版块'];
const TITLES3 = [' 的可能性有多大？', ' 的整体满意度如何？'];

interface TitleItemT {
  [url: string]: string;
}
const tipsObj: TitleItemT = {
  '/zh/': TITLES2[0],
  '/download/': TITLES2[1],
  '/tools/': TITLES2[1],
  '/quick-start/': TITLES2[2],
  '/advanced/': TITLES2[2],
  '/contribution/': TITLES2[3],
  '/online-communication/': TITLES2[3],
  '/member/': TITLES2[3],
  '/user-practice/': TITLES2[3],
  '/finance/': TITLES2[3],
  '/certification/': TITLES2[4],
  '/compatibility/': TITLES2[4],
  '/ogsp/': TITLES2[4],
  '/training/': TITLES2[4],
  '/news/': TITLES2[5],
  '/blogs/': TITLES2[5],
  '/events/': TITLES2[5],
  '/video/': TITLES2[5],
  '/summit/': TITLES2[5],
  '/vulnerability-management/': TITLES2[6],
  '/security-advisories/': TITLES2[6],
  '/cve/': TITLES2[6],
};
const title2 = ref(TITLES2[0]);
const title1 = computed(() => {
  if (title2.value === TITLES2[0]) {
    return TITLES1[0];
  } else {
    return TITLES1[1];
  }
});
const title3 = computed(() => {
  if (title2.value === TITLES2[0]) {
    return TITLES3[0];
  } else {
    return TITLES3[1];
  }
});
// 移动端是否需要单独设置margin
const isMargin = ref(false);
onMounted(() => {
  watch(
    () => router.route.path,
    () => {
      if (router.route.path === '/zh/') {
        title2.value = TITLES2[0];
      } else {
        Object.keys(tipsObj).forEach((item) => {
          if (router.route.path.includes(item)) {
            title2.value = tipsObj[item];
          }
        });
        if (router.route.path.includes('finance')) {
          isMargin.value = true;
        }
      }
    },
    { immediate: true }
  );
});
// pop1 start
const score = ref(0);
const scoreTip = computed(() => {
  return score.value / 10;
});
const isShow = ref(false);
const isReasonShow = ref(false);
const inputText = ref('');

const nssRef = ref();
const onMouseEnter = () => {
  isShow.value = true;
};
const onMouseLeave = () => {
  isShow.value = false;
};

function cancelPopup() {
  isReasonShow.value = false;
  inputText.value = '';
  score.value = 0;
  isShow.value = false;
}

function handleInput() {
  isReasonShow.value = true;
}
const scorePosition = computed(() => {
  return score.value + '%';
});
const STEP = 10;
interface Mark {
  style: CSSProperties;
  label: string;
}
type Marks = Record<number, Mark | string>;
const marks = computed(() => {
  const temp: Marks = {};
  for (let i = 0; i < STEP + 1; i++) {
    temp[i * 10] = '';
  }
  return temp;
});

const infoData = {
  grade1: '0-不可能',
  grade2: '10-非常可能',
  grade1_1: '0-不满意',
  grade2_1: '10-非常满意',
  placeholder1: '请输入您不太满意的原因（0-6）',
  placeholder2: '改进哪些方面会让您更满意？（7-8）',
  placeholder3: '请输入您满意的原因（9-10）',
  more: '感谢您的反馈，如需帮助可联系',
  emile: GAUSS_EMAIL,
  submit: '提交',
  cancel: '取消',
  confirm: '确认',
  feedbackTitle: '满意度反馈',
  welcome: '欢迎在此反馈您在社区体验中的任何建议或问题',
  know: '知道了',
};
const placeholder = computed(() => {
  if (title2.value === TITLES2[0]) {
    if (score.value / 10 < 7) {
      return '请输入您不太推荐的原因';
    } else if (score.value / 10 < 9) {
      return '改进哪些方面会让您更愿意推荐？';
    } else {
      return '请输入您推荐的原因';
    }
  } else {
    if (score.value / 10 < 7) {
      return '请输入您不太满意的原因';
    } else if (score.value / 10 < 9) {
      return '改进哪些方面会让您更满意？';
    } else {
      return '请输入您满意的原因';
    }
  }
});
const isFocuse = ref(false);
const textareaRef: Ref<HTMLElement | null> = ref(null);
const toggleIsFocuse = (focus: boolean) => {
  isFocuse.value = focus;
};
onMounted(() => {
  if (textareaRef.value) {
    textareaRef.value.addEventListener('focus', () => {
      isFocuse.value = true;
    });
    textareaRef.value.addEventListener('blur', () => {
      isFocuse.value = false;
    });
  }
});
// pop1 end
// pop2 start
const floatData = [
  {
    img: IconHeadsetBig,
    text: '问题反馈',
    emile: GAUSS_EMAIL,
  },
];

const floatServiceData = [
  {
    id: 'surver',
    img: IconSmile,
    text: '满意度问卷',
  },
  { id: 'nss', img: IconScore, text: '我要评分' },
];

const jumpTo = (id: string) => {
  if (id === 'nss') {
    dialogVisible.value = true;
  } else if (id === 'surver') {
    windowOpen(QUESTIONNAIRE_SURVEY, '_blank');
  }
};

function handleClickTop() {
  window.scrollTo(0, 0);
}
function postScore() {
  if (!isReasonShow.value) {
    return;
  }
  const params = {
    feedbackPageUrl: window.location.href,
    feedbackText: inputText.value,
    feedbackValue: score.value / 10,
  };
  postFeedback(params).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: '提交成功，感谢您的反馈！',
        type: 'success',
      });
    } else {
      ElMessage({
        message: res.msg,
        type: 'error',
      });
    }
  });
}
function handleClickSubmit() {
  postScore();
}

// 峰会页面不显示floating button
const isSummit = ref(true);

const startsWithSlashSummit = (path: string) => {
  return /^\/(zh|en)\/summit/.test(path);
};

const isFloatTipShow = ref(false);
onMounted(() => {
  watch(
    () => router.route.path,
    (v) => {
      if (v === '/zh/') {
        isFloatTipShow.value = true;
        setTimeout(() => {
          isFloatTipShow.value = false;
        }, 5000);
      } else {
        isFloatTipShow.value = false;
      }

      isSummit.value = startsWithSlashSummit(v);
    },
    { immediate: true }
  );
});
const closeFloatTip = () => {
  isFloatTipShow.value = false;
};

// 移动端评分
const dialogVisible = ref(false);
const marksMobile = computed(() => {
  const temp = [];
  for (let i = 0; i < STEP + 1; i++) {
    temp.push(i);
  }
  return temp;
});
const toggleDialogVisible = () => {
  dialogVisible.value = true;
};

const cancelDialog = () => {
  dialogVisible.value = false;
  isReasonShow.value = false;
  inputText.value = '';
  score.value = 0;
};

const isMobileFloatShow = ref(true);
const closeMobileFloat = () => {
  isMobileFloatShow.value = false;
};
const setScore = (val: number) => {
  isReasonShow.value = true;
  score.value = val * 10;
};

const askRef = ref();
const serverRef = ref();
</script>

<template>
  <div v-if="lang === 'zh' && !guideStore.isOpen" class="float">
    <ClientOnly>
      <div v-if="!isFloatTipShow" :class="isSafetyFloatShow ? 'safety-tips' : ''">
        <a :href="isSafetyFloatShow ? VULBOX_LINK : ''" :target="isSafetyFloatShow ? '_blank' : '_self'" rel="noopener noreferrer">
          {{ isSafetyFloatShow ? FLOAT_BUG_TEXT : '' }}
        </a>
      </div>
      <div class="float-wrap">
        <div v-show="isFloatTipShow" class="float-tip">
          <h4 class="tip-title">{{ infoData.feedbackTitle }}</h4>
          <div class="tip-detail">{{ infoData.welcome }}</div>
          <div class="btn-box">
            <OButton size="mini" @click="closeFloatTip">{{ infoData.know }}</OButton>
          </div>
        </div>
        <div class="nav-box">
          <a v-if="isPc" :href="QUESTIONNAIRE_SURVEY" target="_blank" rel="noopener noreferrer">
            <div class="nav-box-question">满意度问卷</div>
          </a>
          <div class="nav-box1">
            <div v-if="isPc" id="nss" class="nav-item" @mouseenter="onMouseEnter" @mouseleave="useThrottleFn(onMouseLeave, 300)">
              <OIcon ref="nssRef" class="icon-box">
                <component :is="IconSmile" />
              </OIcon>
              <OPopup
                :visible="isShow"
                position="right"
                :target="nssRef"
                :auto-hide="isShow ? false : true"
                wrapper="#nss"
                body-class="popup-nss"
                :offset="20"
                trigger="hover"
              >
                <OIcon class="icon-cancel" @click="cancelPopup">
                  <IconCancel />
                </OIcon>
                <div class="slider">
                  <p class="slider-title">
                    {{ title1 }}
                    <span class="title-name">{{ title2 }}</span>
                    {{ title3 }}
                  </p>
                  <div class="slider-body">
                    <div class="slider-tip">
                      <div v-show="isReasonShow" class="slide-btn-tip">
                        {{ scoreTip }}
                      </div>
                    </div>
                    <el-slider v-model="score" show-stops :step="10" :marks="marks" :show-tooltip="false" @input="handleInput" />
                    <div class="grade-info">
                      <span>{{ title2 === TITLES2[0] ? infoData.grade1 : infoData.grade1_1 }}</span>
                      <span>{{ title2 === TITLES2[0] ? infoData.grade2 : infoData.grade2_1 }}</span>
                    </div>
                  </div>
                  <div v-show="isReasonShow" class="reason">
                    <el-input
                      v-model="inputText"
                      :rows="3"
                      type="textarea"
                      :placeholder="placeholder"
                      maxlength="500"
                      resize="none"
                      show-word-limit
                      @focus="toggleIsFocuse(true)"
                      @blur="toggleIsFocuse(false)"
                    />
                    <p class="more-info">
                      {{ infoData.more }}
                      <a :href="'mailto:' + infoData.emile">
                        {{ infoData.emile }}
                      </a>
                    </p>
                    <div class="submit-btn">
                      <OButton type="outline" size="mini" @click="handleClickSubmit">
                        {{ infoData.submit }}
                      </OButton>
                    </div>
                  </div>
                </div>
              </OPopup>
            </div>
            <div v-else class="nav-item">
              <OIcon ref="serverRef" class="icon-box"><component :is="IconSmile"></component> </OIcon>
              <el-popover
                placement="left-start"
                :virtual-ref="serverRef"
                popper-class="service-body"
                :width="isPc ? 260 : 90"
                :offset="20"
                trigger="hover"
                v-if="!dialogVisible"
              >
                <div v-for="item in floatServiceData" :key="item.id" class="pop-item" @click="jumpTo(item.id)">
                  <OIcon><component :is="item.img"></component></OIcon>
                  <div class="text">
                    <p class="text-name">
                      {{ item.text }}
                    </p>
                  </div>
                </div>
              </el-popover>
            </div>
            <div class="nav-item">
              <OIcon ref="askRef" class="icon-box"><component :is="IconAsk"></component> </OIcon>
              <el-popover placement="left-start" :virtual-ref="askRef" popper-class="service-body" :width="isPc ? 260 : 90" :offset="20" trigger="hover">
                <a :href="'mailto:' + item.emile" v-for="item in floatData" :key="item.emile" class="pop-item" rel="noopener noreferrer">
                  <OIcon><component :is="item.img"></component></OIcon>
                  <div class="text">
                    <p class="text-name">
                      {{ item.text }}
                    </p>
                    <p class="text-tip">
                      {{ item.emile }}
                    </p>
                  </div>
                </a>
              </el-popover>
            </div>
          </div>
          <div class="nav-item nav-box2" @click="handleClickTop">
            <OIcon><component :is="IconTop"></component> </OIcon>
          </div>
        </div>
      </div>
      <template v-if="screenWidth < 1100">
        <div v-if="isMobileFloatShow && !isSummit" class="float-mobile" :class="{ 'mobile-margin': isMargin }">
          <div class="float-head">
            <div class="head-title" @click="toggleDialogVisible">
              <OIcon class="icon-box"><component :is="IconScore"></component> </OIcon>
              <p>
                {{ title1 }}
                <span class="title-name">{{ title2 }}</span>
                {{ title3 }}
              </p>
            </div>
            <OIcon class="icon-box icon-close" @click="closeMobileFloat"><component :is="IconCancel"></component> </OIcon>
          </div>
          <el-dialog v-model="dialogVisible" :show-close="false">
            <div class="o-popup1">
              <div class="slider">
                <p class="slider-title">
                  {{ title1 }}
                  <span class="title-name">{{ title2 }}</span>
                  {{ title3 }}
                </p>
                <ul class="score-list">
                  <li
                    v-for="item in marksMobile"
                    :key="'mark' + item"
                    :style="{ left: item * 10 + '%' }"
                    :class="{ 'is-active': score / 10 === item }"
                    @click="setScore(item)"
                  >
                    {{ item }}
                  </li>
                </ul>
                <div class="slider-body">
                  <el-slider v-model="score" :step="STEP" :marks="marks" show-stops :show-tooltip="false" @input="handleInput" />
                </div>
                <div class="grade-info">
                  <span>{{ title2 === TITLES2[0] ? infoData.grade1 : infoData.grade1_1 }}</span>
                  <span>{{ title2 === TITLES2[0] ? infoData.grade2 : infoData.grade2_1 }}</span>
                </div>
              </div>
              <div v-show="isReasonShow" class="reason">
                <el-input
                  v-model="inputText"
                  :rows="5"
                  type="textarea"
                  :placeholder="placeholder"
                  maxlength="500"
                  resize="none"
                  show-word-limit
                  @focus="toggleIsFocuse(true)"
                  @blur="toggleIsFocuse(false)"
                />
                <p class="more-info">
                  {{ infoData.more }}
                  <a :href="'mailto:' + infoData.emile">
                    {{ infoData.emile }}
                  </a>
                </p>
              </div>
              <div class="btn-box">
                <OButton type="outline" size="middle" @click="cancelDialog">{{ infoData.cancel }}</OButton>
                <OButton type="outline" size="middle" :class="{ forbidden: !isReasonShow }" @click="postScore">{{ infoData.confirm }}</OButton>
              </div>
            </div>
          </el-dialog>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
<style lang="scss" scoped>
.pop-item {
  display: flex;
  color: var(--e-color-text1);
  & ~ .pop-item {
    margin-top: 18px;
    @media (max-width: 1100px) {
      margin-top: 12px;
    }
  }
  .o-icon {
    font-size: 32px;
    svg {
      fill: currentColor;
    }
    @media (max-width: 1100px) {
      font-size: 24px;
    }
  }
  .text {
    margin-left: 12px;
    text-align: left;
    font-size: var(--e-font-size-text);
    @media (max-width: 1100px) {
      margin-left: 8px;
    }
    .text-name {
      line-height: 32px;
      font-weight: 600;
      @media (max-width: 1100px) {
        line-height: 22px;
        font-weight: normal;
      }
      a {
        color: var(--e-color-text1);
        &:hover {
          color: var(--e-color-brand1);
        }
      }
    }
    .text-tip {
      font-size: var(--e-font-size-tip);
      line-height: 18px;
      color: var(--e-color-text3);
      @media (max-width: 1100px) {
        display: none;
      }
    }
  }
  &:hover,
  &:active {
    cursor: pointer;
    .o-icon,
    a,
    .text-tip,
    .text-name {
      color: var(--o-color-primary2);
    }
  }
}

.float {
  position: fixed;
  bottom: 190px;
  right: 80px;
  z-index: 10;
  @media (max-width: 1700px) {
    right: 20px;
  }
  @media (max-width: 1560px) {
    right: 2px;
  }
  @media (max-width: 1526px) {
    right: 44px;
  }
  @media (max-width: 1439px) {
    right: 24px;
  }
  @media (max-width: 1100px) {
    bottom: 16px;
    right: 16px;
    left: 16px;
    z-index: 9;
  }
  :deep(.o-popup) {
    .popup-nss {
      background-color: var(--o-color-fill2);
      padding: 16px 24px;
      box-shadow: var(--o-shadow-2);
      --popup-min-width: 360px;

      .icon-cancel {
        position: absolute;
        top: 12px;
        right: 12px;
        cursor: pointer;
        font-size: 20px;
        color: var(--o-color-info2);
      }
    }

    .slider {
      .slider-title {
        font-size: var(--e-font-size-text);
        line-height: 20px;
        color: var(--e-color-text1);
        text-align: center;
        white-space: nowrap;
        .title-name {
          font-weight: 600;
        }
      }
      .slider-body {
        padding-top: 30px;
        .slider-tip {
          position: relative;
          .slide-btn-tip {
            width: 28px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: var(--e-font-size-tip);
            color: var(--e-color-text1);
            background-color: var(--e-color-bg2);
            box-shadow: var(--e-shadow-l2);
            position: absolute;
            top: -30px;
            transform: translateX(-50%);
            left: v-bind(scorePosition);
            &::after {
              border-color: var(--e-color-bg2) transparent transparent;
              border-style: solid;
              border-width: 8px 8px 0;
              bottom: -5px;
              content: '';
              display: block;
              height: 0;
              position: absolute;
              right: 6px;
              width: 0;
            }
          }
        }
      }
      .grade-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: var(--e-font-size-tip);
        color: var(--e-color-text4);
        margin-top: 14px;
      }
    }
    .reason {
      margin-top: 16px;
      :deep(.el-textarea) {
        .el-textarea__inner {
          background-color: var(--e-color-bg2);
          border-radius: 0;
          box-shadow: 0 0 0 1px var(--e-color-border2) inset;
          color: var(--e-color-text1);
          &:focus {
            box-shadow: 0 0 0 1px var(--e-color-border1) inset;
          }
        }
        .el-input__count {
          background-color: var(--e-color-bg2);
        }
      }
      .more-info {
        display: flex;
        flex-wrap: wrap;
        margin-top: 8px;
        color: var(--e-color-text4);
        font-size: var(--e-font-size-tip);
        line-height: 18px;
      }
      .submit-btn {
        margin-top: 16px;
        text-align: center;
        :deep(.o-button) {
          border-color: var(--e-color-border1);
          color: var(--e-color-text1);
          &:hover {
            background-color: var(--e-color-brand1);
            border-color: var(--e-color-brand1);
            color: var(--e-color-white);
          }
        }
      }
    }
  }
  :deep(.el-slider) {
    height: auto;
    height: 8px;
    .el-slider__runway {
      background-color: var(--e-color-bg-secondary);
    }
    .el-slider__bar {
      background-image: linear-gradient(90deg, #b461f6 0%, #7d32ea 100%);
    }
    .el-slider__button-wrapper + div {
      position: relative;
      transform: translateY(2px);
      z-index: 2;
      & + div {
        transform: translateY(2px);
        & > .el-slider__stop:nth-of-type(1) {
          transform: translatex(2px);
        }
      }
    }
    .el-slider__stop {
      width: 2px;
      height: 2px;
      background-color: var(--e-color-bg6);
    }

    .el-slider__marks-stop {
      background-color: var(--e-color-bg2);
      &:nth-last-of-type(1) {
        transform: translateX(-4px);
        background-color: var(--e-color-bg6);
      }
    }
    .el-slider__button {
      position: relative;
      border: none;
      box-shadow: var(--e-shadow-l3);
      &::after {
        display: block;
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--e-color-brand1);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .safety-tips {
    width: 48px;
    height: 112px;
    background-image: url('@/assets/category/float/float-safety.png');
    background-size: 100%;
    margin-bottom: 12px;
    position: relative;
    &:hover {
      background-image: url('@/assets/category/float/float-safety-hover.png');
      .close-img {
        display: inline-block;
      }
    }
    a {
      display: inline-block;
      color: var(--e-color-white);
      font-size: var(--e-font-size-text);
      padding: 20px 17px;
    }
    .close-img {
      display: none;
      position: absolute;
      cursor: pointer;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }
  }
  .questionnaire-tips {
    width: 48px;
    height: 112px;
    background-image: url('@/assets/category/questionnaire/2023/float-bg.png');
    background-size: 100%;
    margin-bottom: 12px;
    position: relative;
    &:hover {
      .close-img {
        display: inline-block;
      }
    }
    a {
      display: inline-block;
      color: var(--e-color-white);
      font-size: var(--e-font-size-text);
      line-height: 16px;
      padding: 20px 17px;
    }
    .close-img {
      display: none;
      position: absolute;
      cursor: pointer;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }
  }
  .float-wrap {
    display: flex;
    flex-direction: column;
    @media (max-width: 1100px) {
      position: absolute;
      right: 0;
      bottom: 164px;
    }
    .float-tip {
      position: absolute;
      width: 200px;
      top: 0;
      right: 0;
      background-color: var(--e-color-bg2);
      padding: 16px;
      transform: translate(34%, -110%);
      @media (max-width: 1700px) {
        transform: translate(0, -110%);
      }
      .tip-title {
        color: var(--e-color-text1);
        font-size: 16px;
      }
      .tip-detail {
        margin-top: 4px;
        font-size: 14px;
        color: var(--e-color-text3);
      }
      .btn-box {
        margin-top: 8px;
        display: flex;
        justify-content: end;
        .o-button {
          font-size: 14px;
          border: none;
          padding: 0;
          color: var(--e-color-text3);
        }
      }
      &::after {
        display: block;
        content: '';
        width: 0;
        border-left: 8px solid transparent;
        border-top: 8px solid var(--e-color-bg2);
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
        position: absolute;
        bottom: -14px;
        left: 50%;
        @media (max-width: 1700px) {
          left: 84%;
        }
      }
    }
    .nav-item {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 48px;
      height: 48px;
      padding: 12px;
      background-color: var(--e-color-bg2);
      background-size: cover;
      font-size: 12px;
      line-height: 18px;
      color: var(--e-color-text1);
      position: relative;
      cursor: pointer;
      &:hover {
        .icon-box {
          color: var(--e-color-brand1);
        }
      }
      &:nth-of-type(1) + .nav-item::before {
        display: block;
        content: '';
        height: 1px;
        width: 16px;
        background-color: var(--e-color-bg4);
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%);
      }
      .o-icon {
        font-size: 24px;
      }
    }
    .nav-box-question {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 134px;
      background-image: url('@/assets/category/float/float-question.png');
      text-align: center;
      color: var(--e-color-white);
      writing-mode: vertical-lr;
      letter-spacing: 5px;
      font-size: 16px;
      cursor: pointer;
      box-shadow: var(--e-shadow-l1);

      &:hover {
        background-image: url('@/assets/category/float/float-question-hover.png');
      }
    }
    .nav-box1 {
      margin-top: 12px;
      box-shadow: var(--e-shadow-l1);
    }
    .nav-box2 {
      margin-top: 12px;
      box-shadow: var(--e-shadow-l1);
      &.nav-item {
        background-color: var(--e-color-bg2);
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .float-mobile {
    width: 100%;
    padding: 0;
    margin-bottom: 16px;
    &.mobile-margin {
      margin-top: 16px;
    }
    .float-head {
      height: 40px;
      padding: 12px;
      margin: 0 auto;
      text-align: center;
      background: linear-gradient(90deg, #e8d8f7 0%, #ddcff5 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      position: relative;
      .o-icon {
        font-size: 20px;
        color: #000;
      }
      .icon-close {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
      }
      .head-title {
        display: flex;
        height: 100%;
        align-items: center;
        font-size: 12px;
        line-height: 16px;
        white-space: nowrap;
        position: relative;
        .title-name {
          font-weight: 600;
        }
        .o-icon {
          margin-right: 8px;
        }
        p {
          color: #000;
        }
      }
    }
    :deep(.el-dialog) {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
      margin-bottom: 0;
      margin-top: 0;
      background-color: transparent;
      border-radius: 8px 8px 0px 0px;
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__body {
        padding: 0;
        border-radius: 8px 8px 0px 0px;
      }
    }

    .o-popup1 {
      width: 100%;
      background-color: var(--e-color-bg2);
      padding: 16px 24px;
      transform-origin: 100% 50%;
      border-radius: 8px 8px 0px 0px;
      cursor: default;
      .icon-cancel {
        position: absolute;
        top: 5px;
        right: 10px;
        cursor: pointer;
        color: var(--e-color-text1);
      }
      .slider {
        .slider-title {
          font-size: var(--e-font-size-text);
          line-height: 20px;
          color: var(--e-color-text1);
          text-align: center;
          white-space: nowrap;
          .title-name {
            font-weight: 600;
          }
        }
        .score-list {
          width: 100%;
          display: flex;
          position: relative;
          height: 18px;
          line-height: 18px;
          margin-top: 18px;
          li {
            position: absolute;
            transform: translateX(-50%);
            font-size: 14px;
            color: var(--e-color-text4);
            &.is-active {
              color: var(--e-color-text1);
              font-size: 16px;
            }
            &:nth-last-of-type(1) {
              left: 99% !important;
              white-space: nowrap;
            }
          }
        }
        .slider-body {
          margin-top: 10px;
          .slider-tip {
            position: relative;
            .slide-btn-tip {
              display: flex;
              width: 110%;
              li {
                flex-grow: 1;
                &:nth-of-type(2) {
                  transform: translateX(-2px);
                }
              }
            }
          }
          :deep(.el-slider) {
            height: auto;
            height: 12px;
            margin-top: 10px;
            .el-slider__button-wrapper {
              top: 50%;
              transform: translate(-50%, -50%);
            }
            .el-slider__runway {
              height: 100%;
              background-color: var(--e-color-bg-secondary);
              border-radius: 8px;
            }
            .el-slider__bar {
              height: 100%;
              border-radius: 8px;
              background-image: linear-gradient(90deg, #b461f6 0%, #7d32ea 100%);
            }
            .el-slider__button-wrapper + div {
              position: relative;
              transform: translateY(5px);
              z-index: 2;
              & + div {
                transform: translateY(5px);
                & > .el-slider__stop:nth-of-type(1) {
                  transform: translatex(2px);
                }
              }
            }
            .el-slider__stop {
              width: 2px;
              height: 2px;
              background-color: var(--e-color-bg6);
            }
            .el-slider__marks {
              width: 100%;
              transform: translateY(-42px);

              .el-slider__marks-text:nth-last-child(1) {
                left: 99% !important;
                white-space: nowrap;
              }
            }

            .el-slider__marks-stop {
              background-color: var(--e-color-bg2);
              &:nth-last-of-type(1) {
                transform: translateX(-6px);
                background-color: var(--e-color-bg6);
              }
            }
            .el-slider__button {
              position: relative;
              border: none;
              box-shadow: var(--e-shadow-l3);
              &::after {
                display: block;
                content: '';
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: var(--e-color-brand1);
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
        .grade-info {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: var(--e-font-size-tip);
          color: var(--e-color-text4);
          margin-top: 8px;
          span {
            scale: 0.84;
          }
        }
      }
      .reason {
        margin-top: 16px;
        :deep(.el-textarea) {
          .el-textarea__inner {
            background-color: var(--e-color-bg2);
            border-radius: 0;
            box-shadow: 0 0 0 1px var(--e-color-border2) inset;
            color: var(--e-color-text1);
            &:focus {
              box-shadow: 0 0 0 1px var(--e-color-border1) inset;
            }
          }
          .el-input__count {
            background-color: var(--e-color-bg2);
          }
        }
        .more-info {
          margin-top: 8px;
          color: var(--e-color-text4);
          font-size: var(--e-font-size-tip);
          line-height: 18px;
          text-align: center;
        }
      }
      .btn-box {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        .o-button {
          flex-grow: 1;
          justify-content: center;
          border: none;
          color: var(--e-color-text1);
          position: relative;
          padding: 0;
          &.forbidden {
            color: var(--e-color-text5);
          }
          &:nth-of-type(1)::after {
            display: block;
            content: '';
            width: 1px;
            height: 100%;
            background-color: var(--e-color-text5);
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
    }
  }
}
@include in-dark {
  .safety-tips,
  .questionnaire-tips,
  .float-head {
    @include img-in-dark;
  }
}
</style>
