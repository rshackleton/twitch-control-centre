import keytar from 'keytar';

import { CredentialKey } from '../enums/Credentials';
import { Credentials } from '../types';

const SERVICE_NAME = 'rs.twitchcc';

const CLIENT_SAFE = [CredentialKey.LIFX_KEY, CredentialKey.TWITCH_ACCESS_TOKEN];

class CredentialsManager {
  async getAll(): Promise<Credentials> {
    const credentials = await keytar.findCredentials(SERVICE_NAME);

    const obj: Credentials = credentials
      .filter((entry) => CLIENT_SAFE.includes(entry.account as CredentialKey))
      .reduce((prev, curr) => ({ ...prev, [curr.account]: curr.password }), {});

    return obj;
  }

  async getPassword(account: string): Promise<string | null> {
    return keytar.getPassword(SERVICE_NAME, account);
  }

  async setPassword(account: string, value: string | null): Promise<void> {
    if (!value?.length) {
      await keytar.deletePassword(SERVICE_NAME, account);
      return;
    }

    await keytar.setPassword(SERVICE_NAME, account, value);
  }
}

export default CredentialsManager;
