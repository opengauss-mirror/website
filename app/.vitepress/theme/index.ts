import type { App } from 'vue';
import { createPinia } from 'pinia';

import '@/shared/styles/element-plus/index.scss';
import '@/shared/styles/index.scss';

import Layout from '@/App.vue';
import NotFound from '@/NotFound.vue';
import { SeoBox } from '@/components/seo-box';

import ElementPlus from 'element-plus';
import OpenDesign from 'opendesign';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import 'element-plus/theme-chalk/dark/css-vars.css';
import i18n from '~@/i18n';

// src-new
import '~@/assets/style/theme/default-light.token.css';
import '~@/assets/style/theme/dark.token.css';
import '~@/assets/style/theme/media.token.scss';
import '@opensig/opendesign/es/index.css';
import '~@/assets/style/theme/index.scss';

export default {
  Layout,
  NotFound,
  enhanceApp({ app }: { app: App }) {
    if (typeof global !== 'undefined') {
      // @ts-ignore
      global.window = {};
    }
    app.use(VueDOMPurifyHTML);
    app.use(createPinia());

    app.use(ElementPlus);
    app.use(OpenDesign);
    app.use(i18n);
    app.use(SeoBox as any);
  },
};
