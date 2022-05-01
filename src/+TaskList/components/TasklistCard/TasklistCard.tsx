import { FC, ReactNode } from 'react';
import { purple } from '@mui/material/colors';
import { Box, Card } from '@mui/material';

interface Props {
  children: ReactNode;
}

export const TasklistCard: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ padding: '24px 16px', backgroundColor: purple[50], minHeight: '100vh' }}>
      <Card
        sx={{
          position: 'relative',
          maxWidth: '720px',
          minHeight: '420px',
          margin: '0 auto',
        }}
      >
        {children}
      </Card>
    </Box>
  );
};
