import lihuaizhan from '@/assets/category/summit/guests/lihuaizhan.png';
import jiangdayong from '@/assets/category/member/avatar/jiangdayong.png';
import huzhengce from '@/assets/category/summit/guests/huzhengce.png';
import liguoliang from '@/assets/category/summit/guests/liguoliang.png';
import huangkaiyao from '@/assets/category/summit/guests/huangkaiyao.png';
import hejiajia from '@/assets/category/summit/guests/hejiajia.png';
import zhangjianrong from '@/assets/category/summit/guests/zhangjianrong.png';
import yuanchunguang from '@/assets/category/summit/guests/yuanchunguang.png';
import zhangliang from '@/assets/category/summit/guests/zhangliang.png';
import zhouqin from '@/assets/category/summit/guests/zhouqin.png';
import wangzhengwei from '@/assets/category/summit/guests/wangzhengwei.png';
import huangxiaotao from '@/assets/category/summit/guests/huangxiaotao.png';
import douzhitong from '@/assets/category/summit/guests/douzhitong.png';
import wandan from '@/assets/category/summit/guests/wandan.png';

import wuxingxiong from '@/assets/category/summit/guests/wuxingxiong.png';
import zhangwanchuan from '@/assets/category/summit/guests/zhangwanchuan.png';
import chenhao from '@/assets/category/summit/guests/chenhao.png';
import luolaquan from '@/assets/category/summit/guests/luolaquan.png';
import liuzheli from '@/assets/category/summit/guests/liuzheli.png';
import wangchunlin from '@/assets/category/summit/guests/wangchunlin.png';
import yanghao from '@/assets/category/summit/guests/yanghao.png';
import zhangquan from '@/assets/category/summit/guests/zhangquan.png';
import lilijun from '@/assets/category/summit/guests/lilijun.png';
import zengpengbing from '@/assets/category/summit/guests/zengpengbing.png';
import guyunshu from '@/assets/category/summit/guests/guyunshu.png';
import xuzhan from '@/assets/category/summit/guests/xuzhan.png';
import licong from '@/assets/category/summit/guests/licong.png';
import wuweijie from '@/assets/category/summit/guests/wuweijie.png';
import zhangyong from '@/assets/category/summit/guests/zhangyong.png';
import liwenjie from '@/assets/category/summit/guests/liwenjie.png';
import lichao from '@/assets/category/summit/guests/lichao.png';
import luohaixiong from '@/assets/category/summit/guests/luohaixiong.png';

import ccf from '@/assets/category/summit/partners/ccf.png';
import opengauss from '@/assets/category/summit/partners/opengauss.png';
import vastdata from '@/assets/category/summit/partners/vastdata.png';
import enmotech from '@/assets/category/summit/partners/enmotech.png';
import dft from '@/assets/category/summit/partners/dft.png';
import qhdx from '@/assets/category/summit/partners/qhdx.png';

import mobile from '@/assets/category/summit/partners/mobile.png';
import unicom from '@/assets/category/summit/partners/unicom.png';
import SuperMap from '@/assets/category/summit/partners/SuperMap.png';
import shenzhou from '@/assets/category/summit/partners/shenzhou.png';
import gbase from '@/assets/category/summit/partners/gbase.png';
import cjb from '@/assets/category/summit/partners/cjb.png';
import tyt from '@/assets/category/summit/partners/tyt.png';
import SphereEx from '@/assets/category/summit/partners/SphereEx.png';
import bld from '@/assets/category/summit/partners/bld.png';
import puyuan from '@/assets/category/summit/partners/puyuan.png';
import jindie from '@/assets/category/summit/partners/jindie.png';
import beijingkunpeng from '@/assets/category/summit/partners/beijingkunpeng.png';
import gansukunpeng from '@/assets/category/summit/partners/gansukunpeng.png';
import henankunpeng from '@/assets/category/summit/partners/henankunpeng.png';
import xugu from '@/assets/category/summit/partners/xugu.png';

const videoData = {
  page_name: '峰会',
  desc: [
    'openGauss Developer Day 2022是openGauss社区发起并举办的数据库开发者年度盛会。openGauss社区开源2年来，已在技术、生态、商业和社区治理等方面发展显著。为践行openGauss社区共建、共享、共治的理念，打造中国最具创新力的开源数据库根社区，大会诚邀学术专家，行业用户，合作伙伴，开发者共同探讨数据库面向多场景的技术创新，分享基于openGauss的行业联合创新成果及商业实践，献计社区治理完善，讨论社区版本规划。',
    'openGauss诚邀开发者齐参与，同贡献，释放开源数据库创新力量。',
  ],
  titleBar: ['精彩回顾', '会议日程', '演讲嘉宾', '共建单位', '精彩回顾'],
  nameEn: 'TNAMEd livestreaming series',
  LIVEDATA: [
    {
      LIVEID: 11185,
      LIVETESTID: 11190,
      ID: 0,
      NAME: 'openGauss开发者大会主论坛',
    },
    {
      LIVEID: 11187,
      LIVETESTID: 11192,
      ID: 1,
      NAME: '数据库内核优化探秘',
    },
    {
      LIVEID: 11189,
      LIVETESTID: 11194,
      ID: 2,
      NAME: '数据库内核SQL Engine',
    },
    {
      LIVEID: 11186,
      LIVETESTID: 11191,
      ID: 3,
      NAME: '生态工具',
    },
    {
      LIVEID: 11188,
      LIVETESTID: 11193,
      ID: 4,
      NAME: '多模态',
    },
  ],

  offline: {
    daytime: '7月14日（线下）',
    list: [
      {
        time: '13:30 - 15:30',
        option: [
          '技术委员会工作会议',
          '用户委员会工作会议',
          '品牌宣传委员会工作会议',
        ],
      },
      {
        time: '15:30 - 17:30',
        option: ['理事会闭门会议'],
      },
    ],
  },
  online: {
    daytime: '7月15日 （线下 + 直播）',
    list: [
      {
        type: '主论坛',
        id: 'main',
        time: '上午',
        children: [
          {
            time: '09:30 - 09:35',
            desc: '中国计算机学会数据库专家致辞',
            name: '李战怀',
            post: '中国计算机学会数据库专委会主任',
          },
          {
            time: '09:35 - 09:50',
            desc: '创未来 享非凡，共建开源数据库根社区',
            name: '江大勇',
            post: 'openGauss社区理事会理事长',
          },
          {
            time: '09:50 - 09:55',
            desc: 'openGauss商业发行版发布仪式',
            option: [],
          },
          {
            time: '09:55 - 10:25',
            desc: '联合演讲：聚焦内核创新，持续架构优化，共建开放生态',
            option: [
              {
                name: '李国良',
                post: ['openGauss社区技术委员会主席', '清华大学教授'],
              },
              {
                name: '黄凯耀',
                post: [
                  'openGauss社区技术委员会委员',
                  'openGauss开源数据库首席架构师',
                ],
              },
            ],
          },
          {
            time: '10:25 - 10:40',
            desc: '邮储银行个人新核心云原生创新实践分享',
            name: '何佳佳',
            post: '中国邮政储蓄银行 金融科技创新部主任工程师',
          },
          {
            time: '10:40 - 10:55',
            desc: '携手openGauss，共筑联通领先数据基础设施',
            name: '张建荣',
            post: '联通数字科技有限公司高级副总裁',
          },
          {
            time: '10:55 - 11:10',
            desc: '民生银行基于openGauss的云原生应用创新与实践',
            name: '袁春光',
            post: '民生银行信息科技部系统管理中心处长',
          },
          {
            time: '11:10 - 11:25',
            desc: 'openGauss x ShardingSphere 分布式解决方案',
            option: [
              {
                name: '张亮',
                post: ['SphereEx CEO &', 'Apache ShardingSphere PMC Chair'],
              },
            ],
          },
          {
            time: '11:25 - 11:40',
            desc: 'Yukon（禹贡）：基于openGauss的二三维一体化空间数据库',
            name: '周芹',
            post: '超图研究院内核研发中心 产品总监',
          },
          {
            time: '11:40 - 11:45',
            desc: 'openGauss开源2周年：见证开发者荣耀时刻',
            name: '',
            post: '',
          },
        ],
      },
      {
        type: '分论坛',
        id: 'other',
        time: '下午',
        children: [
          {
            id: 0,
            name: '数据库内核优化探秘',
            desc: '北京海量数据技术股份有限公司',
            children: [
              {
                time: '13:30 - 13:40',
                desc: '开场致辞',
                name: '王振伟',
                post: '海量数据联席总裁',
              },
              {
                time: '13:40 - 14:05',
                desc: '批量性能突破 - PL/pgSQL引擎优化',
                name: '黄晓涛',
                post: '海量数据研究院副院长',
              },
              {
                time: '14:05 - 14:30',
                desc: '运行体验优化 - 分区索引联机重建',
                name: '窦志彤',
                post: '海量数据北京研究所所长',
              },
              {
                time: '14:30 - 14:50',
                desc: '科学计算·决策赋能——新一代智慧城市探索',
                name: '万丹',
                post: '北京大学城市规划与设计学院博士',
              },
              {
                time: '14:50 - 15:10',
                desc: '安全防护加固 - Stride威胁建模应用探索',
                name: '吴兴雄',
                post: '海量数据高级工程师',
              },
            ],
          },
          {
            id: 1,
            name: '数据库内核SQL Engine',
            desc: '云和恩墨（北京）信息技术有限公司',
            children: [
              {
                time: '13:30 - 13:35',
                desc: '出品人致辞 ',
                name: '张皖川',
                post: '云和恩墨数据库内核研发团队负责人',
              },
              {
                time: '13:35 - 13:55',
                desc: 'openGauss SQL引擎的演进方向',
                option: [
                  {
                    name: '陈浩',
                    post: [
                      '华为高斯实验室SQL引擎技术专家',
                      'openGauss Maintainer、Apache Doris PMC',
                    ],
                  },
                ],
              },
              {
                time: '13:55 - 14:15',
                desc: '分而治之，MogDB分区优化之动态分区裁剪',
                name: '罗拉全',
                post: '云和恩墨数据库内核研发工程师',
              },
              {
                time: '14:15 - 14:35',
                desc: '实用型保留顺序加密研究进展',
                option: [
                  {
                    name: '刘哲理',
                    post: [
                      '南开大学计算机学院副院长、网络空间安全学院副院长',
                      '中国中文信息学会大数据安全与隐私计算专委会秘书长',
                    ],
                  },
                ],
              },
              {
                time: '14:35 - 14:55',
                desc: 'MogDB中自治异步事务提交的设计与实现',
                name: '王春玲',
                post: '云和恩墨数据库内核研发工程师',
              },
              {
                time: '14:55 - 15:15',
                desc: '见微知著，MogDB SQL运行观测之算子采样',
                name: '杨浩',
                post: '云和恩墨数据库内核研发工程师',
              },
              {
                time: '15:15 - 15:25',
                desc: 'openGauss企业服务支持发布',
                option: [],
              },
            ],
          },
          {
            id: 2,
            name: '生态工具',
            desc: '北京东方通科技股份有限公司',
            children: [
              {
                time: '13:30 - 13:35',
                desc: '主持人开场 ',
                name: '张荃',
                post: '北京东方通软件有限公司生态发展部总经理',
              },
              {
                time: '13:35 - 13:40',
                desc: '领导致辞',
                option: [
                  {
                    name: '李利军',
                    post: [
                      '北京东方通科技股份有限公司集团执行副总裁 兼',
                      '北京东方通软件有限公司总经理',
                    ],
                  },
                ],
              },
              {
                time: '13:40 - 14:00',
                desc: '中间件丰富openGauss生态',
                name: '曾鹏冰',
                post: '北京东方通软件有限公司资深技术咨询总监',
              },
              {
                time: '14:00 - 14:20',
                desc: '神通高斯数据库生态实践',

                name: '顾云苏',
                post: '神舟通用总裁',
              },
              {
                time: '14:20 - 14:40',
                desc: 'openGauss数据库的可观测性',
                option: [
                  {
                    name: '徐戟（白鳝）',
                    post: [
                      '南京基石数据技术有限责任公司',
                      '深圳鲲鹏产业联盟高级顾问',
                    ],
                  },
                ],
              },
              {
                time: '14:40 - 15:00',
                desc: '全生命周期的异构数据迁移管理',
                name: '李聪',
                post: '云和恩墨战略客户架构部总经理',
              },
              {
                time: '15:00 - 15:20',
                desc: 'Apache ShardingSphere 与 openGauss 联合打造国产高性能分布式数据库方案',
                option: [
                  {
                    name: '吴伟杰',
                    post: [
                      'Apache ShardingSphere PMC',
                      'SphereEx 基础设施研发工程师 ',
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: '多模态',
            desc: '清华大学',
            children: [
              {
                time: '13:30 - 13:40',
                desc: '出品人开场 ',
                option: [
                  {
                    name: '张勇',
                    post: ['清华大学副研究员', '可信软件与大数据研究部'],
                  },
                ],
              },
              {
                time: '13:40 - 14:00',
                desc: '面向海量知识图谱的高性能图数据库系统gStore',
                name: '李文杰',
                post: '北京大学博士后',
              },
              {
                time: '14:00 - 14:20',
                desc: '时序数据生成与时序数据库测试',
                name: '李超',
                post: '清华大学信息国家研究中心副研究员',
              },
              {
                time: '14:20-14:40',
                desc: 'MogDB列存案例分享',
                name: '罗海雄',
                post: '云和恩墨数据库资深技术专家',
              },
            ],
          },
        ],
      },
      {
        type: 'SIG会议',
        id: 'sig',
        time: '下午',
        name: 'SIG组版本规划工作会议',
        desc: 'SIG组工作会议参会指南',
        time1: '16:00 - 18:00',
        path: 'https://gitee.com/opengauss/community/blob/master/contributors/sig-planning-meeting-guide.md',
        children: [
          {
            name: 'AI',
            desc: '负责openGauss社区AI的开发和维护。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-AI',
          },
          {
            name: 'Certification',
            desc: '负责openGauss认证流程、测试套件的定义和开发。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-Certification',
          },
          {
            name: 'CloudNative',
            desc: '负责openGauss社区云原生方向的开发和维护。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-CloudNative',
          },
          {
            name: 'Docs',
            desc: '负责openGauss社区文档的开发和维护。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-StorageEDocsngine',
          },
          {
            name: 'Infra',
            desc: '负责openGauss社区基础设施的开发和维护。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-Infra',
          },
          {
            name: 'OPS',
            desc: '聚焦openGauss维护能力建设，提升产品运维能力，总结和传递运维经验。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-OPS',
          },
          {
            name: 'Plugin',
            desc: '负责openGauss插件机制的规划、管理、开发等。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-Plugin',
          },
          {
            name: 'ReleaseManagement',
            desc: '社区协同各SIG maintainer,规划openGauss社区版本的发布工作，为最终的竞争力目标达成负责。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-ReleaseManagement',
          },
          {
            name: 'SecurityTechnology',
            desc: '负责openGauss社区数据库安全技术的开发和维护。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-SecurityTechnology',
          },
          {
            name: 'SQLEngine',
            desc: '负责openGauss社区SQL引擎的开发和维护。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-SQLEngine',
          },
          {
            name: 'StorageEngine',
            desc: '负责openGauss社区存储引擎的开发和维护。',
            link: 'https://etherpad.opengauss.org/p/2022ODD-sig-planning-StorageEngine',
          },
        ],
      },
    ],
  },
  LECTURER_LIST: [
    {
      IMG: lihuaizhan,
      NAME: '李战怀',
      POSITION: ['中国计算机学会', '数据库专委会主任'],
    },
    {
      IMG: jiangdayong,
      NAME: '江大勇',
      POSITION: ['openGauss社区理事会理事长'],
    },
    {
      IMG: huzhengce,
      NAME: '胡正策',
      POSITION: ['openGauss社区秘书长'],
    },
    {
      IMG: liguoliang,
      NAME: '李国良',
      POSITION: ['openGauss社区技术委员会主席', '清华大学教授'],
    },
    {
      IMG: huangkaiyao,
      NAME: '黄凯耀',
      POSITION: [
        'openGauss社区技术委员会委员',
        'openGauss开源数据库首席架构师',
      ],
    },
    {
      IMG: hejiajia,
      NAME: '何佳佳',
      POSITION: ['中国邮政储蓄银行', '金融科技创新部主任工程师'],
    },
    {
      IMG: zhangjianrong,
      NAME: '张建荣',
      POSITION: ['联通数字科技有限公司', '高级副总裁'],
    },
    {
      IMG: yuanchunguang,
      NAME: '袁春光',
      POSITION: ['民生银行', '信息科技部系统管理中心处长'],
    },
    {
      IMG: zhangliang,
      NAME: '张亮',
      POSITION: ['SphereEx CEO &', 'Apache ShardingSphere PMC Chair'],
    },
    {
      IMG: zhouqin,
      NAME: '周芹',
      POSITION: ['超图研究院内核研发中心', '产品总监'],
    },
    {
      IMG: wangzhengwei,
      NAME: '王振伟',
      POSITION: ['海量数据联席总裁'],
    },
    {
      IMG: huangxiaotao,
      NAME: '黄晓涛',
      POSITION: ['海量数据', '研究院副院长'],
    },
    {
      IMG: douzhitong,
      NAME: '窦志彤',
      POSITION: ['海量数据', '北京研究所所长'],
    },
    {
      IMG: wandan,
      NAME: '万丹',
      POSITION: ['北京大学', '城市规划与设计学院博士'],
    },
    {
      IMG: wuxingxiong,
      NAME: '吴兴雄',
      POSITION: ['海量数据', '高级工程师'],
    },
    {
      IMG: zhangwanchuan,
      NAME: '张皖川',
      POSITION: ['云和恩墨', '数据库内核研发团队负责人'],
    },
    {
      IMG: chenhao,
      NAME: '陈浩',
      POSITION: [
        '华为高斯实验室SQL引擎技术专家',
        'openGauss Maintainer Apache Doris PMC',
      ],
    },
    {
      IMG: luolaquan,
      NAME: '罗拉全',
      POSITION: ['云和恩墨', '数据库内核研发工程师'],
    },
    {
      IMG: liuzheli,
      NAME: '刘哲理',
      POSITION: [
        '南开大学计算机学院副院长 网络空间安全学院副院长',
        '中国中文信息学会大数据安全与隐私计算专委会秘书长',
      ],
    },
    {
      IMG: wangchunlin,
      NAME: '王春玲',
      POSITION: ['云和恩墨', '数据库内核研发工程师'],
    },
    {
      IMG: yanghao,
      NAME: '杨浩',
      POSITION: ['云和恩墨', '数据库内核研发工程师'],
    },
    {
      IMG: zhangquan,
      NAME: '张荃',
      POSITION: ['北京东方通软件有限公司', '生态发展部总经理'],
    },
    {
      IMG: lilijun,
      NAME: '李利军',
      POSITION: [
        '北京东方通科技股份有限公司集团执行副总裁',
        '北京东方通软件有限公司总经理',
      ],
    },
    {
      IMG: zengpengbing,
      NAME: '曾鹏冰',
      POSITION: ['北京东方通软件有限公司', '资深技术咨询总监'],
    },
    {
      IMG: guyunshu,
      NAME: '顾云苏',
      POSITION: ['神舟通用', '总裁'],
    },
    {
      IMG: xuzhan,
      NAME: '徐戟（白鳝）',
      POSITION: ['南京基石数据技术有限责任公司', '深圳鲲鹏产业联盟高级顾问'],
    },
    {
      IMG: licong,
      NAME: '李聪',
      POSITION: ['云和恩墨', '战略客户架构部总经理'],
    },
    {
      IMG: wuweijie,
      NAME: '吴伟杰',
      POSITION: ['Apache ShardingSphere PMC', 'SphereEx 基础设施研发工程师'],
    },
    {
      IMG: zhangyong,
      NAME: '张勇',
      POSITION: ['清华大学副研究员', '可信软件与大数据研究部'],
    },
    {
      IMG: liwenjie,
      NAME: '李文杰',
      POSITION: ['北京大学博士后'],
    },
    {
      IMG: lichao,
      NAME: '李超',
      POSITION: ['清华大学', '信息国家研究中心副研究员'],
    },
    {
      IMG: luohaixiong,
      NAME: '罗海雄',
      POSITION: ['云和恩墨', '数据库资深技术专家'],
    },
  ],
  partnersList: {
    title: ['指导单位', '主办单位', '联合主办', '协办单位'],
    p1: [
      {
        IMG: ccf,
        DARK: ccf,
        NAME: '数据库专业委员会',
      },
    ],
    p2: [
      {
        IMG: opengauss,
        DARK: opengauss,
        NAME: 'opengauss',
      },
    ],
    p3: [
      {
        IMG: vastdata,
        DARK: vastdata,
        NAME: '海量数据',
      },
      {
        IMG: enmotech,
        DARK: enmotech,
        NAME: '云和恩墨',
      },
      {
        IMG: dft,
        DARK: dft,
        NAME: '东方通',
      },
      {
        IMG: qhdx,
        DARK: qhdx,
        NAME: '清华大学',
      },
    ],
    p4: [
      {
        IMG: mobile,
        DARK: mobile,
        NAME: '中国移动',
      },
      {
        IMG: unicom,
        DARK: unicom,
        NAME: '中国联通',
      },
      {
        IMG: SuperMap,
        DARK: SuperMap,
        NAME: 'SuperMap',
      },
      {
        IMG: shenzhou,
        DARK: shenzhou,
        NAME: '神舟通用',
      },
      {
        IMG: gbase,
        DARK: gbase,
        NAME: '天津南大通用数据技术股份有限公司',
      },
      {
        IMG: cjb,
        DARK: cjb,
        NAME: '超聚变',
      },
      {
        IMG: xugu,
        DARK: xugu,
        NAME: '虚谷伟业',
      },
      {
        IMG: tyt,
        DARK: tyt,
        NAME: '北京太阳塔信息科技有限责任公司',
      },
      {
        IMG: SphereEx,
        DARK: SphereEx,
        NAME: 'SphereEx',
      },
      {
        IMG: bld,
        DARK: bld,
        NAME: '宝兰德',
      },
      {
        IMG: puyuan,
        DARK: puyuan,
        NAME: '普元信息技术股份有限公司',
      },
      {
        IMG: jindie,
        DARK: jindie,
        NAME: '深圳市金蝶天燕云计算股份有限公司',
      },
      {
        IMG: beijingkunpeng,
        DARK: beijingkunpeng,
        NAME: '北京鲲鹏',
      },
      {
        IMG: gansukunpeng,
        DARK: gansukunpeng,
        NAME: '甘肃鲲鹏',
      },
      {
        IMG: henankunpeng,
        DARK: henankunpeng,
        NAME: '河南鲲鹏',
      },
    ],
  },
};

export default videoData;
