import useAxios from 'axios-hooks';

import { Task } from '+TaskList/types';

interface Props {
  taskId: string | undefined;
  title: string;
  task: Task | null;
}

export const useUpdateTask = ({ taskId, title, task }: Props) => {
  const [{ data = null, loading: isLoading = false, error }, executePut] = useAxios(
    {
      url: `http://localhost:3001/tasklist/api/tasks/${taskId}`,
      method: 'PUT',
    },
    { manual: true },
  );

  function updateTask() {
    executePut({
      data: {
        ...task,
        title,
      },
    });
  }

  return { data, isLoading, error, updateTask };
};
