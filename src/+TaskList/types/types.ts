export interface Task {
  id: string;
  title: string;
  created_at: number;
  is_complete: boolean;
  user_id: string;
}

export interface TaskList {
  taskList: Task[];
}
