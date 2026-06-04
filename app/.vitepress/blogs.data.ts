import { createContentLoader } from 'vitepress'

interface BlogItem {
  title: string
  date: string
  tags: string[]
  category?: string
  author: string[]
  summary: string
  archives: string
  img: string
  path: string
  times?: string
}

function normalizeDate(raw: unknown): string | null {
  if (raw instanceof Date) {
    const d = new Date(raw)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }
  if (typeof raw !== 'string') return null
  const parts = raw.split('-')
  parts[1] = String(parts[1] || '1').padStart(2, '0')
  parts[2] = String(parts[2] || '1').padStart(2, '0')
  return parts.join('-')
}

function normalizeTimes(raw: unknown): string | undefined {
  if (!raw) return undefined
  if (typeof raw !== 'string') return undefined
  const parts = raw.split(':')
  parts[0] = String(parts[0] || '0').padStart(2, '0')
  parts[1] = String(parts[1] || '0').padStart(2, '0')
  return parts.join(':')
}

function sortItems(arr: BlogItem[]): void {
  arr.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date)
    if (a.times && b.times && a.times !== b.times) return b.times.localeCompare(a.times)
    return a.title.localeCompare(b.title)
  })
}

export default createContentLoader(
  ['zh/blogs/**/*.md', 'en/blogs/**/*.md'],
  {
    render: false,
    transform(raw) {
      const zhData: BlogItem[] = []
      const enData: BlogItem[] = []

      const blacklistSuffixes = [
        'en/blogs/index.md',
        'zh/blogs/index.md',
        'zh/blogs/guidance/index.md',
        'zh/blogs/desgin/content_posts.md',
      ]

      for (const item of raw) {
        const fm = item.frontmatter as Record<string, any>
        if (!fm) continue

        const filePath: string = item.filePath || ''
        const lang = filePath.startsWith('zh/') ? 'zh' : 'en'

        if (blacklistSuffixes.some(suffix => filePath.endsWith(suffix))) continue

        if (fm.category !== 'blog') continue

        const date = normalizeDate(fm.date)
        if (!date) continue

        const archives = `${date.split('-')[0]}-${date.split('-')[1]}`
        const relativePath = filePath.replace(/\.md$/, '').replace(/\\/g, '/')

        const entry: BlogItem = {
          title: fm.title || '',
          date,
          tags: Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : [],
          category: fm.category,
          author: Array.isArray(fm.author) ? fm.author : fm.author ? [fm.author] : [],
          summary: fm.summary || '',
          archives,
          img: fm.img || '',
          path: relativePath,
        }

        const times = normalizeTimes(fm.times)
        if (times) entry.times = times

        if (lang === 'zh') zhData.push(entry)
        else enData.push(entry)
      }

      sortItems(zhData)
      sortItems(enData)

      zhData.push({
        title: 'Guidance to Post a Blog',
        path: 'zh/blogs/guidance/index',
        date: '',
        tags: [],
        author: [],
        summary: '',
        archives: '',
        img: '',
      })

      return { zh: zhData, en: enData }
    }
  }
)
