import { ipcMain } from 'electron';

import { IpcChannels } from '../../enums/IpcChannels';

import ConfigurationService from '../services/ConfigurationService';

class ConfigHandler {
  private config: ConfigurationService;

  constructor() {
    this.config = new ConfigurationService();
  }

  register(): void {
    ipcMain.handle(IpcChannels.CONFIG_GET, async () => {
      return this.config.get();
    });

    ipcMain.handle(IpcChannels.CONFIG_SET, async (_, value) => {
      return this.config.set(value);
    });
  }
}

export default ConfigHandler;
