import stepHome from '~@/assets/category/tour/light/step-home.png';
import stepDownload from '~@/assets/category/tour/light/step-download.png';
import stepDevelopment from '~@/assets/category/tour/light/step-development.png';
import stepApprove from '~@/assets/category/tour/light/step-approve.png';
import stepCommunity from '~@/assets/category/tour/light/step-community.png';
import stepDocs from '~@/assets/category/tour/light/step-docs.png';
import stepDynamic from '~@/assets/category/tour/light/step-dynamic.png';
import stepFooter from '~@/assets/category/tour/light/step-footer.png';
import stepUser from '~@/assets/category/tour/light/step-user.png';
import stepLearn from '~@/assets/category/tour/light/step-learn.png';

import stepHomeDark from '~@/assets/category/tour/dark/step-home.png';
import stepDownloadDark from '~@/assets/category/tour/dark/step-download.png';
import stepDevelopmentDark from '~@/assets/category/tour/dark/step-development.png';
import stepApproveDark from '~@/assets/category/tour/dark/step-approve.png';
import stepCommunityDark from '~@/assets/category/tour/dark/step-community.png';
import stepDocsDark from '~@/assets/category/tour/dark/step-docs.png';
import stepDynamicDark from '~@/assets/category/tour/dark/step-dynamic.png';
import stepFooterDark from '~@/assets/category/tour/dark/step-footer.png';
import stepUserDark from '~@/assets/category/tour/dark/step-user.png';
import stepLearnDark from '~@/assets/category/tour/dark/step-learn.png';

export const FIRST_TOUR_STEPS = [
  {
    bg: stepHome,
    darkBg: stepHomeDark,
    target: '',
    color: '',
    placement: '',
    href: '/',
    title: 'Hi，朋友们，欢迎访问openGauss官网！',
    desc: [
      'openGauss 是面向全球开发者的开源数据库根社区。为提升体验，官网全面升级：导航更清晰，内容更聚焦，获取更高效。软件包、文档指南、社区动态、一目了然，触手可及。',
    ],
    extra: ['欢迎探索新版官网，高效开发，从这里开始。'],
  },
];

export const NEW_GUIDE_TOUR_STEPS = [
  {
    bg: stepDownload,
    darkBg: stepDownloadDark,
    target: '#tour_headerNav_download',
    color: '#AF7DFC',
    placement: 'bottom',
    href: '/',
    title: '下载',
    desc: ['探索openGauss 所有资源：LTS稳定版、创新版及全套开发工具，一键即可获取。'],
    extra: [],
  },
  {
    bg: stepDevelopment,
    darkBg: stepDevelopmentDark,
    target: '#tour_headerNav_development',
    color: '#AF7DFC',
    placement: 'bottom',
    href: '/',
    title: '开发',
    desc: ['提供 CLA 签署、贡献攻略等参与 opengauss 开发所需资源'],
    extra: [],
  },
  {
    bg: stepDocs,
    darkBg: stepDocsDark,
    target: '#tour_headerNav_document',
    color: '#AF7DFC',
    placement: 'bottom',
    href: '/',
    title: '文档',
    desc: ['提供安装部署、使用与运维、应用开发及工具使用等全场景的手册'],
    extra: [],
  },
  {
    bg: stepLearn,
    darkBg: stepLearnDark,
    target: '#tour_headerNav_learn',
    color: '#AF7DFC',
    placement: 'bottom',
    href: '/',
    title: '学习',
    desc: ['展示视频课程、线下活动、大咖之声、培训认证等资源'],
    extra: [],
  },
  {
    bg: stepApprove,
    darkBg: stepApproveDark,
    target: '#tour_headerNav_approve',
    color: '#AF7DFC',
    placement: 'bottom',
    href: '/',
    title: '支持',
    desc: ['提供相关认证服务、兼容性专区、迁移、漏洞公告等资源'],
    extra: [],
  },
  {
    bg: stepCommunity,
    darkBg: stepCommunityDark,
    target: '#tour_headerNav_community',
    color: '#AF7DFC',
    placement: 'bottom',
    href: '/',
    title: '社区',
    desc: ['展示贡献看板、用户案例、社区论坛等资源'],
    extra: [],
  },
  {
    bg: stepDynamic,
    darkBg: stepDynamicDark,
    target: '#tour_headerNav_update',
    color: '#AF7DFC',
    placement: 'bottom',
    href: '/',
    title: '动态',
    desc: ['查看社区相关活动、新闻博客等最新资讯'],
    extra: [],
  },
  {
    bg: stepUser,
    darkBg: stepUserDark,
    target: '#tour_headerNav_tool',
    color: '#AF7DFC',
    placement: 'bottom',
    href: '/',
    title: '个人中心',
    desc: ['代码仓、语言和个人中心入口在这里~'],
    extra: [],
  },
  {
    bg: stepFooter,
    darkBg: stepFooterDark,
    target: '#tour_headerNav_footer',
    color: 'var(--o-color-fill2)',
    placement: 'top',
    href: '/',
    title: 'Footer',
    desc: ['我们在Footer这里提供了一些快捷链接，方便朋友们的检索'],
    extra: [],
  },
];
