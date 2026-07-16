import { expect, describe, it } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const geoDir = resolve(rootDir, '.geo');

const NEW_JSONLD_PAGES = [
  'en/blogs',
  'zh/blogs',
  'zh/cve/detail',
  'en/events',
  'zh/events',
  'zh/events/list',
  'en/news',
  'zh/news',
  'zh/summit/devday2025/legal',
  'zh/summit/devday2025/privacy',
];

const ALREADY_EXISTING_JSONLD_PAGES = [
  'en/user-practice',
  'zh/user-practice',
];

function readJsonldJson(pagePath: string) {
  const filePath = resolve(geoDir, 'jsonld', pagePath, 'index.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

describe('new JSON-LD JSON files exist and are valid', () => {
  for (const pagePath of NEW_JSONLD_PAGES) {
    it(`${pagePath}/index.json file exists`, () => {
      const filePath = resolve(geoDir, 'jsonld', pagePath, 'index.json');
      expect(existsSync(filePath)).toBe(true);
    });

    it(`${pagePath}/index.json is valid JSON`, () => {
      const jsonld = readJsonldJson(pagePath);
      expect(jsonld).not.toBeNull();
    });
  }
});

describe('new JSON-LD files have @context = schema.org', () => {
  for (const pagePath of NEW_JSONLD_PAGES) {
    it(`${pagePath} has @context = https://schema.org`, () => {
      const jsonld = readJsonldJson(pagePath);
      expect(jsonld['@context']).toBe('https://schema.org');
    });
  }
});

describe('CollectionPage+ItemList pattern pages (blogs, events, news)', () => {
  const collectionPages = [
    'en/blogs', 'zh/blogs',
    'en/events', 'zh/events',
    'en/news', 'zh/news',
  ];

  for (const pagePath of collectionPages) {
    it(`${pagePath} uses @graph structure`, () => {
      const jsonld = readJsonldJson(pagePath);
      expect(Array.isArray(jsonld['@graph'])).toBe(true);
    });

    it(`${pagePath} @graph contains CollectionPage`, () => {
      const jsonld = readJsonldJson(pagePath);
      const collectionPage = jsonld['@graph'].find(
        (item: any) => item['@type'] === 'CollectionPage'
      );
      expect(collectionPage).toBeDefined();
    });

    it(`${pagePath} @graph contains ItemList`, () => {
      const jsonld = readJsonldJson(pagePath);
      const itemList = jsonld['@graph'].find(
        (item: any) => item['@type'] === 'ItemList'
      );
      expect(itemList).toBeDefined();
    });

    it(`${pagePath} CollectionPage has url ending with /`, () => {
      const jsonld = readJsonldJson(pagePath);
      const collectionPage = jsonld['@graph'].find(
        (item: any) => item['@type'] === 'CollectionPage'
      );
      expect(collectionPage.url).toMatch(/\/$/);
    });

    it(`${pagePath} CollectionPage has inLanguage`, () => {
      const jsonld = readJsonldJson(pagePath);
      const collectionPage = jsonld['@graph'].find(
        (item: any) => item['@type'] === 'CollectionPage'
      );
      expect(collectionPage.inLanguage).toBeDefined();
    });
  }
});

describe('zh/events/list JSON-LD (isBlog fix verification)', () => {
  it('uses @graph structure', () => {
    const jsonld = readJsonldJson('zh/events/list');
    expect(Array.isArray(jsonld['@graph'])).toBe(true);
  });

  it('contains CollectionPage', () => {
    const jsonld = readJsonldJson('zh/events/list');
    const cp = jsonld['@graph'].find(
      (item: any) => item['@type'] === 'CollectionPage'
    );
    expect(cp).toBeDefined();
  });

  it('CollectionPage url ends with / (correct trailing slash)', () => {
    const jsonld = readJsonldJson('zh/events/list');
    const cp = jsonld['@graph'].find(
      (item: any) => item['@type'] === 'CollectionPage'
    );
    expect(cp.url).toBe('https://opengauss.org/zh/events/list/');
  });

  it('CollectionPage isPartOf points to zh/events collectionpage', () => {
    const jsonld = readJsonldJson('zh/events/list');
    const cp = jsonld['@graph'].find(
      (item: any) => item['@type'] === 'CollectionPage'
    );
    expect(cp.isPartOf['@id']).toContain('zh/events');
  });

  it('contains ItemList', () => {
    const jsonld = readJsonldJson('zh/events/list');
    const il = jsonld['@graph'].find(
      (item: any) => item['@type'] === 'ItemList'
    );
    expect(il).toBeDefined();
  });
});

describe('zh/cve/detail JSON-LD (WebPage+Breadcrumb pattern)', () => {
  it('uses @graph structure', () => {
    const jsonld = readJsonldJson('zh/cve/detail');
    expect(Array.isArray(jsonld['@graph'])).toBe(true);
  });

  it('contains WebPage', () => {
    const jsonld = readJsonldJson('zh/cve/detail');
    const wp = jsonld['@graph'].find(
      (item: any) => item['@type'] === 'WebPage'
    );
    expect(wp).toBeDefined();
  });

  it('contains BreadcrumbList', () => {
    const jsonld = readJsonldJson('zh/cve/detail');
    const bl = jsonld['@graph'].find(
      (item: any) => item['@type'] === 'BreadcrumbList'
    );
    expect(bl).toBeDefined();
  });

  it('WebPage url ends with /', () => {
    const jsonld = readJsonldJson('zh/cve/detail');
    const wp = jsonld['@graph'].find(
      (item: any) => item['@type'] === 'WebPage'
    );
    expect(wp.url).toMatch(/\/$/);
  });
});

describe('zh/summit/devday2025/legal JSON-LD (WebPage pattern)', () => {
  it('uses flat @type WebPage (not @graph)', () => {
    const jsonld = readJsonldJson('zh/summit/devday2025/legal');
    expect(jsonld['@type']).toBe('WebPage');
  });

  it('has @id with correct URL', () => {
    const jsonld = readJsonldJson('zh/summit/devday2025/legal');
    expect(jsonld['@id']).toBe('https://opengauss.org/zh/summit/devday2025/legal/');
  });

  it('has url ending with /', () => {
    const jsonld = readJsonldJson('zh/summit/devday2025/legal');
    expect(jsonld.url).toBe('https://opengauss.org/zh/summit/devday2025/legal/');
  });

  it('has name containing 法律声明', () => {
    const jsonld = readJsonldJson('zh/summit/devday2025/legal');
    expect(jsonld.name).toContain('法律声明');
  });

  it('isPartOf points to devday2025 Event', () => {
    const jsonld = readJsonldJson('zh/summit/devday2025/legal');
    expect(jsonld.isPartOf['@id']).toContain('devday2025');
  });
});

describe('zh/summit/devday2025/privacy JSON-LD (WebPage pattern)', () => {
  it('uses flat @type WebPage (not @graph)', () => {
    const jsonld = readJsonldJson('zh/summit/devday2025/privacy');
    expect(jsonld['@type']).toBe('WebPage');
  });

  it('has @id with correct URL', () => {
    const jsonld = readJsonldJson('zh/summit/devday2025/privacy');
    expect(jsonld['@id']).toBe('https://opengauss.org/zh/summit/devday2025/privacy/');
  });

  it('has name containing 隐私政策', () => {
    const jsonld = readJsonldJson('zh/summit/devday2025/privacy');
    expect(jsonld.name).toContain('隐私政策');
  });

  it('isPartOf points to devday2025 Event', () => {
    const jsonld = readJsonldJson('zh/summit/devday2025/privacy');
    expect(jsonld.isPartOf['@id']).toContain('devday2025');
  });
});

describe('JSON-LD URL trailing slash convention', () => {
  const allNewPages = NEW_JSONLD_PAGES;

  for (const pagePath of allNewPages) {
    it(`${pagePath} JSON-LD urls end with / or are @graph-based with trailing-slash urls`, () => {
      const jsonld = readJsonldJson(pagePath);
      if (jsonld['@graph']) {
        const mainEntity = jsonld['@graph'].find(
          (item: any) => item.url && (item['@type'] === 'CollectionPage' || item['@type'] === 'WebPage')
        );
        if (mainEntity) {
          expect(mainEntity.url).toMatch(/\/$/);
        }
      } else {
        expect(jsonld.url).toMatch(/\/$/);
      }
    });
  }
});

describe('already-existing JSON-LD pages still valid', () => {
  for (const pagePath of ALREADY_EXISTING_JSONLD_PAGES) {
    it(`${pagePath}/index.json still exists`, () => {
      const filePath = resolve(geoDir, 'jsonld', pagePath, 'index.json');
      expect(existsSync(filePath)).toBe(true);
    });

    it(`${pagePath}/index.json has @context = https://schema.org`, () => {
      const jsonld = readJsonldJson(pagePath);
      expect(jsonld['@context']).toBe('https://schema.org');
    });
  }
});
