import React from 'react';
import { Heading } from '@chakra-ui/core';

interface LifxProps {
  path: string;
}

const Lifx: React.FC<LifxProps> = () => {
  return (
    <div>
      <Heading size="md">LIFX</Heading>
    </div>
  );
};

export default Lifx;
