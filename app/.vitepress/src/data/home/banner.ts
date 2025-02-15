import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mb from '@/assets/category/home/banner/liveBanner_mo.png';

import videoGif from '@/assets/category/home/video-player.gif';

import banner20240321 from '@/assets/category/home/banner/banner20240321.jpg';
import banner20240321_mb from '@/assets/category/home/banner/banner20240321_mb.png';

import bannerCallFor from '@/assets/category/home/banner/banner-call-for.jpg';
import bannerCallFor_mb from '@/assets/category/home/banner/banner-call-for_mb.png';

import bannerTeamUp from '@/assets/category/home/banner/banner-team-up.jpg';
import bannerTeamUpMo from '@/assets/category/home/banner/banner-team-up_mo.jpg';

import bannerOpenGaussV6 from '@/assets/category/home/banner/banner-opengaussv6.jpg';
import bannerOpenGaussV6Mo from '@/assets/category/home/banner/banner-opengaussv6_mo.jpg';

import banner600Pc from '@/assets/category/home/banner/banner-opengauss-6.0.0-pc.jpg';
import banner600Mo from '@/assets/category/home/banner/banner-opengauss-6.0.0-mo.jpg';

import banner20241211 from '@/assets/category/home/banner/banner_pc20241211.jpg';
import banner20241211_mb from '@/assets/category/home/banner/banner_mo20211211.jpg';
import banner_text20241211 from '@/assets/category/home/banner/banner_text_pc20241211.png';
import banner_text20241211_mb from '@/assets/category/home/banner/banner_text_mo20241211.png';

import { LEARN_VIDEO_LINK, DOCS_LINK } from '@/data/url-config';

// rightInset:banner右侧插图
export default {
  zh: [
    {
      pcBanner: banner20241211,
      moBanner: banner20241211_mb,
      link: '/zh/summit/summit2024/#live',
      target: '_blank',
      title: '',
      titleMb: [],
      subtitle: '',
      desc: [''],
      btn: '精彩回顾',
      className: 'summit202412',
      rightInset: '',
      rightLink: '',
      textImg: banner_text20241211,
      textImgMb: banner_text20241211_mb,
    },
    {
      pcBanner: banner600Pc,
      moBanner: banner600Mo,
      link: '/zh/news/2024-09-30/',
      target: '_blank',
      title: 'openGauss 6.0.0 LTS 版本正式发布',
      titleMb: ['openGauss 6.0.0 LTS \n版本正式发布'],
      subtitle: '',
      desc: [''],
      btn: '',
      className: 'banner-version',
      rightInset: '',
      rightLink: '',
    },
    {
      pcBanner: bannerOpenGaussV6,
      moBanner: bannerOpenGaussV6Mo,
      link: '/zh/news/2024-08-14/',
      target: '_blank',
      title: 'openGauss6.0.0版本更改数据库发布包名公告',
      titleMb: [],
      subtitle: '',
      desc: [''],
      btn: '了解更多',
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
      pcBanner: bannerCallFor,
      moBanner: bannerCallFor_mb,
      link: '/zh/call-for-meetup/',
      target: '_self',
      title: '',
      titleMb: [],
      subtitle: '',
      desc: [''],
      btn: '',
      className: '',
      rightInset: '',
      rightLink: '',
    },
    {
      pcBanner: banner20240321,
      moBanner: banner20240321_mb,
      link: '/zh/news/2024-03-21/',
      target: '_self',
      title: '',
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
      link: DOCS_LINK + 'zh/docs/3.1.1/docs/BriefTutorial/BriefTutorial.html',
      target: '_blank',
      title: '欢迎加入openGauss社区',
      titleMb: [],
      subtitle: '',
      desc: ['openGauss是一款高性能、高安全、高可靠的企业级开源关系型数据库'],
      btn: '了解更多',
      className: 'banner-video',
      rightInset: videoGif,
      rightLink: `${LEARN_VIDEO_LINK}openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4`,
    },
  ],
  en: [
    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mb,
      link: DOCS_LINK + 'en/docs/3.1.0/docs/BriefTutorial/BriefTutorial.html',
      target: '_blank',
      title: 'Welcome to openGauss Community',
      titleMb: [],
      subtitle: '',
      desc: [
        'openGauss is an enterprise-grade open source relational database with high-performance, high-security, high-reliability',
      ],
      btn: 'Learn More',
      className: 'banner-video',
      rightInset: videoGif,
      rightLink: `${LEARN_VIDEO_LINK}openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4`,
    },
  ],
};
