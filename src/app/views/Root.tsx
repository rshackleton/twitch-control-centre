import { Box, Switch, VStack, useColorMode } from '@chakra-ui/core';
import { Router, LocationProvider, createMemorySource, createHistory } from '@reach/router';
import React from 'react';

import Config from './config';
import Credentials from './Credentials';
import Home from './Home';
import Twitch from './Twitch';
import Navbar from '@components/NavBar';

const source = createMemorySource('/');
const history = createHistory(source);

const Root: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <LocationProvider history={history}>
      <VStack alignItems="stretch" spacing={0}>
        <Navbar
          items={[
            {
              path: '/',
              text: 'Home',
            },
            {
              path: '/twitch',
              text: 'Twitch',
            },
            {
              path: '/config',
              text: 'Config',
            },
            {
              path: '/credentials',
              text: 'Credentials',
            },
          ]}
          post={
            <Box ml="auto" mr={4} p={4}>
              <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
            </Box>
          }
        />

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
