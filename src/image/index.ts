import * as queuelistenerAdapter from './adapters/sqs-events';
import * as storageAdapter from './adapters/s3-storage';
import * as taskServiceAdapter from './adapters/taks-service';


storageAdapter.init();
taskServiceAdapter.init();
export const handler = queuelistenerAdapter.init(taskServiceAdapter, storageAdapter);
