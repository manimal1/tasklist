import { FC, useState, useReducer, useEffect, useTransition, useCallback } from 'react';
import { Divider, Box, IconButton, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircle';

import { CenterCard } from 'components';
import { taskListReducer, Actions } from '+TaskList/utils';
import { Task } from '+TaskList/types';
import { taskListApi } from './services';
import { TaskListHeader, TaskListTable, TaskForm } from './containers';

export const TaskList: FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [taskInEdit, setTaskInEdit] = useState<Task | null>(null);
  const [isLoading, startTransition] = useTransition();
  const [state, dispatch] = useReducer(taskListReducer, { taskList: [] });
  const taskList = state.taskList;

  const getTasks = useCallback(() => {
    void taskListApi.getAllTasks().then(({ data }) => {
      dispatch({ type: Actions.SetInitialState, payload: { taskList: data as unknown as Task[] } });
    });
  }, []);

  useEffect(() => {
    if (!taskList.length && !isLoading) {
      startTransition(() => getTasks());
    }
  }, [taskList, getTasks, isLoading]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  const toggleDrawer = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <CenterCard>
      <TaskListHeader />
      <Divider />
      <TaskListTable
        taskList={taskList}
        dispatch={dispatch}
        setTaskInEdit={setTaskInEdit}
        setIsFormOpen={setIsFormOpen}
      />
      <IconButton
        onClick={toggleDrawer}
        color="primary"
        sx={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: 'white' }}
      >
        <AddIcon fontSize="large" />
      </IconButton>
      <TaskForm
        task={taskInEdit}
        isFormOpen={isFormOpen}
        taskListCount={taskList ? taskList.length : 0}
        dispatch={dispatch}
        setIsFormOpen={setIsFormOpen}
        setTaskInEdit={setTaskInEdit}
      />
    </CenterCard>
  );
};
