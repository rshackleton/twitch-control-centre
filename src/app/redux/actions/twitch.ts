import { createAction } from '@reduxjs/toolkit';

import { TwitchRedemptionData } from '@src/electron/ipc/TwitchHandler';

/**
 * Update the redemption data.
 */
export const redemption = createAction<TwitchRedemptionData, 'TWITCH/REDEMPTION'>(
  'TWITCH/REDEMPTION',
);

/**
 * Start the Twitch redemption listener.
 */
export const start = createAction('TWITCH/START');

/**
 * Stop the Twitch redemption listener.
 */
export const stop = createAction('TWITCH/STOP');

/**
 * Set the Twitch redemption listener state.
 */
export const toggle = createAction<boolean, 'TWITCH/TOGGLE'>('TWITCH/TOGGLE');
