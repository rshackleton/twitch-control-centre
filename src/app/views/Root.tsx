import { Box, Flex, Switch, useColorMode, Grid } from '@chakra-ui/core';
import { Router, Link, LocationProvider, createMemorySource, createHistory } from '@reach/router';
import React from 'react';

import Credentials from './Credentials';
import Home from './Home';
import Lifx from './Lifx';

const source = createMemorySource('/');
const history = createHistory(source);

const Root: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <LocationProvider history={history}>
      <Grid as="header" alignItems="center" gap={8} gridTemplateColumns="1fr min-content">
        <Box as="nav">
          <Flex as="ul" flexDir="row">
            <Box as="li" listStyleType="none">
              <Box as={Link} display="block" to="/" p={4}>
                Home
              </Box>
            </Box>
            <Box as="li" listStyleType="none">
              <Box as={Link} display="block" to="/lifx" p={4}>
                LIFX
              </Box>
            </Box>
            <Box as="li" listStyleType="none">
              <Box as={Link} display="block" to="/credentials" p={4}>
                Credentials
              </Box>
            </Box>
          </Flex>
        </Box>

        <Switch mr={4} isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
      </Grid>

      <Box m={4}>
        <Router>
          <Home path="/" />
          <Credentials path="credentials" />
          <Lifx path="lifx" />
        </Router>
      </Box>
    </LocationProvider>
  );
};

export default Root;
