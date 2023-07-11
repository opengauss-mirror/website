import imgOffical from '@/assets/category/migration/portal/portal-help-official.png';
import imgAssistant from '@/assets/category/migration/portal/portal-help-assistant.jpg';

import imgAdvantage1 from '@/assets/category/migration/portal/advantage1.png';
import imgAdvantage2 from '@/assets/category/migration/portal/advantage2.png';
import imgAdvantage3 from '@/assets/category/migration/portal/advantage3.png';
import imgAdvantage4 from '@/assets/category/migration/portal/advantage4.png';
import imgDownload from '@/assets/category/migration/portal/download.png';
import imgAdvantage1Dark from '@/assets/category/migration/portal/advantage1_dark.png';
import imgAdvantage2Dark from '@/assets/category/migration/portal/advantage2_dark.png';
import imgAdvantage3Dark from '@/assets/category/migration/portal/advantage3_dark.png';
import imgAdvantage4Dark from '@/assets/category/migration/portal/advantage4_dark.png';
import imgDownloadDark from '@/assets/category/migration/portal/download_dark.png';

export default {
  advantage: {
    title: '迁移优势',
    content: [
      {
        name: '端到端的迁移方案',
        imgLight: imgAdvantage1,
        imgDark: imgAdvantage1Dark,
      },
      {
        name: '易用全能的迁移工具',
        imgLight: imgAdvantage2,
        imgDark: imgAdvantage2Dark,
      },
      {
        name: '随时专业的服务',
        imgLight: imgAdvantage3,
        imgDark: imgAdvantage3Dark,
      },
      {
        name: '迁移案例实践',
        imgLight: imgAdvantage4,
        imgDark: imgAdvantage4Dark,
      },
    ],
  },
  download: {
    title: '快速下载',
    dexcription:
      'DataKit提供了一个可视化操作的运维界面，可以帮助用户管理，安装，监控运维自己的openGauss数据库以及对应的物理机资源。',
    left: {
      imgLight: imgDownload,
      imgDark: imgDownloadDark,
      name: 'Datakit_5.0.0',
    },
    btns: [
      {
        name: '软件下载',
        btnIcon:1,
        link: 'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/Datakit-5.0.0.tar.gz',
        // softLinks: [
        //   {
        //     name: 'x86_64 ',
        //     link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/x86_64/Packages/x2openEuler-core-2.0.0-4.x86_64.rpm',
        //   },
        //   {
        //     name: 'aarch64 ',
        //     link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/aarch64/Packages/x2openEuler-core-2.0.0-4.aarch64.rpm',
        //   },
        // ],
      },
      // {
      //   name: '特性说明',
      //   btnIcon:2,
      //   link: '',
      // },
      {
        name: '使用指南',
        btnIcon:2,
        link: 'https://docs.opengauss.org/zh/docs/latest/docs/ToolandCommandReference/DataKit.html',
      },
      // {
      //   name: '视频实操',
      //   btnIcon:2,
      //   link: '',
      // },
    ],
    bgUrl: 'imgDownloadBG_dark',
  },
  guide: {
    title: '迁移方案说明',
    content: [
      {
        title: '搬迁分析',
        content: [
          '· 当前业务部署架构、数据量、业务并发量、功能、性能',
          '· 评估MySQL兼容性',
        ],
      },
      {
        title: '方案设计',
        content: [
          '· 根据客户业务场景以及业务诉求，制定搬迁策略，确定迁移任务流',
          '· 一客一策，方案设计，包括高可用、部署架构',
        ],
      },
      {
        title: '应用适配',
        content: [
          '· 应用适配：针对不兼容语法在用户应用侧实施语法改造',
          '· POC测试验证',
        ],
      },
      {
        title: '搬迁实施',
        content: [
          '· 内部迁移验证',
          '· 客户侧搬迁实施',
          '· 服务团队迁移支撑',
          '· 评估MySQL兼容性',
        ],
      },
      {
        title: '上线保障',
        content: [
          '· 客户迁移后应用验证',
          '· 业务巡检、运维服务',
        ],
      },
    ],
    btn: {
      text: '查看更多',
      link: '/migration/transplantation-cases/',
    },
  },
  compatibility: {
    title: '兼容性说明',
  },
  case: {
    title: '最佳实践',
    dexcription: '',
    list: [
      {
        name: '浙江移动',
        dexcription: '浙江移动完成了openEuler的大规模迁移部署',
        link: 'https://www.cnii.com.cn/rmydb/202109/t20210923_311404.html',
      },
      {
        name: '天翼云',
        dexcription:
          '天翼云全场景业务无缝迁移至基于openEuler的自研操作系统CTyunOS',
        link: 'https://baijiahao.baidu.com/s?id=1744113308957850456',
      },
    ],
    btn: {
      text: '了解详情',
      link: '/migration/user-cases/',
    },
  },

  instruction: {
    title: '轻松上手',
    dexcription:
      '提供用户迁移旅程中的准备、实施、测试上线等各环节的方法及工具，方便开发者快速完成迁移',
    list: [
      {
        title: '了解',
        content: '迁移背景\n迁移概述\nopenEuler迁移方案',
        sogan: '六步法端到端迁移无忧',
      },
      {
        title: '迁移准备',
        content: '成立保障组织\n迁移分析\n方案设计\n迁移适配',
        sogan: '工具助力，化繁为简',
      },
      {
        title: '迁移实施',
        content: '原地升级\n适配升级',
        sogan: '一键迁移，高效可靠',
      },
      {
        title: '测试与上线',
        content: '业务监控\n业务巡检\n安全漏洞更新',
        sogan: '安全放心，智能运维',
      },
    ],
  },
  path: {
    title: '迁移路径',
    dexcription: '',
    img: {
      light: '',
      dark: '',
    },
    imgMo: {
      top: {
        title: '原地升级（1h）',
        dexcription: '在原有的系统上一键升级',
      },
      bottom: {
        title: '适配迁移（4h）',
        dexcription: '自动安装操作系统和同步配置\n安装应用',
      },
    },
  },
  help: {
    title: '帮助咨询',
    dexcription: '',
    tips: [
      {
        textLeft: '如有疑问可前往',
        linkText: 'FAQ',
        textRight: '查找对应解答',
        link: '/migration/faq/',
      },
      {
        textLeft: '也可扫描二维码，我们会有专人为您解答',
        linkText: '',
        textRight: '',
        link: '',
      },
      {
        textLeft:
          'openGauss公众号，点击“联系我们” - “加入社群”，添加openGauss社群小助手，备注“迁移”进入MySQL迁移技术交流群',
        linkText: '',
        textRight: '',
        link: '',
      },
      {
        textLeft: 'openGauss小助手，备注“迁移”，进入技术交流群',
        linkText: '',
        textRight: '',
        link: '',
      },
    ],
    officalQR: {
      img: imgOffical,
      text: 'openGauss公众号',
    },
    assistantQR: {
      img: imgAssistant,
      text: 'openGauss小助手',
    },
  },
};
