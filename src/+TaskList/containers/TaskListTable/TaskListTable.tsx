import { FC, Fragment, useState, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { CircularProgress, Box, Typography, Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Task } from '+TaskList/types';
import { taskListApi } from '+TaskList/services';
import { TaskForm } from '+TaskList/containers';
import { Actions, ActionType } from '+TaskList/utils';

interface Props {
  taskList: Task[];
  isLoading: boolean;
  dispatch: Dispatch<ActionType>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const TaskListTable: FC<Props> = ({ taskList, isLoading, dispatch, setIsLoading }) => {
  const [taskInEdit, setTaskInEdit] = useState<Task | undefined>(undefined);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  if (!taskList.length) return null;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  const tasks = taskList.sort((a, b) => b.created_at - a.created_at).sort((a) => (a.is_complete ? 0 : -1));

  const toggleCompleted = async (event: SyntheticEvent, task: Task) => {
    event.preventDefault();
    const body = {
      ...task,
      is_complete: !task.is_complete,
    };

    await taskListApi.update(task.id, body);
    dispatch({ type: Actions.UpdateTask, payload: { task: body } });
  };

  const editTask = (task: Task) => {
    setTaskInEdit(task);
    setIsEditFormOpen(true);
  };

  const deleteTask = (taskId: string) =>
    taskListApi.delete(taskId).then(() => dispatch({ type: Actions.DeleteTask, payload: { taskId } }));

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
              <Checkbox checked={task.is_complete} onClick={(event: SyntheticEvent) => toggleCompleted(event, task)} />
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
      <TaskForm
        task={taskInEdit}
        dispatch={dispatch}
        isFormOpen={isEditFormOpen}
        setIsFormOpen={setIsEditFormOpen}
        setIsLoading={setIsLoading}
      />
    </>
  );
};
