<script lang="ts" setup>
import { ref, computed } from 'vue';
import AppContent from '@/components/AppContent.vue';
import { useI18n } from '@/i18n';
import { useRouter, useData } from 'vitepress';

import {
  getCertification,
  getSendCode,
  downloadCard,
} from '@/api/api-authentication';

import IconChevron from '~icons/app/icon-chevron-right.svg';
import IconRequired from '~icons/train/icon-required.svg';
import OInput from 'opendesign/input/OInput.vue';

const i18n = useI18n();
const { lang } = useData();
const language = computed(() => (lang.value === 'zh' ? 'zh_CN' : 'en_US'));
const router = useRouter();
const isBreadShow = computed(() => (lang.value === 'zh' ? true : false));
// 证书的选择控制
const chooseList = ref([false, false]);
// 面包屑及查询或下载显示控制
const isDownloadShow = ref(false);
// 邮箱
const emailInput = ref('');
// 提示语
const resultTip = ref('');
const identification = ref('');
// 验证码
const codeInput = ref('');
const codeSuccess = ref(false);
const successTip = ref(false);
const emailReg = new RegExp(
  '^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$'
);
const resend = computed(() => (lang.value === 'zh' ? '重新发送' : 'Resend'));
const send = computed(() =>
  lang.value === 'zh' ? '发送验证码' : 'Send a verification code'
);
const countSecond = ref(60);
const buttonText = ref('');
buttonText.value = send.value;
// 接收证书信息
const paList: any = ref([]);
// 成功获取验证码后再次获取需等待60s
function waitSend() {
  const waitSendtimer = setInterval(() => {
    countSecond.value--;
    buttonText.value = resend.value + '（' + countSecond.value + '）';
    if (countSecond.value === 0) {
      clearInterval(waitSendtimer);
      resultTip.value = '';
      codeSuccess.value = false;
      buttonText.value = send.value;
      countSecond.value = 60;
    }
  }, 1000);
}
// 点击发送验证码
function getCode(params: string, lang: string) {
  // 已成功发送且在60s之内时点击时直接返回不进行再次发送
  if (codeSuccess.value) {
    return;
  }
  if (emailReg.test(emailInput.value.trim())) {
    getCertification(params, lang)
      .then((res) => {
        resultTip.value = res.message;
        if (res.success) {
          waitSend();
          identification.value = res.data.identification;
          codeSuccess.value = true;
          successTip.value = true;
        } else {
          successTip.value = false;
          codeSuccess.value = false;
          identification.value = '';
        }
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  } else {
    resultTip.value = i18n.value.authentication.emailErrorTip;
  }
}
// 接收证书信息
const dataList: any = ref([]);
// 输入验证码后点击确认
function SendCode(identification: string, codeInput: string) {
  if (emailInput.value && codeInput) {
    if (identification === '') {
      resultTip.value =
        lang.value === 'zh'
          ? '您输入的验证码或邮箱有误！'
          : 'The verification code or email is incorrect.';
      successTip.value = false;
      return;
    }
    getSendCode(identification, codeInput.trim())
      .then((res) => {
        if (res.success) {
          paList.value = [];
          resultTip.value = res.message;
          isDownloadShow.value = true;
          dataList.value = res.data;
          successTip.value = true;
          res.data.forEach((item: any) => {
            paList.value.push(item.signInfo);
          });
        } else {
          resultTip.value =
            lang.value === 'zh'
              ? '您输入的验证码有误！'
              : 'The verification code is incorrect.';
          successTip.value = false;
        }
      })
      .catch((error: any) => {
        resultTip.value =
          lang.value === 'zh'
            ? '您输入的验证码有误！'
            : 'The verification code is incorrect.';
        successTip.value = false;
        throw new Error(error);
      });
  } else {
    successTip.value = false;
    resultTip.value =
      lang.value === 'zh'
        ? '邮箱或验证码不能为空！'
        : 'The verification code or email is incorrect.';
  }
}
// 面包屑点击事件
function goBackPage() {
  const i = router.route.path.replace('/search', '');
  router.go(i);
}
// 证书点击选择事件
function clickChoose(index: number) {
  chooseList.value[index] = !chooseList.value[index];
}
// 下载事件处理
function download(paString: string) {
  downloadCard(paString, language.value).then((res) => {
    if (res.success) {
      function dataURLtoBlob(dataurl: any) {
        const arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      }
      function blobToFile(theBlob: any, fileName: any) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
      }
      const str = 'data:application/pdf;base64,' + res.data.data;
      const blob = dataURLtoBlob(str);
      const file = blobToFile(blob, 'zs');
      const href = URL.createObjectURL(file);
      const downloadElement = document.createElement('a');
      downloadElement.href = href;
      downloadElement.download = res.data.fileName;
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
    } else {
      console.log('下载错误');
    }
  });
}
// 点击下载按钮
function clickDownload() {
  if (chooseList.value[0]) {
    download(paList.value[0]);
  }
  if (chooseList.value[1]) {
    download(paList.value[1]);
  }
}
</script>

<template>
  <AppContent>
    <div v-if="isBreadShow" class="breadcrumb">
      <p class="last-page" @click="goBackPage">
        {{ i18n.authentication.title }}
      </p>
      <span class="separtor">
        <o-icon><icon-chevron></icon-chevron></o-icon
      ></span>
      <p class="current-page">
        <span v-if="!isDownloadShow">{{
          i18n.authentication.verificationQuery
        }}</span>
        <span v-else>{{ i18n.authentication.certificateDownload }}</span>
      </p>
    </div>
    <div
      v-if="!isDownloadShow"
      class="certificate-search"
      :class="isBreadShow ? '' : 'false'"
    >
      <h2>{{ i18n.authentication.verificationQuery }}</h2>
      <div class="search-content">
        <div class="input-box">
          <div class="email-box">
            <div class="left">
              <OIcon>
                <IconRequired />
              </OIcon>
              <span>{{ i18n.authentication.email }}</span>
            </div>
            <div class="right">
              <OInput
                v-model="emailInput"
                type="text"
                :placeholder="i18n.authentication.placeholderEmail"
              />
              <p class="tip">{{ i18n.authentication.tipEmail }}</p>
            </div>
          </div>
          <div class="code-box">
            <div class="left">
              <OIcon>
                <IconRequired />
              </OIcon>
              <span>{{ i18n.authentication.verificationCode }}</span>
            </div>
            <div class="right">
              <OInput
                v-model="codeInput"
                type="text"
                :placeholder="i18n.authentication.placeholderCode"
              />
              <p class="tip" :class="successTip ? 'success-tip' : 'error-tip'">
                {{ resultTip }}
              </p>
              <OButton size="small" @click="getCode(emailInput, language)">{{
                buttonText
              }}</OButton>
            </div>
          </div>
          <div class="button-box">
            <OButton
              size="small"
              @click="SendCode(identification, codeInput)"
              >{{ i18n.authentication.sure }}</OButton
            >
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="certificate-download"
      :class="isBreadShow ? '' : 'false'"
    >
      <h2>{{ i18n.authentication.certificateDownload }}</h2>
      <div class="certificate-box">
        <div class="certificate-item-box">
          <div
            v-for="(item, index) in dataList"
            :key="item.imageUrl"
            class="item"
            :class="chooseList[index] ? 'checked' : ''"
            @click="clickChoose(index)"
          >
            <div class="choose-img"></div>
            <div class="item-img">
              <img :src="'/' + item.imageUrl" alt="" />
            </div>
            <div class="item-text">
              <p class="title">{{ item.title[0] }}</p>
              <p class="name">{{ item.title[1] }}</p>
            </div>
          </div>
        </div>
        <OButton size="small" @click="clickDownload">{{
          i18n.authentication.certificateDownload
        }}</OButton>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scpoed>
.breadcrumb {
  color: var(--o-color-text1);
  background: var(--o-color-bg1);
  display: flex;
  @media screen and (max-width: 768px) {
    display: none;
  }
  .last-page {
    font-size: var(--o-font-size-tip);
    font-weight: 300;
    color: var(--o-color-text4);
    line-height: var(--o-line-height-tip);
    cursor: pointer;
  }
  .separtor {
    margin: 0 var(--o-spacing-h10);
    .o-icon {
      color: var(--o-color-text1);
    }
  }
  .current-page {
    font-size: var(--o-font-size-tip);
    font-weight: 600;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-tip);
  }
}
.certificate-search {
  margin-top: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
  h2 {
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    text-align: center;
    font-weight: 300;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
    }
  }
  .search-content {
    margin-top: var(--o-spacing-h1);
    width: 100%;
    background-color: var(--o-color-bg2);
    padding: var(--o-spacing-h2) 0;
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h7);
      padding: var(--o-spacing-h5);
      min-width: 328px;
    }
    .input-box {
      max-width: 710px;
      margin: 0 auto;
      .email-box {
        display: flex;
        align-items: center;
        max-width: 536px;
        .left {
          display: flex;
          align-items: center;
          width: 136px;
          @media screen and (max-width: 468px) {
            width: 90px;
          }

          .o-icon {
            font-size: var(--o-font-size-h5);
          }
          span {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--o-color-text1);
          }
        }
        .right {
          position: relative;
          max-width: 400px;
          flex-grow: 1;
          @media screen and (max-width: 768px) {
            .o-input {
              height: 24px;
              font-size: var(--o-font-size-tip);
            }
          }
          @media screen and (max-width: 410px) {
            width: 206px;
          }
          .tip {
            position: absolute;
            bottom: -8px;
            left: 0;
            transform: translateY(100%);
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            color: #ff8d4d;
            @media screen and (max-width: 768px) {
              bottom: -6px;
            }
          }
        }
      }
      .code-box {
        display: flex;
        align-items: center;
        max-width: 536px;
        margin-top: 54px;
        .left {
          display: flex;
          align-items: center;
          width: 136px;
          @media screen and (max-width: 468px) {
            width: 90px;
          }

          .o-icon {
            font-size: var(--o-font-size-h5);
          }
          span {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--o-color-text1);
          }
        }
        .right {
          position: relative;
          max-width: 400px;
          flex-grow: 1;
          @media screen and (max-width: 768px) {
            padding-right: 88px;
            .o-input {
              height: 24px;
              font-size: var(--o-font-size-tip);
            }
          }
          @media screen and (max-width: 410px) {
            max-width: 223px;
          }
          @media screen and (max-width: 410px) {
            width: 206px;
          }
          .tip {
            position: absolute;
            bottom: -8px;
            left: 0;
            transform: translateY(100%);
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            color: #ff8d4d;
            @media screen and (max-width: 768px) {
              bottom: -6px;
            }
          }
          .success-tip {
            color: #002fa7;
          }
          .error-tip {
            color: #f3524d;
          }
          .o-button {
            position: absolute;
            right: -24px;
            top: 0;
            transform: translateX(100%);
            padding-top: 7px;
            padding-bottom: 7px;
            white-space: nowrap;
            height: 100%;
            padding-left: 16px;
            padding-right: 16px;
            justify-content: center;
            @media screen and (max-width: 768px) {
              right: 0px;
              transform: none;
              background-color: var(--o-color-brand1);
              color: var(--o-color-white);
              font-size: var(--o-font-size-tip);
            }
          }
        }
      }
      .button-box {
        max-width: 536px;
        margin-top: var(--o-spacing-h2);
        text-align: center;
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h2);
        }
        .o-button {
          padding-top: 7px;
          padding-bottom: 7px;
          height: 36px;
          @media screen and (max-width: 768px) {
            height: 24px;
            color: var(--o-color-white);
            background-color: var(--o-color-brand1);
            font-size: var(--o-font-size-tip);
          }
        }
      }
    }
  }
}
.certificate-download {
  margin-top: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
  h2 {
    margin-top: var(--o-spacing-h2);
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    text-align: center;
    font-weight: 300;
    @media screen and (max-width: 1100px) {
      margin-top: var(--o-spacing-h5);
      font-size: var(--o-font-size-h8);
      line-height: var(--o-font-size-h8);
    }
  }
  .certificate-box {
    margin-top: var(--o-spacing-h2);
    background-color: var(--o-color-bg2);
    padding: var(--o-spacing-h2) 0;
    text-align: center;
    @media screen and (max-width: 1100px) {
      margin-top: var(--o-spacing-h5);
      background-color: var(--o-color-bg1);
      padding: 0;
    }
    .certificate-item-box {
      max-width: 736px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 64px;
      margin: 0 auto;
      @media screen and (max-width: 1100px) {
        max-width: 100%;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 16px;
      }
      .item {
        width: 336px;
        height: 263px;
        border: 1px solid transparent;
        box-shadow: var(--o-shadow-l1);
        position: relative;
        @media screen and (max-width: 1100px) {
          width: 100%;
          height: 98px;
          display: flex;
        }
        .choose-img {
          width: 24px;
          height: 24px;
          background-image: url(@/assets/category/authentication/certificate/icon-unchoose.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: 16px;
          top: 16px;
          z-index: 9;
          @media screen and (max-width: 1100px) {
            width: 16px;
            height: 16px;
            left: auto;
            right: 8px;
            top: 8px;
          }
        }
        .item-img {
          background-color: var(--o-color-bg4);
          padding: 14px 0 10px;
          text-align: center;
          position: relative;
          @media screen and (max-width: 1100px) {
            padding: 12px;
            background-color: var(--o-color-brand1);
          }

          img {
            height: 127px;
            @media screen and (max-width: 1100px) {
              width: 88px;
              height: 70px;
            }
          }
        }
        .item-text {
          padding: var(--o-spacing-h4) 0;
          text-align: center;
          @media screen and (max-width: 1100px) {
            padding-left: var(--o-spacing-h5);
          }
          .title {
            font-size: var(--o-font-size-h7);
            line-height: var(--o-line-height-h7);
            color: var(--o-color-text1);
            font-weight: 300;
            @media screen and (max-width: 1100px) {
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
              text-align: left;
            }
          }
          .name {
            margin-top: var(--o-spacing-h8);
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--o-color-text1);
            font-weight: 300;
            @media screen and (max-width: 1100px) {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              color: var(--o-color-text3);
            }
          }
        }
      }
      .checked {
        border: 1px solid var(--o-color-brand1);
        .choose-img {
          background-image: url(@/assets/category/authentication/certificate/icon-choose.png);
        }
      }
    }
  }
  .o-button {
    margin-top: var(--o-spacing-h2);
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      height: 24px;
      line-height: 24px;
      background-color: var(--o-color-brand1);
      color: var(--o-color-white);
    }
  }
}
.false {
  margin-top: 0;
}
</style>
