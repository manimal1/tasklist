import { Components } from '@mui/material';

export const buttons: Components = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
};
