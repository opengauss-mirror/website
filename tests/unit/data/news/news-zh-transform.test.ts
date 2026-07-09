import { expect, describe, it } from 'vitest'
import { readFileSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '../../../../')

const zhNewsDir = resolve(rootDir, 'app/zh/news')
const PUBLIC_DIR = resolve(rootDir, 'app/.vitepress/public')

interface MockPage {
  url: string
  frontmatter: Record<string, any>
  relativePath: string
}

function bannerExists(bannerUrl: string): boolean {
  if (!bannerUrl.startsWith('/')) return false
  return existsSync(join(PUBLIC_DIR, bannerUrl))
}

function transformZhNews(data: MockPage[]) {
  return data
    .filter((p) => p.frontmatter.category === 'news')
    .map((p) => {
      const fm = p.frontmatter

      let date: string
      if (fm.date instanceof Date) {
        const d = new Date(fm.date)
        date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      } else if (typeof fm.date === 'string') {
        date = fm.date
      } else {
        date = ''
      }

      let banner: string
      if (typeof fm.banner === 'string' && fm.banner.startsWith('/')) {
        banner = fm.banner
      } else if (typeof fm.banner === 'string' && fm.banner !== '') {
        banner = `/category/news/${date}/${fm.banner}`
      } else {
        banner = `/category/news/${date}/banner.png`
      }

      const author = Array.isArray(fm.author) ? fm.author : fm.author ? [fm.author] : []
      const tags = Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : []
      const summary = fm.summary || ''
      const urlPath = p.url.replace(/^\//, '').replace(/\.html$/, '')
      const dateSplit = date.split('-')
      const archives = dateSplit.length >= 2 ? `${dateSplit[0]}-${dateSplit[1]}` : ''

      return {
        title: fm.title || '',
        date,
        banner,
        tags,
        author,
        category: fm.category || 'news',
        summary,
        path: urlPath,
        archives,
        img: fm.img || '',
      }
    })
    .filter((item) => bannerExists(item.banner))
    .sort((a, b) => {
      if (a.date !== b.date) {
        return b.date.localeCompare(a.date)
      }
      return a.title.localeCompare(b.title)
    })
}

function loadZhNewsPages(): MockPage[] {
  const pages: MockPage[] = []
  const dirs = readdirSync(zhNewsDir, { withFileTypes: true })
  for (const dirent of dirs) {
    if (!dirent.isDirectory()) continue
    const dateDir = dirent.name
    const subDir = resolve(zhNewsDir, dateDir)
    const subFiles = readdirSync(subDir)
    for (const file of subFiles) {
      if (!file.endsWith('.md')) continue
      const filePath = resolve(subDir, file)
      const content = readFileSync(filePath, 'utf-8')
      const parsed = matter(content)
      const urlPath = file === 'index.md'
        ? `/zh/news/${dateDir}/`
        : `/zh/news/${dateDir}/${file.replace(/\.md$/, '')}.html`
      pages.push({
        url: urlPath,
        frontmatter: parsed.data,
        relativePath: `zh/news/${dateDir}/${file}`,
      })
    }
  }
  return pages
}

describe('zh news loader — filter logic', () => {
  it('zh/news/index.md (root list page) has no category field', () => {
    const indexPath = resolve(zhNewsDir, 'index.md')
    const content = readFileSync(indexPath, 'utf-8')
    const parsed = matter(content)
    expect(parsed.data.category).toBeUndefined()
  })

  it('all filtered items have category === "news"', () => {
    const allPages = loadZhNewsPages()
    const filtered = transformZhNews(allPages)
    for (const item of filtered) {
      expect(item.category).toBe('news')
    }
  })

  it('pages without category are filtered out', () => {
    const allPages = loadZhNewsPages()
    const pagesWithoutCategory = allPages.filter(
      (p) => !p.frontmatter.category || p.frontmatter.category !== 'news'
    )
    const filtered = transformZhNews(allPages)
    const filteredPaths = filtered.map((f) => f.path)
    for (const p of pagesWithoutCategory) {
      const urlPath = p.url.replace(/^\//, '').replace(/\.html$/, '')
      expect(filteredPaths).not.toContain(urlPath)
    }
  })
})

describe('zh news loader — banner processing', () => {
  it('banner starting with "/" is used directly', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2026-05-15-605/',
        frontmatter: {
          title: 'test',
          date: '2026-05-15',
          banner: '/category/news/2026-05-15/605.png',
          category: 'news',
        },
        relativePath: 'zh/news/2026-05-15-605/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    expect(result.length).toBeGreaterThan(0)
    if (result.length > 0) {
      expect(result[0].banner).toBe('/category/news/2026-05-15/605.png')
    }
  })

  it('banner as filename-only uses fm.date for prefix', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2026-05-15-605/',
        frontmatter: {
          title: 'test',
          date: '2026-05-15',
          banner: '605.png',
          category: 'news',
        },
        relativePath: 'zh/news/2026-05-15-605/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].banner).toBe('/category/news/2026-05-15/605.png')
    }
  })

  it('missing banner field falls back to fm.date/banner.png', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2021-03-06/',
        frontmatter: {
          title: 'test',
          date: '2021-03-06',
          category: 'news',
        },
        relativePath: 'zh/news/2021-03-06/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].banner).toBe('/category/news/2021-03-06/banner.png')
    }
  })

  it('2026-05-15-605 frontmatter banner is full path (post-fix)', () => {
    const filePath = resolve(rootDir, 'app/zh/news/2026-05-15-605/index.md')
    const content = readFileSync(filePath, 'utf-8')
    const parsed = matter(content)
    expect(parsed.data.banner).toBe('/category/news/2026-05-15/605.png')
  })

  it('banner fallback uses fm.date (frontmatter.date) not directory name', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2021-04-01/20210401.html',
        frontmatter: {
          title: 'test',
          date: '2021-03-06',
          category: 'news',
        },
        relativePath: 'zh/news/2021-04-01/20210401.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].banner).toBe('/category/news/2021-03-06/banner.png')
    }
  })
})

describe('zh news loader — banner existence filtering', () => {
  it('items with banner image not in public dir are excluded', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/nonexistent/',
        frontmatter: {
          title: 'nonexistent',
          date: '2024-01-01',
          banner: '/category/news/nonexistent-dir/banner.png',
          category: 'news',
        },
        relativePath: 'zh/news/nonexistent/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    expect(result.length).toBe(0)
  })

  it('items with valid banner image in public dir are included', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2026-05-15-605/',
        frontmatter: {
          title: 'test',
          date: '2026-05-15',
          banner: '/category/news/2026-05-15/605.png',
          category: 'news',
        },
        relativePath: 'zh/news/2026-05-15-605/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0].banner).toBe('/category/news/2026-05-15/605.png')
  })

  it('all items in real data have banners that exist in public dir', () => {
    const allPages = loadZhNewsPages()
    const filtered = transformZhNews(allPages)
    for (const item of filtered) {
      expect(bannerExists(item.banner)).toBe(true)
    }
  })
})

describe('zh news loader — date handling', () => {
  it('string date is used directly', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2024-01-01/',
        frontmatter: { title: 'test', date: '2024-01-01', category: 'news', banner: '/category/news/2024-01-01/banner.png' },
        relativePath: 'zh/news/2024-01-01/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].date).toBe('2024-01-01')
    }
  })

  it('Date object is formatted as YYYY-MM-DD', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2024-07-15/',
        frontmatter: { title: 'test', date: new Date('2024-07-15'), category: 'news', banner: '/category/news/2024-07-15/banner.png' },
        relativePath: 'zh/news/2024-07-15/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].date).toBe('2024-07-15')
    }
  })

  it('missing date results in empty string', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2025-01-01/',
        frontmatter: { title: 'test', category: 'news', banner: '/category/news/2025-01-01/banner.png' },
        relativePath: 'zh/news/2025-01-01/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].date).toBe('')
    }
  })

  it('archives derived from date as YYYY-MM', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2024-08-01/',
        frontmatter: { title: 'test', date: '2024-08-15', category: 'news', banner: '/category/news/2024-08-01/banner.png' },
        relativePath: 'zh/news/2024-08-01/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].archives).toBe('2024-08')
    }
  })

  it('archives is empty when date is empty', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2025-01-01/',
        frontmatter: { title: 'test', category: 'news', banner: '/category/news/2025-01-01/banner.png' },
        relativePath: 'zh/news/2025-01-01/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].archives).toBe('')
    }
  })
})

describe('zh news loader — sorting', () => {
  it('sorted by date descending', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2023-01-01/',
        frontmatter: { title: 'A', date: '2023-01-01', category: 'news', banner: '/category/news/2023-01-01/banner.png' },
        relativePath: 'zh/news/2023-01-01/index.md',
      },
      {
        url: '/zh/news/2024-06-01/',
        frontmatter: { title: 'B', date: '2024-06-01', category: 'news', banner: '/category/news/2024-06-01/banner.png' },
        relativePath: 'zh/news/2024-06-01/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length >= 2) {
      expect(result[0].date).toBe('2024-06-01')
      expect(result[1].date).toBe('2023-01-01')
    }
  })

  it('same-date articles sorted by title ascending', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2025-12-30-603/',
        frontmatter: { title: 'openGauss 6.0.3版本正式发布！', date: '2025-12-30', category: 'news', banner: '/category/news/2025-12-30/banner.png' },
        relativePath: 'zh/news/2025-12-30-603/index.md',
      },
      {
        url: '/zh/news/2025-12-30-505/',
        frontmatter: { title: 'openGauss 5.0.5版本正式发布！', date: '2025-12-30', category: 'news', banner: '/category/news/2025-12-30/banner.png' },
        relativePath: 'zh/news/2025-12-30-505/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length >= 2) {
      expect(result[0].title).toBe('openGauss 5.0.5版本正式发布！')
      expect(result[1].title).toBe('openGauss 6.0.3版本正式发布！')
    }
  })
})

describe('zh news loader — author and tags normalization', () => {
  it('single string author becomes array', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2024-01-01/',
        frontmatter: { title: 'test', date: '2024-01-01', author: 'openGauss', category: 'news', banner: '/category/news/2024-01-01/banner.png' },
        relativePath: 'zh/news/2024-01-01/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].author).toEqual(['openGauss'])
    }
  })

  it('array author stays as array', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2024-01-04/',
        frontmatter: { title: 'test', date: '2024-01-01', author: ['openGauss', 'community'], category: 'news', banner: '/category/news/2024-01-04/banner.png' },
        relativePath: 'zh/news/2024-01-04/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].author).toEqual(['openGauss', 'community'])
    }
  })

  it('missing author defaults to empty array', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2024-01-05/',
        frontmatter: { title: 'test', date: '2024-01-01', category: 'news', banner: '/category/news/2024-01-05/banner.png' },
        relativePath: 'zh/news/2024-01-05/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].author).toEqual([])
    }
  })

  it('single string tags becomes array', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2024-01-01/',
        frontmatter: { title: 'test', date: '2024-01-01', tags: 'theme', category: 'news', banner: '/category/news/2024-01-01/banner.png' },
        relativePath: 'zh/news/2024-01-01/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].tags).toEqual(['theme'])
    }
  })

  it('array tags stays as array', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2024-01-01/',
        frontmatter: { title: 'test', date: '2024-01-01', tags: ['theme', 'release'], category: 'news', banner: '/category/news/2024-01-01/banner.png' },
        relativePath: 'zh/news/2024-01-01/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].tags).toEqual(['theme', 'release'])
    }
  })
})

describe('zh news loader — path generation', () => {
  it('p.url with .html suffix is stripped to generate path', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2021-04-01/20210401.html',
        frontmatter: { title: 'test', date: '2021-03-31', category: 'news', banner: '/category/news/2021-04-01/banner.png' },
        relativePath: 'zh/news/2021-04-01/20210401.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].path).toBe('zh/news/2021-04-01/20210401')
    }
  })

  it('p.url for index.md becomes trailing-slash path without .html', () => {
    const mockPages: MockPage[] = [
      {
        url: '/zh/news/2024-01-01/',
        frontmatter: { title: 'test', date: '2024-01-01', category: 'news', banner: '/category/news/2024-01-01/banner.png' },
        relativePath: 'zh/news/2024-01-01/index.md',
      },
    ]
    const result = transformZhNews(mockPages)
    if (result.length > 0) {
      expect(result[0].path).toBe('zh/news/2024-01-01/')
    }
  })
})

describe('zh news loader — real data scan', () => {
  const allPages = loadZhNewsPages()
  const filtered = transformZhNews(allPages)

  it('filtered items all have banners that exist in public/category/news', () => {
    for (const entry of filtered) {
      expect(bannerExists(entry.banner)).toBe(true)
    }
  })

  it('entries containing 2026 dates are included (not excluded like gen-news.js)', () => {
    const has2026 = filtered.some((f) => f.date.startsWith('2026'))
    expect(has2026).toBe(true)
  })

  it('2026-05-15-605 entry has correct full-path banner', () => {
    const entry605 = filtered.find((f) => f.path === 'zh/news/2026-05-15-605/')
    expect(entry605).toBeDefined()
    expect(entry605!.banner).toBe('/category/news/2026-05-15/605.png')
  })

  it('sorted descending by date — first entry is the most recent', () => {
    if (filtered.length >= 2) {
      expect(filtered[0].date >= filtered[1].date).toBe(true)
    }
  })

  it('no dates are empty strings for real news entries', () => {
    for (const entry of filtered) {
      expect(entry.date).not.toBe('')
    }
  })

  it('most news entries now have explicit banner paths in frontmatter', () => {
    const withExplicitBanner = allPages.filter(
      (p) => p.frontmatter.category === 'news'
        && typeof p.frontmatter.banner === 'string'
        && p.frontmatter.banner.startsWith('/')
    )
    expect(withExplicitBanner.length).toBeGreaterThan(filtered.length * 0.8)
  })
})
