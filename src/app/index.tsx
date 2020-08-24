import { CSSReset, ThemeProvider, ColorModeProvider, GlobalStyle } from '@chakra-ui/core';
import React from 'react';

import AppConfigProvider from './components/AppConfigProvider';
import theme from './config/theme';
import Root from './views/Root';

const App: React.FC<{}> = () => {
  console.log(theme.config);

  return (
    <AppConfigProvider>
      <ThemeProvider theme={theme}>
        <ColorModeProvider
          defaultValue={theme?.config?.initialColorMode}
          useSystemColorMode={theme?.config?.useSystemColorMode}
        >
          <CSSReset />
          <GlobalStyle />
          <Root />
        </ColorModeProvider>
      </ThemeProvider>
    </AppConfigProvider>
  );
};

export default App;
