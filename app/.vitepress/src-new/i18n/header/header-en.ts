import { markRaw } from 'vue';

import IconOutLink from '~icons/app/icon-outlink.svg';
import odd from '~@/assets/category/header/odd.png';
import report from '~@/assets/category/header/report.png';

const OutLink = markRaw(IconOutLink);

const TAG_TYPE = {
  HOT: 'HOT',
  NEW: 'NEW',
};

export default {
  NAV_ROUTER: [
    {
      NAME: '下载',
      ID: 'download',
      CHILDREN: [
        {
          NAME: '获取openGauss',
          CHILDREN: [
            {
              NAME: 'openGauss 6.0.2(LTS)',
              DESCRIPTION: 'openGauss 6.0.2 LTS及后续LTS版本发布间隔周期为2年，社区提供三年支持，社区...',
              TAG: null,
              URL: '/download/#',
            },
            {
              NAME: 'openGauss 7.0.0-RC1',
              DESCRIPTION: '社区创新版本联创测试使用，发布间隔周期定位6个月，社区提供6个月维护支持',
              TAG: TAG_TYPE.NEW,
              URL: '/download/#',
            },
          ],
        },
        {
          NAME: '获取其他资源',
          CHILDREN: [
            {
              NAME: '工具中心',
              DESCRIPTION: '主要面向开发者和SV，提供六大类开发工具客户端工具、数据导入导出工具、数据...',
              URL: `${import.meta.env.VITE_SERVICE_SOFTWARE_URL}/zh`,
            },
          ],
        },
      ],
      SHORTCUT: [
        {
          NAME: '查询所有版本',
          URL: '/download?archive=true',
        },
        {
          NAME: '版本生命周期',
          URL: '/other/lifecycle/',
        },
        {
          NAME: 'openGauss 6.0.1版本安装指南',
          URL: '/other/lifecycle/',
        },
        {
          NAME: '技术白皮书',
          URL: '/other/lifecycle/',
        },
      ],
    },
    {
      NAME: '开发',
      ID: 'development',
      CHILDREN: [
        {
          NAME: '贡献',
          CHILDREN: [
            {
              NAME: 'SIG中心',
              DESCRIPTION: '查询openGauss社区SIG组',
              TAG: TAG_TYPE.NEW,
              URL: '/download/#',
            },
            {
              NAME: 'CLA签署',
              DESCRIPTION: '参与贡献前，需签署贡献者许可协议（CLA）',
              URL: '1',
              ICON: OutLink,
            },
            {
              NAME: '贡献攻略',
              DESCRIPTION: '参与社区贡献的方式',
              URL: '2',
            },
          ],
        },
      ],
      SHORTCUT: [
        {
          NAME: '开发者日历',
          URL: '/',
        },
      ],
    },
    {
      NAME: '文档',
      ID: 'document',
      CHILDREN: [
        {
          NAME: '文档中心',
          CHILDREN: [
            {
              NAME: '文档中心',
              DESCRIPTION: '提供各业务场景及工具使用所需的文档手册',
              TAG: TAG_TYPE.NEW,
              URL: '/download/#',
            },
            {
              NAME: '新手入门',
              DESCRIPTION: '10分钟玩转社区，快速构建与成长',
              URL: '/download/#',
            },
            {
              NAME: '安装指南',
              DESCRIPTION: '指导用户完成 openGauss 操作系统安装',
              URL: '/download/#',
            },
            {
              NAME: '常见问题',
              DESCRIPTION: '常见问题解决方法',
              URL: '/download/#',
            },
            {
              NAME: '应用开发指南',
              DESCRIPTION: '参与文档开发的方式',
              URL: '/download/#',
            },
          ],
        },
      ],
      SHORTCUT: [
        {
          NAME: '关于openGauss',
          URL: '/',
        },
        {
          NAME: 'DataVec向量数据库',
          URL: '/',
        },
        {
          NAME: 'openGauss DataVec + Dify，快速搭建你的智能...',
          URL: '/',
        },
        {
          NAME: '数据库管理指南',
          URL: '/',
        },
      ],
    },
    {
      NAME: '学习',
      ID: 'learn',
      CHILDREN: [
        {
          NAME: '课程中心',
          CHILDREN: [
            {
              NAME: '专题直播',
              DESCRIPTION: '众多大咖精彩课程直播',
              URL: '/download/#',
            },
            {
              NAME: '轻松上手',
              DESCRIPTION: '贯穿openGauss深度学习的基本流程，包括数据处理、模型加载与保存、图模式加速...',
              URL: '/download/#',
            },
            {
              NAME: '数据库基础',
              DESCRIPTION: '提供数据处理相关增强、缓存、pipeline等功能案例',
              URL: '/download/#',
            },
            {
              NAME: '线下活动',
              DESCRIPTION: '参与线下交流、学习讨论',
              URL: '/download/#',
            },
          ],
        },
        {
          NAME: '开发者成长',
          CHILDREN: [
            {
              NAME: '快速体验',
              DESCRIPTION: 'openGauss官方出品的迷你视频课程',
              URL: '/download/#',
            },
            {
              NAME: '学习进阶',
              DESCRIPTION: '开源基础软件学习培训',
              URL: '/download/#',
            },
            {
              NAME: '大咖之声',
              DESCRIPTION: '了解 openGauss 专家演讲',
              URL: '/download/#',
            },
            {
              NAME: '人才培养',
              DESCRIPTION: '欢迎学习HCIA-openGauss华为认证openGauss工程师在线课程',
              URL: '/download/#',
            },
          ],
        },
      ],
      SHORTCUT: [
        {
          NAME: '数据库介绍',
          URL: '/',
        },
        {
          NAME: '数据库基础知识',
          URL: '/',
        },
        {
          NAME: 'SQL语法入门、分类',
          URL: '/',
        },
        {
          NAME: 'openGauss联众创新：打造面向企业核心业务开...',
          URL: '/',
        },
      ],
    },
    {
      NAME: '支持',
      ID: 'approve',
      CHILDREN: [
        {
          NAME: '认证',
          CHILDREN: [
            {
              NAME: '发行版认证',
              DESCRIPTION: '查看OBV发行版认证结果',
              URL: '/download/#',
            },
            {
              NAME: '服务商认证',
              DESCRIPTION: '查看oGSP服务商认证流程与结果',
              URL: '/download/#',
            },
          ],
        },
        {
          NAME: '兼容性专区',
          CHILDREN: [
            {
              NAME: '兼容性列表',
              DESCRIPTION: '查看openGauss兼容性列表',
              URL: '/download/#',
            },
            {
              NAME: '兼容性技术测评',
              DESCRIPTION: '帮助企业快速申请兼容性测评',
              ICON: OutLink,
              URL: '/download/#',
            },
          ],
        },
        {
          NAME: '迁移',
          CHILDREN: [
            {
              NAME: '迁移专区',
              DESCRIPTION: '了解 openGauss 迁移方案，获取迁移技术支持',
              URL: '/download/#',
            },
          ],
        },
        {
          NAME: '安全公告',
          CHILDREN: [
            {
              NAME: '安全中心',
              DESCRIPTION: '查看社区 CVE，安全漏洞公示',
              URL: '/download/#',
            },
          ],
        },
      ],
      SHORTCUT: [
        {
          NAME: '漏洞管理',
          URL: '/',
        },
        {
          NAME: '迁移实践案例',
          URL: '/',
        },
        {
          NAME: '前往迁移互动专区',
          URL: '/',
        },
        {
          NAME: 'MySQL迁移',
          URL: '/',
        },
      ],
    },
    {
      NAME: '社区',
      ID: 'community',
      CHILDREN: [
        {
          NAME: '关于社区',
          CHILDREN: [
            {
              NAME: '贡献看板',
              DESCRIPTION: '查看openGauss社区数据',
              URL: '/download/#',
            },
            {
              NAME: '社区荣誉',
              DESCRIPTION: '了解openGauss的荣誉奖项',
              URL: '/download/#',
            },
            {
              NAME: '社区组织',
              DESCRIPTION: '了解openGauss的委员会成员',
              URL: '/download/#',
            },
            {
              NAME: '用户案例',
              DESCRIPTION: '了解openGauss在各行业的最佳案例',
              URL: '/download/#',
            },
            {
              NAME: '金融专区',
              DESCRIPTION: '基于openGauss的金融解决方案',
              URL: '/download/#',
            },
          ],
        },
        {
          NAME: '社区交流',
          CHILDREN: [
            {
              NAME: '社区论坛',
              DESCRIPTION: '参与开发者讨论openGauss',
              URL: '/download/#',
            },
            {
              NAME: '邮件列表',
              DESCRIPTION: '订阅邮件列表，与SIG成员讨论openGauss的技术与进展',
              URL: '/download/#',
            },
          ],
        },
      ],
      SHORTCUT: [
        {
          NAME: '专项兴趣小组（SIG）',
          URL: '/',
        },
        {
          NAME: 'openGauss 社区突出贡献单位',
          URL: '/',
        },
        {
          NAME: '单位会员贡献',
          URL: '/',
        },
      ],
    },
    {
      NAME: '动态',
      ID: 'update',
      WITH_PICTURE: true,
      CHILDREN: [
        {
          NAME: '活动',
          CHILDREN: [
            {
              NAME: '活动',
              DESCRIPTION: '了解openGauss社区全年活动',
              URL: '/download/#',
            },
            {
              NAME: '峰会',
              DESCRIPTION: '查看openGauss年度大会详情',
              URL: '/download/#',
            },
            {
              NAME: '结队计划',
              DESCRIPTION: '获取社区结队技术支持',
              URL: '/download/#',
            },
            {
              NAME: 'Call for Meetup',
              DESCRIPTION: '开发者活动共创',
              URL: '/download/#',
            },
          ],
        },
        {
          NAME: '资讯',
          CHILDREN: [
            {
              NAME: '新闻',
              DESCRIPTION: '查看openGauss社区动态',
              URL: '/download/#',
            },
            {
              NAME: '博客',
              DESCRIPTION: '查看openGauss技术文章分享',
              URL: '/download/#',
            },
          ],
        },
      ],
      SHORTCUT: [
        {
          NAME: 'openGauss Developer Day 2025',
          PICTURE: odd,
          DESCRIPTION: '',
          REMARK: '时间：2025/06/27 | 北京',
          TYPE: 'PICTURE',
          URL: '/',
        },
        {
          NAME: '汇聚数据库创新力量，引领智能时代新未来',
          PICTURE: report,
          DESCRIPTION: '',
          REMARK: '时间：2025/12/27 | 北京',
          TYPE: 'PICTURE',
          URL: '/',
        },
      ],
    },
  ],
  QUICKLINK: '快捷链接',
  CODE: '源码',
  SEARCH: {
    BROWSEHISTORY: '历史记录',
    CLEAN: '清除',
    TOPSEARCH: '热门搜索',
    CHANGE: '换一批',
    PLEACHOLDER: '搜索',
    PLEACHOLDER_EXTEND: '请输入搜索内容',
    TEXT: '搜索',
  },
  SOURCE_CODE: [
    {
      NAME: '代码仓',
      PATH: 'https://gitee.com/openeuler',
      ICON: OutLink,
    },
    {
      NAME: '软件包仓',
      PATH: 'https://gitee.com/src-openeuler',
      ICON: OutLink,
    },
    {
      NAME: 'Github镜像仓',
      PATH: 'https://github.com/openeuler-mirror',
      ICON: OutLink,
    },
    {
      NAME: 'LFS文件管理',
      PATH: 'https://github.com/openeuler-mirror',
    },
  ],
};
