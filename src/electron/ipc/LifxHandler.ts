import { Method } from 'axios';
import { ipcMain } from 'electron';

import { IpcChannels } from '../../enums/IpcChannels';

import LifxService from '../services/LifxService';

export interface LifxHandlerArgs {
  data?: Record<string, unknown>;
  method?: Method;
  url: string;
}

class LifxHandler {
  private service: LifxService;

  constructor() {
    this.service = new LifxService();
  }

  register(): void {
    ipcMain.handle(IpcChannels.LIFX_CALL_API, async (_, args: LifxHandlerArgs) => {
      return this.service.call(args);
    });
  }
}

export default LifxHandler;
