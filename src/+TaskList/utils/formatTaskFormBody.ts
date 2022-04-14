import { Task } from '+TaskList/types';

export const formatTaskBody = ({
  userId,
  title,
  taskListCount,
}: {
  userId: string;
  title: string;
  taskListCount: number;
}): Task => ({
  id: (taskListCount + 1).toString(),
  title,
  is_complete: false,
  user_id: userId,
  created_at: new Date().getTime(),
});
