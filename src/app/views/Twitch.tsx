import { Box, FormControl, FormLabel, Heading, Switch, Textarea } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import { TwitchRedemptionData } from '../../electron/ipc/TwitchHandler';

import TwitchService from '../services/TwitchService';

interface TwitchProps {
  path: string;
}

const service = new TwitchService();

const Twitch: React.FC<TwitchProps> = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [redemption, setRedemption] = useState<TwitchRedemptionData>(null);
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
    <Box>
      <Heading size="md" mb={4}>
        Twitch
      </Heading>

      <Box>
        <FormControl
          display="grid"
          alignItems="center"
          gridTemplateColumns="min-content min-content"
          mb={4}
        >
          <FormLabel>Enabled: </FormLabel>
          <Switch
            isChecked={isEnabled}
            onChange={async (event): Promise<void> => {
              event.preventDefault();

              if (isEnabled) {
                await service.stop(onChannelPointRedemption);
              } else {
                await service.start(onChannelPointRedemption);
              }

              setIsEnabled(!isEnabled);
            }}
          />
        </FormControl>

        <Heading size="xs" mb={4}>
          Output Log
        </Heading>

        <Textarea
          isReadOnly
          value={log.join('\r\n')}
          fontFamily="mono"
          fontSize="xs"
          minHeight={300}
          whiteSpace="pre"
        />
      </Box>
    </Box>
  );

  function onChannelPointRedemption(
    event: Electron.IpcRendererEvent,
    data: TwitchRedemptionData,
  ): void {
    console.log('Redemption:', data);
    setRedemption(data);
  }
};

export default Twitch;
