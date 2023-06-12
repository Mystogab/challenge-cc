import { SQSClient, SendMessageCommand, SendMessageCommandInput } from '@aws-sdk/client-sqs';

// const QueueUrl = process.env.TASK_QUEUE_URL;
let QueueUrl: string;

const client = new SQSClient({});

export const init = (queueUrl: string) => {
  QueueUrl = queueUrl;
} 

export const sendTask = async (msg: QueuedTask) => {
  const input: SendMessageCommandInput = {
    QueueUrl,
    MessageBody: JSON.stringify(msg)
  }
  const command = new SendMessageCommand(input);
  const response = await client.send(command);

  return response;
}