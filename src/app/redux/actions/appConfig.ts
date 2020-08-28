import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

import { invoke } from '@redux/middleware/ipcMiddleware';
import { RootState } from '@redux/reducers';
import { IpcChannels } from '@src/enums/IpcChannels';
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
export const init = createAsyncThunk<AppConfig>('APP_CONFIG/INIT', async (_, { dispatch }) => {
  const result = await dispatch(invoke({ channel: IpcChannels.CONFIG_GET }));
  const value = unwrapResult(result);
  return value as AppConfig;
});

/**
 * Overwrite the existing AppConfig state.
 * @param payload
 */
export const set = createAsyncThunk<AppConfig, AppConfig>(
  'APP_CONFIG/SET',
  async (config, { dispatch }) => {
    const result = await dispatch(invoke({ channel: IpcChannels.CONFIG_SET, args: [config] }));
    const value = unwrapResult(result);
    return value as AppConfig;
  },
);

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
