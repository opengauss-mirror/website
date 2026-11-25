import bannerBg from '../img/banner.jpg';
import bannerBgPad from '../img/banner_pad.jpg';
import bannerBgMo from '../img/banner_mo.png';
import bannerText from '../img/banner_text_pc.png';

import agenda from './agenda';

export default {
  banner: {
    bg: bannerBg,
    bgPad: bannerBgPad,
    bgMo: bannerBgMo,
    textImg: bannerText,
    linkTitle: '立即报名',
    textAlt: '汇聚产业创新力量，共筑AI时代数据库新范式 openGauss Summit 2026，时间：2026年12月16日，地点：中国北京',
    link: '',
  },
  intro: {
    title: '大会简介',
    titleBg: 'INTRODUCTION',
    desc: [
      '历经六年深耕，作为中国领先的开源数据库，openGauss已广泛应用于国计民生及互联网等千行百业，率先发布业界首个开源多写数据库oGRAC，持续引领数据库技术创新。面向Agentic AI时代，openGauss以"1+2"战略为牵引，持续深耕一个内核底座，协同推进超节点多写架构与AI原生数据库两大技术方向创新，拓展Agentic AI时代数据库技术边界，推动数据库从传统数据管理走向AI时代的核心数据引擎。',
      '为此，我们诚挚邀请您出席于2026年12月16日在北京北辰万豪侯爵酒店举行的openGauss Summit 2026。本届峰会以"汇聚产业创新力量，共筑AI时代数据库新范式"为主题，汇聚产业领袖、客户伙伴与开发者，共话数据库技术变革，共探产业未来。',
      '莅临大会现场，您将：',
      '• 见证openGauss超节点数据库最新成果发布及ServerlessDB、oGMemory等AI原生关键技术突破；',
      '• 参与系列主题演讲与圆桌论坛，与社区专家、开发者共话Agentic Infra前沿观点与落地实践；',
      '• 体验沉浸式展区，亲手实践最新Agentic AI技术创新，感受伙伴AI联创成果的全景演绎。',
    ],
  },
  live: {
    title: '会议直播',
    titleBg: 'LIVE BROADCAST',
    list: [
      {
        liveId: '16011',
        liveTestId: '16007',
        name: 'openGauss Summit 2025 主题演讲',
      },
      {
        liveId: '16012',
        liveTestId: '16008',
        name: 'AI分论坛',
        time: '13:30-15:30',
      },
      {
        liveId: '16013',
        liveTestId: '16009',
        name: '伙伴分论坛',
        time: '13:30-15:30',
      },
      {
        liveId: '16014',
        liveTestId: '16010',
        name: '行业分论坛',
        time: '13:30-15:30',
      },
    ],
  },
  agenda: {
    title: '会议日程',
    titleBg: 'AGENDA',
    list: agenda,
  },
  partner: {
    title: '共建单位',
    titleBg: 'COLLABORATOR',
    content: [
      {
        title: '主办单位',
        name: 'openGauss开源社区',
      },
      // {
      //   title: '协办单位',
      //   name: '中国科学院软件研究所、清华大学、北京海量数据技术股份有限公司、粤港澳大湾区国家技术创新中心',
      // }
    ],
  },
  review: {
    title: '精彩回顾',
    titleBg: 'HIGHLIGHTS REVIEW',
    list: [
      {
        title: 'openGauss Summit 2025',
        link: '/zh/summit/summit2025/',
      },
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
