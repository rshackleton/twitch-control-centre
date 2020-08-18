import { Method } from 'axios';
import { ipcMain } from 'electron';

import { IPCEvents } from '../../enums/IPCEvents';

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
    ipcMain.handle(IPCEvents.LIFX_CALL_API, async (_, args: LifxHandlerArgs) => {
      return this.service.call(args);
    });
  }
}

export default LifxHandler;
