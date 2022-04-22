import { FC } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from 'Theme';
import { store } from 'state/store';
import { TaskList } from '+TaskList';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box sx={{ padding: '24px 16px', backgroundColor: purple[50], minHeight: '100vh' }}>
          <TaskList />
        </Box>
      </ThemeProvider>
    </Provider>
  );
};
