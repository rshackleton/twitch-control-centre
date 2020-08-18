import Store from 'electron-store';

import { Lifx } from '../../lifx';

interface AppConfig {
  lifxStates: Record<string, Lifx.LightState>;
}

export default class ConfigurationService {
  private store: Store<AppConfig>;

  constructor() {
    this.store = new Store<AppConfig>({
      name: 'lifx',
    });

    console.log('Config located at: ', this.store.path);
  }

  getStates(): Record<string, Lifx.LightState> {
    const savedStates = this.store.get('lifxStates') ?? {};
    return savedStates;
  }

  getStateForReward(rewardId: string): Lifx.LightState | null {
    const savedStates = this.store.get('lifxStates') ?? {};

    if (!savedStates[rewardId]) {
      return null;
    }

    return savedStates[rewardId];
  }

  setStateForReward(rewardId: string, state: Lifx.LightState): void {
    const savedStates = this.store.get('lifxStates') ?? {};
    savedStates[rewardId] = state;
    this.store.set('lifxStates', savedStates);
  }

  removeStateForReward(rewardId: string): void {
    const savedStates = this.store.get('lifxStates') ?? {};
    delete savedStates[rewardId];
    this.store.set('lifxStates', savedStates);
  }
}
