type Task = {
  id: string,
  status: 'CREATED' | 'PROCESSING' | 'DONE' | 'ERROR',
  createdAt: string,
  lastUpdatedAt: string,
  imagePath: string,
  result?: {
    createdAt: string,
    files: Array<{
      path: string,
      md5: string,
      resolution: 1024 | 800
    }>
  }
};

type QueuedTask = {
  taskId: string,
  pic: string,
}