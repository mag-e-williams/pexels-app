import type {} from '@mui/material/themeCssVarsAugmentation';
import { responsiveFontSizes, Theme, SxProps as MuiSxProps } from '@mui/material';
import {
  CssVarsTheme,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';

type AugmentedTheme = Omit<Theme, 'palette' | 'components'> & CssVarsTheme;

export type SxProps = MuiSxProps<AugmentedTheme>;

export function getTheme(): Theme {
  const themeWithColorMode = extendTheme({
    components: {
      MuiContainer: {
        defaultProps: {
          fixed: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            padding: 0,
            [theme.breakpoints.up('sm')]: {
              maxWidth: 510,
              paddingLeft: 0,
              paddingRight: 0,
            },
            [theme.breakpoints.up('md')]: {
              maxWidth: 700,
            },
            [theme.breakpoints.up('lg')]: {
              maxWidth: 920,
            },
            [theme.breakpoints.up('xl')]: {
              maxWidth: 1130,
            },
          }),
        },
      },
    },
  });

  return responsiveFontSizes(themeWithColorMode, {
    variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'caption', 'overline', 'body1', 'body2'],
  });
}
