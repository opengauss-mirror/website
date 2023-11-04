import bannerPc from '../img/banner_pc.jpg';
import bannerMo from '../img/banner_mo.jpg';
import agenda1 from './agenda1';
import agenda2 from './agenda2';
import live from './live';

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
