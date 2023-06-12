import * as queue from './adapters/aws-sqs';
import * as repository from './adapters/dynamodb';
import * as restApi from './adapters/lambda-api-rest';

repository.init();
queue.init(process.env.TASK_QUEUE_URL!);
export const handler = restApi.init(queue, repository);
