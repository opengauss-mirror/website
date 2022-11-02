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
        time: '上午',
        children: [
          {
            time: '09:30 - 09:35',
            desc: '中国计算机学会数据库专家致辞',
            option: [
              {
                name: '李战怀',
                post: ['中国计算机学会数据库专委会主任'],
              },
            ],
          },
          {
            time: '09:35 - 09:50',
            desc: '创未来 享非凡，共建开源数据库根社区',
            option: [
              {
                name: '江大勇',
                post: ['openGauss社区理事会理事长'],
              },
            ],
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
            option: [
              {
                name: '何佳佳',
                post: ['中国邮政储蓄银行 金融科技创新部主任工程师'],
              },
            ],
          },
        ],
      },
      {
        type: '分论坛',
        time: '下午',
        children: [
          {
            name: '数据库内核优化探秘',
            desc: '北京海量数据技术股份有限公司',
            children: [
              {
                time: '13:30 - 13:40',
                desc: '开场致辞',
                option: [
                  {
                    name: '王振伟',
                    post: ['海量数据联席总裁'],
                  },
                ],
              },
              {
                time: '13:40 - 14:05',
                desc: '批量性能突破 - PL/pgSQL引擎优化',
                option: [
                  {
                    name: '黄晓涛',
                    post: ['海量数据研究院副院长'],
                  },
                ],
              },
              {
                time: '14:05 - 14:30',
                desc: '运行体验优化 - 分区索引联机重建',
                option: [
                  {
                    name: '窦志彤',
                    post: ['海量数据北京研究所所长'],
                  },
                ],
              },
              {
                time: '14:30 - 14:50',
                desc: '科学计算·决策赋能——新一代智慧城市探索',
                option: [
                  {
                    name: '万丹',
                    post: ['北京大学城市规划与设计学院博士'],
                  },
                ],
              },
              {
                time: '14:50 - 15:10',
                desc: '安全防护加固 - Stride威胁建模应用探索',
                option: [
                  {
                    name: '吴兴雄',
                    post: ['海量数据高级工程师'],
                  },
                ],
              },
            ],
          },
          {
            name: '数据库内核SQL Engine',
            desc: '云和恩墨（北京）信息技术有限公司',
            children: [
              {
                time: '13:30 - 13:35',
                desc: '出品人致辞 ',
                option: [
                  {
                    name: '张皖川',
                    post: ['云和恩墨数据库内核研发团队负责人'],
                  },
                ],
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
                option: [
                  {
                    name: '罗拉全',
                    post: ['云和恩墨数据库内核研发工程师'],
                  },
                ],
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
                option: [
                  {
                    name: '王春玲',
                    post: ['云和恩墨数据库内核研发工程师'],
                  },
                ],
              },
              {
                time: '14:55 - 15:15',
                desc: '见微知著，MogDB SQL运行观测之算子采样',
                option: [
                  {
                    name: '杨浩',
                    post: ['云和恩墨数据库内核研发工程师'],
                  },
                ],
              },
              {
                time: '15:15 - 15:25',
                desc: 'openGauss企业服务支持发布',
                option: [],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default videoData;
