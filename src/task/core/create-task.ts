import { randomUUID } from 'crypto';
import { pick, pipe, tap } from 'jafl';

const createTaskEntity = (pic: string) => {
  const id = randomUUID();
  const timestamp = new Date().toISOString();

  const task: Task = {
    id,
    status: 'CREATED',
    createdAt: timestamp,
    lastUpdatedAt: timestamp,
    imagePath: pic
  };

  return task;
};

export const createTask = async (queue: any, repository: any, pic: string) => {
  return pipe(
    createTaskEntity,
    tap(repository.save),
    (t: Task) => ({ taskId: t.id, pic: t.imagePath }) as QueuedTask,// convert to QueuedTask Object
    tap(queue.sendTask),
    pick('taskId'),
    (taskId: string) => ({ taskId }) // return taskId to user
  )(pic);
};
