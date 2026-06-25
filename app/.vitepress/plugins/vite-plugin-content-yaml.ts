import type { Plugin } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ASSET_EXT = /\.(png|jpe?g|webp|svg|gif)$/i;
const SENTINEL = '__VITE_CONTENT_ASSET_';
const VIRTUAL_PREFIX = '\0content-dir:';
const VERSION_DATA_ID = 'virtual:content-versions';
const VERSION_DATA_RESOLVED = '\0virtual:content-versions';
const CONTENT_ALIAS = '#content';

export default function contentYamlPlugin(): Plugin {
  let contentRoot: string | undefined;

  return {
    name: 'vite-plugin-content-yaml',
    enforce: 'pre',

    configResolved(config) {
      const found = config.resolve.alias.find((a) => a.find === CONTENT_ALIAS);
      contentRoot = found?.replacement;
    },

    async resolveId(id) {
      if (!contentRoot) return;
      if (id === VERSION_DATA_ID) return VERSION_DATA_RESOLVED;
      if (/\.ya?ml$/.test(id)) return;

      let abs: string | undefined;
      if (id.startsWith(`${CONTENT_ALIAS}/`)) {
        abs = path.resolve(contentRoot, id.slice(CONTENT_ALIAS.length + 1));
      } else if (path.isAbsolute(id) && (id === contentRoot || id.startsWith(`${contentRoot}/`))) {
        abs = id;
      }
      if (!abs) return;

      try {
        const stat = await fs.promises.stat(abs);
        if (stat.isDirectory()) {
          const hasYaml = (await fs.promises.readdir(abs)).some((f) => /\.ya?ml$/.test(f));
          if (hasYaml) return VIRTUAL_PREFIX + abs;
        }
      } catch {
        /* not a directory — fall through */
      }
      return;
    },

    async load(id) {
      if (id === VERSION_DATA_RESOLVED) {
        const dir = path.join(contentRoot!, 'download', 'versions');
        const files = (await fs.promises.readdir(dir)).filter((f) => /\.ya?ml$/.test(f)).sort();
        const entries: string[] = [];
        for (const f of files) {
          const slug = f.replace(/\.ya?ml$/, '');
          const content = await fs.promises.readFile(path.join(dir, f), 'utf-8');
          const data = yaml.load(content);
          entries.push(`${JSON.stringify(slug)}: ${JSON.stringify(data)}`);
        }
        return { code: `export default { ${entries.join(', ')} };\n`, map: null };
      }

      if (id.startsWith(VIRTUAL_PREFIX)) {
        const dir = id.slice(VIRTUAL_PREFIX.length);
        const files = (await fs.promises.readdir(dir))
          .filter((f) => /\.ya?ml$/.test(f))
          .sort();
        const imports: string[] = [];
        const entries: string[] = [];
        files.forEach((f, i) => {
          const slug = f.replace(/\.ya?ml$/, '');
          const fp = path.join(dir, f);
          imports.push(`import __d${i} from ${JSON.stringify(fp)};`);
          entries.push(`${JSON.stringify(slug)}: __d${i}`);
        });
        return {
          code: `${imports.join('\n')}\nexport default { ${entries.join(', ')} };\n`,
          map: null,
        };
      }

      const clean = id.split('?', 1)[0];
      if (!/\.ya?ml$/.test(clean)) return;

      const code = await fs.promises.readFile(clean, 'utf-8');
      const data = yaml.load(code);
      const imports: string[] = [];

      const replaced = walk(data, (val) => {
        if (typeof val !== 'string') return val;
        if (!val.startsWith('./') && !val.startsWith('../') && !val.startsWith('~@/')) return val;
        if (!ASSET_EXT.test(val)) return val;
        const idx = imports.length;
        imports.push(`import __a${idx} from ${JSON.stringify(val)};`);
        return `${SENTINEL}${idx}__`;
      });

      let json = JSON.stringify(replaced);
      json = json.replace(new RegExp(`"${SENTINEL}(\\d+)__"`, 'g'), '__a$1');

      return {
        code: `${imports.join('\n')}\nexport default ${json};\n`,
        map: null,
      };
    },
  };
}

function walk(node: unknown, fn: (s: string) => unknown): unknown {
  if (Array.isArray(node)) return node.map((n) => walk(n, fn));
  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node as Record<string, unknown>).map(([k, v]) => [
        k,
        typeof v === 'string' ? fn(v) : walk(v, fn),
      ]),
    );
  }
  return node;
}
