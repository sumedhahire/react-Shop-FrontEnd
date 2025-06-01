// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32', // elegant plant green
    },
    background: {
      default: '#ffffff', // clean white
      paper: '#f5f5f5',   // light neutral
    },
    text: {
      primary: '#1b5e20', // deep readable green
      secondary: '#4caf50',
    },
  },
  shape: {
    borderRadius: 12, // soft but not too round
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    fontSize: 15,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;
