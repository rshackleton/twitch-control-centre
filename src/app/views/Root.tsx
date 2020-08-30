import { Box, Flex, Link, Switch, VStack, useColorMode } from '@chakra-ui/core';
import {
  Router,
  Link as RouterLink,
  LocationProvider,
  createMemorySource,
  createHistory,
} from '@reach/router';
import React from 'react';

import Config from './Config';
import Credentials from './Credentials';
import Home from './Home';
import Twitch from './Twitch';

const source = createMemorySource('/');
const history = createHistory(source);

const Root: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <LocationProvider history={history}>
      <VStack alignItems="stretch">
        <Flex alignItems="flex-start" direction="row">
          <Link as={RouterLink} to="/" p={4}>
            Home
          </Link>
          <Link as={RouterLink} to="/twitch" p={4}>
            Twitch
          </Link>
          <Link as={RouterLink} to="/config" p={4}>
            Config
          </Link>
          <Link as={RouterLink} to="/credentials" p={4}>
            Credentials
          </Link>

          <Box ml="auto" mr={4} p={4}>
            <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
          </Box>
        </Flex>

        <Router>
          <Home path="/" />
          <Config path="config/*" />
          <Credentials path="credentials" />
          <Twitch path="twitch" />
        </Router>
      </VStack>
    </LocationProvider>
  );
};

export default Root;
