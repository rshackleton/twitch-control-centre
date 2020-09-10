import { dialog, ipcMain } from 'electron';

import { IpcChannels } from '../../enums/IpcChannels';

class FileHandler {
  register(): void {
    ipcMain.handle(IpcChannels.OPEN_DIALOG, async (_, options) => {
      const value = await dialog.showOpenDialog({
        ...options,
        properties: ['openFile'],
      });

      return value;
    });
  }
}

export default FileHandler;
