import { FC, Fragment, useState, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { CircularProgress, Box } from '@mui/material';

import { Task } from '+TaskList/types';
import { taskListApi } from '+TaskList/services';
import { TaskForm } from '+TaskList/containers';
import { Actions, ActionType } from '+TaskList/utils';
import { TaskListTableRow } from './components';

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
    <Box sx={{ maxHeight: '520px', overflow: 'auto', paddingBottom: '48px' }}>
      {tasks.map((task) => (
        <Fragment key={task.id}>
          <TaskListTableRow task={task} toggleCompleted={toggleCompleted} editTask={editTask} deleteTask={deleteTask} />
        </Fragment>
      ))}
      <TaskForm
        task={taskInEdit}
        dispatch={dispatch}
        isFormOpen={isEditFormOpen}
        setIsFormOpen={setIsEditFormOpen}
        setIsLoading={setIsLoading}
      />
    </Box>
  );
};
