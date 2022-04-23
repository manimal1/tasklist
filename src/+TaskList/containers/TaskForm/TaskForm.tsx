import { FC, useState, Dispatch, SetStateAction, useEffect, FormEvent } from 'react';

import { useAppSelector } from 'state/hooks';
import { getUserId } from 'state/_slices/userSlice';
import { Task } from '+TaskList/types';
import { taskListApi } from '+TaskList/services';
import { formatTaskBody, ActionType, Actions } from '+TaskList/utils';
import { Drawer, Box, Button, TextField } from '@mui/material';

interface Props {
  task: Task | null;
  taskListCount?: number;
  isFormOpen: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<ActionType>;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  setTaskInEdit: Dispatch<SetStateAction<Task | null>>;
}

export const TaskForm: FC<Props> = ({
  task = null,
  taskListCount = 0,
  isFormOpen,
  setIsLoading,
  dispatch,
  setIsFormOpen,
  setTaskInEdit,
}) => {
  const [title, setTitle] = useState<string>(task ? task.title : '');
  const userId = useAppSelector(getUserId);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  const handleClose = () => {
    if (task) {
      setTaskInEdit(null);
    }
    setIsFormOpen(false);
  };

  const createTask = async () => {
    setIsLoading(true);
    const body = formatTaskBody({ taskListCount, title, userId });

    await taskListApi.create(body);
    dispatch({ type: Actions.CreateTask, payload: { task: body } });
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

    await taskListApi.update(task.id, body);
    dispatch({ type: Actions.UpdateTask, payload: { task: body } });
    handleClose();
    setIsLoading(false);
  };

  const handleSubmitTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    task ? updateTask() : createTask();
  };

  const renderLabel = () => (task ? 'Edit task' : 'Create task');

  return (
    <Drawer anchor="bottom" open={isFormOpen} onClose={handleClose}>
      <form onSubmit={handleSubmitTask}>
        <Box sx={{ padding: '32px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <TextField
            label={renderLabel()}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
            sx={{ minWidth: '280px', marginRight: '24px' }}
          >
            {title}
          </TextField>
          <Button type="submit">{task ? 'Update' : 'Create'}</Button>
        </Box>
      </form>
    </Drawer>
  );
};
