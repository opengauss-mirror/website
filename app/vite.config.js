import path from 'path';
import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig({
  build: {},
  publicDir: path.resolve(__dirname, './.vitepress/public'),
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './.vitepress/src')}/`,
      '~@/': `${path.resolve(__dirname, './.vitepress/src-new')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `
        @use "~@/assets/style/mixin/screen.scss" as *;
        @use "~@/assets/style/mixin/font.scss" as *;
        @use "~@/assets/style/mixin/common.scss" as *;
      `,
      },
    },
  },
  plugins: [
    vueJsx({}),
    Icons({
      compiler: 'vue3',
      customCollections: {
        app: FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src/assets/svg-icons')),
        security: FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src/assets/category/security/svg-icons')),
        train: FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src/assets/category/authentication/training/svg-icons')),
        float: FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src/assets/category/float')),
        migration: FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src/assets/category/migration')),
        teamup: FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src/assets/category/team-up')),
        'app-new': FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src-new/assets/svg-icons')),
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'zh/privacy/index.md', // 复制index.md 文件
          dest: 'file/zh/privacy', // 输出到 dist/file 下目录
        },
        {
          src: 'en/privacy/index.md', // 复制index.md 文件
          dest: 'file/en/privacy', // 输出到 dist/file 下目录
        },
        {
          src: 'zh/legal/index.md', // 复制index.md 文件
          dest: 'file/zh/legal', // 输出到 dist/file 下目录
        },
        {
          src: 'en/legal/index.md', // 复制index.md 文件
          dest: 'file/en/legal', // 输出到 dist/file 下目录
        },
      ],
    }),
  ],
  server: {
    proxy: {
      '/api-cve/': {
        target: 'https://cvemanager.test.osinfra.cn/cve-manager/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-cve/, ''),
      },
      '/api-dsapi/': {
        target: 'https://dsapi.test.osinfra.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-dsapi/, ''),
      },
      '/api-meeting/': {
        target: 'https://opengauss-meeting-center.test.osinfra.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-meeting/, ''),
      },
      '/api-search/': {
        target: 'https://doc-search-common.test.osinfra.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-search/, ''),
      },
      '/api-oneid/': {
        target: 'https://id-opengauss.test.osinfra.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-oneid/, ''),
      },
    },
  },
});
