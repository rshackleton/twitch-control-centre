import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { TwitchRedemptionData } from '@src/electron/ipc/TwitchHandler';

import TwitchService from '@services/TwitchService';

interface TwitchProviderProps {
  children: ReactNode;
}

export interface TwitchContextValue {
  isEnabled: boolean;
  log: string[];
  redemption?: TwitchRedemptionData;
  toggle: () => void;
}

const TwitchContext = React.createContext<TwitchContextValue | null>(null);

const service = new TwitchService();

export function useTwitchContext(): TwitchContextValue | null {
  return useContext(TwitchContext);
}

const TwitchProvider: React.FC<TwitchProviderProps> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [redemption, setRedemption] = useState<TwitchRedemptionData>();
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    return (): void => {
      service.stop(onChannelPointRedemption);
    };
  }, []);

  useEffect(() => {
    if (!redemption) {
      return;
    }

    const ts = new Date().toISOString();
    const newLine = `${ts}: ${redemption.id} : ${redemption.rewardName} - Redeemed by ${redemption.userId} : ${redemption.userDisplayName}`;
    setLog([newLine, ...log]);
  }, [redemption]);

  return (
    <TwitchContext.Provider
      value={{
        isEnabled,
        log,
        redemption,
        toggle: async (): Promise<void> => {
          if (isEnabled) {
            await service.stop(onChannelPointRedemption);
          } else {
            await service.start(onChannelPointRedemption);
          }

          setIsEnabled(!isEnabled);
        },
      }}
    >
      {children}
    </TwitchContext.Provider>
  );

  function onChannelPointRedemption(
    _: Electron.IpcRendererEvent,
    data: TwitchRedemptionData,
  ): void {
    console.log('Redemption:', data);
    setRedemption(data);
  }
};

export default TwitchProvider;
