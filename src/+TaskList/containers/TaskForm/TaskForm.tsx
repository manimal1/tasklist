import { FC, useState, Dispatch, SetStateAction, useEffect, useTransition, FormEvent } from 'react';

import { useAppSelector } from 'state/hooks';
import { getUserId } from 'state/_slices/userSlice';
import { Task } from '+TaskList/types';
import { taskListApi } from '+TaskList/services';
import { formatTaskBody, ActionType, Actions } from '+TaskList/utils';
import { Drawer, Box, Button, TextField, CircularProgress } from '@mui/material';

interface Props {
  task: Task | null;
  taskListCount: number;
  isFormOpen: boolean;
  dispatch: Dispatch<ActionType>;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  setTaskInEdit: Dispatch<SetStateAction<Task | null>>;
}

export const TaskForm: FC<Props> = ({ task, taskListCount, isFormOpen, dispatch, setIsFormOpen, setTaskInEdit }) => {
  const [title, setTitle] = useState<string>(task ? task.title : '');
  const [isLoading, startTransition] = useTransition();
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
    setTitle('');
    setIsFormOpen(false);
  };

  const createTask = async () => {
    const body = formatTaskBody({ taskListCount, title, userId });

    startTransition(() => {
      taskListApi.create(body).then(() => dispatch({ type: Actions.CreateTask, payload: { task: body } }));
      handleClose();
    });
  };

  const updateTask = async () => {
    if (!task) return null;
    const body = {
      ...task,
      title,
    };

    startTransition(() => {
      taskListApi.update(task.id, body).then(() => dispatch({ type: Actions.UpdateTask, payload: { task: body } }));
    });
    handleClose();
  };

  const handleSubmitTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    task ? updateTask() : createTask();
  };

  const renderLabel = () => (task ? 'Edit task' : 'Create task');
  const renderButtonLabel = () => (task ? 'Update' : 'Create');

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
          <Button type="submit">
            {isLoading ? <CircularProgress sx={{ color: 'white', height: '32px !important' }} /> : renderButtonLabel()}
          </Button>
        </Box>
      </form>
    </Drawer>
  );
};
