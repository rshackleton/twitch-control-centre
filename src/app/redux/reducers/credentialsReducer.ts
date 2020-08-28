import { createReducer } from '@reduxjs/toolkit';

import * as actions from '@redux/actions';
import { Credentials } from '@src/types';

const initialState: Credentials = {};

const credentialsReducer = createReducer<Credentials>(initialState, (builder) => {
  builder
    .addCase(actions.credentials.init.fulfilled, (_, action) => {
      return action.payload;
    })
    .addCase(actions.credentials.set.fulfilled, (state, action) => {
      state[action.payload.name] = action.payload.value;
    });
});

export default credentialsReducer;
