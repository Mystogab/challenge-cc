import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const BUCKET = process.env.PIC_BUCKET;

const client = new S3Client({});

export const init = () => {};

export const saveFile = async (file: Buffer, path: string) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: path,
    Body: file,
  });

  const response = await client.send(command);
  return response;
}