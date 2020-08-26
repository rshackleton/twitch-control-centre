import { ipcRenderer } from 'electron';
import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

import { RootState } from '@redux/reducers';
import { IPCEvents } from '@src/enums/IPCEvents';
import { AppConfig } from '@src/types';

type AppConfigKey = keyof AppConfig;

export interface SetKeyPayload {
  key: AppConfigKey;
  value: AppConfig[AppConfigKey];
}

interface AppConfigThunkApiConfig {
  state: RootState;
}

/**
 * Initialise the AppConfig state.
 */
export const init = createAsyncThunk<AppConfig>('APP_CONFIG/INIT', async () => {
  const initialConfig = (await ipcRenderer.invoke(IPCEvents.CONFIG_GET)) as AppConfig;
  return initialConfig;
});

/**
 * Overwrite the existing AppConfig state.
 * @param payload
 */
export const set = createAsyncThunk<AppConfig, AppConfig>('APP_CONFIG/SET', async (config) => {
  return (await ipcRenderer.invoke(IPCEvents.CONFIG_SET, config)) as AppConfig;
});

/**
 * Update the specified AppConfig value.
 * @param payload
 */
export const setKey = createAsyncThunk<AppConfig, SetKeyPayload, AppConfigThunkApiConfig>(
  'APP_CONFIG/SET_KEY',
  async ({ key, value }, { dispatch, getState }) => {
    const config = getState();

    const result = await dispatch(
      set({
        ...config.appConfig,
        [key]: value,
      }),
    );

    return unwrapResult(result);
  },
);
