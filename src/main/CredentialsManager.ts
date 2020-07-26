import { ipcMain } from 'electron';
import keytar from 'keytar';

const SERVICE_NAME = 'rs.twitchcc';

type IpcMainEventHandlerAsync<TArg, TResult> = (
  event: Electron.IpcMainInvokeEvent,
  argument: TArg,
) => Promise<TResult>;

interface GetPasswordArgs {
  account: string;
}

interface SetPasswordArgs {
  account: string;
  value?: string | null;
}

class CredentialsManager {
  initialise(): void {
    ipcMain.handle('getPassword', this.getPassword);
    ipcMain.handle('setPassword', this.setPassword);
  }

  private getPassword: IpcMainEventHandlerAsync<GetPasswordArgs, string> = async (_, args) => {
    return keytar.getPassword(SERVICE_NAME, args.account);
  };

  private setPassword: IpcMainEventHandlerAsync<SetPasswordArgs, void> = async (_, args) => {
    if (!args.value?.length) {
      await keytar.deletePassword(SERVICE_NAME, args.account);
      return;
    }

    await keytar.setPassword(SERVICE_NAME, args.account, args.value);
  };
}

export default CredentialsManager;
