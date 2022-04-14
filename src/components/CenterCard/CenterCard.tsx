import { FC, ReactNode } from 'react';
import { Card } from '@mui/material';

interface Props {
  children: ReactNode;
}

export const CenterCard: FC<Props> = ({ children }) => (
  <Card sx={{ position: 'relative', maxWidth: '720px', minHeight: '420px', margin: '0 auto' }}>{children}</Card>
);
