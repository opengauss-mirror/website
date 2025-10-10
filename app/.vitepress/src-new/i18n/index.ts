import { computed } from 'vue';
import { createI18n, type I18nOptions } from 'vue-i18n';
import { useData } from 'vitepress';
import { getCurrentLocale } from '~@/utils/locale';

import common from './common';
import download from './download';
import tools from './tools';
import header from './header';
import footer from './footer';

const messages = {
  zh: {
    // 公共模块
    common: common.zh,
    header: header.zh,
    footer: footer.zh,

    // 业务
    download: download.zh,
    tools: tools.zh,
  },
  en: {
    // 公共模块
    common: common.en,
    header: header.en,
    footer: footer.en,

    // 业务
    download: download.en,
    tools: tools.en,
  },
};

const locale = getCurrentLocale();
const i18n = createI18n({
  globalInjection: true,
  locale,
  legacy: false,
  fallbackLocale: 'zh',
  messages,
});

export function useI18n() {
  const { lang } = useData();
  return computed(() => messages[lang.value]);
}

export default i18n;
