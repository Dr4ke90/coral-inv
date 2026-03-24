import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tablet } from "../types/tablet.type";
import { updateTablet } from "../api/updateTablet";

export const useUpdateTablet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Tablet> }) =>
      updateTablet(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["tablets"] });

      const previous = queryClient.getQueryData<Tablet[]>(["tablets"]);

      queryClient.setQueryData<Tablet[]>(["tablets"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...payload } : item))
          : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["tablets"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tablets"] });
    },
  });
};
