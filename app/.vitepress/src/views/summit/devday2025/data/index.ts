import bannerBg from '../img/banner-bg.jpg';
import bannerSummitMb from '../img/banner-bg-mb.jpg';
import textImg from '../img/banner-text.png';
import textImgMb from '../img/banner-text-mb.png';
import cardBg from '../img/card-bg.png';

export default {
  banner: {
    bg: bannerBg,
    bgMo: bannerSummitMb,
    textImg: textImg,
    textImgMb: textImgMb,
    signUpHref: 'https://e-campaign.huawei.com/events3/UniversalForm/register/773773941/register.html?site=cn&formId=11231&way=onsite',
    signUpTitle: '立即报名',
  },
  intro: {
    title: '大会简介',
    titleBg: 'INTRODUCTION',
    desc: [
      'openGauss Developer Day 2025是openGauss社区发起的开发者大会，旨在持续推动数据库领域的创新和突破。本次大会将全面展示openGauss 7.0.0 创新版的技术特性、openGauss 在内核、AI和四高（高性能、高可用、高智能、高安全）能力上的最新技术成果。',
      '本次大会也是 openGauss 社区的年度大型工作会议，值此开源五周年之际，openGauss社区邀请开发者、用户齐聚一堂，共同讨论下一个版本的技术路线与为了演进方向，携手共建数智化的数据库新生态。',
    ],
  },
  topic: {
    title: '欢迎申报',
    titleBg: 'CALL FOR PROPOSALS',
    cardBg: cardBg,
    cardList: [
      {
        title: 'Call for SIG Gathering 议题征集',
        desc: '本次大会将举行SIG Gathering技术研讨专场，围绕数据库内核、智能数据融合、用户体验/工具三大专题进行研讨。现面向社区全体成员征集议题',
        href: 'https://etherpad.opengauss.org/p/openGauss_SIG_Gathering_2025',
        text: '提交申报',
      },
      {
        title: 'Call for Poster',
        desc: '本次大会将在展区设置Poster Session（论文墙），在这里展示您在社区中的创新技术、项目亮点或关键技术突破，欢迎大家申报',
        href: 'https://shimo.im/forms/47kgMgx5NNh7Nl3V/fill',
        text: '提交申报',
      },
    ],
  },
  review: {
    title: '精彩回顾',
    titleBg: 'HIGHLIGHTS REVIEW',
    list: [
      {
        title: 'openGauss Summit 2024',
        link: '/zh/summit/summit2024/',
      },
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
