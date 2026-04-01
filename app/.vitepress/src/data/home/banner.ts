import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mb from '@/assets/category/home/banner/liveBanner_mo.png';

import videoGif from '@/assets/category/home/video-player.gif';

import bannerTeamUp from '@/assets/category/home/banner/banner-team-up.jpg';
import bannerTeamUpMo from '@/assets/category/home/banner/banner-team-up_mo.jpg';

import bannerOpenGaussV6 from '@/assets/category/home/banner/banner20250408.jpg';
import bannerOpenGaussV6Mo from '@/assets/category/home/banner/banner20250408_mo.jpg';

import bannerForumPc from '@/assets/category/home/banner/banner-forum.png';
import bannerForumMo from '@/assets/category/home/banner/banner-forum_mo.png';
import banner700RC3 from '@/assets/category/home/banner/banner700_RC3.png';
import banner700RC3Mo from '@/assets/category/home/banner/banner700_RC3_mo.png';
import ogce from '@/assets/category/home/banner/ogce.jpg';
import ogceMo from '@/assets/category/home/banner/ogce_mo.png';
import ogceDark from '@/assets/category/home/banner/ogce_dark.png';
import ogceMoDark from '@/assets/category/home/banner/ogce_mo_dark.png';
import annual2025 from '@/assets/category/home/banner/annual2025.png';
import annual2025Mo from '@/assets/category/home/banner/annual2025_mo.png';

import { LEARN_VIDEO_LINK, DOCS_LINK, FORUM_LINK } from '@/data/url-config';
import { ScreenSizeT } from '~@/composables/useScreen';

interface BannerItem {
  banners: Partial<Record<ScreenSizeT, string>>;
  bannersDark?: Partial<Record<ScreenSizeT, string>>;
  link: string;
  target: string;
  title: string;
  textImg?: string;
  textImgMb?: string;
  titleMb: string[];
  isLightBg?: boolean;
  subtitle: string;
  desc: string[];
  btn: string;
  className: string;
  rightInset: string;
  rightLink: string;
}

const setBannersDefaultValueProxy = (item: BannerItem) => {
  item.banners = new Proxy(item.banners, {
    get(target, p, receiver) {
      if (Reflect.has(target, p)) {
        return Reflect.get(target, p, receiver);
      }
      return target.laptop;
    },
    set(...args) {
      return Reflect.set(...args);
    },
  });
  if (item.bannersDark) {
    item.bannersDark = new Proxy(item.bannersDark, {
      get(target, p, receiver) {
        if (Reflect.has(target, p)) {
          return Reflect.get(target, p, receiver);
        }
        return target.laptop;
      },
      set(...args) {
        return Reflect.set(...args);
      },
    });
  }
  return item;
};

// rightInset:banner右侧插图
export default {
  zh: [
    {
      banners: {
        laptop: banner700RC3,
        phone: banner700RC3Mo,
      },
      link: '/zh/download/?version=rc',
      target: '_blank',
      title: 'openGauss 7.0.0-RC3 版本正式发布',
      isLightBg: true,
      titleMb: ['openGauss 7.0.0 RC3 \n版本正式发布'],
      subtitle: '',
      desc: [''],
      btn: '立即查看',
      className: 'banner-version',
      rightInset: '',
      rightLink: '',
    },
    {
      banners: {
        laptop: annual2025,
        pad_v: annual2025Mo,
        phone: annual2025Mo,
      },
      link: '/zh/news/2026-01-16/',
      target: '_blank',
      title: 'openGauss 开源社区2025年度报告',
      isLightBg: true,
      titleMb: [''],
      subtitle: '',
      desc: [''],
      btn: '前往查看',
      className: '',
      rightInset: '',
      rightLink: '',
    },
    {
      banners: {
        laptop: ogce,
        phone: ogceMo,
      },
      bannersDark: {
        laptop: ogceDark,
        phone: ogceMoDark,
      },
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
      banners: {
        laptop: bannerForumPc,
        phone: bannerForumMo,
      },
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
      banners: {
        laptop: bannerOpenGaussV6,
        phone: bannerOpenGaussV6Mo,
      },
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
      banners: {
        laptop: bannerTeamUp,
        phone: bannerTeamUpMo,
      },
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
      banners: {
        laptop: liveImg_pc,
        phone: liveImg_mb,
      },
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
  ].map(setBannersDefaultValueProxy),
  en: [
    {
      banners: {
        laptop: liveImg_pc,
        phone: liveImg_mb,
      },
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
  ].map(setBannersDefaultValueProxy),
} as Record<'zh' | 'en', BannerItem[]>;
