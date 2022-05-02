import { FC, useState, useReducer, useEffect, useTransition, useCallback } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Box, Divider, IconButton, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircle';

import { useAppDispatch, useAppSelector } from 'state/hooks';
import { getUserData, getUserName } from 'state/_slices/userSlice';
import { taskListReducer, Actions } from '+TaskList/utils';
import { Task } from '+TaskList/types';
import { taskListApi } from './services';
import { TaskListHeader, TaskListTable, TaskForm } from './containers';
import { TasklistCard } from './components';

export const TaskListRoute: FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [taskInEdit, setTaskInEdit] = useState<Task | null>(null);
  const [isInitialDataLoading, startTransition] = useTransition();
  const [state, dispatch] = useReducer(taskListReducer, { taskList: [] });
  const storeDispatch = useAppDispatch();
  const userName = useAppSelector(getUserName);
  const taskList = state.taskList;

  const getLoggedInUser = useCallback(() => {
    storeDispatch(getUserData())
      .then(unwrapResult)
      .catch((err) => console.error(err)); // eslint-disable-line
  }, [storeDispatch]);

  // get initial user data
  useEffect(() => {
    if (!userName && !isInitialDataLoading) {
      startTransition(() => getLoggedInUser());
    }
  }, [userName, getLoggedInUser, isInitialDataLoading]);

  const getTasks = useCallback(() => {
    void taskListApi.getAllTasks().then(({ data }) => {
      dispatch({ type: Actions.SetInitialState, payload: { taskList: data as unknown as Task[] } });
    });
  }, []);

  // get initial tasklist data
  useEffect(() => {
    if (!taskList.length && !isInitialDataLoading) {
      startTransition(() => getTasks());
    }
  }, [taskList, getTasks, isInitialDataLoading]);

  if (isInitialDataLoading) {
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
    <TasklistCard>
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
        sx={{
          position: 'absolute',
          bottom: '0',
          right: '6px',
          backgroundColor: 'white',
          zIndex: '10',
        }}
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
    </TasklistCard>
  );
};
