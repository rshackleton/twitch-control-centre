import {
  Middleware,
  PayloadAction,
  createAction,
  Action,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';

import { RootState } from '@redux/reducers';
import { IPCEvents } from '@src/enums/IPCEvents';

/**
 * The IPC configuration key.
 */
export const IpcKey = Symbol('IPC');

/**
 * An action containing an IpcActionPayload.
 */
export type IpcAction = PayloadAction<IpcActionPayload>;

/**
 * An action payload containing the Ipc configuration.
 */
export interface IpcActionPayload {
  [IpcKey]: {
    channel: IPCEvents;
  };
}

/**
 * An action payload containing the Ipc configuration.
 */
export interface IpcEventPayload extends IpcActionPayload {
  args: unknown[];
}

/**
 * A middleware to handle IpcRenderer communication.
 */
export type IpcMiddlewareType = Middleware<{}, RootState>;

/**
 * A listener for an Ipc channel.
 */
type IpcListener = (event: Electron.IpcRendererEvent, ...args: unknown[]) => void;

/**
 * Register an Ipc channel listener.
 */
export const on = createAction<IpcActionPayload, 'IPC/ON'>('IPC/ON');

/**
 * Remove an Ipc channel listener.
 */
export const off = createAction<IpcActionPayload, 'IPC/OFF'>('IPC/OFF');

/**
 * Trigger a channel event.
 */
export const channelEvent = createAction<IpcEventPayload, 'IPC/EVENT'>('IPC/EVENT');

/**
 * Remove an Ipc channel listener.
 */
export const invoke = createAsyncThunk<unknown, IPCEvents>('IPC/INVOKE', async (channel) => {
  const returnValue = (await ipcRenderer.invoke(channel)) as unknown;
  return returnValue;
});

/**
 * A map of channels and listeners.
 */
const ipcListeners: Partial<Record<IPCEvents, IpcListener>> = {};

/**
 * A middleware to handle IpcRenderer communication.
 * @param store
 */
const ipcMiddleware: IpcMiddlewareType = (store) => (next) => (action): Action => {
  if (on.match(action)) {
    addListener(action);
    return next(action);
  }

  if (off.match(action)) {
    removeListener(action);
    return next(action);
  }

  return next(action);

  /** Register new listener. */
  function addListener(action: ReturnType<typeof on>): void {
    const config = action.payload[IpcKey];

    let listener = ipcListeners[config.channel];

    if (!listener) {
      // Otherwise, create new listener.
      listener = (_, ...args): void => {
        store.dispatch(
          channelEvent({
            [IpcKey]: {
              channel: config.channel,
            },
            args: args,
          }),
        );
      };
    }

    // Register listener.
    ipcRenderer.on(config.channel, listener);

    // Add to listener cache.
    ipcListeners[config.channel] = listener;
  }

  /** Remove registered listener. */
  function removeListener(action: ReturnType<typeof off>): void {
    const config = action.payload[IpcKey];

    const listener = ipcListeners[config.channel];

    if (listener) {
      ipcRenderer.off(config.channel, listener);
    }
  }
};

export default ipcMiddleware;
