---
title: 合众人寿
category: showcase
industry: 金融
company: 合众人寿
summary: MogDB 全方位护航公司合规工作管理平台和风险管理系统
officialPath: https://www.unionlife.com.cn/
detail: true
id: Finance
---

## 应用场景

合众人寿是中国十大寿险公司之一。截至 2020 年，公司服务客户总量达 8112 万人。为提升公司应对新业务挑战和各类风险的能力，合众人寿开始进行数据库改造。本次改造主要涉及合规工作管理平台和风险管理系统。

## 解决方案

<div class='solve-method'>
    <div class='text'>
    以合规工作管理平台为例，平台采用“一主一备”架构，利用MogDB 配套的异构数据库迁移工具 MTK 实现全量数据的高速导入，完成对平台使用的 Oracle 的替换。kettle工具向核心业务系统的Oracle 数据库做数据双向同步，同时向CIF系统的Oracle 数据库做单向数据同步；MogDB 的高可用管理软件 MogHA 保障了数据库主备集群高可用；BRM 备份恢复工具对 MogDB 数据库的集中式备份和恢复管理工作提供了强有力的支撑。
    </div>
<div class="case-img">
    <img src="./f1.png"/>
</div>
</div>

## 客户收益

• 系统整体运行平稳，部分SQL执行效率甚至超过原有环境，保障了合众人寿的服务水平。

• MogDB 数据库及其配套工具简单易用，不仅满足了合众人寿确立的数据库替代需求，也实现了对流水、客户信息等海量数据进行高效处理的目标。

## 合作伙伴

<div class=logo>
    <img src="./yunheenmo.png"/>
    <img src="./mogdb.png"/>
</div>
