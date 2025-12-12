import bannerBg from '../img/banner.png';
import bannerBgMo from '../img/banner_mo.png';
import bannerText from '../img/banner_text_pc.png';

import agenda from './agenda';

export default {
  banner: {
    bg: bannerBg,
    bgMo: bannerBgMo,
    textImg: bannerText,
    linkTitle: '立即报名',
    link: '',
  },
  intro: {
    title: '大会简介',
    desc: [
      'openGauss作为植根于国内的开源数据库根社区，开源5年以来，基于社区，依靠伙伴，服务客户，产业共建、生态繁荣；openGauss系市场份额屡攀新高；技术不断创新，服务全场景，使能AI，加速行业智能化。剑指未来5年，openGauss定义AI时代数据库新范式！凭借三大核心利器——划时代的超节点DB、颠覆性的AI RAG向量引擎、以及极致弹性的Serverless云服务架构，我们正掀起一场数据库领域的全新变革，重塑产业格局。',
      '本次大会以“汇聚数据库创新力量，发掘数据要素智慧潜能”为主题，召唤思想引领者、商业掌舵人、技术颠覆者与全球开源先锋力量，共同见证openGauss在AI领域的历史性突破。发布openGauss重要技术版本及重磅产品，以技术创新与全球化实践为矛，锐意进取，强力开启属于openGauss的下一个辉煌五年。',
    ],
  },
  live: {
    title: '会议直播',
    list: [
      {
        liveId: '15104',
        liveTestId: '15099',
        name: '',
      },
      {
        liveId: '15105',
        liveTestId: '15100',
        name: 'AI分论坛',
        time: '13:30-15:30'
      },
      {
        liveId: '15108',
        liveTestId: '15103',
        name: '伙伴分论坛',
        time: '13:30-15:30'
      },
      {
        liveId: '15109',
        liveTestId: '15104',
        name: '行业分论坛',
        time: '13:30-15:30'
      },
      {
        liveId: '15110',
        liveTestId: '15105',
        name: '互联网圆桌会议',
        time: '13:30-15:30'
      },
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
