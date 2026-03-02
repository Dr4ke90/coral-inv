import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOneRequirementSheet } from "../api/postOneRequirementSheet";
import { Requirement } from "../types/requirementInterface";

export const usePostRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postOneRequirementSheet,
    onMutate: async (newSheet) => {
      await queryClient.cancelQueries({ queryKey: ["requirement"] });

      const previous = queryClient.getQueryData<Requirement[]>(["requirement"]);

      queryClient.setQueryData<Requirement[]>(["requirement"], (old) =>
        old
          ? [...old, { ...newSheet, id: "temp-id" } as Requirement]
          : [{ ...newSheet, id: "temp-id" } as Requirement],
      );

      return { previous };
    },
    onError: (_err, _newSheet, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["requirement"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["requirement"] });
    },
  });
};
