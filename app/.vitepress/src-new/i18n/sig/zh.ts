export default {
  sigCenter: 'SIG中心',
  sigApplicationProcess: 'SIG申请指南',
  intro: {
    title: '欢迎参与SIG',
    subTitle1: '了解SIG运转',
    desc1:
      'SIG是openGauss社区管理运营的最小单位，由社区开发者组成并独立运作。每个SIG围绕一个或多个技术主题成立，负责管理相关代码仓库，并通过参与社区项目推动技术落地和持续创新。',

    subTitle2: '进行SIG交流',
    desc2:
      '在SIG团队项目代码仓的README.md文件中，可以找到该项目所属的SIG信息和联系方式，欢迎通过邮件列表、公开例会及README.md 文件中提到的联系方式积极参与SIG交流',
    createMeeting: '创建会议',

    subTitle3: '参与SIG贡献',
    desc3: [
      'openGauss社区诚邀开发者、技术爱好者及行业专家加入协作生态。您可通过代码提交、文档完善、功能测试等多种形式参与社区建设。',
      '社区为贡献者提供清晰指引，具体详情请查看',
    ],
    sigContributeGuide: 'SIG贡献指南',
  },
  understand: {
    title: '了解SIG',
    title1: 'SIG角色说明',
    desc1:
      '在openGauss社区，开发者主要通过参与SIG（Special Interest Group）来贡献自己的力量。无论Contributor、Committer、Maintainer，都是社区重要的贡献者角色，他们的主要区别在于参与的SIG治理范围不同。',
    title2: 'SIG会议指南',
    desc2:
      'openGauss SIG会议是SIG的核心活动之一，通过定期地召开会议，SIG成员可进行技术方案审议、开发进度对齐、技术问题答疑及未来路线规划等，从而推动SIG组的持续创新。',
    title3: 'SIG申请流程',
    desc3: '当你和你的朋友有了非常好的技术idea，并且希望更多的人参与到你们的探索中，那么你就可以申请成立一个新的SIG了。',
    viewApplicationProcess: '查看具体申请流程',
    apply1: '创建',
    apply2: '填写信息',
    apply3: '配置',
    apply4: '提交PR',
    apply5: '发送申请',
    apply6: '改进',
  },
  vigor: {
    contributor: '贡献者',
    download: '下载量',
    company: '单位会员',
  },
  roles: {
    title: '角色说明',
    contributor: '贡献者',
    contributorDesc: ['职责：通过代码开发、问题修复和文档完善等方式推动社区发展', '要求：理解社区技术，遵守社区规范，积极参与社区贡献'],
    committer: '审核者',
    committerDesc: [
      '职责：通过细致的代码评审帮助提升社区代码质量，同时以自身贡献带动社区共同进步',
      '要求：具备丰富项目经验，熟悉代码规范，能够提供建设性意见并乐于分享经验',
    ],
    maintainer: '维护者',
    maintainerDesc: [
      '职责：把握技术方向并推动关键决策，通过关键领域的贡献领导社区的长期发展',
      '要求：深入理解项目架构，善于协作沟通，认同开源精神并长期引领社区成长',
    ],
    newContributors: '新的贡献者',
    welcomNewContributors: '欢迎新成员加入社区。我们有关于如何开始贡献的指导文档请参考：',
    contributorGuide: 'openGauss 贡献者指南',
    existingMembers: '既有社区成员',
    existingMembersDesc1: '既有的社区成员应认可社区导向，遵守',
    codeOfConduct: 'openGauss 社区的行为守则',
    existingMembersDesc2: '，熟悉社区运作机制和技术能力。',
    contributorTitle: '贡献者 Contributor',
    contributorSubTitle: '贡献者是openGauss社区的核心力量，他们通过代码开发、文档完善、问题修复、社区运营等多种方式积极参与，共同推动项目的创新与发展。',
    joinRequirement: '加入要求',
    responsibilityAndRights: '责任与权益',
    contributorRequirements: [
      '已注册代码托管平台账号',
      '为 SIG 或社区做出多方面贡献，包括不限于：在代码托管平台上提交或审核PR；在代码托管平台上对问题进行归档或评论；参与 SIG 或社区讨论',
      '积极参与 1 个或多个 SIG',
    ],
    contributorResponsibility: [
      '响应被分配的问题和PR',
      '对贡献的代码负责，保证贡献的代码：经过良好的测试；能够让测试用例始终通过，并保证DT覆盖率满足社区要求；解决后继发生的错误或问题',
      '负责具体实现设计，并通过 SIG 评审',
      '获得成为 SIG 审核者 Committer 的权利',
    ],

    committerTitle: '审核者 Committer',
    committerSubTitle:
      '审核者是代码仓库的核心维护者，拥有代码合入权限。他们凭借丰富的技术经验，通过代码评审、开发者测试和规范检查等方式保障代码质量，并推动数据库的技术演进与长期健康发展。',
    committerRequirements: [
      '作为贡献者至少 3 个月',
      '作为主要审阅者至少参与了 6 次 PR 的审阅',
      '审阅或合并至少 20 个基本 PR 到代码库',
      '熟悉代码库',
      '可以自我提名，或由该 SIG 的审核者 Committer 或维护者 Maintainer 提名，并在SIG会议通过',
    ],
    committerResponsibility: [
      '评审 PR：对 Contributor 提交的 PR 完成评审，基于代码的设计、实现、安全性、可扩展性、兼容性等维度给出公正客观的评价；评审可参考社区的开发规范和安全编程指南',
      '如有对外接口或 API 变更，通知可能受影响的 SIG：提前至少一周发送变更告警，说明兼容性影响，确保相关 SIG 有充足时间响应',
      '更新和维护组件版本：遵守社区版本更新质量控制策略，与 openGauss 社区版本里程碑保持一致',
      '熟知社区开发流程，指导 Contributor 按照社区流程完成代码贡献，保障开发流程的正确执行',
      '看护组件的软件工程能力，在 SIG 组中建立良好的软件工程文化；看护组件的代码实现设计，确保特性设计的合理性',
      '安全漏洞响应：持续关注 CVE 及安全公告，及时修复并通知受影响组件的相关 SIG',
      '获得成为 SIG 维护者 Maintainer 的权利。',
      '成为 SIG 内多个代码仓的审查者，积极参与 SIG 技术规划和架构演进，即可以成为 SIG 的维护者 Maintainer',
    ],

    maintainerTitle: '维护者 Maintainer',
    maintainerSubTitle:
      '维护者是SIG组的核心领导者，负责技术方向规划、社区协作和长期发展。他们不仅具备审核者的所有职责，还主导组件的架构演进、质量保障和生态适配，并通过协调社区内外资源推动SIG目标的实现。',
    maintainerRequirements: [
      '作为审核者至少 3 个月',
      '作为主要审核者至少参与了12次PR的审阅',
      '审阅或合并至少 30 个基本 PR 到代码库',
      '深刻理解SIG核心代码库',
      '可以自我提名，也可以由本 SIG 维护者 Maintainer 提名，并且没有其他 维护者 Maintainer 的反对，并在TC会议通过',
    ],
    maintainerResponsibility: [
      '确定 SIG 所负责项目的技术路线：包括规划和决策 SIG 技术方向、路标规划、架构演进',
      '制定 SIG 所负责项目的发布计划：确定 SIG 的关键需求和发布计划；参与社区的 PM 活动，并协调 SIG 计划和社区版本的里程碑时间表匹配',
      '参与社区协调活动：作为 SIG 的代表参与 openGauss 组织的活动和特定会议等',
      '召集 SIG 会议：定期召集 SIG 会议，决策 SIG 内上升的争议',
      '代表 SIG 参加技术委员会，汇报 SIG 工作和进展',
      '评估社区贡献者的贡献质量与活跃度，决策是否将其晋升为 Committer',
      '获得可参与技术委员会委员选举的权利',
      '担任 Maintainer 期间贡献突出者，有机会参与技术委员会委员选举',
    ],
  },
};
