import { createReducer } from '@reduxjs/toolkit';

import * as actions from '@redux/actions';
import { TwitchRedemptionData } from '@src/electron/ipc/TwitchHandler';

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
    .addCase(actions.twitch.redemption, (state, action) => {
      state.log.unshift(toLog(action.payload));
      state.redemption = action.payload;
    })
    .addCase(actions.twitch.start, (state) => {
      state.isEnabled = true;
    })
    .addCase(actions.twitch.stop, (state) => {
      state.isEnabled = false;
    })
    .addCase(actions.twitch.toggle, (state, action) => {
      state.isEnabled = action.payload;
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
