import { ReactNode } from 'react';

import { Credentials } from '@src/types';

export interface CredentialsContextValue {
  /**
   * Get the credential value.
   * @param key The credential key
   */
  getKey<Key extends keyof Credentials>(key: Key): Credentials[Key];

  /**
   * Set the credential value.
   * @param key The credential key
   */
  setKey<Key extends keyof Credentials>(key: Key, value?: Credentials[Key]): Promise<void>;
}

export interface CredentialsProviderProps {
  children: ReactNode;
}
