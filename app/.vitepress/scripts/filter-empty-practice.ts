import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import matter from 'gray-matter';

/**
 * 递归收集目录下所有 `.md` 文件绝对路径。
 */
function collectMdFiles(dir: string, files: string[] = []): string[] {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      collectMdFiles(fullPath, files);
    } else if (entry.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * 扫描 user-practice 页面，返回 frontmatter `detail === false` 且正文为空的文件路径列表。
 *
 * 路径相对于 `appDir`（即 VitePress srcDir），如 `zh/user-practice/dbv/chaojubian/index.md`。
 * 这些路径会被追加到 VitePress `srcExclude`，从而在 SSG 构建时跳过路由 / HTML / sitemap 生成。
 *
 * @param appDir VitePress srcDir 绝对路径（即 `app/`）
 * @returns 需排除的 md 文件相对路径数组
 */
export function getEmptyPracticeExcludes(appDir: string): string[] {
  const excludes: string[] = [];
  const locales = ['zh', 'en'];

  for (const locale of locales) {
    const practiceDir = join(appDir, locale, 'user-practice');
    let mdFiles: string[];
    try {
      mdFiles = collectMdFiles(practiceDir);
    } catch {
      continue;
    }

    for (const filePath of mdFiles) {
      const raw = readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      if (data.detail === false && content.trim() === '') {
        excludes.push(relative(appDir, filePath).split(sep).join('/'));
      }
    }
  }

  return excludes;
}
