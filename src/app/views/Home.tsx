import { Box, Heading } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';

interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Box>
      <Heading size="md">Home</Heading>
    </Box>
  );
};

export default Home;
