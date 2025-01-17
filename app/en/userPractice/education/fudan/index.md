---
title: 复旦大学
category: showcase
industry: Education
company: 复旦大学
summary: 基于openGauss的智能开发平台，承载用户规模超7万。
officialPath: https://www.fudan.edu.cn/
detail: true
id: Education
---

## 核心应用

（1）替换 MySQL 和 Oracle；

（2）满足全栈 GCH 的发展需要；

（3）应用基础开发平台后端（PaaS+BaaS）；

（4）自建业务系统后端。

## 标杆价值

实现教育行业首个应用全栈统筹考虑的数据库替换方案，并发和稳定性得到了实际验证，对于 openGauss 系数据库在教育行业的推广和应用而言，具有较强的示范带动效应。

## 架构设计

基于 openGauss 构建的智能开发平台所开发的应用，默认支持 openGauss 及上层 GCH 组件。

## 技术创新

1.通过数据库日志物理同步，实现 openGauss 数据库高可用

2.通过 openGauss 提供的 om 工具来帮助部署和管理 openGauss 数据库的主备集群节点

3.通过配置 openGauss 的备机只读操作，实现读写分离，减少主库的读负载

4.openGauss 数据库高可用架构下，客户端连接到数据库的方式如下：通过配置客户端参数，实现自动主库发现，负载均衡，只读备库等各类应用场景需求。

5.通过 openGauss 的 gs_basebackup 工具做基础的物理备份。gs_basebackup 的实现目标是对服务器数据库文件的二进制进行拷贝。

6.通过 openGauss 提供的管理 openGauss 数据库备份和恢复的工具 gs_probackup，对 openGauss 实例进行定期备份，以便在数据库出现故障时能够恢复服务器。

7.openGauss 支持标准的 SQL92/SQL99/SQL2003/SQL2011 规范，支持 GBK 和 UTF-8 字符集，支持 SQL 标准函数与分析函数，支持存储过程。

## 融合创新

开发平台支持复杂代码 AI 提示，对于有经验的开发人员可以很好地提升开发效率；提供低代码快速开发部署能力和错误故障提示定位，大大降低了编程开发的技术门槛。
