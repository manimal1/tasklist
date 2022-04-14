import { FC, useState } from 'react';
import { Divider, Box, IconButton, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircle';

import { useTaskListApi } from './services';
import { TaskListHeader, TaskListTable, TaskForm } from './containers';

export const TaskList: FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [{ data: taskList, loading: isLoading }, refetch] = useTaskListApi('tasks');

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
    <>
      <TaskListHeader />
      <Divider />
      <TaskListTable taskList={taskList} refetch={refetch} isLoading={isLoading} />
      <IconButton onClick={toggleDrawer} color="primary" sx={{ position: 'absolute', bottom: '0', right: '0' }}>
        <AddIcon fontSize="large" />
      </IconButton>
      <TaskForm
        setIsFormOpen={setIsFormOpen}
        isFormOpen={isFormOpen}
        taskListCount={taskList.length || 0}
        refetch={refetch}
      />
    </>
  );
};
