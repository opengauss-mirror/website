import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mo from '@/assets/category/home/banner/liveBanner_mo.png';

import banner510 from '@/assets/category/home/banner/opengauss5.1.0_pc_zh.png';
import bannerEn510 from '@/assets/category/home/banner/opengauss5.1.0_pc_en.png';
import banner510_mo from '@/assets/category/home/banner/opengauss5.1.0_mo_zh.png';
import bannerEn510_mo from '@/assets/category/home/banner/opengauss5.1.0_mo_en.png';

import { LEARN_VIDEO_LINK } from '@/shared/url-config';

// targetTap:1 新页签打开
// type:1(只有图片)、2(文字居左)，3(文字居中),4(仅用于实习banner),5 视频
export default {
  zh: [
    {
      pcBanner: banner510,
      moBanner: banner510_mo,
      link: '/zh/news/2023-09-28/',
      targetTap: 0,
      title: '',
      subtitle: '',
      desc: [''],
      btn: '',
      type: 3,
      className: 'version',
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
      video: `${LEARN_VIDEO_LINK}openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4`,
    },
  ],
  en: [
    {
      pcBanner: bannerEn510,
      moBanner: bannerEn510_mo,
      link: '/zh/news/2023-09-28/',
      targetTap: 0,
      title: '',
      subtitle: '',
      desc: [''],
      btn: '',
      type: 3,
      className: 'version',
      video: '',
    },
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
      video: `${LEARN_VIDEO_LINK}openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4`,
    },
  ],
};
