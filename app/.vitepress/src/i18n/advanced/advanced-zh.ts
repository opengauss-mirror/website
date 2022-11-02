export default {
  title: '学习进阶',
  subhead: '进阶步骤',
  search: '搜索',
  type_docs_label: '文档资料',
  type_video_label: '视频学习',
  type_practice_label: '实践操作',
  modules: [
    {
      name: '基础准备',
      itemList: [
        {
          name: 'git使用',
          desc: 'git是一个开源的分布式版本控制系统，openGauss托管在gitee平台，使用git来管理源码。',
          docsList: [
            {
              name: 'git使用教程',
              link: 'https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%91%BD%E4%BB%A4%E8%A1%8C',
            },
            {
              name: 'openGauss社区入门-使用git提交代码',
              link: '/zh/blogs/xingchen/2020-05-30-start1.html',
            },
          ],
        },
        {
          name: 'Linux使用',
          desc: 'openGauss部署和运行在Linux操作系统上，请先了解和学习下Linux的基础操作。',
          docsList: [
            {
              name: '使用vmware安装Linux虚拟机',
              link: '/zh/blogs/zhaoyanliang/opengauss%E5%AD%A6%E4%B9%A0%E4%B8%80-centos%E5%AE%89%E8%A3%85.html',
            },
            {
              name: 'Linux基础命令介绍',
              link: 'https://www.runoob.com/linux/linux-command-manual.html',
            },
          ],
        },
        {
          name: 'openGauss介绍',
          desc: 'openGauss是一款企业级的开源关系型数据库管理系统。',
          videoList: [
            {
              name: '初识openGauss',
              link: '/zh/video/detail/?id=5-6',
            },
            {
              name: 'openGauss的过去、现在和未来',
              link: '/zh/video/detail/?id=1-14',
            },
            {
              name: 'openGauss开源社区介绍',
              link: '/zh/video/detail/?id=1-12',
            },
            {
              name: 'openGauss认证培训课程 OGCA',
              link: 'https://marketplace.huaweicloud.com/contents/70fffafd-db76-4940-b928-0f22a60c504c',
            },
          ],
          optionList: [
            {
              name: 'openGauss认证培训课程 OGCA',
              link: 'https://marketplace.huaweicloud.com/contents/70fffafd-db76-4940-b928-0f22a60c504c',
            },
          ],
        },
      ],
    },
    {
      name: '部署openGauss',
      itemList: [
        {
          name: '极简安装',
          desc: '极简安装可以快速的部署起来一个数据库实例，省掉了集群管理工具安装时候的复杂流程，使用起来简单快捷。',
          docsList: [
            {
              name: '极简安装指南',
              link: 'https://opengauss-docs.test.osinfra.cn/zh/docs/latest/docs/installation/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
            },
            {
              name: '基于openGauss2.0.0版本极简安装文档',
              link: '/zh/blogs/jiajunfeng/opengauss2-0-0%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
            },
            {
              name: 'vmware+centos7.6+opengauss2.0.1极简版安装',
              link: '/zh/blogs/luooofan/20211127.html',
            },
          ],
        },
        {
          name: 'OM安装数据库',
          desc: 'OM(Operation Manager)即运维管理模块。提供对数据库配置管理、部署安装、日常运维等能力。',
          docsList: [
            {
              name: 'OM安装单机版openGauss数据库',
              link: '/zh/blogs/zhangxb/%E5%AE%89%E8%A3%85%E5%8D%95%E6%9C%BA%E7%89%88opengauss%E6%95%B0%E6%8D%AE%E5%BA%93.html',
            },
            {
              name: '使用OM工具安装一主一备指导',
              link: '/zh/blogs/jiajunfeng/opengauss2-0-0%E4%B8%BB%E5%A4%87%E5%AE%89%E8%A3%85%E9%83%A8%E7%BD%B2.html',
            },
          ],
          videoList: [
            {
              name: '轻松上手openGauss之openGauss安装部署',
              link: '/zh/video/detail/?id=5-5',
            },
          ],
          optionList: [
            {
              name: '基于华为云ECS安装openGauss沙箱实验',
              link: 'https://lab.huaweicloud.com/testdetail_483',
            },
          ],
        },
      ],
    },
    {
      name: '连接使用',
      itemList: [
        {
          name: 'gsql工具',
          desc: 'gsql是openGauss提供在Linux终端命令行下运行的数据库连接工具，可以通过此工具连接服务器并对其进行操作和维护。',
          docsList: [
            {
              name: 'gsql工具文档',
              link: 'https://opengauss-docs.test.osinfra.cn/zh/docs/2.1.0/docs/Toolreference/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%B7%A5%E5%85%B7.html',
            },
            {
              name: 'openGauss常用gsql命令集合',
              link: '/zh/blogs/zhangxb/opengauss%E5%B8%B8%E7%94%A8gsql%E5%91%BD%E4%BB%A4%E9%9B%86%E5%90%88.html',
            },
          ],
          videoList: [
            {
              name: 'SQL语法入门',
              link: '/zh/video/detail/?id=6-4',
            },
            {
              name: '轻松上手openGauss之SQL语言（上）',
              link: '/zh/video/detail/?id=5-1',
            },
            {
              name: '轻松上手openGauss之SQL语言（下）',
              link: '/zh/video/detail/?id=5-0',
            },
          ],
        },
        {
          name: 'Data Studio工具',
          desc: 'Data Studio 是一个集成开发环境（IDE），帮助数据库开发人员便捷地构建应用程序，以图形化界面形式提供数据库关键特性。',
          docsList: [
            {
              name: 'Data Studio用户手册',
              link: 'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.1.0/Data%20Studio%20%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.pdf',
            },
            {
              name: '安装单机版数据库并使用Data Studio工具连接',
              link: '/zh/blogs/mingruifu/opengauss%E5%AE%89%E8%A3%85%E5%B9%B6%E4%BD%BF%E7%94%A8datastudio%E5%B7%A5%E5%85%B7%E8%BF%9E%E6%8E%A5%E4%BD%BF%E7%94%A8.html',
            },
          ],
          videoList: [
            {
              name: 'openGauss客户端工具Data Studio介绍',
              link: '/zh/video/detail/?id=1-4',
            },
          ],
        },
        {
          name: '数据库驱动',
          desc: '数据库驱动，即数据库应用程序接口，可以为多种关系数据库提供统一访问接口，应用程序可基于它操作数据。 openGauss支持多种开发语言的驱动，如JDBC、ODBC、Python等。',
          docsList: [
            {
              name: 'JDBC开发文档',
              link: 'https://opengauss-docs.test.osinfra.cn/zh/docs/2.1.0/docs/Developerguide/%E5%9F%BA%E4%BA%8EJDBC%E5%BC%80%E5%8F%91.html',
            },
            {
              name: 'ODBC开发文档',
              link: 'https://opengauss-docs.test.osinfra.cn/zh/docs/2.1.0/docs/Developerguide/%E5%9F%BA%E4%BA%8EODBC%E5%BC%80%E5%8F%91.html',
            },
            {
              name: 'Psycopg开发文档',
              link: 'https://opengauss-docs.test.osinfra.cn/zh/docs/2.1.0/docs/Developerguide/%E5%9F%BA%E4%BA%8EPsycopg%E5%BC%80%E5%8F%91.html',
            },
          ],
          optionList: [
            {
              name: 'openGauss数据库模拟金融领域的开发使用实践',
              link: 'https://lab.huaweicloud.com/testdetail_508',
            },
          ],
        },
      ],
    },
    {
      name: '编译开发',
      itemList: [
        {
          name: '数据库编译',
          desc: '介绍数据库从源码编译为二进制文件的过程，包含三方库编译、源码自身编译，以及编译过程中常遇到问题解决。',
          docsList: [
            {
              name: 'openGauss数据库编译指导',
              link: '/zh/blogs/xingchen/opengauss_compile.html',
            },
            {
              name: 'openGauss编译安装常见错误及解决',
              link: '/zh/blogs/cchen676/opengauss_%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF.html',
            },
          ],
        },
        {
          name: '数据库调试',
          desc: '介绍下通过源码以debug方式编译数据库，以及使用gdb工具进行单步调试。',
          docsList: [
            {
              name: '如何使用gdb工具调试数据库',
              link: '/zh/blogs/zhangxb/gdb_opengauss.html',
            },
          ],
        },
      ],
    },
    {
      name: '内核进阶',
      itemList: [
        {
          name: 'SQL引擎',
          desc: 'SQL引擎作为数据库系统的入口，主要承担对用户输入的SQL语句进行解析、优化以及执行。',
          docsList: [
            {
              name: '如何在openGauss添加一个系统函数',
              link: '/zh/blogs/huzhengchao/2021-12-09-howtoaddanewfunc.html',
            },
            {
              name: 'openGauss的sql引擎流程以及解析源码解读',
              link: '/zh/blogs/jackey-wu/%E5%BC%80%E6%BA%90%E6%95%B0%E6%8D%AE%E5%BA%93opengauss%E7%9A%84sql%E8%A7%A3%E6%9E%90%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.html',
            },
            {
              name: 'openGauss-sql执行器介绍',
              link: '/zh/blogs/july/opengauss-sql%E6%89%A7%E8%A1%8C%E5%99%A8.html',
            },
          ],
          videoList: [
            {
              name: '轻松上手openGauss之对象管理（上）',
              link: '/zh/video/detail/?id=5-3',
            },
            {
              name: '轻松上手openGauss之对象管理（下）',
              link: '/zh/video/detail/?id=5-2',
            },
          ],
        },
        {
          name: '存储引擎',
          desc: '存储引擎向上对接SQL引擎，提供准确查询数据。向下对接存储介质，持久化数据到磁盘。openGauss支持多种存储引擎，如行存引擎、列存引擎以及内存引擎等，能够同时满足OLTP和OLAP下不同的业务场景。',
          docsList: [
            {
              name: 'openGauss数据库行存储源代码解析',
              link: '/zh/blogs/vector524/%E5%8D%8E%E4%B8%BAopengauss%E6%95%B0%E6%8D%AE%E5%BA%93%E8%A1%8C%E5%AD%98%E5%82%A8%E6%BA%90%E4%BB%A3%E7%A0%81%E8%A7%A3%E6%9E%90.html',
            },
            {
              name: 'opengauss事务机制-mvcc技术的实现分析',
              link: '/zh/blogs/luooofan/opengauss%E4%BA%8B%E5%8A%A1%E6%9C%BA%E5%88%B6-mvcc%E6%8A%80%E6%9C%AF%E7%9A%84%E5%AE%9E%E7%8E%B0.html',
            },
            {
              name: 'openGauss备份恢复功能介绍',
              link: '/zh/blogs/july/opengauss%E5%A4%87%E4%BB%BD%E6%81%A2%E5%A4%8D.html',
            },
          ],
          videoList: [
            {
              name: 'openGauss HA - 高可用简介',
              link: '/zh/video/detail/?id=1-2',
            },
            {
              name: 'openGauss高吞吐低时延存储模式-MOT内存表介绍',
              link: '/zh/video/detail/?id=1-11',
            },
          ],
        },
        {
          name: '性能调优',
          desc: '高性能是openGauss的一大特点。为了能够达到数据库的极致性能，需要对数据库在系统层面进行调优配置。',
          docsList: [
            {
              name: 'benchmark使用介绍',
              link: '/zh/blogs/optimize/opengauss-tpcc.html',
            },
            {
              name: 'openGauss数据库性能调优指导文档',
              link: '/zh/blogs/optimize/opengauss-optimize1.html',
            },
            {
              name: 'BenchmarkSQL高性能测试指导',
              link: '/zh/blogs/justbk/2021-12-17_how_to_test_perfermance_for_opengauss.html',
            },
            {},
          ],
          videoList: [
            {
              name: '鲲鹏性能优化之一 数据分区',
              link: '/zh/video/detail/?id=1-10',
            },
            {
              name: '鲲鹏性能优化之二 数据结构NUMA化',
              link: '/zh/video/detail/?id=1-9',
            },
            {
              name: '鲲鹏性能优化之三 线程绑核',
              link: '/zh/video/detail/?id=1-8',
            },
          ],
        },
      ],
    },
  ],
};
