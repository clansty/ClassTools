export {};

declare global {
  interface Window {
    // Expose some Api through preload script
    fs: typeof import('fs');
    path: typeof import('path');
    exePath: string;
    ipcRenderer: import('electron').IpcRenderer;
    COMMIT_HASH: string;
  }
}
