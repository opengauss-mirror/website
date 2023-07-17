import bannerPc from '../img/banner_pc.jpg';
import bannerMo from '../img/banner_mo.jpg';
import cardBg1 from '../img/card_bg1.png';
import cardBg2 from '../img/card_bg2.png';
import cardBg3 from '../img/card_bg3.png';
import cardBg4 from '../img/card_bg4.png';
import agenda1 from './agenda1';
import agenda2 from './agenda2';
import live from './live';

import websiteLink from '@/data/common/websiteLink';

export default {
  banner: {
    img_pc: bannerPc,
    img_mo: bannerMo,
    slogan: '聚数成峰 共赢未来 ',
    title: 'openGauss Developer Day 2023',
    subtitle: '5月25-26日  中国·北京昆泰嘉瑞文化中心',
  },
  detail: [
    'openGauss Developer Day 2023是openGauss社区发起并举办的数据库开发者年度盛会。openGauss社区开源3年来，已在技术、生态、商业和社区治理等方面发展显著。为践行openGauss社区共建、共享、共治的理念，打造中国最具创新力的开源数据库根社区，大会诚邀学术专家，行业用户，合作伙伴，开发者共同探讨数据库面向多场景的技术创新，分享基于openGauss的行业联合创新成果及商业实践，献计社区治理完善，讨论社区版本规划。',
    'openGauss诚邀开发者齐参与，同贡献，繁荣开源数据库根社区。',
  ],
  live,
  collect: [
    {
      bgImg: cardBg1,
      title: '赞助征集',
      titleEn: 'CALL FOR SPONSOR',
      link: `${websiteLink.summit.shimoLink}forms/vVqRMGzO2ahP0X3y/fill`,
    },
    {
      bgImg: cardBg2,
      title: '议题征集',
      titleEn: 'CALL FOR PROPOSAL',
      link: `${websiteLink.summit.shimoLink}forms/wV3VMPlV9YfKjMAy/fill`,
    },
    {
      bgImg: cardBg3,
      title: '演讲者征集',
      titleEn: 'CALL FOR SPEAKER',
      link: `${websiteLink.summit.shimoLink}forms/1lq7rxzZxGsLnN3e/fill`,
    },
    {
      bgImg: cardBg4,
      title: 'SIG 征集',
      titleEn: 'CALL FOR SIG',
      link: `${websiteLink.summit.shimoLink}forms/0l3NMWYVOQTLMbAR/fill`,
    },
  ],
  agenda1,
  agenda2,
  previous: {
    title: '精彩回顾',
    content: [
      {
        title: 'openGauss Summit 2022',
        link: '/zh/summit/summit2022/',
      },
      {
        title: 'openGauss Developer Day 2022',
        link: '/zh/summit/devday2022/',
      },
      {
        title: 'openGauss Summit 2021',
        link: '/zh/summit/summit2021/',
      },
    ],
  },
};
