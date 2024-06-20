import bannerBg from '../img/bg.jpg';
import bannerSummitMo from '../img/bgMo.jpg';
import nowHoverImg from '../img/now-hover.jpg';
import agenda1 from './agenda1';
import agenda2 from './agenda2';

export default {
  banner: {
    bg: bannerBg,
    bgMo: bannerSummitMo,
    slogan: '万数汇海 同创共赢',
    title: 'openGauss Developer Day 2024',
    subtitle: '2024年6月21日 | 中国 北京',
    signUpHref: 'https://e-campaign.huawei.com/t/V7zuQb',
    signUpTitle: '立即报名',
  },
  intro: {
    title: '大会简介',
    titleBg: 'INTRODUCTION',
    desc: [
      'openGauss Developer Day 2024是openGauss社区发起的年度开发者盛会。大会将于6月21日在北京 · 昆泰嘉瑞文化中心举行。',
      '本次开发者大会将聚集学术专家、行业用户、合作伙伴和开发者，共同探讨数据库面向多场景的技术创新，分享基于openGauss的行业联合创新成果及实践案例，献计社区治理，讨论社区版本规划，庆祝openGauss开源四周年。',
    ],
  },
  live: {
    title: '会议直播',
    titleBg: 'LIVE BROADCAST',
    list: [
      {
        liveId: '1800469705551528000',
        liveTestId: '1800474155972313126',
        name: 'openGauss Developer Day 2024',
        date: '2024/06/21',
        time: '09:30-11:45',
      },
      {
        liveId: '1800473051192643626',
        liveTestId: '1800475508480167955',
        name: '数智时代，共赢未来-海量数据分论坛',
        date: '2024/06/21',
        time: '13:30-15:30',
      },
      {
        liveId: '1800473476037886047',
        liveTestId: '1800475818057547794',
        name: '慧聚创新，智启未来-云和恩墨分论坛',
        date: '2024/06/21',
        time: '13:30-15:30',
      },
      {
        liveId: '1800471562235695188',
        liveTestId: '1800474499162849293',
        name: 'openGauss全场景能力分论坛',
        date: '2024/06/21',
        time: '13:30-15:30',
      },
      {
        liveId: '1800472199346278461',
        liveTestId: '1800474950960693337',
        name: 'openGauss应用&运维分论坛',
        date: '2024/06/21',
        time: '13:30-15:30',
      },
    ],
  },
  agenda: {
    title: '会议日程',
    titleBg: 'AGENDA',
  },
  agenda1,
  agenda2,
  guests: {
    title: '演讲嘉宾',
    titleBg: 'SPEAKERS',
    mainForumTitle: '主论坛嘉宾',
    dataSubForumTitle: '海量数据分论坛嘉宾',
    yunSubForumTitle: '云和恩墨分论坛嘉宾',
    fullSubForumTitle: '全场景能力分论坛嘉宾',
    appSubForumTitle: '应用&运维能力分论坛嘉宾',
  },
  now: {
    hoverImg: nowHoverImg,
    title: '立即参与',
    titleBg: 'ENGAGEMENT',
    list: [
      {
        title: 'Call For Sponsor',
        text: '提交演示议题',
        href: 'https://shimo.im/forms/9030Jd4z85TWEgkw/fill',
      },
      {
        title: 'Call for SIG',
        text: '申报现场会议',
        href: 'https://shimo.im/forms/m8AZMlraoQHKnjkb/fill',
      },
    ],
  },
  review: {
    title: '精彩回顾',
    titleBg: 'HIGHLIGHTS REVIEW',
    list: [
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
