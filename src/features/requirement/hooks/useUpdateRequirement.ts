import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Requirement} from "../types/requiment.type";
import { updateOneRequirementSheet } from "../api/updateOneRequirementSheet";

export const useUpdateRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Requirement>;
    }) => updateOneRequirementSheet(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["requirements"] });

      const previous = queryClient.getQueryData<Requirement[]>(["requirements"]);

      queryClient.setQueryData<Requirement[]>(["requirements"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...payload } : item))
          : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["requirements"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["requirement"] });
    },
  });
};
