import { ATOMGIT_LINK, XINGYEBANK_LINK } from '@/data/url-config';

import safe from '@/assets/category/finance/safe.png';
import safeDark from '@/assets/category/finance/safe_dark.png';
import reliability from '@/assets/category/finance/reliability.png';
import reliabilityDark from '@/assets/category/finance/reliability_dark.png';
import performance from '@/assets/category/finance/performance.png';
import performanceDark from '@/assets/category/finance/performance_dark.png';
import intelligence from '@/assets/category/finance/intelligence.png';
import intelligenceDark from '@/assets/category/finance/intelligence_dark.png';
import extend from '@/assets/category/finance/extend.png';
import extendDark from '@/assets/category/finance/extend_dark.png';
import manage from '@/assets/category/finance/manage.png';
import manageDark from '@/assets/category/finance/manage_dark.png';
import open from '@/assets/category/finance/open.png';
import openDark from '@/assets/category/finance/open_dark.png';
import storage from '@/assets/category/finance/storage.png';
import storageDark from '@/assets/category/finance/storage_dark.png';
import capability from '@/assets/category/finance/capability.png';
import capabilityDark from '@/assets/category/finance/capability_dark.png';
import scaleOut from '@/assets/category/finance/scale-out.png';
import scaleOutDark from '@/assets/category/finance/scale-out_dark.png';
import DBmind from '@/assets/category/finance/DBmind.png';
import DBmindDark from '@/assets/category/finance/DBmind_dark.png';

export default {
  zh: {
    version: {
      title: 'openGauss金融版本：助力金融行业数字化转型',
      titleMb1: 'openGauss金融版本',
      titleMb2: '助力金融行业数字化转型',
      descs: [
        '数据库是金融信息系统的核心基础设施，承载着核心交易和关键业务数据，为此中国人民银行针对金融行业数据库应用场景出台了金融行业标准。',
        '为构建满足金融行业标准及应用要求的企业级开源数据库，openGauss在企业版本基础上，推出金融版本，着力打造在高安全、高性能、高可用、高智能、易运维等方面的行业领先竞争力。',
      ],
    },
    advantages: {
      title: '全方位满足金融行业需求',
      lists: [
        {
          feature: '高安全',
          img: safe,
          img_dark: safeDark,
          desc: '全密态计算、国密算法认证和加密、动态数据脱敏，提供全方位端到端数据安全保护',
        },
        {
          feature: '高可靠',
          img: reliability,
          img_dark: reliabilityDark,
          desc: '日志并行回放实现RTO<10s，Paxos自治高可用架构，两地三中心流式容灾，满足金融级高可用要求',
        },
        {
          feature: '高性能',
          img: performance,
          img_dark: performanceDark,
          desc: 'Numa-Aware改造，指令集优化，2P鲲鹏>150W tpmC，4P鲲鹏>230W tpmC，相比同类产品3倍性能优势',
        },
        {
          feature: '高智能',
          img: intelligence,
          img_dark: intelligenceDark,
          desc: 'AI4DB：智能索引推荐、慢SQL诊断，高效运维诊断DB4AI：20+原生AI库内算子，覆盖主流场景，会SQL就能用AI',
        },
        {
          feature: '横向扩展',
          img: extend,
          img_dark: extendDark,
          desc: '存储池化、内存池化和计算池化三层池化架构，存储利用率提升50%以上，应用横向扩展',
        },
        {
          feature: '数据全生命周期管理',
          img: manage,
          img_dark: manageDark,
          desc: '数据全生命周期管理平台DataKit，覆盖安装、建模、开发、监控、运维、迁移、备份恢复7大流程',
        },
        {
          feature: '全开放',
          img: open,
          img_dark: openDark,
          desc: '木兰宽松许可证协议，允许对代码自由修改，使用，数据库内核能力全开放',
        },
      ],
    },
    technologies: {
      title: 'openGauss金融版本四大“黑科技”',
      tab_lists: [
        {
          title: '数据端到端安全计算存储能力',
          desc_lists: [
            '基于机密虚机+国密存储+openGauss实现全密态方案，构建软硬协同安全能力，数据在传输、计算、存储全链路支持国密算法，满足《中国人民银行业务领域数据安全管理办法》要求，做到“原始数据不出域、数据可用不可见”。',
            '适用于对数据在传输、使用和存储全链路上需要安全保护且对性能损耗度有较高要求的场景。',
          ],
          img: storage,
          img_dark: storageDark,
        },
        {
          title: '两地三中心高可用容灾能力',
          desc_lists: [
            '基于物理流复制实现流式容灾特性，通过搭建主备双集群，构建两地三中心方案，满足JR/T 0205-2020中对数据库容灾的要求，做到RPO=0、RTO<10min，一键式failover、switchover。',
            '适用于对数据有城市级高可用容灾且对RPO和RTO有较高要求的场景。',
          ],
          img: capability,
          img_dark: capabilityDark,
        },
        {
          title: '资源池化应用横向扩展能力',
          desc_lists: [
            'openGauss实现存储池化、内存池化和计算池化资源池化架构，各节点共用一份数据，存储利用率提升50%以上，节点数据实时一致，支持数据一致性敏感型应用负载从单个节点透明扩展到多个节点。',
            '同时基于Dorado存储同步复制技术实现资源池化同城双中心容灾能力，性能提升50%， RTO<30s。适用于对数据存储空间、备库数据读一致性和应用横向扩展有较高要求的场景。',
          ],
          img: scaleOut,
          img_dark: scaleOutDark,
        },
        {
          title: 'AI-Native高智能数据库能力',
          desc_lists: [
            'AI4DB：参数自调优、索引自推荐和慢SQL自诊断，运维效率提升10倍以上；支持基于负载驱动的基数估计ABO，性能提升1倍以上；',
            'DB4AI：20种原生AI库内算子，数据库内E2E完成数据清洗、特征工程、模型选择和模型训练，安全可靠、简单高效，满足会SQL就会AI。',
            '适用于对数据开发、监控、故障诊断等流程有较高智能化要求的场景。',
          ],
          img: DBmind,
          img_dark: DBmindDark,
        },
      ],
    },
    cases: {
      title: 'openGauss金融版本成功案例',
      case_list: [
        {
          name: '兴业银行支付系统',
          desc: '兴业银行支付系统为签约商户提供网络支付、对账、清算等服务，是对多渠道客户的重要支付服务平台。为进一步优化支付系统功能，提升支付系统业务处理能力和服务水平，系统引入 openGauss 数据库部分替代 Infomix 数据库。',
          detailLink: '/user-practice/finance/xingyepaymentsystem/',
          officialLink: `${XINGYEBANK_LINK}/cn/index.html`,
          type: '金融',
        },
        {
          name: '兴业银行冠字号码管理系统',
          desc: '冠字号码管理系统根据《中国人民银行货币金银局关于进一步做好冠字号码查询工作的通知》（银货金[2015]10 号）的文件要求，实现冠字号码信息上报、区分现金收入和付出业务类型、关联客户业务信息、与现钞实物同步流转等功能。同时，基于业务管理的需要，优化清分业务量统计功能，将机具管理纳入系统管理。',
          detailLink: '/user-practice/finance/xingyemanagesystem/',
          officialLink: `${XINGYEBANK_LINK}/cn/index.html`,
          type: '金融',
        },
        {
          name: '兴业银行特殊资产清收系统',
          desc: '特殊资产清收系统借助数字智能能力，开展估值模型建设迭代升级工作，构建特资领域的估值定价专业能力，实现特资处置质效提升。围绕“智慧管理”理念，资产清收系统进行了定位升级、功能优化、流程再造等改进，灵活的业务升级对数据库系统提出了更高的要求，系统数据库从 oracle 迁移至 openGauss。',
          detailLink: '/user-practice/finance/xingyecollectionsystem/',
          officialLink: `${XINGYEBANK_LINK}/cn/index.html`,
          type: '金融',
        },
      ],
    },
    interaction: {
      title: '专区互动',
      card_title: 'openGauss金融版本互动专区',
      card_desc: '前往金融版本互动专区，参与Issue问答',
      jumpLink: `${ATOMGIT_LINK}/opengauss/open-gauss-finance`,
    },
    download: {
      title: '版本下载',
      desc: '体验openGauss金融版本',
    },
  },
};
