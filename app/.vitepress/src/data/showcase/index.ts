import finance from '@/assets/category/showcase/finance-light.svg';
import financeDark from '@/assets/category/showcase/finance-dark.svg';
import financeActive from '@/assets/category/showcase/finance-light-active.svg';
import financeActiveDark from '@/assets/category/showcase/finance-dark-active.svg';
import carrier from '@/assets/category/showcase/carrier-light.svg';
import carrierDark from '@/assets/category/showcase/carrier-dark.svg';
import carrierActive from '@/assets/category/showcase/carrier-light-active.svg';
import carrierActiveDark from '@/assets/category/showcase/carrier-dark-active.svg';
import developer from '@/assets/category/showcase/developer-light.svg';
import developerDark from '@/assets/category/showcase/developer-dark.svg';
import developerActive from '@/assets/category/showcase/developer-light-active.svg';
import developerActiveDark from '@/assets/category/showcase/developer-dark-active.svg';
import energy from '@/assets/category/showcase/energy-light.svg';
import energyDark from '@/assets/category/showcase/energy-dark.svg';
import energyActive from '@/assets/category/showcase/energy-light-active.svg';
import energyActiveDark from '@/assets/category/showcase/energy-dark-active.svg';
import dbv from '@/assets/category/showcase/dbv-light.svg';
import dbvDark from '@/assets/category/showcase/dbv-dark.svg';
import dbvActive from '@/assets/category/showcase/dbv-light-active.svg';
import dbvActiveDark from '@/assets/category/showcase/dbv-dark-active.svg';
import other from '@/assets/category/showcase/other-light.svg';
import otherDark from '@/assets/category/showcase/other-dark.svg';
import otherActive from '@/assets/category/showcase/other-light-active.svg';
import otherActiveDark from '@/assets/category/showcase/other-dark-active.svg';
import isv from '@/assets/category/showcase/isv-light.svg';
import isvDark from '@/assets/category/showcase/isv-dark.svg';
import isvActive from '@/assets/category/showcase/isv-light-active.svg';
import isvActiveDark from '@/assets/category/showcase/isv-dark-active.svg';
import industrial from '@/assets/category/showcase/industrial-light.svg';
import industrialDark from '@/assets/category/showcase/industrial-dark.svg';
import industrialActive from '@/assets/category/showcase/industrial-light-active.svg';
import industrialActiveDark from '@/assets/category/showcase/industrial-dark-active.svg';
import education from '@/assets/category/showcase/education-light.svg';
import educationDark from '@/assets/category/showcase/education-dark.svg';
import educationActive from '@/assets/category/showcase/education-light-active.svg';
import educationActiveDark from '@/assets/category/showcase/education-dark-active.svg';
import business from '@/assets/category/showcase/business-light.svg';
import businessDark from '@/assets/category/showcase/business-dark.svg';
import businessActive from '@/assets/category/showcase/business-light-active.svg';
import businessActiveDark from '@/assets/category/showcase/business-dark-active.svg';
import medical from '@/assets/category/showcase/medical-light.svg';
import medicalDark from '@/assets/category/showcase/medical-dark.svg';
import medicalActive from '@/assets/category/showcase/medical-light-active.svg';
import medicalActiveDark from '@/assets/category/showcase/medical-dark-active.svg';

import showcaseZh from './showcase-zh';
import showcaseEn from './showcase-en';
export default {
  category: [
    {
      type: '金融',
      typeEn: 'Finance',
      id: 1,
      url: finance,
      activeUrl: financeActive,
      urlDark: financeDark,
      activeDarkUrl: financeActiveDark,
    },
    {
      type: '运营商',
      typeEn: 'Carrier',
      id: 2,
      url: carrier,
      activeUrl: carrierActive,
      urlDark: carrierDark,
      activeDarkUrl: carrierActiveDark,
    },
    {
      type: '互联网',
      typeEn: 'Internet',
      id: 3,
      url: developer,
      activeUrl: developerActive,
      urlDark: developerDark,
      activeDarkUrl: developerActiveDark,
    },
    {
      type: '制造',
      typeEn: 'Manufacture',
      id: 4,
      url: industrial,
      activeUrl: industrialActive,
      urlDark: industrialDark,
      activeDarkUrl: industrialActiveDark,
    },
    {
      type: '能源',
      typeEn: 'Energy',
      id: 5,
      url: energy,
      activeUrl: energyActive,
      urlDark: energyDark,
      activeDarkUrl: energyActiveDark,
    },
    {
      type: 'DBV',
      typeEn: 'DBV',
      id: 6,
      url: dbv,
      activeUrl: dbvActive,
      urlDark: dbvDark,
      activeDarkUrl: dbvActiveDark,
    },
    {
      type: 'ISV',
      typeEn: 'ISV',
      id: 7,
      url: isv,
      activeUrl: isvActive,
      urlDark: isvDark,
      activeDarkUrl: isvActiveDark,
    },
    {
      type: '教育',
      typeEn: 'Education',
      id: 8,
      url: education,
      activeUrl: educationActive,
      urlDark: educationDark,
      activeDarkUrl: educationActiveDark,
    },
    {
      type: '大企业',
      typeEn: 'Bigbusiness',
      id: 9,
      url: business,
      activeUrl: businessActive,
      urlDark: businessDark,
      activeDarkUrl: businessActiveDark,
    },
    {
      type: '医疗',
      typeEn: 'Medical',
      id: 10,
      url: medical,
      activeUrl: medicalActive,
      urlDark: medicalDark,
      activeDarkUrl: medicalActiveDark,
    },
    {
      type: '其他',
      typeEn: 'Others',
      id: 11,
      url: other,
      activeUrl: otherActive,
      urlDark: otherDark,
      activeDarkUrl: otherActiveDark,
    },
  ],
  constList: {
    zh: showcaseZh,
    en: showcaseEn,
  },
};
