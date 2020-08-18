import { BrowserWindow } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

class MainWindow {
  window: BrowserWindow;

  async showWindow(): Promise<void> {
    // Create the browser window.
    this.window = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
      },
    });

    // and load the index.html of the app.
    this.window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    // this.window.webContents.openDevTools();
  }
}

export default MainWindow;
