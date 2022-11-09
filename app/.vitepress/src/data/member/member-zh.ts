import data from './data';
export default {
  MEMBER_LIST: [
    {
      NAME: '理事会',
      ID: 'board',
      GITEE_PATH: 'https://gitee.com/opengauss/board',
      EMIAL: 'board@opengauss.org',
      NAMEL_TEXT: '理事会成员：',
      LIST: data.zh.BOARD,
    },
    {
      NAME: '用户委员会',
      ID: 'uc',
      GITEE_PATH: 'https://gitee.com/opengauss/uc',
      EMIAL: 'uc@opengauss.org',
      NAMEL_TEXT: '用户委员会成员：',
      LIST: data.zh.UC,
    },
    {
      NAME: '品牌宣传委员会',
      ID: 'bc',
      GITEE_PATH: 'https://gitee.com/opengauss/bc',
      EMIAL: 'bc@opengauss.org',
      NAMEL_TEXT: '品牌宣传委员会成员：',
      LIST: data.zh.BC,
    },
    {
      NAME: '技术委员会 (TC)',
      ID: 'tc',
      GITEE_PATH: 'https://gitee.com/opengauss/tc',
      EMIAL: 'tc@opengauss.org',
      NAMEL_TEXT: 'TC成员：',
      LIST: data.zh.TC,
    },
    {
      NAME: '专项兴趣小组 (SIG)',
      ID: 'sig',
      CHILDREN: [
        {
          NAME: 'SQLEngine',
          ID: 'sqlengine',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/SQLEngine',
          EMIAL: 'sqlengine@opengauss.org',
          LIST: data.zh.SQLENGINE,
        },
        {
          NAME: 'StorageEngine',
          ID: 'storageEngine',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/StorageEngine',
          EMIAL: 'storageengine@opengauss.org',
          LIST: data.zh.STORAGEENGINE,
        },
        {
          NAME: 'Connectors',
          ID: 'connectors',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/Connectors',
          EMIAL: 'connectors@opengauss.org',
          LIST: data.zh.CONNECTORS,
        },
        {
          NAME: 'Tools',
          ID: 'tools',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Tools',
          EMIAL: 'tools@opengauss.org',
          LIST: data.zh.TOOLS,
        },
        {
          NAME: 'Docs',
          ID: 'docs',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Docs',
          EMIAL: 'docs@opengauss.org',
          LIST: data.zh.DOCS,
        },
        {
          NAME: 'Infra',
          ID: 'infra',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Infra',
          EMIAL: 'infra@opengauss.org',
          LIST: data.zh.INFRA,
        },
        {
          NAME: 'Security',
          ID: 'security',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/Security',
          EMIAL: 'security@opengauss.org',
          LIST: data.zh.SECURITY,
        },
        {
          NAME: 'IoT',
          ID: 'iot',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/IoT',
          EMIAL: 'iot@opengauss.org',
          LIST: data.zh.IOT,
        },
        {
          NAME: 'OM',
          ID: 'om',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/OM',
          EMIAL: 'om@opengauss.org',
          LIST: data.zh.OM,
        },
        {
          NAME: 'In-place Update',
          ID: 'inplaceupdate',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/In-place-Update',
          EMIAL: 'inplaceupdate@opengauss.org',
          LIST: data.zh.INPLACEUPDATE,
        },
        {
          NAME: 'AI',
          ID: 'ai',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/AI',
          EMIAL: 'ai@opengauss.org',
          LIST: data.zh.AI,
        },
        {
          NAME: 'GIS',
          ID: 'gis',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/GIS',
          EMIAL: 'gis@opengauss.org',
          LIST: data.zh.GIS,
        },
        {
          NAME: 'Security Technology',
          ID: 'securitytechnology',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/SecurityTechnology',
          EMIAL: 'securitytechnology@opengauss.org',
          LIST: data.zh.SECURITYTECHNOLOGY,
        },
        {
          NAME: 'CloudNative',
          ID: 'cloudnative',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/CloudNative',
          EMIAL: 'cloudnative@opengauss.org',
          LIST: data.zh.CLOUDNATIVE,
        },
        {
          NAME: 'Graph',
          ID: 'graph',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Graph',
          EMIAL: 'graph@opengauss.org',
          LIST: data.zh.GRAPH,
        },
        {
          NAME: 'Blockchain',
          ID: 'blockchain',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/Blockchain',
          EMIAL: 'blockchain@opengauss.org',
          LIST: data.zh.BLOCKCHAIN,
        },
        {
          NAME: 'QA',
          ID: 'qa',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/QA',
          EMIAL: 'qa@opengauss.org',
          LIST: data.zh.QA,
        },
        {
          NAME: 'DCF',
          ID: 'dcf',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/DCF',
          EMIAL: 'dcf@opengauss.org',
          LIST: data.zh.DCF,
        },
        {
          NAME: 'Certification',
          ID: 'certification',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/Certification',
          EMIAL: 'certification@opengauss.org',
          LIST: data.zh.CERTIFICATION,
        },
        {
          NAME: 'Plugin',
          ID: 'plugin',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Plugin',
          EMIAL: 'plugin@opengauss.org',
          LIST: data.zh.PLUGIN,
        },
        {
          NAME: 'CM',
          ID: 'cm',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/CM',
          EMIAL: 'cm@opengauss.org',
          LIST: data.zh.CM,
        },
        {
          NAME: 'ReleaseManagement',
          ID: 'releaseManagement',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/ReleaseManagement',
          EMIAL: 'releaseManagement@opengauss.org',
          LIST: data.zh.RELEASEMANAGEMENT,
        },
        {
          NAME: 'OPS',
          ID: 'ops',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/OPS',
          EMIAL: 'ops@opengauss.org',
          LIST: data.zh.OPS,
        },
        {
          NAME: 'KnowledgeGraph',
          ID: 'knowledgegraph',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/KnowledgeGraph',
          EMIAL: 'knowledgegraph@opengauss.org',
          LIST: data.zh.KNOWLEDGEGRAPH,
        },
        {
          other: '感兴趣的SIG组还未出现?',
          other1: '新的SIG组等你来发起！',
          other2: '欢迎发送申请邮件至：',
          email: 'tc@opengauss.org',
        },
      ],
    },
    {
      NAME: 'openGauss用户组（oGUG）',
      ID: 'ogug',
      CHILDREN: [
        {
          NAME: '深圳用户组',
          ID: 'ShenZhen',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/ShenZhen',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.SHENZHEN,
        },
        {
          NAME: '北京用户组',
          ID: 'BeiJing',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/BeiJing',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.BEIJING,
        },
        {
          NAME: '南京用户组',
          ID: 'NanJing',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/NanJing',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.NANJING,
        },
        {
          NAME: '西安用户组',
          ID: 'XiAn',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/XiAn',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.XIAN,
        },
        {
          NAME: '长沙用户组',
          ID: 'ChangSha',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/ChangSha',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.CHANGSHA,
        },
        {
          NAME: '杭州用户组',
          ID: 'HangZhou',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/HangZhou',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.HANGZHOU,
        },
        {
          NAME: '兰州用户组 ',
          ID: 'LanZhou',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/LanZhou',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.LANZHOU,
        },
        {
          NAME: '重庆用户组',
          ID: 'ChongQing',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/ChongQing',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.CHONGQING,
        },
        {
          NAME: '上海用户组',
          ID: 'ShangHai',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/ShangHai',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.SHANGHAI,
        },
        {
          NAME: '成都用户组',
          ID: 'ChengDu',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/ChengDu',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.CHENGDU,
        },
        {
          NAME: '广州用户组',
          ID: 'GuangZhou',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/GuangZhou',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.zh.GUANGZHOU,
        },
        {
          other: '你的城市还没有用户组?',
          other1: '新的用户组等你来发起！ ',
          other2: '欢迎发送申请邮件至：',
          email: 'usergroup@opengauss.org',
        },
      ],
    },
  ],
};
