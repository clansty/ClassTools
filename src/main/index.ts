import { app, Menu } from 'electron';
import os from 'os';
import windowManager from './utils/windowManager';
import tray from './components/tray';
import ipcWindow from './ipc/window';
import minimist from 'minimist';
import WindowName from './types/WindowName';
import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';

// 如果是 portable 版本，软件目录有 data 这个文件夹的话，数据放在 data 里面
// 提供的 portable 版本的压缩包里自带这个文件夹
if (fs.existsSync(path.join(path.dirname(process.execPath), 'data'))) {
  app.setPath('userData', path.join(path.dirname(process.execPath), 'data'));
}

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration();

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

app.whenReady().then(async () => {
  tray.init();
  if (process.env.NODE_ENV !== 'development') {
    Menu.setApplicationMenu(null);
  }
  ipcWindow.register();
  const wallPaperWindow = windowManager.createWallpaperWindow();
  if (process.platform === 'win32') {
    const { default: setAsWallpaper } = await import('./utils/setAsWallpaper');
    setAsWallpaper(wallPaperWindow);
  }
  if (process.windowsStore && fs.existsSync(path.join(path.dirname(process.execPath), '..', 'updater.exe'))) {
    try {
      execFile(path.join(path.dirname(process.execPath), '..', 'updater.exe'));
    }
    catch {
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
