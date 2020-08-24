import { ipcMain } from 'electron';

import { IPCEvents } from '../../enums/IPCEvents';

import ConfigurationService from '../services/ConfigurationService';

class ConfigHandler {
  private config: ConfigurationService;

  constructor() {
    this.config = new ConfigurationService();
  }

  register(): void {
    ipcMain.handle(IPCEvents.CONFIG_GET, async () => {
      return this.config.get();
    });

    ipcMain.handle(IPCEvents.CONFIG_SET, async (_, value) => {
      return this.config.set(value);
    });
  }
}

export default ConfigHandler;
