import { ipcRenderer } from 'electron';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { IPCEvents } from '../../enums/IPCEvents';
import { AppConfig } from '../../types/app';

interface AppConfigContextValue {
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

interface AppConfigProviderProps {
  children: ReactNode;
}

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
  const [config, setConfig] = useState<AppConfig>();

  useEffect(() => {
    doAsync();

    async function doAsync(): Promise<void> {
      if (!config) {
        // First mount, load existing config.
        const initialConfig = await ipcRenderer.invoke(IPCEvents.CONFIG_GET);
        setConfig(initialConfig);
      } else {
        // Subsequent updates, set config.
        await ipcRenderer.invoke(IPCEvents.CONFIG_SET, config);
      }
    }
  }, [config]);

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
    setConfig({ ...config, [key]: value });
  }
};

export default AppConfigProvider;
