import { Box, FormControl, FormLabel, Heading, Switch, Textarea } from '@chakra-ui/core';
import React from 'react';

import { useTwitchContext } from '../components/TwitchProvider';

interface TwitchProps {
  path: string;
}

const Twitch: React.FC<TwitchProps> = () => {
  const { isEnabled, log, toggle } = useTwitchContext() ?? {};

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
          <Switch isChecked={isEnabled} onChange={toggle} />
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
};

export default Twitch;
