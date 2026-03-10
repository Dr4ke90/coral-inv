import { Project } from "../types/project.type";


export const createProject = (
  values: Record<string, any>,
  userName: string | undefined,
  nextId: string,
): Partial<Project> => {
  const { id, eqList, ...rest } = values;

  return {
    id: nextId,
    createdBy: userName,
    eqList: [],
    ...rest,
  };
};
