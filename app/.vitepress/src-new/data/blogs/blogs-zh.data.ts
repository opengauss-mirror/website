import { createContentLoader } from 'vitepress'

export default createContentLoader('zh/blogs/**/*.md', {
  includeSrc: false,
  render: false,
  transform(data) {
    const items = data
      .filter((p) => p.frontmatter.category === 'blog' && !p.url.endsWith('blogs/') && !p.url.endsWith('blogs/guidance/') && !p.url.includes('desgin/content_posts'))
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
  },
})
