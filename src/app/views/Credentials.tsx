import { Box } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';

import CredentialsForm from '@components/CredentialsForm';

interface CredentialsProps extends RouteComponentProps {}

const Credentials: React.FC<CredentialsProps> = () => {
  return (
    <Box height="100%" width="100%" display="grid">
      <CredentialsForm />
    </Box>
  );
};

export default Credentials;
