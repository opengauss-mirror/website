import { expect, describe, it } from 'vitest'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '../../../../')

const zhDataPath = resolve(rootDir, 'app/.vitepress/src-new/data/blogs/blogs-zh.data.ts')
const zhDataContent = readFileSync(zhDataPath, 'utf-8')

interface MockPage {
  url: string
  frontmatter: Record<string, any>
}

function transformZhBlogs(data: MockPage[]) {
  const items = data
    .filter((p) => p.frontmatter.category === 'blog')
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

      const author = Array.isArray(fm.author) ? fm.author : fm.author ? [fm.author] : []
      const tags = Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : []
      const summary = fm.summary || ''
      const urlPath = p.url.replace(/^\//, '').replace(/\.html$/, '')
      const dateSplit = date.split('-')
      const archives = dateSplit.length >= 2 ? `${dateSplit[0]}-${dateSplit[1]}` : ''

      return {
        title: fm.title || '',
        date,
        author,
        category: fm.category || 'blog',
        tags,
        summary,
        path: urlPath,
        archives,
        img: fm.img || '',
      }
    })
    .sort((a, b) => {
      if (a.date !== b.date) {
        return b.date.localeCompare(a.date)
      }
      return a.title.localeCompare(b.title)
    })

  items.push({
    title: 'Guidance to Post a Blog',
    path: 'zh/blogs/guidance/index',
    date: '',
    author: [],
    category: 'blog',
    tags: [],
    summary: '',
    archives: '',
    img: '',
  })

  return items
}

describe('zh blogs loader — source file structure', () => {
  it('uses createContentLoader from vitepress', () => {
    expect(zhDataContent).toContain('createContentLoader')
  })

  it('glob pattern targets zh/blogs/**/*.md', () => {
    expect(zhDataContent).toContain('zh/blogs/**/*.md')
  })

  it('sets includeSrc to false', () => {
    expect(zhDataContent).toContain('includeSrc: false')
  })

  it('sets render to false', () => {
    expect(zhDataContent).toContain('render: false')
  })

  it('filter uses category === "blog"', () => {
    expect(zhDataContent).toContain("p.frontmatter.category === 'blog'")
  })

  it('does not contain banner field in output', () => {
    expect(zhDataContent).not.toContain('banner')
  })

  it('pushes Guidance to Post a Blog entry', () => {
    expect(zhDataContent).toContain('Guidance to Post a Blog')
    expect(zhDataContent).toContain('zh/blogs/guidance/index')
  })
})

describe('zh blogs loader — filter logic', () => {
  it('pages without category are filtered out', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/', frontmatter: { title: '博客', category: undefined } },
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems.length).toBe(1)
  })

  it('pages with category !== "blog" are filtered out', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/other/', frontmatter: { title: 'not blog', category: 'news' } },
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems.length).toBe(1)
    expect(blogItems[0].category).toBe('blog')
  })

  it('all filtered items have category === "blog"', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'A', date: '2024-01-01', category: 'blog' } },
      { url: '/zh/blogs/2024-06-01/', frontmatter: { title: 'B', date: '2024-06-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    for (const item of result) {
      expect(item.category).toBe('blog')
    }
  })
})

describe('zh blogs loader — no banner field in output', () => {
  it('transformed items do not have a banner property', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog', banner: '/some/banner.png' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems.length).toBe(1)
    expect(blogItems[0]).not.toHaveProperty('banner')
  })

  it('frontmatter banner is ignored even when present', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog', banner: '/category/blogs/banner.png' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    const keys = Object.keys(blogItems[0])
    expect(keys).not.toContain('banner')
  })
})

describe('zh blogs loader — date handling', () => {
  it('string date is used directly', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].date).toBe('2024-01-01')
  })

  it('Date object is formatted as YYYY-MM-DD', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-07-15/', frontmatter: { title: 'test', date: new Date('2024-07-15'), category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].date).toBe('2024-07-15')
  })

  it('missing date results in empty string', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].date).toBe('')
  })

  it('archives derived from date as YYYY-MM', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-08-15/', frontmatter: { title: 'test', date: '2024-08-15', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].archives).toBe('2024-08')
  })

  it('archives is empty when date is empty', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].archives).toBe('')
  })
})

describe('zh blogs loader — author and tags normalization', () => {
  it('single string author becomes array', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', author: 'openGauss', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].author).toEqual(['openGauss'])
  })

  it('array author stays as array', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', author: ['openGauss', 'community'], category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].author).toEqual(['openGauss', 'community'])
  })

  it('missing author defaults to empty array', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].author).toEqual([])
  })

  it('single string tags becomes array', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', tags: 'database', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].tags).toEqual(['database'])
  })

  it('array tags stays as array', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', tags: ['database', 'performance'], category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].tags).toEqual(['database', 'performance'])
  })
})

describe('zh blogs loader — sorting', () => {
  it('sorted by date descending', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2023-01-01/', frontmatter: { title: 'A', date: '2023-01-01', category: 'blog' } },
      { url: '/zh/blogs/2024-06-01/', frontmatter: { title: 'B', date: '2024-06-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].date).toBe('2024-06-01')
    expect(blogItems[1].date).toBe('2023-01-01')
  })

  it('same-date articles sorted by title ascending', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01-b/', frontmatter: { title: 'B blog', date: '2024-01-01', category: 'blog' } },
      { url: '/zh/blogs/2024-01-01-a/', frontmatter: { title: 'A blog', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].title).toBe('A blog')
    expect(blogItems[1].title).toBe('B blog')
  })
})

describe('zh blogs loader — path generation', () => {
  it('p.url with .html suffix is stripped to generate path', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/myblog.html', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].path).toBe('zh/blogs/2024-01-01/myblog')
  })

  it('p.url for index.md becomes trailing-slash path without .html', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const blogItems = result.filter((r) => r.title !== 'Guidance to Post a Blog')
    expect(blogItems[0].path).toBe('zh/blogs/2024-01-01/')
  })
})

describe('zh blogs loader — Guidance to Post a Blog special entry', () => {
  it('last item is "Guidance to Post a Blog"', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'Some Blog', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const lastItem = result[result.length - 1]
    expect(lastItem.title).toBe('Guidance to Post a Blog')
  })

  it('guidance entry has path zh/blogs/guidance/index', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2024-01-01/', frontmatter: { title: 'Some Blog', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    const guidanceItem = result.find((r) => r.title === 'Guidance to Post a Blog')
    expect(guidanceItem).toBeDefined()
    expect(guidanceItem!.path).toBe('zh/blogs/guidance/index')
  })

  it('guidance entry has empty date, author, tags, summary, archives, img', () => {
    const mockPages: MockPage[] = []
    const result = transformZhBlogs(mockPages)
    expect(result.length).toBe(1)
    const guidanceItem = result[0]
    expect(guidanceItem.date).toBe('')
    expect(guidanceItem.author).toEqual([])
    expect(guidanceItem.tags).toEqual([])
    expect(guidanceItem.summary).toBe('')
    expect(guidanceItem.archives).toBe('')
    expect(guidanceItem.img).toBe('')
  })

  it('guidance entry category is "blog"', () => {
    const mockPages: MockPage[] = []
    const result = transformZhBlogs(mockPages)
    expect(result[0].category).toBe('blog')
  })

  it('guidance entry is always present even with no blog data', () => {
    const mockPages: MockPage[] = []
    const result = transformZhBlogs(mockPages)
    expect(result.length).toBe(1)
    expect(result[0].title).toBe('Guidance to Post a Blog')
  })

  it('guidance entry is appended after sorting, not sorted with real items', () => {
    const mockPages: MockPage[] = [
      { url: '/zh/blogs/2099-12-31/', frontmatter: { title: 'Future Blog', date: '2099-12-31', category: 'blog' } },
    ]
    const result = transformZhBlogs(mockPages)
    expect(result.length).toBe(2)
    expect(result[0].title).toBe('Future Blog')
    expect(result[1].title).toBe('Guidance to Post a Blog')
  })
})
