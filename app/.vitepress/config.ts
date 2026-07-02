import type { PageData, UserConfig } from 'vitepress';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import { existsSync, readFileSync } from 'node:fs';
import process from 'node:process';
import { dirname, join } from 'node:path';
import hljs from 'highlight.js';
import { fileURLToPath } from 'node:url';
import generateLastmodAndChangefreq from '@opendesign-plus/plugins/vite/generate-lastmod-changefreq';
import generateLLMsFull from '@opendesign-plus/geo-scripts/generate-llms-full';
import contentYamlPlugin from './plugins/vite-plugin-content-yaml';
import generateSEOManifest from './scripts/generate-tdk-schema-for-articles';
import { PRIORITY_MAP, DEFAULT_PRIORITY, normalizeSitemapUrl } from './sitemap-priority';

const __dirname = dirname(fileURLToPath(import.meta.url));
const geoDir = join(__dirname, '../../.geo')

const excludes = process.argv
  .filter(arg => arg.startsWith('--exclude='))
  .flatMap(arg => {
    const val = arg.split('=')[1];
    if (val.includes(',')) {
      return val.split(',').map(v => v.trim());
    }
    return val;
  });

/**
 * 设置JSON-LD
 */
const setJSONLD = async (pageData: PageData, pagePath: string) => {
  const jsonFile = join(geoDir, 'jsonld', pagePath, 'index.json');
  if (!existsSync(jsonFile)) {
    return;
  }
  let content = readFileSync(jsonFile, 'utf-8');
  if (content) {
    (pageData.frontmatter.head ??= []).push([
      'script',
      { type: 'application/ld+json' },
      content
    ]);
  }
};

const setTdk = (pageData: PageData, pagePath: string) => {
  const jsonFile = join(geoDir, 'tdks', pagePath, 'index.json');
  const tdkInfo = existsSync(jsonFile) ? JSON.parse(readFileSync(jsonFile, 'utf-8')) : null;

  pageData.titleTemplate = `:title | ${pagePath.startsWith('zh') ? 'openGauss社区官网' : 'openGauss Official Website'}`;
  if (!tdkInfo) {
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
}

const config: UserConfig = {
  sitemap: {
    hostname: 'https://opengauss.org',
    transformItems(items) {
      try {
        const lastmodeTimeStamp = JSON.parse(readFileSync(join(geoDir, 'sitemap-records.json'), 'utf-8')) as Record<string, number>;
        for (const item of items) {
          const key = item.url.endsWith('.html') ? item.url.replace('.html', '.md') : (item.url.endsWith('/') ? `${item.url}index.md` : `${item.url}/index.md`);
          const generatedItem = lastmodeTimeStamp[key];
          if (generatedItem) {
            Object.assign(item, generatedItem);
          }
        }
      } catch {}
      for (const item of items) {
        const normalizedUrl = normalizeSitemapUrl(item.url);
        let matched = false;
        for (const [pattern, prio] of PRIORITY_MAP) {
          if (pattern.test(normalizedUrl)) {
            item.priority = prio;
            matched = true;
            break;
          }
        }
        if (!matched) {
          item.priority = DEFAULT_PRIORITY;
        }
      }
      return items;
    },
  },
  lastUpdated: true,
  srcExclude: excludes,
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
    let pagePath: string;
    if (pageData.filePath.endsWith('index.md')) {
      pagePath = encodeURI(pageData.filePath.slice(0, -9));
    } else {
      pagePath = encodeURI(pageData.filePath.slice(0, -3));
    }

    const isArticle = generateSEOManifest(pageData);
    if (!isArticle) {
      setTdk(pageData, pagePath);
      setJSONLD(pageData, pagePath);
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
  vite: {
    resolve: {
      alias: {
        '#content': join(__dirname, '../../.content'),
      },
    },
    plugins: [
      generateLastmodAndChangefreq({
        rootDir: join(__dirname, '../'),
        pageEntryPattern: ['zh/**/*.md', 'en/**/*.md'],
        outputFile: join(__dirname, '../../.geo/sitemap-records.json'),
      }),
      contentYamlPlugin(),
      // https://github.com/intlify/vue-i18n/issues/1569
      vueI18n({
        ssr: process.env.NODE_ENV === 'production',
        runtimeOnly: false
      })
    ],
  },
  async buildEnd() {
    await generateLLMsFull({
      prefix: `# openGauss官方网站 | openGauss主页 | openGauss社区官网

> openGauss是一个高性能、高安全、高可用、高智能的企业级开源关系数据库。openGauss也是一个鼓励社区贡献和协作的开源数据库平台。
 `,
      site: 'https://opengauss.org',
      exclude: [/(zh|en)\/(blogs|news|cookies|legal|events|cookies|search|privacy|data-sharing-with-third-parties|personal-data-collection-overview)/],
      removeClass: ['feedback', 'feedback-md'],
      htmlDir: join(__dirname, 'dist'),
      output: join(__dirname, 'dist/llms-full.txt')
    });
  },
};
export default config;
