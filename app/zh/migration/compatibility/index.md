---
title: 兼容性说明
titleTemplate: openGauss社区官网
head:
  - - meta
    - name: description
      content: openGauss是一款高性能、高安全、高可靠的企业级开源关系型数据库。想要了解更多数据库迁移相关信息，欢迎访问openGauss官网。
category: migration
---

## 兼容性说明

openGauss 数据库的 B 兼容模式兼容 MySQL 5.7 的绝大部分功能和语法。本节将从以下几个方面对比和 MySQL 5.7 的兼容性。
- SQL语法
- 数据类型
- 函数，操作符，表达式
- 存储过程
- 系统视图
- 字符集和字符序
- 优化器hint

### SQL语法
- 视图支持DEFINER
- 支持在创建、修改对象等语句中指定COMMENT选项	
- 支持AUTO_INCREMENT自增列
- 支持前缀索引
- 支持设置SCHEMA级、表级、列级字符集和字符序
- 支持在表第一列前面或者在指定列后面添加列
- 支持定时任务EVENT
- DELETE/UPDATE支持多表更新
- DELETE/UPDATE支持ORDER BY和LIMIT
- DELETE支持从指定分区（或子分区）删除数据
- INSERT VALUES的右值表达式支持字段引用
- 支持SET自定义变量、全局变量
- 支持CHECKSUM TABLE语法
- CREATE PROCEDURE/CREATE FUNCTION/CREATE TRIGGER兼容MySQL的存储过程语法风格
- 支持DESCRIBE表，和EXPLAIN功能一样
- INSERT/UPDATE语法支持IGNORE选项
- 支持LOAD DATA语法
- 支持RENAME TABLE/USER语法
- 支持DUAL虚拟表
- 支持大部分MySQL的SHOW语法
- 支持创建/修改隐藏索引

### 数据类型
- 支持NVARCHAR数据类型
- 支持SET数据类型
- 支持ENUM数据类型
- 支持FIXED数据类型
- 整数类型支持无符号UNSIGNED
- 支持YEAR数据类型
- 支持BINARY/VARBINARY数据类型

### 函数，操作符，表达式
- 支持绝大部分MySQL的系统函数，如字符处理函数、数字操作函数、时间和日期函数、咨询锁函数、网络地址函数、条件表达式函数、聚集函数、位串操作函数、系统信息函数、JSON函数等
- 支持绝大部分MySQL的操作符，如赋值操作符、字符处理操作符、数字操作符、时间和日期操作符、逻辑操作符、位串操作符、JSON操作符等
- 支持绝大部分MySQL的表达式，如条件表达式、布尔表达式等

### 存储过程
- 兼容MySQL的存储过程语法风格
- 支持DELIMITER定义结束符
- 支持LABLE:LOOP/WHILE/REPEAT循环语法
- 支持DECLARE HANDLER/CONDITION语法
- 支持SIGNAL/RESIGNAL语法
- 支持GET DIAGNOSTICS语法

### 系统视图
- 支持部分PERFORMANCE_SCHEMA视图：EVENTS_STATEMENTS_CURRENT、EVENTS_STATEMENTS_HISTORY、EVENTS_STATEMENTS_SUMMARY_BY_DIGEST、EVENTS_WAITS_CURRENT、EVENTS_WAITS_SUMMARY_GLOBAL_BY_EVENT_NAME、FILE_SUMMARY_BY_INSTANCE、TABLE_IO_WAITS_SUMMARY_BY_TABLE、TABLE_IO_WAITS_SUMMARY_BY_INDEX_USAGE，但视图中的部分列含义可能与MySQL有所不同

### 字符集和字符序
- 兼容部分MySQL的字符集： utf8mb4、latin1、binary、gbk、gb18030
- 兼容部分MySQL的字符序： utf8mb4_general_ci、utf8mb4_unicode_ci、utf8mb4_bin、binary、utf8_general_ci、utf8_unicode_ci、utf8_bin、gbk_chinese_ci、gbk_bin、gb18030_chinese_ci、gb18030_bin

### 优化器hint
- 支持通过SET_VAR dolphin.optimizer_switch设置隐藏索引的使用方式
- 支持FORCE/USE/IGNORE INDEX来指示优化器如何选择索引

更加详细的语法细节，可参考[MySQL兼容性说明](https://docs.opengauss.org/zh/docs/latest/docs/DataMigrationGuide/MySQL%E5%85%BC%E5%AE%B9%E6%80%A7%E8%AF%B4%E6%98%8E.html)文档。