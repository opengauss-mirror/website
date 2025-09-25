import { EULER_LINK, MINDSPORE_LINK, LOOKENG_LINK, KUNPENG_LINK, BBSCSDN_LINK, EULER_EN_LINK, OPENUBMC_URL, OPENFUYAO_URL } from '@/data/url-config';

export default {
  FOOTER_NAVS: [
    {
      NAME: '关于openGauss',
      LINKS: [
        {
          NAME: 'Organization',
          URL: '/zh/member/',
        },
        {
          NAME: '社区荣誉',
          URL: '/zh/honor/',
        },
        {
          NAME: 'Statistics',
          URL: 'https://datastat.opengauss.org/zh/overview',
        },
      ],
    },
    {
      NAME: '新闻与资讯',
      LINKS: [
        {
          NAME: 'News',
          URL: '/zh/news/',
        },
        {
          NAME: 'Blog',
          URL: '/zh/blogs/',
        },
        {
          NAME: '技术白皮书',
          URL: 'https://docs.opengauss.org/zh/docs/6.0.0/docs/TechnicalWhitePaper/Technicalwhitepaper.html',
        },
      ],
    },
    {
      NAME: '获取与下载',
      LINKS: [
        {
          NAME: '获取软件包',
          URL: '/zh/download/',
        },
        {
          NAME: '工具中心',
          URL: '/zh/tools/',
        },
        {
          NAME: '全部版本',
          URL: '/zh/download/?version=all',
        },
      ],
    },
    {
      NAME: '支持与服务',
      LINKS: [
        {
          NAME: '文档中心',
          URL: 'https://docs.opengauss.org/zh/',
        },
        {
          NAME: '常见问题',
          URL: '/zh/faq/',
        },
        {
          NAME: 'Security Advisories',
          URL: '/zh/security-advisories/',
        },
      ],
    },
    {
      NAME: '互动与交流',
      LINKS: [
        {
          NAME: '线上交流',
          URL: '/zh/online-communication/',
        },
        {
          NAME: 'Events',
          URL: '/zh/events/',
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
          URL: '/zh/contribution/',
        },
        {
          NAME: 'Videos',
          URL: '/zh/video/',
        },
      ],
    },
  ],
  FRIENDLY_LINKS: [
    {
      NAME: 'openEuler',
      URL: EULER_LINK,
    },
    {
      NAME: '昇思MindSpore',
      URL: MINDSPORE_LINK,
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
      URL: KUNPENG_LINK,
    },
    {
      NAME: 'Gauss 松鼠会',
      URL: `${BBSCSDN_LINK}forums/gaussdb`,
    },
  ],
  OPTIONS: [
    {
      NAME: `Trademark`,
      URL: `/en/brand/`,
      TARGET: `_blank`,
    },
    {
      NAME: `Privacy Policy`,
      URL: `/en/privacy/`,
      TARGET: `_blank`,
    },
    {
      NAME: `Legal Notice`,
      URL: `/en/legal/`,
      TARGET: `_blank`,
    },
    {
      NAME: `About Cookies`,
      URL: `/en/cookies/`,
      TARGET: `_blank`,
    },
    {
      NAME: `About Us`,
      URL: `/en/about-us/`,
      TARGET: `_blank`,
    },
  ],
  COPY_RIGHT: `Copyright © openGauss {year}. All rights reserved.`,
  OFFICIAL_ACCOUNT: 'openGauss公众号',
};
