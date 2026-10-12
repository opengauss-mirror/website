import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const tdksDir = resolve(rootDir, '.geo/tdks');

// issue #421 改动的 8 个 TDK 页面（zh/en 镜像），title 应严格等于对应页面正文 H1 文案
const PAGES = [
  { pagePath: 'zh/privacy', h1: '隐私声明' },
  { pagePath: 'en/privacy', h1: 'Privacy Statement' },
  { pagePath: 'zh/legal', h1: '法律声明' },
  { pagePath: 'en/legal', h1: 'Legal Notice' },
  { pagePath: 'zh/cookies', h1: '关于COOKIES' },
  { pagePath: 'en/cookies', h1: 'About Cookies' },
  { pagePath: 'zh/about-us', h1: '关于我们' },
  { pagePath: 'en/about-us', h1: 'About Us' },
] as const;

function readTdk(pagePath: string) {
  const filePath = resolve(tdksDir, pagePath, 'index.json');
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

describe('issue #421: TDK JSON 字段结构与有效性', () => {
  for (const { pagePath } of PAGES) {
    it(`${pagePath}/index.json 恰好含 title / description / keywords 三字段`, () => {
      const tdk = readTdk(pagePath);
      expect(Object.keys(tdk)).toEqual(['title', 'description', 'keywords']);
    });

    it(`${pagePath}/index.json description 非空字符串`, () => {
      const tdk = readTdk(pagePath);
      expect(typeof tdk.description).toBe('string');
      expect(tdk.description.length).toBeGreaterThan(0);
    });

    it(`${pagePath}/index.json keywords 非空字符串`, () => {
      const tdk = readTdk(pagePath);
      expect(typeof tdk.keywords).toBe('string');
      expect(tdk.keywords.length).toBeGreaterThan(0);
    });
  }
});

describe('issue #421: TDK title 严格等于页面 H1 文案（核心验收）', () => {
  for (const { pagePath, h1 } of PAGES) {
    it(`${pagePath} title === H1 ("${h1}")`, () => {
      const tdk = readTdk(pagePath);
      expect(tdk.title).toBe(h1);
    });
  }
});

describe('issue #421: TDK title 不含 "|" 与品牌前缀（避免双竖线 bug 复现）', () => {
  for (const { pagePath } of PAGES) {
    it(`${pagePath} title 不含 "|" 且不含 "openGauss" 品牌前缀`, () => {
      const tdk = readTdk(pagePath);
      expect(tdk.title).not.toContain('|');
      expect(tdk.title.toLowerCase()).not.toContain('opengauss');
    });
  }
});

describe('issue #421: privacy — en desc 补齐 mailing list（修复术语漂移）', () => {
  it('en/privacy description 含 "mailing list"', () => {
    const tdk = readTdk('en/privacy');
    expect(tdk.description.toLowerCase()).toContain('mailing list');
  });

  it('zh/privacy description 含 "邮件列表"', () => {
    const tdk = readTdk('zh/privacy');
    expect(tdk.description).toContain('邮件列表');
  });
});

describe('issue #421: legal — desc / keywords 不含正文不存在的 "许可/licensing"（§3.1 合规）', () => {
  it('zh/legal description 不含 "许可"', () => {
    const tdk = readTdk('zh/legal');
    expect(tdk.description).not.toContain('许可');
  });

  it('en/legal description 不含 "licensing"', () => {
    const tdk = readTdk('en/legal');
    expect(tdk.description.toLowerCase()).not.toContain('licensing');
  });

  it('zh/legal keywords 不含 "许可"', () => {
    const tdk = readTdk('zh/legal');
    expect(tdk.keywords).not.toContain('许可');
  });

  it('en/legal keywords 不含 "licensing"', () => {
    const tdk = readTdk('en/legal');
    expect(tdk.keywords.toLowerCase()).not.toContain('licensing');
  });
});

describe('issue #421: legal — desc 覆盖正文实有术语（zh/en 逐项对齐）', () => {
  const zhTerms = ['访问条款', '个人信息保护', '著作权', '商标', 'AI服务', '适用法律'];
  const enTerms = [
    'access terms',
    'personal data protection',
    'copyright',
    'trademark',
    'AI service',
    'applicable law',
  ];

  for (const term of zhTerms) {
    it(`zh/legal description 含 "${term}"`, () => {
      const tdk = readTdk('zh/legal');
      expect(tdk.description).toContain(term);
    });
  }
  for (const term of enTerms) {
    it(`en/legal description 含 "${term}"`, () => {
      const tdk = readTdk('en/legal');
      expect(tdk.description.toLowerCase()).toContain(term.toLowerCase());
    });
  }
});

describe('issue #421: about-us — zh desc 覆盖正文实有四节内容', () => {
  const zhTerms = [
    '高性能',
    '高可靠',
    '高安全',
    '高智能',
    '开源数据库',
    '开源历史',
    '组织仓库',
    '版本发布',
  ];
  for (const term of zhTerms) {
    it(`zh/about-us description 含 "${term}"`, () => {
      const tdk = readTdk('zh/about-us');
      expect(tdk.description).toContain(term);
    });
  }
});

describe('issue #421: about-us — en desc 与 zh 逐句对齐', () => {
  const enTerms = [
    'open source database',
    'high performance',
    'reliability',
    'security',
    'intelligence',
    'open source history',
    'repositories',
    'release strategy',
  ];
  for (const term of enTerms) {
    it(`en/about-us description 含 "${term}"`, () => {
      const tdk = readTdk('en/about-us');
      expect(tdk.description.toLowerCase()).toContain(term.toLowerCase());
    });
  }
});

describe('issue #421: zh/en 双语同步 — title 语义对齐', () => {
  const pairs: Array<[string, string, string]> = [
    ['privacy', '隐私声明', 'Privacy Statement'],
    ['legal', '法律声明', 'Legal Notice'],
    ['cookies', '关于COOKIES', 'About Cookies'],
    ['about-us', '关于我们', 'About Us'],
  ];
  for (const [slug, zhTitle, enTitle] of pairs) {
    it(`zh/${slug} 与 en/${slug} title 均已对齐`, () => {
      const zh = readTdk(`zh/${slug}`);
      const en = readTdk(`en/${slug}`);
      expect(zh.title).toBe(zhTitle);
      expect(en.title).toBe(enTitle);
    });
  }
});

describe('issue #421: keywords 含 openGauss 品牌词', () => {
  for (const { pagePath } of PAGES) {
    it(`${pagePath} keywords 含 openGauss`, () => {
      const tdk = readTdk(pagePath);
      expect(tdk.keywords).toContain('openGauss');
    });
  }
});
