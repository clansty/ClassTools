import { app, dialog, Menu } from 'electron';
import os from 'os';
import windowManager from './utils/windowManager';
import tray from './components/tray';
import ipcWindow from './ipc/window';
import minimist from 'minimist';
import WindowName from './types/WindowName';
import fs from 'fs';
import path from 'path';
import setupUpdateChecker from './utils/checkForUpdate';
import * as Sentry from '@sentry/electron/main';
import getSettings from './utils/getSettings';
import createShortcuts from './utils/createShortcuts';
import { captureException } from '@sentry/electron/main';

// 如果是 portable 版本，软件目录有 data 这个文件夹的话，数据放在 data 里面
// 提供的 portable 版本的压缩包里自带这个文件夹
if (fs.existsSync(path.join(path.dirname(process.execPath), 'data'))) {
  app.setPath('userData', path.join(path.dirname(process.execPath), 'data'));
}

// 故障报告
Sentry.init({
  dsn: 'https://474bfb78ea9242568079efefa41943bc@o1243132.ingest.sentry.io/6398330',
  release: app.getVersion(),
});
Sentry.setContext('application', {
  portable: fs.existsSync(path.join(path.dirname(process.execPath), 'data')),
  osVersion: os.release(),
});

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration();

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

app.whenReady().then(async () => {
  setupUpdateChecker();
  tray.init();
  if (process.env.NODE_ENV !== 'development') {
    Menu.setApplicationMenu(null);
  }
  ipcWindow.register();
  const wallPaperWindow = windowManager.createWallpaperWindow();
  if (process.platform === 'win32') {
    try {
      const { default: setAsWallpaper } = await import('./utils/setAsWallpaper');
      await setAsWallpaper(wallPaperWindow);
    }
    catch (e) {
      windowManager.destroyAllWindows();
      captureException(e, {
        level: 'fatal',
        tags: {
          context: 'wallpaper',
        },
      });
      await dialog.showMessageBox({
        message: '设置壁纸失败',
        detail: e.toString(),
      });
      app.quit();
    }
    const settings = await getSettings();
    if (settings.createDesktopShortcut) {
      createShortcuts();
    }
  }
});

app.on('window-all-closed', () => {
});

app.on('second-instance', (event, argv) => {
  // 接收快捷方式传入的参数 --window=homeworkEdit 之类，打开指定窗口
  const argvParsed = minimist(argv, {
    string: ['window'],
  }) as {
    window?: WindowName;
  };

  if (argvParsed.window) {
    windowManager.createByName(argvParsed.window);
  }
});
