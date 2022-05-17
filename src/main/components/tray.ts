import { app, Menu, Tray, nativeImage, MenuItem, BrowserWindow } from 'electron';
import windowManager from '../utils/windowManager';
import path from 'path';
import { STATIC_PATH } from '../constants';
import fs from 'fs';

class AppTray {
  private tray?: Tray;

  public init() {
    this.tray = new Tray(process.platform === 'darwin' ?
      nativeImage.createFromNamedImage('NSImageNameActionTemplate') :
      path.join(STATIC_PATH, 'tray.ico'));
    this.tray.setToolTip('ClassTools');
    const menu = Menu.buildFromTemplate([
      {
        label: '作业看板',
        click: () => {
          windowManager.createHomeworkViewWindow();
        },
      },
      {
        label: '作业编辑',
        click: () => {
          windowManager.createHomeworkEditWindow();
        },
      },
      {
        label: '标语编辑',
        click: () => {
          windowManager.createSloganEditWindow();
        },
      },
      {
        label: '抽签小工具',
        click: () => {
          windowManager.createLotsWindow();
        },
      },
      { type: 'separator' },
      {
        label: '设置',
        click: () => {
          windowManager.createSettingsWindow();
        },
      },
      {
        label: '关于',
        click: () => {
          windowManager.createAboutWindow();
        },
      },
    ]);
    if (process.env.NODE_ENV === 'development' || fs.existsSync(path.join(app.getPath('userData'), 'debug'))) {
      menu.append(new MenuItem({
        label: '调试',
        click: () => {
          windowManager.createWallpaperWindow().webContents.openDevTools({ mode: 'detach' });
          BrowserWindow.getAllWindows().forEach(it => it.webContents.openDevTools());
        },
      }));
    }
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({
      label: '退出',
      click: async () => {
        windowManager.destroyAllWindows();
        if (process.platform === 'win32') {
          const { getWallpaper, setWallpaper } = // ESM
            await (Function('return import("wallpaper")')() as Promise<typeof import('wallpaper')>);
          const wallpaper = await getWallpaper();
          await setWallpaper(wallpaper);
        }
        this.tray!.destroy();
        app.quit();
        process.exit(0);
      },
    }));
    this.tray.setContextMenu(menu);
    this.tray.on('click', () => this.tray.popUpContextMenu());
  }
}

export default new AppTray();
