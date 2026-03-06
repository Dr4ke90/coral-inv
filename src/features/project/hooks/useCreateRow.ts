import { useCreateProject } from "./useCreateProject";
import { Project } from "../types/project.type";
import { useUserContext } from "@/features/users/hooks/useUserContext";
import { useGeneratedId } from "@/hooks/useIdGeneration";
import { useProjects } from "./useProjects";
import { PROJECT_PREFIX } from "../constants/constants";

export const useCreateRow = () => {
  const { mutate: postNewProject } = useCreateProject();
  const { data } = useProjects();
  const { user } = useUserContext();
  const nextId = useGeneratedId(PROJECT_PREFIX, data);

  const handleCreate = async ({
    values,
    exitCreatingMode,
  }: {
    exitCreatingMode: () => void;
    values: Record<string, any>;
  }) => {
    const { id, eqList, ...rest } = values;

    const newProject = {
      id: nextId,
      createdAt: new Date(),
      createdBy: user?.name,
      eqList: [],
      ...rest,
    };

    postNewProject(newProject as Partial<Project>);

    exitCreatingMode();
  };

  return handleCreate;
};
