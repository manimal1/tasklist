import { FC, Fragment, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { Box } from '@mui/material';

import { Task } from '+TaskList/types';
import { taskListApi } from '+TaskList/services';
import { Actions, ActionType } from '+TaskList/utils';
import { TaskListTableRow } from './components';

interface Props {
  taskList: Task[];
  dispatch: Dispatch<ActionType>;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  setTaskInEdit: Dispatch<SetStateAction<Task | null>>;
}

export const TaskListTable: FC<Props> = ({ taskList, dispatch, setIsFormOpen, setTaskInEdit }) => {
  if (!taskList.length) {
    return null;
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
    setIsFormOpen(true);
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
    </Box>
  );
};
