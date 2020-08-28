import { Box, Button, Divider, FormLabel, Grid, Heading, Input } from '@chakra-ui/core';
import React, { useState } from 'react';

import { useAppDispatch } from '@redux/store';
import { invoke } from '@redux/middleware/ipcMiddleware';
import { CredentialKey } from '@src/enums/Credentials';
import { IpcChannels } from '@src/enums/IpcChannels';

import { useCredentials } from './CredentialsProvider';

const CredentialsForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const credentialsContext = useCredentials();

  const lifxKey = credentialsContext?.getKey(CredentialKey.LIFX_KEY) ?? '';
  const twitchAccessToken = credentialsContext?.getKey(CredentialKey.TWITCH_ACCESS_TOKEN) ?? '';

  const [formLifxKey, setFormLifxKey] = useState<string>(lifxKey ?? '');

  return (
    <Box>
      <Heading mb={4} size="md">
        Twitch
      </Heading>
      <Grid gap="20px" templateColumns="200px 1fr" alignItems="center" mb={6}>
        <Box gridColumn="span 2">
          {twitchAccessToken ? (
            <Button
              onClick={async (event): Promise<void> => {
                event.preventDefault();

                await credentialsContext?.setKey(CredentialKey.TWITCH_ACCESS_TOKEN, '');
                await credentialsContext?.setKey(CredentialKey.TWITCH_REFRESH_TOKEN, '');
              }}
            >
              Clear Credentials
            </Button>
          ) : (
            <Button
              onClick={async (event): Promise<void> => {
                event.preventDefault();

                await dispatch(invoke({ channel: IpcChannels.TWITCH_AUTH_START }));
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
          value={formLifxKey}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setFormLifxKey(event.target.value);
          }}
        />
        <Box gridColumn="span 2">
          <Button
            onClick={async (event): Promise<void> => {
              event.preventDefault();

              await credentialsContext?.setKey(CredentialKey.LIFX_KEY, formLifxKey);
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
