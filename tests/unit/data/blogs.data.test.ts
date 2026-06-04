import { expect, describe, it, vi, beforeEach } from 'vitest'

const { blogsStore } = vi.hoisted(() => {
  const blogsStore = { transform: null as ((raw: any[]) => { zh: any[]; en: any[] }) | null }
  return { blogsStore }
})

vi.mock('vitepress', () => ({
  createContentLoader: vi.fn((_globs: any, config: any) => {
    blogsStore.transform = config.transform
    return {}
  }),
}))

import '../../../app/.vitepress/blogs.data'

const transform = () => blogsStore.transform!

function makeItem(filePath: string, frontmatter: Record<string, any>) {
  return { filePath, frontmatter, url: '', src: '', excerpt: '' }
}

function filterGuidance(items: any[]) {
  return items.filter((i: any) => i.title !== 'Guidance to Post a Blog')
}

describe('blogs.data transform', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns empty arrays (plus Guidance) when no items', () => {
    const result = transform()([])
    expect(result.zh.length).toBe(1)
    expect(result.zh[0].title).toBe('Guidance to Post a Blog')
    expect(result.en).toEqual([])
  })

  it('filters out zh/blogs/index.md', () => {
    const result = transform()([
      makeItem('zh/blogs/index.md', { title: 'Index', category: 'blog', date: '2026-01-01' }),
    ])
    expect(filterGuidance(result.zh).length).toBe(0)
  })

  it('filters out en/blogs/index.md', () => {
    const result = transform()([
      makeItem('en/blogs/index.md', { title: 'Index', category: 'blog', date: '2026-01-01' }),
    ])
    expect(result.en).toEqual([])
  })

  it('filters out zh/blogs/guidance/index.md', () => {
    const result = transform()([
      makeItem('zh/blogs/guidance/index.md', { title: 'Guidance', category: 'blog', date: '2026-01-01' }),
    ])
    expect(filterGuidance(result.zh).length).toBe(0)
  })

  it('filters out zh/blogs/desgin/content_posts.md', () => {
    const result = transform()([
      makeItem('zh/blogs/desgin/content_posts.md', { title: 'Content', category: 'blog', date: '2026-01-01' }),
    ])
    expect(filterGuidance(result.zh).length).toBe(0)
  })

  it('filters out items without category=blog', () => {
    const result = transform()([
      makeItem('zh/blogs/post.md', { title: 'Post', category: 'news', date: '2026-01-01' }),
    ])
    expect(filterGuidance(result.zh).length).toBe(0)
  })

  it('filters out items without date', () => {
    const result = transform()([
      makeItem('zh/blogs/post.md', { title: 'Post', category: 'blog' }),
    ])
    expect(filterGuidance(result.zh).length).toBe(0)
  })

  it('accepts valid zh blog item', () => {
    const result = transform()([
      makeItem('zh/blogs/some-post.md', { title: 'Some Post', category: 'blog', date: '2026-02-15' }),
    ])
    const blogItems = filterGuidance(result.zh)
    expect(blogItems.length).toBe(1)
    expect(blogItems[0].title).toBe('Some Post')
    expect(blogItems[0].date).toBe('2026-02-15')
    expect(blogItems[0].category).toBe('blog')
    expect(blogItems[0].archives).toBe('2026-02')
    expect(blogItems[0].path).toBe('zh/blogs/some-post')
  })

  it('accepts valid en blog item', () => {
    const result = transform()([
      makeItem('en/blogs/some-post.md', { title: 'Some EN Post', category: 'blog', date: '2026-03-10' }),
    ])
    expect(result.en.length).toBe(1)
    expect(result.en[0].title).toBe('Some EN Post')
    expect(result.en[0].path).toBe('en/blogs/some-post')
  })

  it('normalizes Date object to string', () => {
    const d = new Date('2026-05-20T00:00:00Z')
    const result = transform()([
      makeItem('zh/blogs/post.md', { title: 'Post', category: 'blog', date: d }),
    ])
    expect(filterGuidance(result.zh)[0].date).toBe('2026-05-20')
  })

  it('pads month and day in date string', () => {
    const result = transform()([
      makeItem('zh/blogs/post.md', { title: 'Post', category: 'blog', date: '2026-1-5' }),
    ])
    expect(filterGuidance(result.zh)[0].date).toBe('2026-01-05')
  })

  it('normalizes author string to array', () => {
    const result = transform()([
      makeItem('zh/blogs/post.md', { title: 'Post', category: 'blog', date: '2026-01-01', author: 'Alice' }),
    ])
    expect(filterGuidance(result.zh)[0].author).toEqual(['Alice'])
  })

  it('keeps author array as-is', () => {
    const result = transform()([
      makeItem('en/blogs/post.md', { title: 'Post', category: 'blog', date: '2026-01-01', author: ['Alice', 'Bob'] }),
    ])
    expect(result.en[0].author).toEqual(['Alice', 'Bob'])
  })

  it('sets author to empty array when missing', () => {
    const result = transform()([
      makeItem('en/blogs/post.md', { title: 'Post', category: 'blog', date: '2026-01-01' }),
    ])
    expect(result.en[0].author).toEqual([])
  })

  it('normalizes tags string to array', () => {
    const result = transform()([
      makeItem('zh/blogs/post.md', { title: 'Post', category: 'blog', date: '2026-01-01', tags: 'tech' }),
    ])
    expect(filterGuidance(result.zh)[0].tags).toEqual(['tech'])
  })

  it('keeps tags array as-is', () => {
    const result = transform()([
      makeItem('en/blogs/post.md', { title: 'Post', category: 'blog', date: '2026-01-01', tags: ['tech', 'oss'] }),
    ])
    expect(result.en[0].tags).toEqual(['tech', 'oss'])
  })

  it('sets tags to empty array when missing', () => {
    const result = transform()([
      makeItem('en/blogs/post.md', { title: 'Post', category: 'blog', date: '2026-01-01' }),
    ])
    expect(result.en[0].tags).toEqual([])
  })

  it('normalizes times field', () => {
    const result = transform()([
      makeItem('zh/blogs/post.md', { title: 'Post', category: 'blog', date: '2026-01-01', times: '9:5' }),
    ])
    expect(filterGuidance(result.zh)[0].times).toBe('09:05')
  })

  it('omits times when frontmatter has no times', () => {
    const result = transform()([
      makeItem('en/blogs/post.md', { title: 'Post', category: 'blog', date: '2026-01-01' }),
    ])
    expect(result.en[0].times).toBeUndefined()
  })

  it('computes archives from date', () => {
    const result = transform()([
      makeItem('en/blogs/post.md', { title: 'Post', category: 'blog', date: '2026-06-04' }),
    ])
    expect(result.en[0].archives).toBe('2026-06')
  })

  it('sorts zh items by date descending then times descending then title ascending', () => {
    const result = transform()([
      makeItem('zh/blogs/a.md', { title: 'Alpha', category: 'blog', date: '2026-01-01', times: '10:00' }),
      makeItem('zh/blogs/b.md', { title: 'Beta', category: 'blog', date: '2026-02-15' }),
      makeItem('zh/blogs/c.md', { title: 'Charlie', category: 'blog', date: '2026-01-01', times: '08:00' }),
      makeItem('zh/blogs/d.md', { title: 'Delta', category: 'blog', date: '2026-01-01', times: '10:00' }),
    ])
    const blogItems = filterGuidance(result.zh)
    expect(blogItems[0].title).toBe('Beta')
    expect(blogItems[1].title).toBe('Alpha')
    expect(blogItems[2].title).toBe('Delta')
    expect(blogItems[3].title).toBe('Charlie')
  })

  it('separates zh and en items', () => {
    const result = transform()([
      makeItem('zh/blogs/post-zh.md', { title: 'ZH', category: 'blog', date: '2026-01-01' }),
      makeItem('en/blogs/post-en.md', { title: 'EN', category: 'blog', date: '2026-01-01' }),
    ])
    expect(filterGuidance(result.zh).length).toBe(1)
    expect(filterGuidance(result.zh)[0].title).toBe('ZH')
    expect(result.en.length).toBe(1)
    expect(result.en[0].title).toBe('EN')
  })

  describe('Guidance entry', () => {
    it('appends Guidance entry to zh data at the end', () => {
      const result = transform()([
        makeItem('zh/blogs/post.md', { title: 'Blog Post', category: 'blog', date: '2026-01-01' }),
      ])
      const last = result.zh[result.zh.length - 1]
      expect(last.title).toBe('Guidance to Post a Blog')
      expect(last.path).toBe('zh/blogs/guidance/index')
      expect(last.date).toBe('')
      expect(last.tags).toEqual([])
      expect(last.author).toEqual([])
      expect(last.summary).toBe('')
      expect(last.archives).toBe('')
      expect(last.img).toBe('')
    })

    it('does not add Guidance entry to en data', () => {
      const result = transform()([
        makeItem('en/blogs/post.md', { title: 'EN Post', category: 'blog', date: '2026-01-01' }),
      ])
      expect(result.en.every((i: any) => i.title !== 'Guidance to Post a Blog')).toBe(true)
    })

    it('adds Guidance even when zh has no blog items', () => {
      const result = transform()([])
      expect(result.zh.length).toBe(1)
      expect(result.zh[0].title).toBe('Guidance to Post a Blog')
    })
  })
})