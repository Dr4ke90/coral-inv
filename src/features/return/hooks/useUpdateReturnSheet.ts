import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReturnSheet } from "../api/updateReturnSheet";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";

export const useUpdateReturnSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<HandoverSheet>;
    }) => updateReturnSheet(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["returns"] });

      const previous = queryClient.getQueryData<HandoverSheet[]>(["returns"]);

      queryClient.setQueryData<HandoverSheet[]>(["returns"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...payload } : item))
          : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["returns"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["returns"] });
    },
  });
};
