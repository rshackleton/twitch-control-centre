import { CSSReset, ThemeProvider, ColorModeProvider, GlobalStyle } from '@chakra-ui/core';
import React from 'react';
import { Provider } from 'react-redux';

import AppConfigProvider from '@components/AppConfigProvider';
import theme from '@config/theme';
import store from '@redux/store';
import Root from '@views/Root';

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
