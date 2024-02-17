<script setup lang="ts">
import { computed, ref, Ref, CSSProperties, watch, onMounted } from 'vue';
import { useRouter, useData, useRoute } from 'vitepress';
import { postFeedback } from '@/api/api-feedback';
import { ElMessage } from 'element-plus';

import useWindowResize from '@/components/hooks/useWindowResize';
import { VULBOX_LINK, GAUSS_EMAIL } from '@/data/url-config';
import { handleError } from '@/shared/utils';

import floatClose from '@/assets/category/float/float-close.png';

import IconTop from '~icons/float/icon-top.svg';
import IconSmile from '~icons/float/icon-smile.svg';
import IconHeadset from '~icons/float/icon-headset.svg';
import IconCancel from '~icons/app/icon-cancel.svg';
import IconSmileMobile from '~icons/float/icon-smile-mobile.svg';
import IconHeadsetBig from '~icons/float/icon-headset-big.svg';

const screenWidth = useWindowResize();
const { lang } = useData();
const router = useRouter();

// 满意度调研浮窗
const FLOAT_QUESTIONNAIRE = '有奖问卷';
const QUESTIONNAIRE_LINK = '/zh/events/2023-10-27/questionnaire.html';
const isFloatShow = ref(false);

// 漏洞奖励计划浮窗
const isSafetyFloatShow = ref(false);
const FLOAT_BUG_TEXT = '漏洞奖励';
const route = useRoute();
const closeBgFloat = () => {
  isFloatShow.value = false;
};
watch(
  route,
  (newValue) => {
    const pathList = ['security-advisories', 'security', 'cve'];
    isSafetyFloatShow.value = false;
    pathList.forEach((item) => {
      if (item === newValue.path.split('/')[2]) {
        isSafetyFloatShow.value = true;
      }
    });
    if (newValue.path.split('/').pop() !== 'questionnaire.html') {
      isFloatShow.value = true;
    } else {
      isFloatShow.value = false;
    }
  },
  { immediate: true }
);

const TITLES1 = ['您向他人推荐 ', '您对 '];
const TITLES2 = [
  'openGauss社区',
  'openGauss下载版块',
  'openGauss学习版块',
  'openGauss社区版块',
  'openGauss认证版块',
  'openGauss互动版块',
  'openGauss安全版块',
];
const TITLES3 = [' 的可能性有多大？', ' 的整体满意度如何？'];

interface TitleItemT {
  [url: string]: string;
}
const tipsObj: TitleItemT = {
  '/zh/': TITLES2[0],
  '/download/': TITLES2[1],
  '/supporttools/': TITLES2[1],
  '/knowledge/': TITLES2[2],
  '/advanced/': TITLES2[2],
  '/contribution/': TITLES2[3],
  '/community/onlineCommunication/': TITLES2[3],
  '/member/': TITLES2[3],
  '/userPractice/': TITLES2[3],
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
  '/security/': TITLES2[6],
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
const isShow = ref(true);
const isReasonShow = ref(false);
const isDynamic = ref(false);
const inputText = ref('');
let timer: NodeJS.Timeout;
const toggleIsShow = (toggle: boolean) => {
  if (!toggle && isReasonShow.value) {
    return;
  }
  if (timer) {
    clearTimeout(timer);
  }
  if (toggle) {
    isShow.value = toggle;
  } else {
    timer = setTimeout(() => {
      isShow.value = toggle;
    }, 2000);
  }
  setTimeout(() => {
    isDynamic.value = toggle;
  });
};
const closefloat = () => {
  score.value = 0;
  isDynamic.value = false;
};
function cancelPopup() {
  isReasonShow.value = false;
  inputText.value = '';
  score.value = 0;
  isDynamic.value = false;
  timer = setTimeout(() => {
    isShow.value = false;
  }, 2000);
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
const floatData = ref([
  {
    img: IconHeadsetBig,
    text: '问题反馈',
    emile: GAUSS_EMAIL,
  },
]);
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
      const summitTime = new Date().valueOf();
      if (screenWidth.value < 1100) {
        try {
          localStorage.setItem(
            'submit-time-mobile',
            JSON.stringify(summitTime)
          );
        } catch {
          handleError();
        }
        isReasonShow.value = false;
        inputText.value = '';
        score.value = 0;
        isMobileFloatShow.value = false;
        dialogVisible.value = false;
      } else {
        try {
          localStorage.setItem('submit-time', JSON.stringify(summitTime));
        } catch {
          handleError();
        }
        isReasonShow.value = false;
        inputText.value = '';
        score.value = 0;
        isDynamic.value = false;
      }
    } else {
      ElMessage({
        message: res.msg,
        type: 'error',
      });
    }
  });
}
function handleClickSubmit() {
  // pc12小时之内只能提交一次
  const lastSummitTIME = localStorage.getItem('submit-time');
  const intervalTime = 1 * 12 * 60 * 60 * 1000;
  const nowTime = new Date().valueOf();
  if (lastSummitTIME) {
    try {
      const flag = nowTime - JSON.parse(lastSummitTIME) > intervalTime;
      if (flag) {
        postScore();
      } else {
        ElMessage({
          message: '请不要频繁提交！',
          type: 'warning',
        });
      }
    } catch {
      handleError();
    }
  } else {
    postScore();
  }
}

const isFloatTipShow = ref(false);
onMounted(() => {
  watch(
    () => router.route.path,
    () => {
      if (router.route.path === '/zh/') {
        isFloatTipShow.value = true;
        setTimeout(() => {
          isFloatTipShow.value = false;
        }, 5000);
      } else {
        isFloatTipShow.value = false;
      }
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
const score2 = computed(() => score.value / 10);
const cancelDialog = () => {
  dialogVisible.value = false;
  isReasonShow.value = false;
  inputText.value = '';
  score.value = 0;
};

const isMobileFloatShow = ref(false);
const closeMobileFloat = () => {
  isMobileFloatShow.value = false;
  const closeTime = new Date().valueOf();
  try {
    localStorage.setItem('close-float-time', JSON.stringify(closeTime));
  } catch {
    handleError();
  }
};
const setScore = (val: number) => {
  isReasonShow.value = true;
  score.value = val * 10;
};
// 移动端用户关闭后7天不展示,提交后30日内不出现入口
onMounted(() => {
  const lastCloseTIME = localStorage.getItem('close-float-time');
  const lastSummitTIME = localStorage.getItem('submit-time-mobile');
  const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const thirtyInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  const nowTime = new Date().valueOf();
  if (lastCloseTIME || lastSummitTIME) {
    let flag1;
    let flag2;
    if (lastCloseTIME) {
      try {
        flag1 = nowTime - JSON.parse(lastCloseTIME) > sevenDaysInMilliseconds;
      } catch {
        handleError();
      }
    } else if (lastSummitTIME) {
      try {
        flag2 = nowTime - JSON.parse(lastSummitTIME) > thirtyInMilliseconds;
      } catch {
        handleError();
      }
    }
    if (flag1 && flag2) {
      isMobileFloatShow.value = true;
    } else {
      isMobileFloatShow.value = false;
    }
  } else {
    isMobileFloatShow.value = true;
  }
});
</script>

<template>
  <div v-if="lang === 'zh'" class="float">
    <ClientOnly>
      <template v-if="screenWidth > 1100">
        <div
          v-if="!isFloatTipShow && isFloatShow"
          :class="isSafetyFloatShow ? 'safety-tips' : 'questionnaire-tips'"
        >
          <a
            :href="isSafetyFloatShow ? VULBOX_LINK : QUESTIONNAIRE_LINK"
            :target="isSafetyFloatShow ? '_blank' : '_self'"
            rel="noopener noreferrer"
          >
            {{ isSafetyFloatShow ? FLOAT_BUG_TEXT : FLOAT_QUESTIONNAIRE }}
          </a>
          <img
            class="close-img"
            :src="floatClose"
            alt=""
            @click="closeBgFloat"
          />
        </div>
        <div class="float-wrap">
          <div v-show="isFloatTipShow" class="float-tip">
            <h4 class="tip-title">{{ infoData.feedbackTitle }}</h4>
            <div class="tip-detail">{{ infoData.welcome }}</div>
            <div class="btn-box">
              <OButton size="mini" @click="closeFloatTip">{{
                infoData.know
              }}</OButton>
            </div>
          </div>
          <div class="nav-box">
            <div class="nav-box1">
              <div
                class="nav-item"
                @mouseenter="toggleIsShow(true)"
                @mouseleave="toggleIsShow(false)"
              >
                <OIcon class="icon-box" @mouseleave.stop="closefloat">
                  <component :is="IconSmile"> </component>
                </OIcon>
                <div
                  v-if="isShow"
                  class="o-popup1"
                  :class="{ show: isDynamic }"
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
                      <el-slider
                        v-model="score"
                        show-stops
                        :step="10"
                        :marks="marks"
                        :show-tooltip="false"
                        @input="handleInput"
                      />
                      <div class="grade-info">
                        <span>{{
                          title2 === TITLES2[0]
                            ? infoData.grade1
                            : infoData.grade1_1
                        }}</span>
                        <span>{{
                          title2 === TITLES2[0]
                            ? infoData.grade2
                            : infoData.grade2_1
                        }}</span>
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
                        <OButton
                          type="outline"
                          size="mini"
                          @click="handleClickSubmit"
                        >
                          {{ infoData.submit }}
                        </OButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nav-item">
                <OIcon class="icon-box"
                  ><component :is="IconHeadset"></component>
                </OIcon>
                <div class="o-popup2">
                  <div
                    v-for="item in floatData"
                    :key="item.emile"
                    class="pop-item"
                    rel="noopener noreferrer"
                  >
                    <OIcon><component :is="item.img"></component></OIcon>
                    <div class="text">
                      <p class="text-name">
                        {{ item.text }}
                      </p>
                      <p class="text-tip">
                        <a :href="'mailto:' + item.emile">{{ item.emile }}</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="nav-item nav-box2" @click="handleClickTop">
              <OIcon><component :is="IconTop"></component> </OIcon>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-if="isMobileFloatShow"
          class="float-mobile"
          :class="{ 'mobile-margin': isMargin }"
        >
          <div class="float-head">
            <div class="head-title" @click="toggleDialogVisible">
              <OIcon class="icon-box"
                ><component :is="IconSmileMobile"></component>
              </OIcon>
              <p>
                {{ title1 }}
                <span class="title-name">{{ title2 }}</span>
                {{ title3 }}
              </p>
            </div>
            <OIcon class="icon-box icon-close" @click="closeMobileFloat"
              ><component :is="IconCancel"></component>
            </OIcon>
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
                  <el-slider
                    v-model="score"
                    :step="STEP"
                    :marks="marks"
                    show-stops
                    :show-tooltip="false"
                    @input="handleInput"
                  />
                </div>
                <div class="grade-info">
                  <span>{{
                    title2 === TITLES2[0] ? infoData.grade1 : infoData.grade1_1
                  }}</span>
                  <span>{{
                    title2 === TITLES2[0] ? infoData.grade2 : infoData.grade2_1
                  }}</span>
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
                <OButton type="outline" size="middle" @click="cancelDialog">{{
                  infoData.cancel
                }}</OButton>
                <OButton
                  type="outline"
                  size="middle"
                  :class="{ forbidden: !isReasonShow }"
                  @click="postScore"
                  >{{ infoData.confirm }}</OButton
                >
              </div>
            </div>
          </el-dialog>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
<style lang="scss" scoped>
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
    position: sticky;
    bottom: 16px;
    z-index: 9;
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
      color: var(--o-color-white);
      font-size: var(--o-font-size-text);
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
      color: var(--o-color-white);
      font-size: var(--o-font-size-text);
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

    .float-tip {
      position: absolute;
      width: 200px;
      top: 0;
      right: 0;
      background-color: var(--o-color-bg2);
      padding: 16px;
      transform: translate(34%, -110%);
      @media (max-width: 1700px) {
        transform: translate(0, -110%);
      }
      .tip-title {
        color: var(--o-color-text1);
        font-size: 16px;
      }
      .tip-detail {
        margin-top: 4px;
        font-size: 14px;
        color: var(--o-color-text3);
      }
      .btn-box {
        margin-top: 8px;
        display: flex;
        justify-content: end;
        .o-button {
          font-size: 14px;
          border: none;
          padding: 0;
          color: var(--o-color-text3);
        }
      }
      &::after {
        display: block;
        content: '';
        width: 0;
        border-left: 8px solid transparent;
        border-top: 8px solid var(--o-color-bg2);
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
      background-color: var(--o-color-bg2);
      background-size: cover;
      font-size: 12px;
      line-height: 18px;
      color: var(--o-color-text1);
      position: relative;
      cursor: pointer;
      &:hover {
        .icon-box {
          color: var(--o-color-brand1);
        }
        .o-popup2 {
          transform: scale(1);
        }
      }
      &:nth-of-type(1) + .nav-item::before {
        display: block;
        content: '';
        height: 1px;
        width: 16px;
        background-color: var(--o-color-bg4);
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%);
      }
      .o-icon {
        font-size: 24px;
      }
      .o-popup1 {
        position: absolute;
        width: 360px;
        top: 0;
        right: 64px;
        background-color: var(--o-color-bg2);
        padding: 16px 30px;
        transition: all 0.5s;
        transform: scale(0);
        transform-origin: 100% 50%;
        box-shadow: var(--o-shadow-l2);
        cursor: default;
        &.show {
          transform: scale(1);
        }
        .icon-cancel {
          position: absolute;
          top: 5px;
          right: 10px;
          cursor: pointer;
          color: var(--o-color-text1);
        }
        .slider {
          .slider-title {
            font-size: var(--o-font-size-text);
            line-height: 20px;
            color: var(--o-color-text1);
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
                font-size: var(--o-font-size-tip);
                color: var(--o-color-text1);
                background-color: var(--o-color-bg2);
                box-shadow: var(--o-shadow-l2);
                position: absolute;
                top: -30px;
                transform: translateX(-50%);
                left: v-bind(scorePosition);
                &::after {
                  border-color: var(--o-color-bg2) transparent transparent;
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
            :deep(.el-slider) {
              height: auto;
              height: 8px;
              .el-slider__runway {
                background-color: var(--o-color-bg-secondary);
              }
              .el-slider__bar {
                background-image: linear-gradient(
                  90deg,
                  #b461f6 0%,
                  #7d32ea 100%
                );
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
                background-color: var(--o-color-bg6);
              }

              .el-slider__marks-stop {
                background-color: var(--o-color-bg2);
                &:nth-last-of-type(1) {
                  transform: translateX(-4px);
                  background-color: var(--o-color-bg6);
                }
              }
              .el-slider__button {
                position: relative;
                border: none;
                box-shadow: var(--o-shadow-l3);
                &::after {
                  display: block;
                  content: '';
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background-color: var(--o-color-brand1);
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
            font-size: var(--o-font-size-tip);
            color: var(--o-color-text4);
            margin-top: 14px;
          }
        }
        .reason {
          margin-top: 16px;
          :deep(.el-textarea) {
            .el-textarea__inner {
              background-color: var(--o-color-bg2);
              border-radius: 0;
              box-shadow: 0 0 0 1px var(--o-color-border2) inset;
              color: var(--o-color-text1);
              &:focus {
                box-shadow: 0 0 0 1px var(--o-color-border1) inset;
              }
            }
            .el-input__count {
              background-color: var(--o-color-bg2);
            }
          }
          .more-info {
            display: flex;
            margin-top: 8px;
            color: var(--o-color-text4);
            font-size: var(--o-font-size-tip);
            line-height: 18px;
          }
          .submit-btn {
            margin-top: 16px;
            text-align: center;
            :deep(.o-button) {
              border-color: var(--o-color-border1);
              color: var(--o-color-text1);
              &:hover {
                background-color: var(--o-color-brand1);
                border-color: var(--o-color-brand1);
                color: var(--o-color-white);
              }
            }
          }
        }
      }
      .o-popup2 {
        position: absolute;
        top: 0;
        right: 64px;
        width: 240px;
        padding: 24px;
        background-color: var(--o-color-bg2);
        transition: all 0.5s;
        transform: scale(0);
        transform-origin: 100% 50%;
        box-shadow: var(--o-shadow-l2);
        cursor: default;
        .pop-item {
          display: flex;
          color: var(--o-color-text1);
          & ~ .pop-item {
            margin-top: 18px;
          }
          .o-icon {
            font-size: 32px;
          }
          .text {
            margin-left: 12px;
            text-align: left;
            .text-name {
              font-size: var(--o-font-size-text);
              line-height: 32px;
              font-weight: 600;
              a {
                color: var(--o-color-text1);
                &:hover {
                  color: var(--o-color-brand1);
                }
              }
            }
            .text-tip {
              font-size: var(--o-font-size-tip);
              line-height: 18px;
              a {
                color: var(--o-color-text3);
                &:hover {
                  color: var(--o-color-link1);
                }
              }
            }
          }
        }
      }
    }
    .nav-box1 {
      box-shadow: var(--o-shadow-l1);
    }
    .nav-box2 {
      margin-top: 12px;
      box-shadow: var(--o-shadow-l1);
      &.nav-item {
        background-color: var(--o-color-bg2);
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .float-mobile {
    width: 100%;
    padding: 0 16px;
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
      justify-content: center;
      position: relative;
      .o-icon {
        font-size: 16px;
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
      background-color: var(--o-color-bg2);
      padding: 16px 24px;
      transform-origin: 100% 50%;
      border-radius: 8px 8px 0px 0px;
      cursor: default;
      .icon-cancel {
        position: absolute;
        top: 5px;
        right: 10px;
        cursor: pointer;
        color: var(--o-color-text1);
      }
      .slider {
        .slider-title {
          font-size: var(--o-font-size-text);
          line-height: 20px;
          color: var(--o-color-text1);
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
            color: var(--o-color-text4);
            &.is-active {
              color: var(--o-color-text1);
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
              background-color: var(--o-color-bg-secondary);
              border-radius: 8px;
            }
            .el-slider__bar {
              height: 100%;
              border-radius: 8px;
              background-image: linear-gradient(
                90deg,
                #b461f6 0%,
                #7d32ea 100%
              );
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
              background-color: var(--o-color-bg6);
            }
            .el-slider__marks {
              width: 100%;
              transform: translateY(-42px);
              .el-slider__marks-text:nth-of-type(v-bind(score2)) {
                color: red;
              }
              .el-slider__marks-text:nth-last-child(1) {
                left: 99% !important;
                white-space: nowrap;
              }
            }

            .el-slider__marks-stop {
              background-color: var(--o-color-bg2);
              &:nth-last-of-type(1) {
                transform: translateX(-6px);
                background-color: var(--o-color-bg6);
              }
            }
            .el-slider__button {
              position: relative;
              border: none;
              box-shadow: var(--o-shadow-l3);
              &::after {
                display: block;
                content: '';
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: var(--o-color-brand1);
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
          font-size: var(--o-font-size-tip);
          color: var(--o-color-text4);
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
            background-color: var(--o-color-bg2);
            border-radius: 0;
            box-shadow: 0 0 0 1px var(--o-color-border2) inset;
            color: var(--o-color-text1);
            &:focus {
              box-shadow: 0 0 0 1px var(--o-color-border1) inset;
            }
          }
          .el-input__count {
            background-color: var(--o-color-bg2);
          }
        }
        .more-info {
          margin-top: 8px;
          color: var(--o-color-text4);
          font-size: var(--o-font-size-tip);
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
          color: var(--o-color-text1);
          position: relative;
          padding: 0;
          &.forbidden {
            color: var(--o-color-text5);
          }
          &:nth-of-type(1)::after {
            display: block;
            content: '';
            width: 1px;
            height: 100%;
            background-color: var(--o-color-text5);
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
