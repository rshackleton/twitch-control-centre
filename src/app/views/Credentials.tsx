import { Box } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';

import CredentialsForm from '@components/CredentialsForm';

interface CredentialsProps extends RouteComponentProps {}

const Credentials: React.FC<CredentialsProps> = () => {
  return (
    <Box display="grid" p={4} height="100%" width="100%">
      <CredentialsForm />
    </Box>
  );
};

export default Credentials;
