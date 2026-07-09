import { expect, describe, it } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { reactive, isReactive, shallowRef, ref } from 'vue'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '../../../../')

const indexPath = resolve(rootDir, 'app/.vitepress/src/data/news/index.ts')
const indexContent = readFileSync(indexPath, 'utf-8')

describe('news index.ts — reactive bridging file structure', () => {
  it('imports reactive from vue', () => {
    expect(indexContent).toContain('import { reactive } from \'vue\'')
  })

  it('imports data from ~@/data/news/news-zh.data', () => {
    expect(indexContent).toContain('import { data as newsZh } from \'~@/data/news/news-zh.data\'')
  })

  it('imports data from ~@/data/news/news-en.data', () => {
    expect(indexContent).toContain('import { data as newsEn } from \'~@/data/news/news-en.data\'')
  })

  it('exports reactive({ zh: newsZh, en: newsEn })', () => {
    expect(indexContent).toContain('reactive({ zh: newsZh, en: newsEn })')
  })

  it('no longer imports from ./news-zh (static TS file)', () => {
    expect(indexContent).not.toContain('import newsZh from \'./news-zh\'')
  })

  it('no longer imports from ./news-en (static TS file)', () => {
    expect(indexContent).not.toContain('import newsEn from \'./news-en\'')
  })
})

describe('news index.ts — reactive() auto-unwraps Ref behavior', () => {
  it('reactive() wraps a plain object correctly', () => {
    const state = reactive({ zh: ['a', 'b'], en: ['c'] })
    expect(isReactive(state)).toBe(true)
    expect(state.zh).toEqual(['a', 'b'])
    expect(state.en).toEqual(['c'])
  })

  it('reactive() auto-unwraps a nested shallowRef into plain value', () => {
    const zhRef = shallowRef(['zh1', 'zh2'])
    const enRef = shallowRef(['en1'])
    const state = reactive({ zh: zhRef, en: enRef })
    expect(Array.isArray(state.zh)).toBe(true)
    expect(state.zh).toEqual(['zh1', 'zh2'])
    expect(state.en).toEqual(['en1'])
  })

  it('reactive() auto-unwraps a regular ref as well', () => {
    const dataRef = ref(['item1'])
    const state = reactive({ zh: dataRef })
    expect(state.zh).toEqual(['item1'])
  })
})

describe('deleted files — gen-news and static data', () => {
  it('scripts/gen-news.js has been deleted', () => {
    expect(existsSync(resolve(rootDir, 'scripts/gen-news.js'))).toBe(false)
  })

  it('app/.vitepress/src/data/news/news-zh.ts has been deleted', () => {
    expect(existsSync(resolve(rootDir, 'app/.vitepress/src/data/news/news-zh.ts'))).toBe(false)
  })

  it('app/.vitepress/src/data/news/news-en.ts has been deleted', () => {
    expect(existsSync(resolve(rootDir, 'app/.vitepress/src/data/news/news-en.ts'))).toBe(false)
  })

  it('scripts/index.js no longer references gen-news', () => {
    const scriptIndex = readFileSync(resolve(rootDir, 'scripts/index.js'), 'utf-8')
    expect(scriptIndex).not.toContain('gen-news')
  })
})

describe('package.json — build script change', () => {
  const pkgJson = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf-8'))

  it('build script does not include gen:news', () => {
    expect(pkgJson.scripts.build).not.toContain('gen:news')
  })

  it('build script includes gen:blogs and vitepress build', () => {
    expect(pkgJson.scripts.build).toContain('gen:blogs')
    expect(pkgJson.scripts.build).toContain('vitepress build app')
  })

  it('gen:news script has been removed from package.json', () => {
    expect(pkgJson.scripts['gen:news']).toBeUndefined()
  })

  it('gen:blogs script is still present', () => {
    expect(pkgJson.scripts['gen:blogs']).toBeDefined()
  })
})
