---
title: '贡献攻略'
category: contribution
---

<script setup>
import '~@/assets/style/markdown.scss';
import { OLink } from '@opensig/opendesign';
</script>

<div class='contribution-markdown '>
<div class='markdown-new'>

openGauss 是一个开源社区，完全依赖于社区提供友好的开发和协作环境。

在参与社区贡献之前，请先阅读并遵守 <OLink href="https://atomgit.com/opengauss/community/blob/master/code-of-conduct.md" target="_blank" rel="noopener noreferrer" :hover-underline="true">openGauss 社区行为守则</OLink>。

## 1. 注册 AtomGit 账号

openGauss 源代码托管在AtomGit：<OLink href="https://atomgit.com/opengauss" target="_blank" rel="noopener noreferrer" :hover-underline="true">https://atomgit.com/opengauss</OLink>

请参考 <OLink href="https://docs.atomgit.com/docs/start/quick" target="_blank" rel="noopener noreferrer" :hover-underline="true">https://docs.atomgit.com/docs/start/quick</OLink> 注册您的AtomGit账户，并在 <OLink href="http://atomgit.com/setting/email" target="_blank" rel="noopener noreferrer" :hover-underline="true">http://atomgit.com/setting/email</OLink> 设置您的主邮箱。

## 2. 签署 CLA

在参与社区贡献前，您还需要签署 <OLink href="https://clasign.osinfra.cn/sign/gitee_opengauss-1614047760000855378?lang=zh" target="_blank" rel="noopener noreferrer" :hover-underline="true">openGauss 社区贡献者许可协议（CLA）</OLink>。

## 3. 找到您感兴趣的 SIG

openGauss 社区按照不同的 SIGs（Special Interest Groups）来组织，以便于更好的管理和改善工作流程。
SIG 是开放的，欢迎任何人加入并参与贡献。每一个 SIG 在AtomGit上拥有一个或多个代码仓库。
您可以在 SIG 对应的代码仓库上提交 Issue，参与 Issue 讨论，提交 Pull Request，参与代码检视等。
您可以从如下的 SIG 列表中找到您感兴趣的 SIG。

| SIG 名称                                                                                   | 职责范围                                                                                              | 订阅邮件列表                                                                                                        |
| :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/SQLEngine"  target="_blank" rel="noopener noreferrer" :hover-underline="true">SQLEngine</OLink>                   | 负责 openGauss 社区 SQL 引擎的开发和维护。                                                            |  <OLink href="https://mailweb.opengauss.org/postorius/lists/sqlengine@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">sqlengine@opengauss.org</OLink>                   |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/StorageEngine"  target="_blank" rel="noopener noreferrer" :hover-underline="true">StorageEngine</OLink>           | 负责 openGauss 社区存储引擎的开发和维护。                                                             |  <OLink href="https://mailweb.opengauss.org/postorius/lists/storageengine@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">storageengine@opengauss.org</OLink>           |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/Connectors"  target="_blank" rel="noopener noreferrer" :hover-underline="true">Connectors</OLink>                 | 负责 openGauss 社区 Connectors 的开发和维护。                                                         |  <OLink href="https://mailweb.opengauss.org/postorius/lists/connectors@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">connectors@opengauss.org</OLink>                 |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/Tools"  target="_blank" rel="noopener noreferrer" :hover-underline="true">Tools</OLink>                           | 负责 openGauss 社区工具的开发和维护。                                                                 |  <OLink href="https://mailweb.opengauss.org/postorius/lists/tools@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">tools@opengauss.org</OLink>                           |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/Docs"  target="_blank" rel="noopener noreferrer" :hover-underline="true">Docs</OLink>                             | 负责 openGauss 社区文档的开发和维护。                                                                 |  <OLink href="https://mailweb.opengauss.org/postorius/lists/docs@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">docs@opengauss.org</OLink>                             |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/Infra"  target="_blank" rel="noopener noreferrer" :hover-underline="true">Infra</OLink>                           | 负责 openGauss 社区基础设施的开发和维护。                                                             |  <OLink href="https://mailweb.opengauss.org/postorius/lists/infra@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">infra@opengauss.org</OLink>                           |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/Security"  target="_blank" rel="noopener noreferrer" :hover-underline="true">Security</OLink>                     | 负责 openGauss 社区安全的开发和维护。                                                                 |  <OLink href="https://mailweb.opengauss.org/postorius/lists/securities@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">securities@opengauss.org</OLink>                 |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/OM"  target="_blank" rel="noopener noreferrer" :hover-underline="true">OM</OLink>                                 | 负责 openGauss 安装部署的开发和维护。                                                                 |  <OLink href="https://mailweb.opengauss.org/postorius/lists/om@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">om@opengauss.org</OLink>                                 |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/IoT"  target="_blank" rel="noopener noreferrer" :hover-underline="true">IoT</OLink>                               | 负责 openGauss IoT 开发和维护。                                                                       |  <OLink href="https://mailweb.opengauss.org/postorius/lists/iot@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">iot@opengauss.org</OLink>                               |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/In-place-Update"  target="_blank" rel="noopener noreferrer" :hover-underline="true">In-place Update</OLink>       | 负责 openGauss 社区 in-place update 引擎的开发和维护。                                                |  <OLink href="https://mailweb.opengauss.org/postorius/lists/inplaceupdate@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">inplaceupdate@opengauss.org</OLink>           |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/AI"  target="_blank" rel="noopener noreferrer" :hover-underline="true">AI</OLink>                                 | 负责 openGauss 社区 AI 的开发和维护。                                                                 |  <OLink href="https://mailweb.opengauss.org/postorius/lists/ai@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">ai@opengauss.org</OLink>                                 |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/GIS"  target="_blank" rel="noopener noreferrer" :hover-underline="true">GIS</OLink>                               | 负责 openGauss 社区地理信息系统的开发和维护。                                                         |  <OLink href="https://mailweb.opengauss.org/postorius/lists/gis@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">gis@opengauss.org</OLink>                               |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/CloudNative"  target="_blank" rel="noopener noreferrer" :hover-underline="true">CloudNative</OLink>               | 负责 openGauss 社区云原生方向的开发和维护。                                                           |  <OLink href="https://mailweb.opengauss.org/postorius/lists/cloudnative@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">cloudnative@opengauss.org</OLink>               |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/SecurityTechnology"  target="_blank" rel="noopener noreferrer" :hover-underline="true">SecurityTechnology</OLink> | 负责 openGauss 社区数据库安全技术的开发和维护。                                                       |  <OLink href="https://mailweb.opengauss.org/postorius/lists/securitytechnology@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">securitytechnology@opengauss.org</OLink> |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/Certification"  target="_blank" rel="noopener noreferrer" :hover-underline="true">Certification</OLink>           | 负责 openGauss 认证流程、测试套件的定义和开发。                                                       |  <OLink href="https://mailweb.opengauss.org/postorius/lists/certification@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">certification@opengauss.org</OLink>           |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/Plugin"  target="_blank" rel="noopener noreferrer" :hover-underline="true">Plugin</OLink>                         | 负责 openGauss 插件机制的规划、管理、开发等。                                                         |  <OLink href="https://mailweb.opengauss.org/postorius/lists/plugin@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">plugin@opengauss.org</OLink>                         |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/Blockchain"  target="_blank" rel="noopener noreferrer" :hover-underline="true">Blockchain</OLink>                 | 探讨区块链的业务场景，研究区块链的核心技术问题。                                                      |  <OLink href="https://mailweb.opengauss.org/postorius/lists/blockchain@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">blockchain@opengauss.org</OLink>                 |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/DCF"  target="_blank" rel="noopener noreferrer" :hover-underline="true">DCF</OLink>                               | 负责 openGauss 社区分布式一致性框架 DCF 的开发和维护。                                                |  <OLink href="https://mailweb.opengauss.org/postorius/lists/dcf@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">dcf@opengauss.org</OLink>                               |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/QA"  target="_blank" rel="noopener noreferrer" :hover-underline="true">QA</OLink>                                 | 负责 openGauss 社区版本质量相关的开发和维护。                                                         |  <OLink href="https://mailweb.opengauss.org/postorius/lists/qa@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">QA@opengauss.org</OLink>                                 |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/Graph"  target="_blank" rel="noopener noreferrer" :hover-underline="true">Graph</OLink>                           | 负责 openGauss 社区统一存储和查询的知识图谱数据管理功能。                                             |  <OLink href="https://mailweb.opengauss.org/postorius/lists/graph@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">graph@opengauss.org</OLink>                           |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/ReleaseManagement"  target="_blank" rel="noopener noreferrer" :hover-underline="true">ReleaseManagement</OLink>   | 社区协同各 SIG maintainer,规划 openGauss 社区版本的发布工作，为最终的竞争力目标达成负责。             |  <OLink href="https://mailweb.opengauss.org/postorius/lists/releasemanagement@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">releasemanagement@opengauss.org</OLink>   |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/CM"  target="_blank" rel="noopener noreferrer" :hover-underline="true">CM</OLink>                                 | 为 opengauss 数据库提供了主备的状态监控、网络通信故障监控、文件系统故障监控、故障自动主备切换等能力。 |  <OLink href="https://mailweb.opengauss.org/postorius/lists/cm@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">cm@opengauss.org</OLink>                                 |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/OPS"  target="_blank" rel="noopener noreferrer" :hover-underline="true">OPS</OLink>                               | 聚焦 openGauss 维护能力建设，提升产品运维能力，总结和传递运维经验。                                   |  <OLink href="https://mailweb.opengauss.org/postorius/lists/ops@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">ops@opengauss.org</OLink>                               |
|  <OLink href="https://atomgit.com/opengauss/tc/tree/master/sigs/KnowledgeGraph"  target="_blank" rel="noopener noreferrer" :hover-underline="true">KnowledgeGraph</OLink>         | 围绕知识图谱全生命周期：构建、存储管理与应用环节开展研究。                                            |  <OLink href="https://mailweb.opengauss.org/postorius/lists/knowledgegraph@opengauss.org/"  target="_blank" rel="noopener noreferrer" :hover-underline="true">knowledgegraph@opengauss.org</OLink>         |

### 感兴趣的 SIG 组还未出现？

新的 SIG 组等你来发起！欢迎发送申请邮件至：<OLink :hover-underline="true" target="_blank" rel="noopener noreferrer" href="mailto:tc@opengauss.org">tc@opengauss.org</OLink> ，邮件申请模板请参考 <OLink :hover-underline="true" target="_blank" rel="noopener noreferrer" href="https://atomgit.com/opengauss/tc/blob/master/sigs/Template/README.md">https://atomgit.com/opengauss/tc/blob/master/sigs/Template/README.md</OLink> 。

## 4. 开始您的贡献

### 4.1 给自己分配 Issue

首先找到 openGauss 社区的 Issue 列表： <OLink :hover-underline="true" target="_blank" rel="noopener noreferrer" href="https://atomgit.com/org/opengauss/issues">https://atomgit.com/org/opengauss/issues</OLink>
如果您愿意处理其中的 Issue，您可以将它分配给自己。
只需要在评论框内输入`/assign`，机器人就会将问题分配给您。
每个 Issue 下面可能已经有参与者的交流和讨论，如果您感兴趣，也可以在评论框中发表自己的意见参与 Issue 讨论。

### 4.2 提交 Issue

如果您准备向社区上报 Bug 或者提交需求，请在 openGauss 社区对应的仓库上提交 Issue。
如果您不清楚 Bug 或者需求属于哪个仓库，请在 openGauss 社区 <OLink href="https://atomgit.com/opengauss/community" target="_blank" rel="noopener noreferrer" :hover-underline="true">Community 仓库</OLink> 提交 Issue。
您也可以以 Issue 的方式为 openGauss 社区贡献自己的意见或建议。
提交 Issue 请参考 <OLink href="https://atomgit.com/opengauss/community/blob/master/contributors/issue-submit.md" target="_blank" rel="noopener noreferrer" :hover-underline="true">Issue 提交指南</OLink>。

### 4.3 提交 Pull Request

提交 Pull Request 请参考 openGauss 社区 Pull Request 提交指南。
如果一次提交的代码量较大，建议将大型的内容分解成一系列逻辑上较小的内容，分段进行提交会更便于代码检视。
如果您的 Pull Request 没有引起足够的关注，可以通过对应 SIG 的邮件列表或 IRC 频道求助。

### 4.4 检视代码

openGauss 作为一个开放的社区，我们希望所有参与社区的人都能成为活跃的检视者。
检视代码请参考 <OLink href="https://sage.thesharps.us/2014/09/01/the-gentle-art-of-patch-review/" target="_blank" rel="noopener noreferrer" :hover-underline="true">补丁审核的柔和艺术</OLink>。

## 5. 社区角色

我们欢迎所有人参与 openGauss 社区贡献，我们的目标是发展一个由贡献者组成的活跃、健康的社区。关于 Maintainer、Committer 等社区角色，请参考 <OLink href="https://atomgit.com/opengauss/community/blob/master/community-membership.md" target="_blank" rel="noopener noreferrer" :hover-underline="true">openGauss 社区角色介绍</OLink> 。

</div>

</div>
