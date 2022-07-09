import { builtinModules } from 'module';
import { defineConfig, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import resolve from 'vite-plugin-resolve';
import pkg from '../../package.json';
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
  root: __dirname,
  define: {
    COMMIT_HASH,
    BUILD_DATE: new Date().getTime(),
  },
  plugins: [
    vue(),
    resolveElectron(
      /**
       * Here you can specify other modules
       * 🚧 You have to make sure that your module is in `dependencies` and not in the` devDependencies`,
       *    which will ensure that the electron-builder can package it correctly
       * @example
       * {
       *   'electron-store': 'const Store = require('electron-store'); export default Store;',
       * }
       */
    ),
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
  base: './',
  build: {
    emptyOutDir: true,
    outDir: '../../dist/renderer',
    sourcemap: true,
  },
  server: {
    port: pkg.env.PORT,
  },
});

/**
 * For usage of Electron and NodeJS APIs in the Renderer process
 * @see https://github.com/caoxiemeihao/electron-vue-vite/issues/52
 */
export function resolveElectron(
  resolves: Parameters<typeof resolve>[0] = {},
): Plugin {
  const builtins = builtinModules.filter((t) => !t.startsWith('_'));

  /**
   * @see https://github.com/caoxiemeihao/vite-plugins/tree/main/packages/resolve#readme
   */
  // @ts-ignore
  return resolve({
    electron: electronExport(),
    ...builtinModulesExport(builtins),
    ...resolves,
  });

  function electronExport() {
    return `
/**
 * For all exported modules see https://www.electronjs.org/docs/latest/api/clipboard -> Renderer Process Modules
 */
const electron = require("electron");
const {
  clipboard,
  nativeImage,
  shell,
  contextBridge,
  crashReporter,
  ipcRenderer,
  webFrame,
  desktopCapturer,
  deprecate,
} = electron;

export {
  electron as default,
  clipboard,
  nativeImage,
  shell,
  contextBridge,
  crashReporter,
  ipcRenderer,
  webFrame,
  desktopCapturer,
  deprecate,
}
`;
  }

  function builtinModulesExport(modules: string[]) {
    return modules
      .map((moduleId) => {
        const nodeModule = require(moduleId);
        const requireModule = `const M = require("${moduleId}");`;
        const exportDefault = `export default M;`;
        const exportMembers =
          Object.keys(nodeModule)
            .map((attr) => `export const ${attr} = M.${attr}`)
            .join(';\n') + ';';
        const nodeModuleCode = `
${requireModule}

${exportDefault}

${exportMembers}
`;

        return { [moduleId]: nodeModuleCode };
      })
      .reduce((memo, item) => Object.assign(memo, item), {});
  }
}
