import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mo from '@/assets/category/home/banner/liveBanner_mo.png';

import banner500 from '@/assets/category/home/banner/opengauss5.0.0_pc.jpg';
import banner500_mo from '@/assets/category/home/banner/opengauss5.0.0_mo.png';

import bannerHissPc from '@/assets/category/home/banner/banner-hiss_pc.png';
import bannerHissMo from '@/assets/category/home/banner/banner-hiss_mo.png';

import bannerActivePc from '@/assets/category/home/banner/banner-active_pc.png';
import bannerActiveMo from '@/assets/category/home/banner/banner-active_mo.png';

// targetTap:1 新页签打开
// type:1(只有图片)、2(文字居左)，3(文字居中),4(仅用于实习banner),5 视频
export default {
  zh: [
    {
      pcBanner: bannerHissPc,
      moBanner: bannerHissMo,
      link: 'https://hiss.shixizhi.huawei.com/portal/1643780836745113602?pageId=1644234415967604737&activeIndex=-1&sxz-lang=zh_CN',
      targetTap: 1,
      title: '',
      subtitle: '',
      desc: [],
      btn: '',
      type: 2,
      className: 'hiss-banner',
      video: '',
    },
    {
      pcBanner: bannerActivePc,
      moBanner: bannerActiveMo,
      link: '/zh/events/2023-07-05/',
      targetTap: 0,
      title: '',
      subtitle: '',
      desc: [''],
      btn: '',
      type: 2,
      className: '',
      video: '',
    },
    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mo,
      link: '/docs/3.1.1/docs/BriefTutorial/BriefTutorial.html',
      targetTap: 1,
      title: '欢迎加入openGauss社区',
      subtitle: '',
      desc: ['openGauss是一款高性能、高安全、高可靠的企业级开源关系型数据库'],
      btn: '了解更多',
      type: 2,
      className: '',
      video:
        'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com/openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4',
    },
    {
      pcBanner: banner500,
      moBanner: banner500_mo,
      link: '/zh/news/2023-03-31/',
      targetTap: 0,
      title: 'openGauss 5.0.0 版本正式发布',
      subtitle: '',
      desc: [''],
      btn: '',
      type: 3,
      className: 'version',
      video: '',
    },
  ],
  en: [
    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mo,
      link: '/docs/3.1.0/docs/BriefTutorial/BriefTutorial.html',
      targetTap: 1,
      title: 'Welcome to openGauss Community',
      subtitle: '',
      desc: [
        'openGauss is an enterprise-grade open source relational database with high-performance, high-security, high-reliability',
      ],
      btn: 'Learn More',
      type: 2,
      className: '',
      video:
        'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com/openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4',
    },
    {
      pcBanner: banner500,
      moBanner: banner500_mo,
      link: '/zh/news/2023-03-31/',
      targetTap: 0,
      title: 'openGauss Officially Releases Version 5.0.0',
      subtitle: '',
      desc: [''],
      btn: '',
      type: 3,
      className: 'version',
      video: '',
    },
  ],
};
