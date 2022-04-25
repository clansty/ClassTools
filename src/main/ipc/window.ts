import { ipcMain, BrowserWindow } from 'electron';
import windowManager from '../utils/windowManager';

type WindowName = 'homeworkEdit' | 'homeworkView' | 'settings' | 'sloganEdit';

const ipcWindow = {
  register() {
    ipcMain.on('window:minimize', (event) => {
      const window = BrowserWindow.fromId(event.sender.id);
      window.minimize();
    });
    ipcMain.on('window:open', (event, name: WindowName) => {
      switch (name) {
        case 'homeworkEdit':
          return windowManager.createHomeworkEditWindow();
        case 'homeworkView':
          return windowManager.createHomeworkViewWindow();
        case 'sloganEdit':
          return windowManager.createSloganEditWindow();
        case 'settings':
          return windowManager.createSettingsWindow();
      }
    });
  },
};

export default ipcWindow;
