import imgPolicy from '~icons/migration/policy.svg';
import imgTechnology from '~icons/migration/technology.svg';
import imgMigrationEvaluateSelected from '~icons/migration/migration-evaluate-selected.svg';
import imgMigrationEvaluateUnelected from '~icons/migration/migration-evaluate-unselected.svg';
import imgAppAdaptationSelected from '~icons/migration/app-adaptation-selected.svg';
import imgAppAdaptationUnelected from '~icons/migration/app-adaptation-unselected.svg';
import imgMigrationDataSelected from '~icons/migration/migration-data-selected.svg';
import imgMigrationDataUnselected from '~icons/migration/migration-data-unselected.svg';
import imgTestRunningSelected from '~icons/migration/test-running-selected.svg';
import imgTestRunningUnselected from '~icons/migration/test-running-unselected.svg';
import imgProduceSelected from '~icons/migration/produce-selected.svg';
import imgProduceUnselected from '~icons/migration/produce-unselected.svg';
import imgStable from '~icons/migration/stable.svg';
import imgSmoothMigration from '~icons/migration/smooth-migration.svg';
import { ATOMGIT_LINK, LEARN_VIDEO_LINK } from '@/data/url-config';

export default {
  requirementText: '要求',
  viewDetailText: '查看详细实践',
  playVideoText: '播放视频',
  readCaseText: '阅读案例',
  visitOfficialSiteText: '前往官网',
  visitAreaText: '前往专区',
  migrationText: '迁移',
  dowload: {
    title: '工具下载',
    desc: '体验openGauss DataKit',
    btnText: '立即下载',
    href: '/zh/download/#openGauss-Tools-6.0.0-RC1',
  },
  advantage: {
    title: '迁移优势',
    list: [
      {
        icon: imgPolicy,
        title: '政策合规性',
        desc: 'openGauss 采用中国首个官方开源协议“木兰宽松许可证”，首批通过中国信通院《可信开源社区评估体系》认证，遵循开源政策和规划，推动技术创新和数字化转型',
      },
      {
        icon: imgTechnology,
        title: '技术领先性',
        desc: '发布根技术白皮书，单节点性能230 tpmC、1万并发，3-5倍于MySQL、PostgreSQL等产品，内核性能持续优化处于行业领先水平，DataPod、DataKit领先架构助力行业数字化',
      },
      {
        icon: imgStable,
        title: '稳定可靠',
        desc: 'openGauss与MySQL在协议、常用功能、生态工具及语法等方面高度兼容，实现近似零修改迁移，处于国内数据库领先水平',
      },
      {
        icon: imgSmoothMigration,
        title: '高效平滑迁移',
        desc: '一键式MySQL兼容性评估和迁移，降低迁移难度，提高一次性迁移成功率',
      },
    ],
  },
  step: {
    title: '迁移流程',
    subTitle: '接收到企业在线数据搬迁的诉求，openGauss快速成立搬迁保障组，包括管理、专家、研发和测试人员等，为企业在线业务高效平稳搬迁提供技术支持和人力保障',
    list: [
      {
        id: 'migration-evaluate',
        iconSelected: imgMigrationEvaluateSelected,
        iconUnselected: imgMigrationEvaluateUnelected,
        stepName: '迁移评估',
        desc: '通过对源库现状的分析和评估，给出目标库选型和部署建议；通过评估目标库兼容性，确定改造工作量及迁移时长',
        href: '/zh/migration/case/index.html#migration-evaluate',
        detail: [
          {
            title: '源库画像',
            desc: '数据库画像是评估数据库的基础数据，用于了解源库，指导目标库选型迁移',
            showLine: true,
            feature: '提供多维度的表征源库的指标：',
            features: [
              {
                icon: 'right',
                title: '部署架构',
                desc: '如单机、主备、主从、跨AZ部署、异地部署等',
              },
              {
                icon: 'right',
                title: '容量',
                desc: '数据库数量及大小、单库的表数量及大小、表字段数、分区情况、索引数量及大小等',
              },
              {
                icon: 'right',
                title: '热点',
                desc: '访问频率对象、频繁执行的SQL/存储过程等',
              },
              {
                icon: 'right',
                title: '负载',
                desc: '数据库实例并发量、TPS、慢SQL、等待事件等；系统CPU、内存、网络IO、磁盘IO等资源消耗',
              },
              {
                icon: 'right',
                title: '复杂度',
                desc: '特殊功能（DBLink、外部表等）；表字段特殊类型（ blob、数组、自定义类型等）；存储过程数量；自定义函数数量；索引数量',
              },
            ],
          },
          {
            title: '目标库选型和部署建议',
            desc: '根据数据库画像，确定目标库选型和部署建议，包括：硬件资源、部署方式、运行参数等',
            showLine: false,
          },
          {
            title: '兼容性评估',
            desc: '评估目标库兼容性，包括对象兼容性、SQL兼容性，给出修复意见及改造工作量',
            showLine: true,
            feature: '支持通过以下方式获取对象或SQL语句：',
            features: [
              {
                icon: 'right',
                title: '使用mysqldump导出源库的DDL语句',
                desc: '',
              },
              {
                icon: 'right',
                title: '用户手动上传的SQL语句文件',
                desc: '',
              },
              {
                icon: 'right',
                title: '解析MyBatis/iBatis 的mapper配置文件',
                desc: '',
              },
              {
                icon: 'right',
                title: '连接源库获取慢SQL',
                desc: '',
              },
              {
                icon: 'right',
                title: '连接源库获取MySQL General Log',
                desc: '',
              },
              {
                icon: 'right',
                title: 'Attach到JAVA应用程序获取执行的SQL语句（包括调用栈，支持映射到应用程序源文件）',
                desc: '',
              },
            ],
          },
          {
            title: '迁移时长评估',
            desc: '根据数据库画像和目标库兼容能力，给出迁移时长评估',
            showLine: false,
          },
        ],
      },
      {
        id: 'app-adaptation',
        iconSelected: imgAppAdaptationSelected,
        iconUnselected: imgAppAdaptationUnelected,
        stepName: '应用适配',
        desc: '基于迁移评估结果，适配修改和验证不兼容SQL，支持修改应用程序源文件',
        href: '/zh/migration/case/index.html#app-adaptation',
        detail: [
          {
            title: '测试数据预置',
            desc: '基于数据库画像中的对象信息，模拟生成测试对象和数据，或从源库导入测试数据',
            showLine: false,
          },
          {
            title: '修改/验证SQL',
            desc: '根据兼容性评估结果，修改验证不兼容SQL',
            showLine: false,
          },
          {
            title: '应用修改',
            desc: '根据兼容性评估和SQL修改情况，修改应用程序源文件',
            showLine: false,
          },
        ],
      },
      {
        id: 'migration-data',
        iconSelected: imgMigrationDataSelected,
        iconUnselected: imgMigrationDataUnselected,
        stepName: '数据迁移',
        desc: '确定组网，实施对象和数据迁移',
        href: '/zh/migration/case/index.html#migration-data',
        detail: [
          {
            title: '组网部署',
            desc: '基于迁移评估中的硬件资源、部署方式、运行参数等完成数据库组网和部署',
            showLine: false,
          },
          {
            title: '预检查',
            desc: '检查数据库用户的读写权限、数据库的网络连接等',
            showLine: false,
          },
          {
            title: '对象迁移',
            desc: '',
            showLine: false,
            feature: '',
            features: [
              {
                icon: '1.',
                title: '迁移源库中的数据对象定义至目标库中',
                desc: '',
              },
              {
                icon: '2.',
                title: '目标库兼容源库的数据类型、SQL语法、字符集，针对不支持的能自动完成转换',
                desc: '',
              },
              {
                icon: '3.',
                title: '支持表、视图、用户、序列、索引、约束、触发器、函数、存储过程等',
                desc: '',
              },
            ],
          },
          {
            title: '对象校验',
            desc: '',
            showLine: false,
            feature: '',
            features: [
              {
                icon: '1.',
                title: '支持对表、索引、约束（包括主外键）、存储过程、触发器等数据对象的校验',
                desc: '',
              },
              {
                icon: '2.',
                title: '针对不一致的对象给出修复建议',
                desc: '',
              },
            ],
          },
          {
            title: '全量数据迁移',
            desc: '',
            showLine: false,
            feature: '',
            features: [
              {
                icon: '1.',
                title: '迁移源库表的全量数据至目标库对应的表中',
                desc: '',
              },
              {
                icon: '2.',
                title: '支持按表并行迁移，支持大表分片迁移',
                desc: '',
              },
              {
                icon: '3.',
                title: '目标库兼容源库数据，针对不支持的数据类型自动完成转换',
                desc: '',
              },
            ],
          },
          {
            title: '全量数据校验',
            desc: '',
            showLine: false,
            feature: '',
            features: [
              {
                icon: '1.',
                title: '校验源库和目标库中的全量数据',
                desc: '',
              },
              {
                icon: '2.',
                title: '支持多表并行校验，支持大表分片校验',
                desc: '',
              },
              {
                icon: '3.',
                title: '支持与全量数据迁移配合：采用源端迁移时导出的数据校验、表迁移后即进行校验，以此加快迁移整体速度、减少对源库的影响',
                desc: '',
              },
              {
                icon: '4.',
                title: '针对不一致的记录给出修复建议',
                desc: '',
              },
            ],
          },
          {
            title: '增量数据迁移',
            desc: '',
            showLine: false,
            feature: '',
            features: [
              {
                icon: '1.',
                title: '同步源库发生变化的数据至目标端数据库对应的表中，支持同步DML和DDL',
                desc: '',
              },
              {
                icon: '2.',
                title: '支持按事务并行迁移（实时一致性）和按表并行迁移（最终一致性）',
                desc: '',
              },
              {
                icon: '3.',
                title: ' 支持设置同步起始点（默认为全量数据迁移起始点）',
                desc: '',
              },
            ],
          },
          {
            title: '增量数据校验',
            desc: '',
            showLine: false,
            feature: '',
            features: [
              {
                icon: '1.',
                title: '周期校验增量数据',
                desc: '',
              },
              {
                icon: '2.',
                title: '针对不一致的记录给出修复建议',
                desc: '',
              },
            ],
          },
        ],
        requirement: [
          {
            title: '可维护性',
            desc: '整个过程的任务总量、进度、异常情况等可观测',
          },
          {
            title: '性能',
            desc: '全量迁移1TB/小时、增量迁移3万TPS、全量校验250GB/小时',
          },
          {
            title: '可靠性',
            desc: '全量迁移、增量迁移等支持断点续传，增量迁移支持在任意快照点重新启动',
          },
          {
            title: '并发',
            desc: '支持同时启动多个迁移任务',
          },
          {
            title: '任务可编排',
            desc: '支持编排迁移任务，也支持独立运行单项任务',
          },
        ],
      },
      {
        id: 'test-running',
        iconSelected: imgTestRunningSelected,
        iconUnselected: imgTestRunningUnselected,
        stepName: '试运行',
        desc: '迁移流量到目标库，对目标库进行实际业务测试，修复故障、调优性能',
        href: '/zh/migration/case/index.html#test-running',
        detail: [
          {
            title: '试运行前检查',
            desc: '',
            showLine: false,
            feature: '',
            features: [
              {
                icon: '1.',
                title: '同步延迟检查、目标端增量日志检查',
                desc: '',
              },
              {
                icon: '2.',
                title: '确认同步追平',
                desc: '',
              },
              {
                icon: '3.',
                title: '停止正向同步',
                desc: '',
              },
              {
                icon: '4.',
                title: '执行数据库对象处理（删除临时对象）',
                desc: '',
              },
            ],
          },
          {
            title: '流量镜像',
            desc: 'Attach到业务进程，镜像业务流量到目标库',
            showLine: false,
          },
          {
            title: '故障修复',
            desc: '监控目标库运行，修复故障',
            showLine: false,
          },
          {
            title: '性能调优',
            desc: '监控目标库运行，调优性能，慢SQL优化',
            showLine: false,
          },
        ],
      },
      {
        id: 'produce',
        iconSelected: imgProduceSelected,
        iconUnselected: imgProduceUnselected,
        stepName: '生产割接',
        desc: '启动反向迁移，业务割接到目标数据库',
        href: '/zh/migration/case/index.html#produce',
        detail: [
          {
            title: '切换前检查',
            desc: '',
            showLine: false,
            feature: '',
            features: [
              {
                icon: '1.',
                title: '切换预检查：同步延迟、源端迁移用户写权限、目标端增量日志',
                desc: '',
              },
              {
                icon: '2.',
                title: '确认源端停写',
                desc: '',
              },
              {
                icon: '3.',
                title: '确认同步追平',
                desc: '',
              },
              {
                icon: '4.',
                title: '停止正向同步',
                desc: '',
              },
              {
                icon: '5.',
                title: '执行数据库对象处理（删除临时对象）',
                desc: '',
              },
            ],
          },
          {
            title: '反向迁移',
            desc: '',
            showLine: false,
            feature: '',
            features: [
              {
                icon: '1.',
                title: '从目标库到源库的实时增量同步，保障业务数据回流至原源库',
                desc: '',
              },
              {
                icon: '2.',
                title: '支持按表并行迁移（最终一致性）',
                desc: '',
              },
              {
                icon: '3.',
                title: '支持设置同步起始点',
                desc: '',
              },
              {
                icon: '4.',
                title: '可维护性、可靠性等要求同数据迁移',
                desc: '',
              },
            ],
          },
          {
            title: '数据校验',
            desc: '',
            showLine: false,
            feature: '',
            features: [
              {
                icon: '1.',
                title: '周期校验增量数据',
                desc: '',
              },
              {
                icon: '2.',
                title: '针对不一致的记录给出修复建议',
                desc: '',
              },
            ],
          },
          {
            title: '数据校验',
            desc: '生产割接，目标库上线',
            showLine: false,
          },
        ],
      },
    ],
  },
  video: {
    title: '视频演示',
    list: [
      {
        title: '迁移评估',
        href: `${LEARN_VIDEO_LINK}/迁移评估.mp4`,
      },
      {
        title: 'MySQL迁移',
        href: `${LEARN_VIDEO_LINK}/MySQL迁移.mp4`,
      },
    ],
  },
  practice: {
    title: '最佳实践',
    list: [
      {
        title: '中国移动',
        desc: '中移在线的工程师们将目光聚焦在openGauss数据库上。中移在线20个…',
        caseHref: `${ATOMGIT_LINK}/opengauss/website/blob/feature_migration_new/app/zh/migration/user-cases/index.md`,
        officalHref: 'http://online.10086.cn/official/new/index/#/home/index',
      },
    ],
  },
  interactive: {
    title: '专区互动',
    list: [
      {
        title: 'openGauss 迁移互动专区',
        desc: '前往迁移互动专区，参与lssue问答',
        href: `${ATOMGIT_LINK}/opengauss/openGauss-workbench`,
      },
    ],
  },
};
