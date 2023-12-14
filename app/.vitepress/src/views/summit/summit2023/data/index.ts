import slogan from '../img/slogan.png';
import bannerBg from '../img/banner.jpg';
import summitKv from '../video/summit-kv.mp4';
import agenda from './agenda';
export default {
  banner: {
    bannerBg: bannerBg,
    bannerMp4: summitKv,
    slogan: slogan,
  },
  details: [
    '数据库作为千行万业数据的基石，也是推动数字经济发展的核心。随着数字经济的蓬勃发展，数据库将迎来更加广阔的应用场景和更加迫切的需求。openGauss 社区旨在汇聚产、学、研、用多方力量，聚焦基础软件核心能力的构建，引领国内数据库行业技术、生态、商业的繁荣发展，共建最具创新力的开源数据库根社区，共同打造数据经济的未来。社区与伙伴携手共进，openGauss已在金融、政府、运营商等行业实现规模商用，未来将为千行万业核心系统提供坚实保障。',
    'openGauss Summit 2023是openGauss社区的年度盛会。本次峰会将汇聚学术专家、行业组织、企业客户、生态伙伴和社区贡献者，探讨数据库行业新趋势，交流生态共建新思路，分享企业联合创新成果，共同构建数据库新生态。',
  ],
  agenda,
  previous: {
    title: '精彩回顾',
    content: [
      {
        title: 'openGauss Developer Day 2023',
        link: '/zh/summit/devday2023/',
      },
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
