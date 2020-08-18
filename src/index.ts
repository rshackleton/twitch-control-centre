import { app, BrowserWindow } from 'electron';

import AuthHandler from './electron/ipc/AuthHandler';
import ConfigHandler from './electron/ipc/ConfigHandler';
import CredentialsHandler from './electron/ipc/CredentialsHandler';
import LifxHandler from './electron/ipc/LifxHandler';
import TwitchHandler from './electron/ipc/TwitchHandler';

import MainWindow from './electron/MainWindow';

const authHandler = new AuthHandler();
const configHandler = new ConfigHandler();
const credentialsHandler = new CredentialsHandler();
const lifxHandler = new LifxHandler();
const twitchHandler = new TwitchHandler();

const mainWindow = new MainWindow();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  await mainWindow.showWindow();

  authHandler.register(mainWindow.window);
  configHandler.register();
  credentialsHandler.register();
  lifxHandler.register();
  twitchHandler.register(mainWindow.window);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    await mainWindow.showWindow();
  }
});
