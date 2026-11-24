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
      'openGauss作为植根于国内的开源数据库根社区，开源6年以来，依托社区，携手客户、伙伴与开发者，持续推动技术创新与产业生态繁荣。面对 Agentic AI 时代数据库从传统数据管理系统向智能体核心底座的深刻变革，openGauss以“1+2”战略为牵引，凭借持续深化的数据库内核、创新的oGRAC超节点多写架构及AI原生多模态能力，在严守核心业务高性能、高可靠与安全底线的同时，全面使能智能应用创新，定义AI时代数据库新范式！',
      '本次峰会以“汇聚产业创新力量，共筑AI时代数据库新范式”为主题，诚邀产业领袖、技术专家、客户伙伴及全球开源先锋力量，于2026年12月15日-16日相聚北京北辰万豪侯爵酒店openGauss数据库 Summit 2026。共同探讨数据库架构创新与AI原生技术发展，深化开源生态协同与产业应用实践，携手打造面向Agentic AI时代的最强数据引擎，引领下一代数据库演进新范式！',
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
