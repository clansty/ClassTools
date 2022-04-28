import { app, Menu } from 'electron';
import os from 'os';
import windowManager from './utils/windowManager';
import tray from './components/tray';
import ipcWindow from './ipc/window';
import minimist from 'minimist';
import WindowName from './types/WindowName';

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

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
});

app.on('window-all-closed', () => {
  app.quit();
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
