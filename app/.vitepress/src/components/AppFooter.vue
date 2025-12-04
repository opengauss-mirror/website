<script setup lang="ts">
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import AppContent from '@/components/AppContent.vue';
import { getYearByOffset } from '@/shared/utils';

import footerLogo from '@/assets/footer/footer-logo.svg';
import footerBg from '@/assets/footer/footer-bg.png';
import footerBgMo from '@/assets/footer/footer-bg-mo.png';

import CodeGzh from '@/assets/footer/wechat.png';
import { openReportDialog } from '@opendesign-plus/utils';
import { useCommon } from '@/stores/common';

const COMPLAINTS_REPORTURL = import.meta.env.VITE_COMPLAINTS_REPORTS_URL;
const COMPLAINTS_REPORTS_ID = import.meta.env.VITE_COMPLAINTS_REPORTS_ID;
const i18n = useI18n();
const { lang } = useData();
const commonStore = useCommon();

// 背景
const footBg = {
  pc: `url(${footerBg})`,
  mo: `url(${footerBgMo})`,
};

// 投诉与举报
const submitComplaintsReports = () => {
  openReportDialog({
    reportUrl: COMPLAINTS_REPORTURL,
    lang: lang.value === 'zh' ? 'zh-cn' : 'en-us',
    theme: commonStore.theme,
    params: {
      appId: COMPLAINTS_REPORTS_ID,
      jwtToken: '',
      sceneId: 6,
      subSceneId: 19,
      deviceId: 'h5',
      additionalContext: {
        other: window.location.href,
      },
    },
  });
};
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <AppContent :pc-top="0" :mobile-top="0">
        <div class="inner">
          <div class="footer-logo">
            <img class="show-pc" :src="footerLogo" alt="" />
            <p>
              <a class="email" :href="'mailto:' + i18n.common.FOOTER.MAIL">
                {{ i18n.common.FOOTER.MAIL }}
              </a>
            </p>
          </div>
          <div class="footer-option">
            <div class="footer-option-item">
              <template v-for="link in i18n.common.FOOTER.RIGHT_LIST" :key="link.NAME">
                <a v-if="link.URL" :href="link.URL" target="link.TARGET" :rel="link.TARGET === '_blank' ? 'noopener noreferrer' : ''" class="link">
                  {{ link.NAME }}
                </a>

                <span v-else class="link cursor" @click="submitComplaintsReports">
                  {{ link.NAME }}
                </span>
              </template>
            </div>
            <p class="copyright">
              {{ i18n.common.FOOTER.COPY_RIGHT.replace('{year}', getYearByOffset()) }}
            </p>
            <p class="mo-emial">
              <a class="email" :href="'mailto:' + i18n.common.FOOTER.MAIL" target="_blank" rel="noopener noreferrer">
                {{ i18n.common.FOOTER.MAIL }}
              </a>
            </p>
          </div>
          <div class="footer-right">
            <div class="code-box">
              <img :src="CodeGzh" class="code-img" alt="" />
              <p class="txt">{{ i18n.common.FOOTER.QR_CODE }}</p>
            </div>
          </div>
        </div>
      </AppContent>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
$color: #fff;
.footer {
  background: var(--e-color-greyblack1);
  :deep(.app-content) {
    padding-bottom: 0;
  }

  &-content {
    background: v-bind('footBg.pc') no-repeat bottom center;
    @media (max-width: 767px) {
      background: v-bind('footBg.mo') no-repeat bottom center;
    }
    .inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32px 0;
      position: relative;
      min-height: 200px;
      @media (max-width: 1100px) {
        padding: var(--e-spacing-h4) 0;
        flex-direction: column;
      }
    }
  }
  &-logo {
    flex: 1;
    img {
      height: 26px;
      margin-bottom: 20px;
    }

    @media (max-width: 1100px) {
      display: none;
    }
    @media (max-width: 1100px) {
    }
  }

  .copyright {
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
    color: $color;
    margin-top: var(--e-spacing-h5);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h8);
    }
  }

  .footer-option {
    text-align: center;
    .link {
      color: $color;
      font-size: var(--e-font-size-text);
      display: inline-block;
      padding: 0 var(--e-spacing-h6);
      border-right: 1px solid $color;
      &:last-child {
        border-right: 0;
      }
      @media (max-width: 1100px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        padding: 0 var(--e-spacing-h9);
      }
    }

    .cursor {
      cursor: pointer;
    }

    .mo-emial {
      display: none;
      @media (max-width: 1100px) {
        display: block;
        margin-top: var(--e-spacing-h10);
      }
    }
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h5);
      padding-top: var(--e-spacing-h5);
      border-top: 1px solid #2d2d2d;
      width: 100%;
    }
  }

  .footer-right {
    flex: 1;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 24px;
    .code-box {
      text-align: center;
      img {
        height: 62px;
        object-fit: cover;
      }
      @media (max-width: 1100px) {
        order: -1;
      }
    }
    .footer-links {
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        &.row1 {
          gap: 20px;
          margin-top: 12px;
        }
      }
      .links-logo {
        img {
          height: 14px;
          object-fit: cover;
          display: block;
        }
      }
      @media (max-width: 1100px) {
        justify-content: center;
      }
      @media (max-width: 800px) {
        .img {
          height: 16px;
        }
      }
    }

    p {
      color: $color;
      font-size: var(--e-font-size-tip);
      margin-top: var(--e-spacing-h8);
    }
    @media (max-width: 1100px) {
      flex-direction: column;
      gap: 16px;
      order: -1;
    }
  }

  .email {
    color: $color;
    font-size: var(--e-font-size-text);
    @media (max-width: 1100px) {
      font-size: var(--e-font-size-tip);
    }
  }
}
</style>
