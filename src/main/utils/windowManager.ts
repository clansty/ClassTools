import { BrowserWindow, BrowserWindowConstructorOptions, shell, screen } from 'electron';
import path from 'path';

class WindowManager {
  // 这些都设置成 private 了，要用这些窗口的时候用下面那些 create 的方法，会返回需要的窗口，这样保证它们都是存在的
  private wallpaperWindow?: BrowserWindow;
  private homeworkEditWindow?: BrowserWindow;
  private homeworkViewWindow?: BrowserWindow;
  private settingsWindow?: BrowserWindow;
  private sloganEditWindow?: BrowserWindow;

  private createWindow(route: string, options: Partial<BrowserWindowConstructorOptions> = {}) {
    const win = new BrowserWindow({
      webPreferences: {
        preload: path.join(__dirname, '../preload/index.cjs'),
      },
      ...options,
    });

    if (process.env.NODE_ENV === 'development') {
      // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
      const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;

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

    win.webContents.openDevTools();

    return win;
  }

  public createWallpaperWindow() {
    if (this.wallpaperWindow) {
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
    if (this.homeworkEditWindow) {
      this.homeworkEditWindow.show();
      return this.homeworkEditWindow;
    }
    const screenSize = screen.getPrimaryDisplay().size;
    this.homeworkEditWindow = this.createWindow('homeworkEdit', {
      width: 600,
      height: screenSize.height - 400,
    });
    this.homeworkEditWindow.on('close', () => {
      this.homeworkEditWindow = undefined;
    });
    return this.homeworkEditWindow;
  }

  public createHomeworkViewWindow() {
    if (this.homeworkViewWindow) {
      this.homeworkViewWindow.show();
      return this.homeworkViewWindow;
    }
    this.homeworkViewWindow = this.createWindow('homeworkView', {
      fullscreen: true,
    });
    this.homeworkViewWindow.maximize();
    this.homeworkViewWindow.on('close', () => {
      this.homeworkViewWindow = undefined;
    });
    return this.homeworkViewWindow;
  }

  public createSettingsWindow() {
    if (this.settingsWindow) {
      this.settingsWindow.show();
      return this.settingsWindow;
    }
    this.settingsWindow = this.createWindow('settings');
    this.settingsWindow.on('close', () => {
      this.settingsWindow = undefined;
    });
    return this.settingsWindow;
  }

  public createSloganEditWindow() {
    if (this.sloganEditWindow) {
      this.sloganEditWindow.show();
      return this.sloganEditWindow;
    }
    this.sloganEditWindow = this.createWindow('sloganEdit');
    this.sloganEditWindow.maximize();
    this.sloganEditWindow.on('closed', () => {
      this.sloganEditWindow = undefined;
    });
    return this.sloganEditWindow;
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
  }
}

export default new WindowManager();
