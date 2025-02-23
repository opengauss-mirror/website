import path from 'path';
import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteStaticCopy  } from 'vite-plugin-static-copy';
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
        additionalData: `@use "@/shared/styles/mixin/common.scss" as *;`,
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
        float: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/category/float')
        ),
        migration: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/category/migration')
        ),
        teamup: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/category/team-up')
        ),
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'zh/privacyPolicy/index.md',  // 复制index.md 文件
          dest: 'file/zh/privacyPolicy', // 输出到 dist/file 下目录
        },
        {
          src: 'en/privacyPolicy/index.md',  // 复制index.md 文件
          dest: 'file/en/privacyPolicy', // 输出到 dist/file 下目录
        },
        {
          src: 'zh/legal/index.md',  // 复制index.md 文件
          dest: 'file/zh/legal', // 输出到 dist/file 下目录
        },
        {
          src: 'en/legal/index.md',  // 复制index.md 文件
          dest: 'file/en/legal', // 输出到 dist/file 下目录
        },
      ],
    }),
  ],
});
