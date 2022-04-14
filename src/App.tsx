import { FC } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Box } from '@mui/material';

import { theme } from 'Theme';
import { store } from 'state/store';
import { TaskList } from '+TaskList';
import { CenterCard } from 'components';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box sx={{ padding: '24px 16px', backgroundColor: purple[50], minHeight: 'calc(100vh - 24px)' }}>
          <CenterCard>
            <TaskList />
          </CenterCard>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};
