import { shell, app } from 'electron';
import path from 'path';
import * as Sentry from '@sentry/electron/main';

const shortcuts = [
  {
    name: '作业看版',
    params: '--window=homeworkView',
    iconIndex: 1,
  },
  {
    name: '作业编辑',
    params: '--window=homeworkEdit',
    iconIndex: 2,
  },
  {
    name: '标语编辑',
    params: '--window=sloganEdit',
    iconIndex: 3,
  },
];

export default function () {
  // 只有非商店版本使用这个
  if (process.windowsStore) return;
  if (process.platform !== 'win32') return;
  const desktopPath = app.getPath('desktop');
  for (const shortcut of shortcuts) {
    try {
      const isOk = shell.writeShortcutLink(path.join(desktopPath, shortcut.name + '.lnk'), {
        target: process.execPath,
        args: shortcut.params,
        icon: process.execPath,
        iconIndex: shortcut.iconIndex,
      });
      if (!isOk) throw new Error('快捷方式创建失败');
    }
    catch (e) {
      Sentry.captureException(e);
    }
  }
}
