import { BrowserWindow, dialog, app } from 'electron';
import { CPP, ffi, L, NULL, WinWin } from 'win-win-api/lib';
import { HANDLE } from 'win-win-api/lib/ts';
import os from 'os';
import { exec } from 'child_process';

const winFns = new WinWin().winFns();
export default function (childWindow: BrowserWindow) {
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
      if (os.release().startsWith('6.1')) {
        // Win7
        dialog.showMessageBoxSync({
          message: '设置壁纸失败，请打开 Aero',
        });
      }
      else if (os.release().startsWith('10.')) {
        // Win10
        const choice = dialog.showMessageBoxSync({
          message: '设置壁纸失败，请在「性能设置」中打开「窗口内的动画控件和元素」',
          buttons: ['去设置', '退出'],
          defaultId: 1,
        });
        if (choice === 0) {
          exec('control sysdm.cpl,,3');
        }
      }
      else {
        dialog.showMessageBoxSync({
          message: '设置壁纸失败',
        });
      }
      app.quit();
    }
  }
  catch (e) {
    dialog.showMessageBoxSync({
      message: '设置壁纸失败',
      detail: e.toString(),
    });
    app.quit();
  }
}
