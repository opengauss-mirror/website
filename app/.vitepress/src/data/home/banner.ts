import liveImg_pc from '@/assets/category/home/banner/liveBanner_pc.png';
import liveImg_mb from '@/assets/category/home/banner/liveBanner_mo.png';
import banner510 from '@/assets/category/home/banner/opengauss5.1.0_pc_zh.png';
import bannerEn510 from '@/assets/category/home/banner/opengauss5.1.0_pc_en.png';
import banner510_mb from '@/assets/category/home/banner/opengauss5.1.0_mo_zh.png';
import bannerEn510_mb from '@/assets/category/home/banner/opengauss5.1.0_mo_en.png';
import bannerQuestionnaire from '@/assets/category/home/banner/banner-questionnaire.jpg';
import bannerQuestionnaireMb from '@/assets/category/home/banner/banner-questionnaire-mb.png';
import videoGif from '@/assets/category/home/video-player.gif';

import { LEARN_VIDEO_LINK, DOCS_LINK } from '@/data/url-config';

// rightInset:banner右侧插图
export default {
  zh: [
    {
      pcBanner: bannerQuestionnaire,
      moBanner: bannerQuestionnaireMb,
      link: '/zh/events/2023-10-27/questionnaire.html',
      target: '_self',
      title: '参与社区满意度调研，领惊喜大奖',
      titleMb: ['参与社区满意度调研', '领惊喜大奖'],
      subtitle: '',
      desc: [''],
      btn: '了解详情',
      className: '',
      rightInset: '',
      rightLink: '',
    },
    {
      pcBanner: banner510,
      moBanner: banner510_mb,
      link: '/zh/news/2023-09-28/',
      target: '_self',
      title: '',
      titleMb: [],
      subtitle: '',
      desc: [''],
      btn: '',
      className: 'version',
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
      pcBanner: bannerEn510,
      moBanner: bannerEn510_mb,
      link: '/zh/news/2023-09-28/',
      target: '_self',
      title: '',
      titleMb: [],
      subtitle: '',
      desc: [''],
      btn: '',
      className: 'version',
      rightInset: '',
      rightLink: '',
    },
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
      className: '',
      rightInset: videoGif,
      rightLink: `${LEARN_VIDEO_LINK}openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4`,
    },
  ],
};
