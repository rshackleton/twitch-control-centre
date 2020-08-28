import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as actions from '@redux/actions';
import { RootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { Credentials } from '@src/types';

import { CredentialsContextValue, CredentialsProviderProps } from './CredentialsProvider.types';

/**
 * Application config context.
 */
const CredentialsContext = React.createContext<CredentialsContextValue | null>(null);

/**
 * Retrieve Credentials context value.
 */
export const useCredentials = (): CredentialsContextValue | null => useContext(CredentialsContext);

/**
 * Credentials context provider.
 */
const CredentialsProvider: React.FC<CredentialsProviderProps> = ({ children }) => {
  const credentials = useSelector<RootState, Credentials>((state) => state.credentials);

  const dispatch = useAppDispatch();

  // Initialise store on mount.
  useEffect(() => {
    dispatch(actions.credentials.init());
  }, []);

  // Wait for config to be available before rendering app.
  if (!credentials) {
    return null;
  }

  return (
    <CredentialsContext.Provider value={{ getKey, setKey }}>{children}</CredentialsContext.Provider>
  );

  function getKey<Key extends keyof Credentials>(key: Key): Credentials[Key] {
    return credentials[key];
  }

  async function setKey<Key extends keyof Credentials>(
    key: Key,
    value?: Credentials[Key],
  ): Promise<void> {
    await dispatch(actions.credentials.set({ name: key, value: value }));
  }
};

export default CredentialsProvider;
