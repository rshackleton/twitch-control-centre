import { createReducer } from '@reduxjs/toolkit';

import * as actions from '@redux/actions';
import { Light } from '@src/types';

type LifxState = {
  lights: Light[];
};

const initialState = { lights: [] };

const lifxReducer = createReducer<LifxState>(initialState, (builder) => {
  builder
    .addCase(actions.lifx.getLights.fulfilled, (state, action) => {
      state.lights = action.payload;
      state.lights.sort((a, b) => {
        const aName = getLightName(a);
        const bName = getLightName(b);

        if (aName > bName) {
          return 1;
        }

        if (bName > aName) {
          return -1;
        }

        return 0;
      });
    })
    .addCase(actions.lifx.setLightState.fulfilled, (state, action) => {
      state.lights = action.payload;
      state.lights.sort((a, b) => {
        const aName = getLightName(a);
        const bName = getLightName(b);

        if (aName > bName) {
          return 1;
        }

        if (bName > aName) {
          return -1;
        }

        return 0;
      });
    });
});

export default lifxReducer;

export function getLightName(light: Light): string {
  const name = `${light.label.trim()} (${light.group?.name.trim()})`;
  return name;
}
