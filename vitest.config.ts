import { defineConfig } from 'vitest/config';
import path from 'node:path';

const rootDir = path.resolve(__dirname);

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~@\//,
        replacement: path.resolve(rootDir, 'app/.vitepress/src-new/') + '/',
      },
    ],
  },
  assetsInclude: ['.png', '.jpg', '.svg'],
  plugins: [
    {
      name: 'vitest-icons-stub',
      enforce: 'pre',
      resolveId(id) {
        if (id.startsWith('~icons/')) {
          return 'virtual:icon-stub';
        }
        return null;
      },
      load(id) {
        if (id === 'virtual:icon-stub') {
          return 'export default { name: "IconStub", render: () => null, __file: "icon-stub" }';
        }
        return null;
      },
    },
  ],
  test: {
    include: ['./tests/unit/**'],
    environment: 'jsdom',
  },
});