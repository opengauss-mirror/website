import { computed } from 'vue';
import { useData } from 'vitepress';

import common from './common';
import security from './security';
import authentication from './authentication';
import certification from './certification';
import ogsp from './ogsp';
import knowledge from './knowledge';
import advanced from './advanced';
import showcase from './showcase';
import connect from './connect';
import search from './search';
import brand from './brand';

import home from './home';
import compatibility from './compatibility';
import onlineCommunication from './community/onlineCommunication';
import contribution from './community/contribution';
import member from './community/member';
import download from './download';
import supporttools from './supporttools';

const i18n: { [key: string]: any } = {
  zh: {
    home: home.zh,
    common: common.zh,
    security: security.zh,
    onlineCommunication: onlineCommunication.zh,
    contribution: contribution.zh,
    authentication: authentication.zh,
    certification: certification.zh,
    ogsp: ogsp.zh,
    member: member.zh,
    download: download.zh,
    supporttools: supporttools.zh,
    knowledge: knowledge.zh,
    advanced: advanced.zh,
    showcase: showcase.zh,
    connect: connect.zh,
    search: search.zh,
    brand: brand.zh,
    compatibility: compatibility.zh,
  },
  en: {
    home: home.en,
    common: common.en,
    security: security.en,
    onlineCommunication: onlineCommunication.en,
    contribution: contribution.en,
    authentication: authentication.en,
    certification: certification.en,
    ogsp: ogsp.en,
    member: member.en,
    download: download.en,
    supporttools: supporttools.en,
    knowledge: knowledge.en,
    advanced: advanced.en,
    showcase: showcase.en,
    connect: connect.en,
    search: search.en,
    brand: brand.en,
    compatibility: compatibility.en,
  },
};

export function useI18n() {
  const { lang } = useData();
  return computed(() => i18n[lang.value]);
}

export default i18n;
