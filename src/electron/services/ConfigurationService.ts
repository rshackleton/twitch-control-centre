import Store from 'electron-store';

import { AppConfig } from '../../types/app';

export default class ConfigurationService {
  private store: Store<AppConfig>;

  constructor() {
    this.store = new Store<AppConfig>({
      name: 'lifx',
    });

    console.log('Config located at: ', this.store.path);
  }

  get(): AppConfig {
    return this.store.store;
  }

  set(value: AppConfig): void {
    this.store.store = value;
  }
}
