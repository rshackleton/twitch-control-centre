import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { ipcMain } from 'electron';

import { Credentials } from '../../enums/Credentials';
import { IPCEvents } from '../../enums/IPCEvents';

import CredentialsManager from '../CredentialsManager';

export interface LifxHandlerArgs {
  data?: Record<string, unknown>;
  method?: Method;
  url: string;
}

class LifxHandler {
  private credentials: CredentialsManager;

  constructor() {
    this.credentials = new CredentialsManager();
  }

  register(): void {
    ipcMain.handle(IPCEvents.LIFX_CALL_API, async (_, args: LifxHandlerArgs) => {
      const key = await this.credentials.getPassword(Credentials.LIFX_KEY);

      const options: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        data: args.data,
        method: args.method ?? 'GET',
        url: args.url,
      };

      const response = (await axios(options)) as AxiosResponse;

      if (response.status !== 200) {
        return [response.status, response.statusText];
      }

      return response.data;
    });
  }
}

export default LifxHandler;
