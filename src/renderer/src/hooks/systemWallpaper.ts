import { ref } from 'vue';

const fs = window.fs;
const path = window.path;

const APPDATA = window.env?.APPDATA;

const useSystemWallpaper = () => {
  if (!APPDATA) return ref('');
  const wallpaperPath = path.join(APPDATA, 'Microsoft', 'Windows', 'Themes', 'TranscodedWallpaper');
  const wallpaperPathWeb = wallpaperPath.replace(/\\/g, '/');
  const wallpaper = ref(wallpaperPathWeb);
  fs.watchFile(wallpaperPath, () => {
    wallpaper.value = wallpaperPathWeb + '?t=' + new Date().getTime();
  });
  return wallpaper;
};

export default useSystemWallpaper;
