import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');

type Lang = 'zh' | 'en';
type Page = 'agent' | 'rag';

function readTdk(lang: Lang, page: Page) {
  const tdkPath = resolve(rootDir, '.geo/tdks', `${lang}/ai/${page}`, 'index.json');
  expect(existsSync(tdkPath)).toBe(true);
  return JSON.parse(readFileSync(tdkPath, 'utf-8'));
}

function readFrontmatterTitle(lang: Lang, page: Page) {
  const filePath = resolve(rootDir, `app/${lang}/ai/${page}/index.md`);
  expect(existsSync(filePath)).toBe(true);
  const raw = readFileSync(filePath, 'utf-8');
  const match = raw.match(/^title:\s*['"]?(.+?)['"]?\s*$/m);
  return match ? match[1] : null;
}

const EXPECTED_TDK_TITLE: Record<Lang, Record<Page, string>> = {
  zh: { agent: 'Agent专区', rag: 'RAG专区' },
  en: { agent: 'Agent Zone', rag: 'RAG Zone' },
};

const FRONTMATTER_TITLE: Record<Lang, string> = {
  zh: 'AI专区',
  en: 'AI Zone',
};

const LANGS: Lang[] = ['zh', 'en'];
const PAGES: Page[] = ['agent', 'rag'];

describe('issue #432: TDK 文件存在且 title 去重', () => {
  for (const lang of LANGS) {
    for (const page of PAGES) {
      it(`${lang}/ai/${page} TDK title === "${EXPECTED_TDK_TITLE[lang][page]}"`, () => {
        const tdk = readTdk(lang, page);
        expect(tdk.title).toBe(EXPECTED_TDK_TITLE[lang][page]);
      });
    }
  }
});

describe('issue #432: agent 与 rag 两页 TDK title 不再重复（核心验收）', () => {
  for (const lang of LANGS) {
    it(`${lang} — agent TDK title !== rag TDK title`, () => {
      const agentTdk = readTdk(lang, 'agent');
      const ragTdk = readTdk(lang, 'rag');
      expect(agentTdk.title).not.toBe(ragTdk.title);
    });
  }
});

describe('issue #432: frontmatter title 保持不变（BannerLevel2 依赖 frontmatter.title 展示 banner）', () => {
  for (const lang of LANGS) {
    for (const page of PAGES) {
      it(`${lang}/ai/${page} frontmatter title 仍为 "${FRONTMATTER_TITLE[lang]}"`, () => {
        const fmTitle = readFrontmatterTitle(lang, page);
        expect(fmTitle).toBe(FRONTMATTER_TITLE[lang]);
      });
    }
  }
});

describe('issue #432: TDK title 与 frontmatter title 不同（TDK 覆盖浏览器标签标题）', () => {
  for (const lang of LANGS) {
    for (const page of PAGES) {
      it(`${lang}/ai/${page} TDK title !== frontmatter title`, () => {
        const tdk = readTdk(lang, page);
        const fmTitle = readFrontmatterTitle(lang, page);
        expect(tdk.title).not.toBe(fmTitle);
      });
    }
  }
});

describe('issue #432: zh/en 双语语义对齐', () => {
  for (const page of PAGES) {
    it(`agent/rag zh TDK title 与 en TDK title 语义一致（含共同子串）`, () => {
      const zhTdk = readTdk('zh', page);
      const enTdk = readTdk('en', page);
      const zhKey = zhTdk.title.replace('专区', '');
      const enKey = enTdk.title.replace(' Zone', '');
      expect(zhKey.toLowerCase()).toBe(enKey.toLowerCase());
    });
  }
});

describe('issue #432: TDK 文件包含 description 和 keywords', () => {
  for (const lang of LANGS) {
    for (const page of PAGES) {
      it(`${lang}/ai/${page} TDK 有非空 description 和 keywords`, () => {
        const tdk = readTdk(lang, page);
        expect(tdk.description).toBeTruthy();
        expect(tdk.keywords).toBeTruthy();
      });
    }
  }
});
