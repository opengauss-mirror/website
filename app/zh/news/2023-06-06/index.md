---
title: 'openGauss社区五月运作报告'
date: '2023-06-06'
tags: ['theme']
category: 'news'
banner: '/category/news/2023-06-06/banner.png'
author: 'openGauss'
summary: 'openGauss社区五月运作报告'
---

前言：五月，openGauss社区在北京举办了一年一度的开发者大会，汇报社区最新的技术创新进展、生态进展与商业实践成果，同期社区开展了多个闭门会议，SIG工作组会议，规划未来社区工作治理方向，社区工作事项分工等。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-06-06/banner.png" style="width: 50%"></div>

### 社区活力

#### 社区下载量、贡献者持续增长

openGauss开源三周年，社区高速发展。截止5月31日，已有将近280家企业加入社区，openGauss下载量达到180w, 遍及113个国家的1512个城市。开发者数量从200余人，增长到将近5000人，增长超过20倍，社区代码总行数从350万行增长到1500多万行，增长了4倍多。累计产生12K+ Issue、11.7K+ PR、191.9K+Comment. openGauss社区的活力与创新力可见一斑。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-06-06/pic1.png" style="width: 50%"></div>


### 社区治理

#### 社区理事会

5月25日，召开了理事会闭门会议，在openGauss社区重点工作、oGSP认证评审、社区LTS版本生命周期管理等做了相关探讨。

openGauss社区重点工作：2022年openGauss在中国非云集中式数据库新增市场中占有率突破10%。社区生态快速发展，将近280家企业加入社区。openGauss 5.0.0版本在3月30日正式发布，支持资源池化、数据全生命周期管理等特性，持续打造openGauss技术竞争力

oGSP认证评审：oGSP伙伴服务能力认证评审流程和评审维度，公布第一批次oGSP伙伴服务能力认证的结果。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-06-06/pic2.jpg" style="width: 50%"></div>


#### 社区用户委员会

5月25日，在北京线下召开了用户委员会闭门会议，对信息技术应用创新结合开源社区共同发展、社区案例集更新及用户发展做了讨论。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-06-06/pic3.jpg" style="width: 50%"></div>


#### 社区技术委员会

5月25日, 在北京线下线上同步召开了技术委员会闭门会议，对CM容器化部署问题、支持固定Error Code的需求、社区文档缺失问题等展开了讨论。

CM容器化部署问题:该问题是由于容器环境引起，在权限、IP端口等方面与物理机不符。方案经过初步讨论，可以尝试做环境模板化、支持虚拟IP能力等方向进行探索，后续可在Cloud-Native SIG进行方案细化与研讨，最终落地。

支持固定Error Code的需求：已初步有相关方案，落地需要修改和整理的代码量大，计划在方案成熟后，由相关同事在TC分享，进而给出落地节奏。

其他问题讨论：文档进行差异化整理，后面DOC SIG组织开发者形成合力，统一完善文档；对于其他问题，如出口默认参数推荐、AP能力等，做了初步交流，后续在相关SIG中，可以由Issue跟踪，如果方案评审和把关，可在TC申报议题进一步做决策。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-06-06/pic4.jpg" style="width: 50%"></div>


#### 社区品牌委员会

26日，品牌委员会线下闭门会议召开，重点讨论了openGauss声量报告、openGauss案例集收集及刷新频率、openGauss年度大型活动规划等内容。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-06-06/pic5.jpg" style="width: 50%"></div>

### 技术进展

**SIG-SQLEngine** 

组织两次线上SIG会议，评审支持signal和resignal、定时任务适配grant、支持多字符集字符序、实现get diagnostics等特性，及讨论多个优化及问题修复方案。开发者大会组织线下SIG会议，讨论基础算子性能优化，针对行存复杂查询、向量化执行引擎结合的优化；以及最新的兼容性策略讨论，对不同兼容模式下的公共资源的隔离等问题。

**SIG-CloudNative**

基于公有云构建openGauss数据库RDS；容器环境数据库镜像升级

**SIG-AI**

DBMind平台需要在使用体验上的改进项及DBMind未来的演进思路、ABO的演进思路、 DB4AI的需求场景

**SIG-Docs**

Docs文档逻辑与细粒度增强从何时开始，如何使用自动化工具看护文档质量，如何保证文档内容的准确性以及用例的可操作性

**SIG-Plugin**

dolphin轻量版版本基于cmake的编译测试checkin；show open tables+storage engines+slave status需求 checkin评审

**SIG-Tools** 

Datakit增加opengauss第三方双向同步能力;jdbc增加java6和java7的特性分支；【迁移工具】全量迁移工具支持读取csv文件用于数据迁移特性设计说明书完善改进；【迁移工具】MySQL迁移工具适配内核兼容性特性设计说明书完善改进

**SIG-Graph** 

存储方式由表存储改为kv存储的复杂度分析。og5的优化器与存储引擎对图数据库查询性能的影响。升级og5的优化器与存储引擎的复杂度分析


### 社区大事件

**首批基于openGauss发行版数据库一体机发布**

为了更好地满足行业细分场景的需求，充分发挥openGauss数据库和鲲鹏硬件软硬协同的优势，openGauss社区将联合伙伴推出“全栈可信”、“全栈安全”、“开箱即用”、“极简运维”的数据库一体机解决方案。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-06-06/pic6.jpg" style="width: 50%"></div>

**openGauss伙伴专业保障服务发布**

oGSP全称为openGauss Service Partner（openGauss服务伙伴），为促进openGauss社区服务体系良性发展和生态繁荣，保证客户的项目交付质量及满意度，加强核心伙伴与openGauss社区的合作，openGauss社区围绕服务内容、服务体系、服务承诺、项目经验四个维度对社区服务伙伴进行考核，通过openGauss社区服务商能力评估，即可作为社区推荐的优质服务伙伴。具体详情可登录官网查看：<https://opengauss.org/zh/ogsp/>

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-06-06/pic7.jpg" style="width: 50%"></div>

### 社区活动

**鲲鹏开发者峰会2023 openGauss技术专场：**

2023年5月6日，“鲲鹏开发者峰会2023 openGauss技术专场”上，openGauss相关专家和伙伴围绕openGauss社区进展、openGauss5.0版本技术创新，基于openGauss版本的成果及落地实践等进行了精彩分享。openGauss社区秘书长、openGauss开源数据库总经理胡正策为本场技术专题发表了致辞, 他表示：openGauss经过三年发展，已经在十个关键基础设施行业核心场景规模应用，2023年将加速突破生态拐点，助力行业数字化转型，成为新的超级生态节点。

**开源之夏2023 openGauss项目**

openGauss社区深度参与开源之夏2023活动，发布12个openGauss相关项目，目前导师正在进行审核，将在6月26日公示中选名单，敬请关注。

openGauss社区主页：<https://summer-ospp.ac.cn/org/orgdetail/c9ee799a-2a71-4fba-8c78-e5ac57bcdba8?lang=zh>


**openGauss Developer Day 2023**

5月25日-26日，以“聚数成峰，共赢未来”为主题的 openGauss Developer Day 2023（openGauss开发者大会2023）在北京成功举办。本届大会在中国计算机学会、国家工业信息安全发展研究中心指导下，由openGauss开源社区主办，联合海量数据、云和恩墨、南大通用共同举办。本次大会也记录了开源数据库根社区openGauss的多个精彩瞬间：

社区技术创新：openGauss 5.0.0版本特性解读、内核与架构双引擎驱动，推出DataPod+DataKit组合和第三代智能优化器ABO，打造全新的数据底座

社区优秀实践：邮储银行、中国移动、民生银行、上交所、海量数据、云和恩墨、南大通用、沃趣科技、时代亿信等伙伴的商业实践及成果秀

社区开发者荣耀时刻：openGauss的发展，离不开社区每一位贡献者在社区的专业和辛勤付出。为了激励开发者们，此次大会上选出5个优秀SIG组，10个优秀个人开发者。

社区工作会议：作为openGauss开发者大会的重要环节，16个 SIG组规划工作会议同步召开，线下集中讨论未来社区需求、规划、技术方向、工作事项等，相关详情可见：<https://etherpad.opengauss.org/p/ODD2023-SIG-Meeting>
