import { BILIBILI_LINK2, DOCS_LINK, GITSCM_LINK, RUNOOB_LINK } from '@/data/url-config';

export default {
  title: '快速体验',
  search: '搜索',
  module: [
    {
      name: '基础准备',
      moduleTypes: [
        {
          name: 'git使用',
          desc: 'git是一个开源的分布式版本控制系统，openGauss托管在GitCode平台，使用git来管理源码',
          list: [
            {
              name: '使用教程',
              link: `${GITSCM_LINK}/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%91%BD%E4%BB%A4%E8%A1%8C`,
            },
            {
              name: 'openGauss社区入门-使用git提交代码',
              link: '/zh/blogs/xingchen/2020-05-30-start1.html',
            },
          ],
        },
        {
          name: 'Linux使用',
          desc: 'openGauss部署和运行在Linux操作系统上，请先了解和学习下Linux的基础操作',
          list: [
            {
              name: '使用vmware安装Linux虚拟机',
              link: '/zh/blogs/zhaoyanliang/openGauss%E5%AD%A6%E4%B9%A0%E4%B8%80-centos%E5%AE%89%E8%A3%85.html',
            },
            {
              name: 'Linux基础命令介绍',
              link: `${RUNOOB_LINK}/linux/linux-command-manual.html`,
            },
          ],
        },
      ],
    },
    {
      name: '部署安装文档',
      moduleTypes: [
        {
          name: 'openGauss 企业版',
          desc: '具备更齐全的集群管理功能，适合企业用户',
          list: [
            {
              name: '安装部署指南',
              link: `${DOCS_LINK}/zh/docs/5.0.0/docs/InstallationGuide/%E5%AE%89%E8%A3%85openGauss.html`,
            },
          ],
        },
        {
          name: 'openGauss 极简版',
          desc: '安装配置简单，解压可用，适合个人开发者',
          list: [
            {
              name: '极简版服务器安装',
              link: `${DOCS_LINK}/zh/docs/5.0.0/docs/InstallationGuide/%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85.html`,
            },
            {
              name: '极简版容器安装',
              link: `${DOCS_LINK}/zh/docs/5.0.0/docs/InstallationGuide/%E5%AE%B9%E5%99%A8%E5%AE%89%E8%A3%85.html`,
            },
            {
              name: '极简版RPM安装',
              link: `${DOCS_LINK}/zh/docs/5.0.0/docs/InstallationGuide/RPM%E5%AE%89%E8%A3%85.html`,
            },
          ],
        },
        {
          name: 'openGauss 轻量版',
          desc: '精简功能，缩减安装包大小，内存占用更少',
          list: [
            {
              name: '安装部署指南',
              link: `${DOCS_LINK}/zh/docs/latest-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E5%87%86%E5%A4%87.html`,
            },
          ],
        },
        {
          name: 'openGauss 分布式镜像',
          desc: '基于 ShardingSphere 和 k8s 的分布式容器化镜像',
          list: [
            {
              name: '安装部署指南',
              link: `${DOCS_LINK}/zh/docs/latest/docs/AboutopenGauss/%E4%BD%BF%E7%94%A8kubernetes%E9%83%A8%E7%BD%B2%E5%88%86%E5%B8%83%E5%BC%8F%E6%95%B0%E6%8D%AE%E5%BA%93.html`,
            },
          ],
        },
      ],
    },
    {
      name: '学习视频',
      moduleTypes: [
        {
          name: '安装部署视频',
          desc: '本视频为openGauss 3.0.0企业版、容器版、极简版安装指导视频，仅作为学习参考，更多关于openGauss的安装和使用，请参考文档内容',
          list: [
            {
              name: '安装部署视频',
              link: `${BILIBILI_LINK2}/video/BV1M84y1x773/?share_source=copy_web&vd_source=de84f4418ff2dc525893a1b2441121c0`,
            },
          ],
        },
      ],
    },
    {
      name: '更多问题',
      moduleTypes: [
        {
          name: '答疑与交流',
          desc: '添加openGauss社区微信小助手：openGauss-bot，进入openGauss开发者交流群',
          list: [
            {
              name: '常见问题解答',
              link: '/zh/faq/',
            },
          ],
        },
      ],
    },
  ],
};
