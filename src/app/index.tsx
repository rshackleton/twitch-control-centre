import { CSSReset, ColorModeProvider } from '@chakra-ui/core';
import React from 'react';

import CustomThemeProvider from './CustomThemeProvider';

import Root from './views/Root';

const App: React.FC<{}> = () => {
  return (
    <ColorModeProvider>
      <CustomThemeProvider>
        <CSSReset />
        <Root />
      </CustomThemeProvider>
    </ColorModeProvider>
  );
};

export default App;
