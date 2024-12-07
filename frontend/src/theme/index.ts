import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const lightTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#1A365D', // أزرق داكن
      light: '#2C5282',
      dark: '#2A4365',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C53030', // أحمر
      light: '#E53E3E',
      dark: '#9B2C2C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans Arabic", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '8px 16px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90CDF4', // أزرق فاتح
      light: '#BEE3F8',
      dark: '#63B3ED',
      contrastText: '#1A202C',
    },
    secondary: {
      main: '#FEB2B2', // أحمر فاتح
      light: '#FED7D7',
      dark: '#FC8181',
      contrastText: '#1A202C',
    },
    background: {
      default: '#1A202C',
      paper: '#2D3748',
    },
  },
});
