import { Box, Heading } from '@chakra-ui/core';
import React from 'react';

interface HomeProps {
  path: string;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <Box>
      <Heading size="md">Home</Heading>
    </Box>
  );
};

export default Home;
