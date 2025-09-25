

import { EULER_LINK, MINDSPORE_LINK, LOOKENG_LINK, KUNPENG_LINK, BBSCSDN_LINK, EULER_EN_LINK, OPENUBMC_URL, OPENFUYAO_URL } from '@/data/url-config';

export default {
  FOOTER_NAVS: [
    {
      NAME: '关于openGauss',
      LINKS: [
        {
          NAME: '社区组织',
          URL: '/en/member/',
        },
        {
          NAME: '社区荣誉',
          URL: '/en/honor/',
        },
        {
          NAME: '贡献看板',
          URL: 'https://datastat.opengauss.org/en/overview',
        },
      ],
    },
    {
      NAME: '新闻与资讯',
      LINKS: [
        {
          NAME: '新闻',
          URL: '/en/news/',
        },
        {
          NAME: '博客',
          URL: '/en/blogs/',
        },
        {
          NAME: '技术白皮书',
          URL: 'https://docs.opengauss.org/en/docs/6.0.0/docs/TechnicalWhitePaper/Technicalwhitepaper.html',
        },
      ],
    },
    {
      NAME: '获取与下载',
      LINKS: [
        {
          NAME: '获取软件包',
          URL: '/en/download/',
        },
        {
          NAME: '工具中心',
          URL: '/en/tools/',
        },
        {
          NAME: '全部版本',
          URL: '/en/download/?version=all',
        },
      ],
    },
    {
      NAME: '支持与服务',
      LINKS: [
        {
          NAME: '文档中心',
          URL: 'https://docs.opengauss.org/en/',
        },
        {
          NAME: '常见问题',
          URL: '/en/faq/',
        },
        {
          NAME: '安全公告',
          URL: '/en/security-advisories/',
        },
      ],
    },
    {
      NAME: '互动与交流',
      LINKS: [
        {
          NAME: '线上交流',
          URL: '/en/online-communication/',
        },
        {
          NAME: '活动',
          URL: '/en/events/',
        },
        {
          NAME: '社区论坛',
          URL: 'https://discuss.opengauss.org/',
        },
      ],
    },
    {
      NAME: '贡献与成长',
      LINKS: [
        {
          NAME: '贡献攻略',
          URL: '/en/contribution/',
        },
        {
          NAME: '视频',
          URL: '/en/video/',
        },
      ],
    },
  ],
  FRIENDLY_LINKS: [
    {
      NAME: 'openEuler',
      URL:  `${EULER_EN_LINK}/en/`,
    },
    {
      NAME: '昇思MindSpore',
      URL: `${MINDSPORE_LINK}en/`,
    },
    {
      NAME: 'openUBMC',
      URL: OPENUBMC_URL,
    },
    {
      NAME: 'openFuyao',
      URL: OPENFUYAO_URL,
    },
    {
      NAME: '鲲鹏社区',
      URL: `${KUNPENG_LINK}en/`,
    },
    {
      NAME: 'Gauss 松鼠会',
      URL: `${BBSCSDN_LINK}forums/gaussdb`,
    },
  ],
  OPTIONS: [
    {
      NAME: `品牌`,
      URL: `/en/brand/`,
      TARGET: `_blank`,
    },
    {
      NAME: `隐私政策`,
      URL: `/en/privacy/`,
      TARGET: `_blank`,
    },
    {
      NAME: `法律声明`,
      URL: `/en/legal/`,
      TARGET: `_blank`,
    },
    {
      NAME: `关于cookies`,
      URL: `/en/cookies/`,
      TARGET: `_blank`,
    },
    {
      NAME: `关于我们`,
      URL: `/en/about-us/`,
      TARGET: `_blank`,
    },
  ],
  COPY_RIGHT: `版权所有 ©  openGauss {year} 保留一切权利`,
  OFFICIAL_ACCOUNT: 'openGauss公众号',
};
