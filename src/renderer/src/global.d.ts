export {};

declare global {
  interface Window {
    // Expose some Api through preload script
    fs: typeof import('fs');
    path: typeof import('path');
    exePath: string;
    isAppx: string;
    ipcRenderer: import('electron').IpcRenderer;
    env: NodeJS.ProcessEnv;
    COMMIT_HASH: string;
    BUILD_DATE: number;
  }
}
