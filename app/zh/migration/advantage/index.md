---
title: openGauss迁移背景 | 数据库迁移方案
titleTemplate: openGauss社区官网
head:
  - - meta
    - name: description
      content: openGauss是一款高性能、高安全、高可靠的企业级开源关系型数据库。想要了解更多数据库迁移相关信息，欢迎访问openGauss官网。
category: migration
anchor: false
---

## openGauss 优势

openGauss在高性能、高安全、高可用、高智能、企业级能力等多方面领先。

<div class="adavantage">
    <div class="official">
        <p>高性能</p>
        <img src="./performance.png"/>
        <p>2路鲲鹏150w tpmC，3倍于MySQL性能
        分布式16节点1000万tpmC</p>
    </div>
    <div class="official">
        <p>高安全</p>
        <img src="./security.png"/>
        <p>支持国密算法、全密态，实现数据生命周期保护，多方共识，数据防篡改
        数据可用不可见， 可见不可改
        </p>
    </div>
    <div class="official">
        <p>高可用</p>
        <img src="./rto.png"/>
        <p>日志并行回放，AZ內RTO&lt;10s，单域最佳。跨AZRTO&lt;30s，优于MySQL（>30s）
        Paxos自治共识高可用架构，CM实现故障自动切换，全域高可用
        </p>
    </div>
    <div class="official">
        <p>高智能</p>
        <img src="./ai.png"/>
        <p>智能索引推荐，慢SQL诊断，性能提升10倍，提升运维效率
        20+原生AI库内算子，覆盖主流场景，会SQL就能用AI
        </p>
    </div>
    <div class="official">
        <p>企业级能力</p>
        <img src="./htap.png"/>
        <p>支持行存、列存混合存储，同时行存表TPCH性能优于MySQL
        支持多种算子的并行查询
        </p>
    </div>
</div>

|维度|特性|MySQL|openGauss|
|:---|:---|:---|:---|
|高性能|TPCC|2P鲲鹏 54w tpmC, 4P鲲鹏 72w tpmC|2P鲲鹏 150w tpmC，4P鲲鹏 230w tpmC|
|高可用|主备同步|基于binlog的逻辑复制（异步/半同步），灵活但容易延迟和出现数据不一致|基于同一份WAL日志实现物理复制和逻辑复制|
|高可用|主备倒换RTO|RPO>0|RPO=0|
|高可用|主备倒换RTO|跨AZ RTO>30s|AZ内RTO<10s，跨AZ RTO<30s|
|企业级能力|SQL标准|很多语法不满足SQL标准，行为不统一，如单引号处理，update带表达式处理等|支持标准的SQL92/SQL99/SQL2003/SQL2011规范|
|企业级能力|并行查询|8.0以下版本不支持并行查询；8.0版本只支持并行聚集索引读取(比如count(*))和并行分区扫描|支持并行查询（顺序扫描、nestloop、hash join、hash agg、append等）|
|企业级能力|多存储引擎|灵活支持多种存储引擎，一个MySQL进程可支持建多种引擎的表，5.5版本后InnoDB为默认引擎。索引组织表，表内数据按索引有序组织，按主键查询数据较快，单表容量有限，全表扫描慢|支持多种存储引擎共存，heap表存储，单表容量无限制。|
|企业级能力|OLAP|heatwave，高性能实时分析计算架构，Oracle云上服务|支持列存，同时行存表TPCH性能优于MySQL|
|高安全|国密算法|不支持 ，使用caching_sha2_password认证，支持通用加解密算法|支持国密sm3认证和sm4加解密算法，支持md5和sha256认证，支持md5、aes128加解密|
|高安全|全密态|不支持，只支持指定字段通过加密函数AES_ENCRYPT加密传入数据库|支持全密态，数据以加密形态存储在数据库服务器中，支持对密文数据的检索与计算|
|生态迁移|工具生态|有丰富的生态支持，图形化管理工具、多语言连接驱动、高可用组件、中间件、备份&恢复组件|ODBC、JDBC、Python驱动；原生高可用组件CM、备份恢复工具|
|生态迁移|MySQL兼容性|数据类型、操作符、函数、DDL、DML等 1192个语法|openGauss 总体兼容度68%，其中常用语法100%兼容|
|生态迁移|迁移工具套件| - |支持完备的全量、增量、反向数据迁移工具，支持数据实时比对|

<style lang = "scss" scoped>
    .adavantage {
        display: flex;
        margin-top: var(--o-spacing-h2);
        @media screen and (max-width: 768px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: var(--o-spacing-h4);
        }
        .official{
            margin-right: 100px;
            @media screen and (max-width: 768px) {
                margin-right: 0;
                margin-bottom: var(--o-spacing-h4);
            }
        }
        img {
            max-width: 200px;
            width: 100%;
        }
        p {
            font-size: var(--o-font-size-h6);
            font-weight: 400;
            color: var(--o-color-text1);
            line-height: var(--o-line-height-h6);
            text-align: center;
            margin-top: var(--o-spacing-h5);
        }
    }
</style>
