import request from 'electron-request';
import path from 'path';
import xml2js from 'xml2js';
import fsP from 'fs/promises';
import fs from 'fs';
import { compare } from 'compare-versions';
import os from 'os';
import { execFile, spawn } from 'child_process';
import { app } from 'electron';

const packagePath = path.join(path.dirname(process.execPath), '..');
const manifestPath = path.join(packagePath, 'AppxManifest.xml');
const updateConfigPath = path.join(packagePath, 'update.json');
const win10UpdaterPath = path.join(packagePath, 'updater', 'updater.exe');
const msixCorePath = 'C:\\Program Files\\msixmgr\\msixmgr.exe';

let interval: NodeJS.Timer;

async function checkForUpdate() {
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
  if (os.release().startsWith('10.')) {
    execFile(win10UpdaterPath);
  }
  else if (fs.existsSync(msixCorePath)) {
    spawn(msixCorePath, ['-AddPackage', updateConfig.packageUrl, '-quietUX']);
  }
  else {
    console.log('无法更新');
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
