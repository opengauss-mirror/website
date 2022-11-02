export default {
  title: '培训认证',
  certificateDownload: '证书下载',
  bgImg: '../img/breadcrumbs/training_bg.png',
  moImg: '../img/breadcrumbs/certificate_mo.png',
  introtitle: '认证体系简介',
  intro1:
    '基于openGauss在中国良好的发展态势，由openGauss社区联合云和恩墨公司、中国软件行业协会培训中心共同打造openGauss培训认证体系。',
  intro2:
    'openGauss培训认证体系旨在帮助企业快速培养专业DBA人才；推动相关从业人员高效获得权威资质认证；促使技术爱好者踊跃融入社区技术生态。该体系填补了openGauss系数据库培训认证领域的空白，对openGauss的技术推广和生态发展起到积极的推动和促进作用。',
  advantage: '认证体系优势',
  adv: [
    {
      advTitle: '权威的认证',
      advDes1: '社区、软协、云和恩墨三方联手',
      advDes2: '打造权威认证',
      dark: 'true',
    },
    {
      advTitle: '完善的体系',
      advDes1: 'CA、CP、CE三级认证，层次清晰',
      advDes2: '构建完善体系',
      dark: '',
    },
    {
      advTitle: '系统的课程',
      advDes1: '课程内容由浅入深、循序渐进',
      advDes2: '紧跟版本变化',
      dark: 'true-mobile',
    },
    {
      advTitle: '专业的讲师',
      advDes1: '权威专家结合多年教学实践经验',
      advDes2: '提供专业培训',
      dark: 'true-mobile2',
    },
    {
      advTitle: '灵活的参训',
      advDes1: '线上线下相结合，打破空间约束',
      advDes2: '灵活参与培训',
      dark: 'true',
    },
    {
      advTitle: '可观的前景',
      advDes1: '生态运营成熟，产业覆盖全面',
      advDes2: '市场未来可期',
      dark: '',
    },
  ],
  systemtitle: '认证体系介绍',
  system: [
    {
      name: 'ogca',
      level: '初级',
      des: '面向openGauss数据库的初级管理员、应用开发人员',
      description:
        '社区根据openGauss技术发展路线与市场需求,规划设计了《openGauss OGCA认证课程》,本课程以内部原理、实践实战为主，理论与实践相结合。课程内容涵盖数据库系统概论、openGauss数据库简介、体系概述、运维管理基础、数据库逻辑结构、SQL语言初探等。由浅入深，循序渐进，系统讲解openGauss数据库技能知识。',
      module: '考试模块:OGCA-010',
      contenttitle: '课程内容:',
      content:
        '涵盖数据库系统概论、国产数据库发展业态、 openGauss数据库简介、新特性、安装、客户端使用、openGauss体系概述、运维管理基础、数据库逻辑结构、SQL语言初探等。 ',
      trainDay: '课程天数:2天',
      trainCosts: '培训费用:1600 （',
      origintrain: '原价2000',
      examCoste: '考试费用:500 （',
      originexam: '原价1000',
      outline: 'OGCA课程大纲:',
    },
    {
      name: 'ogcp',
      level: '中级',
      des: '面向openGauss数据库的中级管理员、架构设计与优化人员',
      description: '',
      empty: 'true',
      module: '考试模块:敬请期待',
      contenttitle: '课程内容:',
      content:
        '涵盖openGauss的生态发展、深入解析体系架构、深度维护、数据管理、功能特性、安全管理、性能优化、高级SQL、备份恢复、高可用技术以及相关管理工具等。',
      trainDay: '课程天数:敬请期待',
      trainCosts: '培训费用:敬请期待',
      examCoste: '考试费用:敬请期待',
      outline: 'OGCP课程大纲:',
    },
    {
      name: 'ogce',
      level: '高级',
      des: '面向openGauss数据库的高级管理员、架构师、安全专家以及AI方向的数据库使用者',
      description: '',
      empty: 'true',
      module: '考试模块:敬请期待',
      contenttitle: '课程内容:',
      content:
        '涵盖数据库高级安全管控、数据库深度诊断与优化、人工智能、负载均衡、分布式等。',
      trainDay: '课程天数:敬请期待',
      trainCosts: '培训费用:敬请期待',
      examCoste: '考试费用:敬请期待',
      outline: 'OGCE课程大纲:',
    },
  ],
  verificationQuery: 'Query Certificates',
  email: 'Email',
  placeholderEmail: 'Your email address',
  tipEmail:
    'Enter the email address used for the certification exam to obtain the verification code and query your certificate.',
  verificationCode: 'Verification Code',
  placeholderCode: 'Enter the verification code.',
  buttonCode: 'Send a verification code',
  sure: 'Confirm',
  steptitle: '认证流程介绍',
  stepList: [
    {
      name: '培训报名',
      link: 'https://enmoedu.com/',
    },
    {
      name: '参加培训',
      link: '',
    },
    {
      name: '考场查询',
      link: '',
    },
    {
      name: '预约考试',
      link: '',
    },
    {
      name: '参加考试',
      link: '',
    },
    {
      name: '获取证书',
      link: '',
    },
    {
      name: '证书查询',
      link: 'https://www.opengauss.org/zh/training/search.html',
    },
  ],
  qatitle: '常见问题解答',
  qa: [
    {
      question:
        ' 1、社区颁发的openGauss认证证书是市面上唯一的openGauss认证证书吗？',
      answer:
        '是的，openGauss是开源数据库，由社区负责数据库的生态推广，社区希望通过规范的组织与专业的培训考试，让openGauss的爱好者能够系统的学习与掌握相关技能，成为企业可信的openGauss数据库技术人才。',
    },
    {
      question: '2、openGauss认证证书有纸质证书吗？',
      answer:
        '有，在通过认证考试后，3天内将会收到电子版证书，1个月内将会收到纸质证书。',
    },
    {
      question: '3、openGauss证书上有国家相关部门协会的资质证明吗？',
      answer: '证书上有软协的公章。',
    },
    {
      question: '4、不参加培训是否可以直接参加OGCA与OGCP考试？',
      answer:
        '可以，但为了确保学员能够体系的掌握openGauss的相关技能，成为真正的技术者而非应试者，建议系统的学习后再进行考试。',
    },
    {
      question: '5、可以不考 OGCA，直接考 OGCP 或者 OGCM 吗？',
      answer:
        'openGauss数据库有大量的技术创新，且数据库将会是企业信息化的核心，其维护不容忽视。我们希望学员从易到难，在拥有扎实基础后再进行深入的学习和提升，因此，必须具备 OGCA 后方可获得后续的认证，也就是说，必须逐级考试，不允许跨级考试。',
    },
    {
      question: '6、认证证书有有效期么？',
      answer:
        '认证证书终身有效。但openGauss认证是跟随 openGauss 软件版本发布的，随着openGauss不断更新发布新的软件版本，社区也将每隔一段时期，同步发布新的openGauss版本的认证，已通过认证的学员可以选择重认证模式快速获取新版本的认证，新版本证书获取可基于旧版本的基础证书，即如果已获得旧版OGCA，可直接参加新版OGCP培训/考试。',
    },
    {
      question: '7、如何参加培训？',
      answer:
        'openGauss社区优选了业界资深的数据库培训机构，为了保证培训效果，建议学员联系openGauss 授权的培训机构参加培训，点击如下链接可直接进入授权培训机构页面:',
      link: '《社区内的培训机构页面链接》',
      url: 'https://enmoedu.com/',
    },
  ],
  navList: [
    {
      name: '认证体系简介',
      key: '#introduction',
    },
    {
      name: '认证体系优势',
      key: '#advantage',
    },
    {
      name: '认证体系介绍',
      key: '#system',
    },
    {
      name: '认证流程介绍',
      key: '#step',
    },
    {
      name: '常见问题',
      key: '#qa',
    },
  ],
  downpdf1: '点击此处下载OGCA课程介绍.pdf',
  downurl1:
    'https://dbacertification-beijing4.obs.cn-north-4.myhuaweicloud.com/OGCA%E8%AF%BE%E7%A8%8B%E4%BB%8B%E7%BB%8D.pdf',
  downpdf2: '点击此处下载OGCA考试说明.pdf',
  downurl2:
    'https://dbacertification-beijing4.obs.cn-north-4.myhuaweicloud.com/OGCA%E8%80%83%E8%AF%95%E8%AF%B4%E6%98%8E.pdf',
  contact: '若以上仍不能解决您的问题，可发邮件至 ',
  contactemail: 'common@certificate.opengauss.org',
  cantactend: ' 咨询',
  searchingUrl: '/zh/training/search.html',
  costeach: '）元/人',

  discounttitle: 'OGCA培训认证限时优惠活动',
  traintitle: '培训费原价: ',
  traincos: '2000元/人',
  limited: '限时',
  trainoffset: '8',
  disunit: '折:',
  trainprice: '1600',
  yuan: '元/人',
  examtitle: '考试费原价: ',
  examcos: '1000元/人',
  examoffset: '5',
  examprice: '500',
  eventdl: '活动截止时间:',
  dlday: '2022年12月31日',
  signup: '咨询报名方式:',
  signwechat: '欢迎添加老师微信进行咨询报名',
  teacher2: '张老师',
  phone2: '18311372955',

  ogcacard: [
    {
      num: '01',
      cardtitle: '数据库技术发展概述',
      period: '1.5 课时',
      desList: [
        '·数据库系统概述',
        '·数据库技术发展的三个阶段',
        '·数据模型介绍:层次、网状、关系模型',
        '·非关系型数据库:NoSQL、NewSQL、图、时序、文档数据库',
        '·国产数据库的发展概况',
        '·华为云数据库的发展历程与组成',
        '·华为云数据库与openGauss的关系',
      ],
    },
    {
      num: '02',
      cardtitle: 'openGauss数据库与新特性',
      period: '2.5 课时',
      desList: [
        '·PostgreSQL的发展历程与概述',
        '·openGauss应用场景、运行环境和技术指标',
        '·openGauss的基本功能和企业级增强特性',
        '·开源产品的未来',
        '·openGauss 2.0.0新特性',
      ],
    },
    {
      num: '03',
      cardtitle: '安装、卸载与客户端工具',
      period: '4 课时',
      desList: [
        '·openGauss2.0.0标准安装的环境规划、准备、安装以及验证与参数优化',
        '·openGauss2.0.0极简安装的环境准备、配置和安装、验证',
        '·openGauss2.0.0容器版安装和安装后验证',
        '·openGauss2.0.0的卸载',
        '·掌握数据库连接工具GSQL的使用和常用语法',
        '·图形工具DataStudio安装、使用',
      ],
    },
    {
      num: '04',
      cardtitle: '数据库体系概述',
      period: '1 课时',
      desList: ['·内存结构', '·线程结构', '·存储结构'],
    },
    {
      num: '05',
      cardtitle: 'openGauss基本管理与SQL',
      period: '3 课时',
      desList: [
        '·数据库启动、关闭与状态查看',
        '·数据库监听管理与连接机制',
        '·表空间管理',
        '·数据库管理',
        '·用户管理',
        '·DQL语句/DDL语句/DML语/DCL语句',
      ],
    },
  ],
  more: '更多',
  emailErrorTip: 'Please enter a valid email address!',
  viewMore: '查看更多',
  collapse: '向上收起',
};
