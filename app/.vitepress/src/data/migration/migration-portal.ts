import imgOffical from '@/assets/category/migration/portal/portal-help-official.png';
import imgAssistant from '@/assets/category/migration/portal/portal-help-assistant.png';

export default {
  advantage: {
    title: '迁移优势',
    dexcription: 'openGauss 助力企业简单、平稳、高效进行数据库迁移。',
    cardTopLeft: {
      title01: '原操作系统EOM',
      title02: '数字化改造',
      description: '',
    },

    cardTopRight: {
     
      title01: 'openEuler',
      title02: '',
      description:
        '面向数字基础设施的开源操作系统\n聚焦内核能力，释放多样性算力，引领操作系统创新\n创新架构，全栈优化，打造全场景协同的数字基础设施操作系统',
    },
    benefit: {
      light: [
        
      ],
      dark: [
        
      ],
    },
    btn: {
      text: '查看更多',
      link: '/migration/advantage/',
    },
  },
  guide: {
    title: '迁移方案说明',
    dexcription: '',
    list: [
      {
        label: 'MySQL 5.7.21 移植指南',
        link: '/zh/blog/randy1568/MySQL 5-7-21-migrate-guide.html',
      },
      {
        label: 'Apache 2.4.39 移植指南',
        link: '/zh/blog/randy1568/Apache 2-4-39-porting-guide.html',
      },
      {
        label: 'Nginx 1.14.2 移植指南',
        link: '/zh/blog/randy1568/Nginx 1-14-2-porting-guide.html',
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
  download: {
    title: '快速下载',
    dexcription:
      'x2openEuler工具是一款将源操作系统升级为目标操作系统的搬迁工具套件',
    left: {
      img: {
        light: '',
        dark: '',
      },
      name: 'x2openEuler',
      version: '2.0.0',
    },
    btns: [
      {
        name: '软件下载',
        softLinks: [
          {
            name: 'x86_64 ',
            link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/x86_64/Packages/x2openEuler-core-2.0.0-4.x86_64.rpm',
          },
          {
            name: 'aarch64 ',
            link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/aarch64/Packages/x2openEuler-core-2.0.0-4.aarch64.rpm',
          },
        ],
      },
      {
        name: '使用指南',
        link: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/thirdparty_migration/x2openEuler-Userguide.html',
      },
      {
        name: '视频实操',
        link: 'https://www.bilibili.com/video/BV1yR4y1b76k/?spm_id_from=333.999.0.0&vd_source=0aa547ea87e7a7505cf544eacc2236ac',
      },
    ],
    bgUrl: 'imgDownloadBG_dark',
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
        textLeft: 'openEuler公众号进入迁移专区，点击“加群”，进入技术交流群',
        linkText: '',
        textRight: '',
        link: '',
      },
      {
        textLeft: 'openEuler小助手，备注“迁移”，进入技术交流群',
        linkText: '',
        textRight: '',
        link: '',
      },
    ],
    officalQR: {
      img: imgOffical,
      text: 'openEuler公众号',
    },
    assistantQR: {
      img: imgAssistant,
      text: 'openEuler小助手',
    },
  },
};
