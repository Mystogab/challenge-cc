import api, { Request, Response } from 'lambda-api';
import { createTask, getTask, updateTask } from '../core/index';
// import { sendTask } from '../../helpers/sqsHelper';

const app = api();

export const init = (queue: any, repository: any) => {
  app.get('/status', async (req: any, res: any) => {
    return { status: 'ok' };
  });

  app.get('/task/:taskId', async (req: Request, res: Response) => {
    const id = req.params?.taskId;
    if (!id) { return res.status(400).send('Missing id property'); };

    return await getTask(repository, id);
  });
  
  app.post('/task', async (req: Request, res: Response) => {
    const pic = req.body?.pic;
    if (!pic) { return res.status(400).send('Missing pic property'); };
    
    return await createTask(queue, repository, pic);
  });

  app.put('/task/:taskId', async (req: Request, res: Response) => {
    const id = req.params?.taskId;
    const apiKey = req.headers?.['api-key'];
    const maybeTask = req.body as Task;

    if (apiKey !== 'iAmGroot') { return res.status(403).send('You are not GROOT!')};

    if (!id) { return res.status(400).send('Missing id property'); };

    return await updateTask(repository, {...maybeTask, id })
  });
  
  // Declare your Lambda handler
   const handler = async (event: any, context: any) => {
    // Run the request
    return await app.run(event, context);
  };

  return handler;
};
