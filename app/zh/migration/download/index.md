---
title: 迁移下载
category: migration
custom-layout: true
titleTemplate: Linux服务器系统迁移 | openEuler社区官网
head:
  - - meta
    - name: description
      content: openEuler迁移专区为您提供专业化的服务器系统迁移方案，及CentOS迁移操作系统迁移工具，助力企业简单、平稳、高效进行操作系统升级及操作系统迁移。想要了解更多系统迁移相关信息，欢迎访问openEuler官网。
  # - - meta
  #   - name: keywords
  #     content: openEuler迁移,Linux迁移,Linux服务器迁移,系统迁移工具,服务器迁移方案,CentOS迁移
---
## 下载

## DataKit

openGauss的开发运维涉及到很多复杂操作，DataKit提供了一个可视化操作的运维界面，可以帮助用户管理，安装，监控运维自己的openGauss数据库以及对应的物理机资源。

DataKit是一个以资源（物理机，数据库）为底座的开发运维工具，将上层的开发运维工具插件化，各插件之间相互独立，方便用户按需引入。各插件围绕DataKit的资源中心进行扩展开，完成数据库的运维，监控，迁移，开发，建模等复杂的操作。

## 软件下载

DataKit工具官方下载：https://www.opengauss.org/zh/download/

## 环境准备

X86/ARM+openEuler 20.03 或 X86+CentOS 5.7。

## 安装步骤

1. 创建工作目录：

   ```
   mkdir -p /ops/server/openGauss-visualtool/logs /ops/server/openGauss-visualtool/config /ops/ssl /ops/files
   ```

2. 将jar包传至/ops/server/openGauss-visualtool/下，jar包下载地址：[https://www.opengauss.org/zh/download/](https://www.opengauss.org/zh/download/)

3. 将配置文件application-temp.yml传至/ops/server/openGauss-visualtool/config/下。配置文件内容如下：

   ```
   system:
     # File storage path
     defaultStoragePath: /ops/files
     # Whitelist control switch
     whitelist:
       enabled: false
   server:
     port: 9494
     ssl:
       key-store: /ops/ssl/keystore.p12
       key-store-password: password
       key-store-type: PKCS12
       enabled: true
     servlet:
       context-path: /
   logging:
     file:
       path: /ops/server/openGauss-visualtool/logs/
   spring:
     datasource:
       type: com.alibaba.druid.pool.DruidDataSource
       driver-class-name: org.opengauss.Driver
       url: jdbc:opengauss://ip:port/database?currentSchema=public
       username: dbuser
       password: dbpassword
       druid:
         test-while-idle: false
         test-on-borrow: true
         validation-query: "select 1"
         validation-query-timeout: 30000
   ```

4. 将ssl文件传置/ops/ssl/下，生成ssl文件示例（生成ssl的java必须跟运行DataKit是一个java版本）：

   ```
   keytool -genkey -noprompt \
       -dname "CN=opengauss, OU=opengauss, O=opengauss, L=Beijing, S=Beijing, C=CN"\
       -alias opengauss\
       -storetype PKCS12 \
       -keyalg RSA \
       -keysize 2048 \
       -keystore /ops/ssl/keystore.p12 \
       -validity 3650 \
       -storepass password
   ```

   

5. 修改application-temp.yml文件中的数据链链接ip、port、database、dbuser、dbpassword。

6. 创建ops用户，给ops目录及下面所有文件修改所属用户为执行用户（ops）。

7. 切换到ops用户，进入/ops/server/openGauss-visualtool目录，执行启动命令：

   ```
   nohup java -Xms2048m -Xmx4096m -jar /ops/server/openGauss-visualtool/visualtool-main.jar --spring.profiles.active=temp >/ops/server/openGauss-visualtool/logs/visualtool-main.out 2>&1 &\
   ```

## 卸载工具

DataKit工具是Jar包启动的，删除对应的Jar包即可卸载该工具。

## 使用指南

DataKit工具主要功能介绍、平台基础模块、插件管理、安全中心等详细使用方法请参考官方[openGauss DataKit Platform产品使用手册](https://gitee.com/liang-bian/openGauss-workbench/blob/master/openGauss-visualtool/doc/DataKit%20Product%20Manual%20-%20Platform.md)。