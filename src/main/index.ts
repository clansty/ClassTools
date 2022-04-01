import { app } from 'electron';
import os from 'os';
import windowManager from './utils/windowManager';

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

app.whenReady().then(async () => {
  const wallPaperWindow = windowManager.createWallpaperWindow();
  wallPaperWindow.setMenu(null);
  if (process.platform === 'win32'/* && !IS_DEVELOPMENT */) {
    const { default: setAsWallpaper } = await import('./utils/setAsWallpaper');
    setAsWallpaper(wallPaperWindow);
  }
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('second-instance', () => {
  // TODO: 通过第二个实例传递的参数打开相应的窗口，针对给功能窗口创建桌面快捷方式的情况（准备可以用过桌面快捷方式或者托盘菜单打开功能窗口）
});
