import { FC, Fragment, useState } from 'react';
import { AxiosPromise } from 'axios';
import { CircularProgress, Box, Typography, Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Task, TaskList } from '+TaskList/types';
import { taskListApi } from '+TaskList/services';
import { TaskForm } from '+TaskList/containers';

interface Props {
  taskList: Task[];
  isLoading: boolean;
  refetch: () => AxiosPromise<TaskList>;
}

export const TaskListTable: FC<Props> = ({ taskList, isLoading, refetch }) => {
  const [taskInEdit, setTaskInEdit] = useState<Task | undefined>(undefined);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  if (!taskList) return null;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  const tasks = taskList.sort((a, b) => a.created_at - b.created_at);

  const toggleCompleted = async (task: Task) => {
    const body = {
      ...task,
      is_complete: !task.is_complete,
    };

    await taskListApi.taskAction().edit(task.id, body);
    refetch();
  };

  const editTask = (task: Task) => {
    setTaskInEdit(task);
    setIsEditFormOpen(true);
  };

  const deleteTask = (taskId: string) =>
    taskListApi
      .taskAction()
      .delete(taskId)
      .then(() => refetch());

  return (
    <>
      {tasks.map((task) => (
        <Fragment key={task.id}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: '48px',
              borderBottom: '1px solid grey',
              padding: '8px 12px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flex: '1' }}>
              <Checkbox checked={task.is_complete} onClick={() => toggleCompleted(task)} />
              <Typography variant="body1" sx={{ textDecoration: task.is_complete ? 'line-through' : 'none' }}>
                {task.title}
              </Typography>
            </Box>
            <Box>
              <IconButton
                aria-label="edit"
                data-testid={`edit-${task.id}`}
                onClick={() => editTask(task)}
                color="secondary"
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" data-testid={`delete-${task.id}`} onClick={() => deleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Fragment>
      ))}
      <TaskForm task={taskInEdit} isFormOpen={isEditFormOpen} setIsFormOpen={setIsEditFormOpen} refetch={refetch} />
    </>
  );
};
