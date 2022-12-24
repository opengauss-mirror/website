import demoPng from '@/assets/category/summit/summit2022/demo.png';
import speakerPng from '@/assets/category/summit/summit2022/speaker.png';
import organizerPng from '@/assets/category/summit/summit2022/organizer.png';
import otherCover1 from '@/assets/category/summit/summit2022/cover1.png';
import otherCover2 from '@/assets/category/summit/summit2022/cover2.png';

import csia from '@/assets/category/summit/partners/light/csia.png';
import ccf from '@/assets/category/summit/partners/light/ccf.png';
import opengauss from '@/assets/category/summit/partners/light/opengauss.png';
import vastdata from '@/assets/category/summit/partners/light/vastdata.png';
import enmotech from '@/assets/category/summit/partners/light/enmotech.png';
import shenzhou from '@/assets/category/summit/partners/light/shenzhou.png';
import gbase from '@/assets/category/summit/partners/light/gbase.png';
import cjb from '@/assets/category/summit/partners/light/cjb.png';
import mobile from '@/assets/category/summit/partners/light/mobile.png';
import mobile_dark from '@/assets/category/summit/partners/dark/mobile.png';
import zhaoshangyinhang from '@/assets/category/summit/partners/light/zhaoshangyinhang.png';
import zhaoshangyinhang_dark from '@/assets/category/summit/partners/dark/zhaoshangyinhang.png';
import SuperMap from '@/assets/category/summit/partners/light/SuperMap.png';
import SuperMap_dark from '@/assets/category/summit/partners/dark/SuperMap.png';
import ceprei from '@/assets/category/summit/partners/light/ceprei.png';
import ceprei_dark from '@/assets/category/summit/partners/dark/ceprei.png';
import xyyh from '@/assets/category/summit/partners/light/xyyh.png';
import xyyh_dark from '@/assets/category/summit/partners/dark/xyyh.png';
import cnooc from '@/assets/category/summit/partners/light/cnooc.png';
import cnooc_dark from '@/assets/category/summit/partners/dark/cnooc.png';
import tjdx from '@/assets/category/summit/partners/light/tjdx.png';
import tjdx_dark from '@/assets/category/summit/partners/dark/tjdx.png';
import cjb_dark from '@/assets/category/summit/partners/dark/cjb.png';
import gbase_dark from '@/assets/category/summit/partners/dark/gbase.png';
import shenzhou_dark from '@/assets/category/summit/partners/dark/shenzhou.png';
import enmotech_dark from '@/assets/category/summit/partners/dark/enmotech.png';
import vastdata_dark from '@/assets/category/summit/partners/dark/vastdata.png';
import opengauss_dark from '@/assets/category/summit/partners/dark/opengauss.png';
import ccf_dark from '@/assets/category/summit/partners/dark/ccf.png';
import csia_dark from '@/assets/category/summit/partners/dark/csia.png';

const summitData = {
  detail: [
    'openGauss Summit 2022是由openGauss开源数据库社区联合行业组织，伙伴及客户共同举办的年度数据库产业界交流与分享峰会。openGauss作为面向企业核心应用场景的开源数据库，开源两年来，与产业界聚力创新，携手前行。在技术、商业、生态、社区和人才方面取得了令人瞩目的成绩。从数据出发为企业数字化转型提供了强大的动能。',
    '本次峰会将邀请学术专家、行业组织、企业客户、生态伙伴和社区贡献者齐聚openGauss峰会，探讨数据库创新发展新路径、交流数据生态建设的新思维、分享企业数字化转型的新成果，共同加速推动开源数据库产业向前发展。',
  ],
  contentList: [
    {
      name: '展示征集',
      nameEn: 'DEMO',
      img: demoPng,
      link: 'https://shimo.im/forms/Clt43Er77rkQMPUX/fill',
    },
    {
      name: 'KN演讲者征集',
      nameEn: 'KN SPEAKER',
      img: speakerPng,
      link: 'https://shimo.im/forms/PP1S4qJ3YcguslYv/fill',
    },
    {
      name: '分论坛征集',
      nameEn: 'SESSION ORGANIZER',
      img: organizerPng,
      link: 'https://shimo.im/forms/hz1hXko4jW8CeSHK/fill',
    },
  ],
  previous: {
    title: '精彩回顾',
    list: [
      {
        name: 'openGauss Developer Day 2022',
        link: '/zh/summit/devday2022/',
        target: '_blank',
      },
      {
        name: 'openGauss Summit 2021',
        link: '/zh/summit/summit2021/',
        target: '_blank',
      },
    ],
  },
  liver: {
    title: '峰会直播',
    liveData: [
      {
        liveId: 12292,
        liveTestId: 12285,
        id: 0,
        name: 'openGauss Summit 2022 主论坛',
      },
      {
        liveId: 12259,
        liveTestId: 12262,
        id: 1,
        name: '云和恩墨',
      },
      {
        liveId: 12269,
        liveTestId: 12277,
        id: 2,
        name: '海量数据',
      },
      {
        liveId: 12270,
        liveTestId: 12278,
        id: 3,
        name: 'GBASE南大通用',
      },
    ],
  },
  agenda: {
    title: '会议日程',
    meetingList: [
      {
        daytime: '12月29日 openGauss Summit 2022',
        list: [
          {
            type: '上午：主论坛',
            id: 'main',
            children: [
              {
                time: '09:30 - 09:35',
                desc: '院士致辞',
              },
              {
                time: '09:35 - 09:45',
                desc: 'openGauss社区进展主题演讲',
              },
              {
                time: '09:45 - 09:50',
                desc: 'openGauss社区理事会升级仪式',
              },
              {
                time: '09:50 - 10:10',
                desc: 'openGauss技术创新主题演讲',
              },
              {
                time: '10:10 - 10:25',
                desc: '中国移动创新实践及成果发布仪式',
              },
              {
                time: '10:25 - 10:45',
                desc: '产学研联合创新、openGauss创新孵化成果分享',
              },
              {
                time: '10:45 - 11:25',
                desc: '伙伴与用户应用实践联合演讲',
              },
              {
                time: '11:25 - 11:30',
                desc: 'openGauss社区活动发布仪式',
              },
            ],
          },
          {
            type: '下午：分论坛',
            id: 'other',
            duration: '14:00 - 17:00',
            children: [
              {
                id: 0,
                name: '云和恩墨',
                desc: 'openEuler Summit 2022',
                children: [
                  {
                    time: '14:00 - 14:05',
                    desc: '领导致辞',
                    name: '江大勇',
                    post: 'openGauss社区理事会理事长',
                  },
                  {
                    time: '14:05 - 14:10',
                    desc: '领导致辞',
                    option: [
                      {
                        name: '盖国强',
                        post: [
                          '云和恩墨创始人兼总经理',
                          '中国DBA联盟理事长，鲲鹏MVP',
                        ],
                      },
                    ],
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '重磅更新 -- MogDB v3.1依托自主根社区的技术创新',
                    name: '张皖川',
                    post: '云和恩墨数据库产品事业部总经理',
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: '华宝基金openGauss（MogDB）实践之路',
                    name: '毛绵长',
                    post: '华宝基金管理有限公司资深架构师',
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: 'openGauss/MogDB助力制药行业系统发展',
                    name: '左叶锋',
                    post: '上海雷昶研发二部总监',
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: '中间件与数据库生态融合的最佳实践分享',
                    name: '曾鹏冰',
                    post: '东方通技术咨询部总监',
                  },
                  {
                    time: '15:30 - 15:50',
                    desc: 'Uqbar 超融合时序数据库 -- 面向物联网的一站式数据处理平台',
                    name: '张程伟',
                    post: '云和恩墨数据库产品CTO',
                  },
                  {
                    time: '15:50 - 16:30',
                    desc: '万象更新，中国数据库时代的机遇与挑战',
                    name: '张乐奕主持，',
                    post: '李国良、张皖川、董立国、左叶锋、曾鹏冰参与线上圆桌讨论',
                  },
                ],
              },
              {
                id: 1,
                name: '海量数据',
                desc: 'openEuler Summit 2022',
                children: [
                  {
                    time: '14:00 - 14:10',
                    desc: '致辞',
                    option: [
                      {
                        name: '陈超',
                        post: ['鲲鹏计算业务副总裁', '鲲鹏生态发展部部长'],
                      },
                    ],
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '聚沙成塔，合力创新--Vastbase携手伙伴，助力行业用户应用升级',
                    name: '肖枫',
                    post: '北京海量数据技术股份有限公司总裁',
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: '打造数据库中坚力量，共创基础软件新篇章--中国基础软件市场研究分析',
                    name: '高丹',
                    post: '赛迪顾问股份有限公司业务总监',
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: '粤海资本金融业务应用创新——多元业务平台体系化升级实战分享',
                    name: '邓锦波',
                    post: '广东粤海资本集团有限公司信息技术部负责人',
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: '夯实基座，面向关键业务场景技术升级--Vastbase新版本特性解析',
                    name: '白玥',
                    post: '北京海量数据技术股份有限公司解决方案总监',
                  },
                  {
                    time: '15:30 - 15:50',
                    desc: '数智创新 安全可信--用友U8 cloud+海量数据库解决方案',
                    option: [
                      {
                        name: '纪录',
                        post: [
                          '用友网络科技股份有限公司助理总裁',
                          'U8cloud事业部总经理',
                        ],
                      },
                    ],
                  },
                  {
                    time: '15:50 - 16:10',
                    desc: '泛微基于海量关系型数据库的协同办公平台解决方案',
                    option: [
                      {
                        name: '王谏',
                        post: [
                          '上海泛微网络科技股份有限公司',
                          '北京信创事业部总经理',
                        ],
                      },
                    ],
                  },
                  {
                    time: '16:10 - 16:30',
                    desc: '强化生态合作，共赢数智未来——联合政务云解决方案分享',
                    name: '朱敏健',
                    post: '云宏信息科技股份有限公司总裁助理',
                  },
                ],
              },
              {
                id: 2,
                name: 'GBASE南大通用',
                desc: 'openEuler Summit 2022',
                children: [
                  {
                    time: '14:00 - 14:10',
                    desc: '开场致辞',
                    name: '胡正策',
                    post: 'openGauss社区秘书长',
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '与时俱进 一专多能——GBase 8c顺应分布式数据库发展趋势',
                    name: '王薇',
                    post: '南大通用GBase 8c产品部长',
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: '渤海银行核心系统分布式架构转型实践',
                    option: [
                      {
                        name: '王飞鹏',
                        post: [
                          '渤海银行信息科技部生产运行中心副主任',
                          '首席数据库专家',
                        ],
                      },
                    ],
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: '分布式数据库在金融行业的落地实践',
                    name: '荣玉鹏',
                    post: '同方软银平台研发部经理',
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: '分布式数据库核心技术及实践',
                    name: '李凯',
                    post: '南大通用GBase 8c产品总监',
                  },
                  {
                    time: '15:30 - 15:50',
                    desc: '信雅达数字化司库平台实践分享--拥抱分布式数据库，落地数字化经营管理战略',
                    name: '王斑',
                    post: '信雅达科技有限公司产品总监',
                  },
                  {
                    time: '15:50 - 16:10',
                    desc: '时代亿信商业秘密防护解决方案',
                    name: '沙勇',
                    post: '时代亿信方案中心总经理',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  partnersList: {
    title: ['共建单位', '指导单位', '主办单位', '协办单位'],
    p1: [
      {
        IMG: csia,
        DARK: csia_dark,
        NAME: '中国软件行业协会',
      },
      {
        IMG: ccf,
        DARK: ccf_dark,
        NAME: '数据库专业委员会',
      },
      {
        IMG: ceprei,
        DARK: ceprei_dark,
        NAME: '中国赛宝实验室',
      },
    ],
    p2: [
      {
        IMG: opengauss,
        DARK: opengauss_dark,
        NAME: 'opengauss',
      },
    ],
    p3: [
      {
        IMG: vastdata,
        DARK: vastdata_dark,
        NAME: 'vastdata',
      },
      {
        IMG: enmotech,
        DARK: enmotech_dark,
        NAME: 'enmotech',
      },
      {
        IMG: shenzhou,
        DARK: shenzhou_dark,
        NAME: 'shenzhou',
      },
      {
        IMG: gbase,
        DARK: gbase_dark,
        NAME: 'gbase',
      },
      {
        IMG: cjb,
        DARK: cjb_dark,
        NAME: 'cjb',
      },
      {
        IMG: mobile,
        DARK: mobile_dark,
        NAME: 'mobile',
      },
      {
        IMG: cnooc,
        DARK: cnooc_dark,
        NAME: 'cnooc',
      },
      {
        IMG: zhaoshangyinhang,
        DARK: zhaoshangyinhang_dark,
        NAME: 'zhaoshangyinhang',
      },
      // {
      //   IMG: xyyh,
      //   DARK: xyyh_dark,
      //   NAME: 'xyyh',
      // },
      {
        IMG: SuperMap,
        DARK: SuperMap_dark,
        NAME: 'SuperMap',
      },
      {
        IMG: tjdx,
        DARK: tjdx_dark,
        NAME: 'tjdx',
      },
    ],
  },
  other: [
    {
      name: '填写社区满意度有奖问卷，丰富大礼等您来拿！',
      cover: otherCover1,
      btn_text: '立即参与',
      path: '/zh/questionnaire/',
    },
    {
      name: '考openGauss认证，领京东卡激励',
      cover: otherCover2,
      btn_text: '立即报名',
      path: '/zh/events/2022-10-28/Meetup.html',
    },
  ],
};

export default summitData;
