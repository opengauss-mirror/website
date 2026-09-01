---
title: '如何在 openGauss 社区成立一个 SIG'
category: sig-apply
goBackUrl: /zh/sig/sig-list
---

<script setup>
import { OLink } from '@opensig/opendesign';
</script>

# **如何在 openGauss 社区成立一个 SIG**

在开源社区中，SIG（Special Interest Group，专项兴趣小组） 是承载具体技术方向、持续产出代码与决策的核心组织单元。截至目前，openGauss 社区已经孵化了 SQLEngine、StorageEngine、AI、Security、CloudNative 等 20 余个 SIG，覆盖了内核、工具链、安全、AI 等各个技术领域。

如果你发现某个技术方向在现有 SIG 中找不到归属，或者希望围绕一个新主题聚集一批长期贡献者，那么"成立一个新 SIG"可能就是你需要的答案。本文将完整介绍 openGauss 社区 SIG 的成立流程。

## **一、总则**

**在正式发起 SIG 申请之前，建议先做两件事：**

1. **查阅现有 SIG 列表**，确认没有已存在的 SIG 可以覆盖你的诉求（列表见文末，或查看 <OLink color="primary" href="https://atomgit.com/opengauss/tc/blob/master/sigs/README.md" target="_blank" rel="noopener noreferrer">tc 仓库 sigs/README.md</OLink>）。如果方向已被某个 SIG 覆盖，优先考虑加入而非新建，避免社区治理单元过度碎片化。

2. **提前在社区内公开讨论**，比如在 openGauss 邮件列表、论坛或线上会议中抛出你的提案。这样做的好处是：

- 让潜在的 Maintainer / Committer 提前了解并加入；
- 收集社区反馈，明确 SIG 的职责边界和目标；
- 为后续技术委员会（TC）评审积累共识，提高通过效率。

SIG 的成立、撤销、合并等事务，最终都由 **技术委员会（TC）决策**。TC 是 openGauss 社区的技术管理机构，拥有技术决策的最终裁决权，也负责监督各 SIG 的日常运作（详见 <OLink color="primary" href="https://atomgit.com/opengauss/tc/blob/master/README.md" target="_blank" rel="noopener noreferrer">tc 仓库 README</OLink>）。

## **二、角色说明**

一个 SIG 通常由三类角色构成：

| 角色 | 主要职责 | 准入条件 |
| --- | --- | --- |
| Contributor | 项目贡献者，认领Isssue 和 PR 并在 PR 提交前完成测试 | 完成 CLA 签署的 openGauss 社区注册成员即可 |
| Committer | 项目代码审核者，分配Issue与PR，并审核代码的质量和正确性 | SIG 的积极贡献者，经验丰富，愿意投入精力参与到审核工作 |
| Maintainer | 项目Owner，确定SIG所负责项目的技术路线并制定项目的发布计划 | 经验丰富，富有责任心、出色的技术能力和管理能力 |

## **三、申请步骤**

openGauss 的 SIG 治理数据统一归档在 <OLink color="primary" href="https://atomgit.com/opengauss/tc" target="_blank" rel="noopener noreferrer">`opengauss/tc`</OLink> 仓库的 sigs/ 目录下，每个 SIG 对应一个独立的子目录。具体步骤如下：

### **步骤一：Fork tc 仓库，基于模板创建你的 SIG 目录**

```txt
git clone https://atomgit.com/${你的AtomGitID}/tc
cd ./tc/sigs
cp -r Template ${你的SIG名称}
cd ${你的SIG名称}
```

**sigs/Template** 目录已经提供了标准模板 **（README.md、OWNERS）**，直接复制后按需修改即可。

### **步骤二：完成新SIG README内容的填写**

打开新创建sig目录下的README.md文件，按照推荐完成必选内容的填写。

- **SIG 名称与职责范围**：本 SIG 负责 openGauss 社区哪个模块的开发和维护；
- **例会安排**：建议的公开会议时间（如""北京时间双周三下午 14:00~16:00""），并订阅 <OLink color="primary" href="/zh/online-communication/">openGauss 在线交流</OLink> 获取会议通知；
- **会议纪要归档方式**（如 etherpad 链接）；
- **成员列表**：Maintainer / Committer 的姓名、AtomGit ID、邮箱；
- **联系方式**：邮件列表地址 **（yoursig@opengauss.org）**；
- **仓库清单**：本 SIG 计划托管/维护的代码仓（如申请时已有明确仓库）。

### **步骤三：编写 sig-info.yaml，声明成员与仓库信息**

请在sig-info.yaml文件中完成对SIG成员的配置

```txt
vi sig-info.yaml
```

### **步骤四：提交 Pull Request**

将以上修改提交到 AtomGit，向 <OLink color="primary" href="https://atomgit.com/opengauss/tc" target="_blank" rel="noopener noreferrer">`opengauss/tc`</OLink> 仓库发起 Pull Request。

### **步骤五：向技术委员会发送邮件申请**

给 TC 邮件列表 <OLink color="primary" href="mailto:tc@opengauss.org">tc@opengauss.org</OLink> 发送邮件，标题建议注明""新 SIG 提案 + SIG 名称""，正文附上步骤四提交的 PR 链接，方便 TC 委员快速定位评审内容。

### **步骤六：TC 评审与决策**

**评审通过后，TC 通过合并 Pull Request 的方式正式批准 SIG 成立**，随后社区基础设施完成相关代码仓、相关角色权限的自动化配置。

如果你已经有明确的技术方向、一群志同道合的贡献者，也做好了长期投入的准备，欢迎参照以上流程发起你的 SIG 提案。有任何疑问，可随时邮件 tc@opengauss.org联系技术委员会。

期待在 openGauss 社区看到更多因你而生的 SIG。
