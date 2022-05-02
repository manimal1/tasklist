import { FC, SyntheticEvent } from 'react';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Task } from '+TaskList/types';

interface Props {
  task: Task;
  toggleCompleted: (event: SyntheticEvent, task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
}

const boxWrapperStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '48px',
  borderBottom: '1px solid grey',
  padding: '8px 12px',
};

export const TaskListTableRow: FC<Props> = ({ task, toggleCompleted, editTask, deleteTask }) => (
  <Box sx={boxWrapperStyles}>
    <Box sx={{ display: 'flex', alignItems: 'center', flex: '1' }}>
      <Checkbox checked={task.is_complete} onClick={(event: SyntheticEvent) => toggleCompleted(event, task)} />
      <Typography variant="body1" sx={{ textDecoration: task.is_complete ? 'line-through' : 'none' }}>
        {task.title}
      </Typography>
    </Box>
    <Box>
      <IconButton aria-label="edit" data-testid={`edit-${task.id}`} onClick={() => editTask(task)} color="secondary">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" data-testid={`delete-${task.id}`} onClick={() => deleteTask(task.id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  </Box>
);
