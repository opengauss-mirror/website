export default {
  title: '知识图谱',
  search: '搜索',
  module: [
    {
      name: '集群管理',
      moduleTypes: [
        {
          name: '安装部署',
          list: [
            {
              name: 'OM安装opengauss(单机)',
              link: '/zh/blogs/jiajunfeng/Single-inst Deployment of openGauss Database.html',
            },
            {
              name: 'openGauss2.0.0主备安装部署',
              link: '/zh/blogs/jiajunfeng/openGauss2-0-0%E4%B8%BB%E5%A4%87%E5%AE%89%E8%A3%85%E9%83%A8%E7%BD%B2.html',
            },
            {
              name: 'openGauss一主一备一级联安装',
              link: '/zh/blogs/July/openGauss%E4%B8%80%E4%B8%BB%E4%B8%80%E5%A4%87%E4%B8%80%E7%BA%A7%E5%AE%89%E8%A3%85.html',
            },
            {
              name: 'openGauss数据库编译指导',
              link: '/zh/blogs/xingchen/opengauss_compile.html',
            },
            {
              name: '不使用om工具如何手工部署openGauss主从流复制环境',
              link: '/zh/blogs/shujukujiagouzhimei/%E4%B8%8D%E4%BD%BF%E7%94%A8om%E5%B7%A5%E5%85%B7%E5%A6%82%E4%BD%95%E6%89%8B%E5%B7%A5%E9%83%A8%E7%BD%B2openGauss%E4%B8%BB%E4%BB%8E%E6%B5%81%E5%A4%8D%E5%88%B6%E7%8E%AF%E5%A2%83.html',
            },
          ],
        },
        {
          name: '集群管理',
          list: [
            {
              name: 'openGauss启动、停止、查看状态、切换主备',
              link: '/zh/blogs/July/openGauss%E5%90%AF%E5%8A%A8-%E5%81%9C%E6%AD%A2-%E6%9F%A5%E7%9C%8B%E7%8A%B6%E6%80%81-%E5%88%87%E6%8D%A2%E4%B8%BB%E5%A4%87.html',
            },
            {
              name: 'opengauss数据库维护管理',
              link: '/zh/blogs/zhengwen2/openGauss%E6%95%B0%E6%8D%AE%E5%BA%93%E7%BB%B4%E6%8A%A4%E7%AE%A1%E7%90%86.html',
            },
            {
              name: 'openGauss升级指导书',
              link: '/zh/blogs/shine/openGauss%E5%8D%87%E7%BA%A7%E6%8C%87%E5%AF%BC%E4%B9%A6.html',
            },
          ],
        },
        {
          name: '容器集成',
          list: [
            {
              name: 'docker安装openGauss',
              link: '/zh/blogs/zhengwen2/openGauss快速安装方法(docker).html',
            },
            {
              name: 'openGauss在kubernetes集群环境上的部署',
              link: '/zh/blogs/zhengwen2/openGauss%E5%9C%A8kubernetes%E9%9B%86%E7%BE%A4%E7%8E%AF%E5%A2%83%E4%B8%8A%E7%9A%84%E9%83%A8%E7%BD%B2.html',
            },
          ],
        },
      ],
    },
    {
      name: '数据库工具',
      moduleTypes: [
        {
          name: '备份恢复',
          list: [
            {
              name: '物理备份恢复之gs_basebackup',
              link: '/zh/blogs/July/openGauss%E7%89%A9%E7%90%86%E5%A4%87%E4%BB%BD%E6%81%A2%E5%A4%8D%E4%B9%8Bgsbasebackup.html',
            },
            {
              name: '逻辑备份及恢复',
              link: '/zh/blogs/July/openGauss%E9%80%BB%E8%BE%91%E5%A4%87%E4%BB%BD%E5%8F%8A%E6%81%A2%E5%A4%8D.html',
            },
            {
              name: 'openGauss备份恢复gs_probackup',
              link: '/zh/blogs/zhengwen2/openGauss 备份恢复gs_probackup.html',
            },
            {
              name: 'openGauss增量备份恢复',
              link: '/zh/blogs/jiajunfeng/openGauss%E5%A2%9E%E9%87%8F%E5%A4%87%E4%BB%BD%E6%81%A2%E5%A4%8D.html',
            },
          ],
        },
        {
          name: '迁移工具',
          list: [
            {
              name: '将PostgreSQL插件移植到openGauss',
              link: '/zh/blogs/chenxiaobin/%E5%B0%86PostgreSQL%E6%8F%92%E4%BB%B6%E7%A7%BB%E6%A4%8D%E5%88%B0openGauss%E6%8C%87%E5%AF%BC.html',
            },
            {
              name: '使用pg_chameleon迁移MySQL数据库至openGauss',
              link: '/zh/blogs/totaj/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8pg_chameleon%E8%BF%81%E7%A7%BBMySQL%E6%95%B0%E6%8D%AE%E5%BA%93%E8%87%B3openGauss.html',
            },
            {
              name: '如何使用pgloader迁移MySQL数据库至openGauss',
              link: '/zh/blogs/totaj/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8pgloader%E8%BF%81%E7%A7%BBMySQL%E6%95%B0%E6%8D%AE%E5%BA%93%E8%87%B3openGauss.html',
            },
          ],
        },
        {
          name: '客户端',
          list: [
            {
              name: 'opengauss常用的客户端连接工具',
              link: '/zh/blogs/lihongda/openGauss%E5%B8%B8%E7%94%A8%E7%9A%84%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%BF%9E%E6%8E%A5%E5%B7%A5%E5%85%B7.html',
            },
            {
              name: 'PowerDesigner使用JDBC连接openGauss指导',
              link: '/zh/blogs/wangrui/PowerDesigner_for_openGauss.html',
            },
            {
              name: 'Dbeaver适配openGauss使用指导',
              link: '/zh/blogs/justbk/2020-10-30_dbeaver_for_openGauss.html',
            },
          ],
        },
        {
          name: '监控',
          list: [
            {
              name: '普罗米修斯监控openGauss',
              link: '/zh/blogs/zhangzhijing/%E6%99%AE%E7%BD%97%E7%B1%B3%E4%BF%AE%E6%96%AF%E7%9B%91%E6%8E%A7openGauss.html',
            },
          ],
        },
      ],
    },
    {
      name: '数据库内核',
      moduleTypes: [
        {
          name: '内核解析',
          list: [
            {
              name: 'openGauss 锁机制实现浅析',
              link: '/zh/blogs/July/openGauss-%E9%94%81%E6%9C%BA%E5%88%B6%E5%AE%9E%E7%8E%B0%E6%B5%85%E6%9E%90.html',
            },
            {
              name: 'B-tree索引读写并发原理',
              link: '/zh/blogs/July/openGauss-B-tree%E7%B4%A2%E5%BC%95%E8%AF%BB%E5%86%99%E5%B9%B6%E5%8F%91%E5%8E%9F%E7%90%86.html',
            },
            {
              name: 'opengauss索引详解 ',
              link: '/zh/blogs/zhengwen2/OpenGauss%E7%B4%A2%E5%BC%95%E8%AF%A6%E8%A7%A3.html',
            },
            {
              name: 'openGauss内存管理初探',
              link: '/zh/blogs/zhengwen2/openGauss%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86%E5%88%9D%E6%8E%A2.html',
            },
            {
              name: 'opengauss的mvcc以及vacuum机制源码解析csn-log',
              link: '/zh/blogs/minshengyunwei/openGauss%E7%9A%84MVCC%E4%BB%A5%E5%8F%8Avacuum%E6%9C%BA%E5%88%B6%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90—CSN LOG.html',
            },
            {
              name: '插件化地为openGauss添加算子',
              link: '/zh/blogs/chenxiaobin/%E5%A6%82%E4%BD%95%E6%8F%92%E4%BB%B6%E5%8C%96%E5%9C%B0%E4%B8%BAopenGauss%E6%B7%BB%E5%8A%A0%E7%AE%97%E5%AD%90.html',
            },
          ],
        },
        {
          name: '常用视图',
          list: [
            {
              name: 'openGauss资源监控视图简介',
              link: '/zh/blogs/songqingyi/resource_views.html',
            },
            {
              name: 'openGauss监控场景处理',
              link: '/zh/blogs/wangxinjia/openGauss%E7%9B%91%E6%8E%A7%E5%9C%BA%E6%99%AF%E5%A4%84%E7%90%86.html',
            },
          ],
        },
        {
          name: '性能调优',
          list: [
            {
              name: 'benchmark使用',
              link: '/zh/blogs/optimize/opengauss-tpcc.html',
            },
            {
              name: 'openGauss数据库性能调优',
              link: '/zh/blogs/optimize/opengauss-optimize1.html',
            },
          ],
        },
      ],
    },
    {
      name: '数据库驱动',
      moduleTypes: [
        {
          name: '连接驱动',
          list: [
            {
              name: 'Python驱动快速入门',
              link: '/zh/blogs/jingjingwu/01.getting-started-with-python.html',
            },
            {
              name: 'PHP unixODBC Apache openGauss实现数据库的连接',
              link: '/zh/blogs/user8927/PHP-unixODBC-Apache-openGauss实现数据库的连接.html',
            },
          ],
        },
      ],
    },
  ],
};
