import { createReducer } from '@reduxjs/toolkit';

import * as actions from '@redux/actions';
import { AppConfig } from '@src/types';

const appConfigReducer = createReducer<AppConfig>({}, (builder) => {
  builder
    .addCase(actions.appConfig.init.fulfilled, (_, action) => {
      return action.payload;
    })
    .addCase(actions.appConfig.set.fulfilled, (_, action) => {
      return action.payload;
    })
    .addCase(actions.appConfig.setKey.fulfilled, (_, action) => {
      return action.payload;
    });
});

export default appConfigReducer;
