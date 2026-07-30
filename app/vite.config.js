import path from 'path';
import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { OPlusYamlContentVitePlugin } from '@opendesign-plus/vite-plugins';

const proxyConfig = (proxy) => {
  proxy.on('proxyRes', (proxyRes) => {
    const cookies = proxyRes.headers['set-cookie'];
    if (cookies) {
      const modifiedCookies = cookies.map((cookie) => {
        if (cookie.startsWith('_U_T_=') || cookie.startsWith('_Y_G_')) {
          // Example 1: Remove the 'Secure' flag because localhost is not HTTPS
          cookie = cookie
            .replace(/Path=\/[^;]+;/, 'Path=/;')
            .replace(/Domain=[^;]+;/, 'Domain=localhost;');

          if (!cookie.includes('Path=/')) {
            cookie += '; Path=/'
          }
        }
        
        // Example 2: Adjust 'SameSite' attribute for cross-origin local dev
        // Note: You may need to also set Secure=True if the target is HTTPS
        // cookie = cookie.replace(/; SameSite=Lax/gi, '; SameSite=None; Secure');

        // Example 3: You can also use the cookieDomainRewrite and cookiePathRewrite options
        // when defining the proxy, but 'configure' is more flexible for custom logic.
        
        return cookie;
      });
      // Overwrite the original Set-Cookie header with the modified array
      proxyRes.headers['set-cookie'] = modifiedCookies;
    }
  });
}

export default defineConfig({
  build: {},
  publicDir: path.resolve(__dirname, './.vitepress/public'),
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './.vitepress/src')}/`,
      '~@/': `${path.resolve(__dirname, './.vitepress/src-new')}/`,
      '#content': path.resolve(__dirname, '../.content'),
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
    OPlusYamlContentVitePlugin(),
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
        events: FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src-new/assets/category/events/svg-icons')),
        'app-new': FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src-new/assets/svg-icons')),
        'app-new-showcase': FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src-new/assets/svg-icons/category/showcase')),
        'my': FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src-new/assets/svg-icons/category/my')),
        'ogmemory': FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src-new/assets/svg-icons/category/ogmemory')),
        'training': FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src-new/assets/svg-icons/category/training')),
        'internship': FileSystemIconLoader(path.resolve(__dirname, './.vitepress/src-new/assets/svg-icons/category/internship')),
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
      '/api-dsapi/': {
        target: 'https://dsapi.test.osinfra.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-dsapi/, ''),
        configure: proxyConfig,
      },
      '/api-search/': {
        target: 'https://doc-search-common.osinfra.cn/',
        changeOrigin: true,
        headers: {
          Referer: 'https://openauss.org/',
        },
        rewrite: (path) => path.replace(/^\/api-search/, ''),
      },
      '^/api-.*/': {
        target: 'https://opengauss.org/',
        changeOrigin: true,
        headers: {
          Origin: 'https://opengauss.org',
          Referer: 'https://opengauss.org/zh/',
        },
        configure: proxyConfig,
      },
    },
  },
});
