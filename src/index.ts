import { app, ipcMain, BrowserWindow } from 'electron';

import CredentialsManager from './main/CredentialsManager';
import TwitchApiClient from './main/TwitchPubSubClient';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const credentials = new CredentialsManager();

const twitch = new TwitchApiClient();
twitch.initialise();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Add listener to allow retrievable of credentials.
ipcMain.handle('getPassword', async (_, args) => {
  return credentials.getPassword(args.account);
});

// Add listener to allow updating of credentials.
ipcMain.handle('setPassword', async (_, args) => {
  await credentials.setPassword(args.account, args.value);
});
