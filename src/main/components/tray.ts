import { app, Menu, Tray } from 'electron';
import windowManager from '../utils/windowManager';
import path from 'path';
import { STATIC_PATH } from '../constants';

class AppTray {
  private tray?: Tray;

  public init() {
    this.tray = new Tray(path.join(STATIC_PATH, 'tray.ico'));
    this.tray.setToolTip('ClassTools');
    // 还可以从桌面快捷方式进入功能窗口，以后做
    this.tray.setContextMenu(Menu.buildFromTemplate([
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
      { type: 'separator' },
      {
        label: '退出',
        click: () => {
          windowManager.destroyAllWindows();
          this.tray!.destroy();
          app.quit();
          process.exit(0);
        },
      },
    ]));
    this.tray.on('click', () => this.tray.popUpContextMenu());
  }
}

export default new AppTray();
