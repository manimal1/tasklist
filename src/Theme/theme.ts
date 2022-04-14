import { createTheme } from '@mui/material/styles';
import { components } from './components';
import { palette, typography } from './foundations';

export const theme = createTheme({
  palette,
  typography,
  components,
});
