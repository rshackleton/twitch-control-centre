import { ReactNode } from 'react';

import { AppConfig } from '@src/types';

export interface AppConfigContextValue {
  /**
   * Get the configuration value.
   * @param key The configuration key
   */
  getKey<Key extends keyof AppConfig>(key: Key): AppConfig[Key];

  /**
   * Set the configuration value.
   * @param key The configuration key
   */
  setKey<Key extends keyof AppConfig>(key: Key, value?: AppConfig[Key]): void;
}

export interface AppConfigProviderProps {
  children: ReactNode;
}
