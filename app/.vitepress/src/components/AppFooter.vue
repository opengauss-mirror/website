<script setup lang="ts">
import { toRefs } from 'vue';
import { useI18n } from '@/i18n';
import AppContent from '@/components/AppContent.vue';

import footerLogo from '@/assets/footer/footer-logo.svg';
import footerBg from '@/assets/footer/footer-bg.png';
import footerBgMo from '@/assets/footer/footer-bg-mo.png';

// 中文友情链接
import logoBilibili from '@/assets/footer/bilibili.png';
import logoInfoq from '@/assets/footer/infoq.png';
import logoZhihu from '@/assets/footer/zhihu.png';
import logoModb from '@/assets/footer/modb.png';
import logoOschina from '@/assets/footer/oschina.png';
import logoCsdn from '@/assets/footer/csdn.png';
import logo51cto from '@/assets/footer/cto.png';

import CodeGzh from '@/assets/footer/wechat.png';
import IconCancel from '~icons/app/icon-cancel.svg';

import websiteLink from '@/data/common/websiteLink';

const props = defineProps({
  isCookieTip: {
    type: Boolean,
    default: false,
  },
});

const i18n = useI18n();

// 友情链接
const footerLinks = {
  row: [
    {
      path: `${websiteLink.footer.oschinaLink}u/5059795`,
      logo: logoOschina,
      id: 'oschina',
    },
    {
      path: `${websiteLink.footer.csdnLink}weixin_49727236?spm=1000.2115.3001.5343`,
      logo: logoCsdn,
      id: 'csdn',
    },
    {
      path: `${websiteLink.footer.ctoLink}u_15157671`,
      logo: logo51cto,
      id: '51cto',
    },
  ],
  row1: [
    {
      path: `${websiteLink.footer.modbLink}u/429265`,
      logo: logoModb,
      id: 'modb',
    },
    {
      path: `${websiteLink.footer.infoqLink}u/opengauss/publish`,
      logo: logoInfoq,
      id: 'infoq',
    },
    {
      path: `${websiteLink.footer.bilibiliLink}543286270`,
      logo: logoBilibili,
      id: 'bilibili',
    },
    {
      path: `${websiteLink.footer.zhihuLink}people/opengauss`,
      logo: logoZhihu,
      id: 'zhihu',
    },
  ],
};

// 背景
const footBg = {
  pc: `url(${footerBg})`,
  mo: `url(${footerBgMo})`,
};

// 点击关闭cookies使用提示
const { isCookieTip } = toRefs(props);
const emits = defineEmits(['cookie-click']);
function onCookieClick() {
  emits('cookie-click');
}
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- 隐私政策 -->
      <div v-if="isCookieTip" class="cookie-privacy">
        <span>{{ i18n.common.COOKIE.TEXT[0] }} </span>
        <a :href="i18n.common.COOKIE.PATH" class="link">{{
          i18n.common.COOKIE.TEXT[1]
        }}</a>
        <OIcon class="icon" @click="onCookieClick"><IconCancel /></OIcon>
      </div>
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
              <a
                v-for="link in i18n.common.FOOTER.RIGHT_LIST"
                :key="link.URL"
                :href="link.URL"
                class="link"
                :target="link.TARGET"
                :rel="link.TARGET === '_blank' ? 'noopener noreferrer' : ''"
                >{{ link.NAME }}</a
              >
            </div>
            <p class="copyright">{{ i18n.common.FOOTER.COPY_RIGHT }}</p>
            <p class="mo-emial">
              <a
                class="email"
                :href="'mailto:' + i18n.common.FOOTER.MAIL"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ i18n.common.FOOTER.MAIL }}
              </a>
            </p>
          </div>
          <div class="footer-right">
            <div class="footer-links">
              <div class="row">
                <a
                  v-for="item in footerLinks.row"
                  :key="item.id"
                  :href="item.path"
                  class="links-logo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img :src="item.logo" alt="" />
                </a>
              </div>
              <div class="row1">
                <a
                  v-for="item in footerLinks.row1"
                  :key="item.id"
                  :href="item.path"
                  class="links-logo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img :src="item.logo" alt="" />
                </a>
              </div>
            </div>
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
  background: var(--o-color-greyblack1);
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
        padding: var(--o-spacing-h4) 0;
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
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: $color;
    margin-top: var(--o-spacing-h5);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h8);
    }
  }

  .footer-option {
    text-align: center;
    .link {
      color: $color;
      font-size: var(--o-font-size-text);
      display: inline-block;
      padding: 0 var(--o-spacing-h6);
      border-right: 1px solid $color;
      &:last-child {
        border-right: 0;
      }
      @media (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        padding: 0 var(--o-spacing-h9);
      }
    }
    .mo-emial {
      display: none;
      @media (max-width: 1100px) {
        display: block;
        margin-top: var(--o-spacing-h10);
      }
    }
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h5);
      padding-top: var(--o-spacing-h5);
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
      font-size: var(--o-font-size-tip);
      margin-top: var(--o-spacing-h8);
    }
    @media (max-width: 1100px) {
      flex-direction: column;
      gap: 16px;
      order: -1;
    }
  }

  .email {
    color: $color;
    font-size: var(--o-font-size-text);
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
    }
  }

  .cookie-privacy {
    line-height: 48px;
    width: 100%;
    height: 48px;
    background-color: var(--o-color-bg1);
    color: var(--o-color-text3);
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    box-shadow: var(--o-shadow-l1);
    text-align: center;
    @media screen and (max-width: 1000px) {
      font-size: 12px;
      line-height: 20px;
    }
    @media screen and (max-width: 760px) {
      display: block;
      padding-left: 12px;
      padding-right: 36px;
      padding-top: 4px;
      height: auto;
    }
    .link {
      cursor: pointer;
      text-decoration: solid;
      white-space: pre;
      @media screen and (max-width: 760px) {
        display: block;
      }
    }
    .icon {
      cursor: pointer;
      vertical-align: middle;
      margin-left: 16px;
      width: 24px;
      height: 24px;
      background: var(--o-color-greyblack3);
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 20px;
        color: var(--el-color-white);
      }

      @media screen and (max-width: 760px) {
        width: 20px;
        height: 20px;
        margin-left: 12px;
        position: absolute;
        top: 12px;
        right: 12px;
      }
    }
  }
}
</style>
