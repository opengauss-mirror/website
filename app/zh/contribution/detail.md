---
title: '社区贡献'
---

<script setup>
import BannerLevel2 from '@/components/BannerLevel2.vue'
import ContributionTab from "@/views/contribution/ContributionTab.vue";

import banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/contribution.png';
</script>

<ClientOnly>
  <BannerLevel2
    :background-image="banner"
    title="社区贡献"
    :illustration="illustration"
/>
</ClientOnly>
<ContributionTab />
<div class='contribution-markdown '>
<div class='markdown '>

openGauss 是一个开源社区，完全依赖于社区提供友好的开发和协作环境。

在参与社区贡献之前，请先阅读并遵守[openGauss 社区行为守则](https://gitee.com/opengauss/community/blob/master/code-of-conduct.md)。

## 1. 注册 Gitee 账号

openGauss 源代码托管在码云（Gitee）：<https://gitee.com/opengauss>

请参考<https://gitee.com/help/articles/4113>注册您的码云（Gitee）账户，并在<http://gitee.com/profile/emails>设置您的主邮箱。

## 2. 签署 CLA

在参与社区贡献前，您还需要签署[openGauss 社区贡献者许可协议（CLA）](https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZ2F1c3M=)。

## 3. 找到您感兴趣的 SIG

openGauss 社区按照不同的 SIGs（Special Interest Groups）来组织，以便于更好的管理和改善工作流程。
SIG 是开放的，欢迎任何人加入并参与贡献。每一个 SIG 在码云（Gitee）上拥有一个或多个代码仓库。
您可以在 SIG 对应的代码仓库上提交 Issue，参与 Issue 讨论，提交 Pull Request，参与代码检视等。
您可以从如下的 SIG 列表中找到您感兴趣的 SIG。

| SIG 名称                                                                                 | 职责范围                                                                                              | 订阅邮件列表                                                                                                        |
| :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| [SQLEngine](https://gitee.com/opengauss/tc/tree/master/sigs/SQLEngine)                   | 负责 openGauss 社区 SQL 引擎的开发和维护。                                                            | [sqlengine@opengauss.org](https://mailweb.opengauss.org/postorius/lists/sqlengine@opengauss.org/)                   |
| [StorageEngine](https://gitee.com/opengauss/tc/tree/master/sigs/StorageEngine)           | 负责 openGauss 社区存储引擎的开发和维护。                                                             | [storageengine@opengauss.org](https://mailweb.opengauss.org/postorius/lists/storageengine@opengauss.org/)           |
| [Connectors](https://gitee.com/opengauss/tc/tree/master/sigs/Connectors)                 | 负责 openGauss 社区 Connectors 的开发和维护。                                                         | [connectors@opengauss.org](https://mailweb.opengauss.org/postorius/lists/connectors@opengauss.org/)                 |
| [Tools](https://gitee.com/opengauss/tc/tree/master/sigs/Tools)                           | 负责 openGauss 社区工具的开发和维护。                                                                 | [tools@opengauss.org](https://mailweb.opengauss.org/postorius/lists/tools@opengauss.org/)                           |
| [Docs](https://gitee.com/opengauss/tc/tree/master/sigs/Docs)                             | 负责 openGauss 社区文档的开发和维护。                                                                 | [docs@opengauss.org](https://mailweb.opengauss.org/postorius/lists/docs@opengauss.org/)                             |
| [Infra](https://gitee.com/opengauss/tc/tree/master/sigs/Infra)                           | 负责 openGauss 社区基础设施的开发和维护。                                                             | [infra@opengauss.org](https://mailweb.opengauss.org/postorius/lists/infra@opengauss.org/)                           |
| [Security](https://gitee.com/opengauss/tc/tree/master/sigs/Security)                     | 负责 openGauss 社区安全的开发和维护。                                                                 | [securities@opengauss.org](https://mailweb.opengauss.org/postorius/lists/securities@opengauss.org/)                 |
| [OM](https://gitee.com/opengauss/tc/tree/master/sigs/OM)                                 | 负责 openGauss 安装部署的开发和维护。                                                                 | [om@opengauss.org](https://mailweb.opengauss.org/postorius/lists/om@opengauss.org/)                                 |
| [IoT](https://gitee.com/opengauss/tc/tree/master/sigs/IoT)                               | 负责 openGauss IoT 开发和维护。                                                                       | [iot@opengauss.org](https://mailweb.opengauss.org/postorius/lists/iot@opengauss.org/)                               |
| [In-place Update](https://gitee.com/opengauss/tc/tree/master/sigs/In-place-Update)       | 负责 openGauss 社区 in-place update 引擎的开发和维护。                                                | [inplaceupdate@opengauss.org](https://mailweb.opengauss.org/postorius/lists/inplaceupdate@opengauss.org/)           |
| [AI](https://gitee.com/opengauss/tc/tree/master/sigs/AI)                                 | 负责 openGauss 社区 AI 的开发和维护。                                                                 | [ai@opengauss.org](https://mailweb.opengauss.org/postorius/lists/ai@opengauss.org/)                                 |
| [GIS](https://gitee.com/opengauss/tc/tree/master/sigs/GIS)                               | 负责 openGauss 社区地理信息系统的开发和维护。                                                         | [gis@opengauss.org](https://mailweb.opengauss.org/postorius/lists/gis@opengauss.org/)                               |
| [CloudNative](https://gitee.com/opengauss/tc/tree/master/sigs/CloudNative)               | 负责 openGauss 社区云原生方向的开发和维护。                                                           | [cloudnative@opengauss.org](https://mailweb.opengauss.org/postorius/lists/cloudnative@opengauss.org/)               |
| [SecurityTechnology](https://gitee.com/opengauss/tc/tree/master/sigs/SecurityTechnology) | 负责 openGauss 社区数据库安全技术的开发和维护。                                                       | [securitytechnology@opengauss.org](https://mailweb.opengauss.org/postorius/lists/securitytechnology@opengauss.org/) |
| [Certification](https://gitee.com/opengauss/tc/tree/master/sigs/Certification)           | 负责 openGauss 认证流程、测试套件的定义和开发。                                                       | [certification@opengauss.org](https://mailweb.opengauss.org/postorius/lists/certification@opengauss.org/)           |
| [Plugin](https://gitee.com/opengauss/tc/tree/master/sigs/Plugin)                         | 负责 openGauss 插件机制的规划、管理、开发等。                                                         | [plugin@opengauss.org](https://mailweb.opengauss.org/postorius/lists/plugin@opengauss.org/)                         |
| [Blockchain](https://gitee.com/opengauss/tc/tree/master/sigs/Blockchain)                 | 探讨区块链的业务场景，研究区块链的核心技术问题。                                                      | [blockchain@opengauss.org](https://mailweb.opengauss.org/postorius/lists/blockchain@opengauss.org/)                 |
| [DCF](https://gitee.com/opengauss/tc/tree/master/sigs/DCF)                               | 负责 openGauss 社区分布式一致性框架 DCF 的开发和维护。                                                | [dcf@opengauss.org](https://mailweb.opengauss.org/postorius/lists/dcf@opengauss.org/)                               |
| [QA](https://gitee.com/opengauss/tc/tree/master/sigs/QA)                                 | 负责 openGauss 社区版本质量相关的开发和维护。                                                         | [QA@opengauss.org](https://mailweb.opengauss.org/postorius/lists/qa@opengauss.org/)                                 |
| [Graph](https://gitee.com/opengauss/tc/tree/master/sigs/SecurityTechnology)              | 负责 openGauss 社区统一存储和查询的知识图谱数据管理功能。                                             | [graph@opengauss.org](https://mailweb.opengauss.org/postorius/lists/graph@opengauss.org/)                           |
| [ReleaseManagement](https://gitee.com/opengauss/tc/tree/master/sigs/ReleaseManagement)   | 社区协同各 SIG maintainer,规划 openGauss 社区版本的发布工作，为最终的竞争力目标达成负责。             | [releasemanagement@opengauss.org](https://mailweb.opengauss.org/postorius/lists/releasemanagement@opengauss.org/)   |
| [CM](https://gitee.com/opengauss/tc/tree/master/sigs/CM)                                 | 为 opengauss 数据库提供了主备的状态监控、网络通信故障监控、文件系统故障监控、故障自动主备切换等能力。 | [cm@opengauss.org](https://mailweb.opengauss.org/postorius/lists/cm@opengauss.org/)                                 |
| [OPS](https://gitee.com/opengauss/tc/tree/master/sigs/OPS)                               | 聚焦 openGauss 维护能力建设，提升产品运维能力，总结和传递运维经验。                                   | [ops@opengauss.org](https://mailweb.opengauss.org/postorius/lists/ops@opengauss.org/)                               |
| [KnowledgeGraph](https://gitee.com/opengauss/tc/tree/master/sigs/KnowledgeGraph)         | 围绕知识图谱全生命周期：构建、存储管理与应用环节开展研究。                                            | [knowledgegraph@opengauss.org](https://mailweb.opengauss.org/postorius/lists/knowledgegraph@opengauss.org/)         |

### 感兴趣的 SIG 组还未出现？

新的 SIG 组等你来发起！欢迎发送申请邮件至：<tc@opengauss.org> ，邮件申请模板请参考<https://gitee.com/opengauss/tc/blob/master/sigs/Template/README.md> 。

## 4. 开始您的贡献

### 4.1 给自己分配 Issue

首先找到 openGauss 社区的 Issue 列表：<https://gitee.com/organizations/opengauss/issues>
如果您愿意处理其中的 Issue，您可以将它分配给自己。
只需要在评论框内输入`/assign`，机器人就会将问题分配给您。
每个 Issue 下面可能已经有参与者的交流和讨论，如果您感兴趣，也可以在评论框中发表自己的意见参与 Issue 讨论。

### 4.2 提交 Issue

如果您准备向社区上报 Bug 或者提交需求，请在 openGauss 社区对应的仓库上提交 Issue。
如果您不清楚 Bug 或者需求属于哪个仓库，请在 openGauss 社区[Community 仓库](https://gitee.com/opengauss/community)提交 Issue。
您也可以以 Issue 的方式为 openGauss 社区贡献自己的意见或建议。
提交 Issue 请参考[Issue 提交指南](https://gitee.com/opengauss/community/blob/master/contributors/issue-submit.md)。

### 4.3 提交 Pull Request

提交 Pull Request 请参考 openGauss 社区 Pull Request 提交指南。
如果一次提交的代码量较大，建议将大型的内容分解成一系列逻辑上较小的内容，分段进行提交会更便于代码检视。
如果您的 Pull Request 没有引起足够的关注，可以通过对应 SIG 的邮件列表或 IRC 频道求助。

### 4.4 检视代码

openGauss 作为一个开放的社区，我们希望所有参与社区的人都能成为活跃的检视者。
检视代码请参考[补丁审核的柔和艺术](https://sage.thesharps.us/2014/09/01/the-gentle-art-of-patch-review/)。

## 5. 社区角色

我们欢迎所有人参与 openGauss 社区贡献，我们的目标是发展一个由贡献者组成的活跃、健康的社区。关于 Maintainer、Committer 等社区角色，请参考[openGauss 社区角色介绍](https://gitee.com/opengauss/community/blob/master/community-membership.md)。

</div>

</div>
