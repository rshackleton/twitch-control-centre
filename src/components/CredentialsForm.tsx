import { Box, Input, FormLabel, Grid, Button } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import CredentialsManager from '../renderer/CredentialsManager';

const credentials = new CredentialsManager();

const CredentialsForm: React.FC = () => {
  useEffect(() => {
    getLifxKey();
    getTwitchKey();

    async function getLifxKey(): Promise<void> {
      const value = await credentials.getLifxKey();
      setLifxKey(value ?? '');
    }

    async function getTwitchKey(): Promise<void> {
      const value = await credentials.getTwitchPubSubKey();
      setTwitchKey(value ?? '');
    }
  }, []);

  const [lifxKey, setLifxKey] = useState<string>('');
  const [twitchKey, setTwitchKey] = useState<string>('');
  return (
    <Grid gap="20px" templateColumns="200px 1fr" alignItems="center">
      <FormLabel htmlFor="twitch-key">Twitch PubSub Key</FormLabel>
      <Input
        id="twitch-key"
        type="password"
        value={twitchKey}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setTwitchKey(event.target.value);
        }}
      />
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
            await credentials.setTwitchPubSubKey(twitchKey);

            console.log('Credentials saved');
          }}
        >
          Save
        </Button>
      </Box>
    </Grid>
  );
};

export default CredentialsForm;
