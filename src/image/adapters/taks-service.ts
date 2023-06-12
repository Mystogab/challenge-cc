import axios from 'axios';

export const init = () => {};
const TASK_API = process.env.TASK_API;

export const setTaskToProcessing = async (taskId: string) => {
  const update: Partial<Task> = {
    id: taskId,
    status: 'PROCESSING'
  }

  const result = axios.put(`${TASK_API}/task/${taskId}`, update, {
    headers: {
      'api-key': 'iAmGroot'
    }
  });

  return result;
}

export const setTaskToCompleted = async (taskId: string, result: Task['result']) => {
  const update: Partial<Task> = {
    id: taskId,
    status: 'DONE',
    result
  }

  const updateResult = axios.put(`${TASK_API}/task/${taskId}`, update, {
    headers: {
      'api-key': 'iAmGroot'
    }
  });

  return updateResult;
}