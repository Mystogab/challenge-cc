export const getTask = async (repository: any, id: string) => {
  return await repository.getById(id);
}
