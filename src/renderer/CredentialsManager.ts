import { ipcRenderer } from 'electron';

class CredentialsManager {
  getTwitchPubSubKey(): Promise<string> {
    return this.getPassword('twitch-pubsub-key');
  }
  setTwitchPubSubKey(value: string): Promise<void> {
    return this.setPassword('twitch-pubsub-key', value);
  }
  getLifxKey(): Promise<string> {
    return this.getPassword('lifx-key');
  }
  setLifxKey(value: string): Promise<void> {
    return this.setPassword('lifx-key', value);
  }

  private async getPassword(account: string): Promise<string> {
    const result = await ipcRenderer.invoke('getPassword', { account });
    return result as string;
  }

  private async setPassword(account: string, value: string | null | undefined): Promise<void> {
    await ipcRenderer.invoke('setPassword', { account, value });
  }
}

export default CredentialsManager;
