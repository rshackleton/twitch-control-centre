import { Box, Button, Divider, FormLabel, Grid, Heading, Input } from '@chakra-ui/core';
import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';

import CredentialsManager from '../CredentialsManager';

import { IPCEvents } from '../../enums/IPCEvents';

const credentials = new CredentialsManager();

const CredentialsForm: React.FC = () => {
  useEffect(() => {
    getLifxKey();
    getTwitchPubSubKey();

    async function getLifxKey(): Promise<void> {
      const value = await credentials.getLifxKey();
      setLifxKey(value ?? '');
    }

    async function getTwitchPubSubKey(): Promise<void> {
      const value = await credentials.getTwitchPubSubKey();
      setIsTwitchAuthenticated(!!value);
    }
  }, []);

  const [lifxKey, setLifxKey] = useState<string>('');
  const [isTwitchAuthenticated, setIsTwitchAuthenticated] = useState<boolean>(false);

  return (
    <Box>
      <Heading mb={4} size="md">
        Twitch
      </Heading>
      <Grid gap="20px" templateColumns="200px 1fr" alignItems="center" mb={6}>
        <Box gridColumn="span 2">
          {isTwitchAuthenticated ? (
            <Button
              onClick={async (event): Promise<void> => {
                event.preventDefault();

                await ipcRenderer.invoke(IPCEvents.TWITCH_AUTH_CLEAR);
                setIsTwitchAuthenticated(false);
              }}
            >
              Clear Credentials
            </Button>
          ) : (
            <Button
              onClick={async (event): Promise<void> => {
                event.preventDefault();

                const result = await ipcRenderer.invoke(IPCEvents.TWITCH_AUTH_START);
                setIsTwitchAuthenticated(result);
              }}
            >
              Authenticate
            </Button>
          )}
        </Box>
      </Grid>

      <Divider mb={6} />

      <Heading mb={4} size="md">
        LIFX
      </Heading>
      <Grid gap="20px" templateColumns="200px 1fr" alignItems="center" mb={6}>
        <FormLabel htmlFor="lifx-key">LIFX Key</FormLabel>
        <Input
          id="lifx-key"
          type="password"
          value={lifxKey}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setLifxKey(event.target.value);
          }}
        />
        <Box gridColumn="span 2">
          <Button
            onClick={async (event): Promise<void> => {
              event.preventDefault();

              await credentials.setLifxKey(lifxKey);

              console.log('Credentials saved');
            }}
          >
            Save
          </Button>
        </Box>
      </Grid>

      <Divider mb={6} />
    </Box>
  );
};

export default CredentialsForm;
