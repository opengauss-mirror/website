import path from 'path';
import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig({
  build: {},
  publicDir: path.resolve(__dirname, './.vitepress/public'),
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './.vitepress/src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  plugins: [
    vueJsx({}),
    Icons({
      compiler: 'vue3',
      customCollections: {
        app: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/svg-icons')
        ),
        security: FileSystemIconLoader(
          path.resolve(
            __dirname,
            './.vitepress/src/assets/category/security/svg-icons'
          )
        ),
        train: FileSystemIconLoader(
          path.resolve(
            __dirname,
            './.vitepress/src/assets/category/authentication/training/svg-icons'
          )
        ),
      },
    }),
  ],
  server: {
    port: 8989,
    proxy: {
      '/advisoryCVE/': {
        target: 'https://api.openeuler.org/cve-manager/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/advisoryCVE/, ''),
      },
      '/api-certification/': {
        target: 'https://ccs.opengauss.org/ccs/base/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-certification/, ''),
      },
      '/calendar/': {
        target: 'https://www.opengauss.org/',
        changeOrigin: true,
      },
      '/omapi/': {
        target: 'https://omapi.osinfra.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/omapi/, ''),
      },
      '/ip-api/': {
        target: 'http://ip-api.com/json/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ip-api/, ''),
      },
      '/api-search': {
        target: 'https://doc-search.opengauss.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-search/, ''),
      },
    },
  },
});
