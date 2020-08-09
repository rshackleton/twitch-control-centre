import keytar from 'keytar';

const SERVICE_NAME = 'rs.twitchcc';

class CredentialsManager {
  async getPassword(account: string): Promise<string> {
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
