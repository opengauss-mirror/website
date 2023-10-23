import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mb from '@/assets/category/home/banner/liveBanner_mo.png';
import banner510 from '@/assets/category/home/banner/opengauss5.1.0_pc_zh.png';
import bannerEn510 from '@/assets/category/home/banner/opengauss5.1.0_pc_en.png';
import banner510_mb from '@/assets/category/home/banner/opengauss5.1.0_mo_zh.png';
import bannerEn510_mb from '@/assets/category/home/banner/opengauss5.1.0_mo_en.png';

import { LEARN_VIDEO_LINK } from '@/shared/url-config';

// type:only-img(只有图片)、text-left(文字居左)，text-center(文字居中),video 视频
export default {
  zh: [
    {
      pcBanner: banner510,
      moBanner: banner510_mb,
      link: '/zh/news/2023-09-28/',
      target: '_self',
      title: '',
      subtitle: '',
      desc: [''],
      btn: '',
      type: 'only-img',
      className: 'version',
      video: '',
    },

    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mb,
      link: '/docs/3.1.1/docs/BriefTutorial/BriefTutorial.html',
      target: '_blank',
      title: '欢迎加入openGauss社区',
      subtitle: '',
      desc: ['openGauss是一款高性能、高安全、高可靠的企业级开源关系型数据库'],
      btn: '了解更多',
      type: 'text-left',
      className: '',
      video: `${LEARN_VIDEO_LINK}openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4`,
    },
  ],
  en: [
    {
      pcBanner: bannerEn510,
      moBanner: bannerEn510_mb,
      link: '/zh/news/2023-09-28/',
      target: '_self',
      title: '',
      subtitle: '',
      desc: [''],
      btn: '',
      type: 'text-center',
      className: 'version',
      video: '',
    },
    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mb,
      link: '/docs/3.1.0/docs/BriefTutorial/BriefTutorial.html',
      target: '_blank',
      title: 'Welcome to openGauss Community',
      subtitle: '',
      desc: [
        'openGauss is an enterprise-grade open source relational database with high-performance, high-security, high-reliability',
      ],
      btn: 'Learn More',
      type: 'text-left',
      className: '',
      video: `${LEARN_VIDEO_LINK}openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4`,
    },
  ],
};
