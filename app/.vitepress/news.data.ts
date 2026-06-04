import { createContentLoader } from 'vitepress'
import fs from 'fs'
import path from 'path'

const NEWS_BANNER_ROOT = path.join(process.cwd(), 'app/.vitepress/public/category/news')

interface NewsItem {
  title: string
  date: string
  tags: string[]
  category: string
  author: string[]
  summary: string
  archives: string
  img: string
  path: string
  banner?: string
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

function computeBanner(frontmatter: Record<string, any>, date: string, lang: 'zh' | 'en'): string {
  if (lang === 'en') {
    return frontmatter.banner || ''
  }
  if (frontmatter.banner) {
    return `/category/news/${date}/${frontmatter.banner}`
  }
  const dateDir = path.join(NEWS_BANNER_ROOT, date)
  if (!fs.existsSync(dateDir)) return ''
  if (fs.existsSync(path.join(dateDir, 'banner.png'))) {
    return `/category/news/${date}/banner.png`
  }
  const files = fs.readdirSync(dateDir)
  if (files.length > 0) {
    return `/category/news/${date}/${files[0]}`
  }
  return ''
}

function sortItems(arr: NewsItem[]): void {
  arr.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date)
    if (a.times && b.times && a.times !== b.times) return b.times.localeCompare(a.times)
    return a.title.localeCompare(b.title)
  })
}

export default createContentLoader(
  ['zh/news/**/*.md', 'en/news/**/*.md'],
  {
    render: false,
    transform(raw) {
      const zhData: NewsItem[] = []
      const enData: NewsItem[] = []

      for (const item of raw) {
        const fm = item.frontmatter as Record<string, any>
        if (!fm) continue

        const filePath: string = item.filePath || ''
        const lang = filePath.startsWith('zh/') ? 'zh' : 'en'

        if (filePath.endsWith('zh/news/index.md') || filePath.endsWith('en/news/index.md')) continue

        if (fm.category !== 'news') continue

        const date = normalizeDate(fm.date)
        if (!date) continue

        const archives = `${date.split('-')[0]}-${date.split('-')[1]}`
        const relativePath = filePath.replace(/\.md$/, '').replace(/\\/g, '/')

        const entry: NewsItem = {
          title: fm.title || '',
          date,
          tags: Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : [],
          category: fm.category,
          author: Array.isArray(fm.author) ? fm.author : fm.author ? [fm.author] : [],
          summary: fm.summary || '',
          archives,
          img: fm.img || '',
          path: relativePath,
          banner: computeBanner(fm, date, lang as 'zh' | 'en'),
        }

        const times = normalizeTimes(fm.times)
        if (times) entry.times = times

        if (lang === 'zh') zhData.push(entry)
        else enData.push(entry)
      }

      sortItems(zhData)
      sortItems(enData)

      return { zh: zhData, en: enData }
    }
  }
)
