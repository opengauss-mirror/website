---
title: '【限时激励】考openGauss认证，领京东卡'
time: '2022/11/01-2022/12/31'
date: '2022-11-01'
tags: '会议'
label: '线下'
category: 'events'
location: '线上'
img: '/category/events/2022-10-28/banner.png'
img_mobile: '/category/events/2022-10-28/banner.png'
link: '/zh/events/2022-10-28/Meetup.html'
author: 'openGauss'
summary: 'Huawei Certified ICT Associate-openGauss培训和认证具备华为 openGauss 数据库开发和管理能力的工程师'
---

<img src="./poster1.png" style="width: 80%">

<img src="./poster2.png" style="width: 80%">

### 考试日期

11 月 6 日、11 月 13 日、11 月 20 日、11 月 27 日；
12 月 4 日、12 月 11 日、12 月 18 日、12 月 25 日。
详情可以扫描上方答疑交流二维码入群交流。

关于 OGCA, 点击下方链接：

<https://opengauss.org/zh/training.html>

### HCIA-openGauss 认证

HCIA-openGauss 认证：

Huawei Certified ICT Associate-openGauss
培训和认证具备华为 openGauss 数据库开发和管理能力的工程师

关于 HCIA-openGauss 认证, 点击下方链接：

<https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=503&authenticationLevel=CTYPE_CARE_HCIA&technicalField=PSC&version=1.0>

**NCRE-openGauss 数据库程序设计(全国计算机等级考试二级）**

NCRE-openGauss 认证，点击下方链接：

<https://ncre.neea.edu.cn/>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { getUrlParams } from '@/shared/utils';
  function setDownData() {
    const sensors = (window as any)['sensorsDataAnalytic201505'];
    const { href } = window.location;
    if (href.includes('?utm_source')) {
      const paramsArr = getUrlParams(href);
      sensors?.setProfile({
        ...window['sensorsCustomBuriedData'],
        profileType: 'fromAdvertised',
        origin: href,
        ...paramsArr
      });
    }
  }
  
  onMounted(() => {
    setTimeout(() => {
      setDownData();
    }, 500);
  });

</script>
