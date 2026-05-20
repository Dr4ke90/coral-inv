import { ProjectType } from "@/types/project.type";

export const projectFactory = (
  values: Record<string, any>,
  userId: string | undefined,
  nextId: string,
): Partial<ProjectType> => {
  const { id, eqList, ...rest } = values;

  return {
    id: nextId,
    createdBy: userId,
    eqList: [],
    ...rest,
  };
};
