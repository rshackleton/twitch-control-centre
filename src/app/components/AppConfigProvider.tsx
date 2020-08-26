import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as actions from '@redux/actions';
import { RootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { AppConfig } from '@src/types';

import { AppConfigContextValue, AppConfigProviderProps } from './AppConfigProvider.types';

/**
 * Application config context.
 */
const AppConfigContext = React.createContext<AppConfigContextValue | null>(null);

/**
 * Retrieve AppConfig context value.
 */
export const useAppConfig = (): AppConfigContextValue | null => useContext(AppConfigContext);

/**
 * AppConfig context provider.
 */
const AppConfigProvider: React.FC<AppConfigProviderProps> = ({ children }) => {
  const config = useSelector<RootState, AppConfig>((state) => state.appConfig);

  const dispatch = useAppDispatch();

  // Initialise store on mount.
  useEffect(() => {
    dispatch(actions.appConfig.init());
  }, []);

  // Wait for config to be available before rendering app.
  if (!config) {
    return null;
  }

  return (
    <AppConfigContext.Provider value={{ getKey, setKey }}>{children}</AppConfigContext.Provider>
  );

  function getKey<Key extends keyof AppConfig>(key: Key): AppConfig[Key] {
    return config[key];
  }

  function setKey<Key extends keyof AppConfig>(key: Key, value?: AppConfig[Key]): void {
    dispatch(actions.appConfig.setKey({ key: key, value: value }));
  }
};

export default AppConfigProvider;
