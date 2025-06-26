import bannerBg from '../img/banner-bg.jpg';
import bannerSummitMb from '../img/banner-bg-mb.jpg';
import textImg from '../img/banner-text.png';
import textImgMb from '../img/banner-text-mb.png';
import bracket from '../img/bracket.png';
import keyboard from '../img/keyboard.png';

import { FORUM_LINK } from '@/data/url-config';

export default {
  banner: {
    bg: bannerBg,
    bgMo: bannerSummitMb,
    textImg: textImg,
    textImgMb: textImgMb,
    signUpHref: 'https://e-campaign.huawei.com/events3/UniversalForm/register/773773941/register.html?site=cn&formId=11231&way=onsite',
    signUpTitle: '立即观看',
  },
  intro: {
    title: '大会简介',
    titleBg: 'INTRODUCTION',
    desc: [
      'openGauss Developer Day 2025是openGauss社区发起的开发者大会，旨在持续推动数据库领域的创新和突破。本次大会将全面展示openGauss 7.0.0 创新版的技术特性、openGauss 在内核、AI和四高（高性能、高可用、高智能、高安全）能力上的最新技术成果。',
      '本次大会也是 openGauss 社区的年度大型工作会议，值此开源五周年之际，openGauss社区邀请开发者、用户齐聚一堂，共同讨论下一个版本的技术路线与演进方向，携手共建数智化的数据库新生态。',
    ],
  },
  live: {
    title: '会议直播',
    titleBg: 'LIVE BROADCAST',
    list: [
      {
        liveId: '15642',
        liveTestId: '15666',
        name: 'openGauss Developer Day 2025',
      },
    ],
  },
  agenda: {
    title: '会议日程',
    titleBg: 'AGENDA',
    date: '06月27日',
    dateEn: 'JUNE 27',
    amList: {
      title: '上午',
      content: [
        {
          time: '9:30-9:45',
          desc: '致辞',
          person: [],
        },
        {
          time: '9:45-10:10',
          desc: '主题演讲：开源五载聚产业，技术引领创未来\n发布仪式：oGRAC 多写方案联合发布',
          person: [
            {
              name: '熊伟',
              post: 'openGauss 社区理事长',
            },
          ],
        },
        {
          time: '10:10-10:40',
          desc: '向量驱动新智能，RAC 多写破局，内核升级再启航',
          person: [
            {
              name: '王磊',
              post: 'openGauss 技术委员会委员、2012实验室高斯部首席架构师',
            },
            {
              name: '阙鸣健',
              post: 'openGauss 技术委员会委员',
            },
            {
              name: '曹宇',
              post: 'openGauss 社区Maintainer',
            },
          ],
        },
        {
          time: '10:40-10:50',
          desc: '汇聚创新动能，构筑运营商核心数据底座',
          person: [
            {
              name: '魏可伟',
              post: '中国移动信息技术公司数据库研发首席架构师',
            },
          ],
        },
        {
          time: '10:50-11:00',
          desc: 'CERDB助力国能集团数字化转型实践',
          person: [
            {
              name: '王志民',
              post: '国家能源网络安全中心云平台运营部经理',
            },
          ],
        },
        {
          time: '11:00-11:10',
          desc: '三重护航：Vastbase驱动“稳定、高效、智能”的医疗核心系统新实践',
          person: [
            {
              name: '白玥',
              post: '海量数据 解决方案总监',
            },
          ],
        },
        {
          time: '11:10-11:20',
          desc: '“智”造先“基”：MogDB数据库与鼎捷ERP软件的深度融合实践',
          person: [
            {
              name: '张皖川',
              post: '云和恩墨资深数据库内核架构师',
            },
          ],
        },
        {
          time: '11:20-11:30',
          desc: '中科通达基于openGauss的RAG创新实践',
          person: [
            {
              name: '杜冬军',
              post: '中科通达 AI技术架构师',
            },
          ],
        },
      ],
    },
    pmList: {
      title: '下午',
      content: [
        {
          time: '13:30-16:00',
          desc: '',
          person: [],
          list: [
            {
              title: 'SIG Gathering：openGauss内核',
              desc: '聚焦数据库"架构-性能-生态"核心突破，本专题将深度解析openGauss内核新特性与创新实践，包括 7.0.0版本核心技术解读与演进路线、RAC架构创新方案揭秘深度揭秘、SQL引擎技术体系技术拆解等。诚邀提交架构设计、性能调优、工程实践等深度议题。',
              href: 'https://etherpad.opengauss.org/p/openGauss%E5%86%85%E6%A0%B8',
              text: '查看议题',
            },
            {
              title: 'SIG Gathering：智能数据融合',
              desc: '围绕 openGauss 向量存储能力，探讨数据库在 AI 时代面临的挑战和机遇。从向量索引的更新和压缩、到基于 openGauss 在 RAG 场景的实践，其他上层应用的支持接入等，帮助开发者了解 openGauss 向量数据库的优势和使用方法。',
              href: 'https://etherpad.opengauss.org/p/%E6%99%BA%E8%83%BD%E6%95%B0%E6%8D%AE%E8%9E%8D%E5%90%88',
              text: '查看议题',
            },
            {
              title: 'SIG Gathering：用户体验/工具',
              desc: '聚焦数据库"安装-迁移-运维"全链体验升级，本专题将展示openGauss在下载优化、DataKit慢SQL全周期诊断、SQLite兼容测试等工具链的创新实践，同步规划后续体验优化方向。现开放议题征集通道，欢迎工具链痛点分析、交互体验优化方案、生态兼容性实践、智能运维新思路等方向议题。',
              href: 'https://etherpad.opengauss.org/p/%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E5%B7%A5%E5%85%B7',
              text: '查看议题',
            },
          ],
        },
        {
          time: '16:00-18:00',
          desc: 'openGauss 五周年·开发者嘉年华',
          person: [],
        },
      ],
    },
  },
  activity: {
    title: '更多活动',
    titleBg: 'MORE EVENTS',
    list: [
      {
        title: '云端围观：openGauss Developer Day论文Poster！',
        desc: '在openGauss社区论坛即可在线浏览论文Poster，与作者实时互动！参与互动即有机会获得电脑支架一个！',
        img: bracket,
        href: FORUM_LINK + '/t/topic/77',
        text: '了解详情',
      },
      {
        title: '投稿征集：你的创意，值得被看见！',
        desc: '在openGauss社区论坛发布技术文稿！通过审核即可获得机械键盘一个！',
        img: keyboard,
        href: FORUM_LINK + '/t/topic/75/2',
        text: '了解详情',
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
