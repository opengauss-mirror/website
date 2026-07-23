import { expect, describe, it } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { reactive, isReactive, shallowRef, ref } from 'vue'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '../../../../')

const indexPath = resolve(rootDir, 'app/.vitepress/src/data/blogs/index.ts')
const indexContent = readFileSync(indexPath, 'utf-8')

describe('blogs index.ts — reactive bridging file structure', () => {
  it('imports reactive from vue', () => {
    expect(indexContent).toContain('import { reactive } from \'vue\'')
  })

  it('imports data from ~@/data/blogs/blogs-zh.data', () => {
    expect(indexContent).toContain('import { data as blogsZh } from \'~@/data/blogs/blogs-zh.data\'')
  })

  it('imports data from ~@/data/blogs/blogs-en.data', () => {
    expect(indexContent).toContain('import { data as blogsEn } from \'~@/data/blogs/blogs-en.data\'')
  })

  it('exports reactive({ zh: blogsZh, en: blogsEn })', () => {
    expect(indexContent).toContain('reactive({ zh: blogsZh, en: blogsEn })')
  })

  it('no longer imports from ./blogs-zh (static TS file)', () => {
    expect(indexContent).not.toContain('import blogsZh from \'./blogs-zh\'')
  })

  it('no longer imports from ./blogs-en (static TS file)', () => {
    expect(indexContent).not.toContain('import blogsEn from \'./blogs-en\'')
  })
})

describe('blogs index.ts — reactive() auto-unwraps Ref behavior', () => {
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

describe('deleted files — gen-blogs and static data', () => {
  it('scripts/gen-blogs.js has been deleted', () => {
    expect(existsSync(resolve(rootDir, 'scripts/gen-blogs.js'))).toBe(false)
  })

  it('scripts/generate-data.js has been deleted', () => {
    expect(existsSync(resolve(rootDir, 'scripts/generate-data.js'))).toBe(false)
  })

  it('app/.vitepress/src/data/blogs/blogs-zh.ts has been deleted', () => {
    expect(existsSync(resolve(rootDir, 'app/.vitepress/src/data/blogs/blogs-zh.ts'))).toBe(false)
  })

  it('app/.vitepress/src/data/blogs/blogs-en.ts has been deleted', () => {
    expect(existsSync(resolve(rootDir, 'app/.vitepress/src/data/blogs/blogs-en.ts'))).toBe(false)
  })

  it('scripts/index.js references sync-blogs instead of gen-blogs', () => {
    const scriptIndex = readFileSync(resolve(rootDir, 'scripts/index.js'), 'utf-8')
    expect(scriptIndex).toContain('sync-blogs')
    expect(scriptIndex).not.toContain('gen-blogs')
  })
})

describe('scripts/sync-blogs.js — file sync script structure', () => {
  const syncBlogsPath = resolve(rootDir, 'scripts/sync-blogs.js')
  const syncBlogsContent = readFileSync(syncBlogsPath, 'utf-8')

  it('sync-blogs.js exists', () => {
    expect(existsSync(syncBlogsPath)).toBe(true)
  })

  it('sync-blogs.js does not reference generate-data', () => {
    expect(syncBlogsContent).not.toContain('generate-data')
  })

  it('sync-blogs.js does not contain blacklist logic', () => {
    expect(syncBlogsContent).not.toContain('blackList')
  })

  it('sync-blogs.js does not contain onZhDone callback', () => {
    expect(syncBlogsContent).not.toContain('onZhDone')
  })

  it('sync-blogs.js cleans up _temp/blogs directory', () => {
    expect(syncBlogsContent).toContain('_temp/blogs')
    expect(syncBlogsContent).toContain('rmSync')
  })

  it('sync-blogs.js calls process.exit(1) on failure', () => {
    expect(syncBlogsContent).toContain('process.exit(1)')
  })
})

describe('package.json — build script change', () => {
  const pkgJson = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf-8'))

  it('build script uses sync:blogs instead of gen:blogs', () => {
    expect(pkgJson.scripts.build).not.toContain('gen:blogs')
    expect(pkgJson.scripts.build).toContain('sync:blogs')
  })

  it('build script includes vitepress build app', () => {
    expect(pkgJson.scripts.build).toContain('vitepress build app')
  })

  it('gen:blogs script has been removed from package.json', () => {
    expect(pkgJson.scripts['gen:blogs']).toBeUndefined()
  })

  it('sync:blogs script is present in package.json', () => {
    expect(pkgJson.scripts['sync:blogs']).toBeDefined()
  })
})
