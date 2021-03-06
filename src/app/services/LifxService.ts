import { ipcRenderer } from 'electron';

import { LifxHandlerArgs } from '@src/electron/ipc/LifxHandler';
import { IpcChannels } from '@src/enums/IpcChannels';
import { Light } from '@src/types';

export default class LifxService {
  async getLights(): Promise<Light[]> {
    const args: LifxHandlerArgs = {
      method: 'GET',
      url: 'https://api.lifx.com/v1/lights/all',
    };

    const result = await ipcRenderer.invoke(IpcChannels.LIFX_CALL_API, args);

    return result;
  }

  async setLightState(selector: string, options: Record<string, unknown>): Promise<void> {
    const args: LifxHandlerArgs = {
      data: options,
      method: 'PUT',
      url: `https://api.lifx.com/v1/lights/${selector}/state`,
    };

    const result = await ipcRenderer.invoke(IpcChannels.LIFX_CALL_API, args);

    return result;
  }
}
