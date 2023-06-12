import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.TASK_TABLE_NAME;

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const init = () => {};

export const save = async (task: Task) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: task
  });

  const response = await docClient.send(command);
  console.log('RESPONSE', response);
  return response;
}

export const getById = async (id: string) => {
  console.log('GET BY ID:', id)
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id }
  });

  const response = await docClient.send(command);
  console.log('GET BY ID RESPONSE', response);

  if(response.Item?.result) return {...response.Item, result: JSON.parse(response.Item.result)}

  return response.Item;
}

export const updateItem = async (task: Task) => {
  const { id, status, result } = task;

  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id },
    AttributeUpdates: {
      status: {
        Value: status,
        Action: 'PUT'
      },
      ...(result ? { result: {Value: JSON.stringify(result), Action: 'PUT'}} : {})
    }
  });

  const response = await docClient.send(command);

  return response;
}