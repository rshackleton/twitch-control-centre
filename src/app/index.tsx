import { ipcRenderer } from 'electron';
import { ChakraProvider, GlobalStyle, extendTheme } from '@chakra-ui/core';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import AppConfigProvider from '@components/AppConfigProvider';
import CredentialsProvider from '@components/CredentialsProvider';

import store from '@redux/store';
import Root from '@views/Root';
import { IpcChannels } from '@src/enums/IpcChannels';

const theme = extendTheme({});

const App: React.FC<{}> = () => {
  useEffect(() => {
    ipcRenderer.on(IpcChannels.AUDIO_PLAY, handle);
    return (): void => {
      ipcRenderer.off(IpcChannels.AUDIO_PLAY, handle);
    };
  }, []);

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

function handle(_event: Electron.IpcRendererEvent, buffer: string): void {
  // @todo: Move playback function to separate audio playback window.
  const audio = document.createElement('audio');
  audio.src = buffer;
  audio.volume = 0.5;
  audio.play();
}
