import { app, Menu, nativeImage, Tray } from 'electron';
import windowManager from '../utils/windowManager';

class AppTray {
  private tray?: Tray;

  public init() {
    // TODO 图标
    this.tray = new Tray(nativeImage.createFromNamedImage('NSImageNameActionTemplate'));
    this.tray.setToolTip('ClassTools');
    // 还可以从桌面快捷方式进入功能窗口，以后做
    this.tray.setContextMenu(Menu.buildFromTemplate([
      {
        label: '作业看板',
        click: () => {
          windowManager.createHomeworkWindow();
        },
      },
      {
        label: '标语编辑',
        click: () => {
          windowManager.createSloganEditWindow();
        },
      },
      {
        label: '设置',
        click: () => {
          windowManager.createSettingsWindow();
        },
      },
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
  }
}

export default new AppTray();
