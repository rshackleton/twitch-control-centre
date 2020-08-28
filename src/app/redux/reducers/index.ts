import { combineReducers } from '@reduxjs/toolkit';

import appConfigReducer from './appConfigReducer';
import credentialsReducer from './credentialsReducer';
import twitchReducer from './twitchReducer';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  credentials: credentialsReducer,
  twitch: twitchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
