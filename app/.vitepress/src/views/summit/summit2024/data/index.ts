import bannerBg from '../img/banner_pc.jpg';
import bannerBgMo from '../img/banner_mo.jpg';
import bannerText from '../img/banner_text_pc.png';
import bannerTextMO from '../img/banner_text_mo.png';

import agenda from './agenda';

export default {
  banner: {
    bg: bannerBg,
    bgMo: bannerBgMo,
    textImg: bannerText,
    textImgMo: bannerTextMO,
    linkTitle: '立即报名',
    link: 'https://e-campaign.huawei.com/t/7bEvia',
  },
  intro: {
    title: '大会简介',
    desc: [
      'openGauss作为植根于国内的开源数据库根社区，开源4年以来，基于社区，依靠伙伴，服务客户，产业共建、生态繁荣；openGauss系市场份额屡攀新高；技术不断创新，服务全场景，使能AI，加速DB智能化。openGauss社区遵循共建、共治、共享原则，致力于推动中国数据库行业发展，搭建国际化开源社区，提升行业协作效率，赋能千行百业。目前社区有超过350万的下载量，超过7500名贡献者，820家单位会员愿意加入社区，贡献社区，是中国最活跃的开源数据库根社区之一。',
      '由openGauss社区主办，政产学研用等机构协办的openGaussSummit2024，将于2024年12月27日在北京东方君悦酒店举办。本次大会以“汇聚数据库创新力量，引领智能时代新未来”为主题，旨在汇聚全国乃至全球产业发展力量，邀请思想引领者、商业精英、技术专家、合作伙伴以及全球开源基金会等业界同仁，共同探讨数据库产业发展方向和未来机遇，联合伙伴展示最新合作成果，分享数字化转型实践，以技术驱动创新，不断激发新质生产力。',
    ],
  },
  agenda: {
    title: '会议日程',
    list: agenda,
  },
  partner: {
    title: '共建单位',
    content: [
      {
        title: '主办单位',
        name: 'openGauss开源社区、全球计算联盟',
      },
      {
        title: '联合主办单位',
        name: '中移动信息技术有限公司、北京海量数据技术股份有限公司、天津神舟通用数据技术有限公司',
      },
      {
        title: '协办单位',
        name: '国家能源集团信息技术公司（数据中心）、云和恩墨（北京）信息技术有限公司、中软国际科技服务有限公司',
      },
    ],
  },
  review: {
    title: '精彩回顾',
    list: [
      {
        title: 'openGauss Developer Day 2024',
        link: '/zh/summit/devday2024/',
      },
      {
        title: 'openGauss Summit 2023',
        link: '/zh/summit/summit2023/',
      },
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
