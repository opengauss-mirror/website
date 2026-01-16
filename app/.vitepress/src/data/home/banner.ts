import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mb from '@/assets/category/home/banner/liveBanner_mo.png';

import videoGif from '@/assets/category/home/video-player.gif';

import bannerTeamUp from '@/assets/category/home/banner/banner-team-up.jpg';
import bannerTeamUpMo from '@/assets/category/home/banner/banner-team-up_mo.jpg';

import bannerOpenGaussV6 from '@/assets/category/home/banner/banner20250408.jpg';
import bannerOpenGaussV6Mo from '@/assets/category/home/banner/banner20250408_mo.jpg';

import bannerDift from '@/assets/category/home/banner/banner2025040801.jpg';
import bannerDiftMo from '@/assets/category/home/banner/banner2025040801_mo.jpg';

import banner20250506Pc from '@/assets/category/home/banner/banner20250506Pc.png';
import banner20250506Mo from '@/assets/category/home/banner/banner20250506Mo.png';

import bannerForumPc from '@/assets/category/home/banner/banner-forum.png';
import bannerForumMo from '@/assets/category/home/banner/banner-forum_mo.png';
import banner700RC2 from '@/assets/category/home/banner/banner700_RC2.jpg';
import banner700RC2Mo from '@/assets/category/home/banner/banner700_RC2_mo.jpg';
import ogce from '@/assets/category/home/banner/ogce.jpg';
import ogceMo from '@/assets/category/home/banner/ogce_mo.png';
import ogceDark from '@/assets/category/home/banner/ogce_dark.png';
import ogceMoDark from '@/assets/category/home/banner/ogce_mo_dark.png';
import summit2025 from '@/assets/category/home/banner/banner-summit2025.png';
import summit2025Mo from '@/assets/category/home/banner/banner-summit2025_mo.png';
import summit2025Pad from '@/assets/category/home/banner/banner-summit2025_pad.png';
import summit2025Text from '@/assets/category/home/banner/banner-summit2025_text_pc.png'

import { LEARN_VIDEO_LINK, DOCS_LINK, FORUM_LINK } from '@/data/url-config';
import { ScreenSizeT } from '~@/composables/useScreen';

// rightInset:banner右侧插图
export default {
  zh: [
    {
      pcBanner: summit2025,
      moBanner: summit2025Mo,
      banners: { phone: summit2025Mo, pad_v: summit2025Mo, pad_h: summit2025Pad, 'laptop': summit2025 },
      link: '/zh/summit/summit2025/',
      target: '_blank',
      title: '',
      textImg: summit2025Text,
      titleMb: [],
      subtitle: '',
      desc: [''],
      btn: '前往查看',
      className: 'summit202506',
      rightInset: '',
      rightLink: '',
    },
    {
      pcBanner: banner20250506Pc,
      moBanner: banner20250506Mo,
      link: '/zh/news/2025-12-31',
      target: '_blank',
      title: 'openGauss 5.0.0 LTS版本即将停止维护公告',
      titleMb: ['openGauss 5.0.0\nLTS版本即将停止维护公告'],
      subtitle: '',
      desc: [''],
      btn: '查看详情',
      className: 'banner-video',
      rightInset: '',
      rightLink: '',
    },
    {
      pcBanner: ogce,
      moBanner: ogceMo,
      pcBannerDark: ogceDark,
      moBannerDark: ogceMoDark,
      link: '/zh/training/',
      target: '_blank',
      title: 'openGauss OGCE专家认证正式发布',
      titleMb: ['openGauss OGCE专家认证正式发布'],
      isLightBg: true,
      subtitle: '',
      desc: [''],
      btn: '了解更多',
      className: '',
      rightInset: '',
      rightLink: '',
    },
    {
      pcBanner: banner700RC2,
      moBanner: banner700RC2Mo,
      link: '/zh/news/2025-09-30/',
      target: '_blank',
      title: 'openGauss 7.0.0-RC2 版本正式发布',
      isLightBg: true,
      titleMb: ['openGauss 7.0.0 RC2 \n版本正式发布'],
      subtitle: '',
      desc: [''],
      btn: '',
      className: 'banner-version',
      rightInset: '',
      rightLink: '',
    },
    {
      pcBanner: bannerForumPc,
      moBanner: bannerForumMo,
      link: FORUM_LINK,
      target: '_blank',
      title: '【论坛上线】',
      titleMb: ['【论坛上线】'],
      subtitle: '提问·分享·成长，尽在社区openGauss社区论坛！',
      desc: [''],
      btn: '进入论坛',
      className: '',
      rightInset: '',
      rightLink: '',
    },
    {
      pcBanner: bannerOpenGaussV6,
      moBanner: bannerOpenGaussV6Mo,
      link: DOCS_LINK + '/zh/docs/latest/datavec/datavec_overview.html',
      target: '_blank',
      title: 'openGauss 向量引擎',
      titleMb: [],
      subtitle: 'openGauss向量数据库实战案例集',
      desc: [''],
      btn: '立即查看',
      className: '',
      rightInset: '',
      rightLink: '',
    },
    {
      pcBanner: bannerDift,
      moBanner: bannerDiftMo,
      link: DOCS_LINK + '/zh/docs/latest/docs/DataVec/openGauss-RAG实践.html',
      target: '_blank',
      title: 'openGauss DataVec + Dify',
      titleMb: [],
      subtitle: '',
      desc: [''],
      btn: '立即查看',
      className: '',
      rightInset: '',
      rightLink: '',
    },

    {
      pcBanner: bannerTeamUp,
      moBanner: bannerTeamUpMo,
      link: '/zh/team-up/',
      target: '_self',
      title: 'openGauss 结队计划 正式上线',
      titleMb: [],
      subtitle: '',
      desc: [''],
      btn: '',
      className: '',
      rightInset: '',
      rightLink: '',
    },
    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mb,
      link: DOCS_LINK + '/zh/docs/3.1.1/docs/BriefTutorial/BriefTutorial.html',
      target: '_blank',
      title: '欢迎加入openGauss社区',
      titleMb: [],
      subtitle: '',
      desc: ['openGauss是一款高性能、高安全、高可靠的企业级开源关系型数据库'],
      btn: '了解更多',
      className: 'banner-video',
      rightInset: videoGif,
      rightLink: `${LEARN_VIDEO_LINK}/openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4`,
    },
  ],
  en: [
    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mb,
      link: DOCS_LINK + '/en/docs/3.1.0/docs/BriefTutorial/BriefTutorial.html',
      target: '_blank',
      title: 'Welcome to openGauss Community',
      titleMb: [],
      subtitle: '',
      desc: ['openGauss is an enterprise-grade open source relational database with high-performance, high-security, high-reliability'],
      btn: 'Learn More',
      className: 'banner-video',
      rightInset: videoGif,
      rightLink: `${LEARN_VIDEO_LINK}/openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4`,
    },
  ],
} as Record<
  'zh' | 'en',
  {
    pcBanner: string;
    moBanner: string;
    banners?: Record<ScreenSizeT, string>,
    pcBannerDark?: string;
    moBannerDark?: string;
    link: string;
    target: string;
    title: string;
    textImg?: string;
    textImgMb?: string;
    titleMb: string[];
    isLightBg?: string;
    subtitle: string;
    desc: string[];
    btn: string;
    className: string;
    rightInset: string;
    rightLink: string;
  }[]
>;
