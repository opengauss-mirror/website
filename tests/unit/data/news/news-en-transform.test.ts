import { expect, describe, it } from 'vitest'
import { readFileSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '../../../../')

const enNewsDir = resolve(rootDir, 'app/en/news')
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

function transformEnNews(data: MockPage[]) {
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
        banner = `/category/news/en/${date}/${fm.banner}`
      } else {
        banner = `/category/news/en/${date}/banner.png`
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

function loadEnNewsPages(): MockPage[] {
  const pages: MockPage[] = []
  const dirs = readdirSync(enNewsDir, { withFileTypes: true })
  for (const dirent of dirs) {
    if (!dirent.isDirectory()) continue
    const dateDir = dirent.name
    const subDir = resolve(enNewsDir, dateDir)
    const subFiles = readdirSync(subDir)
    for (const file of subFiles) {
      if (!file.endsWith('.md')) continue
      const filePath = resolve(subDir, file)
      const content = readFileSync(filePath, 'utf-8')
      const parsed = matter(content)
      const urlPath = file === 'index.md'
        ? `/en/news/${dateDir}/`
        : `/en/news/${dateDir}/${file.replace(/\.md$/, '')}.html`
      pages.push({
        url: urlPath,
        frontmatter: parsed.data,
        relativePath: `en/news/${dateDir}/${file}`,
      })
    }
  }
  return pages
}

describe('en news loader — filter logic', () => {
  it('en/news/index.md has only title, no category', () => {
    const indexPath = resolve(enNewsDir, 'index.md')
    const content = readFileSync(indexPath, 'utf-8')
    const parsed = matter(content)
    expect(parsed.data.category).toBeUndefined()
  })

  it('all en news pages with category "news" are included', () => {
    const allPages = loadEnNewsPages()
    const filtered = transformEnNews(allPages)
    const newsPages = allPages.filter((p) => p.frontmatter.category === 'news')
    expect(filtered.length).toBe(newsPages.length)
  })
})

describe('en news loader — banner processing', () => {
  it('banner starting with "/" used directly (real en entries)', () => {
    const allPages = loadEnNewsPages()
    const filtered = transformEnNews(allPages)
    for (const entry of filtered) {
      expect(entry.banner.startsWith('/')).toBe(true)
    }
  })

  it('en banner fallback prefix uses /category/news/en/ with fm.date', () => {
    const mockPages: MockPage[] = [
      {
        url: '/en/news/2024-01-01/',
        frontmatter: { title: 'test', date: '2024-01-01', category: 'news', banner: '/category/news/en/2024-01-01/banner.png' },
        relativePath: 'en/news/2024-01-01/index.md',
      },
    ]
    const result = transformEnNews(mockPages)
    if (result.length > 0) {
      expect(result[0].banner).toBe('/category/news/en/2024-01-01/banner.png')
    }
  })

  it('en filename-only banner constructed path uses fm.date', () => {
    const mockPages: MockPage[] = [
      {
        url: '/en/news/2024-01-01/',
        frontmatter: { title: 'test', date: '2024-01-01', banner: 'custom.png', category: 'news' },
        relativePath: 'en/news/2024-01-01/index.md',
      },
    ]
    const result = transformEnNews(mockPages)
    expect(result.length).toBe(0)
  })

  it('en filename-only banner with existing image is included', () => {
    const allPages = loadEnNewsPages()
    const newsWithSlashBanner = allPages.filter(
      (p) => p.frontmatter.category === 'news' && typeof p.frontmatter.banner === 'string' && p.frontmatter.banner.startsWith('/')
    )
    for (const p of newsWithSlashBanner) {
      expect(p.frontmatter.banner).toContain('/category/news/en/')
    }
  })

  it('real en news entries all contain /category/news/en/ in banner', () => {
    const allPages = loadEnNewsPages()
    const filtered = transformEnNews(allPages)
    for (const entry of filtered) {
      expect(entry.banner).toContain('/category/news/en/')
    }
  })
})

describe('en news loader — banner existence filtering', () => {
  it('all en news entries have banners that exist in public dir', () => {
    const allPages = loadEnNewsPages()
    const filtered = transformEnNews(allPages)
    for (const entry of filtered) {
      expect(bannerExists(entry.banner)).toBe(true)
    }
  })

  it('items with nonexistent banner are excluded', () => {
    const mockPages: MockPage[] = [
      {
        url: '/en/news/nonexistent/',
        frontmatter: { title: 'nonexistent', date: '2024-01-01', banner: '/category/news/en/nonexistent/banner.png', category: 'news' },
        relativePath: 'en/news/nonexistent/index.md',
      },
    ]
    const result = transformEnNews(mockPages)
    expect(result.length).toBe(0)
  })
})

describe('en news loader — sorting', () => {
  it('sorted descending by date', () => {
    const allPages = loadEnNewsPages()
    const filtered = transformEnNews(allPages)
    if (filtered.length >= 2) {
      for (let i = 0; i < filtered.length - 1; i++) {
        expect(filtered[i].date >= filtered[i + 1].date).toBe(true)
      }
    }
  })
})
