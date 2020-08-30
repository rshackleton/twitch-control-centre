import { combineReducers } from '@reduxjs/toolkit';

import appConfigReducer from './appConfigReducer';
import credentialsReducer from './credentialsReducer';
import lifxReducer from './lifxReducer';
import twitchReducer from './twitchReducer';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  credentials: credentialsReducer,
  lifx: lifxReducer,
  twitch: twitchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
