import type { UserConfig } from 'vitepress';
import tdks from './tdks';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import hljs from 'highlight.js';

const require = createRequire(import.meta.url);

const isBlog = /.+\/(?:user-practice|events|news)\/.+$/;

const config: UserConfig = {
  sitemap: {
    hostname: 'https://opengauss.org',
    transformItems(items) {
      if (fs.existsSync(path.join(__dirname, 'records.json'))) {
        const records = require('./records.json');
        items.forEach((item) => {
          const timestamp = records[item.url];
          if (timestamp) {
            item.lastmod = new Date(timestamp);
          }
        });
      }
      return items;
    },
  },
  lastUpdated: true,
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
      'meta',
      {
        name: 'keywords',
        content: 'openGauss,开源数据库,openGauss社区官网,开源社区',
      },
    ],
    [
      'script',
      {
        src: '/check-dark-mode-v2.js',
      },
    ],
  ],
  appearance: false, // enable dynamic scripts for dark mode
  titleTemplate: false, //  vitepress supports pageTitileTemplate since 1.0.0
  async transformPageData(pageData) {
    const filePath = pageData.filePath;
    let lookupKey: string;
    if (filePath.endsWith('index.md')) {
      lookupKey = filePath.slice(0, -9);
    } else {
      lookupKey = filePath.slice(0, -2).concat('html');
    }
    const locale = filePath.slice(0, 2) as 'zh' | 'en';
    const tdkInfo = tdks[locale]?.[lookupKey];
    if (lookupKey === 'zh') {
      pageData.titleTemplate = 'openGauss社区官网';
    } else if (lookupKey === 'en') {
      pageData.titleTemplate = 'openGauss Official Website';
    } else {
      pageData.titleTemplate = `:title | ${tdks.titleSuffix[locale]}`;
    }
    if (!tdkInfo || isBlog.test(lookupKey)) {
      const frontmatter = pageData.frontmatter;
      const description = frontmatter?.summary || frontmatter?.Summary;
      if (!pageData.description && description) {
        pageData.description = description;
      }
      return;
    }
    const { title, description, keywords } = tdkInfo;
    description && (pageData.description = description);
    if (title) {
      pageData.title = title;
    }
    if (keywords) {
      pageData.frontmatter.head ??= [];
      pageData.frontmatter.head.push(['meta', { name: 'keywords', content: keywords }]);
    }
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      title: 'openGauss',
      description: 'openGauss是一个高性能、高安全、高可用、高智能的企业级开源关系数据库。openGauss也是一个鼓励社区贡献和协作的开源数据库平台。',
    },
    zh: {
      label: '中文',
      lang: 'zh',
      title: 'openGauss',
      description: 'openGauss是一个高性能、高安全、高可用、高智能的企业级开源关系数据库。openGauss也是一个鼓励社区贡献和协作的开源数据库平台。',
    },
    en: {
      label: 'English',
      lang: 'en',
      title: 'openGauss',
      description:
        'openGauss is an enterprise-grade open source relational database with high-performance, high-security, high-reliability. openGauss is also an open source database platform that encourages community contribution and collaboration.',
    },
  },
  markdown: {
    highlight: (code: string, lang: string) => {
      try {
        return `<pre class="hljs"><code v-pre>${
          lang && hljs.getLanguage(lang)
            ? hljs.highlight(code, {
                language: lang === 'shell' ? 'bash' : lang,
              }).value
            : hljs.highlightAuto(code).value
        }</code></pre>`;
      } catch {
        return `<pre class="hljs"><code v-pre>${code}</code></pre>`;
      }
    },
    config(md) {
      md.set({
        html: true,
        linkify: false,
      });
    },
  },
  ignoreDeadLinks: true,
};
export default config;
