import { SQSEvent } from "aws-lambda";
import { createResizedPictures } from '../core/resizeImage';
import { curry, _ } from "jafl";

export const init = (taskService: any, storage: any) => async (event: SQSEvent) => {
  const tasks = event.Records
    .map(record => JSON.parse(record.body) as QueuedTask);

  return await Promise
    .allSettled(tasks
      .map(curry(createResizedPictures)(taskService, storage, _))
    );
}