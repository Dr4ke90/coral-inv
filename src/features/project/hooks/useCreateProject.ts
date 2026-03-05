import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGeneratedId } from "./useIdGeneration";
import { ProjectType } from "../types/project.type";
import {postNewProject} from "../api/postNewProjects"

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const nextId = useGeneratedId();

  return useMutation({
    mutationFn: postNewProject,
    onMutate: async (newSheet) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });

      const previous = queryClient.getQueryData<ProjectType[]>(["projects"]);

      queryClient.setQueryData<ProjectType[]>(["projects"], (old) =>
        old
          ? [...old, { ...newSheet, id: nextId } as ProjectType]
          : [{ ...newSheet, id: nextId } as ProjectType],
      );

      return { previous };
    },
    onError: (_err, _newSheet, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["projects"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
