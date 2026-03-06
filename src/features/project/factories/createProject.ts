import { Project } from "../types/project.type";
import { PROJECT_PREFIX } from "../constants/constants";
import { generatedId } from "@/utils/generateId";

export const createProject = (
  values: Record<string, any>,
  userName: string | undefined,
  existingData: Project[] | undefined,
): Partial<Project> => {
  const nextId = generatedId(PROJECT_PREFIX, existingData);

  const { id, eqList, ...rest } = values;

  return {
    id: nextId,
    createdBy: userName,
    eqList: [],
    ...rest,
  };
};
