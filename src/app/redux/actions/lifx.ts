import { createAsyncThunk } from '@reduxjs/toolkit';

import LifxService from '@services/LifxService';
import { Lifx } from '@src/types';

type SetLightStateArgs = {
  selector: string;
  lightState: Record<string, unknown>;
};

const service = new LifxService();

/**
 * Retrieve the light data.
 */
export const getLights = createAsyncThunk('LIFX/GET_LIGHTS', () => {
  return service.getLights();
});

/**
 * Set the state of the light(s) matched by the selector.
 */
export const setLightState = createAsyncThunk<Lifx.Light[], SetLightStateArgs>(
  'LIFX/SET_STATE',
  async ({ selector, lightState }) => {
    await service.setLightState(selector, lightState);
    return service.getLights();
  },
);
