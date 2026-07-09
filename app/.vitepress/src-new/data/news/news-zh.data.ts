import { createContentLoader } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(path.resolve(__dirname, '../../..'), 'public')

function bannerExists(bannerUrl: string): boolean {
  if (!bannerUrl.startsWith('/')) return false
  return fs.existsSync(path.join(PUBLIC_DIR, bannerUrl))
}

export default createContentLoader('zh/news/**/*.md', {
  includeSrc: false,
  render: false,
  transform(data) {
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
  },
})
