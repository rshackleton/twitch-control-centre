import { ipcRenderer } from 'electron';
import { IPCEvents } from '../enums/IPCEvents';

import { Credentials } from '../enums/Credentials';

class CredentialsManager {
  getLifxKey(): Promise<string> {
    return this.getPassword(Credentials.LIFX_KEY);
  }
  setLifxKey(value: string): Promise<void> {
    return this.setPassword(Credentials.LIFX_KEY, value);
  }
  getTwitchPubSubKey(): Promise<string> {
    return this.getPassword(Credentials.TWITCH_ACCESS_TOKEN);
  }
  setTwitchPubSubKey(value: string): Promise<void> {
    return this.setPassword(Credentials.TWITCH_ACCESS_TOKEN, value);
  }

  private async getPassword(account: string): Promise<string> {
    const result = await ipcRenderer.invoke(IPCEvents.GET_CREDENTIAL, { account });
    return result as string;
  }

  private async setPassword(account: string, value: string | null | undefined): Promise<void> {
    await ipcRenderer.invoke(IPCEvents.SET_CREDENTIAL, { account, value });
  }
}

export default CredentialsManager;