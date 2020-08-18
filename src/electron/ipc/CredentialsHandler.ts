import { ipcMain } from 'electron';

import { IPCEvents } from '../../enums/IPCEvents';

import CredentialsManager from '../CredentialsManager';

class CredentialsHandler {
  private credentials: CredentialsManager;

  constructor() {
    this.credentials = new CredentialsManager();
  }

  register(): void {
    // Add listener to allow retrievable of credentials.
    ipcMain.handle(IPCEvents.CREDENTIALS_GET, async (_, args) => {
      return this.credentials.getPassword(args.account);
    });

    // Add listener to allow updating of credentials.
    ipcMain.handle(IPCEvents.CREDENTIALS_SET, async (_, args) => {
      await this.credentials.setPassword(args.account, args.value);
    });
  }
}

export default CredentialsHandler;
