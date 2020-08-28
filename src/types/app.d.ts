import { CredentialKey } from '@src/enums/Credentials';

import { Lifx } from './lifx';

export type AppConfig = {
  lifxStates?: Record<string, Lifx.LightState>;
  selectedLightId?: string;
};

export type Credentials = {
  [CredentialKey.LIFX_KEY]?: string;
  [CredentialKey.TWITCH_ACCESS_TOKEN]?: string;
  [CredentialKey.TWITCH_REFRESH_TOKEN]?: string;
};
