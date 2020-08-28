import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

import { invoke } from '@redux/middleware/ipcMiddleware';
import { CredentialKey } from '@src/enums/Credentials';
import { IpcChannels } from '@src/enums/IpcChannels';
import { Credentials } from '@src/types';

type SetParameter = { name: CredentialKey; value: Credentials[CredentialKey] };
type SetResult = { name: CredentialKey; value: Credentials[CredentialKey] };

/**
 * Initialise the credentials state.
 */
export const init = createAsyncThunk<Credentials>('CREDENTIALS/INIT', async (_, { dispatch }) => {
  const result = await dispatch(invoke({ channel: IpcChannels.CREDENTIALS_GET }));
  const value = unwrapResult(result);
  return value as Credentials;
});

/**
 * Set the specified credential value.
 */
export const set = createAsyncThunk<SetResult, SetParameter>(
  'CREDENTIALS/SET',
  async ({ name, value }, { dispatch }) => {
    const invokeAction = invoke({
      channel: IpcChannels.CREDENTIALS_SET,
      args: [name, value],
    });

    await dispatch(invokeAction);

    return { name, value };
  },
);
