import { defineConfig } from 'vitest/config';
import path from 'path';

function mockAssetsPlugin() {
  const assetExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
  return {
    name: 'mock-assets',
    enforce: 'pre',
    load(id) {
      const ext = path.extname(id);
      if (assetExts.includes(ext)) {
        return `export default "${id}"`;
      }
    },
  };
}

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/.vitepress/src'),
      '~@': path.resolve(__dirname, 'app/.vitepress/src-new'),
    },
  },
  plugins: [mockAssetsPlugin()],
  test: {
    include: ['./tests/unit/**'],
    environment: 'jsdom',
  },
});