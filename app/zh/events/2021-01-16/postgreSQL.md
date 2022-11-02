---
title: 'openGauss受邀参加2020 PostgreSQL 第十届中国技术大会'
time: '2021/01/15-2021/01/16'
date: '2021-01-16'
category: 'events'
tags: '会议'
label: '线下'
location: '广州'
img: '/category/events/2021-01-16/banner.png'
img_mobile: '/category/events/2021-01-16/banner.png'
link: '/zh/events/2021-01-16/postgreSQL.html'
author: 'openGauss'
summary: ''
---

1 月 15 日-16 日，由 PostgreSQL 中文社区主办的《第十届 PostgreSQL 中国技术大会》，在广州万富希尔顿酒店隆重召开。openGauss 受邀出席本次大会并带来众多精彩分享。

### openGauss 的 AI 能力不断演进

<strong>华为高斯实验室 AI 子模块负责人 王天庆</strong>

- 当前业界对于 AI 自治数据库的研究进展；
- 华为高斯团队在这个领域的探索和积淀（AI4DB 与 DB4AI 能力）以及华为团队的落地产品；
- 分别介绍落地到华为云 DAS 上的能力以及在 openGauss 社区上的开源情况；
- openGauss 社区上的 AI 能力演进

<video class="video-js" controls="" poster="./poster1.png" preload="auto" src="https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com:443/PG%E5%A4%A7%E4%BC%9A/%E7%8E%8B%E5%A4%A9%E5%BA%86.mp4" style="max-width: 100%; width: 720px; margin: 10px 0px; object-fit: cover;"></video>

### 多路多核鲲鹏服务器数据库性能优化

<strong>openGauss 数据库架构师 胡翔宇</strong>

- 鲲鹏 920 处理器是华为的数据中心高性能处理器，也是一款兼容 ARM 架构的 SOC，采用 7nm 工艺制造，最多支持 4 路一共 256 核，支持 8 通道 DDR4、PCIe 4.0 和 100G RoCEv2 网络。数据库作为计算产业的核心应用之一，追求释放每一个比特的算力。本次分享介绍华为计算在 openGauss 等数据库在多路多核服务器下性能优化的思路和进展。

<video id="my-video" class="video-js" controls preload="auto" width="100%" poster="./poster2.png">
    <source src="https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com:443/PG%E5%A4%A7%E4%BC%9A/%E8%83%A1%E7%BF%94%E5%AE%87.mp4">您的浏览器不支持video标签。
</video>

### openGauss 企业级开源数据库特性解读

<strong>openGauss 生态经理 薛忠斌</strong>

- 华为 openGauss 企业级开源数据库的背景
- openGauss 的高性能、高可用、高可靠的特点及结合软硬件优势进行的 NUMA 改造和调优策略。
- 介绍社区情况，引荐社区内的软件合作伙伴，希望更多伙伴加入 openGauss 社区，持续为数据库生态的构建贡献力量。

<video id="my-video" class="video-js" controls preload="auto" width="100%" poster="./poster3.png">
    <source src="https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com:443/PG%E5%A4%A7%E4%BC%9A/%E8%96%9B%E5%BF%A0%E6%96%8C.mp4">您的浏览器不支持video标签。
</video>

### openGauss HA 实现

<strong>华为高级研发工程师 熊小军</strong>

- 介绍 openGauss 高可用实现，以及在不同容灾要求下的主备高可用部署方案
- 阐述 openGauss 一主多备的架构，同步备、异步备在主备数据、日志同步时的差异，主备 switch over、fail over 的实现，以及级联备的相关实现。

<video id="my-video" class="video-js" controls preload="auto" width="100%" poster="./poster4.png">
    <source src="https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com:443/PG%E5%A4%A7%E4%BC%9A/%E7%86%8A%E5%B0%8F%E5%86%9B.mp4">您的浏览器不支持video标签。
</video>

### openGauss 针对交易性能优化方面的代码解析

<strong>海量数据高级研发工程师 廖美东</strong>

- openGauss 为了突破了多核 CPU 的瓶颈，实现两路鲲鹏 128 核 150 万 tpmC 的目标，使用了多种性能优化技术。
- 介绍 openGauss 内核中的线程改造、NUMA 优化、锁拆分、增量检查点等技术原理。

<video id="my-video" class="video-js" controls preload="auto" width="100%" poster="./poster5.png">
    <source src="https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com:443/PG%E5%A4%A7%E4%BC%9A/%E5%BB%96%E7%BE%8E%E4%B8%9C%E8%A7%86%E9%A2%91.mp4">您的浏览器不支持video标签。
</video>

### PostgreSQL on Kunpeng

<strong>华为高级软件工程师 赵波</strong>

- 主要介绍为了助力国产数据库领域成功，为了能让国内用户对 ARM 有足够的信心，对开源的投入逐渐增长。作为通用 ARM 的鲲鹏在 PG 社区上游以及其他开源数据库领域所做的工作，对整个数据库软件生态的影响及促进作用等。

<video id="my-video" class="video-js" controls preload="auto" width="100%" poster="./poster6.png">
    <source src="https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com:443/PG%E5%A4%A7%E4%BC%9A/%E8%B5%B5%E6%B3%A2.mp4">您的浏览器不支持video标签。
</video>

以上老师的演讲材料都在这里，有需要的朋友可以自取：

下载链接：

https://pan.baidu.com/s/1JXA2o9ptf1gv_9Xo3EgF5A

提取码：open

<img src="./code.png" width="256px" style="margin-bottom: 0.2rem;">
