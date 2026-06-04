import { expect, describe, it, vi, beforeEach } from 'vitest'

const { newsStore, fsExistsSync, fsReaddirSync } = vi.hoisted(() => {
  const newsStore = { transform: null as ((raw: any[]) => { zh: any[]; en: any[] }) | null }
  const fsExistsSync = vi.fn(() => false)
  const fsReaddirSync = vi.fn(() => [])
  return { newsStore, fsExistsSync, fsReaddirSync }
})

vi.mock('vitepress', () => ({
  createContentLoader: vi.fn((_globs: any, config: any) => {
    newsStore.transform = config.transform
    return {}
  }),
}))

vi.mock('fs', () => ({
  default: {
    existsSync: fsExistsSync,
    readdirSync: fsReaddirSync,
  },
  existsSync: fsExistsSync,
  readdirSync: fsReaddirSync,
}))

vi.mock('path', () => ({
  default: {
    join: vi.fn((...args: string[]) => args.join('/')),
  },
  join: vi.fn((...args: string[]) => args.join('/')),
}))

import '../../../app/.vitepress/news.data'

const transform = () => newsStore.transform!

function makeItem(filePath: string, frontmatter: Record<string, any>) {
  return { filePath, frontmatter, url: '', src: '', excerpt: '' }
}

describe('news.data transform', () => {
  beforeEach(() => {
    fsExistsSync.mockReturnValue(false)
    fsReaddirSync.mockReturnValue([])
  })

  it('returns empty arrays when no items', () => {
    const result = transform()([])
    expect(result.zh).toEqual([])
    expect(result.en).toEqual([])
  })

  it('filters out zh/news/index.md', () => {
    const result = transform()([
      makeItem('zh/news/index.md', { title: 'Index', category: 'news', date: '2026-01-01' }),
    ])
    expect(result.zh).toEqual([])
  })

  it('filters out en/news/index.md', () => {
    const result = transform()([
      makeItem('en/news/index.md', { title: 'Index', category: 'news', date: '2026-01-01' }),
    ])
    expect(result.en).toEqual([])
  })

  it('filters out items without category=news', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'blog', date: '2026-01-01' }),
    ])
    expect(result.zh).toEqual([])
  })

  it('filters out items without date', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news' }),
    ])
    expect(result.zh).toEqual([])
  })

  it('filters out items with non-string non-Date date', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: 12345 }),
    ])
    expect(result.zh).toEqual([])
  })

  it('accepts valid zh news item', () => {
    const result = transform()([
      makeItem('zh/news/some-post.md', { title: 'Some Post', category: 'news', date: '2026-01-15' }),
    ])
    expect(result.zh.length).toBe(1)
    expect(result.zh[0].title).toBe('Some Post')
    expect(result.zh[0].date).toBe('2026-01-15')
    expect(result.zh[0].category).toBe('news')
    expect(result.zh[0].archives).toBe('2026-01')
    expect(result.zh[0].path).toBe('zh/news/some-post')
  })

  it('accepts valid en news item', () => {
    const result = transform()([
      makeItem('en/news/some-post.md', { title: 'Some Post', category: 'news', date: '2026-03-10' }),
    ])
    expect(result.en.length).toBe(1)
    expect(result.en[0].title).toBe('Some Post')
    expect(result.en[0].date).toBe('2026-03-10')
    expect(result.en[0].path).toBe('en/news/some-post')
  })

  it('normalizes Date object to string', () => {
    const d = new Date('2026-05-20T00:00:00Z')
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: d }),
    ])
    expect(result.zh[0].date).toBe('2026-05-20')
  })

  it('pads month and day in date string', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-1-5' }),
    ])
    expect(result.zh[0].date).toBe('2026-01-05')
  })

  it('normalizes author string to array', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01', author: 'John' }),
    ])
    expect(result.zh[0].author).toEqual(['John'])
  })

  it('keeps author array as-is', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01', author: ['John', 'Jane'] }),
    ])
    expect(result.zh[0].author).toEqual(['John', 'Jane'])
  })

  it('sets author to empty array when missing', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01' }),
    ])
    expect(result.zh[0].author).toEqual([])
  })

  it('normalizes tags string to array', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01', tags: 'tag1' }),
    ])
    expect(result.zh[0].tags).toEqual(['tag1'])
  })

  it('keeps tags array as-is', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01', tags: ['tag1', 'tag2'] }),
    ])
    expect(result.zh[0].tags).toEqual(['tag1', 'tag2'])
  })

  it('sets tags to empty array when missing', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01' }),
    ])
    expect(result.zh[0].tags).toEqual([])
  })

  it('normalizes times field', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01', times: '9:5' }),
    ])
    expect(result.zh[0].times).toBe('09:05')
  })

  it('omits times when frontmatter has no times', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01' }),
    ])
    expect(result.zh[0].times).toBeUndefined()
  })

  it('omits times when frontmatter times is non-string', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01', times: 100 }),
    ])
    expect(result.zh[0].times).toBeUndefined()
  })

  it('computes archives from date', () => {
    const result = transform()([
      makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-06-04' }),
    ])
    expect(result.zh[0].archives).toBe('2026-06')
  })

  it('sorts zh items by date descending then times descending then title ascending', () => {
    const result = transform()([
      makeItem('zh/news/a.md', { title: 'Alpha', category: 'news', date: '2026-01-01', times: '10:00' }),
      makeItem('zh/news/b.md', { title: 'Beta', category: 'news', date: '2026-02-15' }),
      makeItem('zh/news/c.md', { title: 'Charlie', category: 'news', date: '2026-01-01', times: '08:00' }),
      makeItem('zh/news/d.md', { title: 'Delta', category: 'news', date: '2026-01-01', times: '10:00' }),
    ])
    const titles = result.zh.map((i: any) => i.title)
    expect(titles[0]).toBe('Beta')
    expect(titles[1]).toBe('Alpha')
    expect(titles[2]).toBe('Delta')
    expect(titles[3]).toBe('Charlie')
  })

  it('separates zh and en items', () => {
    const result = transform()([
      makeItem('zh/news/post-zh.md', { title: 'ZH Post', category: 'news', date: '2026-01-01' }),
      makeItem('en/news/post-en.md', { title: 'EN Post', category: 'news', date: '2026-01-01' }),
    ])
    expect(result.zh.length).toBe(1)
    expect(result.en.length).toBe(1)
    expect(result.zh[0].title).toBe('ZH Post')
    expect(result.en[0].title).toBe('EN Post')
  })

  describe('banner computation', () => {
    it('en items return empty string when no frontmatter banner', () => {
      const result = transform()([
        makeItem('en/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01' }),
      ])
      expect(result.en[0].banner).toBe('')
    })

    it('en items use frontmatter banner directly', () => {
      const result = transform()([
        makeItem('en/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01', banner: 'custom.jpg' }),
      ])
      expect(result.en[0].banner).toBe('custom.jpg')
    })

    it('zh items use frontmatter banner with path prefix', () => {
      const result = transform()([
        makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01', banner: 'custom.png' }),
      ])
      expect(result.zh[0].banner).toBe('/category/news/2026-01-01/custom.png')
    })

    it('zh items fallback to banner.png when no frontmatter banner and directory exists with banner.png', () => {
      fsExistsSync.mockImplementation((p: string) => p.endsWith('2026-01-01') || p.endsWith('banner.png'))

      const result = transform()([
        makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01' }),
      ])
      expect(result.zh[0].banner).toBe('/category/news/2026-01-01/banner.png')
    })

    it('zh items fallback to first file in directory when no banner.png', () => {
      fsExistsSync.mockImplementation((p: string) => p.endsWith('2026-01-01') && !p.endsWith('banner.png'))
      fsReaddirSync.mockImplementation(() => ['photo.jpg'])

      const result = transform()([
        makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01' }),
      ])
      expect(result.zh[0].banner).toBe('/category/news/2026-01-01/photo.jpg')
    })

    it('zh items return empty string when date directory does not exist', () => {
      fsExistsSync.mockReturnValue(false)

      const result = transform()([
        makeItem('zh/news/post.md', { title: 'Post', category: 'news', date: '2026-01-01' }),
      ])
      expect(result.zh[0].banner).toBe('')
    })
  })
})