+++
title = "知识图谱"
bgImg = "../img/breadcrumbs/certificate_bg.png"
moImg = "../img/breadcrumbs/certificate_mo.png"
search = "搜索"

[[ module ]]
    name = "集群管理"
    [[ module.types ]]
        name = "安装部署"
        [[ module.types.item ]]
            name = "OM安装opengauss(单机)"
            link = "https://blog.opengauss.org/zh/post/jiajunfeng/single-inst-deployment-of-opengauss-database/"
        [[ module.types.item ]]
            name = "openGauss2.0.0主备安装部署"
            link = "https://blog.opengauss.org/zh/post/jiajunfeng/opengauss2-0-0%E4%B8%BB%E5%A4%87%E5%AE%89%E8%A3%85%E9%83%A8%E7%BD%B2/"
        [[ module.types.item ]]
            name = "openGauss一主一备一级联安装"
            link = "https://blog.opengauss.org/zh/post/july/opengauss%E4%B8%80%E4%B8%BB%E4%B8%80%E5%A4%87%E4%B8%80%E7%BA%A7%E5%AE%89%E8%A3%85/"
        [[ module.types.item ]]
            name = "openGauss数据库编译指导"
            link = "https://blog.opengauss.org/zh/post/xingchen/opengauss_compile/"
        [[ module.types.item ]]
            name = "不使用om工具如何手工部署openGauss主从流复制环境"
            link = "https://blog.opengauss.org/zh/post/shujukujiagouzhimei/%E4%B8%8D%E4%BD%BF%E7%94%A8om%E5%B7%A5%E5%85%B7%E5%A6%82%E4%BD%95%E6%89%8B%E5%B7%A5%E9%83%A8%E7%BD%B2opengauss%E4%B8%BB%E4%BB%8E%E6%B5%81%E5%A4%8D%E5%88%B6%E7%8E%AF%E5%A2%83/"
    [[ module.types ]]
        name = "集群管理"
        [[ module.types.item ]]
            name = "openGauss启动、停止、查看状态、切换主备"
            link = "https://blog.opengauss.org/zh/post/july/opengauss%E5%90%AF%E5%8A%A8-%E5%81%9C%E6%AD%A2-%E6%9F%A5%E7%9C%8B%E7%8A%B6%E6%80%81-%E5%88%87%E6%8D%A2%E4%B8%BB%E5%A4%87/"
        [[ module.types.item ]]
            name = "opengauss数据库维护管理"
            link = "https://blog.opengauss.org/zh/post/zhengwen2/opengauss%E6%95%B0%E6%8D%AE%E5%BA%93%E7%BB%B4%E6%8A%A4%E7%AE%A1%E7%90%86/"
        [[ module.types.item ]]
            name = "openGauss升级指导书"
            link = "https://blog.opengauss.org/zh/post/shine/opengauss%E5%8D%87%E7%BA%A7%E6%8C%87%E5%AF%BC%E4%B9%A6/"
    [[ module.types ]]
        name = "容器集成"
        [[ module.types.item ]]
            name = "docker安装openGauss"
            link = "https://blog.opengauss.org/zh/post/zhengwen2/opengauss%E5%BF%AB%E9%80%9F%E5%AE%89%E8%A3%85%E6%96%B9%E6%B3%95docker/"
        [[ module.types.item ]]
            name = "openGauss在kubernetes集群环境上的部署"
            link = "https://blog.opengauss.org/zh/post/zhengwen2/opengauss%E5%9C%A8kubernetes%E9%9B%86%E7%BE%A4%E7%8E%AF%E5%A2%83%E4%B8%8A%E7%9A%84%E9%83%A8%E7%BD%B2/"


[[ module ]]
    name = "数据库工具"
    [[ module.types ]]
        name = "备份恢复"
        [[ module.types.item ]]
            name = "物理备份恢复之gs_basebackup"
            link = "https://blog.opengauss.org/zh/post/july/opengauss%E7%89%A9%E7%90%86%E5%A4%87%E4%BB%BD%E6%81%A2%E5%A4%8D%E4%B9%8Bgsbasebackup/"
        [[ module.types.item ]]
            name = "逻辑备份及恢复"
            link = "https://blog.opengauss.org/zh/post/july/opengauss%E9%80%BB%E8%BE%91%E5%A4%87%E4%BB%BD%E5%8F%8A%E6%81%A2%E5%A4%8D/"
        [[ module.types.item ]]
            name = "openGauss备份恢复gs_probackup"
            link = "https://blog.opengauss.org/zh/post/zhengwen2/opengauss-%E5%A4%87%E4%BB%BD%E6%81%A2%E5%A4%8Dgs_probackup/"
        [[ module.types.item ]]
            name = "openGauss增量备份恢复"
            link = "https://blog.opengauss.org/zh/post/jiajunfeng/opengauss%E5%A2%9E%E9%87%8F%E5%A4%87%E4%BB%BD%E6%81%A2%E5%A4%8D/"
    [[ module.types ]]
        name = "迁移工具"
        [[ module.types.item ]]
            name = "将PostgreSQL插件移植到openGauss"
            link = "https://opengauss.org/zh/blogs/blogs.html?post/chenxiaobin/%E5%B0%86postgresql%E6%8F%92%E4%BB%B6%E7%A7%BB%E6%A4%8D%E5%88%B0opengauss%E6%8C%87%E5%AF%BC/"
        [[ module.types.item ]]
            name = "使用pg_chameleon迁移MySQL数据库至openGauss"
            link = "https://blog.opengauss.org/zh/post/totaj/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8pg_chameleon%E8%BF%81%E7%A7%BBmysql%E6%95%B0%E6%8D%AE%E5%BA%93%E8%87%B3opengauss/"
        [[ module.types.item ]]
            name = "如何使用pgloader迁移MySQL数据库至openGauss"
            link = "https://blog.opengauss.org/zh/post/totaj/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8pgloader%E8%BF%81%E7%A7%BBmysql%E6%95%B0%E6%8D%AE%E5%BA%93%E8%87%B3opengauss/"
    [[ module.types ]]
        name = "客户端"
        [[ module.types.item ]]
            name = "opengauss常用的客户端连接工具"
            link = "https://blog.opengauss.org/zh/post/lihongda/opengauss%E5%B8%B8%E7%94%A8%E7%9A%84%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%BF%9E%E6%8E%A5%E5%B7%A5%E5%85%B7/"
        [[ module.types.item ]]
            name = "PowerDesigner使用JDBC连接openGauss指导"
            link = "https://blog.opengauss.org/zh/post/wangrui/powerdesigner_for_opengauss/"
        [[ module.types.item ]]
            name = "Dbeaver适配openGauss使用指导"
            link = "https://blog.opengauss.org/zh/post/justbk/2020-10-30_dbeaver_for_opengauss/"
    
    [[ module.types ]]
        name = "监控"
        [[ module.types.item ]]
            name = "普罗米修斯监控openGauss"
            link = "https://blog.opengauss.org/zh/post/zhangzhijing/%E6%99%AE%E7%BD%97%E7%B1%B3%E4%BF%AE%E6%96%AF%E7%9B%91%E6%8E%A7opengauss/"


[[ module ]]
    name = "数据库内核"
    [[ module.types ]]
        name = "内核解析"
        [[ module.types.item ]]
            name = "openGauss 锁机制实现浅析"
            link = "https://blog.opengauss.org/zh/post/july/opengauss-%E9%94%81%E6%9C%BA%E5%88%B6%E5%AE%9E%E7%8E%B0%E6%B5%85%E6%9E%90/"
        [[ module.types.item ]]
            name = "B-tree索引读写并发原理"
            link = "https://blog.opengauss.org/zh/post/july/opengauss-b-tree%E7%B4%A2%E5%BC%95%E8%AF%BB%E5%86%99%E5%B9%B6%E5%8F%91%E5%8E%9F%E7%90%86/"
        [[ module.types.item ]]
            name = "opengauss索引详解 "
            link = "https://blog.opengauss.org/zh/post/zhengwen2/opengauss%E7%B4%A2%E5%BC%95%E8%AF%A6%E8%A7%A3/"
        [[ module.types.item ]]
            name = "openGauss内存管理初探"
            link = "https://blog.opengauss.org/zh/post/zhengwen2/opengauss%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86%E5%88%9D%E6%8E%A2/"
        [[ module.types.item ]]
            name = "opengauss的mvcc以及vacuum机制源码解析csn-log"
            link = "https://blog.opengauss.org/zh/post/minshengyunwei/opengauss%E7%9A%84mvcc%E4%BB%A5%E5%8F%8Avacuum%E6%9C%BA%E5%88%B6%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90csn-log/"
        [[ module.types.item ]]
            name = "插件化地为openGauss添加算子"
            link = "https://opengauss.org/zh/blogs/blogs.html?post/chenxiaobin/%E5%A6%82%E4%BD%95%E6%8F%92%E4%BB%B6%E5%8C%96%E5%9C%B0%E4%B8%BAopengauss%E6%B7%BB%E5%8A%A0%E7%AE%97%E5%AD%90/"
        [[ module.types ]]
            name = "常用视图"
            [[ module.types.item ]]
                name = "openGauss资源监控视图简介"
                link = "https://blog.opengauss.org/zh/post/songqingyi/resource_views/"
            [[ module.types.item ]]
                name = "openGauss监控场景处理"
                link = "https://blog.opengauss.org/zh/post/wangxinjia/opengauss%E7%9B%91%E6%8E%A7%E5%9C%BA%E6%99%AF%E5%A4%84%E7%90%86/"
        [[ module.types ]]
            name = "性能调优"
            [[ module.types.item ]]
                name = "benchmark使用"
                link = "https://blog.opengauss.org/zh/post/optimize/opengauss-tpcc/"
            [[ module.types.item ]]
                name = "openGauss数据库性能调优"
                link = "https://blog.opengauss.org/zh/post/optimize/opengauss-optimize1/"
        

[[ module ]]
    name = "数据库驱动"
    [[ module.types ]]
        name = "连接驱动"
        [[ module.types.item ]]
            name = "Python驱动快速入门"
            link = "https://blog.opengauss.org/zh/post/jingjingwu/01.getting-started-with-python/"
        [[ module.types.item ]]
            name = "PHP unixODBC Apache openGauss实现数据库的连接"
            link = "https://blog.opengauss.org/zh/post/user8927/php-unixodbc-apache-opengauss%E5%AE%9E%E7%8E%B0%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E8%BF%9E%E6%8E%A5/"

+++