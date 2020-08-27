import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as actions from '@redux/actions';
import { RootState } from '@redux/reducers';
import { TwitchState } from '@redux/reducers/twitchReducer';
import { useAppDispatch } from '@redux/store';
import TwitchService from '@services/TwitchService';
import { TwitchRedemptionData } from '@src/electron/ipc/TwitchHandler';

interface TwitchProviderProps {
  children: ReactNode;
}

const service = new TwitchService();

const TwitchProvider: React.FC<TwitchProviderProps> = ({ children }) => {
  const { isEnabled } = useSelector<RootState, TwitchState>((state) => state.twitch);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEnabled) {
      service.start(onChannelPointRedemption);
    } else {
      service.stop(onChannelPointRedemption);
    }

    return (): void => {
      service.stop(onChannelPointRedemption);
    };
  }, [isEnabled]);

  return <>{children}</>;

  function onChannelPointRedemption(
    _: Electron.IpcRendererEvent,
    data: TwitchRedemptionData,
  ): void {
    console.log('Redemption:', data);
    dispatch(actions.twitch.redemption(data));
  }
};

export default TwitchProvider;
