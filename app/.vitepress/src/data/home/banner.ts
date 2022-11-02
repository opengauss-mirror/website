import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mo from '@/assets/category/home/banner/liveBanner_mo.png';
import banner930 from '@/assets/category/home/banner/banner-930.jpg';
import banner930_mo from '@/assets/category/home/banner/banner-930-mo.jpg';

import banner310 from '@/assets/category/home/banner/opengauss3.1.0_zh_pc.png';
import banner310_mo from '@/assets/category/home/banner/opengauss3.1.0_zh_mo.png';

import banner310en from '@/assets/category/home/banner/opengauss3.1.0_en_pc.png';
import banner310en_mo from '@/assets/category/home/banner/opengauss3.1.0_en_mo.png';

import internship from '@/assets/category/home/banner/internship.png';
import internship_mo from '@/assets/category/home/banner/internship_mo.png';

import bannerSafety from '@/assets/category/home/banner/banner-safety.png';
import bannerSafety_mo from '@/assets/category/home/banner/banner-safety-mo.png';

// targetTap:1 新页签打开
export default {
  zh: [
    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mo,
      link: '/docs/3.0.0/docs/BriefTutorial/BriefTutorial.html',
      targetTap: 1,
      title: '欢迎加入openGauss社区',
      desc: ['openGauss是一款高性能、高安全、高可靠的企业级开源关系型数据库'],
      btn: '了解更多',
      video:
        'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com/openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4',
    },
    {
      pcBanner: banner310,
      moBanner: banner310_mo,
      link: '/zh/news/2022-09-30/20220930.html',
      targetTap: 0,
      title: '',
      desc: [''],
      btn: '',
      video: '',
    },
    {
      pcBanner: banner930,
      moBanner: banner930_mo,
      link: 'https://opengausssrc.vulbox.com/',
      targetTap: 1,
      title: '',
      desc: [''],
      btn: '',
      video: '',
    },
    {
      pcBanner: bannerSafety,
      moBanner: bannerSafety_mo,
      link: 'https://www.openeuler.org/zh/internship/',
      targetTap: 1,
      title: '',
      desc: [''],
      btn: 'Learn More',
      video: '',
    },
    {
      pcBanner: internship,
      moBanner: internship_mo,
      link: 'https://www.openeuler.org/zh/internship/',
      targetTap: 1,
      title: '',
      desc: [''],
      btn: 'Learn More',
      video: '',
    },
  ],
  en: [
    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mo,
      link: '/docs/3.0.0/docs/BriefTutorial/BriefTutorial.html',
      targetTap: 1,
      title: 'Welcome to openGauss Community',
      desc: [
        'openGauss is an enterprise-grade open source relational database with high-performance, high-security, high-reliability',
      ],
      btn: 'Learn More',
      video:
        'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com/openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4',
    },
    {
      pcBanner: banner310en,
      moBanner: banner310en_mo,
      link: '/zh/news/2022-09-30/20220930.html',
      targetTap: 0,
      title: '',
      desc: [''],
      btn: 'Learn More',
      video: '',
    },
  ],
};
