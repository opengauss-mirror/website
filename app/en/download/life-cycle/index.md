---
title: '下载 - 生命周期'
---

<script setup>
import {  OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';


import ImgLifeCycle from '~@/assets/category/download/life-cycle-en.png';

</script>

<div class='download-life-cycle'>
<ClientOnly>
 <OBreadcrumb class="app-breadcrumb">
    <OBreadcrumbItem>
      <a :href="`/en/download/`"> 下载 </a>
    </OBreadcrumbItem> 
    <OBreadcrumbItem>生命周期 </OBreadcrumbItem>
  </OBreadcrumb>
</ClientOnly>

<div class="life-cycle-content">

## openGauss社区版本生命周期管理规范

- LTS version: a large-scale rollout version released every 2 years, with 3 years of community support, followed by additional maintenance support by oGSPs.

- RCx: a collaborative testing version released every 6 months, with 6 months of community support.

The planned and developed features in RCx will be incorporated into the corresponding LTS version.

<img :src="ImgLifeCycle" alt="life-cycle" />

Maintenance Support: CVE、Bigfix和少量新特性

Extend Support: 修复“主要”以上CVE和Bug

单个版本生命周期结束前，以邮件和公告的方式提前3个月知会

</div>

</div>
