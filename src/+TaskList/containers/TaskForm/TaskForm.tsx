import { FC, useState, Dispatch, SetStateAction, useEffect } from 'react';

import { useAppSelector } from 'state/hooks';
import { getUserId } from 'state/_slices/userSlice';
import { Task } from '+TaskList/types';
import { taskListApi } from '+TaskList/services';
import { formatTaskBody, ActionType, Actions } from '+TaskList/utils';
import { Drawer, Box, Button, TextField, Typography } from '@mui/material';

interface Props {
  // refetch: () => AxiosPromise<TaskList>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<ActionType>;
  isFormOpen: boolean;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  taskListCount?: number;
  task?: Task;
}

export const TaskForm: FC<Props> = ({
  setIsLoading,
  isFormOpen,
  dispatch,
  // refetch,
  setIsFormOpen,
  task = null,
  taskListCount = 0,
}) => {
  const [title, setTitle] = useState<string>(task ? task.title : '');
  const userId = useAppSelector(getUserId);
  // update task with custom hook using axios-hooks
  // const { data, isLoading, updateTask: handleUpdateTask } = useUpdateTask({ taskId: task?.id, title, task });

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  const handleClose = () => setIsFormOpen(false);

  const createTask = async () => {
    setIsLoading(true);
    const body = formatTaskBody({ taskListCount, title, userId });

    await taskListApi.taskAction().create(body);
    dispatch({ type: Actions.CreateTask, payload: { task: body } });
    // refetch();
    handleClose();
    setIsLoading(false);
  };

  const updateTask = async () => {
    if (!task) return null;
    setIsLoading(true);
    const body = {
      ...task,
      title,
    };

    await taskListApi.taskAction().update(task.id, body);
    // handleUpdateTask();

    dispatch({ type: Actions.UpdateTask, payload: { task: body } });
    // refetch();
    handleClose();
    setIsLoading(false);
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
