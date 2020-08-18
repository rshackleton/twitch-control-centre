import { ipcMain } from 'electron';

import { IPCEvents } from '../../enums/IPCEvents';

import ConfigurationService from '../services/ConfigurationService';

class ConfigHandler {
  private config: ConfigurationService;

  constructor() {
    this.config = new ConfigurationService();
  }

  register(): void {
    ipcMain.handle(IPCEvents.CONFIG_GET_KEY, async (_, args) => {
      return this.config.get(args.key);
    });

    ipcMain.handle(IPCEvents.CONFIG_SET_KEY, async (_, args) => {
      return this.config.set(args.key, args.value);
    });

    ipcMain.handle(IPCEvents.CONFIG_DELETE_KEY, async (_, args) => {
      return this.config.remove(args.key);
    });

    ipcMain.handle(IPCEvents.CONFIG_GET_LIFX_STATES, async () => {
      return this.config.getStates();
    });

    ipcMain.handle(IPCEvents.CONFIG_GET_LIFX_STATE, async (_, args) => {
      return this.config.getStateForReward(args.rewardId);
    });

    ipcMain.handle(IPCEvents.CONFIG_SET_LIFX_STATE, async (_, args) => {
      return this.config.setStateForReward(args.rewardId, args.state);
    });

    ipcMain.handle(IPCEvents.CONFIG_DELETE_LIFX_STATE, async (_, args) => {
      return this.config.removeStateForReward(args.rewardId);
    });
  }
}

export default ConfigHandler;
