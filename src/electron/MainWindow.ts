import { BrowserWindow } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

class MainWindow {
  window: BrowserWindow;

  constructor() {
    // Create the browser window.
    this.window = new BrowserWindow({
      height: 600,
      show: false,
      width: 800,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
      },
    });
  }

  async showWindow(): Promise<void> {
    // and load the index.html of the app.
    await this.window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    if (process.env.NODE_ENV !== 'production') {
      this.window.webContents.openDevTools();
    }

    this.window.show();
  }
}

export default MainWindow;
