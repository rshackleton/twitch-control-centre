import React from 'react';
import { Box, Button, useColorMode } from '@chakra-ui/core';

const Root: React.FC<{}> = () => {
  const { colorMode } = useColorMode();

  return (
    <Box height="100%" width="100%" display="grid" alignItems="center" justifyContent="center">
      Hello World
    </Box>
  );
};

export default Root;
