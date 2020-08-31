import { Box, FormControl, FormLabel, Heading, Switch, Textarea } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { useSelector } from 'react-redux';

import * as actions from '@redux/actions';
import { RootState } from '@redux/reducers';
import { TwitchState } from '@redux/reducers/twitchReducer';
import { useAppDispatch } from '@redux/store';

interface TwitchProps extends RouteComponentProps {}

const Twitch: React.FC<TwitchProps> = () => {
  const { isEnabled, log } = useSelector<RootState, TwitchState>((state) => state.twitch);

  const dispatch = useAppDispatch();

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
            onChange={(): void => {
              if (isEnabled) {
                dispatch(actions.twitch.stop());
              } else {
                dispatch(actions.twitch.start());
              }
            }}
          />
        </FormControl>

        <Heading size="xs" mb={4}>
          Output Log
        </Heading>

        <Textarea
          isReadOnly
          value={log?.join('\r\n') ?? ''}
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
