import windowManager from './windowManager';

export default async function () {
  const settingsJson: string = await windowManager.createWallpaperWindow().webContents
    .executeJavaScript('localStorage.getItem("settings");');
  const settings = JSON.parse(settingsJson);
  return Object.freeze(settings);
}
