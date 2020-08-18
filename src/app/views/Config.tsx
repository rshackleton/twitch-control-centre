import { ipcRenderer } from 'electron';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Code,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/core';

import { IPCEvents } from '../../enums/IPCEvents';

import { Lifx } from '../../lifx';

interface ConfigProps {
  path: string;
}

const Config: React.FC<ConfigProps> = () => {
  const [lightStates, setLightStates] = useState<Record<string, Lifx.LightState>>({});

  const [rewardId, setRewardId] = useState('');
  const [lightState, setLightState] = useState('');

  useEffect(() => {
    doAsync();

    async function doAsync(): Promise<void> {
      const states = await ipcRenderer.invoke(IPCEvents.CONFIG_GET_LIFX_STATES);
      setLightStates(states);
    }
  }, []);

  return (
    <Box>
      <Heading size="md" mb={4}>
        Config
      </Heading>

      <Grid alignItems="center" gap={4} gridTemplateColumns="300px 1fr" mb={4}>
        <FormLabel m={0}>Reward ID:</FormLabel>
        <FormLabel m={0}>State:</FormLabel>
      </Grid>

      <Grid
        alignItems="center"
        gap={4}
        gridTemplateColumns="300px 1fr min-content min-content"
        mb={4}
        maxHeight={300}
        overflow="auto"
        pr={4}
      >
        {Object.entries(lightStates).map(([key, value]) => (
          <Fragment key={key}>
            <Code bg="none">{key}</Code>
            <Code bg="none" whiteSpace="pre">
              {JSON.stringify(value, null, 2)}
            </Code>
            <Button
              onClick={(event): void => {
                event.preventDefault();

                setRewardId(key);
                setLightState(JSON.stringify(value, null, 2));
              }}
            >
              Edit
            </Button>
            <Button
              onClick={async (event): Promise<void> => {
                event.preventDefault();

                await ipcRenderer.invoke(IPCEvents.CONFIG_DELETE_LIFX_STATE, {
                  rewardId: key,
                });

                const states = await ipcRenderer.invoke(IPCEvents.CONFIG_GET_LIFX_STATES);
                setLightStates(states);
              }}
            >
              Delete
            </Button>
          </Fragment>
        ))}
      </Grid>

      <Heading size="md" mb={4}>
        Edit
      </Heading>

      <Grid gap={4} gridTemplateColumns="1fr">
        <FormControl>
          <FormLabel>Reward ID:</FormLabel>
          <Input
            type="text"
            value={rewardId}
            onChange={(event): void => setRewardId(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>State:</FormLabel>
          <Textarea
            fontFamily="mono"
            fontSize="xs"
            minHeight="8em"
            value={lightState}
            onChange={(event): void => setLightState(event.target.value)}
          />
        </FormControl>

        <Button
          justifySelf="flex-end"
          onClick={async (event): Promise<void> => {
            event.preventDefault();

            if (!rewardId || !lightState) {
              return;
            }

            await ipcRenderer.invoke(IPCEvents.CONFIG_SET_LIFX_STATE, {
              rewardId,
              state: JSON.parse(lightState),
            });

            const states = await ipcRenderer.invoke(IPCEvents.CONFIG_GET_LIFX_STATES);
            setLightStates(states);

            setRewardId('');
            setLightState('');
          }}
        >
          Save
        </Button>
      </Grid>
    </Box>
  );
};

export default Config;
