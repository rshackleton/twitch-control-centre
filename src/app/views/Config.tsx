import { VStack, HStack, Link } from '@chakra-ui/core';
import { Link as RouterLink, Router } from '@reach/router';
import React, { ReactElement } from 'react';

interface ConfigProps {
  path: string;
}

const Config: React.FC<ConfigProps> = () => {
  return (
    <VStack alignItems="flex-start">
      <HStack alignItems="flex-start">
        <Link as={RouterLink} to="/config/actions">
          Actions
        </Link>
        <Link as={RouterLink} to="/config/rewards">
          Rewards
        </Link>
      </HStack>
      <Router>
        <ActionsView path="actions" />
        <RewardsView path="rewards" />
      </Router>
    </VStack>
  );
};

export default Config;

function ActionsView({ path }: { path: string }): ReactElement {
  return <p>ActionsView</p>;
}
function RewardsView({ path }: { path: string }): ReactElement {
  return <p>RewardsView</p>;
}
