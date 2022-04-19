import { Task, TaskList } from '+TaskList/types';

export enum Actions {
  SetInitialState = 'SET_INITIAL_STATE',
  CreateTask = 'CREATE_TASK',
  UpdateTask = 'UPDATE_TASK',
  DeleteTask = 'DELETE_TASK',
}

export type ActionType =
  | { type: Actions.SetInitialState; payload: { taskList: Task[] } }
  | { type: Actions.CreateTask; payload: { task: Task } }
  | { type: Actions.UpdateTask; payload: { task: Task } }
  | { type: Actions.DeleteTask; payload: { taskId: string } };

export const taskListReducer = (state: TaskList, action: ActionType): TaskList => {
  switch (action.type) {
    case Actions.SetInitialState:
      return { taskList: action.payload.taskList };
    case Actions.CreateTask:
      return {
        taskList: [...state.taskList, action.payload.task],
      };
    case Actions.UpdateTask:
      return {
        taskList: state.taskList.map((task) => (task.id === action.payload.task.id ? action.payload.task : task)),
      };
    case Actions.DeleteTask:
      return {
        taskList: state.taskList.filter((task) => task.id !== action.payload.taskId),
      };
  }
};
