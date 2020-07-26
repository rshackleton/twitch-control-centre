import { remote } from 'electron';

const keytar = remote.require('keytar');

const SERVICE_NAME = 'rs.twitchcc';

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

  private getPassword(account: string): Promise<string> {
    return keytar.getPassword(SERVICE_NAME, account);
  }

  private setPassword(account: string, value: string | null | undefined): Promise<void> {
    if (!value?.length) {
      return keytar.deletePassword(SERVICE_NAME, account);
    }

    return keytar.setPassword(SERVICE_NAME, account, value);
  }
}

export default CredentialsManager;
