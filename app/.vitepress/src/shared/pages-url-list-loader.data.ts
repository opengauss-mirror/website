import { createContentLoader } from 'vitepress';
import { canonicalPagePath, pageLangFromUrl } from './page-language';

export default createContentLoader('{zh,en}/**/*.md', {
  includeSrc: false,
  render: false,
  transform(raw) {
    const map: Record<string, string[]> = {};
    for (const page of raw) {
      const key = canonicalPagePath(page.url);
      const lang = pageLangFromUrl(page.url);
      if (!lang) continue;
      const langs = map[key] || (map[key] = []);
      if (!langs.includes(lang)) langs.push(lang);
    }
    return map;
  },
});
