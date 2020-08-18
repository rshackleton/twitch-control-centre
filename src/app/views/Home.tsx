import React from 'react';
import { Link } from '@reach/router';
import { Heading } from '@chakra-ui/core';

interface HomeProps {
  path: string;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <Heading size="md">Home</Heading>
    </div>
  );
};

export default Home;
