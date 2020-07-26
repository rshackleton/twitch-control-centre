import React from 'react';
import { ThemeProvider, theme, useColorMode, ITheme } from '@chakra-ui/core';

const lightTheme: ITheme = {
  ...theme,
  colors: {
    ...theme.colors,
  },
};

const darkTheme: ITheme = {
  ...theme,
  colors: {
    ...theme.colors,
  },
};

const CustomThemeProvider: React.FC<{}> = ({ children }) => {
  const { colorMode } = useColorMode();

  const currentTheme = colorMode === 'light' ? lightTheme : darkTheme;

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
