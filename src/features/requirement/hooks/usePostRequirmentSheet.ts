import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOneRequirementSheet } from "../api/postOneRequirementSheet";
import { RequirementType } from "../types/requiment.type";
import { useGeneratedId } from "./useIdGeneration";

export const usePostRequirement = () => {
  const queryClient = useQueryClient();
  const nextId = useGeneratedId();

  return useMutation({
    mutationFn: postOneRequirementSheet,
    onMutate: async (newSheet) => {
      await queryClient.cancelQueries({ queryKey: ["requirement"] });

      const previous = queryClient.getQueryData<RequirementType[]>(["requirement"]);

      queryClient.setQueryData<RequirementType[]>(["requirement"], (old) =>
        old
          ? [...old, { ...newSheet, id: nextId } as RequirementType]
          : [{ ...newSheet, id: nextId } as RequirementType],
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
