import { expect, describe, it } from 'vitest'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '../../../../')

const enDataPath = resolve(rootDir, 'app/.vitepress/src-new/data/blogs/blogs-en.data.ts')
const enDataContent = readFileSync(enDataPath, 'utf-8')

interface MockPage {
  url: string
  frontmatter: Record<string, any>
}

function transformEnBlogs(data: MockPage[]) {
  return data
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
}

describe('en blogs loader — source file structure', () => {
  it('uses createContentLoader from vitepress', () => {
    expect(enDataContent).toContain('createContentLoader')
  })

  it('glob pattern targets en/blogs/**/*.md', () => {
    expect(enDataContent).toContain('en/blogs/**/*.md')
  })

  it('sets includeSrc to false', () => {
    expect(enDataContent).toContain('includeSrc: false')
  })

  it('sets render to false', () => {
    expect(enDataContent).toContain('render: false')
  })

  it('filter uses category === "blog"', () => {
    expect(enDataContent).toContain("p.frontmatter.category === 'blog'")
  })

  it('does not contain banner field in output', () => {
    expect(enDataContent).not.toContain('banner')
  })

  it('does NOT contain Guidance to Post a Blog entry', () => {
    expect(enDataContent).not.toContain('Guidance to Post a Blog')
  })
})

describe('en blogs loader — filter logic', () => {
  it('pages without category are filtered out', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/', frontmatter: { title: 'Blog', category: undefined } },
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result.length).toBe(1)
  })

  it('pages with category !== "blog" are filtered out', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/other/', frontmatter: { title: 'not blog', category: 'news' } },
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result.length).toBe(1)
    expect(result[0].category).toBe('blog')
  })

  it('all filtered items have category === "blog"', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'A', date: '2024-01-01', category: 'blog' } },
      { url: '/en/blogs/2024-06-01/', frontmatter: { title: 'B', date: '2024-06-01', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    for (const item of result) {
      expect(item.category).toBe('blog')
    }
  })
})

describe('en blogs loader — no banner field in output', () => {
  it('transformed items do not have a banner property', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog', banner: '/some/banner.png' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result.length).toBe(1)
    expect(result[0]).not.toHaveProperty('banner')
  })

  it('frontmatter banner is ignored even when present', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog', banner: '/category/blogs/banner.png' } },
    ]
    const result = transformEnBlogs(mockPages)
    const keys = Object.keys(result[0])
    expect(keys).not.toContain('banner')
  })
})

describe('en blogs loader — no Guidance to Post a Blog entry', () => {
  it('en blogs list does NOT contain Guidance entry', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'Some Blog', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result.some((r) => r.title === 'Guidance to Post a Blog')).toBe(false)
  })

  it('en blogs with empty input returns empty array (no guidance pushed)', () => {
    const mockPages: MockPage[] = []
    const result = transformEnBlogs(mockPages)
    expect(result.length).toBe(0)
  })
})

describe('en blogs loader — date handling', () => {
  it('string date is used directly', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].date).toBe('2024-01-01')
  })

  it('Date object is formatted as YYYY-MM-DD', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-07-15/', frontmatter: { title: 'test', date: new Date('2024-07-15'), category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].date).toBe('2024-07-15')
  })

  it('missing date results in empty string', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].date).toBe('')
  })

  it('archives derived from date as YYYY-MM', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-08-15/', frontmatter: { title: 'test', date: '2024-08-15', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].archives).toBe('2024-08')
  })

  it('archives is empty when date is empty', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].archives).toBe('')
  })
})

describe('en blogs loader — sorting', () => {
  it('sorted by date descending', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2023-01-01/', frontmatter: { title: 'A', date: '2023-01-01', category: 'blog' } },
      { url: '/en/blogs/2024-06-01/', frontmatter: { title: 'B', date: '2024-06-01', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].date).toBe('2024-06-01')
    expect(result[1].date).toBe('2023-01-01')
  })

  it('same-date articles sorted by title ascending', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01-b/', frontmatter: { title: 'B blog', date: '2024-01-01', category: 'blog' } },
      { url: '/en/blogs/2024-01-01-a/', frontmatter: { title: 'A blog', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].title).toBe('A blog')
    expect(result[1].title).toBe('B blog')
  })
})

describe('en blogs loader — author and tags normalization', () => {
  it('single string author becomes array', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', author: 'openGauss', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].author).toEqual(['openGauss'])
  })

  it('array author stays as array', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', author: ['openGauss', 'community'], category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].author).toEqual(['openGauss', 'community'])
  })

  it('missing author defaults to empty array', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].author).toEqual([])
  })

  it('single string tags becomes array', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', tags: 'database', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].tags).toEqual(['database'])
  })

  it('array tags stays as array', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', tags: ['database', 'performance'], category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].tags).toEqual(['database', 'performance'])
  })
})

describe('en blogs loader — path generation', () => {
  it('p.url with .html suffix is stripped', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/myblog.html', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].path).toBe('en/blogs/2024-01-01/myblog')
  })

  it('p.url for index.md becomes trailing-slash path', () => {
    const mockPages: MockPage[] = [
      { url: '/en/blogs/2024-01-01/', frontmatter: { title: 'test', date: '2024-01-01', category: 'blog' } },
    ]
    const result = transformEnBlogs(mockPages)
    expect(result[0].path).toBe('en/blogs/2024-01-01/')
  })
})
