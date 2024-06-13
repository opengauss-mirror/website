import bannerBg from '../img/bg.jpg';
import bannerSummitMo from '../img/bgMo.jpg';
import nowHoverImg from '../img/now-hover.jpg';

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
  agenda: {
    title: '会议日程',
    titleBg: 'AGENDA',
    date: 'June 20 -June 21',
    list: [
      {
        time: '06月20日',
        id: 'main',
        list: [
          {
            type: '上午',
            children: [
              {
                title: '技术委员会工作会议',
                date: '2024/06/20',
                time: '10:00-12:00',
              },
              {
                title: '用户委员会工作会议',
                date: '2024/06/20',
                time: '10:00-12:00',
              },
              {
                title: '品牌委员会工作会议',
                date: '2024/06/20',
                time: '10:00-12:00',
              },
            ],
          },
          {
            type: '下午',
            children: [
              {
                title: '理事会工作会议',
                date: '2024/06/20',
                time: '14:00-17:30',
              },
            ],
          },
        ],
      },
      {
        time: '06月21日',
        id: 'other',
        list: [
          {
            type: '上午·openGauss开发者大会主论坛',
            time: 'am',
            children: [
              {
                title: '开场致辞：行业专家洞见',
                date: '2024/06/21',
                time: '09:30-09:40',
              },
              {
                title: '主题演讲：社区最新进展及伙伴生态贡献',
                date: '2024/06/21',
                time: '09:40-10:20',
              },
              {
                title: '联合发布：新增五大商业版本齐发布',
                date: '2024/06/21',
                time: '10:20-10:30',
              },
              {
                title: '技术展示：openGauss最新特性+Demo演示',
                date: '2024/06/21',
                time: '10:30-10:45',
              },
              {
                title: '实践案例：覆盖金融、运营商、政府等多领域优秀实践案例',
                date: '2024/06/21',
                time: '10:45-11:40',
              },
              {
                title: '发证：培训认证伙伴发布',
                date: '2024/06/21',
                time: '11:40-11:45',
              },
              {
                title: '颁奖：openGauss社区优秀SIG及开发者颁奖',
                date: '2024/06/21',
                time: '11:45-11:50',
              },
            ],
          },
          {
            type: '下午·分论坛',
            children: [
              {
                title: '数智时代，共赢未来-海量数据分论坛',
                date: '2024/06/21',
                time: '13:30-15:30',
              },
              {
                title: '慧聚创新，智启未来-云和恩墨分论坛',
                date: '2024/06/21',
                time: '13:30-15:30',
              },
              {
                title: 'openGauss全场景能力分论坛',
                date: '2024/06/21',
                time: '13:30-15:30',
              },
              {
                title: 'openGauss应用&运维分论坛',
                date: '2024/06/21',
                time: '13:30-15:30',
              },
            ],
          },
          {
            type: '下午·SIG组线下工作会议',
            children: [
              {
                title: 'SIG组版本规划工作会议&社区四周年庆祝',
                date: '2024/06/21',
                time: '15:30-18:30',
              },
            ],
          },
        ],
      },
    ],
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
