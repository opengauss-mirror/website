---
title: '从Oracle迁移到openGauss实战分享'
date: '2022-10-26'
category: 'blog'
tags: ['Oracle', '迁移']
archives: '2022-10'
author: 'bububiubiu'
summary: '从Oracle迁移到openGauss实战分享'
img: ''
times: '16:30'
---

## 介绍

ora2og 是一个将 Oracle 数据库迁移至 openGauss 的工具，主要编程语言为 perl，通过 perl DBI 模块连接 Oracle 数据库，自动扫描并提取其中的对象结构及数据，产生 SQL 脚本，通过手动或自动的方式应用到 openGauss。此外，工具还提供丰富配置项，用户可以自定义迁移行为。ora2og 初始代码源自 ora2pg，一个将 Oracle 迁移至 PostgreSQL 的开源工具。版本为 release v21.1：<https://github.com/darold/ora2pg/tree/v21.1>。

### 优秀特性

支持导出数据库绝大多数对象类型，包括表、视图、序列、索引、外键、约束、函数、存储过程等。
提供 PL/SQL 到 PL/PGSQL 语法的自动转换，一定程度避免了人工修正。
可生成迁移报告，包括迁移难度评估、人天估算。
可选对导出数据进行压缩，节约磁盘开销。
配置选项丰富，可自定义迁移行为。

## 执行迁移

### 环境

本篇使用环境：
Oracle ： 华为云服务器 2 核 4G + CentoOS 7.6 +Oracle 11.2
openGauss：华为云服务器 2 核 4G + CentoOS 7.6 +openGauss 3.1.0 极简版
两台节点网络互通
迁移前准备
Ora2og 工具既可以安装在 Oracle 服务器上，也可以安装在 openGauss 服务器上。本篇中将工具部署在 Oracle 服务器上。
注意，如果安装在 openGauss 上时，需要在服务器上安装 Oracle 客户端。下载路径：
<https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html>

### 软件安装

Ora2Pg 语言为 perl，故需安装所需 perl 模块。

# root 用户下操作

```
yum install -y perl-ExtUtils-CBuilder perl-ExtUtils-MakeMaker
yum install perl-CPAN
```

安装 DBI、JSON、DBD:Pg、DBD:Oracle，Ora2Pg 依赖这些软件去连接数据库。

```
perl -MCPAN -e 'install DBI'
perl -MCPAN -e 'install JSON'
perl -MCPAN -e 'install DBD::Pg'

export ORACLE_HOME=/u01/app/oracle/product/11.2.0/
export LD_LIBRARY_PATH=/u01/app/oracle/product/11.2.0/lib

使用 perl -MCPAN -e 'install DBD::Oracle' 安装报错了，换了另一种自己编译的方式。

[root@oraclehost ora2pg-master]# perl -MCPAN -e shell
......
cpan[1]> get DBD::Oracle
........
Checksum for /root/.cpan/sources/authors/id/Z/ZA/ZARQUON/DBD-Oracle-1.83.tar.gz ok
......
cpan[2]> quit

[root@oraclehost ora2pg-master]# cd /root/.cpan/sources/authors/id/Z/ZA/ZARQUON/
[root@oraclehost ZARQUON]# tar -zxvf DBD-Oracle-1.83.tar.gz
[root@oraclehost ZARQUON]# cd DBD-Oracle-1.83
[root@oraclehost DBD-Oracle-1.83]# perl Makefile.PL
[root@oraclehost DBD-Oracle-1.83]# make && make install
```

### ora2og 工具安装

安装 Ora2Pg <you_install_dir>为目标安装路径，<source_code_dir>为下载的代码路径。 如果服务器上没有 git 的话，可以从网站把源码包下载再解压。

```
mkdir -p /opt/software/ora2pg
git clone https://toscode.gitee.com/opengauss/openGauss-tools-ora2og.git
```

# 进到代码目录下

```
perl Makefile.PL PREFIX=<your_install_dir>
make && make install
```

# 设置环境变量，查看是否安装成功

```
export PERL5LIB=<source_code_dir>/lib
export PATH=$PATH:<your_install_dir>/usr/local/bin
```

需要确保 bin 路径下有 ora2pg 这个文件，否则命令找不到。
执行` ora2pg --help` 查看命令是否正常  
会返回一堆帮助信息

### 创建迁移项目

`ora2pg --init_project oramig`
创建迁移项目后会在当前目录下生成 oramig 目录模板，如下所示。其中主要包含两个脚本 export_schema.sh 和 import_all.sh，后续导出和导入即使用这两个脚本。schema 和 sources 目录存放各对象的 DDL 语句，区别在于 schema 存放 PL/SQL 语法转化为 PL/PGSQL 后的语句， sources 目录存放转化前 PL/SQL 的语句，data 目录存放表数据文件，config 目录包含配置文件 ora2pg.conf，reports 目录存放迁移报告。

Oracle 建个表，用来做测试数据

```
create table customerchat.test(name char(10));
insert into customerchat.test values('opengauss');
create table customerchat.xxx(name char(20));
insert into customerchat.xxx values('yy');
```

openGauss 侧新建数据库 mydb 和用户 tuser ,迁移时会用到。

```
mydb=#create database mydb;
mydb=# CREATE USER tuser WITH PASSWORD '自己定义';
mydb=# GRANT ALL PRIVILEGES TO tuser;
mydb=# alter database mydb owner to tuser;
```

### 配置 ora2pg.conf,

注意路径，后面执行 sh 的时候会找 config/ora2pg.conf。

`cp <your_install_dir>/etc/ora2pg/ora2pg.conf.dist <source_code_dir>/config/ora2pg.conf`

ORACLE 相关参数：

```
ORACLE_HOME /u01/app/oracle/product/11.2.0/
ORACLE_DSN dbi:Oracle:host=oracleIP;sid=orcl;port=1521
ORACLE_USER customerchat // 这里用的 oracle 普通用户和密码
ORACLE_PWD XXXXX
SCHEMA customerchat //一般和用户名一样
openGauss 相关参数：
PG_DSN dbi:Pg:dbname=mydb;host=localhost;port=5432
PG_USER tuser
PG_PWD 自己定义的密码
```

工具自身参数：
DATA_LIMIT 默认是 10000，如果 oracle 服务器内存较小，比如 4G 以下，可以修改为 2500 或 5000,否则可能会报内存不足。
更多更详细的配置项说明，可查看官网：
<https://ora2pg.darold.net/documentation.html>

测试一下配置：
执行`ora2pg -t SHOW_VERSION -c config/ora2pg.conf`会返回连接的 Oracle 版本号。

### 测试迁移

修改迁移工具 oramig 目录下 `export_schema.sh` 中导出类型 EXPORT_TYPE 和 SOURCE_TYPE，本次迁移导出 TABLE。

在 oramig 目录下执行
`sh export_schema.sh`

执行完成后 在 schema/tables 生成 table.sql ，里面是建表脚本。

reports/目录下生成的 report 报告

还是在 oramig 目录下执行导入
为了使用 openGauss 命令行工具 gsql，需要将数据库的 bin 和 lib 加在操作系统的环境变量 PATH 和 LD_LIBRARY_PATH 中。可以直接 root 用户执行 gsql 测试下。 3. 将 import_all.sh 里的 psql 修改为 gsql。

执行导入脚本，表示使用用户 tuser 登录 openGauss 中 mydb 的数据库，ip 和端口，-f 选项表示跳过用户和数据库是否需要创建的检查。

```
sh import_all.sh -d mydb -o tuser -h openGaussIP -p 5432 -f
```

执行成功。

可以看到表和数据都已经迁移过来。

### Ora2Pg 不足

Ora2Pg 对 PL/SQL 和 PL/PGSQL 的语法转换处理采用正则表达式和文本替换的方式，先天设计不足，很难覆盖所有的语法，目前仅支持部分转换。因此，Ora2Pg 可以满足 SQL 简单的应用迁移，对于复杂的语法，并不能完全保证转换的正确性，需要对生成的 SQL 语句进行核对，必要时需要人工修正。

## FAQ

### 1.报错：

```
Path to pg_config? /opt/software/openGauss/bin/pg_config
/opt/software/openGauss/bin/pg_config: error while loading shared libraries: libssl.so.1.1: cannot open shared object file: No such file or directory
```

环境自带的是 1.0.2，得升级 libssl.so。

```
[root@oraclehost ~]# openssl version -a
OpenSSL 1.0.2k-fips 26 Jan 2017
yum remove openssl
```

获取新的版本并安装

```
wget https://www.openssl.org/source/openssl-1.1.1c.tar.gz
tar -zxvf openssl-1.1.1c.tar.gz
cd openssl-1.1.1c
./config --prefix=/usr/local/openssl #如果此步骤报错,需要安装 perl 以及 gcc 包
make && make install

ln -s /usr/local/openssl/lib/libssl.so.1.1 /usr/lib64/libssl.so.1.1
ln -s /usr/local/openssl/lib/libcrypto.so.1.1 /usr/lib64/libcrypto.so.1.1
ln -s /usr/local/openssl/bin/openssl /usr/bin/openssl
ln -s /usr/local/openssl/include/openssl /usr/include/openssl
echo "/usr/local/openssl/lib" >> /etc/ld.so.conf
ldconfig -v

sudo yum install postgresql-devel

再重新执行 perl -MCPAN -e 'install DBD::Pg'
```

### 2、perl 报错 `Can’t locate JSON.pm in @INC`

解决：

```
sudo perl -MCPAN -e 'install JSON'
```

### 3、如何查看 SID ？

`SQL> select instance_name from V$instance;`

### 4、执行 `ora2pg -t SHOW_VERSION -c ora2pg.conf` 报错

```
FATAL: -1 ... ERROR OCIEnvNlsCreate. Check ORACLE_HOME (Linux) env var or PATH (Windows) and or NLS settings, permissions, etc.
Aborting export...
```

Export $ORACLE_HOME 了半天，发现原来是 ora2pg.conf 里面配置的 ORACLE_HOME 不对

### 5、执行 `ora2pg -t SHOW_VERSION -c ora2pg.conf` 报错

```
FATAL: 12505 ... ORA-12505: TNS:listener does not currently know of SID given in connect descriptor (DBD ERROR: OCIServerAttach)
Aborting export...
```

解决办法 SID 配置有问题 或者 /etc/hosts 有问题。参考下面连接解决
<https://www.shuzhiduo.com/A/6pdDw0bl5w/>

### 6、执行 `ora2pg -t SHOW_VERSION -c config/ora2pg.conf` 报错

```
install_driver(Oracle) failed: Can't load '/usr/local/lib64/perl5/auto/DBD/Oracle/Oracle.so' for module DBD::Oracle: libclntsh.so.11.1: cannot open shared object file: No such file or directory at /usr/lib64/perl5/DynaLoader.pm line 190.
```

解决办法
`export LD_LIBRARY_PATH=$ORACLE_HOME/lib`

### 7、执行` ora2pg -t SHOW_VERSION -c ora2pg.conf` 报错

```
FATAL: ORA-08178: illegal SERIALIZABLE clause specified for user INTERNAL (DBD ERROR: OCIStmtExecute)
```

解决办法：
不要使用 sys 用户，使用普通 oracle 用户（没有可新建），然后修改 ora2pg.conf 中的用户名和密码

### 8、执行 `sh import_all.sh -d mydb -o tuser -h IP -p 5432 -f` 提示 Out of memory , 但是 top 显示还有 1G 多。

解决办法：
`Opened ./config/ora2pg.conf and modfied set DATA_LIMIT 5000 or 2500 solved the issue.`

### 9、报错：`DBD::Pg::db do failed: ERROR: permission denied for relation xxx`

解决办法：
需要给 openGauss 的角色赋权限
`mydb=# grant all privileges to tuser;`

### 10、报错：

```
DBI connect('dbname=mydb;host=openGaussIP;port=5432','testuser',...) failed: connection to server at "openGaussIP", port 5432 failed: none of the server's SASL authentication mechanisms are supported at /opt/software/ora2pg/lib
```

解决办法：
这个错是 openGauss 返回的。需要把 openGauss 的 pg_hba.conf & postgres.conf 再搞下。
修改 `data/single_node/postgresql.conf `中 `password_encryption_type = 1` 。
修改 pg_hba.conf 中

然后重启 `openGauss：gs_ctl restart -D /opt/software/openGauss/data/single_node`
