import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createExternalLinkGuard } from '@opendesign-plus/plugins';

import '@/shared/styles/element-plus/index.scss';
// import '@/shared/styles/index.scss';
import '@/shared/styles/base.scss';
import '@/shared/styles/gap.scss';
import '@/shared/styles/markdown.scss';
import '@/shared/styles/theme-dark.scss';
import '@/shared/styles/highlight/index.scss';
import '~@/assets/style/mixin/grid.scss';

import Layout from '@/App.vue';
import NotFound from '@/NotFound.vue';

import ElementPlus from 'element-plus';
import OpenDesign from 'opendesign';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import 'element-plus/theme-chalk/dark/css-vars.css';
import i18n from '~@/i18n';

import '@opendesign-plus/components/styles';
import '@opensig/opendesign-token/themes/g.light.token.css';
import '@opensig/opendesign-token/themes/g.dark.token.css';

// import '~@/assets/style/theme/default-light.token.css';
// import '~@/assets/style/theme/dark.token.css';

import '~@/assets/style/theme/media.token.scss';
import '~@/assets/style/element-plus/index.scss';
import '~@/assets/style/element-plus/theme/index.scss';
import '@opensig/opendesign/es/index.css';
import '~@/assets/style/theme/index.scss';
import { BAIDU_HM } from '@/data/url-config';
import { removeCustomCookie } from '@/shared/utils';
import { reportAnalytics } from '@/api/api-analytics';
import { initOpenDesignAnalytics } from '@opendesign-plus/plugins/analytics'


export default {
  Layout,
  NotFound,
  enhanceApp({ app }: { app: App }) {
    app.use(VueDOMPurifyHTML);
    app.use(createPinia());

    app.use(ElementPlus);
    app.use(OpenDesign);
    app.use(i18n);
    app.use(initOpenDesignAnalytics, {
      appKey: 'openGauss',
      request(data) {
        reportAnalytics(data);
      },
      isCookieAgreed() {
        return location.pathname.startsWith('/zh') ? true : document.cookie.includes('agreed-cookiepolicy-en=1');
      },
      onPageView(from, to) {
        if (to.startsWith('/zh/cve') || to.startsWith('/en/cve')) {
          return { $service: 'cvemanager' };
        }
      },
      onEnable() {
        // 百度埋点
        const s = document.createElement('script');
        s.src = BAIDU_HM;
        s.classList.add('analytics-script');
        const head = document.getElementsByTagName('HEAD')[0];
        head.appendChild(s);
      },
      onDisable() {
        const scripts = document.querySelectorAll('script.analytics-script');
        scripts.forEach((script) => {
          script.remove();
        });

        const hm = /^hm/i;
        document.cookie
          .split(';')
          .map((c) => c.trim())
          .forEach((c) => {
            const key = decodeURIComponent(c.split('=')[0]);
            if (hm.test(key)) {
              removeCustomCookie(key, { domain: location.hostname });
            }
          });
        [sessionStorage, localStorage].forEach((storage) => {
          const keys = [];
          for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i)!;
            if (hm.test(key)) {
              keys.push(key);
            }
          }
          keys.forEach((key) => storage.removeItem(key));
        });
      },
    });
  },
};
