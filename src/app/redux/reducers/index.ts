import { combineReducers } from '@reduxjs/toolkit';

import appConfigReducer from './appConfigReducer';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
