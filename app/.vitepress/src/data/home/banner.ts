import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mo from '@/assets/category/home/banner/liveBanner_mo.png';
// import banner930 from '@/assets/category/home/banner/banner-930.jpg';
// import banner930_mo from '@/assets/category/home/banner/banner-930-mo.jpg';

import banner310 from '@/assets/category/home/banner/opengauss3.1.0_zh_pc.png';
import banner310_mo from '@/assets/category/home/banner/opengauss3.1.0_zh_mo.png';

// import internship from '@/assets/category/home/banner/internship.png';
// import internship_mo from '@/assets/category/home/banner/internship_mo.png';

// import bannerSafety from '@/assets/category/home/banner/banner-safety.png';
import bannerQues from '@/assets/category/home/banner/banner-ques.jpg';
import bannerQues_mo from '@/assets/category/home/banner/banner-ques-mo.png';
import bannerSummit from '@/assets/category/home/banner/banner-summit.jpg';
import bannerSummit_mo from '@/assets/category/home/banner/banner-summit-mo.png';

// import bannerSafety_mo from '@/assets/category/home/banner/banner-safety-mo.png';

// targetTap:1 新页签打开
// type:1(只有图片)、2(文字居左)，3(文字居中),4(仅用于实习banner)
export default {
  zh: [
    {
      pcBanner: bannerSummit,
      moBanner: bannerSummit_mo,
      link: '/zh/summit/summit2022/',
      targetTap: 1,
      title: '聚力创新向未来 释放数据生产力',
      desc: ['openGauss Summit 2022'],
      btn: '',
      type: 3,
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
    {
      pcBanner: liveImg_pc,
      moBanner: liveImg_mo,
      link: '/docs/3.0.0/docs/BriefTutorial/BriefTutorial.html',
      targetTap: 1,
      title: '欢迎加入openGauss社区',
      desc: ['openGauss是一款高性能、高安全、高可靠的企业级开源关系型数据库'],
      btn: '了解更多',
      type: 2,
      className: '',
      video:
        'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com/openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4',
    },

    // {
    //   pcBanner: banner310,
    //   moBanner: banner310_mo,
    //   link: '/zh/news/2022-09-30/20220930.html',
    //   targetTap: 0,
    //   title: 'openGauss 3.1.0 版本正式发布',
    //   desc: [''],
    //   btn: '',
    //   type: 3,
    //   className:'',
    //   video: '',
    // },
    // {
    //   pcBanner: banner930,
    //   moBanner: banner930_mo,
    //   link: 'https://partner.huawei.com/university/webui_portal/#/zone?customizedZoneId=VxkRMyFZWD7vX1uyOfwZFpBugag',
    //   targetTap: 1,
    //   title: '',
    //   desc: [''],
    //   btn: '',
    //   type: 2,
    //   className:'',
    //   video: '',
    // },
    // {
    //   pcBanner: bannerSafety,
    //   moBanner: bannerSafety,
    //   link: 'https://opengausssrc.vulbox.com/',
    //   targetTap: 1,
    //   title: '挑战openGauss漏洞奖励计划',
    //   desc: ['成为白帽大神'],
    //   btn: '开始挑战',
    //   type: 2,
    //   className:'',
    //   video: '',
    // },
    // {
    //   pcBanner: internship,
    //   moBanner: internship_mo,
    //   link: 'https://www.openeuler.org/zh/internship/',
    //   targetTap: 1,
    //   title: '开源实习',
    //   desc: ['技术大咖一对一，实习工资等您拿！'],
    //   btn: '查看详情',
    //   type: 4,
    //   className:'',
    //   video: '',
    // },
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
