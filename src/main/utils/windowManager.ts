import { BrowserWindow, BrowserWindowConstructorOptions, shell, screen } from 'electron';
import path from 'path';
import WindowName from '../types/WindowName';

class WindowManager {
  // 这些都设置成 private 了，要用这些窗口的时候用下面那些 create 的方法，会返回需要的窗口，这样保证它们都是存在的
  private wallpaperWindow?: BrowserWindow;
  private homeworkEditWindow?: BrowserWindow;
  private homeworkViewWindow?: BrowserWindow;
  private settingsWindow?: BrowserWindow;
  private sloganEditWindow?: BrowserWindow;
  private aboutWindow?: BrowserWindow;
  private lotsWindow?: BrowserWindow;

  private createWindow(route: string, options: Partial<BrowserWindowConstructorOptions> = {}, onReadyToShow?: () => any) {
    const win = new BrowserWindow({
      webPreferences: {
        preload: path.join(__dirname, '../preload/index.cjs'),
        sandbox: false,
        webSecurity: false,
      },
      show: false,
      ...options,
    });

    win.once('ready-to-show', () => {
      onReadyToShow && onReadyToShow();
      win.show();
    });

    if (process.env.NODE_ENV === 'development') {
      // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
      const url = `http://localhost:${process.env['VITE_DEV_SERVER_PORT']}`;

      win.loadURL(`${url}#/${route}`);
    }
    else {
      win.loadFile(path.resolve(__dirname, '../renderer/index.html'), { hash: route });
    }

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) shell.openExternal(url);
      return { action: 'deny' };
    });

    return win;
  }

  public createWallpaperWindow() {
    if (this.wallpaperWindow && !this.wallpaperWindow.isDestroyed()) {
      return this.wallpaperWindow;
    }
    this.wallpaperWindow = this.createWindow('wallpaper', {
      fullscreen: process.platform === 'win32',
    });
    this.wallpaperWindow.on('closed', () => {
      this.wallpaperWindow = undefined;
    });
    return this.wallpaperWindow;
  }

  public createHomeworkEditWindow() {
    if (this.homeworkEditWindow && !this.homeworkEditWindow.isDestroyed()) {
      this.homeworkEditWindow.show();
      return this.homeworkEditWindow;
    }
    const screenSize = screen.getPrimaryDisplay().size;
    this.homeworkEditWindow = this.createWindow('homeworkEdit', {
      width: 600,
      height: screenSize.height - 100,
      title: '作业编辑',
    });
    this.homeworkEditWindow.on('close', () => {
      this.homeworkEditWindow = undefined;
    });
    return this.homeworkEditWindow;
  }

  public createHomeworkViewWindow() {
    if (this.homeworkViewWindow && !this.homeworkViewWindow.isDestroyed()) {
      this.homeworkViewWindow.show();
      return this.homeworkViewWindow;
    }
    this.homeworkViewWindow = this.createWindow('homeworkView', {
      fullscreen: true,
      title: '作业看板',
    });
    this.homeworkViewWindow.on('close', () => {
      this.homeworkViewWindow = undefined;
    });
    return this.homeworkViewWindow;
  }

  public createSettingsWindow() {
    if (this.settingsWindow && !this.settingsWindow.isDestroyed()) {
      this.settingsWindow.show();
      return this.settingsWindow;
    }
    this.settingsWindow = this.createWindow('settings', {
      title: '设置',
      width: 1200,
      height: 768,
    });
    this.settingsWindow.on('close', () => {
      this.settingsWindow = undefined;
    });
    return this.settingsWindow;
  }

  public createAboutWindow() {
    if (this.aboutWindow && !this.aboutWindow.isDestroyed()) {
      this.aboutWindow.show();
      return this.aboutWindow;
    }
    this.aboutWindow = this.createWindow('about', {
      title: '关于 ClassTools',
      maximizable: false,
      resizable: false,
    });
    this.aboutWindow.on('close', () => {
      this.aboutWindow = undefined;
    });
    return this.aboutWindow;
  }

  public createSloganEditWindow() {
    if (this.sloganEditWindow && !this.sloganEditWindow.isDestroyed()) {
      this.sloganEditWindow.show();
      return this.sloganEditWindow;
    }
    const screenSize = screen.getPrimaryDisplay().size;
    this.sloganEditWindow = this.createWindow('sloganEdit', {
      title: '标语编辑',
      // 显示在屏幕左边三分之一的位置，就像 C8UI 标语编辑器的左半边
      height: screenSize.height,
      width: screenSize.width / 3,
      x: 0,
      y: 0,
    });
    this.sloganEditWindow.on('closed', () => {
      this.sloganEditWindow = undefined;
    });
    return this.sloganEditWindow;
  }

  public createLotsWindow() {
    if (this.lotsWindow && !this.lotsWindow.isDestroyed()) {
      this.lotsWindow.show();
      return this.lotsWindow;
    }
    const screenSize = screen.getPrimaryDisplay().size;
    this.lotsWindow = this.createWindow('lots', {
      title: '抽签小工具',
      // 显示在屏幕左边三分之一的位置，就像 C8UI 标语编辑器的左半边
      width: 600,
      height: 500,
      x: screenSize.width - 700,
      y: screenSize.height - 600,
    });
    this.lotsWindow.on('closed', () => {
      this.lotsWindow = undefined;
    });
    return this.lotsWindow;
  }

  public destroyAllWindows() {
    if (this.wallpaperWindow) {
      this.wallpaperWindow.destroy();
    }
    if (this.homeworkEditWindow) {
      this.homeworkEditWindow.destroy();
    }
    if (this.homeworkViewWindow) {
      this.homeworkViewWindow.destroy();
    }
    if (this.settingsWindow) {
      this.settingsWindow.destroy();
    }
    if (this.sloganEditWindow) {
      this.sloganEditWindow.destroy();
    }
    if (this.lotsWindow) {
      this.lotsWindow.destroy();
    }
  }

  public createByName(name: WindowName) {
    switch (name) {
      case 'homeworkEdit':
        return this.createHomeworkEditWindow();
      case 'homeworkView':
        return this.createHomeworkViewWindow();
      case 'sloganEdit':
        return this.createSloganEditWindow();
      case 'settings':
        return this.createSettingsWindow();
      case 'about':
        return this.createAboutWindow();
      case 'lots':
        return this.createLotsWindow();
    }
  }
}

export default new WindowManager();
