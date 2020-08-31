import { Box, VStack } from '@chakra-ui/core';
import { Router, RouteComponentProps } from '@reach/router';
import React from 'react';

import Navbar from '@components/NavBar';

import ActionsView from './Actions';
import RewardsView from './Rewards';

interface ConfigProps extends RouteComponentProps {}

const Config: React.FC<ConfigProps> = () => {
  return (
    <VStack alignItems="flex-start">
      <Navbar
        items={[
          {
            path: '/config/actions',
            text: 'Actions',
          },
          {
            path: '/config/rewards',
            text: 'Rewards',
          },
        ]}
      />
      <Box p={4}>
        <Router>
          <ActionsView default path="actions" />
          <RewardsView path="rewards" />
        </Router>
      </Box>
    </VStack>
  );
};

export default Config;
