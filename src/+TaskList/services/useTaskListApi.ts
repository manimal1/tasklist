import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

import { Task } from '+TaskList/types';

export const useTaskListApi = makeUseAxios({
  axios: axios.create({ baseURL: 'http://localhost:3001/' }),
});

export const taskListApi = {
  taskAction() {
    const apiUrl = 'http://localhost:3001';

    return {
      create: (body: Task) => axios.post(`${apiUrl}/tasks`, body),
      update: (taskId: string, body: Task) => axios.put(`${apiUrl}/tasks/${taskId}`, body),
      delete: (taskId: string) => axios.delete(`${apiUrl}/tasks/${taskId}`),
    };
  },
};
