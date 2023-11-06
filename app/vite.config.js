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
        float: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/category/float')
        ),
      },
    }),
  ],
});
