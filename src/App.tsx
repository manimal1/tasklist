import { FC } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from 'Theme';
import { store } from 'state/store';
import { TaskListRoute } from '+TaskList';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <TaskListRoute />
      </ThemeProvider>
    </Provider>
  );
};
