import theme, { Theme } from '@chakra-ui/theme';

const customTheme: Theme = {
  ...theme,
  config: {
    ...theme.config,
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
};

export default customTheme;
