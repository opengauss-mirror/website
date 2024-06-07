import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mb from '@/assets/category/home/banner/liveBanner_mo.png';
import bannerSummit from '@/assets/category/home/banner/banner-summit-2024.jpg';
import bannerSummitMo from '@/assets/category/home/banner/banner-summit_mo-2024.jpg';
import videoGif from '@/assets/category/home/video-player.gif';

import banner20240321 from '@/assets/category/home/banner/banner20240321.jpg';
import banner20240321_mb from '@/assets/category/home/banner/banner20240321_mb.png';

import bannerCallFor from '@/assets/category/home/banner/banner-call-for.jpg';
import bannerCallFor_mb from '@/assets/category/home/banner/banner-call-for_mb.png';

import banner600 from '@/assets/category/home/banner/banner6.0.0.jpg';
import banner600_mb from '@/assets/category/home/banner/banner6.0.0_mo.jpg';

import banner7 from '@/assets/category/home/banner/banner7.jpg';

import { LEARN_VIDEO_LINK, DOCS_LINK } from '@/data/url-config';

// rightInset:banner右侧插图
export default {
  zh: [
    {
      pcBanner: banner600,
      moBanner: banner600_mb,
      link: '/zh/news/2024-03-30/',
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
      pcBanner: banner7,
      moBanner: banner7,
      link: 'https://mp.weixin.qq.com/s/ALbCj2hAsjmFfOMu9gMlEw',
      target: '_blank',
      title: '第七届openGauss技术文章征集',
      titleMb: [],
      subtitle: 'openGauss新版本征文活动来啦！',
      desc: [''],
      btn: '了解更多',
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
      pcBanner: bannerSummit,
      moBanner: bannerSummitMo,
      link: '/zh/summit/devday2024/',
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
