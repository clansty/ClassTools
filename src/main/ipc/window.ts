import { ipcMain, BrowserWindow } from 'electron';
import windowManager from '../utils/windowManager';
import WindowName from '../types/WindowName';

const ipcWindow = {
  register() {
    ipcMain.on('window:minimize', (event) => {
      const window = BrowserWindow.fromId(event.sender.id);
      window.minimize();
    });
    ipcMain.on('window:open', (event, name: WindowName) => {
      return windowManager.createByName(name);
    });
  },
};

export default ipcWindow;
