import { computed } from 'vue';
import { createI18n } from 'vue-i18n';
import { useData } from 'vitepress';
import { getCurrentLocale } from '~@/utils/locale';
import home from './home';

import common from './common';
import download from './download';
import tools from './tools';
import header from './header';
import footer from './footer';
import notifications from './notifications';
import events from './events';

const messages = {
  zh: {
    // 公共模块
    common: common.zh,
    header: header.zh,
    footer: footer.zh,

    // 业务
    download: download.zh,
    tools: tools.zh,
    home: home.zh,
    notifications: notifications.zh,
    events: events.zh,
  },
  en: {
    // 公共模块
    common: common.en,
    header: header.en,
    footer: footer.en,

    // 业务
    download: download.en,
    tools: tools.en,
    home: home.en,
    notifications: notifications.en,
    events: events.en,
  },
};

const locale = getCurrentLocale();
const i18n = createI18n({
  globalInjection: true,
  locale,
  legacy: false,
  fallbackLocale: 'zh',
  messages,
  global: true,
});

export function useI18n() {
  const { lang } = useData();
  return computed(() => messages[lang.value]);
}

export default i18n;
