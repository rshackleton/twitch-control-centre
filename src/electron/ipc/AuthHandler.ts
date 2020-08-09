import { ipcMain, BrowserWindow } from 'electron';

import { Credentials } from '../../enums/Credentials';
import { IPCEvents } from '../../enums/IPCEvents';

import AuthWindow from '../AuthWindow';
import CredentialsManager from '../CredentialsManager';

class AuthHandler {
  private credentials: CredentialsManager;

  constructor() {
    this.credentials = new CredentialsManager();
  }

  register(parentWindow: BrowserWindow): void {
    // Add listener to allow triggering of Twitch OAuth flow.
    ipcMain.handle(IPCEvents.TWITCH_AUTH_START, async () => {
      try {
        await new AuthWindow(parentWindow).showWindow();
        return true;
      } catch {
        return false;
      }
    });

    // Add listener to allow triggering of Twitch OAuth flow.
    ipcMain.handle(IPCEvents.TWITCH_AUTH_CLEAR, async () => {
      this.credentials.setPassword(Credentials.TWITCH_ACCESS_TOKEN, '');
      this.credentials.setPassword(Credentials.TWITCH_REFRESH_TOKEN, '');
    });
  }
}

export default AuthHandler;
