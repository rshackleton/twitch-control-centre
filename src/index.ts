import { app, BrowserWindow } from 'electron';

import AuthHandler from './electron/ipc/AuthHandler';
import CredentialsHandler from './electron/ipc/CredentialsHandler';

import MainWindow from './electron/MainWindow';
import LifxHandler from './electron/ipc/LifxHandler';

const authHandler = new AuthHandler();
const credentialsHandler = new CredentialsHandler();
const lifxHandler = new LifxHandler();

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
  credentialsHandler.register();
  lifxHandler.register();
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
