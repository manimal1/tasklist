import axios from 'axios';

import { Task } from '+TaskList/types';

const client = axios.create({
  baseURL: 'http://localhost:3001/tasklist/api',
});

export const taskListApi = {
  getAllTasks: () => client.get(`/tasks/`),
  create: (body: Task) => client.post(`/tasks`, body),
  update: (taskId: string, body: Task) => client.put(`/tasks/${taskId}`, body),
  delete: (taskId: string) => client.delete(`/tasks/${taskId}`),
};
