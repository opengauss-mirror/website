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
                option: [
                  {
                    name: '郑纬民',
                    post: [
                      '中国工程院院士 ',
                      '清华大学计算机科学与技术系教授、博士生导师',
                    ],
                  },
                ],
              },
              {
                time: '09:35 - 09:45',
                desc: '汇聚数据库创新力量、加速企业数字化转型',
                name: '江大勇',
                post: 'openGauss社区理事长',
              },
              {
                time: '09:45 - 09:50',
                desc: 'openGauss社区理事会升级',
                option: [
                  {
                    name: ' ',
                    post: [
                      '中国交通信息科技集团有限公司',
                      '京东科技集团',
                      'GBASE南大通用',
                    ],
                  },
                ],
              },
              {
                time: '09:50 - 10:05',
                desc: '创新引领发展，合作共创繁荣',
                option: [
                  {
                    name: '李国良',
                    post: [
                      '清华大学计算机系长聘教授、副主任',
                      'openGauss社区技术委员会主席',
                      '中国计算机学会数据库专委会副主任',
                    ],
                  },
                ],
              },
              {
                time: '10:05 - 10:20',
                desc: '打造数智核心引擎，共筑自主创新未来 <br/> 中国移动磐维数据库发布',
                name: '陈国',
                post: '中国移动信息技术中心副总经理',
              },
              {
                time: '10:20 - 10:30',
                desc: '产研联合创新共建图数据库生态 <br/>首个基于openGauss的图数据库OggDB',
                option: [
                  {
                    name: '王鑫',
                    post: [
                      '天津大学智能与计算学部教授',
                      '天津泰凡科技有限公司首席科学家',
                    ],
                  },
                ],
              },
              {
                time: '10:30 - 10:40',
                desc: 'openGauss在医疗卫生行业的创新实践<br/>南京市远程影像中心数据库替换',
                name: '陈平',
                post: '南京市卫生信息中心副主任',
              },
              {
                time: '10:40 - 10:50',
                desc: '携手海量数据，共赴openGauss新征程<br/>桂林银行数据库创新实践',
                option: [
                  {
                    name: '肖枫 <br/> 王嘉懿',
                    post: [
                      '北京海量数据技术股份有限公司总裁',
                      '桂林银行信息技术部副总经理',
                    ],
                  },
                ],
              },
              {
                time: '10:50 - 11:00',
                desc: '稳中求进<br/>哈尔滨银行基础架构自主创新转型的探索与实践',
                option: [
                  {
                    name: '张乐奕<br/>董立国',
                    post: [
                      '云和恩墨联合创始人兼副总经理 资深数据库架构师',
                      '哈尔滨银行运维专家条线主管',
                    ],
                  },
                ],
              },
              {
                time: '11:00 - 11:10',
                desc: '神舟通用数据库在陕西电信智慧中台DataT中的应用实践',
                option: [
                  {
                    name: '张御博<br/>唐天宇',
                    post: [
                      '神舟通用售前总监',
                      '陕西电信 电信智慧中台DataT团队负责人',
                    ],
                  },
                ],
              },
              {
                time: '11:10 - 11:20',
                desc: '中国数据库行业发展趋势分析',
                name: '张志强',
                post: '工信部电子五所信创团队质量测评部部长',
              },
              {
                time: '11:20 - 11:25',
                desc: 'openEuler & openGauss人才发展加速计划2022年度颁奖',
                name: '',
                post: '',
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
                    desc: '泛微基于海量关系型数据库的创新协同办公平台解决方案',
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
  videolist: [
    {
      name: 'openGauss开源数据库整体介绍',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E4%B8%80%E3%80%81%E6%95%B4%E4%BD%93%E4%BB%8B%E7%BB%8D/01-openGauss%E5%BC%80%E6%BA%90%E6%95%B0%E6%8D%AE%E5%BA%93%E6%95%B4%E4%BD%93%E4%BB%8B%E7%BB%8D.mp4',
    },
    {
      name: 'openGauss开源社区',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E4%B8%89%E3%80%81openGauss%20%E5%BC%80%E6%BA%90%E7%A4%BE%E5%8C%BA/07-openGauss%E5%BC%80%E6%BA%90%E7%A4%BE%E5%8C%BA.mp4',
    },
    {
      name: 'openGauss DataKit在线调试存储过程',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E4%BA%8C%E3%80%81%E5%88%9B%E6%96%B0%E6%8A%80%E6%9C%AF/02-%E5%88%9B%E6%96%B0%E6%8A%80%E6%9C%AF-openGauss%20DataKit%E5%9C%A8%E7%BA%BF%E8%B0%83%E8%AF%95%E5%AD%98%E5%82%A8%E8%BF%87%E7%A8%8B.mp4',
    },
    {
      name: 'openGauss DataKit智能运维',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E4%BA%8C%E3%80%81%E5%88%9B%E6%96%B0%E6%8A%80%E6%9C%AF/03-%E5%88%9B%E6%96%B0%E6%8A%80%E6%9C%AF-openGauss%20DataKit%E6%99%BA%E8%83%BD%E8%BF%90%E7%BB%B4.mp4',
    },
    {
      name: 'openGauss分布式一键式部署',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E4%BA%8C%E3%80%81%E5%88%9B%E6%96%B0%E6%8A%80%E6%9C%AF/04-%E5%88%9B%E6%96%B0%E6%8A%80%E6%9C%AF-openGauss%E5%88%86%E5%B8%83%E5%BC%8F%E4%B8%80%E9%94%AE%E5%BC%8F%E9%83%A8%E7%BD%B2.mp4',
    },
    {
      name: 'openGauss迁移工具链一键式部署',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E4%BA%8C%E3%80%81%E5%88%9B%E6%96%B0%E6%8A%80%E6%9C%AF/05-%E5%88%9B%E6%96%B0%E6%8A%80%E6%9C%AF-openGauss%E8%BF%81%E7%A7%BB%E5%B7%A5%E5%85%B7%E9%93%BE%E4%B8%80%E9%94%AE%E5%BC%8F%E9%83%A8%E7%BD%B2.mp4',
    },
    {
      name: 'openGauss应用无缝切换使用',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E4%BA%8C%E3%80%81%E5%88%9B%E6%96%B0%E6%8A%80%E6%9C%AF/06-%E5%88%9B%E6%96%B0%E6%8A%80%E6%9C%AF-openGauss%E5%BA%94%E7%94%A8%E6%97%A0%E7%BC%9D%E5%88%87%E6%8D%A2%E4%BD%BF%E7%94%A8.mp4',
    },
    {
      name: 'Vastbase G100全生命周期的数据安全保障 - 海量数据',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E6%B5%B7%E9%87%8F%E6%95%B0%E6%8D%AE/08-%E6%B5%B7%E9%87%8F%E6%95%B0%E6%8D%AE-Vastbase%20G100%E5%85%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%9A%84%E6%95%B0%E6%8D%AE%E5%AE%89%E5%85%A8%E4%BF%9D%E9%9A%9C.mp4',
    },
    {
      name: 'Vastbase G100基于空间技术的企业级特性增强 - 海量数据',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E6%B5%B7%E9%87%8F%E6%95%B0%E6%8D%AE/09-%E6%B5%B7%E9%87%8F%E6%95%B0%E6%8D%AE-Vastbase%20G100%E5%9F%BA%E4%BA%8E%E7%A9%BA%E9%97%B4%E6%8A%80%E6%9C%AF%E7%9A%84%E4%BC%81%E4%B8%9A%E7%BA%A7%E7%89%B9%E6%80%A7%E5%A2%9E%E5%BC%BA.mp4',
    },
    {
      name: 'Vastbase G100便捷、高效的异构数据库一键式迁移平台 - 海量数据',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E6%B5%B7%E9%87%8F%E6%95%B0%E6%8D%AE/10-%E6%B5%B7%E9%87%8F%E6%95%B0%E6%8D%AE-Vastbase%20G100%E4%BE%BF%E6%8D%B7%E3%80%81%E9%AB%98%E6%95%88%E7%9A%84%E5%BC%82%E6%9E%84%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%80%E9%94%AE%E5%BC%8F%E8%BF%81%E7%A7%BB%E5%B9%B3%E5%8F%B0.mp4',
    },
    {
      name: 'Vastbase G100创新补丁机制，升级产品体验 - 海量数据',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E6%B5%B7%E9%87%8F%E6%95%B0%E6%8D%AE/11-%E6%B5%B7%E9%87%8F%E6%95%B0%E6%8D%AE-Vastbase%20G100%E5%88%9B%E6%96%B0%E8%A1%A5%E4%B8%81%E6%9C%BA%E5%88%B6%EF%BC%8C%E5%8D%87%E7%BA%A7%E4%BA%A7%E5%93%81%E4%BD%93%E9%AA%8C.mp4',
    },
    {
      name: 'MogDB数据库查询性能优化增强 - 云和恩墨',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E4%BA%91%E5%92%8C%E6%81%A9%E5%A2%A8/12-%E4%BA%91%E5%92%8C%E6%81%A9%E5%A2%A8-MogDB%E6%95%B0%E6%8D%AE%E5%BA%93%E6%9F%A5%E8%AF%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E5%A2%9E%E5%BC%BA.mp4',
    },
    {
      name: 'Trace工具增强MogDB不停库诊断与调优 - 云和恩墨',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E4%BA%91%E5%92%8C%E6%81%A9%E5%A2%A8/13-%E4%BA%91%E5%92%8C%E6%81%A9%E5%A2%A8-Trace%E5%B7%A5%E5%85%B7%E5%A2%9E%E5%BC%BAMogDB%E4%B8%8D%E5%81%9C%E5%BA%93%E8%AF%8A%E6%96%AD%E4%B8%8E%E8%B0%83%E4%BC%98.mp4',
    },
    {
      name: 'MogDB中CM支持低成本两节点部署 - 云和恩墨',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E4%BA%91%E5%92%8C%E6%81%A9%E5%A2%A8/14-%E4%BA%91%E5%92%8C%E6%81%A9%E5%A2%A8-MogDB%E4%B8%ADCM%E6%94%AF%E6%8C%81%E4%BD%8E%E6%88%90%E6%9C%AC%E4%B8%A4%E8%8A%82%E7%82%B9%E9%83%A8%E7%BD%B2.mp4',
    },
    {
      name: 'GBase 8c在线升级功能- 南大通用',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E5%8D%97%E5%A4%A7%E9%80%9A%E7%94%A8/15-%E5%8D%97%E5%A4%A7%E9%80%9A%E7%94%A8-GBase%208c%E5%9C%A8%E7%BA%BF%E5%8D%87%E7%BA%A7%E5%8A%9F%E8%83%BD.mp4',
    },
    {
      name: 'GBase 8c在线弹性伸缩功能 - 南大通用',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E5%8D%97%E5%A4%A7%E9%80%9A%E7%94%A8/16-%E5%8D%97%E5%A4%A7%E9%80%9A%E7%94%A8-GBase%208c%E5%9C%A8%E7%BA%BF%E5%BC%B9%E6%80%A7%E4%BC%B8%E7%BC%A9%E5%8A%9F%E8%83%BD.mp4',
    },
    {
      name: 'DockQuery新一代数据库客户端，全覆国内主流数据库 - 图尔兹 ',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E5%9B%BE%E5%B0%94%E5%85%B9/17-%E5%9B%BE%E5%B0%94%E5%85%B9-DockQuery%E6%96%B0%E4%B8%80%E4%BB%A3%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AE%A2%E6%88%B7%E7%AB%AF%EF%BC%8C%E5%85%A8%E8%A6%86%E5%9B%BD%E5%86%85%E4%B8%BB%E6%B5%81%E6%95%B0%E6%8D%AE%E5%BA%93.mp4',
    },
    {
      name: 'CloudQuery智能化运维之安全管控，打造企业统一数据安全入口 - 图尔兹 ',
      link: 'https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/%E5%9B%9B%E3%80%81DBV%E5%8E%82%E5%95%86/%E5%9B%BE%E5%B0%94%E5%85%B9/18-%E5%9B%BE%E5%B0%94%E5%85%B9-CloudQuery%E6%99%BA%E8%83%BD%E5%8C%96%E8%BF%90%E7%BB%B4%E4%B9%8B%E5%AE%89%E5%85%A8%E7%AE%A1%E6%8E%A7%EF%BC%8C%E6%89%93%E9%80%A0%E4%BC%81%E4%B8%9A%E7%BB%9F%E4%B8%80%E6%95%B0%E6%8D%AE%E5%AE%89%E5%85%A8%E5%85%A5%E5%8F%A3.mp4',
    },
  ],
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
