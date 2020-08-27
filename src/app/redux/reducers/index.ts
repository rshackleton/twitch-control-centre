import { combineReducers } from '@reduxjs/toolkit';

import appConfigReducer from './appConfigReducer';
import twitchReducer from './twitchReducer';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  twitch: twitchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
