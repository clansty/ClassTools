import { app, BrowserWindow, dialog } from 'electron';
import { CPP, ffi, L, NULL, Win32ffi } from 'win32-ffi';
import { HANDLE } from 'win32-ffi/lib/ts';
import os from 'os';
import { exec } from 'child_process';
import { Severity, captureException, captureMessage } from '@sentry/electron/main';

const winFns = new Win32ffi().winFns();
export default async function (childWindow: BrowserWindow) {
  try {
    //壁纸句柄
    let workView: HANDLE | null = null;

    //寻找底层窗体句柄
    let Progman = winFns.FindWindowW(L('Progman'), NULL);

    //使用 0x3e8 命令分割出两个 WorkerW
    winFns.SendMessageTimeoutW(Progman, 0x052c, 0, 0, 0, 0x3e8, L('ok'));

    //创建回调函数
    const createEnumWindowProc = () =>
      ffi.Callback(CPP.BOOL, [CPP.HWND, CPP.LPARAM], (tophandle: HANDLE) => {
        //寻找桌面句柄
        let defview = winFns.FindWindowExW(
          tophandle,
          0,
          L('SHELLDLL_DefView'),
          NULL,
        );

        // 如果找到桌面句柄再找壁纸句柄
        if (defview != NULL) {
          workView = winFns.FindWindowExW(0, tophandle, L('WorkerW'), NULL);
        }

        return true;
      });

    //遍历窗体获得窗口句柄
    winFns.EnumWindows(createEnumWindowProc(), 0);

    //获取electron的句柄
    const myAppHwnd = bufferCastInt32(childWindow.getNativeWindowHandle());

    //将buffer类型的句柄进行转换
    function bufferCastInt32(buf: Buffer) {
      return os.endianness() == 'LE' ? buf.readInt32LE() : buf.readInt32BE();
    }

    //将electron窗口设置在壁纸上层
    if (workView) {
      winFns.SetParent(myAppHwnd, workView);
    }
    else {
      captureMessage('设置壁纸失败，因为找不到 workView', {
        level: Severity.Fatal,
        tags: {
          context: 'wallpaper',
        },
      });
      if (os.release().startsWith('6.1')) {
        // Win7
        await dialog.showMessageBox({
          message: '设置壁纸失败，请打开 Aero',
        });
      }
      else if (os.release().startsWith('10.')) {
        // Win10
        const choice = await dialog.showMessageBox({
          message: '设置壁纸失败，请在「性能设置」中打开「窗口内的动画控件和元素」',
          buttons: ['去设置', '退出'],
          defaultId: 1,
        });
        if (choice.response === 0) {
          exec('control sysdm.cpl,,3');
        }
      }
      else {
        await dialog.showMessageBox({
          message: '设置壁纸失败',
        });
      }
      app.quit();
    }
  }
  catch (e) {
    captureException(e, {
      level: Severity.Fatal,
      tags: {
        context: 'wallpaper',
      },
    });
    await dialog.showMessageBox({
      message: '设置壁纸失败',
      detail: e.toString(),
    });
    app.quit();
  }
}
