import { createReducer } from '@reduxjs/toolkit';

import * as actions from '@redux/actions';
import { TwitchRedemptionData } from '@src/electron/ipc/TwitchHandler';
import { channelEvent } from '@redux/middleware/ipcMiddleware';

export interface TwitchState {
  isEnabled: boolean;
  log: string[];
  redemption: TwitchRedemptionData | undefined;
}

const initialState: TwitchState = {
  isEnabled: false,
  log: [],
  redemption: undefined,
};

const twitchReducer = createReducer<TwitchState>(initialState, (builder) => {
  builder
    .addCase(actions.twitch.start.fulfilled, (state) => {
      state.isEnabled = true;
    })
    .addCase(actions.twitch.stop.fulfilled, (state) => {
      state.isEnabled = false;
    })
    .addCase(channelEvent, (state, action) => {
      const redemption = action.payload.args[0] as TwitchRedemptionData;

      state.log.unshift(toLog(redemption));
      state.redemption = redemption;
    });
});

export default twitchReducer;

/**
 * Generate new log entry from redemption.
 * @param redemption
 */
function toLog(redemption: TwitchRedemptionData): string {
  const ts = new Date().toISOString();
  return `${ts}: ${redemption.id} : ${redemption.rewardName} - Redeemed by ${redemption.userId} : ${redemption.userDisplayName}`;
}
