import request from 'electron-request';
import path from 'path';
import xml2js from 'xml2js';
import fsP from 'fs/promises';
import fs from 'fs';
import { compare } from 'compare-versions';
import os from 'os';
import { execFile, spawn } from 'child_process';
import { ipcMain } from 'electron';
import { captureException, captureMessage } from '@sentry/electron/main';

const packagePath = path.join(path.dirname(process.execPath), '..');
const manifestPath = path.join(packagePath, 'AppxManifest.xml');
const updateConfigPath = path.join(packagePath, 'update.json');
const win10UpdaterPath = path.join(packagePath, 'updater', 'updater.exe');
const msixCorePath = 'C:\\Program Files\\msixmgr\\msixmgr.exe';

let interval: NodeJS.Timer;

async function checkForUpdate() {
  try {
    const manifest = await xml2js.parseStringPromise(await fsP.readFile(manifestPath, 'utf-8'));
    const packageVersion: string = manifest.Package.Identity[0].$.Version;
    console.log('当前版本', packageVersion);
    const updateConfig: { versionUrl: string, packageUrl: string } =
      JSON.parse(await fsP.readFile(updateConfigPath, 'utf-8'));
    const remoteVersionRequest = await request(updateConfig.versionUrl);
    const remoteVersion = await remoteVersionRequest.text();
    console.log('远程版本', remoteVersion);
    const hasUpdate = compare(remoteVersion, packageVersion, '>');
    if (!hasUpdate) return;
    console.log('开始更新');
    ipcMain.emit('update:installing', { remoteVersion, packageVersion });
    // 内层 try 的错误将通知用户
    try {
      if (os.release().startsWith('10.')) {
        execFile(win10UpdaterPath);
      }
      else if (fs.existsSync(msixCorePath)) {
        const installProcess = spawn(msixCorePath, ['-AddPackage', updateConfig.packageUrl, '-quietUX']);
        installProcess.on('exit', (code) => {
          if (code === 0) {
            ipcMain.emit('update:needRestart');
          }
          else {
            ipcMain.emit('update:failed', '安装失败');
          }
        });
      }
      else {
        throw new Error('找不到更新方式');
      }
      captureMessage('更新成功', {
        level: 'info',
      });
    }
    catch (e) {
      ipcMain.emit('update:failed', e.message);
      clearTimeout(interval);
      throw e;
    }
  }
  catch (e) {
    captureException(e, {
      level: 'error',
      tags: {
        context: 'update',
      },
    });
  }
}

export default function setupUpdateChecker() {
  if (!fs.existsSync(manifestPath)) return;
  if (!fs.existsSync(updateConfigPath)) return;
  if (!fs.existsSync(win10UpdaterPath)) return;
  if (!interval)
    interval = setInterval(checkForUpdate, 1000 * 60 * 60);
  checkForUpdate();
}
