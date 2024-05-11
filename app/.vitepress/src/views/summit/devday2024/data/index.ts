import bannerBg from '../img/banner.jpg';
import introTitleImg from '../img/intro-title-img.png';
import agendaTitleImg from '../img/agenda-title-img.png';
import nowTitleImg from '../img/now-title-img.png';
import nowHoverImg from '../img/now-hover.jpg';

import introTitleImgDark from '../img/intro-title-img-dark.png';
import agendaTitleImgDark from '../img/agenda-title-img-dark.png';
import nowTitleImgDark from '../img/now-title-img-dark.png';

export default {
  banner: {
    bg: bannerBg,
    title: 'openGauss Developer Day 2024',
    subtitle: '6月20-21日 | 北京.昆泰嘉瑞文化中心',
  },
  intro: {
    titleImg: introTitleImg,
    titleImgDark: introTitleImgDark,
    title: '大会简介',
    desc: [
      'openGauss Developer Day 2024是openGauss社区发起并举办的数据库开发者年度盛会。同参与，齐贡献，openGauss社区开源4年来在内核、DataPod、DataKit、生态兼容、云原生五大方向上汇聚产业链大量创新力量。一方面内核竞争力上持续投入，另一方面实现DataPod、DataKit两大架构创新，分层解耦、资源池化，持续引领数据库技术发展方向；同时在生态兼容、云原生方向上取得良好成果。同时，得益于产业链共建、共享、共治，openGauss在产业、生态、商业和社区治理等方面也发展显著，正式跨越生态拐点。',
      '为了持续打造中国最具创新力的开源数据库根社区，全面构筑面向数字基础设施的开源数据库，大会诚邀学术专家，行业用户，合作伙伴，开发者共同探讨数据库面向多场景的技术创新，分享基于openGauss的行业联合创新成果及商业实践，献计社区治理完善，讨论社区版本规划。openGauss诚邀开发者齐参与，同贡献，繁荣开源数据库根社区。',
    ],
  },
  agenda: {
    titleImg: agendaTitleImg,
    titleImgDark: agendaTitleImgDark,
    title: '会议日程',
    date: 'June 20 -June 21',
    list: [
      {
        time: '06月20日',
        id: 'main',
        list: [
          {
            type: '上午',
            children: [
              {
                title: '技术委员会工作会议',
                date: '2024/06/20',
                time: '10:00-12:00',
              },
              {
                title: '用户委员会工作会议',
                date: '2024/06/20',
                time: '10:00-12:00',
              },
              {
                title: '品牌委员会工作会议',
                date: '2024/06/20',
                time: '10:00-12:00',
              }
            ]
          },
          {
            type: '下午',
            children: [
              {
                title: '理事会会工作会议',
                date: '2024/06/20',
                time: '14:00-17:30',
              }
            ]
          }
        ]
      },
      {
        time: '06月21日',
        id: 'other',
        list: [
          {
            type: '展台',
            children: [
              {
                title: '上午09:00-下午18:00',
                date: '2024/06/21',
                time: '',
              },
            ]
          },
          {
            type: '上午',
            children: [
              {
                title: 'openGauss开发者大会主论坛  ',
                date: '2024/06/21',
                time: '09:00-11:30',
              },
            ]
          },
          {
            type: '下午',
            children: [
              {
                title: '分论坛',
                date: '2024/06/21',
                time: '13:00-15:00',
              },
              {
                title: 'SIG组版本规划工作会议',
                date: '2024/06/21',
                time: '15:00-18:00',
              }
            ]
          }
        ]
      }
    ],
  },
  now: {
    titleImg: nowTitleImg,
    titleImgDark: nowTitleImgDark,
    hoverImg: nowHoverImg,
    title: '立即参与',
    list: [
      {
        title: 'Call  For Speaker',
        text: '提交演示议题',
        href: 'https://shimo.im/forms/9030Jd4z85TWEgkw/fill',
      },
      {
        title: 'Call for SIG',
        text: '申报现场会议',
        href: 'https://shimo.im/forms/m8AZMlraoQHKnjkb/fill',
      }
    ]
  }
}
