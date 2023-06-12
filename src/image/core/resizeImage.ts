import { createHash } from 'node:crypto';
import sharp from 'sharp';

const resizeImage = async (
  inputFile: string,
  width: number = 1024,
  quality: number = 100) => {
  const result = await sharp(inputFile)
    .resize(width)
    .jpeg({ quality })
    .toBuffer();

  return result;
}

export const createResizedPictures = async (taskService: any, storage: any, task: QueuedTask) => {
  await taskService.setTaskToProcessing(task.taskId);

  const [ fileA, fileB ] = await Promise.all([
    resizeImage(task.pic, 800, 100),
    resizeImage(task.pic, 1024, 100)
  ]);

  const fileAMd5 = createHash('md5').update(fileA).digest('hex');
  const fileBMd5 = createHash('md5').update(fileB).digest('hex');

  const filename = task.pic.split('.').at(0);

  await Promise.all([
    storage.saveFile(fileA, `output/${filename}/800/${fileAMd5}.jpg`),
    storage.saveFile(fileB, `output/${filename}/1024/${fileBMd5}.jpg`)
  ]);

  const result: Task['result'] = {
    createdAt: new Date().toISOString(),
    files: [
      {
        path: `output/${filename}/800/${fileAMd5}.jpg`,
        md5: fileAMd5,
        resolution: 800
      },
      {
        path: `output/${filename}/1024/${fileBMd5}.jpg`,
        md5: fileBMd5,
        resolution: 1024
      }
    ]
  }

  await taskService.setTaskToCompleted(task.taskId, result);
}