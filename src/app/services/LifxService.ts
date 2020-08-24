import { ipcRenderer } from 'electron';

import { LifxHandlerArgs } from '../../electron/ipc/LifxHandler';
import { IPCEvents } from '../../enums/IPCEvents';
import { Lifx } from '../../types/lifx';

export default class LifxService {
  async getLights(): Promise<Lifx.Light[]> {
    const args: LifxHandlerArgs = {
      method: 'GET',
      url: 'https://api.lifx.com/v1/lights/all',
    };

    const result = await ipcRenderer.invoke(IPCEvents.LIFX_CALL_API, args);

    return result;
  }

  async setLightState(selector: string, options: Record<string, unknown>): Promise<void> {
    const args: LifxHandlerArgs = {
      data: options,
      method: 'PUT',
      url: `https://api.lifx.com/v1/lights/${selector}/state`,
    };

    const result = await ipcRenderer.invoke(IPCEvents.LIFX_CALL_API, args);

    return result;
  }
}
