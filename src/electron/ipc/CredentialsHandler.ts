import { ipcMain } from 'electron';

import { IpcChannels } from '../../enums/IpcChannels';

import CredentialsManager from '../CredentialsManager';

class CredentialsHandler {
  private credentials: CredentialsManager;

  constructor() {
    this.credentials = new CredentialsManager();
  }

  register(): void {
    // Add listener to allow retrievable of credentials.
    ipcMain.handle(IpcChannels.CREDENTIALS_GET, async () => {
      return this.credentials.getAll();
    });

    // Add listener to allow updating of credentials.
    ipcMain.handle(IpcChannels.CREDENTIALS_SET, async (_, account, value) => {
      await this.credentials.setPassword(account, value);
    });
  }
}

export default CredentialsHandler;
