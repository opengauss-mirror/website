import { computed } from 'vue';
import { createI18n, type I18nOptions } from 'vue-i18n';
import { useData } from 'vitepress';
import { getCurrentLocale } from '~@/utils/locale';
import home from './home';

import common from './common';
import download from './download';
import tools from './tools';

const messages = {
  zh: {
    // 公共模块
    common: common.zh,

    // 业务
    download: download.zh,
    tools: tools.zh,
    home: home.zh,
  },
  en: {
    // 公共模块
    common: common.en,

    // 业务
    download: download.en,
    tools: tools.en,
    home: home.en,
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
