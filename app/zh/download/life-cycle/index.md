---
title: '下载 - 生命周期'
---

<script setup>
import {  OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';


import ImgLifeCycle from '~@/assets/category/download/life-cycle.png';

</script>

<div class='download-life-cycle'>
<ClientOnly>
 <OBreadcrumb class="app-breadcrumb">
    <OBreadcrumbItem>
      <a :href="`/zh/download/`"> 下载 </a>
    </OBreadcrumbItem> 
    <OBreadcrumbItem>生命周期 </OBreadcrumbItem>
  </OBreadcrumb>
</ClientOnly>

<div class="life-cycle-content">

## openGauss社区版本生命周期管理规范

- 长期支持版本（LTS） ：规模上线使用，发布间隔周期为2年，社区提供3年维护支持，OGSP伙伴提供3年以上延长维护支持服务。

- 社区创新版本（RCx） ：联创测试使用，发布间隔周期定为6个月，社区提供6个月维护支持。

创新版本规划及开发的功能特性，将被其对应的LTS大版本进行收编。

<img :src="ImgLifeCycle" alt="life-cycle" />

Maintenance Support: CVE、Bugfix和少量新特性

Extend Support: 修复“主要”以上CVE和Bug

单个版本生命周期结束前，以邮件和公告的方式提前3个月知会

</div>

</div>
