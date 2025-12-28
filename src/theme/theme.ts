'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0ea5e9', // cyan-500
      dark: '#0284c7',
      light: '#22d3ee',
    },
    secondary: {
      main: '#6366f1', // indigo-500
      dark: '#4f46e5',
      light: '#818cf8',
    },
    background: {
      default: '#0a1628',
      paper: '#111827',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9ca3af',
    },
    divider: '#1f2937',
  },
  typography: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 10px 30px rgba(14, 165, 233, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: '1px solid #1f2937',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            borderColor: 'rgba(14, 165, 233, 0.3)',
            boxShadow: '0 20px 40px rgba(14, 165, 233, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#374151',
            },
            '&:hover fieldset': {
              borderColor: '#0ea5e9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0ea5e9',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #1f2937',
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
