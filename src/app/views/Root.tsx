import React from 'react';
import { Box } from '@chakra-ui/core';

import CredentialsForm from '../components/CredentialsForm';

const Root: React.FC = () => {
  return (
    <Box height="100%" width="100%" display="grid" alignItems="center" justifyContent="center">
      <CredentialsForm />
    </Box>
  );
};

export default Root;
