import { ipcRenderer } from 'electron';

import { IPCEvents } from '../../enums/IPCEvents';

type IpcCallback = (event: Electron.IpcRendererEvent, ...args: any[]) => void;

export default class TwitchService {
  async start(callback: IpcCallback): Promise<void> {
    await ipcRenderer.invoke(IPCEvents.TWITCH_PUBSUB_START);
    ipcRenderer.on(IPCEvents.TWITCH_PUBSUB_EVENT, callback);
  }

  async stop(callback: IpcCallback): Promise<void> {
    await ipcRenderer.invoke(IPCEvents.TWITCH_PUBSUB_STOP);
    ipcRenderer.off(IPCEvents.TWITCH_PUBSUB_EVENT, callback);
  }
}
