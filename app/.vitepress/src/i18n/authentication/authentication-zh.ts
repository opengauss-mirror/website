import { GAUSS_CERTIFICATE_EMAIL } from '@/data/url-config';

import yshl from '@/assets/category/authentication/training/img/talent/yshl.png';
import yshlDark from '@/assets/category/authentication/training/img/talent/yshl_dark.png';
import yshlSignup from '@/assets/category/authentication/training/img/talent/yshl_signup.png';
import yshlSignupDark from '@/assets/category/authentication/training/img/talent/yshl_signup_dark.png';
import vastdata from '@/assets/category/authentication/training/img/talent/vastdata.svg';
import vastdataDark from '@/assets/category/authentication/training/img/talent/vastdata_dark.svg';
import vastdataSignup from '@/assets/category/authentication/training/img/talent/vastdata_signup.svg';
import vastdataSignupDark from '@/assets/category/authentication/training/img/talent/vastdata_signup_dark.svg';
import gbase from '@/assets/category/authentication/training/img/talent/gbase.svg';
import gbaseDark from '@/assets/category/authentication/training/img/talent/gbase_dark.svg';
import gbaseSignup from '@/assets/category/authentication/training/img/talent/gbase_signup.svg';
import gbaseSignupDark from '@/assets/category/authentication/training/img/talent/gbase_signup_dark.svg';
import sz from '@/assets/category/authentication/training/img/talent/sz.svg';
import szDark from '@/assets/category/authentication/training/img/talent/sz_dark.png';
import szSignup from '@/assets/category/authentication/training/img/talent/sz_signup.svg';
import szSignupDark from '@/assets/category/authentication/training/img/talent/sz_signup_dark.png';
import qst from '@/assets/category/authentication/training/img/talent/qst.svg';
import qstDark from '@/assets/category/authentication/training/img/talent/qst_dark.png';
import qstSignup from '@/assets/category/authentication/training/img/talent/qst_signup.svg';
import qstSignupDark from '@/assets/category/authentication/training/img/talent/qst_signup_dark.png';

export default {
  title: '培训认证',
  introtitle: '认证体系简介',
  intro1: '基于openGauss在中国良好的发展态势，由openGauss社区联合培训认证伙伴、中国软件行业协会培训中心共同打造openGauss培训认证体系。',
  intro2:
    'openGauss培训认证体系旨在帮助企业快速培养专业DBA人才，推动相关从业人员高效获得权威资质认证，促使技术爱好者踊跃融入社区技术生态。该体系填补了openGauss系数据库培训认证领域的空白，对openGauss的技术推广和生态发展起到积极的推动和促进作用。',
  advantage: '认证体系优势',
  adv: [
    {
      advTitle: '权威的认证',
      advDes1: '社区、软协、合作伙伴',
      advDes2: '三方联手打造权威认证',
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
      outline: 'OGCA课程大纲:',
      courseOutline: [
        {
          num: '01',
          cardtitle: '数据库技术发展概述',
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
          desList: ['·内存结构', '·线程结构', '·存储结构'],
        },
        {
          num: '05',
          cardtitle: 'openGauss基本管理与SQL',
          desList: ['·数据库启动、关闭与状态查看', '·数据库监听管理与连接机制', '·表空间管理', '·数据库管理', '·用户管理', '·DQL语句/DDL语句/DML语/DCL语句'],
        },
      ],
    },
    {
      name: 'ogcp',
      level: '中级',
      des: '面向openGauss数据库的中级管理员、架构设计与优化人员',
      description:
        '社区根据openGauss技术发展路线与市场需求,规划设计了《openGauss OGCA认证课程》,本课程以深入探索openGauss的内部运作机制与实践应用为核心，融合了理论教学与实战演练。课程内容涵盖openGauss产品架构、数据库对象管理、安全管理、迁移管理、SQL进阶等。整个学习过程循序渐进，确保每位学员都能从基础学起，逐步掌握openGauss数据库的高级技能知识。',
      empty: 'true',
      module: '考试模块:敬请期待',
      contenttitle: '课程内容:',
      content: '涵盖openGauss的生态发展、深入解析体系架构、深度维护、数据管理、功能特性、安全管理、性能优化、高级SQL、备份恢复、高可用技术以及相关管理工具等。',
      outline: 'OGCP课程大纲:',
      courseOutline: [
        {
          num: '01',
          cardtitle: 'openGauss产品架构',
          desList: ['·系统架构', '·软件架构', '·逻辑架构', '·线程架构'],
        },
        {
          num: '02',
          cardtitle: '数据库对象管理',
          desList: ['·系统表和系统视图', '·物化视图', '·对象权限管理', '·定时任务'],
        },
        {
          num: '03',
          cardtitle: '数据库安全管理',
          desList: ['·客户端接入认证', '·用户及角色', '·数据库审计', '·密态等值查询', '·账本数据库', '·透明数据加密'],
        },
        {
          num: '04',
          cardtitle: 'SQL进阶',
          desList: ['·存储过程与触发器', '·多表连接', '·约束', '·表清理'],
        },
        {
          num: '05',
          cardtitle: '数据库系统管理',
          desList: ['·日程检查', '·操作系统及openGauss健康检查', '·备份恢复管理', '·容灾管理'],
        },
        {
          num: '06',
          cardtitle: '数据库迁移管理',
          desList: ['·数据迁移概述', '·openGauss迁移工具', '·异构数据库语法差异', '·MySQL数据库迁移实践'],
        },
      ],
    },
    {
      name: 'ogce',
      level: '高级',
      des: '面向openGauss数据库的高级管理员、架构师、安全专家以及AI方向的数据库使用者',
      description: '',
      empty: 'true',
      module: '考试模块:敬请期待',
      contenttitle: '课程内容:',
      content: '涵盖数据库高级安全管控、数据库深度诊断与优化、人工智能、负载均衡、分布式等。',
      outline: 'OGCE课程大纲:',
    },
  ],
  steptitle: '认证流程介绍',
  stepList: [
    {
      name: '培训报名',
      link: '/zh/training/signup/',
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
      link: '',
    },
  ],
  talentTitle: '认证人才优选',
  talentDesc: 'openGauss培训认证体系致力于为企业、在校大学生和IT从业者提供全方位的支持和帮助，共同推动数据库技术的发展和人才培养。',
  talentList: [
    {
      icon: yshl,
      iconDark: yshlDark,
      iconSignup: yshlSignup,
      iconSignupDark: yshlSignupDark,
      desc: '云数互联旗下“墨天轮”是专注于数据库的技术社区，月活用户超过150万并覆盖40万专业数据库人才。社区以排行榜、知识库、问答、视频课程、AI 助手、培训认证等方式，促进数据库领域的知识传播和技术创新。',
      url: 'https://www.modb.pro/job',
      signupUrl: 'https://www.modb.pro/course/144',
    },
    {
      icon: vastdata,
      iconDark: vastdataDark,
      iconSignup: vastdataSignup,
      iconSignupDark: vastdataSignupDark,
      desc: '北京海量数据技术股份有限公司(股票代码:603138.SH)成立于2007年，是国内首家以数据库为主营业务的主板上市企业。公司十余年来秉承“专注做好数据库”的初心，始终致力于数据库产品的研发、销售和服务。',
      url: 'http://education.vastdata.com.cn',
      signupUrl: 'https://education.vastdata.com.cn/pc/#/',
    },
    {
      icon: gbase,
      iconDark: gbaseDark,
      iconSignup: gbaseSignup,
      iconSignupDark: gbaseSignupDark,
      desc: 'GBASE南大通用创立于2004年，二十年来始终致力于国产数据库核心技术的研发与市场开拓。自主研发的GBase数据库系列产品已为金融、电信、政务、能源、交通等关键领域提供服务，部署节点超过96000个，管理数据总量超过500PB。',
      url: 'https://www.gbase.cn/about-us/jobs',
      signupUrl: 'https://www.gbase.cn/learn/training-activities',
    },
    {
      icon: sz,
      iconDark: szDark,
      iconSignup: szSignup,
      iconSignupDark: szSignupDark,
      desc: '神舟通用公司是中国航天科技集团有限公司（CASC）下属的一家专业的数据库公司，研发和销售神通数据库产品。公司的主要客户群体为党、政、军、航天、金融、审计、能源、医疗、电信等单位。',
      url: 'http://www.shentongdata.com/index.php/about/join-8',
      signupUrl: 'http://shentongdata.com/index.php/course/exam-58',
    },
    {
      icon: qst,
      iconDark: qstDark,
      iconSignup: qstSignup,
      iconSignupDark: qstSignupDark,
      desc: '青软集团创立于2006年，是国内领先的高等教育数字化解决方案、产教融合及人力资源服务提供商，致力于推动教育与产业无缝衔接，把产业的技术、需求和资源转化成支撑高校人才培养的能力，助力新兴产业的人才支撑及服务。',
      url: 'https://www.eduplus.net/jiuye/company/details?id=c57c107755d44159a3f9bc1c2fb54867',
      signupUrl: 'https://www.eduplus.net/training/openGauss',
    },
  ],
  talentDetail: '查看岗位详情',
  qatitle: '常见问题解答',
  qa: [
    {
      question: ' 1、社区颁发的openGauss认证证书是市面上唯一的openGauss认证证书吗？',
      answer:
        '是的，openGauss是开源数据库，由社区负责数据库的生态推广，社区希望通过规范的组织与专业的培训考试，让openGauss的爱好者能够系统的学习与掌握相关技能，成为企业可信的openGauss数据库技术人才。',
    },
    {
      question: '2、openGauss认证证书有纸质证书吗？',
      answer: '有，在通过认证考试后，3天内将会收到电子版证书，1个月内将会收到纸质证书。',
    },
    {
      question: '3、openGauss证书上有国家相关部门协会的资质证明吗？',
      answer: [
        '2025年4月7日前：所有OGCA（初级），OGCP（中级），OGCE（高级）证书，均有中国软件行业协会与openGauss社区联合认证，并加盖中国软件协会资质证明公章。',
        '2025年4月7日起：',
        'OGCP（中级），OGCE（高级）：维持中国软件行业协会与openGauss社区联合认证，证书包含双方权威标识；',
        'OGCA（初级）：调整为openGauss社区独立认证，证书保留社区理事长签名。',
      ],
    },
    {
      question: '4、不参加培训是否可以直接参加OGCA与OGCP考试？',
      answer: '可以，但为了确保学员能够体系的掌握openGauss的相关技能，成为真正的技术者而非应试者，建议系统的学习后再进行考试。',
    },
    {
      question: '5、认证证书有有效期么？',
      answer:
        '认证证书终身有效。但openGauss认证是跟随 openGauss 软件版本发布的，随着openGauss不断更新发布新的软件版本，社区也将每隔一段时期，同步发布新的openGauss版本的认证，已通过认证的学员可以选择重认证模式快速获取新版本的认证，新版本证书获取可基于旧版本的基础证书，即如果已获得旧版OGCA，可直接参加新版OGCP培训/考试。',
    },
    {
      question: '6、如何参加培训？',
      answer: 'openGauss社区优选了业界资深的数据库培训机构，为了保证培训效果，建议学员联系openGauss 授权的培训机构参加培训。',
      link: '《社区内的培训机构页面链接》',
      url: '${ENMOEDU_LINK}',
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
      name: '认证人才优选',
      key: '#talent',
    },
    {
      name: '常见问题解答',
      key: '#qa',
    },
  ],
  contact: '若以上仍不能解决您的问题，可发邮件至 ',
  contactemail: GAUSS_CERTIFICATE_EMAIL,
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
  more: '更多',
  viewMore: '查看更多',
  collapse: '向上收起',
  certificattion: {
    download: '证书下载',
    verificationQuery: '证书查询',
    certificateDownload: '证书下载',
    certificateDownload2: '下载选中证书',
    email: '邮箱',
    placeholderEmail: '输入您绑定的邮箱',
    tipEmail: '请输入认证考试所用的邮箱以获取验证码，查询您的证书。',
    emailErrorTip: '邮箱格式错误，请重新输入！',
    verificationCode: '验证码',
    placeholderCode: '输入您获取的验证码',
    buttonCode: '发送验证码',
    sure: '确认',
  },
  signupTitle: '我要报名',
  signupParentUrl: '/zh/training/',
  signupUrl: '/zh/training/signup/',
  signupDetail: {
    entrustTitle: '合作委托声明',
    entrustDesc: '为方便学员参加openGauss培训认证，openGauss开源社区优选了多家业界资深的数据库培训认证机构作为培训认证合作伙伴，并为相关合作伙伴授权。',
    entranceTitle: '报名入口',
    entranceDesc: '当前已经授权如下合作伙伴，选择任一合作伙伴即可跳转至培训认证报名页面：',
  },
  emptyTip: '敬请期待',
};
