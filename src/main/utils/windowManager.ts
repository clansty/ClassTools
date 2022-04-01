import { BrowserWindow, BrowserWindowConstructorOptions, shell } from 'electron';
import path from 'path';

class WindowManager {
  // 这些都设置成 private 了，要用这些窗口的时候用下面那些 create 的方法，会返回需要的窗口，这样保证它们都是存在的
  private wallpaperWindow?: BrowserWindow;
  private homeworkWindow?: BrowserWindow;
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
      win.loadFile(path.join(__dirname, '../renderer/index.html') + `#/${route}`);
    }

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) shell.openExternal(url);
      return { action: 'deny' };
    });

    return win;
  }

  public createWallpaperWindow() {
    if (this.wallpaperWindow) {
      return this.wallpaperWindow;
    }
    this.wallpaperWindow = this.createWindow('wallpaper', {
      fullscreen: process.platform === 'win32',
    });
    return this.wallpaperWindow;
  }

  public createHomeworkWindow() {
    if (this.homeworkWindow) {
      this.homeworkWindow.show();
      return this.homeworkWindow;
    }
    this.homeworkWindow = this.createWindow('homework');
    this.homeworkWindow.maximize();
    return this.homeworkWindow;
  }

  public createSettingsWindow() {
    if (this.settingsWindow) {
      this.settingsWindow.show();
      return this.settingsWindow;
    }
    this.settingsWindow = this.createWindow('settings');
    return this.settingsWindow;
  }

  public createSloganEditWindow() {
    if (this.sloganEditWindow) {
      this.sloganEditWindow.show();
      return this.sloganEditWindow;
    }
    this.sloganEditWindow = this.createWindow('sloganEdit');
    this.sloganEditWindow.maximize();
    return this.sloganEditWindow;
  }
}

export default new WindowManager();
