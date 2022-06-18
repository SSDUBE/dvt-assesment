import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';

const baseTheme = createTheme({
  spacing: (factor: any) => `${0.5 * factor}rem`,
  palette: {
    primary: {
      main: '#354259',
      light: 'rgb(236, 129, 68)',
    },
    common: {
      white: '#fff',
      black: '#000',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: '100%',
          border: '1px #EEEEEE solid',
        }
      }
    }
    // MuiFormHelperText: {
    //   styleOverrides: {
    //     root: {
    //       marginLeft: 0,
    //     },
    //   },
    // },
    // MuiListItemText: {
    //   styleOverrides: {
    //     root: {
    //       color: '#fff',
    //     },
    //   },
    // },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       background: '#EC8144',
    //       width: '100%',
    //       color: '#fff',
    //       borderRadius: 50,
    //       height: 50,
    //       ':hover': {
    //         background: '#EC8144',
    //       },
    //     },
    //   },
    // },
    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       fontFamily: 'Poppins',
    //     },
    //   },
    //   defaultProps: {
    //     variantMapping: {
    //       h1: 'h2',
    //       h2: 'h2',
    //       h3: 'h2',
    //       h4: 'h2',
    //       h5: 'h2',
    //       h6: 'h2',
    //       subtitle1: 'h2',
    //       subtitle2: 'h2',
    //       body1: 'span',
    //       body2: 'span',
    //     },
    //   },
    // },
  },
});

export const theme = responsiveFontSizes(baseTheme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
});