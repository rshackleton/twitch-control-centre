import { createAsyncThunk } from '@reduxjs/toolkit';

import { IpcKey, on, off, invoke } from '@redux/middleware/ipcMiddleware';
import { IpcChannels } from '@src/enums/IpcChannels';

/**
 * Start the Twitch redemption listener.
 */
export const start = createAsyncThunk('TWITCH/START', async (_, { dispatch }) => {
  await dispatch(invoke({ channel: IpcChannels.TWITCH_PUBSUB_START }));

  return dispatch(
    on({
      [IpcKey]: {
        channel: IpcChannels.TWITCH_PUBSUB_EVENT,
      },
    }),
  );
});

/**
 * Stop the Twitch redemption listener.
 */
export const stop = createAsyncThunk('TWITCH/STOP', async (_, { dispatch }) => {
  await dispatch(invoke({ channel: IpcChannels.TWITCH_PUBSUB_STOP }));

  return dispatch(
    off({
      [IpcKey]: {
        channel: IpcChannels.TWITCH_PUBSUB_EVENT,
      },
    }),
  );
});
