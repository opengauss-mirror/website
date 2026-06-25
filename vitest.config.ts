import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~@': resolve(__dirname, 'app/.vitepress/src-new'),
      '@': resolve(__dirname, 'app/.vitepress/src'),
      '#content': resolve(__dirname, '.content'),
    },
  },
  test: {
    include: ['./tests/unit/**'],
    environment: 'jsdom',
  },
});
