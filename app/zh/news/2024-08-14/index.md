---
title: 'openGauss6.0.0版本更改数据库发布包名公告'
date: '2024-08-14'
tags: ['theme']
category: 'news'
banner: '/category/news/2024-08-14/banner.jpg'
author: 'openGauss'
summary: 'openGauss6.0.0版本更改数据库发布包名公告'
---

## 当前存在的问题：

openGauss 社区发布了数个操作系统和架构的数据库镜像包，但是包的名称中没有包含更详细的系统和架构信息，这样会给用户使用带来不太友好的体验，无法通过包名来确认自己下载的包到底适配哪个系统，出现下错镜像包。

例如，社区发布的 CentOS 系统的包，只适用于 Centos7-x86 系统，但从包名无法判断出来。

| 适用系统 | 架构 | 包名                                    |
| -------- | ---- | --------------------------------------- |
| Centos7  | x86  | openGauss-5.0.0-CentoS-64bit-all.tar.gz |

比如，适用于 openEuler 系统的包，在不同的版本和架构下，包名也完全一样，没法区分。

<table>
	<tr>
	  <th>适用系统</th>
	  <th>架构</th>
	  <th>包名</th>  
	</tr>
	<tr>
	  <td>openEuler20.03</td>
	  <td>x86</td>
	  <td rowspan="4">openGauss-5.0.0-openEuler-64bit-all.tar.gz</td>
	</tr>
  <tr>
	  <td>openEuler20.03</td>
	  <td>arm</td>
	</tr>
  <tr>
	  <td>openEuler22.03</td>
	  <td>x86</td>
	</tr>
  <tr>
	  <td>openEuler22.03</td>
	  <td>arm</td>
	</tr>
</table>

## 包名修改方案：

针对上述问题，参考业界的实现，在 ReleaseManager sig 会议上审核同意后，openGauss 决定使用如下包名规范：

**openGauss-[组件名称]-[数据库版本]-[操作系统和版本]-[CPU 架构].tar.gz**

以 openEuler22.03 arm 系统为例，包名格式如下：

| 名称           | 包名格式                                               |
| -------------- | ------------------------------------------------------ |
| 企业版总包     | openGauss-All-6.0.0-openEuler22.03-aarch64.tar.gz      |
| OM 包          | openGauss-OM-6.0.0-openEuler22.03-aarch64.tar.gz       |
| CM 包          | openGauss-CM-6.0.0-openEuler22.03-aarch64.tar.gz       |
| 内核包(极简版) | openGauss-Server-6.0.0-openEuler22.03-aarch64.tar.bz2  |
| 轻量版         | openGauss-Lite-6.0.0-openEuler22.03-aarch64.tar.gz     |
| ODBC           | openGauss-ODBC-6.0.0-openEuler22.03-aarch64.tar.gz     |
| PYDriver       | openGauss-Python-6.0.0-openEuler22.03-aarch64.tar.gz   |
| JDBC           | openGauss-JDBC-6.0.0.tar.gz (不区分系统和架构)         |

**新包名方案，从 6.0.0 LTS 版本开始使用；之后的版本都使用新包名，历史的 LTS 版本仍然沿用旧名称。**
