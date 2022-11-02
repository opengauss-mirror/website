import data from './data';
export default {
  MEMBER_LIST: [
    {
      NAME: 'Board',
      ID: 'board',
      GITEE_PATH: 'https://gitee.com/opengauss/board',
      EMIAL: 'board@opengauss.org',
      NAMEL_TEXT: 'Board Members',
      LIST: data.en.BOARD,
    },
    {
      NAME: 'User Committee',
      ID: 'uc',
      GITEE_PATH: 'https://gitee.com/opengauss/uc',
      EMIAL: 'uc@opengauss.org',
      NAMEL_TEXT: 'UC Members',
      LIST: data.en.UC,
    },
    {
      NAME: 'Board Committee',
      ID: 'bc',
      GITEE_PATH: 'https://gitee.com/opengauss/bc',
      EMIAL: 'bc@opengauss.org',
      NAMEL_TEXT: 'BC Members',
      LIST: data.en.BC,
    },
    {
      NAME: 'Technical Committee (TC)',
      ID: 'tc',
      GITEE_PATH: 'https://gitee.com/opengauss/tc',
      EMIAL: 'tc@opengauss.org',
      LIST: data.en.TC,
    },
    {
      NAME: 'Special Interest Groups (SIGs)',
      ID: 'sig',
      CHILDREN: [
        {
          NAME: 'SQLEngine',
          ID: 'sqlengine',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/SQLEngine',
          EMIAL: 'sqlengine@opengauss.org',
          LIST: data.en.SQLENGINE,
        },
        {
          NAME: 'StorageEngine',
          ID: 'storageEngine',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/StorageEngine',
          EMIAL: 'storageengine@opengauss.org',
          LIST: data.en.STORAGEENGINE,
        },
        {
          NAME: 'Connectors',
          ID: 'connectors',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/Connectors',
          EMIAL: 'connectors@opengauss.org',
          LIST: data.en.CONNECTORS,
        },
        {
          NAME: 'Tools',
          ID: 'tools',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Tools',
          EMIAL: 'tools@opengauss.org',
          LIST: data.en.TOOLS,
        },
        {
          NAME: 'Docs',
          ID: 'docs',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Docs',
          EMIAL: 'docs@opengauss.org',
          LIST: data.en.DOCS,
        },
        {
          NAME: 'Infra',
          ID: 'infra',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Infra',
          EMIAL: 'infra@opengauss.org',
          LIST: data.en.INFRA,
        },
        {
          NAME: 'Security',
          ID: 'security',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/Security',
          EMIAL: 'security@opengauss.org',
          LIST: data.en.SECURITY,
        },
        {
          NAME: 'Iot',
          ID: 'iot',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Iot',
          EMIAL: 'iot@opengauss.org',
          LIST: data.en.IOT,
        },
        {
          NAME: 'OM',
          ID: 'om',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/OM',
          EMIAL: 'om@opengauss.org',
          LIST: data.en.OM,
        },
        {
          NAME: 'In-place Update',
          ID: 'inplaceupdate',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/In-place-Update',
          EMIAL: 'inplaceupdate@opengauss.org',
          LIST: data.en.INPLACEUPDATE,
        },
        {
          NAME: 'AI',
          ID: 'ai',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/AI',
          EMIAL: 'ai@opengauss.org',
          LIST: data.en.AI,
        },
        {
          NAME: 'GIS',
          ID: 'gis',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/GIS',
          EMIAL: 'gis@opengauss.org',
          LIST: data.en.GIS,
        },
        {
          NAME: 'Security Technology',
          ID: 'securitytechnology',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/SecurityTechnology',
          EMIAL: 'securitytechnology@opengauss.org',
          LIST: data.en.SECURITYTECHNOLOGY,
        },
        {
          NAME: 'CloudNative',
          ID: 'cloudnative',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/CloudNative',
          EMIAL: 'cloudnative@opengauss.org',
          LIST: data.en.CLOUDNATIVE,
        },
        {
          NAME: 'Graph',
          ID: 'graph',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Graph',
          EMIAL: 'graph@opengauss.org',
          LIST: data.en.GRAPH,
        },
        {
          NAME: 'Blockchain',
          ID: 'blockchain',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/Blockchain',
          EMIAL: 'blockchain@opengauss.org',
          LIST: data.en.BLOCKCHAIN,
        },
        {
          NAME: 'QA',
          ID: 'qa',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/QA',
          EMIAL: 'qa@opengauss.org',
          LIST: data.en.QA,
        },
        {
          NAME: 'DCF',
          ID: 'dcf',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/DCF',
          EMIAL: 'dcf@opengauss.org',
          LIST: data.en.DCF,
        },
        {
          NAME: 'Certification',
          ID: 'certification',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/Certification',
          EMIAL: 'certification@opengauss.org',
          LIST: data.en.CERTIFICATION,
        },
        {
          NAME: 'Plugin',
          ID: 'plugin',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/Plugin',
          EMIAL: 'plugin@opengauss.org',
          LIST: data.en.PLUGIN,
        },
        {
          NAME: 'CM',
          ID: 'cm',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/CM',
          EMIAL: 'cm@opengauss.org',
          LIST: data.en.CM,
        },
        {
          NAME: 'ReleaseManagement',
          ID: 'releaseManagement',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/ReleaseManagement',
          EMIAL: 'releaseManagement@opengauss.org',
          LIST: data.en.RELEASEMANAGEMENT,
        },
        {
          NAME: 'OPS',
          ID: 'ops',
          GITEE_PATH: 'https://gitee.com/opengauss/tc/tree/master/sigs/OPS',
          EMIAL: 'ops@opengauss.org',
          LIST: data.en.OPS,
        },
        {
          NAME: 'KnowledgeGraph',
          ID: 'knowledgegraph',
          GITEE_PATH:
            'https://gitee.com/opengauss/tc/tree/master/sigs/KnowledgeGraph',
          EMIAL: 'knowledgegraph@opengauss.org',
          LIST: data.en.KNOWLEDGEGRAPH,
        },
        {
          other: 'Want to start a new SIG?',
          other1: '',
          other2: 'Please send your application to : ',
          email: 'tc@opengauss.org',
        },
      ],
    },
    {
      NAME: 'User Group (oGUG)',
      ID: 'ogug',
      CHILDREN: [
        {
          NAME: 'ShenZhen User Group',
          ID: 'ShenZhen',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/ShenZhen',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.en.SHENZHEN,
        },
        {
          NAME: 'BeiJing User Group',
          ID: 'BeiJing',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/BeiJing',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.en.BEIJING,
        },
        {
          NAME: 'NanJing User Group',
          ID: 'NanJing',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/NanJing',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.en.NANJING,
        },
        {
          NAME: 'XiAn User Group',
          ID: 'XiAn',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/XiAn',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.en.XIAN,
        },
        {
          NAME: 'ChangSha User Group',
          ID: 'ChangSha',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/ChangSha',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.en.CHANGSHA,
        },
        {
          NAME: 'HangZhou User Group',
          ID: 'HangZhou',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/HangZhou',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.en.HANGZHOU,
        },
        {
          NAME: 'LanZhou User Group ',
          ID: 'LanZhou',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/LanZhou',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.en.LANZHOU,
        },
        {
          NAME: 'ChongQing User Group',
          ID: 'ChongQing',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/ChongQing',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.en.CHONGQING,
        },
        {
          NAME: 'ShangHai User Group',
          ID: 'ShangHai',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/ShangHai',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.en.SHANGHAI,
        },
        {
          NAME: 'ChengDu User Group',
          ID: 'ChengDu',
          GITEE_PATH:
            'https://gitee.com/opengauss/openGauss-User-Group/tree/master/ChengDu',
          EMIAL: 'usergroup@opengauss.org',
          LIST: data.en.CHENGDU,
        },
        {
          other: 'Want to start a new openGauss User Group?',
          other1: ' ',
          other2: 'Please send your application to: ',
          email: 'usergroup@opengauss.org',
        },
      ],
    },
  ],
};
