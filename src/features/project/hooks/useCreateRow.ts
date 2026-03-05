import { useCreateProject } from "./useCreateProject";
import { useGeneratedId } from "./useIdGeneration";
import { ProjectType } from "../types/project.type";
import { useUserContext } from "@/features/users/hooks/useUserContext";


export const useCreateRow = () => {

  const { mutate: postNewProject } = useCreateProject(); 
  const nextId = useGeneratedId();
  const { user } = useUserContext()

  const handleCreate = async ({
    values,
    exitCreatingMode,
  }: {
    exitCreatingMode: () => void;
    values: Record<string, any>;
  }) => {

    const { id, eqList, ...rest } = values

    const newProject = {
      id: nextId,
      createdAt: new Date,
      createdBy: user?.name,
      status: "Activ",
      eqList: [],
      ...rest
    }


    postNewProject(newProject as Partial<ProjectType>);

    exitCreatingMode();
  };

  return handleCreate;
};