import { app, BrowserWindow, shell } from 'electron';
import { release } from 'os';
import { join } from 'path';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    title: 'ClassTools 3 Wallpaper',
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
    },
    fullscreen: process.platform === 'win32'/* && !IS_DEVELOPMENT */,
  });

  if (process.platform === 'win32'/* && !IS_DEVELOPMENT */) {
    const { default: setAsWallpaper } = await import('./utils/setAsWallpaper');
    setAsWallpaper(win);
  }

  if (!IS_DEVELOPMENT) {
    win.loadFile(join(__dirname, '../renderer/index.html') + '#/wallpaper');
  }
  else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;

    win.loadURL(url + '#/wallpaper');
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  win = null;
  app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  }
  else {
    createWindow();
  }
});
