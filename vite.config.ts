import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Content from '@originjs/vite-plugin-content';
import SvgLoader from 'vite-svg-loader';
import { execSync } from 'child_process';

const COMMIT_HASH = JSON.stringify(execSync('git rev-parse --short HEAD').toString()
  .replace(/[\n\r\s]/g, ''));

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  define: {
    COMMIT_HASH,
    BUILD_DATE: new Date().getTime(),
  },
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    Content(),
    SvgLoader(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    emptyOutDir: true,
    outDir: './dist',
    sourcemap: true,
  },
  server: {
    port: pkg.env.PORT,
  },
});
