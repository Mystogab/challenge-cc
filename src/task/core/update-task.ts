export const updateTask = (repository: any, task: Task) => {
  return repository.updateItem(task);
}