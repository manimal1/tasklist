import { FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'Theme';

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header>
          <p>Hello Vite + React!</p>
        </header>
      </div>
    </ThemeProvider>
  );
};
