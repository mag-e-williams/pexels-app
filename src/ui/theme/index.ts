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
    },
  });

  return responsiveFontSizes(themeWithColorMode, {
    variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'caption', 'overline', 'body1', 'body2'],
  });
}
