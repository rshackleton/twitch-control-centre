import { ChakraProvider, GlobalStyle, extendTheme } from '@chakra-ui/core';
import React from 'react';
import { Provider } from 'react-redux';

import AppConfigProvider from '@components/AppConfigProvider';
import CredentialsProvider from '@components/CredentialsProvider';

import store from '@redux/store';
import Root from '@views/Root';

const theme = extendTheme({});

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <CredentialsProvider>
        <AppConfigProvider>
          <ChakraProvider resetCSS theme={theme}>
            <GlobalStyle />
            <Root />
          </ChakraProvider>
        </AppConfigProvider>
      </CredentialsProvider>
    </Provider>
  );
};

export default App;
