import { ipcMain, BrowserWindow } from 'electron';

import { CredentialKey } from '../../enums/Credentials';
import { IpcChannels } from '../../enums/IpcChannels';

import AuthWindow from '../AuthWindow';
import CredentialsManager from '../CredentialsManager';

class AuthHandler {
  private credentials: CredentialsManager;

  constructor() {
    this.credentials = new CredentialsManager();
  }

  register(parentWindow: BrowserWindow): void {
    // Add listener to allow triggering of Twitch OAuth flow.
    ipcMain.handle(IpcChannels.TWITCH_AUTH_START, async () => {
      try {
        await new AuthWindow(parentWindow).showWindow();
        return true;
      } catch {
        return false;
      }
    });

    // Add listener to allow triggering of Twitch OAuth flow.
    ipcMain.handle(IpcChannels.TWITCH_AUTH_CLEAR, async () => {
      this.credentials.setPassword(CredentialKey.TWITCH_ACCESS_TOKEN, '');
      this.credentials.setPassword(CredentialKey.TWITCH_REFRESH_TOKEN, '');
    });
  }
}

export default AuthHandler;
