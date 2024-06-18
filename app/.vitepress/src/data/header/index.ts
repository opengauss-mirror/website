import { NavItemT } from '@/shared/@types/type-nav';
import {
  GITEE_LINK,
  DATA_LINK,
  GIYHUB_LINK,
  DOCS_LINK,
} from '@/data/url-config';
const navData: Array<NavItemT> = [
  {
    label: { zh: '下载', en: 'Download' },
    id: 'download',
    children: [
      {
        label: { zh: '软件包', en: 'Software Packages' },
        id: 'iso',
        href: {
          zh: '/zh/download/',
          en: '/en/download/',
        },
      },
      {
        label: { zh: '支持工具', en: 'Support Tools' },
        id: 'supporttools',
        href: {
          zh: '/zh/supporttools/',
          en: '/en/supporttools/',
        },
      },
    ],
  },
  {
    label: { zh: '学习', en: 'Learning' },
    id: 'learning',
    children: [
      {
        label: { zh: '文档', en: 'Documentation' },
        href: {
          zh: DOCS_LINK + 'zh/',
          en: DOCS_LINK + 'en/',
        },
        id: 'docs',
        jumOut: true,
      },
      {
        label: { zh: '知识图谱' },
        id: 'knowledge',
        href: {
          zh: '/zh/knowledge/',
        },
      },
      {
        label: { zh: '学习进阶' },
        id: 'advanced',
        href: {
          zh: '/zh/advanced/',
        },
      },
      {
        label: { zh: 'FAQ' },
        id: 'faq',
        href: {
          zh: '/zh/faq/',
        },
      },
    ],
  },
  {
    label: { zh: '社区', en: 'Community' },
    id: 'community',
    children: [
      {
        label: { zh: '社区贡献', en: 'Contribution' },
        id: 'contribution',
        href: {
          zh: '/zh/contribution/',
          en: '/en/contribution/',
        },
      },
      {
        label: { zh: '线上交流', en: 'Communication' },
        id: 'onlineCommunication',
        href: {
          zh: '/zh/community/onlineCommunication/',
          en: '/en/community/onlineCommunication/',
        },
      },
      {
        label: { zh: '社区组织', en: 'Organization' },
        id: 'member',
        href: {
          zh: '/zh/member/',
          en: '/en/member/',
        },
      },
      {
        label: { zh: '用户实践', en: 'User Practice' },
        id: 'userPractice',
        href: {
          zh: '/zh/userPractice/',
          en: '/en/userPractice/',
        },
      },
      {
        label: { zh: '金融专区' },
        id: 'finance',
        href: {
          zh: '/zh/finance/',
        },
      },
      {
        label: { zh: 'Call for Meetup' },
        id: 'meetup',
        href: {
          zh: '/zh/call-for-meetup/',
        },
      },
      {
        label: { zh: '结队计划' },
        id: 'teamUp',
        href: {
          zh: '/zh/team-up/',
        },
      },
      {
        label: { zh: '迁移专区' },
        id: 'migration',
        href: {
          zh: '/zh/migration/',
        },
      },
      {
        label: { zh: '社区荣誉' },
        id: 'honor',
        href: {
          zh: '/zh/honor/',
        },
      },
      {
        label: { zh: '贡献看板', en: 'Statistics' },
        id: 'statistics',
        href: {
          zh: DATA_LINK + 'zh/overview',
          en: DATA_LINK + 'en/overview',
        },
        jumOut: true,
      },
    ],
  },
  {
    label: { zh: '互动', en: 'Connect' },
    id: 'connect',
    children: [
      {
        label: { zh: '新闻', en: 'News' },
        id: 'news',
        href: {
          zh: '/zh/news/',
          en: '/en/news/',
        },
      },
      {
        label: { zh: '博客', en: 'Blog' },
        id: 'blog',
        href: {
          zh: '/zh/blogs/',
          en: '/en/blogs/',
        },
      },
      {
        label: { zh: '活动', en: 'Events' },
        id: 'events',
        href: {
          zh: '/zh/events/',
          en: '/en/events/',
        },
      },
      {
        label: { zh: '视频', en: 'Videos' },
        id: 'video',
        href: {
          zh: '/zh/video/',
          en: '/en/video/',
        },
      },
      {
        label: { zh: '大咖之声' },
        id: 'bigshot',
        href: {
          zh: '/zh/bigshot-voice/',
        },
      },
      {
        label: { zh: '峰会' },
        id: 'summit',
        href: {
          zh: '/zh/summit/devday2024/',
        },
      },
    ],
  },
  {
    label: { zh: '认证', en: 'Certification' },
    id: 'Certification',
    children: [
      {
        label: { zh: '发行版认证', en: 'Distribution Certification' },
        id: 'certification',
        href: {
          zh: '/zh/certification/',
          en: '/en/certification/',
        },
      },
      {
        label: { zh: '兼容性列表' },
        id: 'compatibility',
        href: {
          zh: '/zh/compatibility/',
        },
      },
      {
        label: { zh: '服务商认证', en: 'oGSP Certification' },
        id: 'ogsp',
        href: {
          zh: '/zh/ogsp/',
          en: '/en/ogsp/',
        },
      },
      {
        label: { zh: '培训认证' },
        id: 'training',
        href: {
          zh: '/zh/training/',
        },
      },
    ],
  },
  {
    label: { zh: '安全', en: 'Security' },
    id: 'discovery',
    children: [
      {
        label: { zh: '漏洞管理', en: 'Vulnerability Report' },
        id: 'security',
        href: {
          zh: '/zh/security/',
        },
      },
      {
        label: { zh: '安全公告', en: 'Security Advisories' },
        id: 'advisories',
        href: {
          zh: '/zh/security-advisories/',
          en: '/en/security-advisories/',
        },
      },
      {
        label: { zh: 'CVE', en: 'CVE' },
        id: 'cve',
        href: {
          zh: '/zh/cve/',
          en: '/en/cve/',
        },
      },
    ],
  },
  {
    label: { zh: '代码', en: 'Code' },
    id: 'code',
    children: [
      {
        id: 'gitee',
        label: { zh: 'Gitee', en: 'Gitee' },
        href: {
          zh: GITEE_LINK + 'opengauss',
          en: GITEE_LINK + 'opengauss',
        },
        jumOut: true,
      },
      {
        id: 'github',
        label: { zh: 'Github', en: 'Github' },
        href: {
          zh: GIYHUB_LINK + 'opengauss-mirror',
          en: GIYHUB_LINK + 'opengauss-mirror',
        },
        jumOut: true,
      },
    ],
  },
];
export default navData;
