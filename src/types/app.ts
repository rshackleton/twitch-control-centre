import { CredentialKey } from '../enums/Credentials';

import { LightState } from './lifx';

export enum AppActionType {
  LIFX = 'LIFX',
}

export enum AppTriggerType {
  REWARD = 'REWARD',
}

export type AppActionDataLifx = {
  lightId: string;
  lightState: LightState;
};

export type AppActionDataTypeMap = {
  [AppActionType.LIFX]: AppActionDataLifx;
};

export type AppTriggerDataReward = {
  rewardId: string;
};

export type AppTriggerDataTypeMap = {
  [AppTriggerType.REWARD]: AppTriggerDataReward;
};

export type AppAction = {
  actionData: Record<string, unknown>;
  actionType: AppActionType;
  name: string;
  triggerData: Record<string, unknown>;
  triggerType: AppTriggerType;
};

export type AppConfig = {
  actions: Record<string, AppAction>;
  lifxStates: Record<string, LightState>;
  /** A set containing a map of ID to Name. */
  rewards: Record<string, string>;
  selectedLightId: string;
};

export type Credentials = {
  [CredentialKey.LIFX_KEY]?: string;
  [CredentialKey.TWITCH_ACCESS_TOKEN]?: string;
  [CredentialKey.TWITCH_REFRESH_TOKEN]?: string;
};
