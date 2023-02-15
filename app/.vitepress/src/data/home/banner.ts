import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mo from '@/assets/category/home/banner/liveBanner_mo.png';

import banner310 from '@/assets/category/home/banner/opengauss3.1.0_zh_pc.png';
import banner310_mo from '@/assets/category/home/banner/opengauss3.1.0_zh_mo.png';

import banner0104 from '@/assets/category/home/banner/opengauss3.1.1_zh_pc.png';
import banner0104_mo from '@/assets/category/home/banner/opengauss3.1.1_zh_mo.png';

import bannerQues from '@/assets/category/home/banner/banner-ques.jpg';
import bannerQues_mo from '@/assets/category/home/banner/banner-ques-mo.png';
import bannerSummit from '@/assets/category/home/banner/banner-summit.jpg';
import bannerSummit_mo from '@/assets/category/home/banner/banner-summit-mo.jpg';

// targetTap:1 新页签打开
// type:1(只有图片)、2(文字居左)，3(文字居中),4(仅用于实习banner),5 视频
export default {
  zh: [
    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mo,
      link: '/docs/3.1.1/docs/BriefTutorial/BriefTutorial.html',
      targetTap: 1,
      title: '欢迎加入openGauss社区',
      desc: ['openGauss是一款高性能、高安全、高可靠的企业级开源关系型数据库'],
      btn: '了解更多',
      type: 2,
      className: '',
      video:
        'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com/openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4',
    },
    {
      pcBanner: banner0104,
      moBanner: banner0104_mo,
      link: '/zh/news/2023-01-04/20230104.html',
      targetTap: 0,
      title: '',
      desc: [''],
      btn: '',
      type: 3,
      className: '',
      video: '',
    },
    {
      pcBanner: bannerSummit,
      moBanner: bannerSummit_mo,
      link: '/zh/summit/summit2022/',
      targetTap: 1,
      title: '',
      desc: [''],
      btn: '',
      type: 1,
      className: 'summit',
      video: '',
    },
    {
      pcBanner: bannerQues,
      moBanner: bannerQues_mo,
      link: '/zh/questionnaire/',
      targetTap: 1,
      title: '参与社区满意度调研，领惊喜大奖',
      desc: [''],
      btn: '了解详情',
      type: 2,
      className: 'ques',
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
      pcBanner: banner310,
      moBanner: banner310_mo,
      link: '/zh/news/2022-09-30/20220930.html',
      targetTap: 0,
      title: 'openGauss Officially Releases Version 3.1.0',
      desc: [''],
      btn: '',
      type: 3,
      className: '',
      video: '',
    },
  ],
};
