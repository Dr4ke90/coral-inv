import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "../types/project.type";
import { postNewProject } from "../api/postNewProjects";

export const useCreateProject = (nextId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postNewProject,
    onMutate: async (newSheet) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });

      const previous = queryClient.getQueryData<Project[]>(["projects"]);

      queryClient.setQueryData<Project[]>(["projects"], (old) =>
        old
          ? [...old, { ...newSheet, id: nextId } as Project]
          : [{ ...newSheet, id: nextId } as Project],
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
