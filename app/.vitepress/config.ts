import type { UserConfig } from 'vitepress';

const config: UserConfig = {
  base: '/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
    [
      'script',
      {
        src: 'https://hm.baidu.com/hm.js?ace49cc6c2f3d0542e97ce86732094dc',
      },
    ],
  ],
  appearance: true, // enable dynamic scripts for dark mode
  titleTemplate: false, //  vitepress supports pageTitileTemplate since 1.0.0
  locales: {
    '/': {
      lang: 'zh',
      title: 'openGauss',
      description:
        'openGauss is an enterprise-grade open source relational database with high-performance, high-security, high-reliability. openGauss is also an open source database platform that encourages community contribution and collaboration.',
    },
    '/zh/': {
      lang: 'zh',
      title: 'openGauss',
      description:
        'openGauss is an enterprise-grade open source relational database with high-performance, high-security, high-reliability. openGauss is also an open source database platform that encourages community contribution and collaboration.',
    },
    '/en/': {
      lang: 'en',
      title: 'openGauss',
      description:
        'openGauss is an enterprise-grade open source relational database with high-performance, high-security, high-reliability. openGauss is also an open source database platform that encourages community contribution and collaboration.',
    },
  },
  markdown: {
    config(md) {
      md.set({
        html: true,
        linkify: false,
      });
    },
  },
  themeConfig: {
    docsUrl: 'https://docs.opengauss.org',
  },
};
export default config;
