import { FC, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { AxiosPromise } from 'axios';

import { useAppSelector } from 'state/hooks';
import { getUserId } from 'state/_slices/userSlice';
import { Task, TaskList } from '+TaskList/types';
import { taskListApi } from '+TaskList/services';
import { formatTaskBody } from '+TaskList/utils';
import { Drawer, Box, Button, TextField, Typography } from '@mui/material';

interface Props {
  refetch: () => AxiosPromise<TaskList>;
  isFormOpen: boolean;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  taskListCount?: number;
  task?: Task;
}

export const TaskForm: FC<Props> = ({ isFormOpen, refetch, setIsFormOpen, task = null, taskListCount = 0 }) => {
  const [title, setTitle] = useState<string>(task ? task.title : '');
  const userId = useAppSelector(getUserId);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  const handleClose = () => setIsFormOpen(false);

  const createTask = async () => {
    const body = formatTaskBody({ taskListCount, title, userId });

    await taskListApi.taskAction().create(body);
    refetch();
    handleClose();
  };

  const updateTask = async () => {
    if (!task) return null;
    const body = {
      ...task,
      title,
    };

    await taskListApi.taskAction().edit(task.id, body);
    refetch();
    handleClose();
  };

  const renderTitle = () => (task ? 'Edit your task' : 'Create new task');

  return (
    <Drawer anchor="bottom" open={isFormOpen} onClose={handleClose}>
      <Box sx={{ padding: '32px', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          {renderTitle()}
        </Typography>
        <form onSubmit={task ? updateTask : createTask}>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
            sx={{ minWidth: '280px', marginRight: '24px' }}
          >
            {title}
          </TextField>
          <Button type="submit">{task ? 'Update' : 'Create'}</Button>
        </form>
      </Box>
    </Drawer>
  );
};
